module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/acceptance/steps/*.ts', 'tests/acceptance/support/*.ts'],
    paths: ['tests/acceptance/features/*.feature'],
    format: ['html:cucumber-report.html', 'json:cucumber-report.json'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};