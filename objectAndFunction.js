/**
 * Javascript Object and Function
 * [Crockford]
 *
 * OBJECT:
 *  - Object contains Property (i.e., Name-Value pair)
 *  - Object has method(s); E.g., Math object has Math.floor(number) method
 *  - Object is linked to a "Prototype" object from which it can inherit properties
 *  - All objects created from object literals are linked to Object.prototype, an object that comes standard with JavaScript
 *  - When creating a "New" object, you can select the object that should be its prototype (see global.js - Object.create)
 *
 * FUNCTION:
 *  - Function is also Object
 *  - Function objects are linked to Function.prototype (which is itself linked to Object.prototype).
 *  - Function can be used to simulate Class
 *  -   METHOD is a function that is stored as a property of an object [p28]
 *  - Function has two hidden properties: context and code
 *  - During invocation, function receives: the declared parameters, this and arguments.
 *  -   The "this" parameter value is determined by the "invocation" patterns.
 *  -   There are four types: method, function, constructor (not recommended!!),
 *  -   and apply invocation patterns. [crockford ch4p27]
 */

var logger = require('./logger.js');

function run() {

    logger.info('objectAndFunction.js - run()');

    objectLiteral();

    /**
     * JavaScript includes a prototype linkage feature that allows one object to inherit the properties of another.
     * When used well, this can reduce object initialization time and memory consumption.
     * [http://www.phpied.com/3-ways-to-define-a-javascript-class/]
     */
    createObjectUsingNew();
    createObjectUsingNew_MethodDefinedInternally();
    createObjectUsingNew_MethodAddToPrototype();

    // Function Invocation - 4 Patterns
    var methodInvoc = {
        value: 0,
        increment: function (inc) {
            this.value += typeof inc === 'number' ? inc : 1;
        }
    };
    functionMethodInvocaton(methodInvoc);
    functionFunctionInvocation(methodInvoc);
    functionConstructorInvocation();
    functionApplyInvocation();

    logger.line();
}

function objectLiteral() {
    logger.info('Define a new object literal called person');
    var person = {
        "first-name": "Jerome",
        lastName: "Howard",
        address: {
            "street-no": 23,
            "street-name": "main",
            state: "CA"
        }
    };
    logger.info('  Person Name: ' + person["first-name"] + ' ' + person.lastName);
    logger.info('  Home street number: ' + person.address["street-no"]);
    logger.info('  Home street name: ' + person.address["street-name"]);
    logger.info('  Home state: ' + person["address"]["state"]);
    logger.info('  Home zip code: ' + (person["address"]["zip"] || "unknown") );

    logger.info('Reflection on object property type');
    logger.info('  Person lastname: ' + typeof person.lastName);
    logger.info('  Home street number: ' + typeof person.address["street-no"]);
    logger.info('  Has property AGE: ' + person.hasOwnProperty('age'));
}

/**
 * define a normal JavaScript function and then create an object by using the new keyword.
 */
function createObjectUsingNew() {
    function Apple (type) {
        this.type = type;
        this.color = "red";
        this.getInfo = getAppleInfo;
    }

    // anti-pattern!
    // Could be a problem if defined in the global namespace
    // See discussion in [http://www.phpied.com/3-ways-to-define-a-javascript-class/]
    function getAppleInfo() {
        return this.color + ' ' + this.type + ' apple';
    }

    var apple = new Apple('macintosh');
    apple.color = "reddish";
    logger.info('[External method] Apple details: ' + apple.getInfo());
}

/**
 * Same as createObjectUsingNew() except the getAppleInfo() method defined in the object
 */
function createObjectUsingNew_MethodDefinedInternally() {
    function Apple (type) {
        this.type = type;
        this.color = "red";
        this.getInfo = function() {
            return this.color + ' ' + this.type + ' apple';
        };
    }
    var apple = new Apple('macintosh');
    apple.color = "reddish";
    logger.info('[Internal method] Apple details: ' + apple.getInfo());
}

/**
 * In the createObjectUsingNew_MethodDefinedInternally(0 method,
 * the method getInfo() is recreated every time a new Apple object is created.
 * This is expensive!!!
 * A more inexpensive way is to add getInfo() to the prototype of the constructor function.
 */
function createObjectUsingNew_MethodAddToPrototype() {
    function Apple (type) {
        this.type = type;
        this.color = "red";
    }

    Apple.prototype.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
    var apple = new Apple('macintosh');
    apple.color = "reddish";
    logger.info('[Add method to Prototype] Apple details: ' + apple.getInfo());
}

/**
 * Pattern 1 - Method invocation
 *  The "this" is bound to the containing object
 */
function functionMethodInvocaton(methodInvoc) {
    logger.info('>> Pattern 1 - Method invocation');
    logger.info('methodInvoc.value = ' + methodInvoc.value);
    methodInvoc.increment();
    logger.info('After methodInvoc.increment(), methodInvoc.value = ' + methodInvoc.value );
}

/**
 * Pattern 2 - Function invocation
 *  "this" is bound to the global object due to language design mistake
 *
 *  The Workaround - "this" can be preserved using "that"
 */
function functionFunctionInvocation(methodInvoc) {
    logger.info('>> Pattern 2 - Function invocation');
    methodInvoc.double = function() {
        var that = this;  // workaround to make "this" available to helper function

        // function invocation
        var functionInvoc = function() {
            // this.value = this.value * 2;		// will not work because "this" is bound to global
            logger.info('"this" is bound to Global; this.value = ' + this.value);
            logger.info('"that" is used to preserve "this"; that.value = ' + that.value);
            that.value = that.value * 2;
        };
        functionInvoc();
        return this;
    };
    logger.info('double = ' + methodInvoc.double().value);
}

/**
 * Pattern 3 - Constructor invocation
 *  "this" is bound to the new object
 *
 * NOTE: Variable name needs to be Capitalized by convention.
 */
function functionConstructorInvocation() {
    logger.info('>> Pattern 3 - Constructor invocation');
    var ConstructorInvoc = function (string) {
        this.status = string;
    };
    var myConstructorInvoc = new ConstructorInvoc('confused');
    logger.info('Constructed object status = ' + myConstructorInvoc.status);
}

/**
 * Pattern 4 - Apply invocation
 *  "this" is bound to the "first" input param of apply() method
 */
function functionApplyInvocation() {
    logger.info('>> Pattern 4 - Apply invocation');
    var applyInvoc = {
        getStatus: function() {
            return this.status;
        }
    };
    var applyInvocObj = {
        status: 'OK'
    };
    logger.info('getStatus = ' + applyInvoc.getStatus.apply(applyInvocObj));
}

exports.run = run;