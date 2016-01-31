class Shape {
  constructor(...args) {
    var self = this;
    var abstractMethods = [ 'areaFormula', 'squareFormula' ];

    this.sides = args;


    if(new.target === Shape) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }

    abstractMethods.forEach(function(method) {
      if(self[method] === undefined) {
        throw new TypeError('Class ' + self.constructor.name + ' must have ' + method + ' method');
      }
    });
  }

  static unitsMapping(inUnits, outUnits) {
    const unitMap = {
      'mm': {
        'mm': 1,
        'cm': 0.1,
        'm': 0.001
      },
      'cm': {
        'mm': 10,
        'cm': 1,
        'm': 100
      },
      'm': {
        'mm': 1000,
        'cm': 100,
        'm': 1
      }
    }

    return unitMap[inUnits][outUnits]
  }

  perimeter(units) {
    this._convertTo(units);

    return '' + this.squareFormula() + this.units();
  }

  area(units) {
    this._convertTo(units);

    return '' + this.areaFormula() + this.units() + '^2';
  }

  _convertTo(outUnits) {
    if(typeof outUnits === 'undefined' || typeof this._units === 'undefined') {
      throw new TypeError('Set incoming and/or outgoing units of measurement');
    }

    this.sides = this.sides.map(function(side) {
      return side * Shape.unitsMapping(this._units, outUnits);
    }, this);

    this._units = outUnits;
  }

  units(units) {
    if(typeof units === 'undefined') {
      return this._units;
    }

  	this._units = units;
    return this;
  }
}

class Rectangle extends Shape {
  constructor(...args) {
    if(args.length !== 2) {
      throw new TypeError('Incorrect amount of arguments');
    }

    super(...args);
  }

  squareFormula() {
    return this.sides.reduce(function(memo, element) {
      return memo + element * 2;
    }, 0);
  }

  areaFormula() {
    return this.sides[0] * this.sides[1];
  }
}

class Circle extends Shape {
  constructor(...args) {
    if(args.length !== 1) {
      throw new TypeError('Incorrect amount of arguments');
    }

  	super(...args);
  }

  squareFormula() {
  	return 2 * Math.PI * this.sides[0];
  }

  areaFormula() {
  	return Math.PI * Math.pow(this.sides[0], 2);
  }
}

class Triangle extends Shape {
  constructor(...args) {
    if(args.length !== 3) {
      throw new TypeError('Incorrect amount of arguments');
    }

  	super(...args);
  }

  squareFormula() {
    return this.sides.reduce(function(memo, element) {
      return memo + element;
    }, 0);
  }

  areaFormula() {
    let s = this.sides.reduce(function(memo, element) {
      return memo + element;
    }, 0) / 2;

    return Math.sqrt(this.sides.reduce(function(memo, side){
      return memo * (s - side);
    }, s));
  }
}

class Trapezoid extends Shape {
  constructor(...args) {
    if(args.length !== 4) {
      throw new TypeError('Incorrect amount of arguments');
    }

  	super(...args);
  }

  squareFormula() {
    return this.sides.reduce(function(memo, element) {
      return memo + element;
    }, 0);
  }

  areaFormula() {
    let sides = this.sides;
    let firstFactor = (sides[0] + sides[2])/2;
    let secondFactor = Math.pow(sides[1], 2)-1/4*
        Math.pow(((Math.pow(sides[1], 2)-Math.pow(sides[3], 2))/
        (sides[2]-sides[0])+sides[2]-sides[0]), 2);

    return firstFactor * Math.sqrt(secondFactor);
  }
}

let rect = new Rectangle(5, 2).units('mm');
let circ = new Circle(5).units('m');
let trian = new Triangle(3, 4, 5).units('m');
let trap = new Trapezoid(6, 3, 11, 3).units('m');

console.log('Rectangle perimeter = ' + rect.perimeter('m'));
console.log('Rectangle area = ' + rect.area('cm'));
console.log('Circle perimeter = ' + circ.perimeter('m'));
console.log('Circle area = ' + circ.area('mm'));
console.log('Triangle perimeter = ' + trian.perimeter('cm'));
console.log('Triangle area = ' + trian.area('mm'));
console.log('Trapezoid perimeter = ' + trap.perimeter('m'));
console.log('Trapezoid area = ' + trap.area('cm'));
