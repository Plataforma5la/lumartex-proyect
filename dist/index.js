module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "da8293d4572814de3a22";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://0.0.0.0:3030/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function escape(url, needQuotes) {\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || needQuotes) {\n    return '\"' + url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') + '\"';\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/url-escape.js?");

/***/ }),

/***/ "./node_modules/react-alice-carousel/lib/alice-carousel.css":
/*!******************************************************************!*\
  !*** ./node_modules/react-alice-carousel/lib/alice-carousel.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".alice-carousel {\\n  box-sizing: border-box;\\n  position: relative;\\n  width: 100%;\\n  margin: auto; }\\n\\n.alice-carousel__wrapper {\\n  position: relative;\\n  width: 100%;\\n  height: auto;\\n  box-sizing: border-box;\\n  overflow: hidden; }\\n\\n.alice-carousel__stage {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  margin: 0;\\n  padding: 0;\\n  white-space: nowrap;\\n  box-sizing: border-box; }\\n  .alice-carousel__stage-item {\\n    width: 100%;\\n    height: 100%;\\n    position: relative;\\n    display: inline-block;\\n    vertical-align: top;\\n    white-space: normal;\\n    line-height: 0; }\\n    .alice-carousel__stage-item * {\\n      line-height: initial; }\\n    .alice-carousel__stage-item.__cloned {\\n      opacity: 0;\\n      visibility: hidden; }\\n  .alice-carousel__stage:after {\\n    content: \\\".\\\";\\n    display: block;\\n    clear: both;\\n    visibility: hidden;\\n    line-height: 0;\\n    height: 0; }\\n\\n.alice-carousel__prev-btn,\\n.alice-carousel__next-btn {\\n  display: inline-block;\\n  width: 50%;\\n  padding: 15px 10px;\\n  box-sizing: border-box; }\\n  .alice-carousel__prev-btn [data-area]::after,\\n  .alice-carousel__next-btn [data-area]::after {\\n    content: attr(data-area);\\n    position: relative;\\n    text-transform: capitalize; }\\n\\n.alice-carousel__prev-btn {\\n  text-align: right; }\\n\\n.alice-carousel__prev-btn-item,\\n.alice-carousel__next-btn-item {\\n  display: inline-block;\\n  color: #465798;\\n  cursor: pointer; }\\n  .alice-carousel__prev-btn-item:hover,\\n  .alice-carousel__next-btn-item:hover {\\n    color: darkred; }\\n  .alice-carousel__prev-btn-item.__inactive,\\n  .alice-carousel__next-btn-item.__inactive {\\n    opacity: .4; }\\n\\n.alice-carousel__play-btn {\\n  display: inline-block;\\n  position: absolute;\\n  top: 30px;\\n  left: 20px; }\\n  .alice-carousel__play-btn:hover {\\n    cursor: pointer; }\\n  .alice-carousel__play-btn-wrapper {\\n    position: relative;\\n    background-color: #fff;\\n    padding: 10px;\\n    width: 32px;\\n    height: 32px;\\n    border-radius: 50%; }\\n\\n.alice-carousel__play-btn-item {\\n  cursor: pointer;\\n  position: absolute;\\n  background: transparent;\\n  width: 32px;\\n  height: 32px;\\n  outline: none;\\n  border: 0; }\\n  .alice-carousel__play-btn-item::before, .alice-carousel__play-btn-item::after {\\n    content: '';\\n    width: 0;\\n    height: 0;\\n    display: block;\\n    position: absolute;\\n    border-style: solid;\\n    border-color: transparent;\\n    border-width: 8px 0 8px 15px;\\n    border-left-color: #465798;\\n    transition: all 0.3s linear; }\\n  .alice-carousel__play-btn-item::before {\\n    height: 14px;\\n    left: 5px; }\\n  .alice-carousel__play-btn-item::after {\\n    left: 18px;\\n    top: 7px; }\\n  .alice-carousel__play-btn-item.__pause::before, .alice-carousel__play-btn-item.__pause::after {\\n    border-width: 0 0 0 10px;\\n    height: 30px; }\\n  .alice-carousel__play-btn-item.__pause::after {\\n    left: 18px;\\n    top: 0; }\\n\\n.alice-carousel__dots {\\n  margin: 30px 0 5px;\\n  text-align: center;\\n  list-style: none;\\n  padding: 0; }\\n  .alice-carousel__dots-item {\\n    display: inline-block;\\n    width: 8px;\\n    height: 8px;\\n    cursor: pointer;\\n    border-radius: 50%;\\n    background-color: #e0e4fb; }\\n    .alice-carousel__dots-item:not(:last-child) {\\n      margin-right: 15px; }\\n    .alice-carousel__dots-item:hover, .alice-carousel__dots-item.__active {\\n      background-color: #6e7ebc; }\\n\\n.alice-carousel__slide-info {\\n  display: inline-block;\\n  position: absolute;\\n  right: 20px;\\n  top: 20px;\\n  padding: 5px 10px;\\n  color: #465798;\\n  border-radius: 5px;\\n  background-color: rgba(224, 228, 251, 0.6); }\\n  .alice-carousel__slide-info-item {\\n    line-height: 0;\\n    vertical-align: middle; }\\n\\n.alice-carousel .animated {\\n  animation-fill-mode: both; }\\n\\n.alice-carousel .animated-out {\\n  z-index: 1; }\\n\\n.alice-carousel .fadeOut {\\n  animation-name: fadeOut; }\\n\\n@keyframes fadeOut {\\n  0% {\\n    opacity: 1; }\\n  100% {\\n    opacity: 0;\\n    visibility: hidden; } }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./node_modules/react-alice-carousel/lib/alice-carousel.css?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/ajax-loader.gif":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/ajax-loader.gif ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/gif;base64,R0lGODlhIAAgAPUAAP///wAAAPr6+sTExOjo6PDw8NDQ0H5+fpqamvb29ubm5vz8/JKSkoaGhuLi4ri4uKCgoOzs7K6urtzc3D4+PlZWVmBgYHx8fKioqO7u7kpKSmxsbAwMDAAAAM7OzsjIyNjY2CwsLF5eXh4eHkxMTLCwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAG/0CAcEgkFjgcR3HJJE4SxEGnMygKmkwJxRKdVocFBRRLfFAoj6GUOhQoFAVysULRjNdfQFghLxrODEJ4Qm5ifUUXZwQAgwBvEXIGBkUEZxuMXgAJb1dECWMABAcHDEpDEGcTBQMDBQtvcW0RbwuECKMHELEJF5NFCxm1AAt7cH4NuAOdcsURy0QCD7gYfcWgTQUQB6Zkr66HoeDCSwIF5ucFz3IC7O0CC6zx8YuHhW/3CvLyfPX4+OXozKnDssBdu3G/xIHTpGAgOUPrZimAJCfDPYfDin2TQ+xeBnWbHi37SC4YIYkQhdy7FvLdpwWvjA0JyU/ISyIx4xS6sgfkNS4me2rtVKkgw0JCb8YMZdjwqMQ2nIY8BbcUQNVCP7G4MQq1KRivR7tiDEuEFrggACH5BAAKAAEALAAAAAAgACAAAAb/QIBwSCQmNBpCcckkEgREA4ViKA6azM8BEZ1Wh6LOBls0HA5fgJQ6HHQ6InKRcWhA1d5hqMMpyIkOZw9Ca18Qbwd/RRhnfoUABRwdI3IESkQFZxB4bAdvV0YJQwkDAx9+bWcECQYGCQ5vFEQCEQoKC0ILHqUDBncCGA5LBiHCAAsFtgqoQwS8Aw64f8m2EXdFCxO8INPKomQCBgPMWAvL0n/ff+jYAu7vAuxy8O/myvfX8/f7/Arq+v0W0HMnr9zAeE0KJlQkJIGCfE0E+PtDq9qfDMogDkGmrIBCbNQUZIDosNq1kUsEZJBW0dY/b0ZsLViQIMFMW+RKKgjFzp4fNokPIdki+Y8JNVxA79jKwHAI0G9JGw5tCqDWTiFRhVhtmhVA16cMJTJ1OnVIMo1cy1KVI5NhEAAh+QQACgACACwAAAAAIAAgAAAG/0CAcEgkChqNQnHJJCYWRMfh4CgamkzFwBOdVocNCgNbJAwGhKGUOjRQKA1y8XOGAtZfgIWiSciJBWcTQnhCD28Qf0UgZwJ3XgAJGhQVcgKORmdXhRBvV0QMY0ILCgoRmIRnCQIODgIEbxtEJSMdHZ8AGaUKBXYLIEpFExZpAG62HRRFArsKfn8FIsgjiUwJu8FkJLYcB9lMCwUKqFgGHSJ5cnZ/uEULl/CX63/x8KTNu+RkzPj9zc/0/Cl4V0/APDIE6x0csrBJwybX9DFhBhCLgAilIvzRVUriKHGlev0JtyuDvmsZUZlcIiCDnYu7KsZ0UmrBggRP7n1DqcDJEzciOgHwcwTyZEUmIKEMFVIqgyIjpZ4tjdTxqRCMPYVMBYDV6tavUZ8yczpkKwBxHsVWtaqo5tMgACH5BAAKAAMALAAAAAAgACAAAAb/QIBwSCQuBgNBcck0FgvIQtHRZCYUGSJ0IB2WDo9qUaBQKIXbLsBxOJTExUh5mB4iDo0zXEhWJNBRQgZtA3tPZQsAdQINBwxwAnpCC2VSdQNtVEQSEkOUChGSVwoLCwUFpm0QRAMVFBQTQxllCqh0kkIECF0TG68UG2O0foYJDb8VYVa0alUXrxoQf1WmZnsTFA0EhgCJhrFMC5Hjkd57W0jpDsPDuFUDHfHyHRzstNN78PPxHOLk5dwcpBuoaYk5OAfhXHG3hAy+KgLkgNozqwzDbgWYJQyXsUwGXKNA6fnYMIO3iPeIpBwyqlSCBKUqEQk5E6YRmX2UdAT5kEnHKkQ5hXjkNqTPtKAARl1sIrGoxSFNuSEFMNWoVCxEpiqyRlQY165wEHELAgAh+QQACgAEACwAAAAAIAAgAAAG/0CAcEgsKhSLonJJTBIFR0GxwFwmFJlnlAgaTKpFqEIqFJMBhcEABC5GjkPz0KN2tsvHBH4sJKgdd1NHSXILah9tAmdCC0dUcg5qVEQfiIxHEYtXSACKnWoGXAwHBwRDGUcKBXYFi0IJHmQEEKQHEGGpCnp3AiW1DKFWqZNgGKQNA65FCwV8bQQHJcRtds9MC4rZitVgCQbf4AYEubnKTAYU6eoUGuSpu3fo6+ka2NrbgQAE4eCmS9xVAOW7Yq7IgA4Hpi0R8EZBhDshOnTgcOtfM0cAlTigILFDiAFFNjk8k0GZgAxOBozouIHIOyKbFixIkECmIyIHOEiEWbPJTTQ5FxcVOMCgzUVCWwAcyZJvzy45ADYVZNIwTlIAVfNB7XRVDLxEWLQ4E9JsKq+rTdsMyhcEACH5BAAKAAUALAAAAAAgACAAAAb/QIBwSCwqFIuicklMEgVHQVHKVCYUmWeUWFAkqtOtEKqgAsgFcDFyHJLNmbZa6x2Lyd8595h8C48RagJmQgtHaX5XZUYKQ4YKEYSKfVKPaUMZHwMDeQBxh04ABYSFGU4JBpsDBmFHdXMLIKofBEyKCpdgspsOoUsLXaRLCQMgwky+YJ1FC4POg8lVAg7U1Q5drtnHSw4H3t8HDdnZy2Dd4N4Nzc/QeqLW1bnM7rXuV9tEBhQQ5UoCbJDmWKBAQcMDZNhwRVNCYANBChZYEbkVCZOwASEcCDFQ4SEDIq6WTVqQIMECBx06iCACQQPBiSabHDqzRUTKARMhSFCDrc+WNQIcOoRw5+ZIHj8ADqSEQBQAwKKLhIzowEEeGKQ0owIYkPKjHihZoBKi0KFE01b4zg7h4y4IACH5BAAKAAYALAAAAAAgACAAAAb/QIBwSCwqFIuicklMEgVHQVHKVCYUmWeUWFAkqtOtEKqgAsgFcDFyHJLNmbZa6x2Lyd8595h8C48RagJmQgtHaX5XZUUJeQCGChGEin1SkGlubEhDcYdOAAWEhRlOC12HYUd1eqeRokOKCphgrY5MpotqhgWfunqPt4PCg71gpgXIyWSqqq9MBQPR0tHMzM5L0NPSC8PCxVUCyeLX38+/AFfXRA4HA+pjmoFqCAcHDQa3rbxzBRD1BwgcMFIlidMrAxYICHHA4N8DIqpsUWJ3wAEBChQaEBnQoB6RRr0uARjQocMAAA0w4nMz4IOaU0lImkSngYKFc3ZWyTwJAALGK4fnNA3ZOaQCBQ22wPgRQlSIAYwSfkHJMrQkTyEbKFzFydQq15ccOAjUEwQAIfkEAAoABwAsAAAAACAAIAAABv9AgHBILCoUi6JySUwSBUdBUcpUJhSZZ5RYUCSq060QqqACyAVwMXIcks2ZtlrrHYvJ3zn3mHwLjxFqAmZCC0dpfldlRQl5AIYKEYSKfVKQaW5sSENxh04ABYSFGU4LXYdhR3V6p5GiQ4oKmGCtjkymi2qGBZ+6eo+3g8KDvYLDxKrJuXNkys6qr0zNygvHxL/V1sVD29K/AFfRRQUDDt1PmoFqHgPtBLetvMwG7QMes0KxkkIFIQNKDhBgKvCh3gQiqmxt6NDBAAEIEAgUOHCgBBEH9Yg06uWAIQUABihQMACgBEUHTRwoUEOBIcqQI880OIDgm5ABDA8IgUkSwAAyij1/jejAARPPIQwONBCnBAJDCEOOCnFA8cOvEh1CEJEqBMIBEDaLcA3LJIEGDe/0BAEAIfkEAAoACAAsAAAAACAAIAAABv9AgHBILCoUi6JySUwSBUdBUcpUJhSZZ5RYUCSq060QqqACyAVwMXIcks2ZtlrrHYvJ3zn3mHwLjxFqAmZCC0dpfldlRQl5AIYKEYSKfVKQaW5sSENxh04ABYSFGU4LXYdhR3V6p5GiQ4oKmGCtjkymi2qGBZ+6eo+3g8KDvYLDxKrJuXNkys6qr0zNygvHxL/V1sVDDti/BQccA8yrYBAjHR0jc53LRQYU6R0UBnO4RxmiG/IjJUIJFuoVKeCBigBN5QCk43BgFgMKFCYUGDAgFEUQRGIRYbCh2xACEDcAcHDgQDcQFGf9s7VkA0QCI0t2W0DRw68h8ChAEELSJE8xijBvVqCgIU9PjwA+UNzG5AHEB9xkDpk4QMGvARQsEDlKxMCALDeLcA0rqEEDlWCCAAAh+QQACgAJACwAAAAAIAAgAAAG/0CAcEgsKhSLonJJTBIFR0FRylQmFJlnlFhQJKrTrRCqoALIBXAxchySzZm2Wusdi8nfOfeYfAuPEWoCZkILR2l+V2VFCXkAhgoRhIp9UpBpbmxIQ3GHTgAFhIUZTgtdh2FHdXqnkaJDigqYYK2OTKaLaoYFn7p6j0wOA8PEAw6/Z4PKUhwdzs8dEL9kqqrN0M7SetTVCsLFw8d6C8vKvUQEv+dVCRAaBnNQtkwPFRQUFXOduUoTG/cUNkyYg+tIBlEMAFYYMAaBuCekxmhaJeSeBgiOHhw4QECAAwcCLhGJRUQCg3RDCmyUVmBYmlOiGqmBsPGlyz9YkAlxsJEhqCubABS9AsPgQAMqLQfM0oTMwEZ4QpLOwvMLxAEEXIBG5aczqtaut4YNXRIEACH5BAAKAAoALAAAAAAgACAAAAb/QIBwSCwqFIuicklMEgVHQVHKVCYUmWeUWFAkqtOtEKqgAsgFcDFyHJLNmbZa6x2Lyd8595h8C48RahAQRQtHaX5XZUUJeQAGHR0jA0SKfVKGCmlubEhCBSGRHSQOQwVmQwsZTgtdh0UQHKIHm2quChGophuiJHO3jkwOFB2UaoYFTnMGegDKRQQG0tMGBM1nAtnaABoU3t8UD81kR+UK3eDe4nrk5grR1NLWegva9s9czfhVAgMNpWqgBGNigMGBAwzmxBGjhACEgwcgzAPTqlwGXQ8gMgAhZIGHWm5WjelUZ8jBBgPMTBgwIMGCRgsygVSkgMiHByD7DWDmx5WuMkZqDLCU4gfAq2sACrAEWFSRLjUfWDopCqDTNQIsJ1LF0yzDAA90UHV5eo0qUjB8mgUBACH5BAAKAAsALAAAAAAgACAAAAb/QIBwSCwqFIuickk0FIiCo6A4ZSoZnRBUSiwoEtYipNOBDKOKKgD9DBNHHU4brc4c3cUBeSOk949geEQUZA5rXABHEW4PD0UOZBSHaQAJiEMJgQATFBQVBkQHZKACUwtHbX0RR0mVFp0UFwRCBSQDSgsZrQteqEUPGrAQmmG9ChFqRAkMsBd4xsRLBBsUoG6nBa14E4IA2kUFDuLjDql4peilAA0H7e4H1udH8/Ps7+3xbmj0qOTj5mEWpEP3DUq3glYWOBgAcEmUaNI+DBjwAY+dS0USGJg4wABEXMYyJNvE8UOGISKVCNClah4xjg60WUKyINOCUwrMzVRARMGENWQ4n/jpNTKTm15J/CTK2e0MoD+UKmHEs4onVDVVmyqdpAbNR4cKTjqNSots07EjzzJh1S0IADsAAAAAAAAAAAA=\"\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/ajax-loader.gif?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/fonts/slick.eot":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/fonts/slick.eot ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/slick.ced611da.eot\";\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/fonts/slick.eot?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/fonts/slick.svg":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/fonts/slick.svg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/slick.f97e3bbf.svg\";\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/fonts/slick.svg?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/fonts/slick.ttf":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/fonts/slick.ttf ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/slick.d41f55a7.ttf\";\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/fonts/slick.ttf?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/fonts/slick.woff":
/*!************************************************************!*\
  !*** ./node_modules/slick-carousel/slick/fonts/slick.woff ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/slick.b7c9e1e4.woff\";\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/fonts/slick.woff?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick-theme.css":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick-theme.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar urlEscape = __webpack_require__(/*! ../../css-loader/dist/runtime/url-escape.js */ \"./node_modules/css-loader/dist/runtime/url-escape.js\");\nvar ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./ajax-loader.gif */ \"./node_modules/slick-carousel/slick/ajax-loader.gif\"));\nvar ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./fonts/slick.eot */ \"./node_modules/slick-carousel/slick/fonts/slick.eot\"));\nvar ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./fonts/slick.eot */ \"./node_modules/slick-carousel/slick/fonts/slick.eot\") + \"?#iefix\");\nvar ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ./fonts/slick.woff */ \"./node_modules/slick-carousel/slick/fonts/slick.woff\"));\nvar ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ./fonts/slick.ttf */ \"./node_modules/slick-carousel/slick/fonts/slick.ttf\"));\nvar ___CSS_LOADER_URL___5___ = urlEscape(__webpack_require__(/*! ./fonts/slick.svg */ \"./node_modules/slick-carousel/slick/fonts/slick.svg\") + \"#slick\");\n\n// Module\nexports.push([module.i, \"@charset 'UTF-8';\\n/* Slider */\\n.slick-loading .slick-list\\n{\\n    background: #fff url(\" + ___CSS_LOADER_URL___0___ + \") center center no-repeat;\\n}\\n\\n/* Icons */\\n@font-face\\n{\\n    font-family: 'slick';\\n    font-weight: normal;\\n    font-style: normal;\\n\\n    src: url(\" + ___CSS_LOADER_URL___1___ + \");\\n    src: url(\" + ___CSS_LOADER_URL___2___ + \") format('embedded-opentype'), url(\" + ___CSS_LOADER_URL___3___ + \") format('woff'), url(\" + ___CSS_LOADER_URL___4___ + \") format('truetype'), url(\" + ___CSS_LOADER_URL___5___ + \") format('svg');\\n}\\n/* Arrows */\\n.slick-prev,\\n.slick-next\\n{\\n    font-size: 0;\\n    line-height: 0;\\n\\n    position: absolute;\\n    top: 50%;\\n\\n    display: block;\\n\\n    width: 20px;\\n    height: 20px;\\n    padding: 0;\\n    -webkit-transform: translate(0, -50%);\\n    -ms-transform: translate(0, -50%);\\n    transform: translate(0, -50%);\\n\\n    cursor: pointer;\\n\\n    color: transparent;\\n    border: none;\\n    outline: none;\\n    background: transparent;\\n}\\n.slick-prev:hover,\\n.slick-prev:focus,\\n.slick-next:hover,\\n.slick-next:focus\\n{\\n    color: transparent;\\n    outline: none;\\n    background: transparent;\\n}\\n.slick-prev:hover:before,\\n.slick-prev:focus:before,\\n.slick-next:hover:before,\\n.slick-next:focus:before\\n{\\n    opacity: 1;\\n}\\n.slick-prev.slick-disabled:before,\\n.slick-next.slick-disabled:before\\n{\\n    opacity: .25;\\n}\\n\\n.slick-prev:before,\\n.slick-next:before\\n{\\n    font-family: 'slick';\\n    font-size: 20px;\\n    line-height: 1;\\n\\n    opacity: .75;\\n    color: white;\\n\\n    -webkit-font-smoothing: antialiased;\\n    -moz-osx-font-smoothing: grayscale;\\n}\\n\\n.slick-prev\\n{\\n    left: -25px;\\n}\\n[dir='rtl'] .slick-prev\\n{\\n    right: -25px;\\n    left: auto;\\n}\\n.slick-prev:before\\n{\\n    content: '←';\\n}\\n[dir='rtl'] .slick-prev:before\\n{\\n    content: '→';\\n}\\n\\n.slick-next\\n{\\n    right: -25px;\\n}\\n[dir='rtl'] .slick-next\\n{\\n    right: auto;\\n    left: -25px;\\n}\\n.slick-next:before\\n{\\n    content: '→';\\n}\\n[dir='rtl'] .slick-next:before\\n{\\n    content: '←';\\n}\\n\\n/* Dots */\\n.slick-dotted.slick-slider\\n{\\n    margin-bottom: 30px;\\n}\\n\\n.slick-dots\\n{\\n    position: absolute;\\n    bottom: -25px;\\n\\n    display: block;\\n\\n    width: 100%;\\n    padding: 0;\\n    margin: 0;\\n\\n    list-style: none;\\n\\n    text-align: center;\\n}\\n.slick-dots li\\n{\\n    position: relative;\\n\\n    display: inline-block;\\n\\n    width: 20px;\\n    height: 20px;\\n    margin: 0 5px;\\n    padding: 0;\\n\\n    cursor: pointer;\\n}\\n.slick-dots li button\\n{\\n    font-size: 0;\\n    line-height: 0;\\n\\n    display: block;\\n\\n    width: 20px;\\n    height: 20px;\\n    padding: 5px;\\n\\n    cursor: pointer;\\n\\n    color: transparent;\\n    border: 0;\\n    outline: none;\\n    background: transparent;\\n}\\n.slick-dots li button:hover,\\n.slick-dots li button:focus\\n{\\n    outline: none;\\n}\\n.slick-dots li button:hover:before,\\n.slick-dots li button:focus:before\\n{\\n    opacity: 1;\\n}\\n.slick-dots li button:before\\n{\\n    font-family: 'slick';\\n    font-size: 6px;\\n    line-height: 20px;\\n\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n\\n    width: 20px;\\n    height: 20px;\\n\\n    content: '•';\\n    text-align: center;\\n\\n    opacity: .25;\\n    color: black;\\n\\n    -webkit-font-smoothing: antialiased;\\n    -moz-osx-font-smoothing: grayscale;\\n}\\n.slick-dots li.slick-active button:before\\n{\\n    opacity: .75;\\n    color: black;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/slick-theme.css?");

/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick.css":
/*!*****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Slider */\\n.slick-slider\\n{\\n    position: relative;\\n\\n    display: block;\\n    box-sizing: border-box;\\n\\n    -webkit-user-select: none;\\n       -moz-user-select: none;\\n        -ms-user-select: none;\\n            user-select: none;\\n\\n    -webkit-touch-callout: none;\\n    -khtml-user-select: none;\\n    -ms-touch-action: pan-y;\\n        touch-action: pan-y;\\n    -webkit-tap-highlight-color: transparent;\\n}\\n\\n.slick-list\\n{\\n    position: relative;\\n\\n    display: block;\\n    overflow: hidden;\\n\\n    margin: 0;\\n    padding: 0;\\n}\\n.slick-list:focus\\n{\\n    outline: none;\\n}\\n.slick-list.dragging\\n{\\n    cursor: pointer;\\n    cursor: hand;\\n}\\n\\n.slick-slider .slick-track,\\n.slick-slider .slick-list\\n{\\n    -webkit-transform: translate3d(0, 0, 0);\\n       -moz-transform: translate3d(0, 0, 0);\\n        -ms-transform: translate3d(0, 0, 0);\\n         -o-transform: translate3d(0, 0, 0);\\n            transform: translate3d(0, 0, 0);\\n}\\n\\n.slick-track\\n{\\n    position: relative;\\n    top: 0;\\n    left: 0;\\n\\n    display: block;\\n    margin-left: auto;\\n    margin-right: auto;\\n}\\n.slick-track:before,\\n.slick-track:after\\n{\\n    display: table;\\n\\n    content: '';\\n}\\n.slick-track:after\\n{\\n    clear: both;\\n}\\n.slick-loading .slick-track\\n{\\n    visibility: hidden;\\n}\\n\\n.slick-slide\\n{\\n    display: none;\\n    float: left;\\n\\n    height: 100%;\\n    min-height: 1px;\\n}\\n[dir='rtl'] .slick-slide\\n{\\n    float: right;\\n}\\n.slick-slide img\\n{\\n    display: block;\\n}\\n.slick-slide.slick-loading img\\n{\\n    display: none;\\n}\\n.slick-slide.dragging img\\n{\\n    pointer-events: none;\\n}\\n.slick-initialized .slick-slide\\n{\\n    display: block;\\n}\\n.slick-loading .slick-slide\\n{\\n    visibility: hidden;\\n}\\n.slick-vertical .slick-slide\\n{\\n    display: block;\\n\\n    height: auto;\\n\\n    border: 1px solid transparent;\\n}\\n.slick-arrow.slick-hidden {\\n    display: none;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./node_modules/slick-carousel/slick/slick.css?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n  var unacceptedModules = updatedModules.filter(function (moduleId) {\n    return renewedModules && renewedModules.indexOf(moduleId) < 0;\n  });\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  if (unacceptedModules.length > 0) {\n    log(\"warning\", \"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\");\n    unacceptedModules.forEach(function (moduleId) {\n      log(\"warning\", \"[HMR]  - \" + moduleId);\n    });\n  }\n\n  if (!renewedModules || renewedModules.length === 0) {\n    log(\"info\", \"[HMR] Nothing hot updated.\");\n  } else {\n    log(\"info\", \"[HMR] Updated modules:\");\n    renewedModules.forEach(function (moduleId) {\n      if (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n        var parts = moduleId.split(\"!\");\n        log.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n        log(\"info\", \"[HMR]  - \" + moduleId);\n        log.groupEnd(\"info\");\n      } else {\n        log(\"info\", \"[HMR]  - \" + moduleId);\n      }\n    });\n    var numberIds = renewedModules.every(function (moduleId) {\n      return typeof moduleId === \"number\";\n    });\n    if (numberIds) log(\"info\", \"[HMR] Consider using the NamedModulesPlugin for module names.\");\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n  var shouldLog = logLevel === \"info\" && level === \"info\" || [\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\" || [\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\";\n  return shouldLog;\n}\n\nfunction logGroup(logFn) {\n  return function (level, msg) {\n    if (shouldLog(level)) {\n      logFn(msg);\n    }\n  };\n}\n\nmodule.exports = function (level, msg) {\n  if (shouldLog(level)) {\n    if (level === \"info\") {\n      console.log(msg);\n    } else if (level === \"warning\") {\n      console.warn(msg);\n    } else if (level === \"error\") {\n      console.error(msg);\n    }\n  }\n};\n/* eslint-disable node/no-unsupported-features/node-builtins */\n\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n  logLevel = level;\n};\n\nmodule.exports.formatError = function (err) {\n  var message = err.message;\n  var stack = err.stack;\n\n  if (!stack) {\n    return message;\n  } else if (stack.indexOf(message) < 0) {\n    return message + \"\\n\" + stack;\n  } else {\n    return stack;\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/*globals __resourceQuery */\nif (true) {\n  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  var checkForUpdate = function checkForUpdate(fromUpdate) {\n    if (module.hot.status() === \"idle\") {\n      module.hot.check(true).then(function (updatedModules) {\n        if (!updatedModules) {\n          if (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n          return;\n        }\n\n        __webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n        checkForUpdate(true);\n      }).catch(function (err) {\n        var status = module.hot.status();\n\n        if ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n          log(\"warning\", \"[HMR] Cannot apply update.\");\n          log(\"warning\", \"[HMR] \" + log.formatError(err));\n          log(\"warning\", \"[HMR] You need to restart the application!\");\n        } else {\n          log(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n        }\n      });\n    }\n  };\n\n  setInterval(checkForUpdate, hotPollInterval);\n} else {}\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".App {\\n  text-align: center;\\n}\\n\\n.App-logo {\\n  animation: App-logo-spin infinite 20s linear;\\n  height: 40vmin;\\n  pointer-events: none;\\n}\\n\\n.App-header {\\n  background-color: #282c34;\\n  min-height: 100vh;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: calc(10px + 2vmin);\\n  color: white;\\n}\\n\\n.App-link {\\n  color: #61dafb;\\n}\\n\\n@keyframes App-logo-spin {\\n  from {\\n    transform: rotate(0deg);\\n  }\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/App.css?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.css */ \"./src/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_navbar_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/navbar/navbar */ \"./src/components/navbar/navbar.js\");\n/* harmony import */ var _components_footer_footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/footer/footer */ \"./src/components/footer/footer.js\");\n/* harmony import */ var _components_heroSection_heroSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/heroSection/heroSection */ \"./src/components/heroSection/heroSection.js\");\n/* harmony import */ var _components_homeCategories_homeCategories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/homeCategories/homeCategories */ \"./src/components/homeCategories/homeCategories.js\");\n/* harmony import */ var _client_components_about_about__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./client/components/about/about */ \"./src/client/components/about/about.js\");\n/* harmony import */ var _client_components_contacts_contact__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client/components/contacts/contact */ \"./src/client/components/contacts/contact.js\");\n/* harmony import */ var _client_components_products_products__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client/components/products/products */ \"./src/client/components/products/products.js\");\n/* harmony import */ var _client_components_products_components_singleProduct_singleProduct__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./client/components/products/components/singleProduct/singleProduct */ \"./src/client/components/products/components/singleProduct/singleProduct.js\");\n/* harmony import */ var _client_components_upload_upload__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client/components/upload/upload */ \"./src/client/components/upload/upload.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/App.js\";\n\n\n\n\n\n\n\n\n // import Support from \"./client/components/support/support\";\n\n\n\n\n\nclass App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      width: 0\n    };\n  }\n\n  componentDidMount() {\n    const globalVar = global && global;\n\n    if (global.window) {\n      this.setState({\n        width: globalVar.window.innerWidth\n      });\n    }\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    const globalVar = global && global;\n\n    if (prevState.width !== globalVar.window.innerWidth) {\n      this.setState({\n        width: globalVar.window.innerWidth\n      });\n    }\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"App\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 39\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      render: ({\n        location,\n        history\n      }) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_navbar_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        page: location.pathname,\n        history: history,\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 42\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 40\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 49\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/\",\n      render: props => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 54\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_heroSection_heroSection__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 55\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_homeCategories_homeCategories__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 56\n        },\n        __self: this\n      })),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 50\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/about\",\n      render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_components_about_about__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 63\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 60\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/contact\",\n      render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_components_contacts_contact__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 68\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 65\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/upload\",\n      render: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_components_upload_upload__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 78\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 75\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/products\",\n      render: ({\n        location,\n        history\n      }) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_components_products_products__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        search: location.search,\n        history: history,\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 84\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 80\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/products/:id/:categorie\",\n      render: ({\n        match\n      }) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_client_components_products_components_singleProduct_singleProduct__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n        id: match.params.id,\n        categorie: match.params.categorie,\n        width: this.state.width,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 95\n        },\n        __self: this\n      }),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 91\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Redirect\"], {\n      to: \"/\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 102\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_footer_footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      width: this.state.width,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 104\n      },\n      __self: this\n    }));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/client/components/about/about.css":
/*!***********************************************!*\
  !*** ./src/client/components/about/about.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .aboutImage {\\n    width: 100%;\\n    height: 455px;\\n    margin-top: 90px;\\n    object-fit: contain;\\n  }\\n\\n  .aboutGrid {\\n    display: grid;\\n    margin: 0 auto;\\n    grid-template-columns: 170px 670px;\\n    grid-column-gap: 146px;\\n    text-align: start;\\n    justify-items: center;\\n    justify-content: center;\\n    width: 90%;\\n    margin-top: 47px;\\n    padding-right: 30px;\\n    margin-bottom: 500px;\\n  }\\n\\n  .aboutTextsGrid {\\n    display: grid;\\n    grid-gap: 25px;\\n  }\\n\\n  .aboutTitle {\\n    font-size: 32px;\\n    line-height: 41px;\\n    letter-spacing: 0.1px;\\n    color: #000000;\\n    font-weight: 400;\\n  }\\n\\n  .aboutText {\\n    font-size: 20px;\\n    line-height: 148%;\\n    color: #000000;\\n    max-width: 670px;\\n    hyphens: auto;\\n    letter-spacing: 0.8px;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .aboutImage {\\n    width: 100%;\\n  }\\n\\n  .aboutGrid {\\n    display: grid;\\n    text-align: start;\\n    justify-content: center;\\n    width: 79%;\\n    margin: 0 auto;\\n    margin-bottom: 30px;\\n  }\\n\\n  .aboutTitle {\\n    font-size: 23px;\\n    line-height: 29px;\\n    color: #000000;\\n    margin-top: 35px;\\n    margin-bottom: 23px;\\n  }\\n\\n  .aboutText {\\n    font-size: 15px;\\n    line-height: 148%;\\n    color: #000000;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/about/about.css?");

/***/ }),

/***/ "./src/client/components/about/about.js":
/*!**********************************************!*\
  !*** ./src/client/components/about/about.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return About; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_aboutImage_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/aboutImage.png */ \"./src/client/components/about/assets/aboutImage.png\");\n/* harmony import */ var _assets_aboutImage_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_aboutImage_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_aboutImageMobile_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/aboutImageMobile.png */ \"./src/client/components/about/assets/aboutImageMobile.png\");\n/* harmony import */ var _assets_aboutImageMobile_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_aboutImageMobile_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about.css */ \"./src/client/components/about/about.css\");\n/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_about_css__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/about/about.js\";\n\n\n\n\nclass About extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  componentDidMount() {\n    window.scrollTo(0, 0);\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: this.props.width < 768 ? _assets_aboutImageMobile_png__WEBPACK_IMPORTED_MODULE_2___default.a : _assets_aboutImage_png__WEBPACK_IMPORTED_MODULE_1___default.a,\n      className: \"aboutImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 15\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutGrid\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 20\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 21\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 22\n      },\n      __self: this\n    }, \"ABOUT US \")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutTextsGrid\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 24\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutText\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 25\n      },\n      __self: this\n    }, \"Founded in Austin, Texas through a partnership in excellence of two industry leaders; Lumartex specializes in education and corporate office environments. We strive to not only sell off-the-shelf products but to also provide custom products that solve real world problems through customer feedback and requests. Products like educational audio visual carts that fit into today\\u2019s flexible classroom environments. Also, ergonomic office products like our height adjustable monitor arms and sit and stand desks that promote an environment focused on employee health and productivity.\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 37\n      },\n      __self: this\n    }, \"MISSION\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"aboutText\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 38\n      },\n      __self: this\n    }, \"Lumartex was founded with a clear mission and understanding from day one. Dedication to improve the classroom and office environment for all users. Do more and achieve more!\"))));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/about/about.js?");

/***/ }),

/***/ "./src/client/components/about/assets/aboutImage.png":
/*!***********************************************************!*\
  !*** ./src/client/components/about/assets/aboutImage.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/aboutImage.ada8ea17.png\";\n\n//# sourceURL=webpack:///./src/client/components/about/assets/aboutImage.png?");

/***/ }),

/***/ "./src/client/components/about/assets/aboutImageMobile.png":
/*!*****************************************************************!*\
  !*** ./src/client/components/about/assets/aboutImageMobile.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/aboutImageMobile.c565f021.png\";\n\n//# sourceURL=webpack:///./src/client/components/about/assets/aboutImageMobile.png?");

/***/ }),

/***/ "./src/client/components/contacts/contact.css":
/*!****************************************************!*\
  !*** ./src/client/components/contacts/contact.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .aboutIframe {\\n    margin-top: 90px;\\n    width: 100%;\\n    height: 330.42px;\\n  }\\n\\n  .contactGrid {\\n    display: grid;\\n    grid-template-columns: 250px 690px;\\n    margin-left: 122px;\\n    margin-top: 55px;\\n    grid-gap: 156px;\\n    margin-bottom: 189px;\\n  }\\n\\n  .contactGridDescription {\\n    display: grid;\\n    grid-template-rows: 56px 165px;\\n    text-align: start;\\n    padding-top: 3px;\\n  }\\n\\n  .contactTitle {\\n    font-size: 33px;\\n    font-weight: 300;\\n    line-height: 41px;\\n    color: #000000;\\n    letter-spacing: -3px;\\n  }\\n\\n  .contactInfo {\\n    font-size: 20px;\\n    line-height: 30px;\\n    color: #000000;\\n    padding-top: 26px;\\n  }\\n\\n  .contactSubInfo {\\n    color: black;\\n    margin-bottom: 30px;\\n    display: block;\\n    text-decoration: none;\\n  }\\n\\n  .contactGridForm {\\n    display: grid;\\n    grid-template-rows: 56px 165px 56px;\\n    grid-gap: 21px;\\n  }\\n\\n  .contactGridForm textarea {\\n    padding-top: 16px;\\n  }\\n\\n  .contactInput {\\n    border: 1px solid #3f69ff;\\n    box-sizing: border-box;\\n    border-radius: 8px;\\n    height: 100%;\\n    width: 100%;\\n    font-size: 16px;\\n    line-height: 148.5%;\\n    padding-left: 16px;\\n    outline: none;\\n  }\\n\\n  .contactInputsContainer {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    grid-gap: 24px;\\n  }\\n\\n  .contactButton {\\n    float: right;\\n    width: 117px;\\n    height: 56px;\\n    background: #6788ff;\\n    border-radius: 4px;\\n    font-size: 15px;\\n    font-weight: 500;\\n    line-height: 19px;\\n    display: flex;\\n    justify-content: center;\\n    justify-self: flex-end;\\n    align-items: center;\\n    text-align: center;\\n    color: #ffffff;\\n    border: none;\\n    cursor: pointer;\\n    outline: none;\\n    text-transform: uppercase;\\n  }\\n}\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .aboutIframe {\\n    width: 100%;\\n    height: 330px;\\n  }\\n\\n  .contactGrid {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    width: 85%;\\n    margin: 0 auto;\\n    margin-top: 29px;\\n  }\\n\\n  .contactTitle {\\n    font-size: 24px;\\n    line-height: 29px;\\n    color: #000000;\\n    text-align: start;\\n    margin-bottom: 24px;\\n    letter-spacing: -2px;\\n  }\\n  .contactInfo {\\n    margin-top: 54px;\\n    margin-bottom: 50px;\\n  }\\n  .contactSubInfo {\\n    font-size: 16px;\\n    line-height: 230%;\\n    color: #000000;\\n    text-align: start;\\n    text-decoration: none;\\n    display: block;\\n  }\\n  .contactGridForm {\\n    display: grid;\\n    grid-template-rows: 122px 220px 53px;\\n    grid-gap: 16px;\\n  }\\n\\n  .contactGridForm textarea {\\n    padding-top: 16px;\\n  }\\n\\n  .contactInput {\\n    border: 1px solid #3f69ff;\\n    box-sizing: border-box;\\n    border-radius: 8px;\\n    height: 100%;\\n    width: 100%;\\n    font-size: 14px;\\n    line-height: 17px;\\n    color: #000000;\\n    opacity: 0.5;\\n    outline: none;\\n    padding-left: 16px;\\n  }\\n\\n  .contactInputsContainer {\\n    display: grid;\\n    grid-template-rows: 53px 53px;\\n    grid-gap: 16px;\\n  }\\n\\n  .contactButton {\\n    float: right;\\n    width: 96px;\\n    height: 48px;\\n    background: #6788ff;\\n    border-radius: 4px;\\n    font-size: 15px;\\n    font-weight: 500;\\n    line-height: 19px;\\n    display: flex;\\n    justify-content: center;\\n    justify-self: flex-end;\\n    align-items: center;\\n    text-align: center;\\n    color: #ffffff;\\n    border: none;\\n    cursor: pointer;\\n    outline: none;\\n    text-transform: uppercase;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/contacts/contact.css?");

/***/ }),

/***/ "./src/client/components/contacts/contact.js":
/*!***************************************************!*\
  !*** ./src/client/components/contacts/contact.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contact_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact.css */ \"./src/client/components/contacts/contact.css\");\n/* harmony import */ var _contact_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_contact_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/contacts/contact.js\";\n\n\n\n\n\nclass Contact extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      name: \"\",\n      email: \"\",\n      text: \"\",\n      error: false\n    };\n    this.handleChange = this.handleChange.bind(this);\n    this.handleSubmit = this.handleSubmit.bind(this);\n  }\n\n  validarEmail(email) {\n    return /(^[0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test(email);\n  }\n\n  handleChange(e) {\n    e.preventDefault();\n    this.setState({\n      [e.target.name]: e.target.value\n    });\n  }\n\n  handleSubmit(e) {\n    e.preventDefault();\n    const _this$state = this.state,\n          name = _this$state.name,\n          email = _this$state.email,\n          text = _this$state.text;\n\n    if (name && text && this.validarEmail(email)) {\n      return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(\"\".concat(this.props.apiUrl, \"/api/email/contact\"), this.state);\n    } else {\n      this.setState({\n        error: true\n      });\n    }\n  }\n\n  componentDidMount() {\n    window.scrollTo(0, 0);\n  }\n\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 48\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iframe\", {\n      className: \"aboutIframe\",\n      title: \"iframe\",\n      src: \"https://maps.google.com/?ll=30.274363,-97.8032097&z=17&t=m&output=embed\",\n      frameBorder: \"0\",\n      allowFullScreen: true,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 49\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactGrid\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 56\n      },\n      __self: this\n    }, this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 58\n      },\n      __self: this\n    }, \"CONTACT US\") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactGridDescription\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 60\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 61\n      },\n      __self: this\n    }, \"CONTACT US\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    }, \"Address\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 64\n      },\n      __self: this\n    }, \"Telephone\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 65\n      },\n      __self: this\n    }, \"Email\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactGridForm\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 69\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactInputsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 70\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      className: \"contactInput\",\n      type: \"text\",\n      name: \"name\",\n      placeholder: \"Name\",\n      onChange: this.handleChange,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 71\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      className: \"contactInput\",\n      type: \"email\",\n      name: \"email\",\n      placeholder: \"Email\",\n      onChange: this.handleChange,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n      className: \"contactInput\",\n      type: \"text\",\n      name: \"text\",\n      placeholder: \"Your message\",\n      onChange: this.handleChange,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 86\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"contactButton\",\n      onClick: this.handleSubmit,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 93\n      },\n      __self: this\n    }, \"send\")), this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 98\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99\n      },\n      __self: this\n    }, \"Address\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 100\n      },\n      __self: this\n    }, \"Telephone\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"contactSubInfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 101\n      },\n      __self: this\n    }, \"Email\")) : null));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, null)(Contact));\n\n//# sourceURL=webpack:///./src/client/components/contacts/contact.js?");

/***/ }),

/***/ "./src/client/components/products/components/categorybar/categoryBar.css":
/*!*******************************************************************************!*\
  !*** ./src/client/components/products/components/categorybar/categoryBar.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .pathContainer {\\n    border: 1px solid #3f69ff;\\n    box-sizing: border-box;\\n    border-radius: 40px;\\n    padding: 8.5px 21.5px;\\n    float: left;\\n    display: flex;\\n    align-items: center;\\n    margin-right: 15px;\\n    text-align: start;\\n    outline: none;\\n    user-select: none;\\n    margin-bottom: 26px;\\n  }\\n\\n  .pathName {\\n    float: left;\\n    user-select: none;\\n  }\\n\\n  .pathClose {\\n    float: right;\\n    margin-left: 45px;\\n    cursor: pointer;\\n    user-select: none;\\n  }\\n\\n  .noneProducts {\\n    font-size: 22px;\\n    text-align: start;\\n    text-transform: uppercase;\\n    font-weight: 300;\\n    margin-top: 15px;\\n    margin-bottom: 20px;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .categoryBarContainer {\\n    position: unset;\\n    display: inline-block;\\n    width: 90%;\\n    margin: 0 auto;\\n  }\\n  .pathContainer {\\n    border: 1px solid #3f69ff;\\n    box-sizing: border-box;\\n    border-radius: 40px;\\n    padding: 6.5px 15.5px;\\n    float: left;\\n    display: flex;\\n    align-items: center;\\n    margin-right: 15px;\\n    text-align: start;\\n    outline: none;\\n    user-select: none;\\n    margin-bottom: 20px;\\n  }\\n\\n  .pathName {\\n    float: left;\\n    user-select: none;\\n    font-size: 12px;\\n    line-height: 230%;\\n    color: #000000;\\n  }\\n\\n  .pathClose {\\n    float: right;\\n    margin-left: 20px;\\n    width: 20px;\\n    height: 20px;\\n    cursor: pointer;\\n    user-select: none;\\n  }\\n\\n  .noneProducts {\\n    font-size: 16px;\\n    text-align: center;\\n    text-transform: uppercase;\\n    font-weight: 300;\\n    margin-top: 15px;\\n    margin-bottom: 20px;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/categorybar/categoryBar.css?");

/***/ }),

/***/ "./src/client/components/products/components/categorybar/categoryBar.js":
/*!******************************************************************************!*\
  !*** ./src/client/components/products/components/categorybar/categoryBar.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CategoryBar; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _categoryBar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categoryBar.css */ \"./src/client/components/products/components/categorybar/categoryBar.css\");\n/* harmony import */ var _categoryBar_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_categoryBar_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_close_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/close.svg */ \"./src/client/components/products/components/categorybar/components/close.svg\");\n/* harmony import */ var _components_close_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_close_svg__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/categorybar/categoryBar.js\";\n\n\n\nclass CategoryBar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  handleClick(search, categorie, history) {\n    const path = decodeURI(search);\n    const newPath = path.slice(0, path.indexOf(categorie) - 1);\n    history.push(\"/products\".concat(newPath));\n  }\n\n  render() {\n    const _this$props = this.props,\n          path = _this$props.path,\n          history = _this$props.history;\n    const categories = path && decodeURI(path.slice(1));\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoryBarContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17\n      },\n      __self: this\n    }, categories ? categories.split(\";\").map(category => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"pathContainer\",\n        key: category,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 21\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"pathName\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 22\n        },\n        __self: this\n      }, category), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: _components_close_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n        alt: \"\",\n        className: \"pathClose\",\n        onClick: () => this.handleClick(path, category, history),\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 23\n        },\n        __self: this\n      }));\n    }) : null);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/categorybar/categoryBar.js?");

/***/ }),

/***/ "./src/client/components/products/components/categorybar/components/close.svg":
/*!************************************************************************************!*\
  !*** ./src/client/components/products/components/categorybar/components/close.svg ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/close.4740a114.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/categorybar/components/close.svg?");

/***/ }),

/***/ "./src/client/components/products/components/filters/assets/close.svg":
/*!****************************************************************************!*\
  !*** ./src/client/components/products/components/filters/assets/close.svg ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/close.3b3fed80.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/filters/assets/close.svg?");

/***/ }),

/***/ "./src/client/components/products/components/filters/assets/filterIcon.svg":
/*!*********************************************************************************!*\
  !*** ./src/client/components/products/components/filters/assets/filterIcon.svg ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/filterIcon.99cd02c1.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/filters/assets/filterIcon.svg?");

/***/ }),

/***/ "./src/client/components/products/components/filters/filters.css":
/*!***********************************************************************!*\
  !*** ./src/client/components/products/components/filters/filters.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".filtersContainer {\\n  height: 51px;\\n  background: rgba(103, 136, 255, 0.08);\\n  padding: 0 25px;\\n  margin-bottom: 11px;\\n  position: relative;\\n}\\n.handlerFilters {\\n  display: flex;\\n  height: 100%;\\n  justify-content: space-between;\\n  align-content: center;\\n}\\n\\n.filterTitle {\\n  font-size: 12px;\\n  line-height: 14px;\\n  display: flex;\\n  align-items: center;\\n  letter-spacing: 0.08em;\\n  text-transform: uppercase;\\n  color: #6788ff;\\n  border-radius: 20px;\\n}\\n\\n.filterClose{\\n  position: absolute;\\n  right: 20px;\\n  top: 10px;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/filters/filters.css?");

/***/ }),

/***/ "./src/client/components/products/components/filters/filters.js":
/*!**********************************************************************!*\
  !*** ./src/client/components/products/components/filters/filters.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Filters; });\n/* harmony import */ var _filters_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filters.css */ \"./src/client/components/products/components/filters/filters.css\");\n/* harmony import */ var _filters_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_filters_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_filterIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/filterIcon.svg */ \"./src/client/components/products/components/filters/assets/filterIcon.svg\");\n/* harmony import */ var _assets_filterIcon_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_filterIcon_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/close.svg */ \"./src/client/components/products/components/filters/assets/close.svg\");\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_close_svg__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/filters/filters.js\";\n\n\n\n\nclass Filters extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      path: \"\"\n    };\n    this.handleOpenLocal = this.handleOpenLocal.bind(this);\n  }\n\n  componentDidMount() {\n    this.setState({\n      path: this.props.search\n    });\n  }\n\n  handleOpenLocal() {\n    if (this.state.path === this.props.search) {\n      this.props.handleOpen();\n    } else {\n      this.props.history.push(\"/products\".concat(this.state.path));\n      this.props.handleOpen();\n    }\n  }\n\n  render() {\n    const open = this.props.open;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"filtersContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 30\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"handlerFilters\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 31\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"filterTitle\",\n      onClick: this.handleOpenLocal,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 32\n      },\n      __self: this\n    }, \"Filters\"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: open ? _assets_close_svg__WEBPACK_IMPORTED_MODULE_3___default.a : _assets_filterIcon_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n      className: open ? \"filterClose\" : \"filterIcon\",\n      onClick: this.handleOpenLocal,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 35\n      },\n      __self: this\n    })));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/filters/filters.js?");

/***/ }),

/***/ "./src/client/components/products/components/gridProducts/assets/arrow.svg":
/*!*********************************************************************************!*\
  !*** ./src/client/components/products/components/gridProducts/assets/arrow.svg ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrow.f4640736.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/gridProducts/assets/arrow.svg?");

/***/ }),

/***/ "./src/client/components/products/components/gridProducts/gridProducts.css":
/*!*********************************************************************************!*\
  !*** ./src/client/components/products/components/gridProducts/gridProducts.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .gridProductsContainer {\\n    display: grid;\\n    width: 100%;\\n    grid-template-columns: 1fr 1fr 1fr;\\n    justify-items: center;\\n  }\\n\\n  .product {\\n    height: 377px;\\n    width: 281px;\\n    background: #ffffff;\\n    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.04);\\n    margin-top: 24px;\\n    position: relative;\\n  }\\n\\n  .product:hover {\\n    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);\\n  }\\n\\n  .productImage {\\n    width: 100%;\\n    margin-top: 8px;\\n    height: 163px;\\n    object-fit: contain;\\n  }\\n\\n  .productName {\\n    font-size: 14px;\\n    padding-left: 24px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    margin-top: 18px;\\n    text-align: start;\\n    color: #303030;\\n  }\\n\\n  .productDescription {\\n    font-size: 21px;\\n    line-height: 29px;\\n    text-align: start;\\n    font-weight: 300;\\n    padding-left: 24px;\\n    margin-top: 16px;\\n    width: 80%;\\n    color: #303030;\\n    height: 74px;\\n  }\\n  .productDescription::first-letter {\\n    text-transform: uppercase;\\n  }\\n\\n  .productLink {\\n    font-size: 14px;\\n    line-height: 17px;\\n    display: flex;\\n    align-items: center;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    text-decoration: none;\\n    padding-left: 24px;\\n    margin-top: 32px;\\n    position: absolute;\\n    bottom: 20px;\\n  }\\n\\n  .productLink:hover {\\n    text-decoration-line: underline;\\n  }\\n\\n  .indexContainer {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: center;\\n    align-content: center;\\n    margin-top: 30px;\\n    margin-bottom: 30px;\\n  }\\n\\n  .activeIndex {\\n    font-size: 16px;\\n    line-height: 149.5%;\\n    text-align: center;\\n    color: #3f69ff;\\n    cursor: pointer;\\n    margin: 0 3px;\\n  }\\n\\n  .disableIndex {\\n    font-size: 16px;\\n    cursor: pointer;\\n    line-height: 149.5%;\\n    text-align: center;\\n    color: #303030;\\n    margin: 0 3px;\\n  }\\n\\n  .arrowRightIndex {\\n    transform: rotate(180deg);\\n    cursor: pointer;\\n    margin-left: 30px;\\n  }\\n\\n  .arrowLeftIndex {\\n    cursor: pointer;\\n    margin-right: 30px;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .gridProductsContainer {\\n    display: grid;\\n    width: 100%;\\n    grid-template-columns: 1fr 1fr;\\n    justify-items: center;\\n  }\\n\\n  .product {\\n    width: 128px;\\n    height: 207px;\\n    margin: 0 auto;\\n    background: #ffffff;\\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.04);\\n    margin-top: 24px;\\n    position: relative;\\n  }\\n\\n  .product:hover {\\n    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);\\n  }\\n\\n  .productImage {\\n    width: 100%;\\n    margin-top: 8px;\\n    height: 75px;\\n    object-fit: contain;\\n  }\\n\\n  .productName {\\n    font-size: 11px;\\n    line-height: 14px;\\n    letter-spacing: 0.08em;\\n    color: #303030;\\n    text-transform: uppercase;\\n    text-align: start;\\n    padding-left: 8px;\\n    margin-top: 8px;\\n  }\\n\\n  .productDescription {\\n    font-size: 13px;\\n    line-height: 19px;\\n    font-weight: 300;\\n    width: 93%;\\n    height: 45px;\\n    word-break: break-all;\\n    color: #303030;\\n    text-align: start;\\n    padding-left: 8px;\\n    margin-top: 5px;\\n  }\\n\\n  .productLink {\\n    font-size: 12px;\\n    line-height: 14px;\\n    display: flex;\\n    align-items: center;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    text-decoration: none;\\n    padding-left: 8px;\\n    position: absolute;\\n    bottom: 4px;\\n  }\\n\\n  .productLink:hover {\\n    text-decoration-line: underline;\\n  }\\n\\n  .indexContainer {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: center;\\n    align-content: center;\\n    margin-top: 30px;\\n    margin-bottom: 30px;\\n  }\\n\\n  .activeIndex {\\n    font-size: 16px;\\n    line-height: 149.5%;\\n    text-align: center;\\n    color: #3f69ff;\\n    cursor: pointer;\\n    margin: 0 3px;\\n  }\\n\\n  .disableIndex {\\n    font-size: 16px;\\n    cursor: pointer;\\n    line-height: 149.5%;\\n    text-align: center;\\n    color: #303030;\\n    margin: 0 3px;\\n  }\\n\\n  .arrowRightIndex {\\n    transform: rotate(180deg);\\n    cursor: pointer;\\n    margin-left: 30px;\\n  }\\n\\n  .arrowLeftIndex {\\n    cursor: pointer;\\n    margin-right: 30px;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/gridProducts/gridProducts.css?");

/***/ }),

/***/ "./src/client/components/products/components/gridProducts/gridProducts.js":
/*!********************************************************************************!*\
  !*** ./src/client/components/products/components/gridProducts/gridProducts.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _gridProducts_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gridProducts.css */ \"./src/client/components/products/components/gridProducts/gridProducts.css\");\n/* harmony import */ var _gridProducts_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gridProducts_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/arrow.svg */ \"./src/client/components/products/components/gridProducts/assets/arrow.svg\");\n/* harmony import */ var _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_arrow_svg__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/gridProducts/gridProducts.js\";\n\n\n\n\n\n\nclass GridProducts extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.showIndexs = total => {\n      const result = [];\n\n      for (let i = 1; i <= total; i++) {\n        result.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: this.state.actualIndex === i ? \"activeIndex\" : \"disableIndex\",\n          onClick: e => this.handleClick(e, i),\n          key: i,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 63\n          },\n          __self: this\n        }, i));\n      }\n\n      return result;\n    };\n\n    this.prevIndex = () => {\n      if (this.state.actualIndex > 1) {\n        this.setState(({\n          actualIndex\n        }) => ({\n          actualIndex: actualIndex - 1\n        }));\n      }\n    };\n\n    this.nextIndex = () => {\n      if (this.state.actualIndex !== this.state.totalIndex) {\n        this.setState(({\n          actualIndex\n        }) => ({\n          actualIndex: actualIndex + 1\n        }));\n      }\n    };\n\n    this.handleClick = (e, actualIndex) => {\n      e.preventDefault();\n      this.setState({\n        actualIndex\n      });\n    };\n\n    this.state = {\n      actualIndex: 1,\n      totalIndex: 0,\n      productsToShow: []\n    };\n  }\n\n  componentDidMount() {\n    const actualIndex = this.state.actualIndex;\n    this.setState({\n      totalIndex: Math.ceil(this.props.products.length / 9)\n    });\n    let initIndex = 0;\n\n    if (actualIndex !== 1) {\n      initIndex = actualIndex * 9 - 9;\n    }\n\n    this.setState({\n      productsToShow: this.props.products.slice(initIndex, actualIndex * 9)\n    });\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    const _this$state = this.state,\n          actualIndex = _this$state.actualIndex,\n          totalIndex = _this$state.totalIndex;\n    let numOfProducts = this.props.width < 768 ? 8 : 9;\n    let initIndex = 0;\n\n    if (actualIndex !== 1) {\n      initIndex = actualIndex * numOfProducts - numOfProducts;\n    }\n\n    if (prevProps.products.length !== this.props.products.length) {\n      this.setState({\n        totalIndex: Math.ceil(this.props.products.length / numOfProducts),\n        productsToShow: this.props.products.slice(initIndex, actualIndex * numOfProducts),\n        actualIndex: 1\n      });\n    }\n\n    if (prevState.totalIndex !== totalIndex || prevState.actualIndex !== actualIndex) {\n      this.setState({\n        productsToShow: this.props.products.slice(initIndex, actualIndex * numOfProducts)\n      });\n    }\n  }\n\n  render() {\n    const products = this.props.products;\n    const _this$state2 = this.state,\n          productsToShow = _this$state2.productsToShow,\n          totalIndex = _this$state2.totalIndex;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 98\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"gridProductsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99\n      },\n      __self: this\n    }, products && productsToShow && productsToShow.map(product => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"product\",\n      key: product._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 103\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: \"\".concat(this.props.apiUrl + product.images[0]),\n      alt: \"\",\n      className: \"productImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 104\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 110\n      },\n      __self: this\n    }, product.partNumber), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productDescription\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 111\n      },\n      __self: this\n    }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products/\".concat(product._id, \"/\").concat(product.categories[0] === \"Tv Carts/Stands\" ? \"Tv Carts-Stands\" : product.categories[0]),\n      className: \"productLink\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 112\n      },\n      __self: this\n    }, \"view more \\u2192\")))), totalIndex > 1 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"indexContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 126\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_4___default.a,\n      alt: \"\",\n      className: \"arrowLeftIndex\",\n      onClick: this.prevIndex,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 127\n      },\n      __self: this\n    }), totalIndex ? this.showIndexs(totalIndex) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_4___default.a,\n      alt: \"\",\n      className: \"arrowRightIndex\",\n      onClick: this.nextIndex,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 134\n      },\n      __self: this\n    })) : null);\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, null)(GridProducts));\n\n//# sourceURL=webpack:///./src/client/components/products/components/gridProducts/gridProducts.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/assets/categorieSelectOption.svg":
/*!********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/assets/categorieSelectOption.svg ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/categorieSelectOption.ed0a4b14.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/assets/categorieSelectOption.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/assets/categorieSelected.svg":
/*!****************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/assets/categorieSelected.svg ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/categorieSelected.8498c268.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/assets/categorieSelected.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/assets/singleCategorieOption.svg":
/*!********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/assets/singleCategorieOption.svg ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/singleCategorieOption.db648379.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/assets/singleCategorieOption.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/assets/singleCategorieSelected.svg":
/*!**********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/assets/singleCategorieSelected.svg ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/singleCategorieSelected.2a37ec13.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/assets/singleCategorieSelected.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/categorie/categorie.css":
/*!**********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/categorie/categorie.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".categorieContainer {\\n  margin-bottom: 16px;\\n}\\n.categorie {\\n  width: 180px;\\n  overflow-wrap: break-word;\\n  display: flex;\\n  align-items: flex-start;\\n}\\n\\n.categoriaOption {\\n  position: inherit;\\n  margin-right: 16px;\\n  cursor: pointer;\\n  margin-top: 3px;\\n}\\n\\n.categorieName {\\n  font-size: 16px;\\n  line-height: 160%;\\n  cursor: pointer;\\n  color: #000000;\\n  text-decoration: none;\\n  user-select: none;\\n}\\n\\n.childrenCategorie {\\n  padding-left: 33px;\\n  margin-top: 10px\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/categorie/categorie.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/categorie/categorie.js":
/*!*********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/categorie/categorie.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Categorie; });\n/* harmony import */ var _categorie_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorie.css */ \"./src/client/components/products/components/sidebar/components/categorie/categorie.css\");\n/* harmony import */ var _categorie_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_categorie_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/categorieSelectOption.svg */ \"./src/client/components/products/components/sidebar/assets/categorieSelectOption.svg\");\n/* harmony import */ var _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/categorieSelected.svg */ \"./src/client/components/products/components/sidebar/assets/categorieSelected.svg\");\n/* harmony import */ var _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _categoriesWhitTitle_categoriesWhitTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../categoriesWhitTitle/categoriesWhitTitle */ \"./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.js\");\n/* harmony import */ var _selectionableCategorie_selectionableCategorie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../selectionableCategorie/selectionableCategorie */ \"./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebar/components/categorie/categorie.js\";\n\n\n\n\n\n\nclass Categorie extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.compareUrlWithNameCategorie = (url, name) => {\n      if (decodeURI(url).includes(name)) {\n        this.setState({\n          open: true\n        });\n      } else {\n        this.setState({\n          open: false\n        });\n      }\n    };\n\n    this.state = {\n      open: false\n    };\n    this.showChildrens = this.showChildrens.bind(this);\n    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(this);\n  }\n\n  componentDidMount() {\n    const _this$props = this.props,\n          categorie = _this$props.categorie,\n          search = _this$props.search;\n    this.compareUrlWithNameCategorie(search, categorie.name);\n  }\n\n  componentDidUpdate(prevProps) {\n    const _this$props2 = this.props,\n          categorie = _this$props2.categorie,\n          search = _this$props2.search;\n\n    if (prevProps.search !== search) {\n      this.compareUrlWithNameCategorie(search, categorie.name);\n    }\n  }\n\n  showChildrens(childrens, open) {\n    if (!open) return;\n    return childrens.map((children, i) => {\n      if (children.type === \"title and categories\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_categoriesWhitTitle_categoriesWhitTitle__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n          categorie: children,\n          showChildrens: this.showChildrens,\n          key: i,\n          history: this.props.history,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 46\n          },\n          __self: this\n        });\n      } else if (children.type === \"selectionable categorie\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_selectionableCategorie_selectionableCategorie__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          categorie: children,\n          key: i,\n          history: this.props.history,\n          search: this.props.search,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 55\n          },\n          __self: this\n        });\n      } else if (children.type === \"categorie\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Categorie, {\n          categorie: children,\n          key: i,\n          history: this.props.history,\n          search: this.props.search,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 64\n          },\n          __self: this\n        });\n      }\n\n      return null;\n    });\n  }\n\n  handleClick(categorie, history, search, e) {\n    e.stopPropagation();\n    e.preventDefault();\n\n    if (this.state.open) {\n      const path = decodeURI(search);\n      const newPath = path.slice(0, path.indexOf(categorie.name) - 1);\n      history.push(\"/products\".concat(newPath));\n      this.setState({\n        open: false\n      });\n    } else {\n      this.setState(({\n        open\n      }) => ({\n        open: !open\n      }), () => {\n        history.push(\"/products?\".concat(categorie.url));\n      });\n    }\n  }\n\n  render() {\n    const _this$props3 = this.props,\n          categorie = _this$props3.categorie,\n          history = _this$props3.history,\n          search = _this$props3.search;\n    const open = this.state.open;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorieContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 98\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorie\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: open ? _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3___default.a : _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n      className: \"categoriaOption\",\n      onClick: e => this.handleClick(categorie, history, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 100\n      },\n      __self: this\n    }), categorie && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorieName\",\n      onClick: e => this.handleClick(categorie, history, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 107\n      },\n      __self: this\n    }, categorie.name)), categorie.categories ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"childrenCategorie\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 116\n      },\n      __self: this\n    }, this.showChildrens(categorie.categories, open)) : null);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/categorie/categorie.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.css":
/*!******************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".childrenTitle {\\n  font-size: 13px;\\n  line-height: 170%;\\n  display: flex;\\n  font-weight: 600;\\n  align-items: center;\\n  color: #000000;\\n}\\n\\n.categoriesWhitTitleContainer {\\n  margin-bottom: 15px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.js":
/*!*****************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CategoriesWhitTitle; });\n/* harmony import */ var _categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categoriesWhitTitle.css */ \"./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.css\");\n/* harmony import */ var _categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.js\";\n\n\nclass CategoriesWhitTitle extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  render() {\n    const _this$props = this.props,\n          categorie = _this$props.categorie,\n          showChildrens = _this$props.showChildrens;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categoriesWhitTitleContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 9\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"childrenTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 10\n      },\n      __self: this\n    }, categorie.title), categorie.categories ? showChildrens(categorie.categories, true, \"akjefhbkjefb\") : categorie.name);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/categoriesWhitTitle/categoriesWhitTitle.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.css":
/*!************************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".selectionableTitle {\\n  font-size: 12px;\\n  line-height: 200%;\\n  display: flex;\\n  align-items: center;\\n  color: #000000;\\n  cursor: pointer;\\n}\\n.selectionableCategorieContainer {\\n  display: flex;\\n  align-items: flex-start;\\n  user-select: none;\\n}\\n.selectionableOption {\\n  margin-top: 5px;\\n  margin-right: 8px;\\n  cursor: pointer;\\n  width: 12px;\\n  height: 12px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.js":
/*!***********************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SelectionableCategorie; });\n/* harmony import */ var _selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectionableCategorie.css */ \"./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.css\");\n/* harmony import */ var _selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/singleCategorieSelected.svg */ \"./src/client/components/products/components/sidebar/assets/singleCategorieSelected.svg\");\n/* harmony import */ var _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/singleCategorieOption.svg */ \"./src/client/components/products/components/sidebar/assets/singleCategorieOption.svg\");\n/* harmony import */ var _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.js\";\n\n\n\n\nclass SelectionableCategorie extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.compareUrlWithNameCategorie = (url, name) => {\n      if (decodeURI(url).includes(name)) {\n        this.setState({\n          selected: true\n        });\n      } else {\n        this.setState({\n          selected: false\n        });\n      }\n    };\n\n    this.state = {\n      selected: false\n    };\n    this.handleClick = this.handleClick.bind(this);\n    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(this);\n  }\n\n  componentDidMount() {\n    const _this$props = this.props,\n          search = _this$props.search,\n          categorie = _this$props.categorie;\n    this.compareUrlWithNameCategorie(search, categorie.name);\n  }\n\n  componentDidUpdate(prevProps) {\n    const _this$props2 = this.props,\n          search = _this$props2.search,\n          categorie = _this$props2.categorie;\n\n    if (search !== prevProps.search) {\n      this.compareUrlWithNameCategorie(search, categorie.name);\n    }\n  }\n\n  handleClick(history, categorie, search, e) {\n    e.preventDefault();\n    e.stopPropagation();\n\n    if (this.state.selected) {\n      const path = decodeURI(search);\n      const newPath = path.replace(\";\".concat(categorie.name), \"\");\n      history.push(\"/products\".concat(newPath));\n      this.setState({\n        selected: false\n      });\n    } else {\n      this.setState(({\n        selected\n      }) => ({\n        selected: !selected\n      }), () => {\n        history.push(\"/products\".concat(search + \";\" + categorie.name));\n      });\n    }\n  }\n\n  render() {\n    const selected = this.state.selected;\n    const _this$props3 = this.props,\n          categorie = _this$props3.categorie,\n          history = _this$props3.history,\n          search = _this$props3.search;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"selectionableCategorieContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: selected ? _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2___default.a : _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3___default.a,\n      className: \"selectionableOption\",\n      onClick: e => this.handleClick(history, categorie, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"selectionableTitle\",\n      onClick: e => this.handleClick(history, categorie, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 69\n      },\n      __self: this\n    }, categorie.name));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/components/selectionableCategorie/selectionableCategorie.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/sidebar.css":
/*!***********************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/sidebar.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".sidebarContainer {\\n  background-color: rgba(103, 136, 255, 0.05);\\n  padding-top: 48px;\\n  padding-bottom: 48px;\\n  padding-left: 24px;\\n  text-align: start;\\n  user-select: none;\\n}\\n\\n.sidebarTitle {\\n  font-size: 24px;\\n  line-height: 29px;\\n  color: #000000;\\n  text-transform: uppercase;\\n  font-weight: 300;\\n  margin-bottom: 25px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/sidebar.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebar/sidebar.js":
/*!**********************************************************************!*\
  !*** ./src/client/components/products/components/sidebar/sidebar.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sidebar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar.css */ \"./src/client/components/products/components/sidebar/sidebar.css\");\n/* harmony import */ var _sidebar_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sidebar_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_categorie_categorie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/categorie/categorie */ \"./src/client/components/products/components/sidebar/components/categorie/categorie.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebar/sidebar.js\";\n\n\n\n\n\nclass Sidebar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  render() {\n    const _this$props = this.props,\n          history = _this$props.history,\n          search = _this$props.search;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sidebarContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 16\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sidebarTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17\n      },\n      __self: this\n    }, \"Products\"), this.props.categories && this.props.categories.map((categorie, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categorie_categorie__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        categorie: categorie,\n        key: i,\n        history: history,\n        search: search,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 21\n        },\n        __self: this\n      });\n    }));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    categories: state.configReducer.config.categories\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, null)(Sidebar));\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebar/sidebar.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/assets/categorieSelectOption.svg":
/*!**************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/assets/categorieSelectOption.svg ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/categorieSelectOption.ed0a4b14.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/assets/categorieSelectOption.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/assets/categorieSelected.svg":
/*!**********************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/assets/categorieSelected.svg ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/categorieSelected.8498c268.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/assets/categorieSelected.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/assets/singleCategorieOption.svg":
/*!**************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/assets/singleCategorieOption.svg ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/singleCategorieOption.db648379.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/assets/singleCategorieOption.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/assets/singleCategorieSelected.svg":
/*!****************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/assets/singleCategorieSelected.svg ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/singleCategorieSelected.2a37ec13.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/assets/singleCategorieSelected.svg?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/categorie/categorie.css":
/*!****************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/categorie/categorie.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".categorieContainer {\\n  margin-bottom: 16px;\\n}\\n.categorie {\\n  width: 180px;\\n  overflow-wrap: break-word;\\n  display: flex;\\n  align-items: flex-start;\\n}\\n\\n.categoriaOption {\\n  position: inherit;\\n  margin-right: 16px;\\n  cursor: pointer;\\n  margin-top: 3px;\\n}\\n\\n.categorieName {\\n  font-size: 16px;\\n  line-height: 160%;\\n  cursor: pointer;\\n  color: #000000;\\n  text-decoration: none;\\n  user-select: none;\\n}\\n\\n.childrenCategorie {\\n  padding-left: 33px;\\n  margin-top: 10px\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/categorie/categorie.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/categorie/categorie.js":
/*!***************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/categorie/categorie.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Categorie; });\n/* harmony import */ var _categorie_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorie.css */ \"./src/client/components/products/components/sidebarMobile/components/categorie/categorie.css\");\n/* harmony import */ var _categorie_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_categorie_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/categorieSelectOption.svg */ \"./src/client/components/products/components/sidebarMobile/assets/categorieSelectOption.svg\");\n/* harmony import */ var _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/categorieSelected.svg */ \"./src/client/components/products/components/sidebarMobile/assets/categorieSelected.svg\");\n/* harmony import */ var _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _categoriesWhitTitle_categoriesWhitTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../categoriesWhitTitle/categoriesWhitTitle */ \"./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.js\");\n/* harmony import */ var _selectionableCategorie_selectionableCategorie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../selectionableCategorie/selectionableCategorie */ \"./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebarMobile/components/categorie/categorie.js\";\n\n\n\n\n\n\nclass Categorie extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.compareUrlWithNameCategorie = (url, name) => {\n      if (decodeURI(url).includes(name)) {\n        this.setState({\n          open: true\n        });\n      } else {\n        this.setState({\n          open: false\n        });\n      }\n    };\n\n    this.state = {\n      open: false\n    };\n    this.showChildrens = this.showChildrens.bind(this);\n    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(this);\n  }\n\n  componentDidMount() {\n    const _this$props = this.props,\n          categorie = _this$props.categorie,\n          search = _this$props.search;\n    this.compareUrlWithNameCategorie(search, categorie.name);\n  }\n\n  componentDidUpdate(prevProps) {\n    const _this$props2 = this.props,\n          categorie = _this$props2.categorie,\n          search = _this$props2.search;\n\n    if (prevProps.search !== search) {\n      this.compareUrlWithNameCategorie(search, categorie.name);\n    }\n  }\n\n  showChildrens(childrens, open) {\n    if (!open) return;\n    return childrens.map((children, i) => {\n      if (children.type === \"title and categories\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_categoriesWhitTitle_categoriesWhitTitle__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n          categorie: children,\n          showChildrens: this.showChildrens,\n          key: i,\n          history: this.props.history,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 46\n          },\n          __self: this\n        });\n      } else if (children.type === \"selectionable categorie\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_selectionableCategorie_selectionableCategorie__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          categorie: children,\n          key: i,\n          history: this.props.history,\n          search: this.props.search,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 55\n          },\n          __self: this\n        });\n      } else if (children.type === \"categorie\") {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Categorie, {\n          categorie: children,\n          key: i,\n          history: this.props.history,\n          search: this.props.search,\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 64\n          },\n          __self: this\n        });\n      }\n\n      return null;\n    });\n  }\n\n  handleClick(categorie, history, search, e) {\n    e.stopPropagation();\n    e.preventDefault();\n\n    if (this.state.open) {\n      const path = decodeURI(search);\n      const newPath = path.slice(0, path.indexOf(categorie.name));\n      history.push(\"/products\".concat(newPath));\n      this.setState({\n        open: false\n      });\n    } else {\n      this.setState(({\n        open\n      }) => ({\n        open: !open\n      }), () => {\n        history.push(\"/products?\".concat(categorie.url));\n      });\n    }\n  }\n\n  render() {\n    const _this$props3 = this.props,\n          categorie = _this$props3.categorie,\n          history = _this$props3.history,\n          search = _this$props3.search;\n    const open = this.state.open;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorieContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 98\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorie\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: open ? _assets_categorieSelected_svg__WEBPACK_IMPORTED_MODULE_3___default.a : _assets_categorieSelectOption_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n      className: \"categoriaOption\",\n      onClick: e => this.handleClick(categorie, history, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 100\n      },\n      __self: this\n    }), categorie && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categorieName\",\n      onClick: e => this.handleClick(categorie, history, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 107\n      },\n      __self: this\n    }, categorie.name)), categorie.categories ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"childrenCategorie\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 116\n      },\n      __self: this\n    }, this.showChildrens(categorie.categories, open)) : null);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/categorie/categorie.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.css":
/*!************************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".childrenTitle {\\n  font-size: 13px;\\n  line-height: 170%;\\n  display: flex;\\n  font-weight: 600;\\n  align-items: center;\\n  color: #000000;\\n}\\n\\n.categoriesWhitTitleContainer {\\n  margin-bottom: 15px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.js":
/*!***********************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.js ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CategoriesWhitTitle; });\n/* harmony import */ var _categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categoriesWhitTitle.css */ \"./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.css\");\n/* harmony import */ var _categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_categoriesWhitTitle_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.js\";\n\n\nclass CategoriesWhitTitle extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  render() {\n    const _this$props = this.props,\n          categorie = _this$props.categorie,\n          showChildrens = _this$props.showChildrens;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"categoriesWhitTitleContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 9\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"childrenTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 10\n      },\n      __self: this\n    }, categorie.title), categorie.categories ? showChildrens(categorie.categories, true, \"akjefhbkjefb\") : categorie.name);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/categoriesWhitTitle/categoriesWhitTitle.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.css":
/*!******************************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".selectionableTitle {\\n  font-size: 12px;\\n  line-height: 200%;\\n  display: flex;\\n  align-items: center;\\n  color: #000000;\\n  cursor: pointer;\\n}\\n.selectionableCategorieContainer {\\n  display: flex;\\n  align-items: flex-start;\\n  user-select: none;\\n}\\n.selectionableOption {\\n  margin-top: 5px;\\n  margin-right: 8px;\\n  cursor: pointer;\\n  width: 12px;\\n  height: 12px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.js":
/*!*****************************************************************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.js ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SelectionableCategorie; });\n/* harmony import */ var _selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectionableCategorie.css */ \"./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.css\");\n/* harmony import */ var _selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_selectionableCategorie_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/singleCategorieSelected.svg */ \"./src/client/components/products/components/sidebarMobile/assets/singleCategorieSelected.svg\");\n/* harmony import */ var _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/singleCategorieOption.svg */ \"./src/client/components/products/components/sidebarMobile/assets/singleCategorieOption.svg\");\n/* harmony import */ var _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.js\";\n\n\n\n\nclass SelectionableCategorie extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.compareUrlWithNameCategorie = (url, name) => {\n      if (decodeURI(url).includes(name)) {\n        this.setState({\n          selected: true\n        });\n      } else {\n        this.setState({\n          selected: false\n        });\n      }\n    };\n\n    this.state = {\n      selected: false\n    };\n    this.handleClick = this.handleClick.bind(this);\n    this.compareUrlWithNameCategorie = this.compareUrlWithNameCategorie.bind(this);\n  }\n\n  componentDidMount() {\n    const _this$props = this.props,\n          search = _this$props.search,\n          categorie = _this$props.categorie;\n    this.compareUrlWithNameCategorie(search, categorie.name);\n  }\n\n  componentDidUpdate(prevProps) {\n    const _this$props2 = this.props,\n          search = _this$props2.search,\n          categorie = _this$props2.categorie;\n\n    if (search !== prevProps.search) {\n      this.compareUrlWithNameCategorie(search, categorie.name);\n    }\n  }\n\n  handleClick(history, categorie, search, e) {\n    e.preventDefault();\n    e.stopPropagation();\n\n    if (this.state.selected) {\n      const path = decodeURI(search);\n      const newPath = path.replace(\";\".concat(categorie.name), \"\");\n      history.push(\"/products\".concat(newPath));\n      this.setState({\n        selected: false\n      });\n    } else {\n      this.setState(({\n        selected\n      }) => ({\n        selected: !selected\n      }), () => {\n        history.push(\"/products\".concat(search + \";\" + categorie.name));\n      });\n    }\n  }\n\n  render() {\n    const selected = this.state.selected;\n    const _this$props3 = this.props,\n          categorie = _this$props3.categorie,\n          history = _this$props3.history,\n          search = _this$props3.search;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"selectionableCategorieContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"img\", {\n      alt: \"\",\n      src: selected ? _assets_singleCategorieSelected_svg__WEBPACK_IMPORTED_MODULE_2___default.a : _assets_singleCategorieOption_svg__WEBPACK_IMPORTED_MODULE_3___default.a,\n      className: \"selectionableOption\",\n      onClick: e => this.handleClick(history, categorie, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      className: \"selectionableTitle\",\n      onClick: e => this.handleClick(history, categorie, search, e),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 69\n      },\n      __self: this\n    }, categorie.name));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/components/selectionableCategorie/selectionableCategorie.js?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/sidebarMobile.css":
/*!***********************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/sidebarMobile.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".sidebarMobileContainer {\\n  background-color: rgb(246, 248, 255);\\n  position: absolute;\\n  padding-top: 14px;\\n  padding-bottom: 48px;\\n  padding-left: 23px;\\n  top: 111px;\\n  text-align: start;\\n  user-select: none;\\n  z-index: 70;\\n  width: 100%;\\n  height: 190%;\\n}\\n\\n.sidebarMobileTitle {\\n  font-size: 16px;\\n  line-height: 19px;\\n  color: #000000;\\n  text-transform: uppercase;\\n  font-weight: 300;\\n  margin-bottom: 20px;\\n}\\n\\n.buttonReset {\\n  width: 128px;\\n  height: 48px;\\n  border: 2px solid #6788ff;\\n  background-color: white;\\n  box-sizing: border-box;\\n  border-radius: 4px;\\n  font-size: 14px;\\n  line-height: 17px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  text-align: center;\\n  color: #6788ff;\\n  margin-right: 8px;\\n}\\n.buttonApply {\\n  width: 128px;\\n  height: 48px;\\n  background-color: #6788ff;\\n  border: 2px solid #6788ff;\\n  border-radius: 4px;\\n  font-size: 14px;\\n  line-height: 17px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  text-align: center;\\n  margin-left: 8px;\\n  color: #ffffff;\\n}\\n\\n.buttonsContainer {\\n  display: flex;\\n  justify-content: center;\\n  margin-top: 35px;\\n  width: 90%;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/sidebarMobile.css?");

/***/ }),

/***/ "./src/client/components/products/components/sidebarMobile/sidebarMobile.js":
/*!**********************************************************************************!*\
  !*** ./src/client/components/products/components/sidebarMobile/sidebarMobile.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sidebar; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sidebarMobile_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebarMobile.css */ \"./src/client/components/products/components/sidebarMobile/sidebarMobile.css\");\n/* harmony import */ var _sidebarMobile_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sidebarMobile_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_categorie_categorie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/categorie/categorie */ \"./src/client/components/products/components/sidebarMobile/components/categorie/categorie.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/sidebarMobile/sidebarMobile.js\";\n\n\n\nclass Sidebar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      categories: [{\n        name: \"Monitor Arms\",\n        url: \"Monitor Arms\",\n        categories: [{\n          title: \"Number of Monitors\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Single\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Dual\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Triple\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Quadtruple\"\n          }]\n        }, {\n          type: \"title and categories\",\n          title: \"Screen Size\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Small (Below 21”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Medium (21” to 27”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Large (Above 27”)\"\n          }]\n        }, {\n          type: \"title and categories\",\n          title: \"Monitor Weight\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"<17.6lbs>\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"<22lbs>\"\n          }]\n        }]\n      }, {\n        name: \"Tablet Mounts\",\n        url: \"Tablet Mounts\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"IPAD\"\n        }]\n      }, {\n        name: \"TV Mounts\",\n        url: \"TV Mounts\",\n        categories: [{\n          name: \"Fixed Mount\",\n          url: \"TV Mounts;Fixed Mount\",\n          type: \"categorie\",\n          categories: [{\n            title: \"TV Size\",\n            type: \"title and categories\",\n            categories: [{\n              type: \"selectionable categorie\",\n              name: \"Small (32” and under)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Medium (32” to 47”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Large (47” to 60”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Extra Large (61” and over)\"\n            }]\n          }]\n        }, {\n          name: \"Tilt Mount\",\n          url: \"TV Mounts;Tilt Mount\",\n          type: \"categorie\",\n          categories: [{\n            title: \"TV Size\",\n            type: \"title and categories\",\n            categories: [{\n              type: \"selectionable categorie\",\n              name: \"Small (32” and under)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Medium (32” to 47”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Large (47” to 60”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Extra Large (61” and over)\"\n            }]\n          }]\n        }, {\n          name: \"Full Motion Mount\",\n          url: \"TV Mounts;Full Motion Mount\",\n          type: \"categorie\",\n          categories: [{\n            title: \"TV Size\",\n            type: \"title and categories\",\n            categories: [{\n              type: \"selectionable categorie\",\n              name: \"Small (32” and under)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Medium (32” to 47”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Large (47” to 60”)\"\n            }, {\n              type: \"selectionable categorie\",\n              name: \"Extra Large (61” and over)\"\n            }]\n          }]\n        }]\n      }, {\n        name: \"TV Carts/Stands\",\n        url: \"TV Carts/Stands\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Non-Motorized TV Cart\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Motorized TV Carts\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Mobile AV Cabinet\"\n        }]\n      }, {\n        name: \"Projector Mounts\",\n        url: \"Projector Mounts\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Ceiling Mount\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Wall Mount\"\n        }]\n      }, {\n        name: \"Desk Risers\",\n        url: \"Desk Risers\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Slim Riser\"\n        }, {\n          title: \"Standard Riser\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Manual Adjustable\"\n          }, {\n            title: \"Motorized Adjustable\",\n            type: \"title and categories\",\n            categories: [{\n              type: \"selectionable categorie\",\n              name: \"Laptop and monitor combo\"\n            }]\n          }]\n        }]\n      }, {\n        type: \"selectionable categorie\",\n        url: \"Electric Height Adjustable Desks\",\n        name: \"Electric Height Adjustable Desks\"\n      }]\n    };\n    this.reset = this.reset.bind(this);\n  }\n\n  reset() {\n    this.props.history.push(\"/products\");\n    this.props.handleOpen();\n  }\n\n  render() {\n    const _this$props = this.props,\n          history = _this$props.history,\n          search = _this$props.search,\n          handleOpen = _this$props.handleOpen;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sidebarMobileContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 205\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sidebarMobileTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 206\n      },\n      __self: this\n    }, \"Products\"), this.state.categories.map((categorie, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categorie_categorie__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        categorie: categorie,\n        key: i,\n        history: history,\n        search: search,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 209\n        },\n        __self: this\n      });\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"buttonsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 217\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"buttonReset\",\n      onClick: this.reset,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 218\n      },\n      __self: this\n    }, \"RESET\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"buttonApply\",\n      onClick: handleOpen,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 221\n      },\n      __self: this\n    }, \"APPLY\")));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/client/components/products/components/sidebarMobile/sidebarMobile.js?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/assets/arrowDown.svg":
/*!**************************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/assets/arrowDown.svg ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrowDown.b7fe489e.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/assets/arrowDown.svg?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/assets/arrowDownBlue.svg":
/*!******************************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/assets/arrowDownBlue.svg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrowDownBlue.fe44f616.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/assets/arrowDownBlue.svg?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/assets/arrowRight.svg":
/*!***************************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/assets/arrowRight.svg ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrowRight.5b256f32.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/assets/arrowRight.svg?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/assets/arrowRightSlider.svg":
/*!*********************************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/assets/arrowRightSlider.svg ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrowRightSlider.f9e8926f.svg\";\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/assets/arrowRightSlider.svg?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/singleProduct.css":
/*!***********************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/singleProduct.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .singleProductContainer {\\n    margin-top: 120px;\\n  }\\n\\n  .singleProductPath {\\n    display: flex;\\n    flex-direction: row;\\n    padding-left: 121px;\\n  }\\n\\n  .spCategoriePath {\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    text-decoration: none;\\n  }\\n\\n  .singleProductContainer ul.slick-dots {\\n    bottom: -75px;\\n  }\\n\\n  .singleProductContainer ul.slick-dots li {\\n    object-fit: contain;\\n    width: 80px;\\n    height: 80px;\\n    margin-top: 75px;\\n  }\\n\\n  .dotsSlider {\\n    width: 80px;\\n    margin: 0 auto;\\n    height: 80px;\\n    object-fit: contain;\\n    margin-top: 50px;\\n  }\\n\\n  .dotsSlider:hover {\\n    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);\\n  }\\n\\n  .arrowLeftSlider {\\n    transform: rotate(180deg);\\n    cursor: pointer;\\n  }\\n\\n  .arrowRightSlider {\\n    cursor: pointer;\\n    z-index: 50;\\n  }\\n\\n  .spCategoriePathName {\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    margin-left: 16px;\\n    color: #000000;\\n  }\\n\\n  .spCategoriePathArrow {\\n    margin-left: 16px;\\n  }\\n\\n  .singleProductPresentation {\\n    padding-left: 121px;\\n    display: grid;\\n    grid-template-columns: 40% 60%;\\n    align-items: center;\\n    margin-bottom: 75px;\\n  }\\n\\n  .singleProductName {\\n    font-size: 15px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    font-weight: 600;\\n    color: #303030;\\n    text-align: start;\\n    text-transform: uppercase;\\n  }\\n\\n  .singleProductContainer div.slick-slider {\\n    width: 493px !important;\\n    margin-left: 40px;\\n  }\\n\\n  .arrowsContainer {\\n    width: 493px;\\n    display: flex;\\n    justify-content: space-between;\\n    padding: 0 50px;\\n    margin-top: 40px;\\n  }\\n\\n  .singleProductSubname {\\n    margin-top: 24px;\\n    font-size: 52px;\\n    font-weight: 300;\\n    line-height: 67px;\\n    color: #303030;\\n    text-align: start;\\n  }\\n\\n  .singleProdImage {\\n    width: 493px;\\n    height: 493px;\\n    object-fit: contain;\\n  }\\n\\n  .singleProductInformation {\\n    background: #6788ff;\\n    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);\\n    width: 69%;\\n    margin: 0 auto;\\n    min-height: 336px;\\n    padding: 48px 103px;\\n  }\\n\\n  .singleProductInfoTitles {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n\\n  .singleProductInfoActive {\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #ffffff;\\n    width: 232px;\\n    border-bottom: 1px solid #ffffff;\\n    text-align: start;\\n    padding-bottom: 22px;\\n    margin-right: 30px;\\n    cursor: pointer;\\n  }\\n\\n  .singleProductInfoDesactive {\\n    padding-bottom: 22px;\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    cursor: pointer;\\n    margin-right: 30px;\\n    text-transform: uppercase;\\n    color: rgba(255, 255, 255, 0.5);\\n    width: 232px;\\n    text-align: start;\\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5);\\n  }\\n\\n  .singleProductInfoData {\\n    font-size: 16px;\\n    line-height: 148.5%;\\n    color: #ffffff;\\n    width: 689px;\\n    text-align: start;\\n    margin-top: 48px;\\n  }\\n\\n  .relatedProductsTitle {\\n    font-size: 34px;\\n    line-height: 41px;\\n    text-transform: uppercase;\\n    color: #000000;\\n    text-align: start;\\n  }\\n\\n  .relatedProducts {\\n    margin-top: 72px;\\n    padding-left: 123px;\\n  }\\n\\n  .relatedProductsCards {\\n    display: flex;\\n    flex-direction: row;\\n    margin-top: 20px;\\n    margin-bottom: 65px;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .singleProductPath {\\n    display: flex;\\n    flex-direction: row;\\n    width: 100%;\\n    height: 51px;\\n    background: rgba(103, 136, 255, 0.08);\\n    align-items: center;\\n    padding-left: 22px;\\n  }\\n\\n  .spCategoriePath {\\n    font-size: 12px;\\n    line-height: 14px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    text-decoration: none;\\n  }\\n  .slick-dots {\\n    padding-right: 30px;\\n  }\\n  .singleProductContainer ul.slick-dots {\\n    bottom: -70px;\\n  }\\n\\n  .singleProductContainer ul.slick-dots li {\\n    width: 50px;\\n  }\\n\\n  .dotsSlider {\\n    width: 50px;\\n    margin: 0 auto;\\n    height: 50px;\\n    object-fit: contain;\\n  }\\n\\n  .slick-active .dotsSlider {\\n    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);\\n  }\\n\\n  .arrowLeftSlider {\\n    transform: rotate(180deg);\\n    cursor: pointer;\\n  }\\n\\n  .arrowRightSlider {\\n    cursor: pointer;\\n    z-index: 50;\\n  }\\n\\n  .spCategoriePathName {\\n    font-size: 12px;\\n    line-height: 14px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    margin-left: 16px;\\n    color: #000000;\\n  }\\n\\n  .spCategoriePathArrow {\\n    margin-left: 16px;\\n  }\\n\\n  .singleProductPresentation {\\n    padding-left: 22px;\\n    margin-top: 33px;\\n    align-items: center;\\n    margin-bottom: 75px;\\n  }\\n\\n  .singleProductName {\\n    font-size: 15px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    font-weight: 600;\\n    color: #303030;\\n    text-align: start;\\n    text-transform: uppercase;\\n  }\\n\\n  .singleProductContainer div.slick-slider {\\n    width: 100% !important;\\n  }\\n\\n  .arrowsContainer {\\n    margin: 0 auto;\\n    display: flex;\\n    justify-content: space-between;\\n    margin-top: 55px;\\n    margin-right: 30px;\\n    width: 90%;\\n  }\\n\\n  .singleProductSubname {\\n    margin-top: 24px;\\n    font-size: 30px;\\n    line-height: 105%;\\n    color: #303030;\\n    text-align: start;\\n    width: 80%;\\n  }\\n\\n  .singleProductImages {\\n    margin-top: 40px;\\n  }\\n  .singleProdImage {\\n    width: 223px;\\n    height: 223px;\\n    object-fit: contain;\\n  }\\n\\n  .singleProductInformation {\\n    background: #6788ff;\\n    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);\\n    width: 69%;\\n    margin: 0 auto;\\n    min-height: 336px;\\n    padding: 48px 103px;\\n  }\\n\\n  .singleProductInfoTitles {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n\\n  .singleProductInfoActive {\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #ffffff;\\n    width: 232px;\\n    border-bottom: 1px solid #ffffff;\\n    text-align: start;\\n    padding-bottom: 22px;\\n    margin-right: 30px;\\n    cursor: pointer;\\n  }\\n\\n  .singleProductInfoDesactive {\\n    padding-bottom: 22px;\\n    font-size: 14px;\\n    line-height: 17px;\\n    letter-spacing: 0.08em;\\n    cursor: pointer;\\n    margin-right: 30px;\\n    text-transform: uppercase;\\n    color: rgba(255, 255, 255, 0.5);\\n    width: 232px;\\n    text-align: start;\\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5);\\n  }\\n\\n  .singleProductInfoData {\\n    font-size: 16px;\\n    line-height: 148.5%;\\n    color: #ffffff;\\n    width: 100%;\\n    text-align: start;\\n    margin-top: 48px;\\n  }\\n\\n  .relatedProductsTitle {\\n    height: 31px;\\n    font-size: 24px;\\n    line-height: 130.5%;\\n    text-align: start;\\n    color: #000000;\\n    text-transform: uppercase;\\n    padding-left: 22px;\\n  }\\n\\n  .relatedProducts {\\n    margin-top: 40px;\\n    padding-left: 22px;\\n  }\\n\\n  .relatedProductsCards {\\n    display: flex;\\n    flex-direction: row;\\n    margin-top: 20px;\\n    margin-bottom: 65px;\\n  }\\n\\n  .singleProductDescMobile {\\n    background: #6788ff;\\n    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);\\n    border-radius: 8px;\\n    font-size: 12px;\\n    line-height: 14px;\\n    letter-spacing: 0.08em;\\n    color: #ffffff;\\n    text-align: start;\\n    padding: 24px;\\n    width: 90%;\\n    margin: 0 auto;\\n    word-break: break-word;\\n  }\\n  .arrowDownMobile {\\n    float: right;\\n  }\\n\\n  .mobileTitleinfo {\\n    text-transform: uppercase;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  .descDataMobile {\\n    border-top: 1px solid #ffffff;\\n    margin-top: 16px;\\n    padding-top: 24px;\\n  }\\n  .singleProductSpecsMobile {\\n    border: 1px solid #6788ff;\\n    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);\\n    border-radius: 8px;\\n    font-size: 12px;\\n    line-height: 14px;\\n    letter-spacing: 0.08em;\\n    color: #6788ff;\\n    text-align: start;\\n    padding: 24px;\\n    width: 90%;\\n    margin: 0 auto;\\n    word-break: break-word;\\n    margin-top: 24px;\\n  }\\n  .arrowDownMobile {\\n    float: right;\\n  }\\n\\n  .mobileTitleinfo {\\n    text-transform: uppercase;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  .specsDataMobile {\\n    border-top: 1px solid #6788ff;\\n    margin-top: 16px;\\n    padding-top: 24px;\\n  }\\n\\n  .relatedProductsMobile {\\n    padding-top: 36px;\\n    margin-top: 40px;\\n    padding-bottom: 59px;\\n    background: rgba(103, 136, 255, 0.08);\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/singleProduct.css?");

/***/ }),

/***/ "./src/client/components/products/components/singleProduct/singleProduct.js":
/*!**********************************************************************************!*\
  !*** ./src/client/components/products/components/singleProduct/singleProduct.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-slick */ \"react-slick\");\n/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-alice-carousel */ \"react-alice-carousel\");\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! slick-carousel/slick/slick.css */ \"./node_modules/slick-carousel/slick/slick.css\");\n/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slick-carousel/slick/slick-theme.css */ \"./node_modules/slick-carousel/slick/slick-theme.css\");\n/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _singleProduct_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./singleProduct.css */ \"./src/client/components/products/components/singleProduct/singleProduct.css\");\n/* harmony import */ var _singleProduct_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_singleProduct_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/arrowRight.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowRight.svg\");\n/* harmony import */ var _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/arrowRightSlider.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowRightSlider.svg\");\n/* harmony import */ var _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/arrowDown.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowDown.svg\");\n/* harmony import */ var _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/arrowDownBlue.svg */ \"./src/client/components/products/components/singleProduct/assets/arrowDownBlue.svg\");\n/* harmony import */ var _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/components/singleProduct/singleProduct.js\";\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass SingleProduct extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.next = () => {\n      this.slider.slickNext();\n    };\n\n    this.previous = () => {\n      this.slider.slickPrev();\n    };\n\n    this.handleStatusDesc = () => {\n      this.setState(({\n        descMobile\n      }) => ({\n        descMobile: !descMobile\n      }));\n    };\n\n    this.handleStatusSpecs = () => {\n      this.setState(({\n        specsMobile\n      }) => ({\n        specsMobile: !specsMobile\n      }));\n    };\n\n    this.handleInfo = info => {\n      this.setState({\n        info\n      });\n    };\n\n    this.state = {\n      product: {},\n      info: \"description\",\n      descMobile: false,\n      specsMobile: false,\n      components: []\n    };\n  }\n\n  componentDidMount() {\n    const _this$props = this.props,\n          apiUrl = _this$props.apiUrl,\n          id = _this$props.id;\n\n    if (apiUrl) {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/\").concat(id)).then(res => res.data[0]).then(product => {\n        this.setState({\n          product\n        });\n        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/relatedProducts/\").concat(id, \"/\").concat(product.categories[0])).then(components => this.setState({\n          components: components.data\n        }));\n      }).catch(err => console.log(err));\n    }\n  }\n\n  componentDidUpdate(prevProps) {\n    const apiUrl = this.props.apiUrl;\n\n    if (prevProps.id !== this.props.id || prevProps.apiUrl !== apiUrl) {\n      window.scrollTo(0, 0);\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/\").concat(this.props.id)).then(res => res.data[0]).then(product => {\n        this.setState({\n          product\n        });\n        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(apiUrl, \"/api/products/relatedProducts/\").concat(product._id, \"/\").concat(product.categories[0])).then(components => this.setState({\n          components: components.data\n        }));\n      }).catch(err => console.log(err));\n    }\n  }\n\n  render() {\n    const _this$state = this.state,\n          product = _this$state.product,\n          info = _this$state.info,\n          components = _this$state.components;\n    const apiUrl = this.props.apiUrl;\n    const settings = {\n      centerMode: false,\n      customPaging: function (i) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"dotsSliderContainer\",\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 91\n          },\n          __self: this\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: apiUrl + product.images[i],\n          alt: \"\",\n          className: \"dotsSlider\",\n          __source: {\n            fileName: _jsxFileName,\n            lineNumber: 92\n          },\n          __self: this\n        }));\n      },\n      dots: true,\n      dotsClass: \"slick-dots slick-thumb\",\n      infinite: true,\n      slidesToShow: 1,\n      speed: 500,\n      arrows: false,\n      draggable: false\n    };\n    const relatedProducts = components[0] && components.filter(e => e._id !== this.props.id).map(component => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"product\",\n        key: component._id,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 114\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: \"\".concat(this.props.apiUrl + component.images[0]),\n        alt: \"\",\n        className: \"productImage\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 115\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"productName\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 121\n        },\n        __self: this\n      }, component.partNumber), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"productDescription\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 122\n        },\n        __self: this\n      }, component.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/products/\".concat(component._id, \"/\").concat(component.categories[0] === \"Tv Carts/Stands\" ? \"Tv Carts-Stands\" : component.categories[0]),\n        className: \"productLink\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 123\n        },\n        __self: this\n      }, \"view more \\u2192\"));\n    });\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 137\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductPath\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 138\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/products?\".concat(product && product._id && product.categories[0]),\n      className: \"spCategoriePath\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 139\n      },\n      __self: this\n    }, product && product._id && product.categories[0]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"spCategoriePathArrow\",\n      src: _assets_arrowRight_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 145\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"spCategoriePathName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 146\n      },\n      __self: this\n    }, product && product._id && product.partNumber)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductPresentation\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 150\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 151\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductName\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 152\n      },\n      __self: this\n    }, product && product._id && product.partNumber), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductSubname\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 155\n      },\n      __self: this\n    }, product && product._id && product.name[0].toUpperCase() + product.name.slice(1))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductImages\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 161\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_3___default.a, Object.assign({}, settings, {\n      ref: c => this.slider = c,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 162\n      },\n      __self: this\n    }), product && product._id && product.images.map(image => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: this.props.apiUrl + image,\n        alt: \"\",\n        className: \"singleProdImage\",\n        key: image,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 167\n        },\n        __self: this\n      });\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"arrowsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 176\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"\",\n      className: \"arrowLeftSlider\",\n      onClick: this.previous,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 177\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowRightSlider_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"\",\n      className: \"arrowRightSlider\",\n      onClick: this.next,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 183\n      },\n      __self: this\n    })))), this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInformationMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 194\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductDescMobile\",\n      onClick: this.handleStatusDesc,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 195\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"mobileTitleinfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 199\n      },\n      __self: this\n    }, \"Description \\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowDown_svg__WEBPACK_IMPORTED_MODULE_11___default.a,\n      alt: \"\",\n      className: \"arrowDownMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 201\n      },\n      __self: this\n    })), this.state.descMobile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"descDataMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 204\n      },\n      __self: this\n    }, product && product._id && product.description) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductSpecsMobile\",\n      onClick: this.handleStatusSpecs,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 209\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"mobileTitleinfo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 213\n      },\n      __self: this\n    }, \"Specs \\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowDownBlue_svg__WEBPACK_IMPORTED_MODULE_12___default.a,\n      alt: \"\",\n      className: \"arrowDownMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 215\n      },\n      __self: this\n    })), this.state.specsMobile ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"specsDataMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 218\n      },\n      __self: this\n    }, product && product._id && product.specs) : null)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInformation\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 225\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInfoTitles\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 226\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: info === \"description\" ? \"singleProductInfoActive\" : \"singleProductInfoDesactive\",\n      onClick: () => this.handleInfo(\"description\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 227\n      },\n      __self: this\n    }, \"description\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: info === \"specs\" ? \"singleProductInfoActive\" : \"singleProductInfoDesactive\",\n      onClick: () => this.handleInfo(\"specs\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 237\n      },\n      __self: this\n    }, \"specs\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"singleProductInfoData\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 248\n      },\n      __self: this\n    }, info === \"description\" ? product && product._id && product.description : product && product._id && product.specs)), this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 256\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 257\n      },\n      __self: this\n    }, \" Related Products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      mouseDragEnabled: true,\n      items: relatedProducts,\n      duration: 200,\n      infinite: false,\n      buttonsDisabled: true,\n      responsive: {\n        0: {\n          items: 2\n        },\n        1024: {\n          items: 2\n        }\n      },\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 258\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProducts\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 271\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 272\n      },\n      __self: this\n    }, \" Related Products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"relatedProductsCards\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 273\n      },\n      __self: this\n    }, relatedProducts)));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__[\"connect\"])(mapStateToProps, null)(SingleProduct));\n\n//# sourceURL=webpack:///./src/client/components/products/components/singleProduct/singleProduct.js?");

/***/ }),

/***/ "./src/client/components/products/products.css":
/*!*****************************************************!*\
  !*** ./src/client/components/products/products.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .productsContainer {\\n    display: grid;\\n    grid-template-columns: 284px 1fr;\\n    grid-gap: 18px;\\n    width: 82.6%;\\n    margin: 0 auto;\\n    margin-top: 95px;\\n    margin-bottom: 67px;\\n  }\\n  .productsDivider {\\n    width: 100%;\\n    float: left;\\n    height: 0px;\\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .productsContainer {\\n    display: flex;\\n    flex-direction: column;\\n  }\\n  .productsDivider {\\n    width: 90%;\\n    margin: 0 auto;\\n    height: 0px;\\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\\n    float: inherit;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/products/products.css?");

/***/ }),

/***/ "./src/client/components/products/products.js":
/*!****************************************************!*\
  !*** ./src/client/components/products/products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _products_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./products.css */ \"./src/client/components/products/products.css\");\n/* harmony import */ var _products_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_products_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_categorybar_categoryBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/categorybar/categoryBar */ \"./src/client/components/products/components/categorybar/categoryBar.js\");\n/* harmony import */ var _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sidebar/sidebar */ \"./src/client/components/products/components/sidebar/sidebar.js\");\n/* harmony import */ var _components_filters_filters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/filters/filters */ \"./src/client/components/products/components/filters/filters.js\");\n/* harmony import */ var _components_sidebarMobile_sidebarMobile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/sidebarMobile/sidebarMobile */ \"./src/client/components/products/components/sidebarMobile/sidebarMobile.js\");\n/* harmony import */ var _components_gridProducts_gridProducts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/gridProducts/gridProducts */ \"./src/client/components/products/components/gridProducts/gridProducts.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/products/products.js\";\n\n\n\n\n\n\n\n\n\n\nclass Products extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.getProducts = apiUrl => {\n      const categories = this.props.search.slice(1).split(\";\");\n      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"\".concat(apiUrl, \"/api/products/categorie\"), {\n        categories\n      }).then(res => res.data).then(products => {\n        console.log(products, \"hola\");\n        this.setState({\n          products\n        });\n      });\n    };\n\n    this.state = {\n      open: false,\n      products: []\n    };\n    this.handleOpen = this.handleOpen.bind(this);\n  }\n\n  handleOpen() {\n    this.setState(({\n      open\n    }) => ({\n      open: !open\n    }));\n  }\n\n  componentDidMount() {\n    window.scrollTo(0, 0);\n    const apiUrl = this.props.apiUrl;\n    apiUrl && this.getProducts(apiUrl);\n  }\n\n  componentDidUpdate(prevProps) {\n    const apiUrl = this.props.apiUrl;\n\n    if (prevProps.apiUrl !== apiUrl) {\n      this.getProducts(apiUrl);\n    }\n\n    if (prevProps.search !== this.props.search) {\n      this.getProducts(apiUrl);\n    }\n  }\n\n  render() {\n    const _this$props = this.props,\n          search = _this$props.search,\n          history = _this$props.history;\n    const _this$state = this.state,\n          open = _this$state.open,\n          products = _this$state.products;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productsContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 60\n      },\n      __self: this\n    }, this.props.width < 768 ? open ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_sidebarMobile_sidebarMobile__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      history: history,\n      search: search,\n      handleOpen: this.handleOpen,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    }) : null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      history: history,\n      search: search,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 70\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 72\n      },\n      __self: this\n    }, this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_filters_filters__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      handleOpen: this.handleOpen,\n      open: open,\n      search: search,\n      history: history,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74\n      },\n      __self: this\n    }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_categorybar_categoryBar__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      path: search && decodeURI(search),\n      history: history,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 81\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"productsDivider\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 82\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_gridProducts_gridProducts__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      products: products,\n      search: search,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 83\n      },\n      __self: this\n    })));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, null)(Products));\n\n//# sourceURL=webpack:///./src/client/components/products/products.js?");

/***/ }),

/***/ "./src/client/components/upload/upload.css":
/*!*************************************************!*\
  !*** ./src/client/components/upload/upload.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".uploadContainer {\\n  width: 640px;\\n  margin: 0 auto;\\n  margin-top: 90px;\\n}\\n.uploadGrid {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr 1fr;\\n  flex-direction: column;\\n  justify-items: center;\\n  align-items: center;\\n  grid-gap: 15px;\\n}\\n\\n.uploadTitle {\\n  text-transform: uppercase;\\n  font-weight: 300;\\n}\\n.uploadInput {\\n  width: 0.1px;\\n  height: 0.1px;\\n  opacity: 0;\\n}\\n\\n.uploadInput + label {\\n  width: 200px;\\n  height: 40px;\\n  font-size: 1em;\\n  font-weight: 500;\\n  color: white;\\n  margin: 10px auto;\\n  line-height: 2.6em;\\n  /* text-transform: uppercase; */\\n  text-align: center;\\n  background-color: rgb(136, 135, 135);\\n  display: inline-block;\\n  border-radius: 10px;\\n  box-shadow: 0px 3px 0px #ccc;\\n  transition: 150ms;\\n}\\n\\n.uploadInput:focus + label,\\n.uploadInput + label:hover {\\n  background-color: rgb(136, 135, 135);\\n  box-shadow: 0px 5px 0px #ccc;\\n  cursor: pointer;\\n}\\n\\n.uploadImage {\\n  width: 200px;\\n  margin: 0 auto;\\n  object-fit: contain;\\n}\\n\\n.uploadInputProduct {\\n  width: 100%;\\n  padding: 12px 20px;\\n  margin: 8px 0;\\n  box-sizing: border-box;\\n  border: 3px solid #ccc;\\n  -webkit-transition: 0.5s;\\n  transition: 0.5s;\\n  outline: none;\\n}\\n\\n.uploadInputProduct:focus {\\n  border: 3px solid #555;\\n}\\n\\n.deleteImage {\\n  background-color: indianred;\\n  border: none;\\n  color: white;\\n  padding: 12px 16px;\\n  width: 250px;\\n  font-size: 16px;\\n  cursor: pointer;\\n  margin-top: 15px;\\n  border-radius: 7px;\\n  display: inline-block;\\n  margin-right: 20px;\\n  margin-bottom: 20px;\\n}\\n\\n.deleteImage:hover {\\n  background-color: salmon;\\n}\\n.sendProduct {\\n  background-color: rgb(54, 70, 116);\\n  border: none;\\n  color: white;\\n  padding: 12px 16px;\\n  width: 250px;\\n  font-size: 16px;\\n  cursor: pointer;\\n  margin-top: 15px;\\n  border-radius: 7px;\\n  display: inline-block;\\n}\\n\\n.sendProduct:hover {\\n  background-color: rgb(82, 92, 122);\\n}\\n\\n.categorieUpload {\\n  text-align: start;\\n  text-transform: uppercase;\\n  margin-bottom: 5px;\\n}\\n\\n.categorieUploadActive {\\n  color: green;\\n  text-align: start;\\n  text-transform: uppercase;\\n  margin-bottom: 5px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/client/components/upload/upload.css?");

/***/ }),

/***/ "./src/client/components/upload/upload.js":
/*!************************************************!*\
  !*** ./src/client/components/upload/upload.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _upload_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./upload.css */ \"./src/client/components/upload/upload.css\");\n/* harmony import */ var _upload_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_upload_css__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/client/components/upload/upload.js\";\n\n\n\n\n\nclass Upload extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.onChange = e => {\n      e.preventDefault();\n      const formData = new FormData();\n      formData.append(\"myImage\", e.target.files[0]);\n      const config = {\n        headers: {\n          \"content-type\": \"multipart/form-data\"\n        }\n      };\n      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"\".concat(this.props.apiUrl, \"/api/upload\"), formData, config).then(photo => {\n        this.setState(({\n          images\n        }) => {\n          if (images && images.length > 3) {\n            return images;\n          } else {\n            return {\n              images: [...images, photo.data]\n            };\n          }\n        });\n      }).catch(error => {});\n    };\n\n    this.handleChange = e => {\n      e.preventDefault();\n      this.setState({\n        [e.target.name]: e.target.value\n      });\n    };\n\n    this.deleteImage = e => {\n      this.setState(({\n        images\n      }) => {\n        images.shift();\n        return images;\n      });\n    };\n\n    this.uploadProduct = e => {\n      const _this$state = this.state,\n            partNumber = _this$state.partNumber,\n            name = _this$state.name,\n            categories = _this$state.categories,\n            specs = _this$state.specs,\n            images = _this$state.images,\n            description = _this$state.description;\n      e.preventDefault();\n      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"\".concat(this.props.apiUrl, \"/api/products\"), {\n        partNumber,\n        name,\n        categories: categories.split(\",\"),\n        specs,\n        images: images.map(image => image.fileUrl),\n        description\n      }).then(res => res.data).then(product => {\n        alert(\"tu producto fue subido correctamente\");\n        this.setState({\n          partNumber: \"\",\n          name: \"\",\n          images: [],\n          description: \"\",\n          specs: \"\",\n          categories: \"\"\n        });\n      });\n    };\n\n    this.state = {\n      partNumber: \"\",\n      name: \"\",\n      images: [],\n      description: \"\",\n      specs: \"\",\n      categories: \"\"\n    };\n  }\n\n  render() {\n    const apiUrl = this.props.apiUrl;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n      className: \"uploadContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 91\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n      className: \"uploadTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 92\n      },\n      __self: this\n    }, \"Upload product\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      name: \"partNumber\",\n      className: \"uploadInputProduct\",\n      onChange: this.handleChange,\n      placeholder: \"Part Number\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 93\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      name: \"name\",\n      className: \"uploadInputProduct\",\n      onChange: this.handleChange,\n      placeholder: \"Name\",\n      autoComplete: \"off\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 99\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      name: \"categories\",\n      className: \"uploadInputProduct\",\n      onChange: this.handleChange,\n      placeholder: \"Categories\",\n      autoComplete: \"off\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 106\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n      name: \"description\",\n      className: \"uploadInputProduct\",\n      onChange: this.handleChange,\n      placeholder: \"Description\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 113\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n      name: \"specs\",\n      className: \"uploadInputProduct\",\n      onChange: this.handleChange,\n      placeholder: \"Specs\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 119\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"uploadGrid\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 125\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: this.state.images[0] && \"\".concat(apiUrl).concat(this.state.images[0].fileUrl),\n      alt: \"\",\n      className: \"uploadImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 126\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: this.state.images[1] && \"\".concat(apiUrl).concat(this.state.images[1].fileUrl),\n      alt: \"\",\n      className: \"uploadImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 133\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: this.state.images[2] && \"\".concat(apiUrl).concat(this.state.images[2].fileUrl),\n      alt: \"\",\n      className: \"uploadImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 140\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 147\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"file\",\n      name: \"myImage\",\n      onChange: this.onChange,\n      className: \"uploadInput\",\n      id: \"file1\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 148\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      htmlFor: \"file1\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 155\n      },\n      __self: this\n    }, \"Choose a file\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 157\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"file\",\n      name: \"myImage\",\n      onChange: this.onChange,\n      className: \"uploadInput\",\n      id: \"file2\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 158\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      htmlFor: \"file2\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 165\n      },\n      __self: this\n    }, \"Choose a file\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 167\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"file\",\n      name: \"myImage\",\n      onChange: this.onChange,\n      className: \"uploadInput\",\n      id: \"file3\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 168\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      htmlFor: \"file3\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 175\n      },\n      __self: this\n    }, \"Choose a file\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"deleteImage\",\n      onClick: this.deleteImage,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 178\n      },\n      __self: this\n    }, \"Delete Image\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sendProduct\",\n      onClick: this.uploadProduct,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 181\n      },\n      __self: this\n    }, \"Send\"));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl,\n    categories: state.configReducer.config.categories\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, null)(Upload));\n\n//# sourceURL=webpack:///./src/client/components/upload/upload.js?");

/***/ }),

/***/ "./src/components/footer/assets/logo.svg":
/*!***********************************************!*\
  !*** ./src/components/footer/assets/logo.svg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/logo.ca9f88da.svg\";\n\n//# sourceURL=webpack:///./src/components/footer/assets/logo.svg?");

/***/ }),

/***/ "./src/components/footer/footer.css":
/*!******************************************!*\
  !*** ./src/components/footer/footer.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .footerContainer {\\n    height: 239px;\\n    background-color: rgba(143, 143, 143, 0.05);;\\n    padding: 0 55px;\\n  }\\n\\n  .footerTop {\\n    width: 100%;\\n  }\\n\\n  .footerLogo {\\n    margin-top: 46px;\\n    margin-left: 3px;\\n    float: left;\\n  }\\n\\n  .footerSections {\\n    margin-top: 70px;\\n    float: right;\\n    margin-right: 35px;\\n  }\\n\\n  .footerSection {\\n    font-size: 11px;\\n    line-height: 14px;\\n    letter-spacing: 0.1px;\\n    font-weight: 600;\\n    color: #9b9b9b;\\n    text-transform: uppercase;\\n    text-decoration: none;\\n    cursor: pointer;\\n    margin-left: 150px;\\n  }\\n\\n  .footerDivider {\\n    background: #9b9b9b;\\n    mix-blend-mode: normal;\\n    opacity: 0.1;\\n    border: 1px solid #6d6d6d;\\n    width: 100%;\\n    float: left;\\n    margin-top: 17.5px;\\n  }\\n  .footerRights {\\n    font-size: 11px;\\n    line-height: 22px;\\n    width: 100%;\\n    display: flex;\\n    align-items: center;\\n    text-align: center;\\n    color: #9b9b9b;\\n    justify-content: center;\\n    padding-top: 45px;\\n  }\\n}\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .footerContainer {\\n    height: 147px;\\n    background-color: rgba(143, 143, 143, 0.05);;\\n    padding: 0 25px;\\n  }\\n\\n  .footerTop {\\n    width: 100%;\\n  }\\n\\n  .footerLogo {\\n    float: left;\\n  }\\n\\n  .footerSections {\\n    float: left;\\n    display: flex;\\n    justify-content: space-between;\\n    width: 100%;\\n  }\\n\\n  .footerSection {\\n    font-size: 10px;\\n    line-height: 14px;\\n    font-weight: 600;\\n    color: #9b9b9b;\\n    text-transform: uppercase;\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n\\n  .footerDivider {\\n    background: #9b9b9b;\\n    mix-blend-mode: normal;\\n    opacity: 0.1;\\n    border: 1px solid #6d6d6d;\\n    width: 100%;\\n    float: left;\\n    margin-top: 15px;\\n  }\\n  .footerRights {\\n    font-size: 12px;\\n    line-height: 22px;\\n    width: 100%;\\n    display: flex;\\n    align-items: center;\\n    text-align: center;\\n    color: #9b9b9b;\\n    justify-content: center;\\n    padding-top: 10px;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/footer/footer.css?");

/***/ }),

/***/ "./src/components/footer/footer.js":
/*!*****************************************!*\
  !*** ./src/components/footer/footer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Footer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.css */ \"./src/components/footer/footer.css\");\n/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_footer_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/logo.svg */ \"./src/components/footer/assets/logo.svg\");\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_logo_svg__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/footer/footer.js\";\n\n\n\n\nclass Footer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"footerContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"footerTop\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 12\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 13\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_logo_svg__WEBPACK_IMPORTED_MODULE_3___default.a,\n      alt: \"logo\",\n      className: \"footerLogo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"footerSections\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 16\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: \"footerSection\",\n      to: \"/about\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17\n      },\n      __self: this\n    }, \"about us\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: \"footerSection\",\n      to: \"/products\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 20\n      },\n      __self: this\n    }, \"products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: \"footerSection\",\n      to: \"/contact\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 26\n      },\n      __self: this\n    }, \"contact\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"footerDivider\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 32\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"footerRights\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 34\n      },\n      __self: this\n    }, \"\\xA9 2019, Lumartex. All rights reserved.\"));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/footer/footer.js?");

/***/ }),

/***/ "./src/components/heroSection/assets/arrow.svg":
/*!*****************************************************!*\
  !*** ./src/components/heroSection/assets/arrow.svg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrow.e65080a5.svg\";\n\n//# sourceURL=webpack:///./src/components/heroSection/assets/arrow.svg?");

/***/ }),

/***/ "./src/components/heroSection/assets/arrowDesktop.svg":
/*!************************************************************!*\
  !*** ./src/components/heroSection/assets/arrowDesktop.svg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/arrowDesktop.34211db5.svg\";\n\n//# sourceURL=webpack:///./src/components/heroSection/assets/arrowDesktop.svg?");

/***/ }),

/***/ "./src/components/heroSection/assets/background-image-mobile.jpg":
/*!***********************************************************************!*\
  !*** ./src/components/heroSection/assets/background-image-mobile.jpg ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/background-image-mobile.75e15906.jpg\";\n\n//# sourceURL=webpack:///./src/components/heroSection/assets/background-image-mobile.jpg?");

/***/ }),

/***/ "./src/components/heroSection/assets/background-image.png":
/*!****************************************************************!*\
  !*** ./src/components/heroSection/assets/background-image.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/background-image.bfa4041f.png\";\n\n//# sourceURL=webpack:///./src/components/heroSection/assets/background-image.png?");

/***/ }),

/***/ "./src/components/heroSection/heroSection.css":
/*!****************************************************!*\
  !*** ./src/components/heroSection/heroSection.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar urlEscape = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/url-escape.js */ \"./node_modules/css-loader/dist/runtime/url-escape.js\");\nvar ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./assets/background-image.png */ \"./src/components/heroSection/assets/background-image.png\"));\n\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .heroContainer {\\n    width: 100%;\\n    height: 77.5vh;\\n    position: relative;\\n    background-size: cover;\\n    background-position: center;\\n    background-color: black;\\n    background-repeat: no-repeat;\\n    margin-top: 90px;\\n    background-image: url(\" + ___CSS_LOADER_URL___0___ + \");\\n  }\\n\\n  .heroTitle {\\n    top: 180px;\\n    left: 119px;\\n    width: 413px;\\n    height: 192px;\\n    font-size: 70px;\\n    color: #1e1e28;\\n    font-weight: 300;\\n    line-height: 96px;\\n    position: absolute;\\n    text-align: initial;\\n  }\\n\\n  .heroButton {\\n    top: 401px;\\n    left: 120px;\\n    width: 190px;\\n    height: 58px;\\n    border: none;\\n    display: flex;\\n    font-size: 15px;\\n    color: #ffffff;\\n    font-weight: 600;\\n    line-height: 19px;\\n    position: absolute;\\n    text-align: center;\\n    border-radius: 4px;\\n    align-items: center;\\n    background: #6788ff;\\n    outline: none;\\n    justify-content: center;\\n  }\\n  .heroButton:hover {\\n    background: #6788ff;\\n    box-shadow: 0px 0px 10px #6788ff;\\n  }\\n  .heroButton:active {\\n    background: #ffffff;\\n    box-shadow: 0px 0px 10px #6788ff;\\n    color: #6788ff;\\n    outline: none;\\n  }\\n  .heroArrow {\\n    position: absolute;\\n    right: 50%;\\n    bottom: 30px;\\n  }\\n}\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .heroContainer {\\n    width: 100%;\\n    height: 100%;\\n    position: relative;\\n    background-size: 100% 100%;\\n    background-color: black;\\n    background-repeat: no-repeat;\\n  }\\n\\n  .heroTitle {\\n    font-size: 36px;\\n    line-height: 105%;\\n    font-weight: 100;\\n    color: #1e1e28;\\n    text-align: start;\\n    margin-left: 24px;\\n    margin-top: 15px;\\n    width: 60%;\\n  }\\n\\n  .heroButton {\\n    width: 158px;\\n    height: 48px;\\n    background: #6788ff;\\n    border-radius: 4px;\\n    border: none;\\n    font-size: 14px;\\n    line-height: 17px;\\n    display: flex;\\n    align-items: center;\\n    text-align: center;\\n    justify-content: center;\\n    color: #ffffff;\\n    margin-left: 24px;\\n    margin-top: 10px;\\n  }\\n\\n  .heroArrow {\\n    width: 7px;\\n    margin-top: 24px;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/heroSection/heroSection.css?");

/***/ }),

/***/ "./src/components/heroSection/heroSection.js":
/*!***************************************************!*\
  !*** ./src/components/heroSection/heroSection.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HeroSection; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/arrow.svg */ \"./src/components/heroSection/assets/arrow.svg\");\n/* harmony import */ var _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_arrow_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_arrowDesktop_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/arrowDesktop.svg */ \"./src/components/heroSection/assets/arrowDesktop.svg\");\n/* harmony import */ var _assets_arrowDesktop_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_arrowDesktop_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _heroSection_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./heroSection.css */ \"./src/components/heroSection/heroSection.css\");\n/* harmony import */ var _heroSection_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_heroSection_css__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/heroSection/heroSection.js\";\n\n\n\n\nclass HeroSection extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11\n      },\n      __self: this\n    }, this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 13\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: __webpack_require__(/*! ./assets/background-image-mobile.jpg */ \"./src/components/heroSection/assets/background-image-mobile.jpg\"),\n      className: \"heroContainer\",\n      alt: \"\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"heroTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 19\n      },\n      __self: this\n    }, \"SIT STAND LAPTOP\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"heroButton\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 20\n      },\n      __self: this\n    }, \"VIEW PRODUCT\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_1___default.a,\n      alt: \"arrow\",\n      className: \"heroArrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 21\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"heroContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 24\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"heroTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 25\n      },\n      __self: this\n    }, \"SIT STAND LAPTOP\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"heroButton\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 26\n      },\n      __self: this\n    }, \"VIEW PRODUCT\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_arrowDesktop_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n      alt: \"arrowDesktop\",\n      className: \"heroArrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 27\n      },\n      __self: this\n    })));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/heroSection/heroSection.js?");

/***/ }),

/***/ "./src/components/homeCategories/assets sync recursive ^\\.\\/.*$":
/*!************************************************************!*\
  !*** ./src/components/homeCategories/assets sync ^\.\/.*$ ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./deskRisers.png\": \"./src/components/homeCategories/assets/deskRisers.png\",\n\t\"./electricHeightAdjustableDesks.png\": \"./src/components/homeCategories/assets/electricHeightAdjustableDesks.png\",\n\t\"./mobile-deskRisers.png\": \"./src/components/homeCategories/assets/mobile-deskRisers.png\",\n\t\"./mobile-electricHeightAdjustableDesks.png\": \"./src/components/homeCategories/assets/mobile-electricHeightAdjustableDesks.png\",\n\t\"./mobile-monitorArms.png\": \"./src/components/homeCategories/assets/mobile-monitorArms.png\",\n\t\"./mobile-projectorMounts.png\": \"./src/components/homeCategories/assets/mobile-projectorMounts.png\",\n\t\"./mobile-tabletMounts.png\": \"./src/components/homeCategories/assets/mobile-tabletMounts.png\",\n\t\"./mobile-tvCardsStands.png\": \"./src/components/homeCategories/assets/mobile-tvCardsStands.png\",\n\t\"./mobile-tvMounts.png\": \"./src/components/homeCategories/assets/mobile-tvMounts.png\",\n\t\"./monitorArms.png\": \"./src/components/homeCategories/assets/monitorArms.png\",\n\t\"./projectorMounts.png\": \"./src/components/homeCategories/assets/projectorMounts.png\",\n\t\"./tabletMounts.png\": \"./src/components/homeCategories/assets/tabletMounts.png\",\n\t\"./tvCardsStands.png\": \"./src/components/homeCategories/assets/tvCardsStands.png\",\n\t\"./tvMounts.png\": \"./src/components/homeCategories/assets/tvMounts.png\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/components/homeCategories/assets sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/components/homeCategories/assets/deskRisers.png":
/*!*************************************************************!*\
  !*** ./src/components/homeCategories/assets/deskRisers.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/deskRisers.2c294a56.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/deskRisers.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/electricHeightAdjustableDesks.png":
/*!********************************************************************************!*\
  !*** ./src/components/homeCategories/assets/electricHeightAdjustableDesks.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/electricHeightAdjustableDesks.f7ec2433.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/electricHeightAdjustableDesks.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-deskRisers.png":
/*!********************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-deskRisers.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-deskRisers.2c294a56.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-deskRisers.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-electricHeightAdjustableDesks.png":
/*!***************************************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-electricHeightAdjustableDesks.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-electricHeightAdjustableDesks.f7ec2433.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-electricHeightAdjustableDesks.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-monitorArms.png":
/*!*********************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-monitorArms.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-monitorArms.080a996f.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-monitorArms.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-projectorMounts.png":
/*!*************************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-projectorMounts.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-projectorMounts.9458c956.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-projectorMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-tabletMounts.png":
/*!**********************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-tabletMounts.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-tabletMounts.c1188a93.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-tabletMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-tvCardsStands.png":
/*!***********************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-tvCardsStands.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-tvCardsStands.8e64018e.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-tvCardsStands.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/mobile-tvMounts.png":
/*!******************************************************************!*\
  !*** ./src/components/homeCategories/assets/mobile-tvMounts.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/mobile-tvMounts.4a0ebc73.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/mobile-tvMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/monitorArms.png":
/*!**************************************************************!*\
  !*** ./src/components/homeCategories/assets/monitorArms.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/monitorArms.aa88da5e.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/monitorArms.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/projectorMounts.png":
/*!******************************************************************!*\
  !*** ./src/components/homeCategories/assets/projectorMounts.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/projectorMounts.9458c956.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/projectorMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/tabletMounts.png":
/*!***************************************************************!*\
  !*** ./src/components/homeCategories/assets/tabletMounts.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/tabletMounts.c1188a93.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/tabletMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/tvCardsStands.png":
/*!****************************************************************!*\
  !*** ./src/components/homeCategories/assets/tvCardsStands.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/tvCardsStands.8e64018e.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/tvCardsStands.png?");

/***/ }),

/***/ "./src/components/homeCategories/assets/tvMounts.png":
/*!***********************************************************!*\
  !*** ./src/components/homeCategories/assets/tvMounts.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/tvMounts.4a0ebc73.png\";\n\n//# sourceURL=webpack:///./src/components/homeCategories/assets/tvMounts.png?");

/***/ }),

/***/ "./src/components/homeCategories/homeCategories.css":
/*!**********************************************************!*\
  !*** ./src/components/homeCategories/homeCategories.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .categoriesContainer {\\n    width: 100%;\\n    background: #6788ff14;\\n    padding-top: 72px;\\n    padding-bottom: 72px;\\n  }\\n\\n  .categoriesContent {\\n    display: grid;\\n    width: 100%;\\n    max-width: 1220px;\\n    margin: 0 auto;\\n    justify-items: center;\\n    grid-template-columns: 1fr 1fr 1fr;\\n    grid-gap: 27px;\\n  }\\n  .categoryCard {\\n    width: 384px;\\n    height: 384px;\\n    position: relative;\\n    background: #ffffff;\\n    box-shadow: 0px 0px 30px rgba(63, 105, 255, 0.08);\\n    border-radius: 4px;\\n    cursor: pointer;\\n  }\\n\\n  .categoryCard a {\\n    text-decoration: none;\\n  }\\n\\n  .categoryTitle {\\n    font-size: 31px;\\n    line-height: 41px;\\n    color: #1e1e28;\\n    position: absolute;\\n    text-align: start;\\n    top: 50px;\\n    left: 33px;\\n    width: 60%;\\n    z-index: 13;\\n  }\\n\\n  .categoryLink {\\n    font-size: 14px;\\n    line-height: 17px;\\n    display: flex;\\n    align-items: center;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    z-index: 13;\\n    margin-top: 8px;\\n    outline: none;\\n    width: 100px;\\n  }\\n  .categoryLink:hover {\\n    border-bottom: 1px solid #6788ff;\\n  }\\n  .categoryImage {\\n    position: absolute;\\n    bottom: 0%;\\n    z-index: 10;\\n    right: 0%;\\n    object-fit: contain;\\n  }\\n}\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .categoriesContainer {\\n    background: #6788ff14;\\n    padding: 40px 0;\\n    margin-top: 18px;\\n  }\\n\\n  .titleMobile {\\n    font-size: 24px;\\n    line-height: 29px;\\n    color: #000000;\\n    text-transform: uppercase;\\n    text-align: start;\\n    margin-left: 15px;\\n  }\\n\\n  .categoriesContent {\\n    display: grid;\\n    grid-template-columns: repeat(7, 1fr);\\n    grid-gap: 16px;\\n    overflow: scroll;\\n    padding: 0 22px;\\n  }\\n  .categoriesContent::-webkit-scrollbar {\\n    display: none;\\n  }\\n  .categoryCard {\\n    width: 272px;\\n    height: 272px;\\n    position: relative;\\n    background: #ffffff;\\n    box-shadow: 0px 0px 30px rgba(63, 105, 255, 0.08);\\n    border-radius: 4px;\\n    margin: 0 auto;\\n    margin-top: 25px;\\n  }\\n\\n  .categoryCard a {\\n    text-decoration: none;\\n  }\\n\\n  .categoryTitle {\\n    font-size: 24px;\\n    line-height: 29px;\\n    color: #1e1e28;\\n    width: 60%;\\n    text-align: start;\\n    top: 20px;\\n    left: 20px;\\n    position: absolute;\\n    z-index: 45;\\n  }\\n\\n  .categoryLink {\\n    font-size: 12px;\\n    line-height: 14px;\\n    display: flex;\\n    align-items: center;\\n    letter-spacing: 0.08em;\\n    text-transform: uppercase;\\n    color: #6788ff;\\n    margin-top: 8px;\\n    outline: none;\\n  }\\n\\n  .categoryImage {\\n    position: absolute;\\n    bottom: 0;\\n    right: 0;\\n    object-fit: contain;\\n    max-height: 75%;\\n  }\\n  .slider {\\n    background-color: red;\\n  }\\n  .slick-slide {\\n    width: 272px;\\n  }\\n  li.alice-carousel__dots-item {\\n    width: 4.2px;\\n    height: 4.2px;\\n    border: 0.5px solid #6788ff;\\n    box-sizing: border-box;\\n    border-radius: 0px;\\n    transform: matrix(0, 1, 1, 0, 0, 0);\\n  }\\n\\n  ul.alice-carousel__dots {\\n    margin: 15px 0 5px;\\n    text-align: center;\\n    list-style: none;\\n    padding: 0;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/homeCategories/homeCategories.css?");

/***/ }),

/***/ "./src/components/homeCategories/homeCategories.js":
/*!*********************************************************!*\
  !*** ./src/components/homeCategories/homeCategories.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-alice-carousel */ \"react-alice-carousel\");\n/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-alice-carousel/lib/alice-carousel.css */ \"./node_modules/react-alice-carousel/lib/alice-carousel.css\");\n/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _homeCategories_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./homeCategories.css */ \"./src/components/homeCategories/homeCategories.css\");\n/* harmony import */ var _homeCategories_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_homeCategories_css__WEBPACK_IMPORTED_MODULE_6__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/homeCategories/homeCategories.js\";\n\n\n\n\n\n\n\n\nclass HomeCategories extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.getCategories = apiUrl => {\n      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"\".concat(apiUrl, \"/api/categories?q=\")).then(res => res.data).then(categories => {\n        this.setState({\n          categories\n        });\n      });\n    };\n\n    this.state = {\n      categories: []\n    };\n  }\n\n  componentDidMount() {\n    const apiUrl = this.props.apiUrl;\n    apiUrl && this.getCategories(apiUrl);\n  }\n\n  componentDidUpdate(prevProps) {\n    const apiUrl = this.props.apiUrl;\n\n    if (prevProps.apiUrl !== apiUrl) {\n      this.getCategories(apiUrl);\n    }\n  }\n\n  render() {\n    const categories = this.state.categories;\n    const components = categories && categories.map(category => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoryCard\",\n      key: category._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 43\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoryTitle\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 44\n      },\n      __self: this\n    }, category._source.description, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      to: \"/products?\".concat(category._source.description),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 46\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoryLink\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 47\n      },\n      __self: this\n    }, \"View All \\u2192\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: __webpack_require__(\"./src/components/homeCategories/assets sync recursive ^\\\\.\\\\/.*$\")(\"./\".concat(category._source.image)),\n      alt: \"img\",\n      className: \"categoryImage\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 50\n      },\n      __self: this\n    })));\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoriesContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 59\n      },\n      __self: this\n    }, this.props.width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"sliderContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 61\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"titleMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 62\n      },\n      __self: this\n    }, \"our products\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      mouseDragEnabled: true,\n      items: components,\n      duration: 200,\n      infinite: false,\n      buttonsDisabled: true,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 63\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"categoriesContent\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 72\n      },\n      __self: this\n    }, components));\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(mapStateToProps, null)(HomeCategories));\n\n//# sourceURL=webpack:///./src/components/homeCategories/homeCategories.js?");

/***/ }),

/***/ "./src/components/navbar/assets/close.svg":
/*!************************************************!*\
  !*** ./src/components/navbar/assets/close.svg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/close.ed8ad8b6.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/close.svg?");

/***/ }),

/***/ "./src/components/navbar/assets/logo.svg":
/*!***********************************************!*\
  !*** ./src/components/navbar/assets/logo.svg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/logo.f21abead.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/logo.svg?");

/***/ }),

/***/ "./src/components/navbar/assets/menu.svg":
/*!***********************************************!*\
  !*** ./src/components/navbar/assets/menu.svg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/menu.be58b965.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/menu.svg?");

/***/ }),

/***/ "./src/components/navbar/assets/prev.svg":
/*!***********************************************!*\
  !*** ./src/components/navbar/assets/prev.svg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/prev.036dca95.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/prev.svg?");

/***/ }),

/***/ "./src/components/navbar/assets/right-arrow.svg":
/*!******************************************************!*\
  !*** ./src/components/navbar/assets/right-arrow.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/right-arrow.42b98338.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/right-arrow.svg?");

/***/ }),

/***/ "./src/components/navbar/assets/search.svg":
/*!*************************************************!*\
  !*** ./src/components/navbar/assets/search.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/search.79cfeb08.svg\";\n\n//# sourceURL=webpack:///./src/components/navbar/assets/search.svg?");

/***/ }),

/***/ "./src/components/navbar/components/dropdown/dropdown.css":
/*!****************************************************************!*\
  !*** ./src/components/navbar/components/dropdown/dropdown.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .dropdownContainer {\\n    position: absolute;\\n    top: 100%;\\n    width: 100%;\\n    background: #f2f2f2;\\n    border-radius: 4px;\\n  }\\n  .dropdownAbsolute {\\n    position: absolute;\\n    height: 200vh;\\n    width: 100%;\\n    background-color: red;\\n    opacity: 0;\\n  }\\n  .dropdownProduct {\\n    padding: 10px 25px;\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: #000000;\\n    display: flex;\\n    align-items: center;\\n    justify-content: flex-start;\\n    text-align: start;\\n    text-transform: uppercase;\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n\\n  .dropdownProduct:hover {\\n    background: rgba(103, 136, 255, 0.36);\\n    text-decoration: none;\\n    color: #000000;\\n  }\\n\\n  .dropdownDivider {\\n    width: 90%;\\n    margin: 0 auto;\\n    border: 0.5px solid rgba(55, 55, 55, 0.1);\\n  }\\n\\n  .dropdownSection {\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: rgba(55, 55, 55, 0.5);\\n    display: flex;\\n    align-items: center;\\n    justify-content: flex-start;\\n    width: 100%;\\n    padding-left: 25px;\\n    text-transform: uppercase;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .dropdownContainer {\\n    position: absolute;\\n    top: 60px;\\n    width: 100%;\\n    background: #f2f2f2;\\n    border-radius: 4px;\\n    z-index: 99;\\n  }\\n\\n  .dropdownProduct {\\n    height: 50px;\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: #000000;\\n    display: flex;\\n    align-items: center;\\n    justify-content: flex-start;\\n    padding-left: 25px;\\n    text-transform: uppercase;\\n    text-decoration: none;\\n    text-align: start;\\n  }\\n\\n  .dropdownAbsolute {\\n    position: absolute;\\n    height: 200vh;\\n    width: 100%;\\n    background-color: red;\\n    opacity: 0;\\n    z-index: 50;\\n  }\\n\\n  .dropdownProduct:hover {\\n    background: rgba(103, 136, 255, 0.36);\\n  }\\n\\n  .dropdownDivider {\\n    width: 90%;\\n    margin: 0 auto;\\n    border: 0.5px solid rgba(55, 55, 55, 0.1);\\n  }\\n\\n  .dropdownSection {\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: rgba(55, 55, 55, 0.5);\\n    display: flex;\\n    align-items: center;\\n    justify-content: flex-start;\\n    width: 100%;\\n    padding-left: 25px;\\n    text-transform: uppercase;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/navbar/components/dropdown/dropdown.css?");

/***/ }),

/***/ "./src/components/navbar/components/dropdown/dropdown.js":
/*!***************************************************************!*\
  !*** ./src/components/navbar/components/dropdown/dropdown.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dropdown; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dropdown_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown.css */ \"./src/components/navbar/components/dropdown/dropdown.css\");\n/* harmony import */ var _dropdown_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dropdown_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/navbar/components/dropdown/dropdown.js\";\n\n\n\nclass Dropdown extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    const _this$props = this.props,\n          products = _this$props.products,\n          statusMenu = _this$props.statusMenu;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dropdownContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 9\n      },\n      __self: this\n    }, products.name.length && statusMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 11\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dropdownSection\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 12\n      },\n      __self: this\n    }, \"Name\"), products.name.map(produ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      className: \"dropdownProduct\" // onClick={e => handleClickProduct(e)}\n      ,\n      to: \"/products/\".concat(produ._id, \"/\").concat(produ._source.categories[0] === \"Tv Carts/Stands\" ? \"Tv Carts-Stands\" : produ._source.categories[0]),\n      key: produ._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 14\n      },\n      __self: this\n    }, produ._source.name))) : null, products.partNumber.length && statusMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 31\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dropdownSection\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 32\n      },\n      __self: this\n    }, \"Part Number\"), products.partNumber.map(prod => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n      className: \"dropdownProduct\" // onClick={e => handleClickProduct(e)}\n      ,\n      to: \"/products/\".concat(prod._id, \"/\").concat(prod._source.categories[0] === \"Tv Carts/Stands\" ? \"Tv Carts-Stands\" : prod._source.categories[0]),\n      key: prod._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 34\n      },\n      __self: this\n    }, prod._source.partNumber))) : null);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/navbar/components/dropdown/dropdown.js?");

/***/ }),

/***/ "./src/components/navbar/navbar.css":
/*!******************************************!*\
  !*** ./src/components/navbar/navbar.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"/* Styles for desktop */\\n\\n@media (min-width: 768px) {\\n  .navbarContainer {\\n    top: 0%;\\n    z-index: 50;\\n    width: 100%;\\n    height: 100%;\\n    display: flex;\\n    position: fixed;\\n    max-height: 90px;\\n    user-select: none;\\n    align-items: center;\\n    background-color: white;\\n    justify-content: space-between;\\n  }\\n\\n  .navbarSection {\\n    font-size: 14px;\\n    color: #000000;\\n    font-weight: 200;\\n    line-height: 19px;\\n    margin-right: 55px;\\n    margin-bottom: 5px;\\n    text-decoration: none;\\n    text-transform: uppercase;\\n    cursor: pointer;\\n  }\\n  .navbarSectionActive {\\n    font-size: 14px;\\n    color: #000000;\\n    font-weight: 200;\\n    line-height: 19px;\\n    margin-right: 55px;\\n    margin-bottom: 5px;\\n    text-decoration: none;\\n    text-transform: uppercase;\\n    border-bottom: 1px solid #6788ff;\\n    cursor: pointer;\\n  }\\n\\n  .navbarSection:hover, .navbarSectionActive:hover  {\\n    border-bottom: 1px solid #6788ff;\\n    text-decoration: none;\\n  }\\n\\n  .navbarSearch input {\\n    width: 283px;\\n    height: 50px;\\n    border: none;\\n    outline: none;\\n    font-size: 16px;\\n    line-height: 19px;\\n    padding-left: 25px;\\n    text-transform: uppercase;\\n    border-radius: 4px;\\n    background: rgba(232, 232, 232, 0.55);\\n  }\\n\\n  .navbar input::placeholder {\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: rgba(0, 0, 0, 0.2);\\n  }\\n\\n  .navbar input:focus::placeholder {\\n    font-size: 16px;\\n    line-height: 19px;\\n    color: rgba(55, 55, 55, 0.1);\\n  }\\n\\n  .navbarSearch {\\n    margin-left: 25px;\\n    position: relative;\\n    margin-bottom: 10px;\\n    margin-right: 121px;\\n  }\\n\\n  .navbarLogo {\\n    cursor: pointer;\\n    margin-left: 119px;\\n    margin-bottom: 3px;\\n    margin-right: 100px;\\n  }\\n\\n  .search {\\n    top: 16px;\\n    right: 14px;\\n    cursor: pointer;\\n    position: absolute;\\n  }\\n\\n  .dividerInput {\\n    top: 8px;\\n    right: 49px;\\n    height: 34px;\\n    position: absolute;\\n    border: 0.5px solid rgba(55, 55, 55, 0.28);\\n  }\\n\\n  .menu {\\n    display: none;\\n  }\\n\\n  .arrow {\\n    display: none;\\n  }\\n}\\n\\n/* Styles for mobile */\\n\\n@media (max-width: 768px) {\\n  .navbarContainer {\\n    width: 100%;\\n    z-index: 50;\\n    height: 60px;\\n    position: static;\\n    background-color: white;\\n  }\\n\\n  .navbarSections {\\n    display: flex;\\n    position: absolute;\\n    margin-top: 60px;\\n    width: 100%;\\n    z-index: 60;\\n    flex-direction: column;\\n    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.61);\\n    outline: none;\\n  }\\n\\n  .navbarSection,\\n  .navbarSectionActive {\\n    height: 60px;\\n    border: none;\\n    display: flex;\\n    color: white;\\n    padding: 0 30px;\\n    font-size: 15px;\\n    font-weight: 500;\\n    align-items: center;\\n    text-decoration: none;\\n    text-transform: uppercase;\\n    background-color: #6788ff;\\n    justify-content: space-between;\\n    outline: none;\\n  }\\n\\n  .navbarSection:active {\\n    background-color: rgb(144, 168, 255);\\n    outline: none;\\n  }\\n\\n  .navbarSearch input {\\n    display: none;\\n  }\\n\\n  .navbarSearchMobile input {\\n    width: 100%;\\n    height: 60px;\\n    border: none;\\n    outline: none;\\n    font-size: 16px;\\n    line-height: 19px;\\n    padding-left: 55px;\\n    text-transform: uppercase;\\n    border-radius: 4px;\\n    background: rgba(232, 232, 232, 0.55);\\n  }\\n\\n  .navbar input::placeholder {\\n    display: none;\\n  }\\n\\n  .navbarSearchMobile {\\n    position: relative;\\n    text-transform: uppercase;\\n  }\\n\\n  .navbarLogo {\\n    top: 16px;\\n    left: 20px;\\n    width: 100px;\\n    position: absolute;\\n  }\\n  .search {\\n    display: none;\\n  }\\n  .searchActive {\\n    top: 20px;\\n    right: 20px;\\n    cursor: pointer;\\n    position: absolute;\\n  }\\n\\n  .searchMobile {\\n    top: 20px;\\n    right: 60px;\\n    cursor: pointer;\\n    position: absolute;\\n  }\\n\\n  .arrow {\\n    height: 12px;\\n  }\\n\\n  .menu {\\n    top: 21px;\\n    right: 16px;\\n    height: 18px;\\n    position: absolute;\\n  }\\n\\n  .close {\\n    top: 21px;\\n    right: 21px;\\n    height: 19px;\\n    position: absolute;\\n  }\\n  .dividerInput {\\n    display: none;\\n  }\\n  .dividerInputMobile {\\n    top: 13px;\\n    right: 55px;\\n    height: 34px;\\n    position: absolute;\\n    border: 0.5px solid rgba(55, 55, 55, 0.28);\\n  }\\n  .prev {\\n    position: absolute;\\n    top: 25px;\\n    left: 20px;\\n  }\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/navbar/navbar.css?");

/***/ }),

/***/ "./src/components/navbar/navbar.js":
/*!*****************************************!*\
  !*** ./src/components/navbar/navbar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _navbar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar.css */ \"./src/components/navbar/navbar.css\");\n/* harmony import */ var _navbar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_navbar_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/dropdown/dropdown */ \"./src/components/navbar/components/dropdown/dropdown.js\");\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/logo.svg */ \"./src/components/navbar/assets/logo.svg\");\n/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_logo_svg__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/menu.svg */ \"./src/components/navbar/assets/menu.svg\");\n/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/close.svg */ \"./src/components/navbar/assets/close.svg\");\n/* harmony import */ var _assets_close_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_close_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_search_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/search.svg */ \"./src/components/navbar/assets/search.svg\");\n/* harmony import */ var _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_search_svg__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/right-arrow.svg */ \"./src/components/navbar/assets/right-arrow.svg\");\n/* harmony import */ var _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/prev.svg */ \"./src/components/navbar/assets/prev.svg\");\n/* harmony import */ var _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_prev_svg__WEBPACK_IMPORTED_MODULE_11__);\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/components/navbar/navbar.js\";\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass Navbar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n\n    this.handleClick = (e, path) => {\n      e.preventDefault();\n\n      if (this.state.statusMenu) {\n        this.setState({\n          statusMenu: false\n        });\n      }\n    };\n\n    this.handleFocus = e => {\n      e.preventDefault();\n      if (this.state.inputValue) this.setState({\n        statusMenu: true\n      });\n    };\n\n    this.state = {\n      openMenu: false,\n      inputValue: \"\",\n      products: {\n        name: [],\n        partNumber: []\n      },\n      openSearch: false,\n      statusMenu: false\n    };\n    this.handleMenu = this.handleMenu.bind(this);\n    this.handleChange = this.handleChange.bind(this);\n    this.handleSearch = this.handleSearch.bind(this);\n  }\n\n  componentDidMount() {\n    if (this.props.width >= 768) this.setState({\n      openMenu: true\n    });\n  }\n\n  componentDidUpdate(prevProps) {\n    if (prevProps.page !== this.props.page) {\n      this.setState({\n        inputValue: \"\",\n        products: {\n          name: [],\n          partNumber: []\n        }\n      });\n    }\n\n    if (prevProps.page !== this.props.page && this.props.width <= 768) {\n      this.setState({\n        openMenu: false\n      });\n    }\n\n    if (prevProps.width !== this.props.width && this.props.width > 767) {\n      this.setState({\n        openMenu: true\n      });\n    }\n  }\n\n  handleSearch(e) {\n    e.preventDefault();\n    this.setState(({\n      openSearch\n    }) => ({\n      openSearch: !openSearch,\n      openMenu: false\n    }));\n  }\n\n  handleMenu(e) {\n    e.preventDefault();\n    this.setState(({\n      openMenu\n    }) => ({\n      openMenu: !openMenu\n    }));\n  }\n\n  handleChange(e) {\n    e.preventDefault();\n    this.setState({\n      inputValue: e.target.value\n    });\n    if (e.target.value === \"\") this.setState({\n      products: {\n        name: [],\n        partNumber: []\n      },\n      statusMenu: false\n    });else {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"\".concat(this.props.apiUrl, \"/api/products?q=\").concat(e.target.value)).then(res => res.data).then(products => {\n        this.setState({\n          products,\n          statusMenu: true\n        });\n      });\n    }\n  }\n\n  render() {\n    const width = this.props.width;\n    const _this$state = this.state,\n          openMenu = _this$state.openMenu,\n          products = _this$state.products,\n          openSearch = _this$state.openSearch,\n          inputValue = _this$state.inputValue,\n          statusMenu = _this$state.statusMenu;\n    const page = this.props.page;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarContainer\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 109\n      },\n      __self: this\n    }, statusMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dropdownAbsolute\",\n      onClick: this.handleClick,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 111\n      },\n      __self: this\n    }) : null, openSearch ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: \"/\",\n      id: \"navbarHome\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 114\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_logo_svg__WEBPACK_IMPORTED_MODULE_6___default.a,\n      alt: \"logo\",\n      className: \"navbarLogo\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 115\n      },\n      __self: this\n    })), openMenu ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSections\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 119\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page === \"/about\" ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/about\",\n      id: \"navbarAbout\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 120\n      },\n      __self: this\n    }, \"about us\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 128\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page.includes(\"/products\") ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/products\",\n      id: \"navbarProducts\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 130\n      },\n      __self: this\n    }, \"products\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 140\n      },\n      __self: this\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      className: page === \"/contact\" ? \"navbarSectionActive\" : \"navbarSection\",\n      to: \"/contact\",\n      id: \"navbarContact\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 152\n      },\n      __self: this\n    }, \"contact\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_right_arrow_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n      alt: \"arrow\",\n      className: \"arrow\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 160\n      },\n      __self: this\n    }))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSearch\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 164\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dividerInput\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 165\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"search\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 166\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 167\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\",\n      placeholder: \"VM-HL28\",\n      value: inputValue,\n      onChange: this.handleChange,\n      onFocus: this.handleFocus,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 168\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      products: products,\n      statusMenu: statusMenu,\n      handleClickProduct: this.handleClickProduct,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 175\n      },\n      __self: this\n    }))), width < 768 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 183\n      },\n      __self: this\n    }, openSearch ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"navbarSearchMobile\",\n      onScroll: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 185\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"dividerInputMobile\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 186\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_prev_svg__WEBPACK_IMPORTED_MODULE_11___default.a,\n      alt: \"search\",\n      className: \"prev\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 187\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"searchActive\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 193\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\",\n      placeholder: \"VM-HL28\",\n      value: inputValue,\n      onChange: this.handleChange,\n      autoFocus: true,\n      onFocus: this.handleFocus,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 199\n      },\n      __self: this\n    })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 209\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: _assets_search_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n      alt: \"search\",\n      className: \"searchMobile\",\n      onClick: this.handleSearch,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 210\n      },\n      __self: this\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: openMenu ? _assets_close_svg__WEBPACK_IMPORTED_MODULE_8___default.a : _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default.a,\n      alt: openMenu ? \"close\" : \"menu\",\n      className: openMenu ? \"close\" : \"menu\",\n      onClick: this.handleMenu,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 216\n      },\n      __self: this\n    }))) : null);\n  }\n\n}\n\nconst mapStateToProps = state => {\n  return {\n    apiUrl: state.configReducer.config.apiUrl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(mapStateToProps, null)(Navbar));\n\n//# sourceURL=webpack:///./src/components/navbar/navbar.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n\nif (true) {\n  module.hot.accept(/*! ./server */ \"./src/server/index.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (() => {\n    console.log(\"Server reloading...\");\n\n    try {\n      app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n    } catch (error) {// Do nothing\n    }\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));\n}\n\nexpress__WEBPACK_IMPORTED_MODULE_0___default()().use((req, res) => app.handle(req, res)).listen(\"3000\" || false, () => {\n  console.log(\"React SSR App is running: http://localhost:\".concat(\"3000\" || false));\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/reducers/config.js":
/*!********************************!*\
  !*** ./src/reducers/config.js ***!
  \********************************/
/*! exports provided: USERS_LOADED, default, fetchUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USERS_LOADED\", function() { return USERS_LOADED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return reducer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUsers\", function() { return fetchUsers; });\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic-fetch */ \"isomorphic-fetch\");\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\nconst USERS_LOADED = \"@ssr/users/loaded\";\nconst initialState = {\n  config: {\n    applicationName: \"react template\",\n    apiUrl: \"http://ec2-54-145-122-152.compute-1.amazonaws.com:8080\",\n    categories: [{\n      name: \"Monitor Arms\",\n      url: \"Monitor Arms\",\n      categories: [{\n        title: \"Number of Monitors\",\n        type: \"title and categories\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Single\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Dual\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Triple\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Quadruple\"\n        }]\n      }, {\n        type: \"title and categories\",\n        title: \"Screen Size\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Small (Below 21”)\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Medium (21” to 27”)\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"Large (Above 27”)\"\n        }]\n      }, {\n        type: \"title and categories\",\n        title: \"Monitor Weight\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"<17.6lbs>\"\n        }, {\n          type: \"selectionable categorie\",\n          name: \"<22lbs>\"\n        }]\n      }]\n    }, {\n      name: \"Tablet Mounts\",\n      url: \"Tablet Mounts\",\n      categories: [{\n        type: \"selectionable categorie\",\n        name: \"IPAD\"\n      }]\n    }, {\n      name: \"Tv Mounts\",\n      url: \"Tv Mounts\",\n      categories: [{\n        name: \"Fixed Mount\",\n        url: \"Tv Mounts;Fixed Mount\",\n        type: \"categorie\",\n        categories: [{\n          title: \"TV Size\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Small (32” and under)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Medium (32” to 47”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Large (47” to 60”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Extra Large (61” and over)\"\n          }]\n        }]\n      }, {\n        name: \"Tilt Mount\",\n        url: \"Tv Mounts;Tilt Mount\",\n        type: \"categorie\",\n        categories: [{\n          title: \"TV Size\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Small (32” and under)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Medium (32” to 47”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Large (47” to 60”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Extra Large (61” and over)\"\n          }]\n        }]\n      }, {\n        name: \"Full Motion Mount\",\n        url: \"Tv Mounts;Full Motion Mount\",\n        type: \"categorie\",\n        categories: [{\n          title: \"TV Size\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Small (32” and under)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Medium (32” to 47”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Large (47” to 60”)\"\n          }, {\n            type: \"selectionable categorie\",\n            name: \"Extra Large (61” and over)\"\n          }]\n        }]\n      }]\n    }, {\n      name: \"Tv Carts/Stands\",\n      url: \"Tv Carts/Stands\",\n      categories: [{\n        type: \"selectionable categorie\",\n        name: \"Non-Motorized TV Cart\"\n      }, {\n        type: \"selectionable categorie\",\n        name: \"Motorized TV Carts\"\n      }, {\n        type: \"selectionable categorie\",\n        name: \"Mobile AV Cabinet\"\n      }]\n    }, {\n      name: \"Projector Mounts\",\n      url: \"Projector Mounts\",\n      categories: [{\n        type: \"selectionable categorie\",\n        name: \"Ceiling Mount\"\n      }, {\n        type: \"selectionable categorie\",\n        name: \"Wall Mount\"\n      }]\n    }, {\n      name: \"Desk Risers\",\n      url: \"Desk Risers\",\n      categories: [{\n        type: \"selectionable categorie\",\n        name: \"Slim Riser\"\n      }, {\n        title: \"Standard Riser\",\n        type: \"title and categories\",\n        categories: [{\n          type: \"selectionable categorie\",\n          name: \"Manual Adjustable\"\n        }, {\n          title: \"Motorized Adjustable\",\n          type: \"title and categories\",\n          categories: [{\n            type: \"selectionable categorie\",\n            name: \"Laptop and monitor combo\"\n          }]\n        }]\n      }]\n    }, {\n      type: \"selectionable categorie\",\n      url: \"Electric Height Adjustable Desks\",\n      name: \"Electric Height Adjustable Desks\"\n    }]\n  }\n};\nfunction reducer(state = initialState, action) {\n  switch (action.type) {\n    case USERS_LOADED:\n      return Object.assign({}, state, {\n        config: action.config\n      });\n\n    default:\n      return state;\n  }\n}\nconst fetchUsers = () => dispatch => {\n  return fetch(\"https://api.myjson.com/bins/168d2n\").then(res => {\n    return res.json();\n  }).then(config => {\n    dispatch({\n      type: USERS_LOADED,\n      config\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/reducers/config.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./src/reducers/config.js\");\n\n\nconst rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  configReducer: _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (rootReducer);\n\n//# sourceURL=webpack:///./src/reducers/index.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middleware_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware/html */ \"./src/server/middleware/html.js\");\n/* harmony import */ var _middleware_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware/render */ \"./src/server/middleware/render.js\");\n/* harmony import */ var _middleware_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middleware/store */ \"./src/server/middleware/store.js\");\n\n\n\n\n\nconst publicPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/public');\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(publicPath));\napp.use(Object(_middleware_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\napp.use(Object(_middleware_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"])());\napp.use(Object(_middleware_render__WEBPACK_IMPORTED_MODULE_3__[\"default\"])());\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/html.js":
/*!***************************************!*\
  !*** ./src/server/middleware/html.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst htmlMiddleware = () => (req, res, next) => {\n  const publicPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '/public');\n  fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(\"\".concat(publicPath, \"/app.html\"), 'utf8', (err, html) => {\n    if (!err) {\n      req.html = html;\n      next();\n    } else {\n      res.status(500).send('Error parsing app.html');\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/html.js?");

/***/ }),

/***/ "./src/server/middleware/render.js":
/*!*****************************************!*\
  !*** ./src/server/middleware/render.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ \"escape-string-regexp\");\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../App */ \"./src/App.js\");\nvar _jsxFileName = \"/Users/lucasescudero/Plaforma5/lumartex-proyect/src/server/middleware/render.js\";\n\n\n\n\n\n\n\n\nconst renderMiddleware = () => (req, res) => {\n  let html = req.html;\n  const routerContext = {};\n  const store = req.store;\n  const htmlContent = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n    store: store,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"StaticRouter\"], {\n    location: req.url,\n    context: routerContext,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17\n    },\n    __self: undefined\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 18\n    },\n    __self: undefined\n  }))));\n  const htmlReplacements = {\n    HTML_CONTENT: htmlContent,\n    PRELOADED_STATE: serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default()(store.getState(), {\n      isJSON: true\n    })\n  };\n  Object.keys(htmlReplacements).forEach(key => {\n    const value = htmlReplacements[key];\n    html = html.replace(new RegExp('__' + escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default()(key) + '__', 'g'), value);\n  });\n\n  if (routerContext.url) {\n    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');\n    res.header('Pragma', 'no-cache');\n    res.header('Expires', 0);\n    res.redirect(302, routerContext.url);\n  } else {\n    res.send(html);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/render.js?");

/***/ }),

/***/ "./src/server/middleware/store.js":
/*!****************************************!*\
  !*** ./src/server/middleware/store.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reducers */ \"./src/reducers/index.js\");\n\n\n\nconst configureStore = () => {\n  const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  return store;\n};\n\nconst storeMiddleware = () => (req, res, next) => {\n  const store = configureStore();\n  req.store = store;\n  next();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storeMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/store.js?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! /Users/lucasescudero/Plaforma5/lumartex-proyect/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "escape-string-regexp":
/*!***************************************!*\
  !*** external "escape-string-regexp" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"escape-string-regexp\");\n\n//# sourceURL=webpack:///external_%22escape-string-regexp%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-fetch\");\n\n//# sourceURL=webpack:///external_%22isomorphic-fetch%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-alice-carousel":
/*!***************************************!*\
  !*** external "react-alice-carousel" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-alice-carousel\");\n\n//# sourceURL=webpack:///external_%22react-alice-carousel%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "react-slick":
/*!******************************!*\
  !*** external "react-slick" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-slick\");\n\n//# sourceURL=webpack:///external_%22react-slick%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ })

/******/ });