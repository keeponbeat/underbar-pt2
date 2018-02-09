const { each, reduce } = require('./underbar-pt1');

/**
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
const extend = function(obj) {
  const args = Array.from(arguments);
  let originalObj = args.shift();
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      originalObj[key] = obj[key];
    });
  });
  return originalObj;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
const defaults = function(obj) {
  const args = Array.from(arguments);
  let originalObj = args.shift();
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!(key in originalObj)) {
        originalObj[key] = obj[key];
      }
    });
  });
  return originalObj;
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  let alreadyCalled = false;
  let result;
  
  return function() {  
    if (!alreadyCalled) {
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    return result;
  };

};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
const memoize = function(func) {
  const memoizedFunc = function( /* keep things flexible with no explicit parameters, but that's ok in JavaScript */ ) {
    const cache = memoizedFunc.cache;
    const key = JSON.stringify(arguments);
    if (!cache[key]) {
      cache[key] = func.apply(this, arguments);
    }
    return cache[key];
  };
  memoizedFunc.cache = {};
  return memoizedFunc;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
const delay = function(func, wait) {
  const args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function() {
    return func.apply(null, args);
  }, wait);
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  let retArr = [].concat(arr);
  let n = retArr.length;
  let t;
  let i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);
    // And swap it with the current element.
    t = retArr[n];
    retArr[n] = retArr[i];
    retArr[i] = t;
  }
  return retArr;
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};
