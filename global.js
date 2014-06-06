/**
 * Global functions definitions
 *
 */
var logger = require('./logger.js');

function init() {

    logger.info('global.js - init()');

    /**
     * Prototype - - crockford ch3p22
     * Object global method
     * Create a new object that uses the given object (o) as its prototype
     * create one if none exists
     *
     * USAGE: var cat = Object.create(mammal);
     */
    if (typeof Object.create !== 'function') {
        Object.create = function(o) {
            var F = function() {};
            F.prototype = o;
            return new F();
        };
    }

    /**
     * Augmenting Function.prototype with a "method" method.
     * This "method" function becomes available to all function.
     *
     * USAGE: see "Number.method" and "String.method" below
     *
     * @param name
     * @param func
     * @returns {Function}
     */
     Function.prototype.method = function(name, func) {
        if (!this.prototype[name]) {
            this.prototype[name] = func;
        }
        return this;
    };

    /**
     * Convert number into integer
     * TypeError no method ceiling
     *
     * USAGE: e.g. (10/3).integer()
     */
    Number.method('integer', function ( ) {
        return Math[this < 0 ? 'ceiling' : 'floor'](this);
    });

    /**
     * Trim - removes spaces from the ends of a string
     *
     * USAGE: "Hello  ".trim()
     */
    String.method('trim', function() {
        return this.replace(/^\s+|\s+$/g, '');
    });
}

exports.init = init;

