import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Node } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import { NgConfigBuilder } from './ng-config-builder';
import { browserPlugins } from './plugins';
import { StylesConfigBuilder } from './styles-config-builder';
import { browserPath, distPath, NODE_DIR, projectRoot, serverPath } from './webpack-paths';
import {
  Environment,
  EnvironmentType,
  Platform,
  PlatformType,
  WebpackConfiguration,
  WebpackEnvironment,
} from './webpack-types';

export class WebpackConfigBuilder {
  private readonly _env: Environment;
  private readonly _platform: Platform;
  private _config: WebpackConfiguration;
  private ngBuilder: NgConfigBuilder;

  constructor(private readonly _wev: WebpackEnvironment) {
    this._env = _wev.env;
    this._platform = _wev.platform;
  }

  build(): WebpackConfiguration {
    if (this.isNg()) {
      this.ngBuilder = new NgConfigBuilder(this.isProd(), this.isWeb());
    }
    this.base();
    this.entry();
    this.rules();
    this.optimization();
    this.plugins();
    return this._config;
  }

  /**
   * Common config settings shared across platforms and environments
   */
  private base(): void {
    const out_path = !this.isNg() ? distPath( 'server') : distPath(this.isWeb() ? 'browser' : 'ssr');
    let filenames = '[name].js';
    if (this.isWeb() && this.isProd()) {
      filenames = '[name].[chunkhash:20].js';
    }
    this._config = {

      mode: this.environment(),

      target: this.isWeb() ? 'web' : 'node',

      devtool: !this.isProd() ? 'cheap-eval-source-map' : false,

      entry: {},

      output: {
        path: out_path,
        filename: filenames,
        chunkFilename: filenames,
      },

      stats: {
        colors: true,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
      },

      externals: [
        ...this.externals(),
      ],

      module: {
        rules: [],
      },

      resolve: {
        symlinks: true,
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: this.isServer() ? [serverPath(), NODE_DIR] : [browserPath(), NODE_DIR],
        mainFields: this.isWeb() ? ['browser', 'module', 'main'] : ['module', 'main'],
      },

      optimization: {
        nodeEnv: this.environment(),
        noEmitOnErrors: true,
        runtimeChunk: false,
      },

      plugins: [
        new CleanWebpackPlugin([out_path], { root: projectRoot() }),
      ],

      node: this.isWeb() ? this.nodePolyfills() : {},

      devServer: {
        historyApiFallback: true,
        contentBase: this.isWeb() ? distPath('browser') : distPath('ssr'),
        compress: true,
        port: 8080,
      },
    };
  }

  private entry() {
    if (this.isWeb()) {
      this._config.entry = {
        main: browserPath( 'main.ts'),
        polyfills: browserPath('polyfills.ts'),
        styles: browserPath('styles.scss'),
      };
    } else {
      this._config.entry = {
        main: this.isServer() ? serverPath('main.ts') : browserPath('main.ssr.ts'),
      };
    }
  }

  private rules() {
    const styleRules = new StylesConfigBuilder({
      prod: this.isProd(),
      baseHref: this._wev.baseHref,
      deployUrl: this._wev.deployUrl,
      inlineSize: this._wev.maximumInlineSize },
      ).build();
    const ngRules = this.ngBuilder.buildRules();
    const browserRules = [ ...styleRules, ...ngRules ];
    const serverRules = [ { test: /\.ts$/, loader: 'ts-loader' } ];

    this._config.module.rules = this.isServer() ? serverRules : browserRules;
  }

  private optimization() {
    if (this.isWeb()) {
      // @ts-ignore
      this._config.optimization.splitChunks = {
        maxAsyncRequests: Infinity,
        cacheGroups: {
          default: {
            chunks: 'async',
            minChunks: 2,
            priority: 10,
          },
          common: {
            name: 'common',
            chunks: 'async',
            minChunks: 2,
            enforce: true,
            priority: 5,
          },
          vendors: !this.isProd() && {
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
            test: (module: any, chunks: Array<{ name: string }>) => {
              const moduleName = module.nameForCondition ? module.nameForCondition() : '';
              return /[\\/]node_modules[\\/]/.test(moduleName)
                && !chunks.some(({ name }) => name === 'polyfills' || name === 'styles');
            },
          },
          styles: this.isProd() && {
            name: 'styles',
            test: /\.css$/,
            chunks: 'initial',
            enforce: true,
          },
        },
      };
      if (this.isProd()) {
        this._config.optimization.namedChunks = true;
        this._config.optimization.concatenateModules = true;
        this._config.optimization.mergeDuplicateChunks = true;
      }
    }
  }

  private plugins() {
    if (this.isNg()) {
      const currPlugins = this._config.plugins;
      this._config.plugins = [
        ...currPlugins,
        ...browserPlugins(this._platform, this.isProd()),
      ];
    } else {
      this._config.resolve.plugins = [ new TsconfigPathsPlugin({ configFile: 'server/tsconfig.server.json' }) ];
    }
  }

  private nodePolyfills(): Node {
    return {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    };
  }

  private isWeb(): boolean {
    return this._platform === PlatformType.Web;
  }

  private isNg(): boolean {
    return this._platform === PlatformType.Web || this._platform === PlatformType.SSR;
  }

  private isServer(): boolean {
    return this._platform === PlatformType.Server;
  }

  private listPlatforms() {
    return [ PlatformType.Web, PlatformType.SSR, PlatformType.Server ];
  }

  private isProd(): boolean {
    return this._env === EnvironmentType.Production;
  }

  private environment() {
    return this.isProd() ? 'production' : 'development';
  }

  private externals() {
    let ext = [];
    if (!this.isWeb() && this.isNg()) {
      ext = [ nodeExternals({ whitelist: [/@angular/, /@ng/] }) ];
    }else if (this.isServer()) {
      ext = [ nodeExternals() ]
    }
    return  ext;
  }
}