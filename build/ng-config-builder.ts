import { join } from 'path';
import { NODE_DIR } from './webpack-paths';

export class NgConfigBuilder {

  constructor(private prod: boolean, private iweb: boolean) { }

  buildRules() {
    const config = [];

    config.push(...this.common());

    if (this.prod) config.push(...this.production());
    if (this.iweb) config.push(...this.web());

    return config;
  }

  private common() {
    return [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
      },
    ];
  }

  private web() {
    return [
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ];
  }

  private production() {
    return [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: join(NODE_DIR, '@angular-devkit/build-optimizer/src/.cache'),
            },
          },
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ];
  }
}