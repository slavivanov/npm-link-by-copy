#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const globalRequire = require("require-global-node-module");
const yargs = require("yargs");

const cwd = process.cwd();
const argv = yargs.argv;

argv._.forEach(moduleName => {
  console.log("Copying [" + moduleName + "]");
  const modulePath = globalRequire.resolve(moduleName);

  const fullDestPath = path.join(cwd, "node_modules", moduleName);

  const destPath = fs.lstatSync(fullDestPath);
  if (destPath.isSymbolicLink()) {
    console.log("Was already simlinked [" + moduleName + "]. Removing the simlink first");
    fs.unlinkSync(fullDestPath)
  }

  fs.copy(modulePath, fullDestPath, { dereference: true }, error => {
    if (error) {
      console.log("Cannot copy [" + moduleName + "]. Error: " + error.message);
    } else {
      console.log("Copy of [" + moduleName + "] finished.");
    }
  });
});
