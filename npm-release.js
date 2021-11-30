#!/usr/bin/env node

const shelljs = require("shelljs");
const { Command } = require('commander');
const genconfig = require("./genconfig");

const npmRelease = (shell = shelljs, props, argv) => {

  const program = new Command();
  program.option('-n, --dry-run', 'dry run');
  program.parse(argv);

  // if(program.args.length === 0) {
  //   console.log("ERROR: No option chosen.");
  //   program.help();
  // }

  const option = program.args[0];
  if(option === "genconfig") {
    genconfig();
    shell.echo("Created file .npm-release.yml. You need to edit this file with your project details.");
    return 0;
  }

  // Default option
  if(!option) {
    props.forEach(line => {
      const result = shell.exec(line);
      if(result.code != 0) {
        console.log(`Error running command '${line}' (${result.code})`);
        shell.exit(result.code);
      }
    });
    return 0;
  }

  console.log(`ERROR: Unknown command '${option}'`);
  program.help();
  return 1;
}

module.exports = npmRelease;
