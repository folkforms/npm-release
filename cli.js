#!/usr/bin/env node

const fs = require("fs-extra");
const yaml = require("js-yaml");
const { dryRunShellJs } = require("./dummy-shells");
const npmRelease = require("./npm-release");

process.argv.splice(0,2); // Remove node and script name

// Strip out "-n/--dry-run" argument if present
let dryRun = false;
for(let i = 0; i < process.argv.length; i++) {
  if(process.argv[i] === "-n" || process.argv[i] === "--dry-run") {
    dryRun = true;
    process.argv.splice(i, 1);
    i--;
    continue;
  }
}
const shell = dryRun ? dryRunShellJs : undefined;

if(dryRun) { console.log(""); }

let file, props;
try {
  file = fs.readFileSync('.npm-release.yml', 'utf8')
  props = yaml.load(file);
} catch(e) {
  execFunction.echo("ERROR: Could not read file .npm-release.yml. Please run `yarn npm-release genconfig` if you have not done so already.");
  throw e;
}

npmRelease(shell, props, process.argv);

if(dryRun) { console.log(""); }
