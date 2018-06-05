import * as autoprefixer from 'autoprefixer';
import { join, relative } from 'path';
import * as postcssUrl from 'postcss-url';
import * as postcssImports from 'postcss-import';
import { projectRoot } from '../webpack-paths';
import PostcssCliResources from './postcss-cli-resources';

export function postcssPluginFactory({deployUrl, baseHref, maximumInlineSize, hashFormat}) {
  const root = projectRoot();

  return (loader) => [
    postcssImports({
      resolve: (url, context) => {
        return new Promise((resolve, reject) => {
          let hadTilde = false;
          if (url && url.startsWith('~')) {
            url = url.substr(1);
            hadTilde = true;
          }
          loader.resolve(context, (hadTilde ? '' : './') + url, (err, result) => {
            if (err) {
              if (hadTilde) {
                reject(err);
                return;
              }
              loader.resolve(context, url, (er, res) => {
                if (er) {
                  reject(er);
                }
                else {
                  resolve(res);
                }
              });
            }
            else {
              resolve(result);
            }
          });
        });
      },
      load: (filename) => {
        return new Promise((resolve, reject) => {
          loader.fs.readFile(filename, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            const content = data.toString();
            resolve(content);
          });
        });
      },
    }),
    postcssUrl({
      filter: ({ url }) => url.startsWith('~'),
      url: ({ url }) => {
        const fullPath = join(root, 'node_modules', url.substr(1));
        return relative(loader.context, fullPath).replace(/\\/g, '/');
      },
    }),
    postcssUrl([
      {
        // Only convert ROOT relative URLs, which CSS-Loader won't process into require().
        filter: ({ url }) => url.startsWith('/') && !url.startsWith('//'),
        url: ({ url }) => {
          if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
            // If deployUrl is absolute or ROOT relative, ignore baseHref & use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${url}`;
          }
          else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return baseHref.replace(/\/$/, '') +
              `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
          else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
        },
      },
      {
        filter: (asset) => {
          return maximumInlineSize > 0 && !asset.hash && !asset.absolutePath.endsWith('.cur');
        },
        url: 'inline',
        // NOTE: maxSize is in KB
        maxSize: maximumInlineSize,
        fallback: 'rebase',
      },
      { url: 'rebase' },
    ]),
    PostcssCliResources({
      deployUrl: loader.loaders[loader.loaderIndex].options.ident === 'extracted' ? '' : deployUrl,
      loader,
      filename: `[name]${hashFormat.file}.[ext]`,
    }),
    autoprefixer({ grid: true }),
  ];
}