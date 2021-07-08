#!/usr/bin/env node

const fileio = require("@folkforms/file-io");
const { Command } = require('commander');

const npmRelease = (shell = dummyShellJs, props, argv) => {

  const program = new Command();
  program.version('0.0.1');
  // program.option('-d, --debug', 'output extra debugging');
  program.option('-n, --dry-run', 'dry run');

  program.parse(argv);

  console.log(`program.args = ${JSON.stringify(program.args)}`);
  if(program.args.length === 0) {
    console.log("ERROR: No option chosen.");
    // print help
    return 1;
  }
  const option = program.args[0];

  if(option === "genconfig") {
    const cmd1 = "./node_modules/docker-tasks/.npm-release-default-config.yml";
    const cmd2 = "./.npm-release.yml";
    const r = shell.cp(cmd1, cmd2);
    if(r.code) {
      execFunction.echo(`ERROR: Could not copy file '${cmd1}' to '${cmd2}'.`);
      return 1;
    }
    execFunction.echo("Created file .npm-release.yml. You need to edit this file with your project details.");
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
  }
}

module.exports = npmRelease;
