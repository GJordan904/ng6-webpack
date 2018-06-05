import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';

import { STYLES } from './webpack-paths';
import { postcssPluginFactory } from './plugins';

export const HASH_FORMATS = { chunk: '.[chunkhash:20]', extract: '.[contenthash:20]', file: '.[hash:20]', script: '.[hash:20]' };

export class StylesConfigBuilder {
  private readonly _plugins: any;
  private readonly _prod: boolean;

  constructor({ prod = true, deployUrl = '', baseHref = '', inlineSize = 10, hashFormat = HASH_FORMATS }) {
    this._plugins = postcssPluginFactory({deployUrl, baseHref, maximumInlineSize: inlineSize, hashFormat});
    this._prod = prod;
  }

  build(): RuleSetRule[] {
    const config = [];

    config.push(...this.ngCommon());
    if (this._prod) config.push(...this.ngProduction());
    else config.push(...this.ngDev());

    return config;
  }

  private ngCommon(): RuleSetRule[] {
    return [
      {
        exclude: STYLES,
        test: /\.css$/,
        loaders: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: !this._prod,
            },
          },
        ],
      },
      {
        test: /\.scss$|\.sass$/,
        exclude: STYLES,
        loaders: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: !this._prod,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !this._prod,
              precision: 8,
              includePaths: [],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: STYLES,
        loaders: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: !this._prod,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !this._prod,
            },
          },
        ],
      },
      {
        exclude: STYLES,
        test: /\.styl$/,
        loaders: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: !this._prod,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: !this._prod,
              paths: [],
            },
          },
        ],
      },
    ];
  }

  private ngProduction(): RuleSetRule[] {
    return [
      {
        include: STYLES,
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'extracted',
              plugins: this._plugins,
              sourceMap: false,
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.scss$|\.sass$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'extracted',
              plugins: this._plugins,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: [],
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.less$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'extracted',
              plugins: this._plugins,
              sourceMap: false,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.styl$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'extracted',
              plugins: this._plugins,
              sourceMap: false,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: false,
              paths: [],
            },
          },
        ],
      },
    ];
  }

  private ngDev(): RuleSetRule[] {
    return [
      {
        include: STYLES,
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'raw-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: true,
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.scss$|\.sass$/,
        loaders: [
          'style-loader',
          {
            loader: 'raw-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: [],
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.less$/,
        loaders: [
          'style-loader',
          {
            loader: 'raw-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        include: STYLES,
        test: /\.styl$/,
        loaders: [
          'style-loader',
          {
            loader: 'raw-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: this._plugins,
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: [],
            },
          },
        ],
      },
    ];
  }
}