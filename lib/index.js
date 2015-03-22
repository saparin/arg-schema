/**
 * Arguments schema.
 * 
 * @module arg-schema
 */

/**
 * Wrapper for arguments array.
 * 
 * @constructor
 * @param	{array}	argArr		arguments array.
 */
module.exports = function(argArr){
	/**
	 * Check an argument schema.
	 * 
	 * Every argument is a definition in string form: '[opt] <type>'.
	 * Types: string, number, bool, object, function, array.
	 * For example:
	 * ```
	 * args.checkin('string a', 'number b', 'opt bool c', 'object d', 'array e', 'opt function f')
	 * ```
	 * 
	 * @return	`true` - arguments match the shema, `false` - not.
	 */
    this.checkin = function(){
        var arr, qual, type, name;

		function check(type, arg){
			if (is.unset(arg)) return true;
			switch(type){
				case 'string':
					if(is.string(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'number':
					if(is.number(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'bool':
					if(is.bool(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'object':
					if(is.object(arg)){
						this[name] = arg;
					}
					else return false;
                    break;
				case 'function':
					if(is.func(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'array':
					if(is.array(arg)){
						this[name] = arg;
					}
					else return false;
					break;
			}
			return true;
		}
		
        for (var i=0, j=0; i<arguments.length; i++) {
            arr = arguments[i].split(' ');
            qual = type = name = null;
            if(arr.length == 3){
                qual = arr[0];
                type = arr[1];
                name = arr[2];
            }
            else if(arr.length == 2){
                type = arr[0];
                name = arr[1];
            }
			delete this[name];
			if(qual == 'opt'){
				if(check.call(this, type, argArr[j])){
					j++;
				}
            }
            else{
				if(!check.call(this, type, argArr[j])) return false;
                j++;
            }
        }
        
        return true;
    }
}

function is(type, obj){
	return Object.prototype.toString.call( obj ) === "[object "+ type +"]";
}

is['string'] = function(obj){
	return (typeof obj == 'string' || obj instanceof String);
}
is.number = function(obj){
	return (typeof obj == 'number' || obj instanceof Number);
}
is.bool = function(obj){
	return (typeof obj == 'boolean' || obj instanceof Boolean);
}
is.object = function(obj){
	return (typeof obj == 'object');
}
is.array = function(obj){
	return (obj instanceof Array);
}
is.func = function(obj){
	return (obj instanceof Function);
}
is.set = function(obj){
	return (obj != undefined && obj != null);
}
is.unset = function(obj){
	return !this.set(obj);
}
