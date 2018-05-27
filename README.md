# DataTable


## getting started

After completing the steps below, you will be ready to begin using starbase:

1. Install [Node.js](https://nodejs.org) (latest LTS recommended)
2. Clone starbase into your project root directory
3. Install dependencies by running `npm install` in your project root directory

## building, watching & developing

### local development

starbase uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to serve up your project at [http://localhost:8080](http://localhost:8080) for streamlined and convenient development.

After running `npm run dev:start` in the project root, your `/src` code will be served at the url above and watched for changes. As you modify code in `/src`, the project will be recompiled and your browser will refresh to show the latest changes.

```
cd /path/to/starbase
npm run dev:start
```

### building for production
Use `npm run build` in your project root to run a production build.

Production builds compile & minify your assets into `/dist` for distribution and/or integration into whatever codebase you'll be using these assets in.

```
cd /path/to/starbase
npm run build
```
