var assert = require('assert')
  ,	argSchema = require('./lib/index');

function foo(){
    var args = new argSchema(arguments);
    if (args.checkin('string a', 'number b', 'opt bool c', 'object d', 'array e', 'opt function f')) {
		return {
			a: args.a,
			b: args.b,
			c: args.c,
			d: args.d,
			e: args.e,
			f: args.f,
			schema: 1
		};
    }
    else if (args.checkin('bool a', 'opt array b', 'opt bool c', 'opt function d')) {
		return {
			a: args.a,
			b: args.b,
			c: args.c,
			d: args.d,
			schema: 2
		};
    }
    else{
		return {
			schema: 0
		}
    }
}

it('schema 1: All arguments', function(cb){
	var a = 'AAA';
	var b = 111;
	var c = true;
	var d = {d: 'd'};
	var e = [1, 2, 3];
	var f = function(){};
	var res = foo(a, b, c, d, e, f);
	assert.deepEqual(res, {a: a, b: b, c: c, d: d, e: e, f: f, schema: 1},
					'Wrong result');
	cb();
});

it('schema 1: Skip optional arguments', function(cb){
	var a = 'AAA';
	var b = 111;
	var d = {d: 'd'};
	var e = [1, 2, 3];
	var res = foo(a, b, d, e);
	assert.deepEqual(res, {a: a, b: b, c: undefined, d: d, e: e, f: undefined, schema: 1},
					'Wrong result');
	cb();
});

it('schema 2: All arguments', function(cb){
	var a = true;
	var b = [1, 2, 3];
	var c = false;
	var d = function(){};
	var res = foo(a, b, c, d);
	assert.deepEqual(res, {a: a, b: b, c: c, d: d, schema: 2},
					'Wrong result');
	cb();
});

it('schema 2: Skip second optional argument', function(cb){
	var a = true;
	var c = false;
	var d = function(){};
	var res = foo(a, c, d);
	assert.deepEqual(res, {a: a, b: undefined, c: c, d: d, schema: 2},
					'Wrong result');
	cb();
});

it('schema 2: Skip last optional argument', function(cb){
	var a = true;
	var b = [1, 2, 3];
	var c = false;
	var res = foo(a, b, c);
	assert.deepEqual(res, {a: a, b: b, c: c, d: undefined, schema: 2},
					'Wrong result');
	cb();
});

it('schema 2: Skip all optional arguments', function(cb){
	var a = true;
	var c = false;
	var res = foo(a, c);
	assert.deepEqual(res, {a: a, b: undefined, c: c, d: undefined, schema: 2},
					'Wrong result');
	cb();
});

it('schema 2: Wrong types of second and third arguments', function(cb){
	var a = true;
	var b = false;
	var c = [1, 2, 3];
	var d = function(){};
	var res = foo(a, b, c, d);
	assert.deepEqual(res, {a: a, b: undefined, c: false, d: undefined, schema: 2},
					'Wrong result');
	cb();
});

it('wrong schema 1: Skip first mandatory argument', function(cb){
	var b = 111;
	var c = true;
	var d = {d: 'd'};
	var e = [1, 2, 3];
	var f = function(){};
	var res = foo(b, c, d, e, f);
	assert.deepEqual(res, {schema: 0},
					'Wrong result');
	cb();
});

it('wrong schema 2: Wrong type of first mandatory argument', function(cb){
	var a = 0;
	var b = [1, 2, 3];
	var c = false;
	var d = function(){};
	var res = foo(a, b, c, d);
	assert.deepEqual(res, {schema: 0},
					'Wrong result');
	cb();
});
