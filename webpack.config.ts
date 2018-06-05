import { WebpackConfiguration, WebpackEnvironment } from './build/webpack-types';
import { WebpackConfigBuilder } from './build/webpack-config-builder';

export default function(e: WebpackEnvironment, argv: any): WebpackConfiguration {
  const builder = new WebpackConfigBuilder(e);
  return builder.build();
}