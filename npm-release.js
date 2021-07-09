#!/usr/bin/env node

const fileio = require("@folkforms/file-io");
const { Command } = require('commander');

const npmRelease = (shell = dummyShellJs, props, argv) => {

  const program = new Command();
  program.option('-n, --dry-run', 'dry run');
  program.parse(argv);

  if(program.args.length === 0) {
    console.log("ERROR: No option chosen.");
    program.help();
  }

  const option = program.args[0];
  if(option === "genconfig") {
    const cmd1 = "./node_modules/docker-tasks/.npm-release-default-config.yml";
    const cmd2 = "./.npm-release.yml";
    const r = shell.cp(cmd1, cmd2);
    if(r.code) {
      shell.echo(`ERROR: Could not copy file '${cmd1}' to '${cmd2}'.`);
      return 1;
    }
    shell.echo("Created file .npm-release.yml. You need to edit this file with your project details.");
    return 0;
  }

  if(option === "run") {
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
  console.log("FIXME Print help text...");
  return 1;
}

module.exports = npmRelease;
