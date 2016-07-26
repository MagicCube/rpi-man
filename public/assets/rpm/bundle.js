webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(135);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _ApplicationController = __webpack_require__(5);

	var _ApplicationController2 = _interopRequireDefault(_ApplicationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function main() {
	    var applicationController = new _ApplicationController2.default();
	    applicationController.view.placeAt(document.body);
	    applicationController.run();
	}

	window.$ = $;
	$(main);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(10);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ApplicationController = __webpack_require__(117);

	var _ApplicationController2 = _interopRequireDefault(_ApplicationController);

	var _Application = __webpack_require__(123);

	var _Application2 = _interopRequireDefault(_Application);

	var _HomeSceneController = __webpack_require__(124);

	var _HomeSceneController2 = _interopRequireDefault(_HomeSceneController);

	var _MonitorSceneController = __webpack_require__(130);

	var _MonitorSceneController2 = _interopRequireDefault(_MonitorSceneController);

	var _SysInfoSceneController = __webpack_require__(133);

	var _SysInfoSceneController2 = _interopRequireDefault(_SysInfoSceneController);

	var _api = __webpack_require__(128);

	var _api2 = _interopRequireDefault(_api);

	var _model = __webpack_require__(129);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ApplicationController = function (_NJUApplicationContro) {
	    (0, _inherits3.default)(ApplicationController, _NJUApplicationContro);

	    function ApplicationController() {
	        (0, _classCallCheck3.default)(this, ApplicationController);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ApplicationController).apply(this, arguments));
	    }

	    (0, _createClass3.default)(ApplicationController, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(ApplicationController.prototype), "init", this).call(this);

	            this._homeSceneController = new _HomeSceneController2.default();
	            this._monitorSceneController = new _MonitorSceneController2.default();
	            this._sysInfoSceneController = new _SysInfoSceneController2.default();

	            this._initHash();
	        }
	    }, {
	        key: "createView",
	        value: function createView(options) {
	            return new _Application2.default();
	        }
	    }, {
	        key: "run",
	        value: function () {
	            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                this.view.showLoading();
	                                _model2.default.load();
	                                this.pushSceneController(this.homeSceneController, "/");
	                                this.view.hideLoading();

	                            case 4:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));

	            function run() {
	                return _ref.apply(this, arguments);
	            }

	            return run;
	        }()
	    }, {
	        key: "pushSceneController",
	        value: function pushSceneController(sceneController, path) {
	            if (this.getHashPath() === path && path === "/") {} else {
	                this.setHashPath(path);
	            }
	            this.mapScene(path, sceneController);
	            this.activateSceneController(sceneController, { animation: this.activeSceneController ? "push" : false });
	        }
	    }, {
	        key: "activateSceneController",
	        value: function activateSceneController(sceneController) {
	            var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var _ref2$animation = _ref2.animation;
	            var animation = _ref2$animation === undefined ? false : _ref2$animation;

	            if (this.activeSceneController === sceneController) {
	                return;
	            }
	            var viewToBeRemoved = null;
	            if (this.activeSceneController) {
	                this.activeSceneController.trigger("deactivating");
	                viewToBeRemoved = this.activeSceneController.view;
	                this.activeSceneController.trigger("deactivated");
	                this._activeSceneController = null;
	            }
	            this._activeSceneController = sceneController;
	            sceneController.parent = this;
	            this.activeSceneController.trigger("activating");
	            if (animation) {
	                if (animation === "push") {
	                    sceneController.view.css({
	                        x: window.innerWidth,
	                        y: 0,
	                        opacity: 0
	                    });
	                    this.view.addSubview(sceneController.view);
	                    sceneController.view.$element.transition({
	                        x: 0,
	                        opacity: 1
	                    }, 300, function () {
	                        if (viewToBeRemoved) {
	                            viewToBeRemoved.removeFromParent();
	                        }
	                    });
	                } else {
	                    animation = false;
	                }
	            }
	            if (!animation) {
	                if (viewToBeRemoved) {
	                    this.view.removeSubview(viewToBeRemoved);
	                }
	                sceneController.view.css({
	                    x: 0,
	                    y: 0
	                });
	                this.view.addSubview(sceneController.view);
	            }
	            this.activeSceneController.trigger("activated");
	        }
	    }, {
	        key: "_initHash",
	        value: function _initHash() {
	            var _this2 = this;

	            window.addEventListener("hashchange", function () {
	                var path = _this2.getHashPath();
	                if (_this2.sceneControllers[path]) {
	                    _this2.activateSceneController(_this2.sceneControllers[path]);
	                }
	            });
	        }
	    }, {
	        key: "getHashPath",
	        value: function getHashPath() {
	            if (location.hash === "" || location.hash === "#") {
	                return "/";
	            } else {
	                return location.hash.substr(1);
	            }
	        }
	    }, {
	        key: "setHashPath",
	        value: function setHashPath(path) {
	            location.hash = path;
	        }
	    }, {
	        key: "mapScene",
	        value: function mapScene(path, sceneController) {
	            this.sceneControllers[path] = sceneController;
	        }
	    }, {
	        key: "sceneControllers",
	        get: function get() {
	            if (!this._sceneControllers) {
	                this._sceneControllers = {};
	            }
	            return this._sceneControllers;
	        }
	    }, {
	        key: "activeSceneController",
	        get: function get() {
	            return this._activeSceneController;
	        }
	    }, {
	        key: "homeSceneController",
	        get: function get() {
	            return this._homeSceneController;
	        }
	    }, {
	        key: "monitorSceneController",
	        get: function get() {
	            return this._monitorSceneController;
	        }
	    }, {
	        key: "sysInfoSceneController",
	        get: function get() {
	            return this._sysInfoSceneController;
	        }
	    }]);
	    return ApplicationController;
	}(_ApplicationController2.default);

	exports.default = ApplicationController;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(8);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(11);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(58);
	__webpack_require__(62);
	module.exports = __webpack_require__(22).Promise;

/***/ },
/* 13 */
/***/ function(module, exports) {

	

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(15)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(18)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(16)
	  , defined   = __webpack_require__(17);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(19)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(35)
	  , hide           = __webpack_require__(25)
	  , has            = __webpack_require__(36)
	  , Iterators      = __webpack_require__(37)
	  , $iterCreate    = __webpack_require__(38)
	  , setToStringTag = __webpack_require__(54)
	  , getPrototypeOf = __webpack_require__(56)
	  , ITERATOR       = __webpack_require__(55)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(21)
	  , core      = __webpack_require__(22)
	  , ctx       = __webpack_require__(23)
	  , hide      = __webpack_require__(25)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 21 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 22 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(24);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(26)
	  , createDesc = __webpack_require__(34);
	module.exports = __webpack_require__(30) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(27)
	  , IE8_DOM_DEFINE = __webpack_require__(29)
	  , toPrimitive    = __webpack_require__(33)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(30) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(30) && !__webpack_require__(31)(function(){
	  return Object.defineProperty(__webpack_require__(32)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(31)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(28)
	  , document = __webpack_require__(21).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(28);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ },
/* 36 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(39)
	  , descriptor     = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(54)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(25)(IteratorPrototype, __webpack_require__(55)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(27)
	  , dPs         = __webpack_require__(40)
	  , enumBugKeys = __webpack_require__(52)
	  , IE_PROTO    = __webpack_require__(49)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(32)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(53).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(26)
	  , anObject = __webpack_require__(27)
	  , getKeys  = __webpack_require__(41);

	module.exports = __webpack_require__(30) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(52);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(36)
	  , toIObject    = __webpack_require__(43)
	  , arrayIndexOf = __webpack_require__(46)(false)
	  , IE_PROTO     = __webpack_require__(49)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(44)
	  , defined = __webpack_require__(17);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(45);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(43)
	  , toLength  = __webpack_require__(47)
	  , toIndex   = __webpack_require__(48);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(16)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(16)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(50)('keys')
	  , uid    = __webpack_require__(51);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(21)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21).document && document.documentElement;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(26).f
	  , has = __webpack_require__(36)
	  , TAG = __webpack_require__(55)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(50)('wks')
	  , uid        = __webpack_require__(51)
	  , Symbol     = __webpack_require__(21).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(36)
	  , toObject    = __webpack_require__(57)
	  , IE_PROTO    = __webpack_require__(49)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(17);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	var global        = __webpack_require__(21)
	  , hide          = __webpack_require__(25)
	  , Iterators     = __webpack_require__(37)
	  , TO_STRING_TAG = __webpack_require__(55)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(60)
	  , step             = __webpack_require__(61)
	  , Iterators        = __webpack_require__(37)
	  , toIObject        = __webpack_require__(43);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(18)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(19)
	  , global             = __webpack_require__(21)
	  , ctx                = __webpack_require__(23)
	  , classof            = __webpack_require__(63)
	  , $export            = __webpack_require__(20)
	  , isObject           = __webpack_require__(28)
	  , aFunction          = __webpack_require__(24)
	  , anInstance         = __webpack_require__(64)
	  , forOf              = __webpack_require__(65)
	  , speciesConstructor = __webpack_require__(69)
	  , task               = __webpack_require__(70).set
	  , microtask          = __webpack_require__(72)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(55)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(73)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(54)($Promise, PROMISE);
	__webpack_require__(74)(PROMISE);
	Wrapper = __webpack_require__(22)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(75)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(45)
	  , TAG = __webpack_require__(55)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(23)
	  , call        = __webpack_require__(66)
	  , isArrayIter = __webpack_require__(67)
	  , anObject    = __webpack_require__(27)
	  , toLength    = __webpack_require__(47)
	  , getIterFn   = __webpack_require__(68)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(27);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(37)
	  , ITERATOR   = __webpack_require__(55)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(63)
	  , ITERATOR  = __webpack_require__(55)('iterator')
	  , Iterators = __webpack_require__(37);
	module.exports = __webpack_require__(22).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(27)
	  , aFunction = __webpack_require__(24)
	  , SPECIES   = __webpack_require__(55)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(23)
	  , invoke             = __webpack_require__(71)
	  , html               = __webpack_require__(53)
	  , cel                = __webpack_require__(32)
	  , global             = __webpack_require__(21)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(45)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(21)
	  , macrotask = __webpack_require__(70).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(45)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(25);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(21)
	  , core        = __webpack_require__(22)
	  , dP          = __webpack_require__(26)
	  , DESCRIPTORS = __webpack_require__(30)
	  , SPECIES     = __webpack_require__(55)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(55)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(78);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	var $Object = __webpack_require__(22).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(20);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(30), 'Object', {defineProperty: __webpack_require__(26).f});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(83);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(86);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(58);
	module.exports = __webpack_require__(85).f('iterator');

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(55);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	__webpack_require__(13);
	__webpack_require__(99);
	__webpack_require__(100);
	module.exports = __webpack_require__(22).Symbol;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(21)
	  , has            = __webpack_require__(36)
	  , DESCRIPTORS    = __webpack_require__(30)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(35)
	  , META           = __webpack_require__(89).KEY
	  , $fails         = __webpack_require__(31)
	  , shared         = __webpack_require__(50)
	  , setToStringTag = __webpack_require__(54)
	  , uid            = __webpack_require__(51)
	  , wks            = __webpack_require__(55)
	  , wksExt         = __webpack_require__(85)
	  , wksDefine      = __webpack_require__(90)
	  , keyOf          = __webpack_require__(91)
	  , enumKeys       = __webpack_require__(92)
	  , isArray        = __webpack_require__(95)
	  , anObject       = __webpack_require__(27)
	  , toIObject      = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(33)
	  , createDesc     = __webpack_require__(34)
	  , _create        = __webpack_require__(39)
	  , gOPNExt        = __webpack_require__(96)
	  , $GOPD          = __webpack_require__(98)
	  , $DP            = __webpack_require__(26)
	  , $keys          = __webpack_require__(41)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(97).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(94).f  = $propertyIsEnumerable;
	  __webpack_require__(93).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(19)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(25)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(51)('meta')
	  , isObject = __webpack_require__(28)
	  , has      = __webpack_require__(36)
	  , setDesc  = __webpack_require__(26).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(31)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(21)
	  , core           = __webpack_require__(22)
	  , LIBRARY        = __webpack_require__(19)
	  , wksExt         = __webpack_require__(85)
	  , defineProperty = __webpack_require__(26).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(41)
	  , toIObject = __webpack_require__(43);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(41)
	  , gOPS    = __webpack_require__(93)
	  , pIE     = __webpack_require__(94);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 94 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(45);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(43)
	  , gOPN      = __webpack_require__(97).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(42)
	  , hiddenKeys = __webpack_require__(52).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(94)
	  , createDesc     = __webpack_require__(34)
	  , toIObject      = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(33)
	  , has            = __webpack_require__(36)
	  , IE8_DOM_DEFINE = __webpack_require__(29)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(30) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90)('asyncIterator');

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90)('observable');

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _getPrototypeOf = __webpack_require__(102);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(106);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	module.exports = __webpack_require__(22).Object.getPrototypeOf;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(57)
	  , $getPrototypeOf = __webpack_require__(56);

	__webpack_require__(105)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(20)
	  , core    = __webpack_require__(22)
	  , fails   = __webpack_require__(31);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	var $Object = __webpack_require__(22).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(43)
	  , $getOwnPropertyDescriptor = __webpack_require__(98).f;

	__webpack_require__(105)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(110);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(114);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	module.exports = __webpack_require__(22).Object.setPrototypeOf;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(20);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(113).set});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(28)
	  , anObject = __webpack_require__(27);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(23)(Function.call, __webpack_require__(98).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(116);
	var $Object = __webpack_require__(22).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(20)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(39)});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Application = __webpack_require__(118);

	var _Application2 = _interopRequireDefault(_Application);

	var _ViewController2 = __webpack_require__(122);

	var _ViewController3 = _interopRequireDefault(_ViewController2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ApplicationController = function (_ViewController) {
	    (0, _inherits3.default)(ApplicationController, _ViewController);

	    function ApplicationController() {
	        var _Object$getPrototypeO;

	        (0, _classCallCheck3.default)(this, ApplicationController);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = Object.getPrototypeOf(ApplicationController)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        if (ApplicationController._instance === null) {
	            ApplicationController._instance = _this;
	        } else {
	            throw new Error("ApplicationController is a singleton object. It can only be constructed once.");
	        }
	        return _this;
	    }

	    (0, _createClass3.default)(ApplicationController, [{
	        key: "run",
	        value: function run() {}
	    }, {
	        key: "application",
	        get: function get() {
	            return this.view;
	        }
	    }], [{
	        key: "getInstance",
	        value: function getInstance() {
	            if (!ApplicationController._instance) {
	                throw new Error("ApplicationController has not been instantiated yet.");
	            }
	            return ApplicationController._instance;
	        }
	    }]);
	    return ApplicationController;
	}(_ViewController3.default);

	ApplicationController._instance = null;
	exports.default = ApplicationController;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(119);

	var _View3 = _interopRequireDefault(_View2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Application = function (_View) {
	    (0, _inherits3.default)(Application, _View);

	    function Application() {
	        var _Object$getPrototypeO;

	        (0, _classCallCheck3.default)(this, Application);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = Object.getPrototypeOf(Application)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        if (Application._instance === null) {
	            Application._instance = _this;
	        } else {
	            throw new Error("Application is a singleton object. It can only be constructed once.");
	        }
	        return _this;
	    }

	    (0, _createClass3.default)(Application, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(Application.prototype), "init", this).call(this);
	            this.addStyleClass("nju-app");
	        }
	    }], [{
	        key: "getInstance",
	        value: function getInstance() {
	            if (!Application._instance) {
	                throw new Error("Application has not been instantiated yet.");
	            }
	            return Application._instance;
	        }
	    }]);
	    return Application;
	}(_View3.default);

	Application._instance = null;
	exports.default = Application;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, jQuery) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ManagedObject2 = __webpack_require__(120);

	var _ManagedObject3 = _interopRequireDefault(_ManagedObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var View = function (_ManagedObject) {
	    (0, _inherits3.default)(View, _ManagedObject);

	    function View() {
	        (0, _classCallCheck3.default)(this, View);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(View).apply(this, arguments));
	    }

	    (0, _createClass3.default)(View, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(View.prototype), "init", this).call(this);
	            this._subviews = [];
	            this.$element = $("<" + this.getElementTag() + "/>");
	            if (this.id !== null) {
	                this.$element.attr("id", this.id);
	            }
	            this.$container = this.$element;
	        }
	    }, {
	        key: "getElementTag",
	        value: function getElementTag() {
	            return "div";
	        }
	    }, {
	        key: "addStyleClass",
	        value: function addStyleClass() {
	            var _$element;

	            (_$element = this.$element).addClass.apply(_$element, arguments);
	        }
	    }, {
	        key: "removeStyleClass",
	        value: function removeStyleClass() {
	            var _$element2;

	            (_$element2 = this.$element).removeClass.apply(_$element2, arguments);
	        }
	    }, {
	        key: "toggleStyleClass",
	        value: function toggleStyleClass() {
	            var _$element3;

	            (_$element3 = this.$element).toggleClass.apply(_$element3, arguments);
	        }
	    }, {
	        key: "css",
	        value: function css() {
	            var _$element4;

	            (_$element4 = this.$element).css.apply(_$element4, arguments);
	        }
	    }, {
	        key: "transit",
	        value: function transit() {
	            var _$element5;

	            (_$element5 = this.$element).transition.apply(_$element5, arguments);
	        }
	    }, {
	        key: "addSubview",
	        value: function addSubview(view) {
	            var $container = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	            if (view instanceof View) {
	                if (view.parent) {
	                    view.removeFromParent();
	                }
	                view._parent = this;
	                this.subviews.push(view);
	                view.placeAt($container);
	            }
	        }
	    }, {
	        key: "addSubviews",
	        value: function addSubviews(views) {
	            var _this2 = this;

	            var $container = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	            if (Array.isArray(views)) {
	                views.forEach(function (view) {
	                    _this2.addSubview(view, $container);
	                });
	            }
	        }
	    }, {
	        key: "removeSubview",
	        value: function removeSubview(view) {
	            var neverUseAgain = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var index = this.subviews.indexOf(view);
	            if (index !== -1) {
	                view._parent = null;
	                this.subviews.splice(index, 1);
	                if (neverUseAgain) {
	                    view.$element.remove();
	                } else {
	                    view.$element.detach();
	                }
	            }
	        }
	    }, {
	        key: "removeAllSubviews",
	        value: function removeAllSubviews() {
	            var neverUseAgain = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            while (this.subviews.length > 0) {
	                this.removeSubview(this.subviews[0], neverUseAgain);
	            }
	        }
	    }, {
	        key: "removeFromParent",
	        value: function removeFromParent() {
	            if (this.parent) {
	                this.parent.removeSubview(this);
	            }
	        }
	    }, {
	        key: "placeAt",
	        value: function placeAt(target) {
	            var $target = target instanceof jQuery ? target : $(target);
	            $target.append(this.$element);
	        }
	    }, {
	        key: "$",
	        value: function $() {
	            var _$element6;

	            return (_$element6 = this.$element).find.apply(_$element6, arguments);
	        }
	    }, {
	        key: "subviews",
	        get: function get() {
	            return this._subviews;
	        }
	    }]);
	    return View;
	}(_ManagedObject3.default);

	exports.default = View;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(4)))

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _wolfy87Eventemitter = __webpack_require__(121);

	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ManagedObject = function () {
	    function ManagedObject() {
	        var id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	        (0, _classCallCheck3.default)(this, ManagedObject);

	        this._id = id;
	        this._parent = null;
	        this._eventEmitter = new _wolfy87Eventemitter2.default();
	        this.init();
	    }

	    (0, _createClass3.default)(ManagedObject, [{
	        key: "init",
	        value: function init() {}
	    }, {
	        key: "on",
	        value: function on(type, listener) {
	            this.eventEmitter.on(type, listener);
	            return this;
	        }
	    }, {
	        key: "off",
	        value: function off(type, listener) {
	            this.eventEmitter.off(type, listener);
	            return this;
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(type) {
	            var parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            parameters.type = type;
	            parameters.target = this;
	            this.eventEmitter.trigger(type, [parameters]);
	        }
	    }, {
	        key: "id",
	        get: function get() {
	            return this._id;
	        }
	    }, {
	        key: "parent",
	        get: function get() {
	            return this._parent;
	        },
	        set: function set(value) {
	            this._parent = value;
	        }
	    }, {
	        key: "eventEmitter",
	        get: function get() {
	            return this._eventEmitter;
	        }
	    }]);
	    return ManagedObject;
	}();

	exports.default = ManagedObject;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v5.1.0 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */

	;(function (exports) {
	    'use strict';

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var originalGlobalValue = exports.EventEmitter;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;

	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }

	        return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;

	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }

	        return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;

	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }

	        return response || listeners;
	    };

	    function isValidListener (listener) {
	        if (typeof listener === 'function' || listener instanceof RegExp) {
	            return true
	        } else if (listener && typeof listener === 'object') {
	            return isValidListener(listener.listener)
	        } else {
	            return false
	        }
	    }

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        if (!isValidListener(listener)) {
	            throw new TypeError('listener must be a function');
	        }

	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);

	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;

	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }

	        return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;

	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }

	        return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;

	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);

	                for (i = 0; i < listeners.length; i++) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];

	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }

	                    response = listener.listener.apply(this, args || []);

	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };

	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };

	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === 'object' && module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}(this || {}));


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ManagedObject2 = __webpack_require__(120);

	var _ManagedObject3 = _interopRequireDefault(_ManagedObject2);

	var _View = __webpack_require__(119);

	var _View2 = _interopRequireDefault(_View);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ViewController = function (_ManagedObject) {
	    (0, _inherits3.default)(ViewController, _ManagedObject);

	    function ViewController(id) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        (0, _classCallCheck3.default)(this, ViewController);

	        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ViewController).call(this, id));

	        _this._view = _this.createView(options);
	        _this.initView(options);
	        return _this;
	    }

	    (0, _createClass3.default)(ViewController, [{
	        key: "createView",
	        value: function createView(options) {
	            throw new Error("createView(options) must be override in the derived class.");
	        }
	    }, {
	        key: "initView",
	        value: function initView(options) {
	            this.applyViewOptions(options);
	        }
	    }, {
	        key: "applyViewOptions",
	        value: function applyViewOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            for (var key in options) {
	                this.view[key] = options[key];
	            }
	        }
	    }, {
	        key: "view",
	        get: function get() {
	            return this._view;
	        }
	    }]);
	    return ViewController;
	}(_ManagedObject3.default);

	exports.default = ViewController;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Application = __webpack_require__(118);

	var _Application2 = _interopRequireDefault(_Application);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Application = function (_NJUApplication) {
	    (0, _inherits3.default)(Application, _NJUApplication);

	    function Application() {
	        (0, _classCallCheck3.default)(this, Application);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Application).apply(this, arguments));
	    }

	    (0, _createClass3.default)(Application, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(Application.prototype), "init", this).call(this);
	            this.addStyleClass("rpm-app");

	            this.$container = $("<div class=\"scene-container\">");
	            this.$element.append(this.$container);
	        }
	    }, {
	        key: "showMask",
	        value: function showMask() {
	            if (!this.$mask) {
	                this.$mask = $("<div class=\"weui_mask_transparent\">");
	            }
	            this.$element.append(this.$mask);
	            this.$mask.show();
	        }
	    }, {
	        key: "hideMask",
	        value: function hideMask() {
	            this.$mask.hide();
	            this.$mask.remove();
	        }
	    }, {
	        key: "showLoading",
	        value: function showLoading() {
	            var text = arguments.length <= 0 || arguments[0] === undefined ? "Loading" : arguments[0];

	            this.showMask();
	            this.$mask.addClass("weui_loading_toast");
	            this.$mask.html("\n            <div class=\"weui_toast\">\n                <div class=\"weui_loading\">\n                    <div class=\"weui_loading_leaf weui_loading_leaf_0\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_1\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_2\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_3\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_4\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_5\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_6\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_7\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_8\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_9\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_10\"></div>\n                    <div class=\"weui_loading_leaf weui_loading_leaf_11\"></div>\n                </div>\n                <p class=\"weui_toast_content\">" + text + "</p>\n            </div>");
	        }
	    }, {
	        key: "hideLoading",
	        value: function hideLoading() {
	            this.$mask.removeClass("weui_loading_toast");
	            this.$mask.children().remove();
	            this.hideMask();
	        }
	    }, {
	        key: "showToast",
	        value: function showToast() {
	            var _this2 = this;

	            var text = arguments.length <= 0 || arguments[0] === undefined ? "Success" : arguments[0];
	            var duration = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];

	            this.showMask();
	            this.$mask.html("\n            <div class=\"weui_toast\">\n                <i class=\"weui_icon_toast\"></i>\n                <p class=\"weui_toast_content\">" + text + "</p>\n            </div>");
	            if (duration !== -1) {
	                setTimeout(function () {
	                    _this2.$mask.children().remove();
	                    _this2.hideMask();
	                }, duration);
	            }
	        }
	    }]);
	    return Application;
	}(_Application2.default);

	exports.default = Application;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(10);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _HomeScene = __webpack_require__(125);

	var _HomeScene2 = _interopRequireDefault(_HomeScene);

	var _SceneController2 = __webpack_require__(127);

	var _SceneController3 = _interopRequireDefault(_SceneController2);

	var _api = __webpack_require__(128);

	var _api2 = _interopRequireDefault(_api);

	var _model = __webpack_require__(129);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HomeSceneController = function (_SceneController) {
	    (0, _inherits3.default)(HomeSceneController, _SceneController);

	    function HomeSceneController() {
	        (0, _classCallCheck3.default)(this, HomeSceneController);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(HomeSceneController).apply(this, arguments));
	    }

	    (0, _createClass3.default)(HomeSceneController, [{
	        key: "createView",
	        value: function createView() {
	            return new _HomeScene2.default();
	        }
	    }, {
	        key: "initView",
	        value: function initView() {
	            var _this2 = this;

	            this.view.on("machineClick", this._onMachineClick.bind(this));
	            this.view.on("monitorClick", this._onMonitorClick.bind(this));
	            this.view.on("serviceStatusChanging", this._onServiceStatusChanging.bind(this));
	            this.view.on("powerActionClick", this._onPowerActionClick.bind(this));

	            _model2.default.on("sysInfoChanged", function () {
	                _this2.view.sysInfo = _model2.default.sysInfo;
	            });

	            _model2.default.on("servicesChanged", function () {
	                _this2.view.services = _model2.default.services;
	            });
	        }
	    }, {
	        key: "_onServiceStatusChanging",
	        value: function () {
	            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
	                var result;
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                this.showMask();
	                                _context.prev = 1;
	                                _context.next = 4;
	                                return _api2.default.service.toggle(e.service.id, e.service.status.active);

	                            case 4:
	                                result = _context.sent;

	                                this.showToast(e.service.name + " " + (e.service.status.active ? "started" : "stopped"));
	                                _context.next = 15;
	                                break;

	                            case 8:
	                                _context.prev = 8;
	                                _context.t0 = _context["catch"](1);

	                                console.error(_context.t0);
	                                alert("Sorry, can not " + (e.service.status.active ? "start" : "stop") + " " + e.service.name + " service right now.");
	                                _model2.default.services[e.service.id].active = !e.service.status.active;
	                                this.view.renderServices();
	                                this.hideMask();

	                            case 15:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this, [[1, 8]]);
	            }));

	            function _onServiceStatusChanging(_x) {
	                return _ref.apply(this, arguments);
	            }

	            return _onServiceStatusChanging;
	        }()
	    }, {
	        key: "_onPowerActionClick",
	        value: function () {
	            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(e) {
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                if (!(e.action === "shutdown")) {
	                                    _context2.next = 6;
	                                    break;
	                                }

	                                _context2.next = 3;
	                                return _api2.default.sys.shutdown();

	                            case 3:
	                                this.showToast("Bye", -1);
	                                _context2.next = 11;
	                                break;

	                            case 6:
	                                if (!(e.action === "reboot")) {
	                                    _context2.next = 11;
	                                    break;
	                                }

	                                _context2.next = 9;
	                                return _api2.default.sys.reboot();

	                            case 9:
	                                this.showLoading("Rebooting");
	                                setTimeout(function () {
	                                    window.location.reload(true);
	                                }, 30 * 1000);

	                            case 11:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));

	            function _onPowerActionClick(_x2) {
	                return _ref2.apply(this, arguments);
	            }

	            return _onPowerActionClick;
	        }()
	    }, {
	        key: "_onMachineClick",
	        value: function _onMachineClick(e) {
	            this.parent.pushSceneController(this.parent.sysInfoSceneController, "/sys/info");
	        }
	    }, {
	        key: "_onMonitorClick",
	        value: function _onMonitorClick(e) {
	            this.parent.pushSceneController(this.parent.monitorSceneController, "/monitor");
	        }
	    }]);
	    return HomeSceneController;
	}(_SceneController3.default);

	exports.default = HomeSceneController;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Scene2 = __webpack_require__(126);

	var _Scene3 = _interopRequireDefault(_Scene2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HomeScene = function (_Scene) {
	    (0, _inherits3.default)(HomeScene, _Scene);

	    function HomeScene() {
	        (0, _classCallCheck3.default)(this, HomeScene);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(HomeScene).apply(this, arguments));
	    }

	    (0, _createClass3.default)(HomeScene, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(HomeScene.prototype), "init", this).call(this);
	            this.addStyleClass("rpm-home-scene");
	            this._initInfoGroup();
	            this._initServiceGroup();
	            this._initPowerButton();
	        }
	    }, {
	        key: "_initInfoGroup",
	        value: function _initInfoGroup() {
	            var _this2 = this;

	            this.$group("System", [this.$cell("Machine", $("<span id=\"hostname\" style=\"font-size:14px;\"></span>")).on("click", function () {
	                _this2.trigger("machineClick");
	            }), this.$cell("Monitor", "").on("click", function () {
	                _this2.trigger("monitorClick");
	            })]).addClass("weui_cells_access");
	        }
	    }, {
	        key: "_initServiceGroup",
	        value: function _initServiceGroup() {
	            var _this3 = this;

	            this.$serviceGroup = this.$group("Services", [this.$checkBoxCell("Bluetooth", "bluetooth"), this.$checkBoxCell("VNC", "vnc"), this.$checkBoxCell("Xware", "xware")]).addClass("weui_cells_form");
	            this.$serviceGroup.on("change", ".weui_switch", function (e) {
	                var active = e.currentTarget.checked;
	                _this3.trigger("serviceStatusChanging", {
	                    service: {
	                        id: e.currentTarget.id,
	                        name: e.currentTarget.title,
	                        status: {
	                            active: e.currentTarget.checked
	                        }
	                    }
	                });
	            });
	        }
	    }, {
	        key: "_initPowerButton",
	        value: function _initPowerButton() {
	            var _this4 = this;

	            this.$button("Power off", "warn").on("click", function () {
	                _this4.showPowerActionSheet();
	            });
	        }
	    }, {
	        key: "renderServices",
	        value: function renderServices() {
	            if (this.services) {
	                for (var name in this.services) {
	                    this.$("input.weui_switch#" + name)[0].checked = this.services[name].active;
	                }
	            }
	        }
	    }, {
	        key: "showPowerActionSheet",
	        value: function showPowerActionSheet() {
	            var _this5 = this;

	            if (!this.$actionSheet) {
	                this.$actionSheet = $("\n                <div class=\"power_action_sheet action_sheet\">\n                    <div class=\"weui_mask_transition\" id=\"mask\" style=\"display:block;\"></div>\n                    <div class=\"weui_actionsheet\" id=\"actionsheet\">\n                        <div class=\"weui_actionsheet_menu\">\n                            <div id=\"reboot\" class=\"weui_actionsheet_cell\">Reboot</div>\n                            <div id=\"shutdown\" class=\"weui_actionsheet_cell\">Shutdown</div>\n                        </div>\n                        <div class=\"weui_actionsheet_action\">\n                            <div class=\"weui_actionsheet_cell\" id=\"cancel\">Cancel</div>\n                        </div>\n                    </div>\n                </div>\n            ");
	                this.$element.append(this.$actionSheet);
	                this.$actionSheet.on("click", "#mask", function (e) {
	                    _this5.hidePowerActionSheet();
	                });
	                this.$actionSheet.on("click", ".weui_actionsheet_cell", function (e) {
	                    var action = e.currentTarget.id;
	                    if (action !== "cancel") {
	                        _this5.trigger("powerActionClick", { action: action });
	                    }
	                    _this5.hidePowerActionSheet();
	                });
	            }
	            setTimeout(function () {
	                _this5.$actionSheet.find("#mask").show().addClass("weui_fade_toggle");
	                _this5.$actionSheet.find("#actionsheet").addClass("weui_actionsheet_toggle");
	            });
	        }
	    }, {
	        key: "hidePowerActionSheet",
	        value: function hidePowerActionSheet() {
	            if (this.$actionSheet) {
	                this.$actionSheet.find("#mask").hide().removeClass("weui_fade_toggle");
	                this.$actionSheet.find("#actionsheet").removeClass("weui_actionsheet_toggle");
	            }
	        }
	    }, {
	        key: "title",
	        get: function get() {
	            return "Home";
	        }
	    }, {
	        key: "sysInfo",
	        get: function get() {
	            return this._sysInfo;
	        },
	        set: function set(value) {
	            this._sysInfo = value;
	            if (this.sysInfo) {
	                this.$("#hostname").text(this.sysInfo.hostname);
	            } else {
	                this.$("#hostname").text("");
	            }
	        }
	    }, {
	        key: "services",
	        get: function get() {
	            return this._services;
	        },
	        set: function set(value) {
	            this._services = value;
	            this.renderServices();
	        }
	    }]);
	    return HomeScene;
	}(_Scene3.default);

	exports.default = HomeScene;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(119);

	var _View3 = _interopRequireDefault(_View2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Scene = function (_View) {
	    (0, _inherits3.default)(Scene, _View);

	    function Scene() {
	        (0, _classCallCheck3.default)(this, Scene);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Scene).apply(this, arguments));
	    }

	    (0, _createClass3.default)(Scene, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(Scene.prototype), "init", this).call(this);
	            this.addStyleClass("rpm-scene");
	            this.initLayout();
	        }
	    }, {
	        key: "initLayout",
	        value: function initLayout() {
	            this.$element.append("\n            <header><h1>" + this.title + "</h1></header>\n            <main></main>");
	            this.$container = this.$element.children("main");
	        }
	    }, {
	        key: "$group",
	        value: function $group(title, $childCells) {
	            var $group = $("<div class=\"rpm-scene-group\"/>");
	            this.$element.append($group);

	            if (title) {
	                var $title = $("<div class=\"weui_cells_title\">" + title + "</div>");
	                $group.append($title);
	            }

	            var $cells = $("<div class=\"weui_cells\"></div>");
	            $group.append($cells);

	            if ($childCells) {
	                if (!Array.isArray($childCells)) {
	                    $childCells = [$childCells];
	                }
	                $childCells.forEach(function ($childCell) {
	                    $cells.append($($childCell));
	                });
	            }
	            return $group;
	        }
	    }, {
	        key: "$cell",
	        value: function $cell(title, $content) {
	            var $cell = $("<div class=\"weui_cell\">\n            <div class=\"weui_cell_bd weui_cell_primary\">\n                " + (title ? "<p>" + title + "</p>" : "") + "\n            </div>\n        </div>");
	            if ($content !== undefined) {
	                var $ft = $("<div class=\"weui_cell_ft\"></div>");
	                $cell.append($ft);
	                $ft.append($($content));
	            }
	            return $cell;
	        }
	    }, {
	        key: "$checkBoxCell",
	        value: function $checkBoxCell(title, id) {
	            var $checkBox = $("<input id=\"" + id + "\" class=\"weui_switch\" type=\"checkbox\" title=\"" + title + "\" />");
	            var $cell = this.$cell(title, $checkBox);
	            return $cell;
	        }
	    }, {
	        key: "$button",
	        value: function $button(title) {
	            var type = arguments.length <= 1 || arguments[1] === undefined ? "primary" : arguments[1];

	            var $button = $("<a class=\"weui_btn weui_btn_" + type + "\" href=\"javascript:\">" + title + "</a>");
	            var $area = $("<div class=\"weui_btn_area\"></div>");
	            $area.append($button);
	            this.$element.append($area);
	            return $button;
	        }
	    }, {
	        key: "title",
	        get: function get() {
	            return "";
	        }
	    }]);
	    return Scene;
	}(_View3.default);

	exports.default = Scene;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ViewController2 = __webpack_require__(122);

	var _ViewController3 = _interopRequireDefault(_ViewController2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SceneController = function (_ViewController) {
	    (0, _inherits3.default)(SceneController, _ViewController);

	    function SceneController() {
	        (0, _classCallCheck3.default)(this, SceneController);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SceneController).apply(this, arguments));
	    }

	    (0, _createClass3.default)(SceneController, [{
	        key: "showMask",
	        value: function showMask() {
	            if (this.view && this.view.parent) {
	                var _view$parent;

	                (_view$parent = this.view.parent).showMask.apply(_view$parent, arguments);
	            }
	        }
	    }, {
	        key: "hideMask",
	        value: function hideMask() {
	            if (this.view && this.view.parent) {
	                var _view$parent2;

	                (_view$parent2 = this.view.parent).hideMask.apply(_view$parent2, arguments);
	            }
	        }
	    }, {
	        key: "showLoading",
	        value: function showLoading() {
	            if (this.view && this.view.parent) {
	                var _view$parent3;

	                (_view$parent3 = this.view.parent).showLoading.apply(_view$parent3, arguments);
	            }
	        }
	    }, {
	        key: "hideLoading",
	        value: function hideLoading() {
	            if (this.view && this.view.parent) {
	                var _view$parent4;

	                (_view$parent4 = this.view.parent).hideLoading.apply(_view$parent4, arguments);
	            }
	        }
	    }, {
	        key: "showToast",
	        value: function showToast() {
	            if (this.view && this.view.parent) {
	                var _view$parent5;

	                (_view$parent5 = this.view.parent).showToast.apply(_view$parent5, arguments);
	            }
	        }
	    }, {
	        key: "title",
	        get: function get() {
	            throw new Error("'title' property must be implemented in derived class.");
	        }
	    }]);
	    return SceneController;
	}(_ViewController3.default);

	exports.default = SceneController;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(10);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_PATH = "/api";

	exports.default = {
	    sys: {
	        info: function info() {
	            var _this = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.next = 2;
	                                return $.ajax({
	                                    url: API_PATH + "/sys/info"
	                                });

	                            case 2:
	                                return _context.abrupt("return", _context.sent);

	                            case 3:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, _this);
	            }))();
	        },
	        status: function status() {
	            var _this2 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                _context2.next = 2;
	                                return $.ajax({
	                                    url: API_PATH + "/sys/status"
	                                });

	                            case 2:
	                                return _context2.abrupt("return", _context2.sent);

	                            case 3:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, _this2);
	            }))();
	        },
	        shutdown: function shutdown() {
	            var _this3 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                _context3.next = 2;
	                                return $.ajax({
	                                    method: "post",
	                                    url: API_PATH + "/sys/shutdown"
	                                });

	                            case 2:
	                                return _context3.abrupt("return", _context3.sent);

	                            case 3:
	                            case "end":
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, _this3);
	            }))();
	        },
	        reboot: function reboot() {
	            var _this4 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                _context4.next = 2;
	                                return $.ajax({
	                                    method: "post",
	                                    url: API_PATH + "/sys/reboot"
	                                });

	                            case 2:
	                                return _context4.abrupt("return", _context4.sent);

	                            case 3:
	                            case "end":
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, _this4);
	            }))();
	        }
	    },

	    service: {
	        all: function all() {
	            var _this5 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                _context5.next = 2;
	                                return $.ajax({
	                                    url: API_PATH + "/service"
	                                });

	                            case 2:
	                                return _context5.abrupt("return", _context5.sent);

	                            case 3:
	                            case "end":
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, _this5);
	            }))();
	        },
	        toggle: function toggle(name, active) {
	            var _this6 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
	                return _regenerator2.default.wrap(function _callee6$(_context6) {
	                    while (1) {
	                        switch (_context6.prev = _context6.next) {
	                            case 0:
	                                _context6.next = 2;
	                                return $.ajax({
	                                    method: "post",
	                                    url: API_PATH + "/service/" + name + "/" + (active ? "start" : "stop")
	                                });

	                            case 2:
	                                return _context6.abrupt("return", _context6.sent);

	                            case 3:
	                            case "end":
	                                return _context6.stop();
	                        }
	                    }
	                }, _callee6, _this6);
	            }))();
	        },
	        start: function start(name) {
	            var _this7 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
	                return _regenerator2.default.wrap(function _callee7$(_context7) {
	                    while (1) {
	                        switch (_context7.prev = _context7.next) {
	                            case 0:
	                                return _context7.abrupt("return", _this7.toggle(name, false));

	                            case 1:
	                            case "end":
	                                return _context7.stop();
	                        }
	                    }
	                }, _callee7, _this7);
	            }))();
	        },
	        stop: function stop(name) {
	            var _this8 = this;

	            return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
	                return _regenerator2.default.wrap(function _callee8$(_context8) {
	                    while (1) {
	                        switch (_context8.prev = _context8.next) {
	                            case 0:
	                                return _context8.abrupt("return", _this8.toggle(name, false));

	                            case 1:
	                            case "end":
	                                return _context8.stop();
	                        }
	                    }
	                }, _callee8, _this8);
	            }))();
	        }
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _regenerator = __webpack_require__(6);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(10);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ManagedObject2 = __webpack_require__(120);

	var _ManagedObject3 = _interopRequireDefault(_ManagedObject2);

	var _api = __webpack_require__(128);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Model = function (_ManagedObject) {
	    (0, _inherits3.default)(Model, _ManagedObject);

	    function Model() {
	        (0, _classCallCheck3.default)(this, Model);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Model).apply(this, arguments));
	    }

	    (0, _createClass3.default)(Model, [{
	        key: "load",
	        value: function () {
	            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.next = 2;
	                                return _api2.default.sys.info();

	                            case 2:
	                                this.sysInfo = _context.sent;
	                                _context.next = 5;
	                                return _api2.default.service.all();

	                            case 5:
	                                this.services = _context.sent;

	                            case 6:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));

	            function load() {
	                return _ref.apply(this, arguments);
	            }

	            return load;
	        }()
	    }, {
	        key: "startMonitorStatus",
	        value: function startMonitorStatus() {
	            this._statusMonitoring = true;
	            this._monitorStatusLoop();
	        }
	    }, {
	        key: "stopMonitorStatus",
	        value: function stopMonitorStatus() {
	            this._statusMonitoring = false;
	        }
	    }, {
	        key: "_monitorStatusLoop",
	        value: function () {
	            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	                var _this2 = this;

	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                if (this._statusMonitoring) {
	                                    _context2.next = 2;
	                                    break;
	                                }

	                                return _context2.abrupt("return");

	                            case 2:
	                                _context2.next = 4;
	                                return _api2.default.sys.status();

	                            case 4:
	                                this.sysStatus = _context2.sent;

	                                if (this._statusMonitoring) {
	                                    window.setTimeout(function () {
	                                        if (_this2._statusMonitoring) {
	                                            _this2._monitorStatusLoop();
	                                        }
	                                    }, 1000);
	                                }

	                            case 6:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));

	            function _monitorStatusLoop() {
	                return _ref2.apply(this, arguments);
	            }

	            return _monitorStatusLoop;
	        }()
	    }, {
	        key: "sysInfo",
	        get: function get() {
	            return this._sysInfo;
	        },
	        set: function set(value) {
	            this._sysInfo = value;
	            document.title = this.sysInfo.hostname + " - Raspberry PI Manager";
	            this.trigger("sysInfoChanged");
	        }
	    }, {
	        key: "sysStatus",
	        get: function get() {
	            return this._sysStatus;
	        },
	        set: function set(value) {
	            this._sysStatus = value;
	            this.trigger("sysStatusChanged");
	        }
	    }, {
	        key: "services",
	        get: function get() {
	            return this._services;
	        },
	        set: function set(value) {
	            this._services = value;
	            this.trigger("servicesChanged");
	        }
	    }]);
	    return Model;
	}(_ManagedObject3.default);

	var model = new Model();
	exports.default = model;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _MonitorScene = __webpack_require__(131);

	var _MonitorScene2 = _interopRequireDefault(_MonitorScene);

	var _SceneController2 = __webpack_require__(127);

	var _SceneController3 = _interopRequireDefault(_SceneController2);

	var _api = __webpack_require__(128);

	var _api2 = _interopRequireDefault(_api);

	var _model = __webpack_require__(129);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MonitorSceneController = function (_SceneController) {
	    (0, _inherits3.default)(MonitorSceneController, _SceneController);

	    function MonitorSceneController() {
	        (0, _classCallCheck3.default)(this, MonitorSceneController);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(MonitorSceneController).apply(this, arguments));
	    }

	    (0, _createClass3.default)(MonitorSceneController, [{
	        key: "createView",
	        value: function createView() {
	            return new _MonitorScene2.default();
	        }
	    }, {
	        key: "initView",
	        value: function initView() {
	            var _this2 = this;

	            this.on("activated", this._onActivated.bind(this));
	            this.on("deactivated", this._onDeactivated.bind(this));
	            _model2.default.on("sysInfoChanged", function () {
	                _this2.view.sysInfo = _model2.default.sysInfo;
	            });
	            _model2.default.on("sysStatusChanged", function () {
	                _this2.view.sysStatus = _model2.default.sysStatus;
	            });
	        }
	    }, {
	        key: "_onActivated",
	        value: function _onActivated() {
	            _model2.default.startMonitorStatus();
	            this.view.startChart();
	        }
	    }, {
	        key: "_onDeactivated",
	        value: function _onDeactivated() {
	            _model2.default.stopMonitorStatus();
	            this.view.stopChart();
	        }
	    }]);
	    return MonitorSceneController;
	}(_SceneController3.default);

	exports.default = MonitorSceneController;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Scene2 = __webpack_require__(126);

	var _Scene3 = _interopRequireDefault(_Scene2);

	var _smoothie = __webpack_require__(132);

	var _smoothie2 = _interopRequireDefault(_smoothie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SmoothieChart = _smoothie2.default.SmoothieChart;
	var TimeSeries = _smoothie2.default.TimeSeries;

	var MonitorScene = function (_Scene) {
	    (0, _inherits3.default)(MonitorScene, _Scene);

	    function MonitorScene() {
	        (0, _classCallCheck3.default)(this, MonitorScene);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(MonitorScene).apply(this, arguments));
	    }

	    (0, _createClass3.default)(MonitorScene, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(MonitorScene.prototype), "init", this).call(this);
	            this.addStyleClass("rpm-monitor-scene");

	            this._initGroups();
	            this._initCharts();
	        }
	    }, {
	        key: "_initGroups",
	        value: function _initGroups() {
	            this.$group("CPU", [this.$cell("Usage", $("<span id=\"cpu-usage\"></span>")), this.$cell().attr("id", "cpu-chart-container").addClass("chart-container"), this.$cell("Speed", $("<span id=\"cpu-speed\"></span>")), this.$cell("Temperature", $("<span id=\"cpu-temperature\"></span>"))]);

	            this.$group("Memory", [this.$cell("Usage", $("<span id=\"mem-usage\"></span>")), this.$cell().attr("id", "mem-chart-container").addClass("chart-container"), this.$cell("Free", $("<span id=\"mem-free\"></span>")), this.$cell("Total", $("<span id=\"mem-total\"></span>"))]);
	        }
	    }, {
	        key: "_initCharts",
	        value: function _initCharts() {
	            var $canvas = $("<canvas width=\"" + (window.innerWidth - 30) + "\" height=\"85\" />");
	            this.$("#cpu-chart-container").append($canvas);
	            var grid = {
	                fillStyle: 'transparent',
	                strokeStyle: 'rgba(128,128,128,0.2)'
	            };
	            var style = {
	                minValue: 0,
	                maxValueScale: 1.4,
	                yMinFormatter: function yMinFormatter(y) {
	                    return parseInt(y) + "%";
	                },
	                yMaxFormatter: function yMaxFormatter(y) {
	                    return parseInt(y) + "%";
	                },
	                yRangeFunction: function yRangeFunction(range) {
	                    if (range.max > 50) {
	                        range.max = 100;
	                    } else {
	                        range.max = 50;
	                    }
	                    return range;
	                },
	                grid: grid,
	                labels: { fillStyle: "rgba(0, 0, 0, 0.5)" }
	            };
	            var chart = new SmoothieChart(style);
	            chart.streamTo($canvas[0]);
	            this._cpuTimeSeries = new TimeSeries();
	            chart.addTimeSeries(this._cpuTimeSeries, { lineWidth: 2, strokeStyle: '#ff0000', fillStyle: 'rgba(240,150,92,0.30)' });
	            this._cpuChart = chart;

	            $canvas = $("<canvas width=\"" + (window.innerWidth - 30) + "\" height=\"85\" />");
	            this.$("#mem-chart-container").append($canvas);
	            chart = new SmoothieChart(style);
	            chart.streamTo($canvas[0]);
	            this._memTimeSeries = new TimeSeries();
	            chart.addTimeSeries(this._memTimeSeries, { lineWidth: 2, strokeStyle: '#00ff00', fillStyle: 'rgba(150,230,92,0.30)' });
	            this._memChart = chart;

	            this.stopChart();
	        }
	    }, {
	        key: "renderStatus",
	        value: function renderStatus() {
	            this._cpuTimeSeries.append(this.sysStatus.timestamp, Math.round(this.sysStatus.cpu.usage * 1000) / 10);
	            this._memTimeSeries.append(this.sysStatus.timestamp, Math.round((this.sysInfo.machine.mem.total - this.sysStatus.mem.free) / this.sysInfo.machine.mem.total * 100));

	            this.$("#cpu-usage").text(this._formatPercentage(this.sysStatus.cpu.usage));
	            this.$("#cpu-speed").text(this._formatMHz(this.sysStatus.cpu.speed));
	            this.$("#cpu-temperature").text(this._formatTemperature(this.sysStatus.cpu.temperature));

	            this.$("#mem-free").text(this._formatByte(this.sysStatus.mem.free));
	            this.$("#mem-usage").text(this._formatPercentage((this.sysInfo.machine.mem.total - this.sysStatus.mem.free) / this.sysInfo.machine.mem.total));
	        }
	    }, {
	        key: "startChart",
	        value: function startChart() {
	            this.chartRunning = true;
	            if (this._cpuChart) {
	                this._cpuChart.start();
	            }
	            if (this._memChart) {
	                this._memChart.start();
	            }
	        }
	    }, {
	        key: "stopChart",
	        value: function stopChart() {
	            this.chartRunning = false;
	            if (this._cpuChart) {
	                this._cpuChart.stop();
	                this._cpuTimeSeries.clear();
	            }

	            if (this._memChart) {
	                this._memChart.stop();
	                this._memTimeSeries.clear();
	            }
	        }
	    }, {
	        key: "_formatPercentage",
	        value: function _formatPercentage(percentage) {
	            return Math.round(percentage * 1000) / 10 + " %";
	        }
	    }, {
	        key: "_formatTemperature",
	        value: function _formatTemperature(temp) {
	            return temp ? Math.round(temp / 1000) + " °C" : "N/A";
	        }
	    }, {
	        key: "_formatByte",
	        value: function _formatByte(b) {
	            var mb = Math.round(b / 1024 / 1024);
	            return mb >= 1024 * 0.5 ? parseInt(mb / 1024 * 100) / 100 + " GB" : mb + " MB";
	        }
	    }, {
	        key: "_formatMB",
	        value: function _formatMB(b) {
	            var mb = Math.round(b / 1024 / 1024);
	            return mb;
	        }
	    }, {
	        key: "_formatMHz",
	        value: function _formatMHz(mhz) {
	            return mhz >= 1000 ? parseInt(mhz / 1000 * 100) / 100 + " GHz" : mhz + " MHz";
	        }
	    }, {
	        key: "title",
	        get: function get() {
	            return "Monitor";
	        }
	    }, {
	        key: "sysInfo",
	        get: function get() {
	            return this._sysInfo;
	        },
	        set: function set(value) {
	            this._sysInfo = value;
	            if (this.sysInfo) {
	                this.$("#mem-total").text(this._formatByte(this.sysInfo.machine.mem.total));
	            } else {
	                this.$("#mem-total").text("");
	            }
	        }
	    }, {
	        key: "sysStatus",
	        get: function get() {
	            return this._sysStatus;
	        },
	        set: function set(value) {
	            this._sysStatus = value;
	            this.renderStatus();
	        }
	    }]);
	    return MonitorScene;
	}(_Scene3.default);

	exports.default = MonitorScene;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// MIT License:
	//
	// Copyright (c) 2010-2013, Joe Walnes
	//               2013-2014, Drew Noakes
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.

	/**
	 * Smoothie Charts - http://smoothiecharts.org/
	 * (c) 2010-2013, Joe Walnes
	 *     2013-2014, Drew Noakes
	 *
	 * v1.0: Main charting library, by Joe Walnes
	 * v1.1: Auto scaling of axis, by Neil Dunn
	 * v1.2: fps (frames per second) option, by Mathias Petterson
	 * v1.3: Fix for divide by zero, by Paul Nikitochkin
	 * v1.4: Set minimum, top-scale padding, remove timeseries, add optional timer to reset bounds, by Kelley Reynolds
	 * v1.5: Set default frames per second to 50... smoother.
	 *       .start(), .stop() methods for conserving CPU, by Dmitry Vyal
	 *       options.interpolation = 'bezier' or 'line', by Dmitry Vyal
	 *       options.maxValue to fix scale, by Dmitry Vyal
	 * v1.6: minValue/maxValue will always get converted to floats, by Przemek Matylla
	 * v1.7: options.grid.fillStyle may be a transparent color, by Dmitry A. Shashkin
	 *       Smooth rescaling, by Kostas Michalopoulos
	 * v1.8: Set max length to customize number of live points in the dataset with options.maxDataSetLength, by Krishna Narni
	 * v1.9: Display timestamps along the bottom, by Nick and Stev-io
	 *       (https://groups.google.com/forum/?fromgroups#!topic/smoothie-charts/-Ywse8FCpKI%5B1-25%5D)
	 *       Refactored by Krishna Narni, to support timestamp formatting function
	 * v1.10: Switch to requestAnimationFrame, removed the now obsoleted options.fps, by Gergely Imreh
	 * v1.11: options.grid.sharpLines option added, by @drewnoakes
	 *        Addressed warning seen in Firefox when seriesOption.fillStyle undefined, by @drewnoakes
	 * v1.12: Support for horizontalLines added, by @drewnoakes
	 *        Support for yRangeFunction callback added, by @drewnoakes
	 * v1.13: Fixed typo (#32), by @alnikitich
	 * v1.14: Timer cleared when last TimeSeries removed (#23), by @davidgaleano
	 *        Fixed diagonal line on chart at start/end of data stream, by @drewnoakes
	 * v1.15: Support for npm package (#18), by @dominictarr
	 *        Fixed broken removeTimeSeries function (#24) by @davidgaleano
	 *        Minor performance and tidying, by @drewnoakes
	 * v1.16: Bug fix introduced in v1.14 relating to timer creation/clearance (#23), by @drewnoakes
	 *        TimeSeries.append now deals with out-of-order timestamps, and can merge duplicates, by @zacwitte (#12)
	 *        Documentation and some local variable renaming for clarity, by @drewnoakes
	 * v1.17: Allow control over font size (#10), by @drewnoakes
	 *        Timestamp text won't overlap, by @drewnoakes
	 * v1.18: Allow control of max/min label precision, by @drewnoakes
	 *        Added 'borderVisible' chart option, by @drewnoakes
	 *        Allow drawing series with fill but no stroke (line), by @drewnoakes
	 * v1.19: Avoid unnecessary repaints, and fixed flicker in old browsers having multiple charts in document (#40), by @asbai
	 * v1.20: Add SmoothieChart.getTimeSeriesOptions and SmoothieChart.bringToFront functions, by @drewnoakes
	 * v1.21: Add 'step' interpolation mode, by @drewnoakes
	 * v1.22: Add support for different pixel ratios. Also add optional y limit formatters, by @copacetic
	 * v1.23: Fix bug introduced in v1.22 (#44), by @drewnoakes
	 * v1.24: Fix bug introduced in v1.23, re-adding parseFloat to y-axis formatter defaults, by @siggy_sf
	 * v1.25: Fix bug seen when adding a data point to TimeSeries which is older than the current data, by @Nking92
	 *        Draw time labels on top of series, by @comolosabia
	 *        Add TimeSeries.clear function, by @drewnoakes
	 * v1.26: Add support for resizing on high device pixel ratio screens, by @copacetic
	 * v1.27: Fix bug introduced in v1.26 for non whole number devicePixelRatio values, by @zmbush
	 */

	;(function(exports) {

	  var Util = {
	    extend: function() {
	      arguments[0] = arguments[0] || {};
	      for (var i = 1; i < arguments.length; i++)
	      {
	        for (var key in arguments[i])
	        {
	          if (arguments[i].hasOwnProperty(key))
	          {
	            if (typeof(arguments[i][key]) === 'object') {
	              if (arguments[i][key] instanceof Array) {
	                arguments[0][key] = arguments[i][key];
	              } else {
	                arguments[0][key] = Util.extend(arguments[0][key], arguments[i][key]);
	              }
	            } else {
	              arguments[0][key] = arguments[i][key];
	            }
	          }
	        }
	      }
	      return arguments[0];
	    }
	  };

	  /**
	   * Initialises a new <code>TimeSeries</code> with optional data options.
	   *
	   * Options are of the form (defaults shown):
	   *
	   * <pre>
	   * {
	   *   resetBounds: true,        // enables/disables automatic scaling of the y-axis
	   *   resetBoundsInterval: 3000 // the period between scaling calculations, in millis
	   * }
	   * </pre>
	   *
	   * Presentation options for TimeSeries are specified as an argument to <code>SmoothieChart.addTimeSeries</code>.
	   *
	   * @constructor
	   */
	  function TimeSeries(options) {
	    this.options = Util.extend({}, TimeSeries.defaultOptions, options);
	    this.clear();
	  }

	  TimeSeries.defaultOptions = {
	    resetBoundsInterval: 3000,
	    resetBounds: true
	  };

	  /**
	   * Clears all data and state from this TimeSeries object.
	   */
	  TimeSeries.prototype.clear = function() {
	    this.data = [];
	    this.maxValue = Number.NaN; // The maximum value ever seen in this TimeSeries.
	    this.minValue = Number.NaN; // The minimum value ever seen in this TimeSeries.
	  };

	  /**
	   * Recalculate the min/max values for this <code>TimeSeries</code> object.
	   *
	   * This causes the graph to scale itself in the y-axis.
	   */
	  TimeSeries.prototype.resetBounds = function() {
	    if (this.data.length) {
	      // Walk through all data points, finding the min/max value
	      this.maxValue = this.data[0][1];
	      this.minValue = this.data[0][1];
	      for (var i = 1; i < this.data.length; i++) {
	        var value = this.data[i][1];
	        if (value > this.maxValue) {
	          this.maxValue = value;
	        }
	        if (value < this.minValue) {
	          this.minValue = value;
	        }
	      }
	    } else {
	      // No data exists, so set min/max to NaN
	      this.maxValue = Number.NaN;
	      this.minValue = Number.NaN;
	    }
	  };

	  /**
	   * Adds a new data point to the <code>TimeSeries</code>, preserving chronological order.
	   *
	   * @param timestamp the position, in time, of this data point
	   * @param value the value of this data point
	   * @param sumRepeatedTimeStampValues if <code>timestamp</code> has an exact match in the series, this flag controls
	   * whether it is replaced, or the values summed (defaults to false.)
	   */
	  TimeSeries.prototype.append = function(timestamp, value, sumRepeatedTimeStampValues) {
	    // Rewind until we hit an older timestamp
	    var i = this.data.length - 1;
	    while (i >= 0 && this.data[i][0] > timestamp) {
	      i--;
	    }

	    if (i === -1) {
	      // This new item is the oldest data
	      this.data.splice(0, 0, [timestamp, value]);
	    } else if (this.data.length > 0 && this.data[i][0] === timestamp) {
	      // Update existing values in the array
	      if (sumRepeatedTimeStampValues) {
	        // Sum this value into the existing 'bucket'
	        this.data[i][1] += value;
	        value = this.data[i][1];
	      } else {
	        // Replace the previous value
	        this.data[i][1] = value;
	      }
	    } else if (i < this.data.length - 1) {
	      // Splice into the correct position to keep timestamps in order
	      this.data.splice(i + 1, 0, [timestamp, value]);
	    } else {
	      // Add to the end of the array
	      this.data.push([timestamp, value]);
	    }

	    this.maxValue = isNaN(this.maxValue) ? value : Math.max(this.maxValue, value);
	    this.minValue = isNaN(this.minValue) ? value : Math.min(this.minValue, value);
	  };

	  TimeSeries.prototype.dropOldData = function(oldestValidTime, maxDataSetLength) {
	    // We must always keep one expired data point as we need this to draw the
	    // line that comes into the chart from the left, but any points prior to that can be removed.
	    var removeCount = 0;
	    while (this.data.length - removeCount >= maxDataSetLength && this.data[removeCount + 1][0] < oldestValidTime) {
	      removeCount++;
	    }
	    if (removeCount !== 0) {
	      this.data.splice(0, removeCount);
	    }
	  };

	  /**
	   * Initialises a new <code>SmoothieChart</code>.
	   *
	   * Options are optional, and should be of the form below. Just specify the values you
	   * need and the rest will be given sensible defaults as shown:
	   *
	   * <pre>
	   * {
	   *   minValue: undefined,                      // specify to clamp the lower y-axis to a given value
	   *   maxValue: undefined,                      // specify to clamp the upper y-axis to a given value
	   *   maxValueScale: 1,                         // allows proportional padding to be added above the chart. for 10% padding, specify 1.1.
	   *   yRangeFunction: undefined,                // function({min: , max: }) { return {min: , max: }; }
	   *   scaleSmoothing: 0.125,                    // controls the rate at which y-value zoom animation occurs
	   *   millisPerPixel: 20,                       // sets the speed at which the chart pans by
	   *   enableDpiScaling: true,                   // support rendering at different DPI depending on the device
	   *   yMinFormatter: function(min, precision) { // callback function that formats the min y value label
	   *     return parseFloat(min).toFixed(precision);
	   *   },
	   *   yMaxFormatter: function(max, precision) { // callback function that formats the max y value label
	   *     return parseFloat(max).toFixed(precision);
	   *   },
	   *   maxDataSetLength: 2,
	   *   interpolation: 'bezier'                   // one of 'bezier', 'linear', or 'step'
	   *   timestampFormatter: null,                 // optional function to format time stamps for bottom of chart
	   *                                             // you may use SmoothieChart.timeFormatter, or your own: function(date) { return ''; }
	   *   horizontalLines: [],                      // [ { value: 0, color: '#ffffff', lineWidth: 1 } ]
	   *   grid:
	   *   {
	   *     fillStyle: '#000000',                   // the background colour of the chart
	   *     lineWidth: 1,                           // the pixel width of grid lines
	   *     strokeStyle: '#777777',                 // colour of grid lines
	   *     millisPerLine: 1000,                    // distance between vertical grid lines
	   *     sharpLines: false,                      // controls whether grid lines are 1px sharp, or softened
	   *     verticalSections: 2,                    // number of vertical sections marked out by horizontal grid lines
	   *     borderVisible: true                     // whether the grid lines trace the border of the chart or not
	   *   },
	   *   labels
	   *   {
	   *     disabled: false,                        // enables/disables labels showing the min/max values
	   *     fillStyle: '#ffffff',                   // colour for text of labels,
	   *     fontSize: 15,
	   *     fontFamily: 'sans-serif',
	   *     precision: 2
	   *   }
	   * }
	   * </pre>
	   *
	   * @constructor
	   */
	  function SmoothieChart(options) {
	    this.options = Util.extend({}, SmoothieChart.defaultChartOptions, options);
	    this.seriesSet = [];
	    this.currentValueRange = 1;
	    this.currentVisMinValue = 0;
	    this.lastRenderTimeMillis = 0;
	  }

	  SmoothieChart.defaultChartOptions = {
	    millisPerPixel: 20,
	    enableDpiScaling: true,
	    yMinFormatter: function(min, precision) {
	      return parseFloat(min).toFixed(precision);
	    },
	    yMaxFormatter: function(max, precision) {
	      return parseFloat(max).toFixed(precision);
	    },
	    maxValueScale: 1,
	    interpolation: 'bezier',
	    scaleSmoothing: 0.125,
	    maxDataSetLength: 2,
	    grid: {
	      fillStyle: '#000000',
	      strokeStyle: '#777777',
	      lineWidth: 1,
	      sharpLines: false,
	      millisPerLine: 1000,
	      verticalSections: 2,
	      borderVisible: true
	    },
	    labels: {
	      fillStyle: '#ffffff',
	      disabled: false,
	      fontSize: 10,
	      fontFamily: 'monospace',
	      precision: 2
	    },
	    horizontalLines: []
	  };

	  // Based on http://inspirit.github.com/jsfeat/js/compatibility.js
	  SmoothieChart.AnimateCompatibility = (function() {
	    var requestAnimationFrame = function(callback, element) {
	          var requestAnimationFrame =
	            window.requestAnimationFrame        ||
	            window.webkitRequestAnimationFrame  ||
	            window.mozRequestAnimationFrame     ||
	            window.oRequestAnimationFrame       ||
	            window.msRequestAnimationFrame      ||
	            function(callback) {
	              return window.setTimeout(function() {
	                callback(new Date().getTime());
	              }, 16);
	            };
	          return requestAnimationFrame.call(window, callback, element);
	        },
	        cancelAnimationFrame = function(id) {
	          var cancelAnimationFrame =
	            window.cancelAnimationFrame ||
	            function(id) {
	              clearTimeout(id);
	            };
	          return cancelAnimationFrame.call(window, id);
	        };

	    return {
	      requestAnimationFrame: requestAnimationFrame,
	      cancelAnimationFrame: cancelAnimationFrame
	    };
	  })();

	  SmoothieChart.defaultSeriesPresentationOptions = {
	    lineWidth: 1,
	    strokeStyle: '#ffffff'
	  };

	  /**
	   * Adds a <code>TimeSeries</code> to this chart, with optional presentation options.
	   *
	   * Presentation options should be of the form (defaults shown):
	   *
	   * <pre>
	   * {
	   *   lineWidth: 1,
	   *   strokeStyle: '#ffffff',
	   *   fillStyle: undefined
	   * }
	   * </pre>
	   */
	  SmoothieChart.prototype.addTimeSeries = function(timeSeries, options) {
	    this.seriesSet.push({timeSeries: timeSeries, options: Util.extend({}, SmoothieChart.defaultSeriesPresentationOptions, options)});
	    if (timeSeries.options.resetBounds && timeSeries.options.resetBoundsInterval > 0) {
	      timeSeries.resetBoundsTimerId = setInterval(
	        function() {
	          timeSeries.resetBounds();
	        },
	        timeSeries.options.resetBoundsInterval
	      );
	    }
	  };

	  /**
	   * Removes the specified <code>TimeSeries</code> from the chart.
	   */
	  SmoothieChart.prototype.removeTimeSeries = function(timeSeries) {
	    // Find the correct timeseries to remove, and remove it
	    var numSeries = this.seriesSet.length;
	    for (var i = 0; i < numSeries; i++) {
	      if (this.seriesSet[i].timeSeries === timeSeries) {
	        this.seriesSet.splice(i, 1);
	        break;
	      }
	    }
	    // If a timer was operating for that timeseries, remove it
	    if (timeSeries.resetBoundsTimerId) {
	      // Stop resetting the bounds, if we were
	      clearInterval(timeSeries.resetBoundsTimerId);
	    }
	  };

	  /**
	   * Gets render options for the specified <code>TimeSeries</code>.
	   *
	   * As you may use a single <code>TimeSeries</code> in multiple charts with different formatting in each usage,
	   * these settings are stored in the chart.
	   */
	  SmoothieChart.prototype.getTimeSeriesOptions = function(timeSeries) {
	    // Find the correct timeseries to remove, and remove it
	    var numSeries = this.seriesSet.length;
	    for (var i = 0; i < numSeries; i++) {
	      if (this.seriesSet[i].timeSeries === timeSeries) {
	        return this.seriesSet[i].options;
	      }
	    }
	  };

	  /**
	   * Brings the specified <code>TimeSeries</code> to the top of the chart. It will be rendered last.
	   */
	  SmoothieChart.prototype.bringToFront = function(timeSeries) {
	    // Find the correct timeseries to remove, and remove it
	    var numSeries = this.seriesSet.length;
	    for (var i = 0; i < numSeries; i++) {
	      if (this.seriesSet[i].timeSeries === timeSeries) {
	        var set = this.seriesSet.splice(i, 1);
	        this.seriesSet.push(set[0]);
	        break;
	      }
	    }
	  };

	  /**
	   * Instructs the <code>SmoothieChart</code> to start rendering to the provided canvas, with specified delay.
	   *
	   * @param canvas the target canvas element
	   * @param delayMillis an amount of time to wait before a data point is shown. This can prevent the end of the series
	   * from appearing on screen, with new values flashing into view, at the expense of some latency.
	   */
	  SmoothieChart.prototype.streamTo = function(canvas, delayMillis) {
	    this.canvas = canvas;
	    this.delay = delayMillis;
	    this.start();
	  };

	  /**
	   * Make sure the canvas has the optimal resolution for the device's pixel ratio.
	   */
	  SmoothieChart.prototype.resize = function() {
	    // TODO this function doesn't handle the value of enableDpiScaling changing during execution
	    if (!this.options.enableDpiScaling || !window || window.devicePixelRatio === 1)
	      return;

	    var dpr = window.devicePixelRatio;
	    var width = parseInt(this.canvas.getAttribute('width'));
	    var height = parseInt(this.canvas.getAttribute('height'));

	    if (!this.originalWidth || (Math.floor(this.originalWidth * dpr) !== width)) {
	      this.originalWidth = width;
	      this.canvas.setAttribute('width', (Math.floor(width * dpr)).toString());
	      this.canvas.style.width = width + 'px';
	      this.canvas.getContext('2d').scale(dpr, dpr);
	    }

	    if (!this.originalHeight || (Math.floor(this.originalHeight * dpr) !== height)) {
	      this.originalHeight = height;
	      this.canvas.setAttribute('height', (Math.floor(height * dpr)).toString());
	      this.canvas.style.height = height + 'px';
	      this.canvas.getContext('2d').scale(dpr, dpr);
	    }
	  };

	  /**
	   * Starts the animation of this chart.
	   */
	  SmoothieChart.prototype.start = function() {
	    if (this.frame) {
	      // We're already running, so just return
	      return;
	    }

	    // Renders a frame, and queues the next frame for later rendering
	    var animate = function() {
	      this.frame = SmoothieChart.AnimateCompatibility.requestAnimationFrame(function() {
	        this.render();
	        animate();
	      }.bind(this));
	    }.bind(this);

	    animate();
	  };

	  /**
	   * Stops the animation of this chart.
	   */
	  SmoothieChart.prototype.stop = function() {
	    if (this.frame) {
	      SmoothieChart.AnimateCompatibility.cancelAnimationFrame(this.frame);
	      delete this.frame;
	    }
	  };

	  SmoothieChart.prototype.updateValueRange = function() {
	    // Calculate the current scale of the chart, from all time series.
	    var chartOptions = this.options,
	        chartMaxValue = Number.NaN,
	        chartMinValue = Number.NaN;

	    for (var d = 0; d < this.seriesSet.length; d++) {
	      // TODO(ndunn): We could calculate / track these values as they stream in.
	      var timeSeries = this.seriesSet[d].timeSeries;
	      if (!isNaN(timeSeries.maxValue)) {
	        chartMaxValue = !isNaN(chartMaxValue) ? Math.max(chartMaxValue, timeSeries.maxValue) : timeSeries.maxValue;
	      }

	      if (!isNaN(timeSeries.minValue)) {
	        chartMinValue = !isNaN(chartMinValue) ? Math.min(chartMinValue, timeSeries.minValue) : timeSeries.minValue;
	      }
	    }

	    // Scale the chartMaxValue to add padding at the top if required
	    if (chartOptions.maxValue != null) {
	      chartMaxValue = chartOptions.maxValue;
	    } else {
	      chartMaxValue *= chartOptions.maxValueScale;
	    }

	    // Set the minimum if we've specified one
	    if (chartOptions.minValue != null) {
	      chartMinValue = chartOptions.minValue;
	    }

	    // If a custom range function is set, call it
	    if (this.options.yRangeFunction) {
	      var range = this.options.yRangeFunction({min: chartMinValue, max: chartMaxValue});
	      chartMinValue = range.min;
	      chartMaxValue = range.max;
	    }

	    if (!isNaN(chartMaxValue) && !isNaN(chartMinValue)) {
	      var targetValueRange = chartMaxValue - chartMinValue;
	      var valueRangeDiff = (targetValueRange - this.currentValueRange);
	      var minValueDiff = (chartMinValue - this.currentVisMinValue);
	      this.isAnimatingScale = Math.abs(valueRangeDiff) > 0.1 || Math.abs(minValueDiff) > 0.1;
	      this.currentValueRange += chartOptions.scaleSmoothing * valueRangeDiff;
	      this.currentVisMinValue += chartOptions.scaleSmoothing * minValueDiff;
	    }

	    this.valueRange = { min: chartMinValue, max: chartMaxValue };
	  };

	  SmoothieChart.prototype.render = function(canvas, time) {
	    var nowMillis = new Date().getTime();

	    if (!this.isAnimatingScale) {
	      // We're not animating. We can use the last render time and the scroll speed to work out whether
	      // we actually need to paint anything yet. If not, we can return immediately.

	      // Render at least every 1/6th of a second. The canvas may be resized, which there is
	      // no reliable way to detect.
	      var maxIdleMillis = Math.min(1000/6, this.options.millisPerPixel);

	      if (nowMillis - this.lastRenderTimeMillis < maxIdleMillis) {
	        return;
	      }
	    }

	    this.resize();

	    this.lastRenderTimeMillis = nowMillis;

	    canvas = canvas || this.canvas;
	    time = time || nowMillis - (this.delay || 0);

	    // Round time down to pixel granularity, so motion appears smoother.
	    time -= time % this.options.millisPerPixel;

	    var context = canvas.getContext('2d'),
	        chartOptions = this.options,
	        dimensions = { top: 0, left: 0, width: canvas.clientWidth, height: canvas.clientHeight },
	        // Calculate the threshold time for the oldest data points.
	        oldestValidTime = time - (dimensions.width * chartOptions.millisPerPixel),
	        valueToYPixel = function(value) {
	          var offset = value - this.currentVisMinValue;
	          return this.currentValueRange === 0
	            ? dimensions.height
	            : dimensions.height - (Math.round((offset / this.currentValueRange) * dimensions.height));
	        }.bind(this),
	        timeToXPixel = function(t) {
	          return Math.round(dimensions.width - ((time - t) / chartOptions.millisPerPixel));
	        };

	    this.updateValueRange();

	    context.font = chartOptions.labels.fontSize + 'px ' + chartOptions.labels.fontFamily;

	    // Save the state of the canvas context, any transformations applied in this method
	    // will get removed from the stack at the end of this method when .restore() is called.
	    context.save();

	    // Move the origin.
	    context.translate(dimensions.left, dimensions.top);

	    // Create a clipped rectangle - anything we draw will be constrained to this rectangle.
	    // This prevents the occasional pixels from curves near the edges overrunning and creating
	    // screen cheese (that phrase should need no explanation).
	    context.beginPath();
	    context.rect(0, 0, dimensions.width, dimensions.height);
	    context.clip();

	    // Clear the working area.
	    context.save();
	    context.fillStyle = chartOptions.grid.fillStyle;
	    context.clearRect(0, 0, dimensions.width, dimensions.height);
	    context.fillRect(0, 0, dimensions.width, dimensions.height);
	    context.restore();

	    // Grid lines...
	    context.save();
	    context.lineWidth = chartOptions.grid.lineWidth;
	    context.strokeStyle = chartOptions.grid.strokeStyle;
	    // Vertical (time) dividers.
	    if (chartOptions.grid.millisPerLine > 0) {
	      context.beginPath();
	      for (var t = time - (time % chartOptions.grid.millisPerLine);
	           t >= oldestValidTime;
	           t -= chartOptions.grid.millisPerLine) {
	        var gx = timeToXPixel(t);
	        if (chartOptions.grid.sharpLines) {
	          gx -= 0.5;
	        }
	        context.moveTo(gx, 0);
	        context.lineTo(gx, dimensions.height);
	      }
	      context.stroke();
	      context.closePath();
	    }

	    // Horizontal (value) dividers.
	    for (var v = 1; v < chartOptions.grid.verticalSections; v++) {
	      var gy = Math.round(v * dimensions.height / chartOptions.grid.verticalSections);
	      if (chartOptions.grid.sharpLines) {
	        gy -= 0.5;
	      }
	      context.beginPath();
	      context.moveTo(0, gy);
	      context.lineTo(dimensions.width, gy);
	      context.stroke();
	      context.closePath();
	    }
	    // Bounding rectangle.
	    if (chartOptions.grid.borderVisible) {
	      context.beginPath();
	      context.strokeRect(0, 0, dimensions.width, dimensions.height);
	      context.closePath();
	    }
	    context.restore();

	    // Draw any horizontal lines...
	    if (chartOptions.horizontalLines && chartOptions.horizontalLines.length) {
	      for (var hl = 0; hl < chartOptions.horizontalLines.length; hl++) {
	        var line = chartOptions.horizontalLines[hl],
	            hly = Math.round(valueToYPixel(line.value)) - 0.5;
	        context.strokeStyle = line.color || '#ffffff';
	        context.lineWidth = line.lineWidth || 1;
	        context.beginPath();
	        context.moveTo(0, hly);
	        context.lineTo(dimensions.width, hly);
	        context.stroke();
	        context.closePath();
	      }
	    }

	    // For each data set...
	    for (var d = 0; d < this.seriesSet.length; d++) {
	      context.save();
	      var timeSeries = this.seriesSet[d].timeSeries,
	          dataSet = timeSeries.data,
	          seriesOptions = this.seriesSet[d].options;

	      // Delete old data that's moved off the left of the chart.
	      timeSeries.dropOldData(oldestValidTime, chartOptions.maxDataSetLength);

	      // Set style for this dataSet.
	      context.lineWidth = seriesOptions.lineWidth;
	      context.strokeStyle = seriesOptions.strokeStyle;
	      // Draw the line...
	      context.beginPath();
	      // Retain lastX, lastY for calculating the control points of bezier curves.
	      var firstX = 0, lastX = 0, lastY = 0;
	      for (var i = 0; i < dataSet.length && dataSet.length !== 1; i++) {
	        var x = timeToXPixel(dataSet[i][0]),
	            y = valueToYPixel(dataSet[i][1]);

	        if (i === 0) {
	          firstX = x;
	          context.moveTo(x, y);
	        } else {
	          switch (chartOptions.interpolation) {
	            case "linear":
	            case "line": {
	              context.lineTo(x,y);
	              break;
	            }
	            case "bezier":
	            default: {
	              // Great explanation of Bezier curves: http://en.wikipedia.org/wiki/Bezier_curve#Quadratic_curves
	              //
	              // Assuming A was the last point in the line plotted and B is the new point,
	              // we draw a curve with control points P and Q as below.
	              //
	              // A---P
	              //     |
	              //     |
	              //     |
	              //     Q---B
	              //
	              // Importantly, A and P are at the same y coordinate, as are B and Q. This is
	              // so adjacent curves appear to flow as one.
	              //
	              context.bezierCurveTo( // startPoint (A) is implicit from last iteration of loop
	                Math.round((lastX + x) / 2), lastY, // controlPoint1 (P)
	                Math.round((lastX + x)) / 2, y, // controlPoint2 (Q)
	                x, y); // endPoint (B)
	              break;
	            }
	            case "step": {
	              context.lineTo(x,lastY);
	              context.lineTo(x,y);
	              break;
	            }
	          }
	        }

	        lastX = x; lastY = y;
	      }

	      if (dataSet.length > 1) {
	        if (seriesOptions.fillStyle) {
	          // Close up the fill region.
	          context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, lastY);
	          context.lineTo(dimensions.width + seriesOptions.lineWidth + 1, dimensions.height + seriesOptions.lineWidth + 1);
	          context.lineTo(firstX, dimensions.height + seriesOptions.lineWidth);
	          context.fillStyle = seriesOptions.fillStyle;
	          context.fill();
	        }

	        if (seriesOptions.strokeStyle && seriesOptions.strokeStyle !== 'none') {
	          context.stroke();
	        }
	        context.closePath();
	      }
	      context.restore();
	    }

	    // Draw the axis values on the chart.
	    if (!chartOptions.labels.disabled && !isNaN(this.valueRange.min) && !isNaN(this.valueRange.max)) {
	      var maxValueString = chartOptions.yMaxFormatter(this.valueRange.max, chartOptions.labels.precision),
	          minValueString = chartOptions.yMinFormatter(this.valueRange.min, chartOptions.labels.precision);
	      context.fillStyle = chartOptions.labels.fillStyle;
	      context.fillText(maxValueString, dimensions.width - context.measureText(maxValueString).width - 2, chartOptions.labels.fontSize);
	      context.fillText(minValueString, dimensions.width - context.measureText(minValueString).width - 2, dimensions.height - 2);
	    }

	    // Display timestamps along x-axis at the bottom of the chart.
	    if (chartOptions.timestampFormatter && chartOptions.grid.millisPerLine > 0) {
	      var textUntilX = dimensions.width - context.measureText(minValueString).width + 4;
	      for (var t = time - (time % chartOptions.grid.millisPerLine);
	           t >= oldestValidTime;
	           t -= chartOptions.grid.millisPerLine) {
	        var gx = timeToXPixel(t);
	        // Only draw the timestamp if it won't overlap with the previously drawn one.
	        if (gx < textUntilX) {
	          // Formats the timestamp based on user specified formatting function
	          // SmoothieChart.timeFormatter function above is one such formatting option
	          var tx = new Date(t),
	            ts = chartOptions.timestampFormatter(tx),
	            tsWidth = context.measureText(ts).width;
	          textUntilX = gx - tsWidth - 2;
	          context.fillStyle = chartOptions.labels.fillStyle;
	          context.fillText(ts, gx - tsWidth, dimensions.height - 2);
	        }
	      }
	    }

	    context.restore(); // See .save() above.
	  };

	  // Sample timestamp formatting function
	  SmoothieChart.timeFormatter = function(date) {
	    function pad2(number) { return (number < 10 ? '0' : '') + number }
	    return pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds());
	  };

	  exports.TimeSeries = TimeSeries;
	  exports.SmoothieChart = SmoothieChart;

	})( false ? this : exports);



/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _SysInfoScene = __webpack_require__(134);

	var _SysInfoScene2 = _interopRequireDefault(_SysInfoScene);

	var _SceneController2 = __webpack_require__(127);

	var _SceneController3 = _interopRequireDefault(_SceneController2);

	var _model = __webpack_require__(129);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SysInfoSceneController = function (_SceneController) {
	    (0, _inherits3.default)(SysInfoSceneController, _SceneController);

	    function SysInfoSceneController() {
	        (0, _classCallCheck3.default)(this, SysInfoSceneController);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SysInfoSceneController).apply(this, arguments));
	    }

	    (0, _createClass3.default)(SysInfoSceneController, [{
	        key: "createView",
	        value: function createView() {
	            return new _SysInfoScene2.default();
	        }
	    }, {
	        key: "initView",
	        value: function initView() {
	            var _this2 = this;

	            _model2.default.on("sysInfoChanged", function () {
	                _this2.view.sysInfo = _model2.default.sysInfo;
	            });
	        }
	    }]);
	    return SysInfoSceneController;
	}(_SceneController3.default);

	exports.default = SysInfoSceneController;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(81);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(101);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(109);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Scene2 = __webpack_require__(126);

	var _Scene3 = _interopRequireDefault(_Scene2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SysInfoScene = function (_Scene) {
	    (0, _inherits3.default)(SysInfoScene, _Scene);

	    function SysInfoScene() {
	        (0, _classCallCheck3.default)(this, SysInfoScene);
	        return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SysInfoScene).apply(this, arguments));
	    }

	    (0, _createClass3.default)(SysInfoScene, [{
	        key: "init",
	        value: function init() {
	            (0, _get3.default)(Object.getPrototypeOf(SysInfoScene.prototype), "init", this).call(this);
	            this.addStyleClass("rpm-sys-info-scene");
	            this._initGroups();
	        }
	    }, {
	        key: "_initGroups",
	        value: function _initGroups() {
	            this.$group(null, [this.$cell("Host", $("<small id=\"host-name\"></small>"))]);
	            this.$group("Basis", [this.$cell("CPU", $("<small id=\"cpu\"></small>")), this.$cell("CPU count", $("<span id=\"cpu-count\"></span>")), this.$cell("Memory size", $("<span id=\"mem-total\"></span>"))]);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            this.$("#host-name").text(this.sysInfo.hostname);

	            this.$("#cpu").text(this.sysInfo.machine.cpus.model);
	            this.$("#cpu-count").text(this.sysInfo.machine.cpus.count);
	            this.$("#mem-total").text(this._formatByte(this.sysInfo.machine.mem.total));

	            if (this.sysInfo.machine.networks.length) {
	                this.sysInfo.machine.networks.forEach(function (network) {
	                    var $cells = [];
	                    network.interfaces.forEach(function (i) {
	                        if (i.family === "IPv4") {
	                            $cells.push(_this2.$cell("MACv4", $("<span>" + i.mac + "</span>")));
	                            $cells.push(_this2.$cell("IPv4", $("<span>" + i.address + "</span>")));
	                        } else if (i.family === "IPv6") {
	                            $cells.push(_this2.$cell("MACv6", $("<span>" + i.mac + "</span>")));
	                            $cells.push(_this2.$cell("IPv6", $("<span>" + i.address + "</span>")));
	                        }
	                    });
	                    if (network.name.startsWith("en")) {
	                        _this2.$group("Enthernet", $cells);
	                    } else if (network.name.startsWith("wlan") || network.name === "awdl0") {
	                        _this2.$group("Wi-Fi", $cells);
	                    } else {
	                        _this2.$group(network.name, $cells);
	                    }
	                });
	            }
	        }
	    }, {
	        key: "_formatByte",
	        value: function _formatByte(b) {
	            var mb = Math.round(b / 1024 / 1024);
	            return mb >= 1024 * 0.5 ? parseInt(mb / 1024 * 100) / 100 + " GB" : mb + " MB";
	        }
	    }, {
	        key: "title",
	        get: function get() {
	            return "Machine";
	        }
	    }, {
	        key: "sysInfo",
	        get: function get() {
	            return this._sysInfo;
	        },
	        set: function set(value) {
	            this._sysInfo = value;
	            this.render();
	        }
	    }]);
	    return SysInfoScene;
	}(_Scene3.default);

	exports.default = SysInfoScene;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 135 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);