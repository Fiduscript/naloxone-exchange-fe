/**
 * Adds the pug-loader inside Angular CLI's webpack config, if not there yet.
 * @see https://github.com/danguilherme/ng-cli-pug-loader
 * Modified as per step 4 here: https://hackernoon.com/using-docker-docker-compose-angular-cli-6-sass-and-pug-jade-160896dfd208
 */
const fs = require('fs');
const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';
const pugRule = '{ test: /.pug$/, use: [ { loader: "apply-loader" }, { loader: "pug-loader" } ] },';

const data = fs.readFileSync(commonCliConfig);
const configText = data.toString();

// make sure we don't add the rule if it already exists
if (configText.indexOf(pugRule) > -1) { return; }

// Insert the pug webpack rule
const position = configText.indexOf('rules: [') + 8;
const output = [configText.slice(0, position), pugRule, configText.slice(position)].join('');
const file = fs.openSync(commonCliConfig, 'r+');
fs.writeFileSync(file, output);
fs.closeSync(file);
