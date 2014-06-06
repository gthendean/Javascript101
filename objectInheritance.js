/**
 * Object Inheritance
 *
 */

var logger = require('./logger.js');

function run() {

    logger.info('objectInheritance.js - run()');

    //
    inheritancePseudoclassical();

    // Better Approach
    inheritancePrototypal();

    // BEST Approach
    inheritanceFunctional();
}

function inheritancePseudoclassical () {
    logger.info('>> Type 1 INHERITANCE - Pseudoclassical');
    logger.info('Function Mammal');
    var Mammal = function (name) {
        this.name = name;
    };
    Mammal.prototype.get_name = function ( ) {
        return this.name;
    };
    Mammal.prototype.says = function ( ) {
        return this.saying || '';
    };
    var Cat = function (name) {
        this.name = name;
        this.saying = 'meow';
    };
    // Cat inherits from Mammal
    logger.info('Function Cat inherits from Mammal - detail way');
    Cat.prototype = new Mammal( );
    Cat.prototype.purr = function () {
        return 'purr';
    };
    // Override the Mammal get_name()
    Cat.prototype.get_name = function ( ) {
        return this.says( ) + ' ' + this.name +
            ' ' + this.says( );
    };

    // Dog inherit from Mammal using cleaner way
    logger.info('Dog inherits from Mammal - cleaner technique');
    Function.method('inherits', function (Parent) {
        this.prototype = new Parent( );
        return this;
    });
    var Dog = function (name) {
        this.name = name;
        this.saying = 'hoof';
    }.
        inherits(Mammal).
        method('bark', function () {
            return 'hoof-hoof';
        }).
        method('get_name', function ( ) {
            return this.says( ) + ' ' + this.name +
                ' ' + this.says( );
        });

    var myMammal = new Mammal('Herb the Mammal');
    var m_name = myMammal.get_name( ); // 'Herb the Mammal'

    var myCat = new Cat('Henrietta');
    var says = myCat.says( ); // 'meow'
    var purr = myCat.purr(); // 'r-r-r-r-r'
    var c_name = myCat.get_name(); // 'meow Henrietta meow'

    var myDog = new Dog('lucky');
    logger.info('Issue with Pseudoclassical INHERITANCE:');
    logger.info(' no privacy, all properties are public.');    
}

function inheritancePrototypal() {
    logger.info('>> Type 2 INHERITANCE - Prototypal - Better approach');
    logger.info('Object Mammal');
    var myMammal = {
        name : 'Herb the Mammal',
        get_name : function ( ) {
            return this.name;
        },
        says : function ( ) {
            return this.saying || '';
        }
    };
    logger.info('differential inheritance - Object Cat has Object Mammal prototype');
    var myCat = Object.create(myMammal);
    myCat.name = 'Henrietta';
    myCat.saying = 'meow';
    myCat.purr = function () {
        return 'purr';
    };
    myCat.get_name = function () {
        return this.says( ) + ' ' + this.name + ' ' + this.says( );
    };
}

function inheritanceFunctional() {
    logger.info('>> Type 3 INHERITANCE - Functional - Best approach');
    logger.info('Also see BEST PRACTICE - INHERITANCE.');
    logger.info('Function Mammal');
    var mammal = function (spec) {
        var that = {};
        that.get_name = function ( ) {
            return spec.name;
        };
        that.says = function ( ) {
            return spec.saying || '';
        };
        return that;
    };
    var cat = function (spec) {
        spec.saying = spec.saying || 'meow';
        var that = mammal(spec);
        that.purr = function () {
            return 'purr';
        };
        that.get_name = function () {
            return that.says( ) + ' ' + spec.name +
                ' ' + that.says( );
        };
        return that;
    };
    var hisMammal = mammal({name: 'Herb'});
    logger.info('Herb Mammal = ' + hisMammal);
    var hisCat = cat({name: 'Henrietta'});    
}

exports.run = run;