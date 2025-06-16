/*! This file was automatically generated using webpack, based on src/plugin */
/******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
        /***/ 40: 
        /***/ (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.defer = defer, exports.deferDelete = function deferDelete(deletable) {
                return defer((() => deletable.delete())), deletable;
            }, exports.runDeferred = function runDeferred() {
                for (let lambda of deferred.reverse()) lambda();
            }
            /***/;
            let deferred = [];
            function defer(lambda) {
                deferred.push(lambda);
            }
        },
        /***/ 93: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadGltfImport = function loadGltfImport() {
                (0, defer_1.deferDelete)(new Action("import_gltf_weights", {
                    name: "Import glTF Model",
                    icon: "icon-gltf",
                    category: "file",
                    click() {}
                }));
                let importMenuChildren = MenuBar.menus.file.structure.find((x => "import" === x.id)).children, objImportItemIndex = importMenuChildren.findIndex((x => ("string" == typeof x ? x : x.id).startsWith("import_obj")));
                importMenuChildren.splice(objImportItemIndex + 1, 0, "import_gltf_weights"), (0, 
                defer_1.defer)((() => importMenuChildren.splice(importMenuChildren.indexOf("import_gltf_weights"), 1)));
            };
            const defer_1 = __webpack_require__(40);
        }
        /***/ ,
        /***/ 193: 
        /***/ function(__unused_webpack_module, exports, __webpack_require__) {
            "use strict";
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    default: mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadSkinnedMeshPreview = function loadSkinnedMeshPreview() {
                (0, replace_method_1.replaceMethod)(Mesh.preview_controller, "updateTransform", (function(original, element) {
                    if (!1 === (0, util_1.isVertexWeightEnabledFor)(Project)) return original(element);
                    element.mesh instanceof THREE.SkinnedMesh || function replaceElementMeshWithSkinnedMesh(element) {
                        let oldMesh = element.mesh, parent = oldMesh.parent;
                        oldMesh.removeFromParent();
                        let skinnedMesh = new THREE.SkinnedMesh(oldMesh.geometry, oldMesh.material);
                        if (Project.nodes_3d[element.uuid] = skinnedMesh, null == parent || parent.add(skinnedMesh), 
                        skinnedMesh.name = element.uuid, skinnedMesh.type = element.type, skinnedMesh.isElement = !0, 
                        skinnedMesh.geometry.setAttribute("highlight", oldMesh.geometry.getAttribute("highlight")), 
                        skinnedMesh.outline = oldMesh.outline, skinnedMesh.add(skinnedMesh.outline), skinnedMesh.vertex_points = oldMesh.vertex_points, 
                        (0, replace_method_1.replaceMethod)(skinnedMesh, "boneTransform", (function(original, t, e) {
                            return original(t, e);
                        })), null == (null === Project || void 0 === Project ? void 0 : Project.skeleton)) {
                            let rootBone = new THREE.Bone, childBone = new THREE.Bone;
                            childBone.position.x = 10, rootBone.add(childBone), Project.skeleton = new THREE.Skeleton([ rootBone, childBone ]), 
                            Canvas.scene.add(Project.skeleton.bones[0]);
                        }
                        skinnedMesh.geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(new Array(720).fill(0).flatMap((() => [ 0, 1, 0, 0 ])), 4)), 
                        skinnedMesh.geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(new Array(720).fill(0).flatMap((() => [ 0, 1, 0, 0 ])), 4)), 
                        skinnedMesh.add(Project.skeleton.bones[0]), skinnedMesh.bindMode = "detached", skinnedMesh.bind(Project.skeleton);
                    }(element), original(element);
                })), (0, replace_method_1.replaceMethod)(Mesh.preview_controller, "updateGeometry", (function(original, element) {
                    if (!1 === (0, util_1.isVertexWeightEnabledFor)(Project)) return original(element);
                    original(element), element.mesh instanceof THREE.SkinnedMesh && function updateSkinnedMeshAttributes(element) {
                        let vertex = new THREE.Vector3, skinWeights = [];
                        for (let i = 0; i < element.mesh.geometry.attributes.position.count; i++) {
                            vertex.fromBufferAttribute(element.mesh.geometry.attributes.position, i);
                            let skinWeight = vertex.y / 10;
                            skinWeight = Math.min(Math.max(skinWeight, 0), 1), skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
                        }
                        element.mesh.geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));
                    }(element);
                })), (0, replace_method_1.replaceMethod)(Group.preview_controller, "setup", (function(original, group) {
                    if (!1 === (0, util_1.isVertexWeightEnabledFor)(Project)) return original(group);
                    let bone = new THREE.Bone;
                    bone.name = group.uuid, bone.isGroup = !0, Project.nodes_3d[group.uuid] = bone, 
                    this.dispatchEvent("update_transform", {
                        group
                    });
                })), (0, defer_1.deferDelete)(Blockbench.on("select_project", (() => {
                    initOrDestroyPreview();
                }))), (0, defer_1.deferDelete)(Blockbench.on("update_settings", (() => {
                    initOrDestroyPreview();
                }))), initOrDestroyPreview();
            };
            const defer_1 = __webpack_require__(40), replace_method_1 = __webpack_require__(740), util_1 = __webpack_require__(266);
            __importDefault(__webpack_require__(585));
            function replaceRootWithBone() {
                if (null == (null === Project || void 0 === Project ? void 0 : Project.model_3d) || Project.model_3d instanceof THREE.Bone) return;
                let oldRoot = Project.model_3d, newRoot = new THREE.Bone;
                newRoot.name = oldRoot.name;
                for (let child of oldRoot.children) oldRoot.remove(child), newRoot.add(child);
                ProjectData[Project.uuid].model_3d = newRoot, scene.remove(oldRoot), scene.add(newRoot);
            }
            function initOrDestroyPreview() {
                null != Project && ((0, util_1.isVertexWeightEnabledFor)(Project) && null == Project.skeleton ? function initializePreview() {
                    if (null == Project) return;
                    replaceRootWithBone();
                }() : !1 === (0, util_1.isVertexWeightEnabledFor)(Project) && Project.skeleton);
            }
        },
        /***/ 266: 
        /***/ (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.isVertexWeightEnabledFor = function isVertexWeightEnabledFor(project) {
                return null != (null == project ? void 0 : project.vertex_weights) && "disabled" !== project.vertex_weights;
            }
            /***/;
        },
        /***/ 314: 
        /***/ module => {
            "use strict";
            /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/            module.exports = function(cssWithMappingToString) {
                var list = [];
                // return the list of modules as css string
                                return list.toString = function toString() {
                    return this.map((function(item) {
                        var content = "", needLayer = void 0 !== item[5];
                        return item[4] && (content += "@supports (".concat(item[4], ") {")), item[2] && (content += "@media ".concat(item[2], " {")), 
                        needLayer && (content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {")), 
                        content += cssWithMappingToString(item), needLayer && (content += "}"), item[2] && (content += "}"), 
                        item[4] && (content += "}"), content;
                    })).join("");
                }, 
                // import a list of modules into the list
                list.i = function i(modules, media, dedupe, supports, layer) {
                    "string" == typeof modules && (modules = [ [ null, modules, void 0 ] ]);
                    var alreadyImportedModules = {};
                    if (dedupe) for (var k = 0; k < this.length; k++) {
                        var id = this[k][0];
                        null != id && (alreadyImportedModules[id] = !0);
                    }
                    for (var _k = 0; _k < modules.length; _k++) {
                        var item = [].concat(modules[_k]);
                        dedupe && alreadyImportedModules[item[0]] || (void 0 !== layer && (void 0 === item[5] || (item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}")), 
                        item[5] = layer), media && (item[2] ? (item[1] = "@media ".concat(item[2], " {").concat(item[1], "}"), 
                        item[2] = media) : item[2] = media), supports && (item[4] ? (item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}"), 
                        item[4] = supports) : item[4] = "".concat(supports)), list.push(item));
                    }
                }, list;
            };
        }
        /***/ ,
        /***/ 351: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadBlenderIntegration = function loadBlenderIntegration() {
                (0, defer_1.deferDelete)(new Action("joint_pain_blender_integration", {
                    name: "Setup Blender animation integration...",
                    icon: "rheumatology",
                    category: "tools",
                    click() {}
                }));
            }
            /***/;
            const defer_1 = __webpack_require__(40);
        },
        /***/ 361: 
        /***/ function(__unused_webpack_module, exports, __webpack_require__) {
            "use strict";
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    default: mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadWeightsMode = function loadWeightsMode() {
                (0, defer_1.deferDelete)(new Mode("weights", {
                    name: "Weights",
                    category: "navigate",
                    condition: {
                        formats: [ "free" ]
                    },
                    selectElements: !1,
                    onSelect() {},
                    onUnselect() {}
                })), Panels.outliner.condition.modes.push("weights"), (0, defer_1.deferDelete)(new Panel("vertex-weights", {
                    name: "Weights",
                    icon: "rheumatology",
                    condition: {
                        formats: [ "free" ],
                        modes: [ "weights" ]
                    },
                    default_position: {
                        slot: "bottom",
                        float_position: [ 100, 400 ],
                        float_size: [ 600, 300 ],
                        height: 260
                    },
                    component: WeightsPanel_vue_1.default
                })), (0, defer_1.deferDelete)(new Panel("weights-preview", {
                    icon: "movie",
                    name: "Preview Animation",
                    condition: {
                        formats: [ "free" ],
                        modes: [ "weights" ]
                    },
                    default_position: {
                        slot: "left_bar",
                        float_position: [ 0, 0 ],
                        float_size: [ 300, 400 ],
                        height: 400
                    }
                }));
            };
            const defer_1 = __webpack_require__(40), WeightsPanel_vue_1 = __importDefault(__webpack_require__(827));
        },
        /***/ 490: 
        /***/ (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__), 
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__
                /* harmony export */            });
            /* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =  __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314), ___CSS_LOADER_EXPORT___ =  __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            /* harmony import */            
            // Module
            ___CSS_LOADER_EXPORT___.push([ module.id, '\n.jp-weights-panel[data-v-49659108] {\n    overflow: scroll;\n    background-image: repeating-linear-gradient(to right, var(--color-dark) 0px, var(--color-dark) 300px, var(--color-back) 300px, var(--color-back) 600px);\n    background-position: -100px 0;\n}\n.jp-weights-panel .icon[data-v-49659108] {\n    vertical-align: text-top;\n}\n.jp-weights-table .jp-parent-indicator[data-v-49659108] {\n    font-weight: normal;\n    font-style: italic;\n    font-size: 0.9em;\n}\n.jp-weights-table .jp-parent-name[data-v-49659108] {\n    font-weight: bold;\n}\n.jp-weights-table .jp-group-header .jp-group-remove[data-v-49659108] {\n    opacity: 0;\n    cursor: pointer;\n}\n.jp-weights-table .jp-group-header:hover .jp-group-remove[data-v-49659108] {\n    background-color: var(--color-button);\n    opacity: 1;\n}\n.jp-weights-table .jp-group-header:hover .jp-group-remove[data-v-49659108]:hover {\n    background-color: var(--color-accent);\n    color: var(--color-accent_text);\n}\n.jp-weights-table .jp-vertex-row[data-v-49659108] {\n    height: 30px;\n}\n.jp-weights-table .jp-weight-vertex-cell[data-v-49659108] {\n    text-align: center;\n    width: calc(200px / 3);\n}\n.jp-weights-table .jp-weight-percentage-cell[data-v-49659108] {\n    width: 300px;\n}\n.jp-weights-table .jp-weight-percentage-cell input[data-v-49659108] {\n    text-align: right;\n}\n.jp-weights-table .jp-weight-percentage-cell.jp-has-influence[data-v-49659108] {\n    background-color: var(--group-color-dark);\n    color: var(--color-accent_text);\n}\n.jp-weights-table .jp-weight-percentage-cell.jp-no-influence[data-v-49659108] {\n    background-color: var(--color-dark);\n}\n.jp-corner[data-v-49659108] {\n    position: relative;\n}\n.jp-corner[data-v-49659108]::before {\n    content: "";\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    right: 0;\n    border-width: 4px;\n    border-style: solid;\n    border-color: var(--corner-color);\n    border-bottom-color: transparent !important;\n    border-left-color: transparent !important;\n}\n', "" ]);
            // Exports
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
            /***/        },
        /***/ 534: 
        /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            // EXPORTS
                        // ./node_modules/vue-style-loader/lib/listToStyles.js
            /**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
            function listToStyles(parentId, list) {
                for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                    var item = list[i], id = item[0], part = {
                        id: parentId + ":" + i,
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3]
                    };
                    newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                        id,
                        parts: [ part ]
                    });
                }
                return styles;
            }
            __webpack_require__.d(__webpack_exports__, {
                A: () => /* binding */ addStylesClient
            });
            // ./node_modules/vue-style-loader/lib/addStylesClient.js
            /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/
            var hasDocument = "undefined" != typeof document;
            if ("undefined" != typeof DEBUG && DEBUG && !hasDocument) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
            /*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/            var stylesInDom = {
                /*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}, head = hasDocument && (document.head || document.getElementsByTagName("head")[0]), singletonElement = null, singletonCounter = 0, isProduction = !1, noop = function() {}, options = null, ssrIdKey = "data-vue-ssr-id", isOldIE = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
            function addStylesClient(parentId, list, _isProduction, _options) {
                isProduction = _isProduction, options = _options || {};
                var styles = listToStyles(parentId, list);
                return addStylesToDom(styles), function update(newList) {
                    for (var mayRemove = [], i = 0; i < styles.length; i++) {
                        var item = styles[i];
                        (domStyle = stylesInDom[item.id]).refs--, mayRemove.push(domStyle);
                    }
                    newList ? addStylesToDom(styles = listToStyles(parentId, newList)) : styles = [];
                    for (i = 0; i < mayRemove.length; i++) {
                        var domStyle;
                        if (0 === (domStyle = mayRemove[i]).refs) {
                            for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                            delete stylesInDom[domStyle.id];
                        }
                    }
                };
            }
            function addStylesToDom(styles /* Array<StyleObject> */) {
                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    if (domStyle) {
                        domStyle.refs++;
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                        for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j]));
                        domStyle.parts.length > item.parts.length && (domStyle.parts.length = item.parts.length);
                    } else {
                        var parts = [];
                        for (j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j]));
                        stylesInDom[item.id] = {
                            id: item.id,
                            refs: 1,
                            parts
                        };
                    }
                }
            }
            function createStyleElement() {
                var styleElement = document.createElement("style");
                return styleElement.type = "text/css", head.appendChild(styleElement), styleElement;
            }
            function addStyle(obj /* StyleObjectPart */) {
                var update, remove, styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');
                if (styleElement) {
                    if (isProduction) 
                    // has SSR styles and in production mode.
                    // simply do nothing.
                    return noop;
                    // has SSR styles but in dev mode.
                    // for some reason Chrome can't handle source map in server-rendered
                    // style tags - source maps in <style> only works if the style tag is
                    // created and inserted dynamically. So we remove the server rendered
                    // styles and inject new ones.
                    styleElement.parentNode.removeChild(styleElement);
                }
                if (isOldIE) {
                    // use singleton mode for IE9.
                    var styleIndex = singletonCounter++;
                    styleElement = singletonElement || (singletonElement = createStyleElement()), update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), 
                    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
                } else 
                // use multi-style-tag mode in all other cases
                styleElement = createStyleElement(), update = applyToTag.bind(null, styleElement), 
                remove = function() {
                    styleElement.parentNode.removeChild(styleElement);
                };
                return update(obj), function updateStyle(newObj /* StyleObjectPart */) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                        update(obj = newObj);
                    } else remove();
                };
            }
            var textStore, replaceText = (textStore = [], function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            });
            function applyToSingletonTag(styleElement, index, remove, obj) {
                var css = remove ? "" : obj.css;
                if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                    var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                    childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
                }
            }
            function applyToTag(styleElement, obj) {
                var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
                if (media && styleElement.setAttribute("media", media), options.ssrId && styleElement.setAttribute(ssrIdKey, obj.id), 
                sourceMap && (
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */", 
                // http://stackoverflow.com/a/26603875
                css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), 
                styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                    for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                    styleElement.appendChild(document.createTextNode(css));
                }
            }
            /***/        },
        /***/ 585: 
        /***/ module => {
            "use strict";
            module.exports = "// Vertex shader that will replace the one used on textures\r\n// Based on texture.js @ 64\r\n// Edited to add skinning\r\n// Also changed the antialising bleed fix to an ifdef\r\n// Note that we use MAX_BONES_JP instead of THREE.js's normal MAX_BONES\r\n// because it's forcefully inserting a stupid value like 1024\r\n// and we can't change that.\r\n\r\nattribute float highlight;\r\n\r\nuniform bool SHADE;\r\nuniform int LIGHTSIDE;\r\n\r\n#ifdef USE_SKINNING\r\nuniform mat4 boneMatrices[ MAX_BONES_JP ];\r\n#endif\r\n\r\n#ifdef ANTIALIAS_BLEED_FIX\r\ncentroid varying vec2 vUv;\r\n#else\r\nvarying vec2 vUv;\r\n#endif\r\n\r\nvarying float light;\r\nvarying float lift;\r\n\r\nfloat AMBIENT = 0.5;\r\nfloat XFAC = -0.15;\r\nfloat ZFAC = 0.05;\r\n\r\nvoid main()\r\n{\r\n    mat4 skinnedModelViewMatrix = modelViewMatrix;\r\n\r\n#ifdef USE_SKINNING\r\n    skinnedModelViewMatrix = viewMatrix * (\r\n        skinWeight.x * boneMatrices[int(skinIndex.x)] +\r\n        skinWeight.y * boneMatrices[int(skinIndex.y)] +\r\n        skinWeight.z * boneMatrices[int(skinIndex.z)] +\r\n        skinWeight.w * boneMatrices[int(skinIndex.w)] );\r\n#endif\r\n\r\n    if (SHADE) {\r\n\r\n        vec3 N = normalize( mat3(skinnedModelViewMatrix) * normal );\r\n\r\n        if (LIGHTSIDE == 1) {\r\n            float temp = N.y;\r\n            N.y = N.z * -1.0;\r\n            N.z = temp;\r\n        }\r\n        if (LIGHTSIDE == 2) {\r\n            float temp = N.y;\r\n            N.y = N.x;\r\n            N.x = temp;\r\n        }\r\n        if (LIGHTSIDE == 3) {\r\n            N.y = N.y * -1.0;\r\n        }\r\n        if (LIGHTSIDE == 4) {\r\n            float temp = N.y;\r\n            N.y = N.z;\r\n            N.z = temp;\r\n        }\r\n        if (LIGHTSIDE == 5) {\r\n            float temp = N.y;\r\n            N.y = N.x * -1.0;\r\n            N.x = temp;\r\n        }\r\n\r\n        float yLight = (1.0+N.y) * 0.5;\r\n        light = yLight * (1.0-AMBIENT) + N.x*N.x * XFAC + N.z*N.z * ZFAC + AMBIENT;\r\n\r\n    } else {\r\n\r\n        light = 1.0;\r\n\r\n    }\r\n\r\n    if (highlight == 2.0) {\r\n        lift = 0.22;\r\n    } else if (highlight == 1.0) {\r\n        lift = 0.1;\r\n    } else {\r\n        lift = 0.0;\r\n    }\r\n    \r\n    vUv = uv;\r\n    vec4 mvPosition = skinnedModelViewMatrix * vec4( position, 1.0 );\r\n    gl_Position = projectionMatrix * mvPosition;\r\n}\r\n";
        }
        /***/ ,
        /***/ 601: 
        /***/ module => {
            "use strict";
            module.exports = function(i) {
                return i[1];
            };
        }
        /***/ ,
        /***/ 740: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.replaceMethod = function replaceMethod(target, key, newMethod) {
                let methodOwner;
                if ("function" == typeof target && "prototype" in target) {
                    const targetAsConstructor = target;
                    methodOwner = key in targetAsConstructor.prototype ? targetAsConstructor.prototype : targetAsConstructor;
                } else methodOwner = target;
                const oldMethod = methodOwner[key];
                if ("function" != typeof oldMethod) throw new Error(`Method ${String(key)} is not a function`);
                methodOwner[key] = function(...args) {
                    return newMethod.apply(this, [ (...bargs) => oldMethod.apply(this, bargs), ...args ]);
                }, (0, defer_1.defer)((() => {
                    methodOwner[key] = oldMethod;
                }));
            }
            /***/;
            const defer_1 = __webpack_require__(40);
        },
        /***/ 746: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadGltfExport = function loadGltfExport() {
                Codecs.gltf.export_options.jp_vertex_weights = {
                    type: "checkbox",
                    label: "Joint Pain: Export Vertex Weights (if available)",
                    value: !0
                }, (0, defer_1.defer)((() => delete Codecs.gltf.export_options.jp_vertex_weights)), 
                (0, replace_method_1.replaceMethod)(Codecs.gltf, "compile", (async function(original, options) {
                    if (!0 !== options.jp_vertex_weights || "one" !== Project.vertex_weights && "four" !== Project.vertex_weights) return await original(options);
                    options.jp_vertex_weights && (options.armature = !0);
                    let result = await original(options);
                    return "ascii" === options.encoding || options.encoding, result;
                }));
            }
            /***/;
            const defer_1 = __webpack_require__(40), replace_method_1 = __webpack_require__(740);
        },
        /***/ 827: 
        /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            // ESM COMPAT FLAG
                        __webpack_require__.r(__webpack_exports__), 
            // EXPORTS
            __webpack_require__.d(__webpack_exports__, {
                __esModule: () => /* reexport */ WeightsPanelvue_type_script_lang_ts /* __esModule */ .B,
                default: () => /* binding */ WeightsPanel
            });
            // ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./plugin/WeightsPanel.vue?vue&type=template&id=49659108&scoped=true
            var render = function render() {
                var _vm = this, _c = _vm._self._c;
                return _c("div", {
                    staticClass: "jp-weights-panel"
                }, [ _c("table", {
                    staticClass: "jp-weights-table"
                }, [ _c("tr", [ _c("th", {
                    staticStyle: {
                        "font-weight": "normal"
                    },
                    attrs: {
                        colspan: "3"
                    }
                }, [ _c("i", {
                    staticClass: "fa_big icon far fa-gem"
                }), _vm._v(" "), _c("span", {
                    style: {
                        background: _vm.mesh.backgroundGradient,
                        "border-radius": "5px",
                        color: "#cacad4",
                        "text-shadow": "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                        padding: "2px 10px",
                        "font-weight": "bold",
                        "font-size": "1.1em"
                    }
                }, [ _vm._v("\n                    " + _vm._s(_vm.mesh.name) + "\n                ") ]) ]), _vm._v(" "), _vm._l(_vm.mesh.groups, (function(group, groupIndex) {
                    return _c("th", {
                        key: groupIndex,
                        staticClass: "jp-group-header"
                    }, [ _c("span", 0 === groupIndex ? [ _c("span", {
                        staticClass: "jp-parent-indicator"
                    }, [ _vm._v("parent group") ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("i", {
                        staticClass: "material-icons notranslate icon",
                        style: {
                            color: group.color
                        }
                    }, [ _vm._v("folder") ]), _vm._v(" "), _c("span", {
                        staticClass: "jp-parent-name"
                    }, [ _vm._v(_vm._s(group.name)) ]) ] : [ _c("br"), _vm._v(" "), _c("i", {
                        staticClass: "material-icons notranslate icon",
                        style: {
                            color: group.color
                        }
                    }, [ _vm._v("folder") ]), _vm._v(" "), _c("input", {
                        attrs: {
                            type: "text"
                        },
                        domProps: {
                            value: group.name
                        },
                        on: {
                            focus: function($event) {}
                        }
                    }), _vm._v(" "), _c("i", {
                        staticClass: "jp-group-remove material-icons notranslate icon"
                    }, [ _vm._v("close") ]) ]) ]);
                })), _vm._v(" "), _vm._m(0) ], 2), _vm._v(" "), _vm._l(_vm.mesh.vertices, (function(vertex) {
                    return _c("tr", {
                        key: vertex.id,
                        staticClass: "jp-vertex-row"
                    }, [ _c("td", {
                        staticClass: "jp-weight-vertex-cell jp-corner",
                        staticStyle: {
                            "--corner-color": "var(--color-axis-x)"
                        }
                    }, [ _vm._v("\n                " + _vm._s(vertex.pos[0]) + "\n            ") ]), _vm._v(" "), _c("td", {
                        staticClass: "jp-weight-vertex-cell jp-corner",
                        staticStyle: {
                            "--corner-color": "var(--color-axis-y)"
                        }
                    }, [ _vm._v("\n                " + _vm._s(vertex.pos[1]) + "\n            ") ]), _vm._v(" "), _c("td", {
                        staticClass: "jp-weight-vertex-cell jp-corner",
                        staticStyle: {
                            "--corner-color": "var(--color-axis-z)"
                        }
                    }, [ _vm._v("\n                " + _vm._s(vertex.pos[2]) + "\n            ") ]), _vm._v(" "), _vm._l(vertex.weights, (function(weight, groupIndex) {
                        return _c("td", {
                            key: groupIndex,
                            staticClass: "jp-weight-percentage-cell",
                            class: {
                                "jp-has-influence": weight > 0,
                                "jp-no-influence": 0 === weight
                            },
                            style: {
                                "--group-color-dark": _vm.mesh.groups[groupIndex].dark
                            }
                        }, [ "one" === _vm.projectVertexWeightSetting ? _c("div", [ _c("input", {
                            attrs: {
                                type: "radio"
                            },
                            domProps: {
                                checked: weight > 0
                            }
                        }) ]) : _c("div", [ _vm._v("\n                    " + _vm._s(100 * weight) + "%\n                ") ]) ]);
                    })) ], 2);
                })) ], 2) ]);
            };
            render._withStripped = !0;
            // ./plugin/WeightsPanel.vue?vue&type=template&id=49659108&scoped=true
            // EXTERNAL MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options!./plugin/WeightsPanel.vue?vue&type=script&lang=ts
            var WeightsPanelvue_type_script_lang_ts = __webpack_require__(913);
            // ./plugin/WeightsPanel.vue?vue&type=script&lang=ts
            /* harmony default export */ const plugin_WeightsPanelvue_type_script_lang_ts = WeightsPanelvue_type_script_lang_ts /* default */ .A;
            // EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./plugin/WeightsPanel.vue?vue&type=style&index=0&id=49659108&prod&scoped=true&lang=css
                        __webpack_require__(963);
            /* normalize component */
            var component = // ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
            /* globals __VUE_SSR_CONTEXT__ */
            // IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
            // This module is a runtime utility for cleaner component module output and will
            // be included in the final webpack user bundle.
            function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier /* server only */ , shadowMode /* vue-cli only */) {
                // Vue.extend constructor export interop
                var hook, options = "function" == typeof scriptExports ? scriptExports.options : scriptExports;
                // render functions
                                if (render && (options.render = render, options.staticRenderFns = staticRenderFns, 
                options._compiled = !0), 
                // functional template
                functionalTemplate && (options.functional = !0), 
                // scopedId
                scopeId && (options._scopeId = "data-v-" + scopeId), moduleIdentifier ? (
                // server build
                hook = function(context) {
                    // 2.3 injection
                    // functional
                    // 2.2 with runInNewContext: true
                    (context = context || // cached call
                    this.$vnode && this.$vnode.ssrContext || // stateful
                    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (context = __VUE_SSR_CONTEXT__), 
                    // inject component styles
                    injectStyles && injectStyles.call(this, context), 
                    // register component module identifier for async chunk inferrence
                    context && context._registeredComponents && context._registeredComponents.add(moduleIdentifier);
                }
                // used by ssr in case component is cached and beforeCreate
                // never gets called
                , options._ssrRegister = hook) : injectStyles && (hook = shadowMode ? function() {
                    injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
                } : injectStyles), hook) if (options.functional) {
                    // for template-only hot-reload because in that case the render fn doesn't
                    // go through the normalizer
                    options._injectStyles = hook;
                    // register for functional component in vue file
                                        var originalRender = options.render;
                    options.render = function renderWithStyleInjection(h, context) {
                        return hook.call(context), originalRender(h, context);
                    };
                } else {
                    // inject component registration as beforeCreate hook
                    var existing = options.beforeCreate;
                    options.beforeCreate = existing ? [].concat(existing, hook) : [ hook ];
                }
                return {
                    exports: scriptExports,
                    options
                };
            }(plugin_WeightsPanelvue_type_script_lang_ts, render, [ function() {
                var _c = this._self._c;
                return _c("th", [ _c("br"), this._v(" "), _c("i", {
                    staticClass: "material-icons notranslate icon"
                }, [ this._v("add") ]), this._v(" "), _c("input", {
                    attrs: {
                        type: "text",
                        placeholder: "Add Group..."
                    }
                }) ]);
            } ], !1, null, "49659108", null)
            /* harmony default export */;
            const WeightsPanel = component.exports;
            /***/        },
        /***/ 913: 
        /***/ (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "B", {
                value: !0
            }), exports.A = {
                data: () => ({
                    projectVertexWeightSetting: "one",
                    mesh: {
                        name: "arm_right",
                        backgroundGradient: "hsl(200, 50%, 50%)",
                        groups: [ {
                            name: "right_arm_upper",
                            color: "hsl(200, 50%, 50%)",
                            dark: "hsl(200, 50%, 30%)"
                        }, {
                            name: "right_arm_lower",
                            color: "hsl(120, 50%, 50%)",
                            dark: "hsl(120, 50%, 30%)"
                        } ],
                        vertices: [ {
                            id: "PCxt",
                            pos: [ -4.5005, -2.5003, -3.2502 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "VzUC",
                            pos: [ -2.5, 0, 2 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "ByEv",
                            pos: [ 2.5, 0, 2 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "D1jz",
                            pos: [ -1.5, -4, 2.7 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "uePO",
                            pos: [ -3.25, 0, 0 ],
                            weights: [ 0, 1 ]
                        }, {
                            id: "Rndw",
                            pos: [ 3.25, 2.5, 0 ],
                            weights: [ 0, 1 ]
                        }, {
                            id: "jraI",
                            pos: [ -3, 0, 1.5 ],
                            weights: [ 0, 1 ]
                        }, {
                            id: "csvZ",
                            pos: [ 1.5, 2.5, 2.75 ],
                            weights: [ 0, 1 ]
                        }, {
                            id: "zObx",
                            pos: [ 1.5, 2.5, -3.25 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "oyg2",
                            pos: [ -2.5, 0, 2 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "aCrN",
                            pos: [ 2.5, 0, 2 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "zUrF",
                            pos: [ -1.5, -4, 2.7 ],
                            weights: [ 1, 0 ]
                        }, {
                            id: "lQPJ",
                            pos: [ -3.25, 0, 0 ],
                            weights: [ 0, 1 ]
                        }, {
                            id: "EFfh",
                            pos: [ 3.25, 2.5, 0 ],
                            weights: [ 0, 1 ]
                        } ]
                    }
                }),
                methods: {}
            };
        }
        /***/ ,
        /***/ 963: 
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
            // style-loader: Adds some css to the DOM by adding a <style> tag
            // load the styles
            var content = __webpack_require__(490);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [ [ module.id, content, "" ] ]), 
            content.locals && (module.exports = content.locals);
            // add the styles to the DOM
            (0, __webpack_require__(534) /* ["default"] */ .A)("506f3fdc", content, !1, {});
        }
        /***/
        /******/    }, __webpack_module_cache__ = {};
    /************************************************************************/
    /******/ // The module cache
    /******/    
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/        if (void 0 !== cachedModule) 
        /******/ return cachedModule.exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/        var module = __webpack_module_cache__[moduleId] = {
            /******/ id: moduleId,
            /******/ // no module.loaded needed
            /******/ exports: {}
            /******/        };
        /******/
        /******/ // Execute the module function
        /******/        
        /******/
        /******/ // Return the exports of the module
        /******/ return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.exports;
        /******/    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/compat get default export */
    /******/    
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = module => {
        /******/ var getter = module && module.__esModule ? 
        /******/ () => module.default
        /******/ : () => module
        /******/;
        /******/ return __webpack_require__.d(getter, {
            a: getter
        }), getter;
        /******/    }, 
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) 
        /******/ __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && 
        /******/ Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        })
        /******/;
        /******/    }, 
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
    /******/ , 
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = exports => {
        /******/ "undefined" != typeof Symbol && Symbol.toStringTag && 
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        })
        /******/ , Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }
    /******/;
    // This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
    (() => {
        "use strict";
        const defer_1 = __webpack_require__(40), skinned_mesh_preview_1 = __webpack_require__(193), gltf_import_1 = __webpack_require__(93), gltf_export_1 = __webpack_require__(746), weights_mode_1 = __webpack_require__(361), blender_integration_1 = __webpack_require__(351);
        BBPlugin.register("joint_pain", {
            title: "Joint Pain",
            author: "0x13F",
            description: "Add vertex weights to your model, akin to skeletal animation",
            icon: "rheumatology",
            version: "0.0.1",
            variant: "both",
            tags: [ "Format: Generic Model", "Animation", "Exporter" ],
            onload() {
                (0, defer_1.deferDelete)(new Property(ModelProject, "enum", "vertex_weights", {
                    label: "Joint Pain: Vertex Weights",
                    default: "disabled",
                    options: {
                        disabled: "Disabled",
                        one: "1 Weight per Vertex (Retro)",
                        four: "4 Weights per Vertex (Modern)"
                    }
                })), (0, weights_mode_1.loadWeightsMode)(), (0, skinned_mesh_preview_1.loadSkinnedMeshPreview)(), 
                (0, gltf_import_1.loadGltfImport)(), (0, gltf_export_1.loadGltfExport)(), (0, blender_integration_1.loadBlenderIntegration)();
            },
            onunload() {
                (0, defer_1.runDeferred)();
            }
        });
    })();
})
/******/ ();