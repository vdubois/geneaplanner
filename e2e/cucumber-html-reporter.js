const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: '/workspace/e2e/cypress/reports/cucumber-report.json',
  output: '/workspace/e2e/cypress/reports/index.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  brandTitle: "Tests d'acceptation de Généaplanner"
};

reporter.generate(options);
