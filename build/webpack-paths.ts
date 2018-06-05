import { resolve, join } from 'path';

const ROOT          = process.cwd();
const BROWSER_DIR   = resolve(ROOT, 'browser');
const SERVER_DIR    = resolve(ROOT, 'server');
const DIST_DIR      = resolve(ROOT, 'dist');

export const NODE_DIR      = resolve(ROOT, 'node_modules');
export const STYLES        = resolve(ROOT, 'browser/styles.scss');

export function projectRoot(path = '') {
  if (!path) return ROOT;
  return join(ROOT, path);
}

export function browserPath(path = '') {
  if (!path) return BROWSER_DIR;
  return join(BROWSER_DIR, path);
}

export function serverPath(path = '') {
  if (!path) return SERVER_DIR;
  return join(SERVER_DIR, path);
}

export function distPath(path = '') {
  if (!path) return DIST_DIR;
  return join(DIST_DIR, path);
}