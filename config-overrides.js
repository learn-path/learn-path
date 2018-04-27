const rewirePreact = require("react-app-rewire-preact");

/* config-overrides.js */
module.exports = function override(config, env) {
  // console.log("⚡ build with Preact");
  // config = rewirePreact(config, env);

  return config;
};
