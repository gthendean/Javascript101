/**
* Startup from here
*/
var logger = require('./logger.js');
var appGlobal = require('./global.js');
var testGlobal = require('./globalTest.js');
var objectAndFunction = require('./objectAndFunction.js');
var objectInheritance = require('./objectInheritance.js');
var bestPractices = require('./bestPractices');

logger.info('Init global functions...');
appGlobal.init();
logger.info('Test global functions...');
testGlobal.runTests();
logger.line();

objectAndFunction.run();
logger.line();
objectInheritance.run();
logger.line();

bestPractices.run();
logger.line();



