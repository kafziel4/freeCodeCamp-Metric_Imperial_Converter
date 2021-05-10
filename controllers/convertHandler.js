function ConvertHandler() {
  
  const inputRegex = /[a-z]+|[^a-z]+/gi;

  this.getNum = function(input) {
    let result;
    
    result = input.match(inputRegex)[0];

    let numberRegex = /\d/;

    if(numberRegex.test(result) === false) {
      result = 1;
    }

    if(result.toString().includes('/')) {
      let values = result.split('/');
      if(values.length !==2) {
        return 'invalid number';
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = (values[0] / values[1]).toFixed(5);
    }

    if(isNaN(result)) {
      return 'invalid number';
    }

    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result;

    result = input.match(inputRegex)[1];

    if(!result) {
      result= input.match(inputRegex)[0];
    }

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    if(!validUnits.includes(result)) {
      return 'invalid unit';
    }

    if(result === 'l' || result === 'L') {
      result = result.toUpperCase();
    }
    else {
      result = result.toLowerCase();
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit) {
      case 'gal':
      case 'GAL':
        result = 'L';
        break;
      case 'l':
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
      case 'LBS':
        result = 'kg';
        break;
      case 'kg':
      case 'KG':
        result = 'lbs';
        break;
      case 'mi':
      case 'MI':
        result = 'km';
        break;
      case 'km':
      case 'KM':
        result = 'mi';
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit) {
      case 'gal':
      case 'GAL':
        result = 'gallons';
        break;
      case 'l':
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
      case 'LBS':
        result = 'pounds';
        break;
      case 'kg':
      case 'KG':
        result = 'kilograms';
        break;
      case 'mi':
      case 'MI':
        result = 'miles';
        break;
      case 'km':
      case 'KM':
        result = 'kilometers';
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit){
      case 'gal':
      case 'GAL':
        result = (initNum * galToL).toFixed(5);
        break;
      case 'l':
      case 'L':
        result = (initNum / galToL).toFixed(5);
        break;
      case 'lbs':
      case 'LBS':
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
      case 'KG':
        result = (initNum / lbsToKg).toFixed(5);
        break;
      case 'mi':
      case 'MI':
        result = (initNum * miToKm).toFixed(5);
        break;
      case 'km':
      case 'KM':
        result = (initNum / miToKm).toFixed(5);
        break;
    }
    
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };
  
}

module.exports = ConvertHandler;
