const fileio = require("@folkforms/file-io");

const genconfig = () => {
  const config = [
    "- yarn test",
    "- yarn line-endings",
    "- npm whoami",
    "- yarn install --production --force",
    "- npm version patch",
    "- npm publish",
    "- yarn install",
    "- git push",
  ];
  const path = "./.npm-release.yml";
  if(fileio.exists(path)) {
    throw new Error(`ERROR: The file ${path} already exists.`);
  } else {
    fileio.writeLines(path, config);
  }
}

module.exports = genconfig;
