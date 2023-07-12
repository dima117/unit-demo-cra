const fs = require('node:fs')
const path = require('node:path')
const solution = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'testInfo.txt')))

if ( solution.numFailedTestSuites ) throw new Error('Тесты не прошли!')