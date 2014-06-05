/**
 * Created by I824993 on 5/27/2014.
 */
console.log('global.js');

//*********************************************************************
// Prototype - - crockford ch3p22
// Object global method
// Create a new object that uses the given object (o) as its prototype
// create one if none exists
// USAGE: TBD
//*********************************************************************
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

//*********************************************************************
// Augmenting Function.prototype with a "method" method
// USAGE: TBD
//*********************************************************************
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

//*********************************************************************
// Convert number into integer
// e.g. (10/3).integer()
// TypeError no method ceiling
// USAGE:
//*********************************************************************
Number.method('integer', function ( ) {
	return Math[this < 0 ? 'ceiling' : 'floor'](this);
});

//*********************************************************************
// Trim - removes spaces from the ends of a string
// "Hello  ".trim()
// USAGE:
//*********************************************************************
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});

