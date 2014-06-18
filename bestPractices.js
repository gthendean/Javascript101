/**
 * Javascript Best Practices
 *
 * Code convention
 *      http://javascript.crockford.com/code.html
 */

var logger = require('./logger.js');

mobile = {};
mobile.module = {};

function run() {

    logger.info('bestPractices.js - run()');

    /**
     * Variable and Scope [Crockford Ch4pg36]
     *
     * Javascript does NOT have block scope.
     * Therefore, declare all of the variables used in the function
     * at the TOP of the function body.
     */
    var tmp = 1;

    // Best Practice - Global Abatement using Module
    useModule();
    logger.info('');

    // Best Practice - Proper Module Encapsulation
    moduleEncapsulation();
    logger.info('');

    // Best Practice - INHERITANCE
    useInheritance();
    logger.info('');

    // Best Practice - CLOSURE
    powerOfClosure();
    logger.info('');
}


/**
 * GLOBAL ABATEMENT [Crockford ch3p25]
 *  Using MODULE
 *
 * Application global variable that behaves like Java package name,
 * and prevent assigning to Global
 */
function useModule() {

    mobile.module.objectA = {
        name: 'John Doe',
        type: 0,
        get_name: function() {
            logger.info('get_Name - is a Method of objectA');
            logger.info('"Method" is a function that is stored as a property of an object ');
            logger.info('"this" refers to the object');
            return this.name;
        }
    };
    logger.info('>> objectA defined within the module = ' + mobile.module.objectA);

    logger.info('[Method Invocation]');
    logger.info('>> sap.mobile.module.objectA.get_Name(): ' + mobile.module.objectA.get_name());

    logger.info('');
    logger.info('How to create Function in the module');
    logger.info('>> sap.mobile.module.FunctionA');
    logger.info('"Function" is a function that is NOT a property of an object.');
    logger.info('"this" refers to Global object; not the module object');
    logger.info('Also see "objectAndFunction.js" to demo "this" as global object.');
    mobile.module.FunctionA = function(strName) {
        this.name = strName;
        this.getName = function() {
            return this.name;
        };
    };
    var functionA = new mobile.module.FunctionA('John');
    logger.info('[Pattern 2 - Function Invocation]');
    logger.info('>> functionA.name =' + functionA.name);
    logger.info('>> functionA.getName() = ' + functionA.getName());
    logger.info('>> functionA =');
    logger.info(functionA);
    logger.info('>> check for: functionA.__proto__');
    logger.info('>> check for: functionA.__proto__.constructor');
    logger.info('>> check for: functionA.__proto__.constructor.<function scope>');
}

/**
 * Module ENCAPSULATION [crockford ch4p40]
 *  Proper module encapsulation
 */
function moduleEncapsulation() {
    logger.info('How to use Module Encapsulation');
    mobile.module.serial_maker = function(prefix, seq) {
        return {
            gensym: function() {
                var result = prefix + seq;
                seq += 1;
                return result;
            }
        };
    };
    var seqer = mobile.module.serial_maker('Q', 1000);
    logger.info('>> seqer =' + seqer);
    var unique1 = seqer.gensym(); // unique is "Q1000"
    logger.info('>> Serial number 1: ' + unique1);
    var unique2 = seqer.gensym(); // unique is "Q1001"
    logger.info('>> Serial number 2: ' + unique2);    
}

/**
 * INHERITANCE [crockford]
 *  instanceB INHERITS from instanceA, so
 *  instanceB prototype is linked to instanceA
 */
function useInheritance() {
    logger.info('How to Create Simple Object inheritance');
    var objectB = Object.create(mobile.module.objectA); // see Object.create in global.js
    logger.info('>> Inherited from objectA - objectB.name =' + objectB.name);
    logger.info('>> objectB =');
    logger.info(objectB);
    logger.info('>> check for: objectB.__proto__');
    logger.info('>> check for: objectB.__proto__.__proto__');
    logger.info('>> check for: objectB.__proto__.__proto__.constructor');
    logger.info('>> check for: objectB.__proto__.__proto__.constructor.prototype ...');
    logger.info('>> check for: objectB.__proto__.__proto__.constructor.__proto__');
    logger.info('>> check for: objectB.__proto__.__proto__.constructor.<function scope>');
    logger.info('>> check for: objectB.__proto__.__proto__.__proto__');
    logger.info('');

    logger.info('E.g., Create Person Object and Teacher inherit from Person');
    var person = function(spec) {
        var that = {};
        that.is_living = function() {
            return spec.living || true;
        };
        that.get_age = function() {
            return spec.age || 0;
        };
        that.get_gender = function() {
            return spec.gender || 'Unknown';
        };
        return that;
    };
    var John = person({
        'living': true,
        'age': 34,
        'gender': 'Male'
    });
    logger.info('Person - John is: ' + John.get_gender());

    var teacher = function(spec) {
        spec.hobby = spec.hobby || '';
        spec.occupation = 'teacher';
        var that = person(spec);
        that.get_hobby = function() {
            return spec.hobby;
        };
        that.get_occupation = function() {
            return spec.occupation;
        };
        return that;
    };
    var Marty = teacher({});
    logger.info('Teacher - Marty is alive: ' + Marty.is_living());
    logger.info('Teacher - Marty age is: ' + Marty.get_age());
    logger.info('Teacher - Marty is: ' + Marty.get_gender());
    logger.info('Teacher - Marty hobby is: ' + Marty.get_hobby());
    logger.info('Teacher - Marty is: ' + Marty.get_occupation());
}

/**
 * CLOSURE
 *  Power of Closure - [crockford ch4p37]
 */
function powerOfClosure() {
    logger.info('Show the power of Closure');
    mobile.module.objIncrementor = function() {
        var value = 1; // closure
        return {
            increment: function(inc) {
                value += typeof inc === 'number' ? inc : 1;
            },
            getValue: function() {
                return value;
            }
        };
    }(); // notice ()
    logger.info('>> mobile.module.objIncrementor.value =' +
                            mobile.module.objIncrementor.value);
    logger.info('>> mobile.module.objIncrementor.getValue() =' +
                            mobile.module.objIncrementor.getValue());
    mobile.module.objIncrementor.increment(2);
    logger.info('>> After increment by 2, the value is: ' + mobile.module.objIncrementor.getValue());
    logger.info('>> check for: objIncrementor.getValue.<function scope>.Closure');
    logger.info('>> check for: objIncrementor.increment.<function scope>.Closure');

}

exports.run = run;