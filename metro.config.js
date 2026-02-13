const { getDefaultConfig } = require("expo/metro-config");

// Use the default Expo Metro config. Removed Rork-specific wrapping per user request.
const config = getDefaultConfig(__dirname);

module.exports = config;
