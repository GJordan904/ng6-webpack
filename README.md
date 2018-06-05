# Angular 6 Starter
Custom Webpack, Angular Material, SSR using ngUniversal and Express. Great Starting point for your next project. Clone 
the repo and start building.

***Notice** The webpack config still needs some tweaking to get bundle size down and currently an issue with the server 
bundle needs fixed. See issue 

## Basic scaffolding including:
+ A common module importing and exporting the Angular CommonModule and all Material Modules. It also registers and exports the Error and Layout Components.
+ Some common Angular animations that are located in the common module.
+ A media query service that registers multiple breakpoint Observers and provides them as a single Observable.
+ A base class for Components to extend that contains code shared among many or all component classes.
+ Basic app module, app-routing module, and app-ssr module

## Custom Webpack
The webpack config is written in Typescript and some convenience npm scripts are provided. Some of the Typescript comes
directly from the Angular project.

+ **build**: builds a development web bundle
+ **dev**: starts webpack-dev-server serving web bundle
+ **dev:server**: starts webpack in watch mode building the server code
+ **build:prod**: builds a production, AOT compiled web bundle
+ **build:ssr**: builds an SSR bundle
+ **build:server**: build the server bundle
+ **build:all**: build it all
+ **deploy**: build everything with the deploy flag set. You must add the url in the package.json, see scripts.deploy
+ **start**: servers the fully built app from the dist/server dir