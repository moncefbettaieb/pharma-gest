module.exports = {
    moduleFileExtensions: ['js', 'vue'],
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest', // Utilisez vue3-jest pour Vue 3
      '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1' 
    },
    testMatch: ['**/tests/unit/**/*.spec.js']
  };
  