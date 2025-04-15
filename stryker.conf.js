module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "jest",
    transpilers: ["babel"],
    coverageAnalysis: "off",

    files: ['./generated-tests-attributes-keys/*.test.js', 
            './**/*.js',
            '!./test/**/*.js',
            '!./node_modules/**/*.js',
            '!./generated-tests-depr/*.js', 
            '!./generated-tests-github/*.js',
            '!./filtered-test-modules*/*.js'],

    babel: {
      optionsFile: ".babelrc"
    }
  });
};
