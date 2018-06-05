import { Plugin, Transformer as PostcssTransformer } from 'postcss';

declare namespace postcssImports {

  interface Transformer extends PostcssTransformer {
    info(): string;
  }

  interface PostcssImports extends Plugin<any> {
    (opts?: any): Transformer;
  }
}

declare const postcssImports: postcssImports.PostcssImports;
export = postcssImports;