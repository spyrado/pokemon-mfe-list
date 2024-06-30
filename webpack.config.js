const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const deps = require("./package.json").dependencies;

module.exports = withModuleFederationPlugin({
  name: 'pokemonMfeList',
  exposes: {
    './Module': './src/app/app.module.ts',
  },
  remotes: {
    'shell': 'http://localhost:4200/remoteEntry.js',
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/core"] },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/common"] },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/router"] },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/common/http"] },
    "bootstrap": { singleton: true, strictVersion: true, requiredVersion: deps["bootstrap"] },
    'rxjs': { singleton: true, strictVersion: true, requiredVersion: '7.8.1' }
  }
});