import * as webpack from 'webpack';

export type WebpackConfiguration = webpack.Configuration;

export interface WebpackEnvironment {
  platform: Platform;
  env?: Environment;
  deploy?: boolean;
  deployUrl?: string;
  baseHref?: string;
  maximumInlineSize?: number;
}

export type Platform = PlatformType.Web | PlatformType.SSR | PlatformType.Server | PlatformType.All;
export enum PlatformType {
  Web = 'web',
  SSR = 'ssr',
  Server = 'server',
  All = 'all',
}

export type Environment = EnvironmentType.Development | EnvironmentType.Production;
export enum EnvironmentType {
  Development = 'dev',
  Production  = 'prod',
}

export interface PostCssConfig {
  deployUrl?: string;
  baseHref?: string;
  maximumInlineSize?: number;
  hashFormat?: { chunk: string, extract: string, file: string, script: string };
}