/**
 * Testing global functions defined in global.js
 */
var logger = require('./logger.js');

function runTests() {
    testObjectCreate();
    testFunctionMethod();
}

function testObjectCreate() {
    logger.info('>> Test Object.create');
    var mammal = {
        'blood' : 'warm',
        'says' : 'none'
    };
    // create object that uses mammal as its prototype
    var cat = Object.create(mammal);
    // Prototype link is used in Retrieval
    // cat inherit 'blood' from prototype (i.e., mammal)
    logger.info('Cat blood inherit from prototype: ' + cat.blood);
    // Prototype link has no effect on updating
    cat.blood = 'hot';
    logger.info('Update cat blood: ' + cat.blood);
    logger.info ('Mammal blood: ' + mammal.blood);
}

/**
 * The global functions: "Number.method" and "String.method" uses the Function.prototype.method
 */
function testFunctionMethod() {
    logger.info('>> Test Function.prototype.method');
    logger.info('(10/3) rounded to integer = ' + (10/3).integer());
    logger.info ('Trimmed "Hello  " = ' + "Hello  ".trim());
}

exports.runTests = runTests;