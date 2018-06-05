import { Plugin, Transformer as PostcssTransformer } from 'postcss';

declare namespace postcssUrl {

  interface Transformer extends PostcssTransformer {
    info(): string;
  }

  interface PostcssUrl extends Plugin<any> {
    (opts?: any): Transformer;
  }
}

declare const postcssUrl: postcssUrl.PostcssUrl;
export = postcssUrl;