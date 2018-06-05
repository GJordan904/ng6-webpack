import { Plugin } from 'webpack';

declare module 'circular-dependency-plugin' {
  export class CircularDependencyPlugin extends Plugin {
    constructor(args?: any)
  }
}