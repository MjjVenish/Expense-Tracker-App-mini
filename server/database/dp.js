const pgp = require("pg-promise")();
const fs = require("fs");
const path = require("path");

const configFile = path.join(__dirname, "../config/dpConfig.json");
const dpConfig = JSON.parse(fs.readFileSync(configFile, "utf8"));

const { port, host, user, password, database } = dpConfig;

const connctDb = {
  host,
  password,
  port,
  database,
  user,
  allowExitOnIdle: true,
};
const dp = pgp(connctDb);

module.exports = dp;
