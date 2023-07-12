const fs = require('node:fs')
const {resolve} = require('node:path')

const solution = String(fs.readFileSync(resolve(__dirname, '..', 'testInfo.txt')))
if ( solution.split('error')[1] ) throw new Error('Тесты не прошли!')