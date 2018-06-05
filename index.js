const path = require("path");
const fs = require("fs-extra");
const globalRequire = require("require-global-node-module");
const yargs = require("yargs");

const cwd = process.cwd();
const argv = yargs.argv;

const log = (...msg) => console.log("[nlc]", ...msg);
log.verb = argv.verbose ? log : () => {};
log.err = (...msg) => console.error("[nlc] [error]", ...msg);

argv._.forEach(moduleName => {
  const mlog = (...msg) => log("[" + moduleName + "]", ...msg);
  mlog.verb = (...msg) => log.verb("[" + moduleName + "]", ...msg);
  mlog.err = (...msg) => log.err("[" + moduleName + "]", ...msg);
  const modulePath = globalRequire.resolve(moduleName);

  const fullDestPath = path.join(cwd, "node_modules", moduleName);
  fs.copy(modulePath, fullDestPath, { dereference: true }, error => {
    if (error) {
      mlog.err("Cannot copy", error.message);
    } else {
      mlog.verb("Copy done");
    }
  });
});
