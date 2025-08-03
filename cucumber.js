module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/acceptence/steps/*.ts', 'tests/acceptence/support/*.ts'],
    paths: ['tests/acceptence/features/*.feature'],
    format: ['html:cucumber-report.html', 'json:cucumber-report.json'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};