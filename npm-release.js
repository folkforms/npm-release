#!/usr/bin/env node

const fileio = require("@folkforms/file-io");
const shelljs = require("shelljs");

// FIXME if(argument === "genconfig") { generate default config }

// Default config:
// yarn test
// npm whoami
// yarn install --production --force
// npm version patch
// npm publish
// yarn install

const contents = fileio.readLines(".npm-release.yml");
contents.forEach(line => {
  const result = shelljs.exec(line);
  if(result.code != 0) {
    console.log(`Error running command '${line}' (${result.code})`);
    shelljs.exit(result.code);
  }
});
