import { PurifyPlugin } from '@angular-devkit/build-optimizer';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import { join } from 'path';
import {
  ContextReplacementPlugin,
  EnvironmentPlugin,
  HashedModuleIdsPlugin,
  ProgressPlugin,
  SourceMapDevToolPlugin,
} from 'webpack';
import { CleanCssWebpackPlugin } from './cleancss-webpack-plugin';
import { SuppressExtractedTextChunksWebpackPlugin } from './suppress-entry-chunks-webpack-plugin';
import { browserPath, NODE_DIR } from '../webpack-paths';
import { Platform, PlatformType } from '../webpack-types';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function browserPlugins(platform: Platform, prod = true) {
  const PLUGINS = [];
  const ENTRY_POINTS = [ 'inline', 'polyfills', 'styles', 'vendor', 'main' ];
  const HTML_MINIFY  = prod ? { caseSensitive: true, collapseWhitespace: true, keepClosingSlash: true } : false;
  const WEB = platform === PlatformType.Web;

  const COMMON_PLUGINS = [
    new ContextReplacementPlugin(
      /(.+)?angular([\\/])core(.+)?/,
      browserPath(),
      {}
    ),
    new ProgressPlugin(),
    new CopyWebpackPlugin([
      {
        context: 'browser',
        to: '',
        from: {
          glob: 'assets/**/*',
          dot: true,
        },
      },
      {
        context: 'browser',
        to: '',
        from: {
          glob: 'favicon.ico',
          dot: true,
        },
      },
    ], {
      ignore: [
        '.gitkeep',
        '**/.DS_Store',
        '**/Thumbs.db',
      ],
      debug: 'warning',
    }),

    new AngularCompilerPlugin({
      mainPath: WEB ? browserPath('main.ts') : browserPath('main.ssr.ts'),
      platform: WEB ? 0 : 1,
      hostReplacementPaths: {
        'environments/environment.ts': prod ? browserPath('environments/environment.prod.ts') : browserPath('environments/environment.ts'),
      },
      sourceMap: !prod,
      tsConfigPath: WEB ? browserPath('tsconfig.app.json') : browserPath('tsconfig.ssr.json'),
      skipCodeGeneration: !prod,
      compilerOptions: {},
    }),
  ];
  PLUGINS.push(...COMMON_PLUGINS);

  const WEB_PLUGINS = [
    new HtmlWebpackPlugin({
      inject: false,
      template: browserPath('index.hbs'),
      filename: './index.html',
      hash: false,
      compile: true,
      minify: HTML_MINIFY,
      cache: true,
      showErrors: true,
      baseHref: '/',
      devServer: prod ? null : 'http://localhost:8080',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true,
      },
      title: 'Code by Jordan',
      meta: [
        {
          name: 'description',
          content: 'Home of Full Stack Developer Grant Jordan',
        },
      ],
      mobile: true,
      lang: 'en-US',
      links: [
        'https://fonts.googleapis.com/css?family=Montserrat+Alternates|Space+Mono',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
      ],
      scripts: [],
      window: false,
      chunksSortMode: function sort(left, right) {
        const leftIndex = ENTRY_POINTS.indexOf(left.names[0]);
        const rightIndex = ENTRY_POINTS.indexOf(right.names[0]);
        if (leftIndex > rightIndex) {
          return 1;
        }
        else if (leftIndex < rightIndex) {
          return -1;
        }
        else {
          return 0;
        }
      },
      headHtmlSnippet: '',
      bodyClass: 'app-dark mat-typography',
      bodyHtmlSnippet: `<app-root>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      body {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #216869;
      }
      .loader {
        color: #1F2421;
        font-family: Consolas, Menlo, Monaco, monospace;
        font-weight: bold;
        font-size: 30vh;
        opacity: 0.8;
      }
      .loader span {
        display: inline-block;
        -webkit-animation: pulse 0.4s alternate infinite ease-in-out;
        animation: pulse 0.4s alternate infinite ease-in-out;
      }
      .loader span:nth-child(odd) {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
      @-webkit-keyframes pulse {
        to {
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
          opacity: 0.5;
        }
      }
      @keyframes pulse {
        to {
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
          opacity: 0.5;
        }
      }
    </style>

    <div class="loader">
      <span>{</span><span>}</span>
    </div>
  </app-root>`,
    }),
  ];
  if (WEB) PLUGINS.push(...WEB_PLUGINS);

  const DEV_PLUGINS = [
    new SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///',
    }),
  ];
  if (!prod) PLUGINS.push(...DEV_PLUGINS);

  const PROD_PLUGINS = [
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash].css`,
      chunkFilename: `[id].[contenthash].css`,
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 10,
    }),
    new LicenseWebpackPlugin({
      licenseFilenames: [
        'LICENSE',
        'LICENSE.md',
        'LICENSE.txt',
        'license',
        'license.md',
        'license.txt',
      ],
      perChunkOutput: false,
      outputTemplate: join(NODE_DIR, 'license-webpack-plugin/output.template.ejs'),
      outputFilename: '3rdpartylicenses.txt',
      suppressErrors: true,
      includePackagesWithoutLicense: false,
      abortOnUnacceptableLicense: false,
      addBanner: false,
      bannerTemplate: '/*! 3rd party license information is available at <%- filename %> */',
      includedChunks: [],
      excludedChunks: [],
      additionalPackages: [],
      modulesDirectories: [ NODE_DIR ],
      pattern: /^(MIT|ISC|BSD.*)$/,
    }),
    new PurifyPlugin(),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new CleanCssWebpackPlugin({}),
  ];
  if (prod) PLUGINS.push(...PROD_PLUGINS);

  return PLUGINS;
}