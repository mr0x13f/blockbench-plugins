/*! This file was automatically generated using webpack, based on src/plugin */
/******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/    var __webpack_modules__ = {
        /***/ 40: 
        /***/ (__unused_webpack_module, exports) => {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.defer = defer, exports.deferDelete = function deferDelete(deletable) {
                return defer((() => deletable.delete())), deletable;
            }, exports.runDeferred = function runDeferred() {
                for (let lambda of deferred.reverse()) lambda();
            }, exports.deferRemoveElement = deferRemoveElement, exports.deferRemoveStyle = function deferRemoveStyle(style) {
                deferRemoveElement(document.head.appendChild(Interface.createElement("style", {
                    type: "text/css"
                }, style)));
            }
            /***/;
            let deferred = [];
            function defer(lambda) {
                deferred.push(lambda);
            }
            function deferRemoveElement(element) {
                return defer((() => {
                    var _a;
                    return null === (_a = element.parentElement) || void 0 === _a ? void 0 : _a.removeChild(element);
                })), element;
            }
        },
        /***/ 43: 
        /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            // ESM COMPAT FLAG
            __webpack_require__.r(__webpack_exports__), 
            // EXPORTS
            __webpack_require__.d(__webpack_exports__, {
                __esModule: () => /* reexport */ WeightsPanelvue_type_script_lang_ts /* __esModule */ .B,
                default: () => /* binding */ WeightsPanel
            });
            // ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./plugin/components/WeightsPanel.vue?vue&type=template&id=7f90dbc0
            var render = function render() {
                var _vm = this, _c = _vm._self._c;
                return _c("div", {
                    staticClass: "jp-weights-panel"
                }, [ _c("table", {
                    staticClass: "jp-weights-table"
                }, [ _c("tr", [ _c("th", {
                    staticStyle: {
                        "font-weight": "normal"
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
                        staticClass: "jp-weight-vertex-cell"
                    }, [ _c("div", {
                        staticClass: "jp-vertex-component jp-corner jp-corner-x"
                    }, [ _vm._v(_vm._s(vertex.pos[0])) ]), _vm._v(" "), _c("div", {
                        staticClass: "jp-vertex-component jp-corner jp-corner-y"
                    }, [ _vm._v(_vm._s(vertex.pos[1])) ]), _vm._v(" "), _c("div", {
                        staticClass: "jp-vertex-component jp-corner jp-corner-z"
                    }, [ _vm._v(_vm._s(vertex.pos[2])) ]) ]), _vm._v(" "), _vm._l(vertex.weights, (function(weight, groupIndex) {
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
            // ./plugin/components/WeightsPanel.vue?vue&type=template&id=7f90dbc0
            // EXTERNAL MODULE: ./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options!./plugin/components/WeightsPanel.vue?vue&type=script&lang=ts
            var WeightsPanelvue_type_script_lang_ts = __webpack_require__(224);
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
            }(WeightsPanelvue_type_script_lang_ts /* default */ .A, render, [ function() {
                var _c = this._self._c;
                return _c("th", [ _c("br"), this._v(" "), _c("i", {
                    staticClass: "material-icons notranslate icon"
                }, [ this._v("add") ]), this._v(" "), _c("input", {
                    attrs: {
                        type: "text",
                        placeholder: "Add Group..."
                    }
                }) ]);
            } ], !1, null, null, null)
            /* harmony default export */;
            const WeightsPanel = component.exports;
            /***/        },
        /***/ 48: 
        /***/ module => {
            module.exports = "// Vertex shader that will replace the one used on textures\r\n// Based on texture.js @ 64\r\n// Edited to add skinning\r\n// Also changed the antialising bleed fix to an ifdef\r\n// Note that we use MAX_BONES_JP instead of THREE.js's normal MAX_BONES\r\n// because it's forcefully inserting a stupid value like 1024\r\n// and we can't change that.\r\n\r\nattribute float highlight;\r\n\r\nuniform bool SHADE;\r\nuniform int LIGHTSIDE;\r\n\r\n#ifdef USE_SKINNING\r\nuniform mat4 boneMatrices[ MAX_BONES_JP ];\r\n#endif\r\n\r\n#ifdef ANTIALIAS_BLEED_FIX\r\ncentroid varying vec2 vUv;\r\n#else\r\nvarying vec2 vUv;\r\n#endif\r\n\r\nvarying float light;\r\nvarying float lift;\r\n\r\nfloat AMBIENT = 0.5;\r\nfloat XFAC = -0.15;\r\nfloat ZFAC = 0.05;\r\n\r\nvoid main()\r\n{\r\n    mat4 skinnedModelViewMatrix = modelViewMatrix;\r\n\r\n#ifdef USE_SKINNING\r\n    skinnedModelViewMatrix = viewMatrix * (\r\n        skinWeight.x * boneMatrices[int(skinIndex.x)] +\r\n        skinWeight.y * boneMatrices[int(skinIndex.y)] +\r\n        skinWeight.z * boneMatrices[int(skinIndex.z)] +\r\n        skinWeight.w * boneMatrices[int(skinIndex.w)] );\r\n#endif\r\n\r\n    if (SHADE) {\r\n\r\n        vec3 N = normalize( mat3(skinnedModelViewMatrix) * normal );\r\n\r\n        if (LIGHTSIDE == 1) {\r\n            float temp = N.y;\r\n            N.y = N.z * -1.0;\r\n            N.z = temp;\r\n        }\r\n        if (LIGHTSIDE == 2) {\r\n            float temp = N.y;\r\n            N.y = N.x;\r\n            N.x = temp;\r\n        }\r\n        if (LIGHTSIDE == 3) {\r\n            N.y = N.y * -1.0;\r\n        }\r\n        if (LIGHTSIDE == 4) {\r\n            float temp = N.y;\r\n            N.y = N.z;\r\n            N.z = temp;\r\n        }\r\n        if (LIGHTSIDE == 5) {\r\n            float temp = N.y;\r\n            N.y = N.x * -1.0;\r\n            N.x = temp;\r\n        }\r\n\r\n        float yLight = (1.0+N.y) * 0.5;\r\n        light = yLight * (1.0-AMBIENT) + N.x*N.x * XFAC + N.z*N.z * ZFAC + AMBIENT;\r\n\r\n    } else {\r\n\r\n        light = 1.0;\r\n\r\n    }\r\n\r\n    if (highlight == 2.0) {\r\n        lift = 0.22;\r\n    } else if (highlight == 1.0) {\r\n        lift = 0.1;\r\n    } else {\r\n        lift = 0.0;\r\n    }\r\n    \r\n    vUv = uv;\r\n    vec4 mvPosition = skinnedModelViewMatrix * vec4( position, 1.0 );\r\n    gl_Position = projectionMatrix * mvPosition;\r\n}\r\n";
            /***/        },
        /***/ 93: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
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
            __importDefault(__webpack_require__(48));
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
        /***/ 224: 
        /***/ (__unused_webpack_module, exports) => {
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
        /***/ 266: 
        /***/ (__unused_webpack_module, exports) => {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.isVertexWeightEnabledFor = function isVertexWeightEnabledFor(project) {
                return null != (null == project ? void 0 : project.jp_vertex_weights) && "disabled" !== project.jp_vertex_weights;
            }
            /***/;
        },
        /***/ 351: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
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
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    default: mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadWeightsMode = function loadWeightsMode() {
                (0, defer_1.deferRemoveStyle)(weights_panel_css_1.default), (0, defer_1.deferDelete)(new Mode("weights", {
                    name: "Weights",
                    category: "navigate",
                    condition: {
                        formats: [ "free" ]
                    },
                    selectElements: !1,
                    onSelect() {
                        var _a;
                        Interface.addSuggestedModifierKey("shift", "Reveal texture"), null === (_a = document.querySelector(".preview_view_mode_menu")) || void 0 === _a || _a.classList.add("jp-hidden");
                    },
                    onUnselect() {
                        var _a;
                        Interface.removeSuggestedModifierKey("shift", "Reveal texture"), null === (_a = document.querySelector(".preview_view_mode_menu")) || void 0 === _a || _a.classList.remove("jp-hidden");
                    }
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
            const defer_1 = __webpack_require__(40), WeightsPanel_vue_1 = __importDefault(__webpack_require__(43)), weights_panel_css_1 = __importDefault(__webpack_require__(868));
        },
        /***/ 740: 
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
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
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.loadGltfExport = function loadGltfExport() {
                Codecs.gltf.export_options.jp_vertex_weights = {
                    type: "checkbox",
                    label: "Joint Pain: Export Vertex Weights (if available)",
                    value: !0
                }, (0, defer_1.defer)((() => delete Codecs.gltf.export_options.jp_vertex_weights)), 
                (0, replace_method_1.replaceMethod)(Codecs.gltf, "compile", (async function(original, options) {
                    if (!0 !== options.jp_vertex_weights || "one" !== Project.jp_vertex_weights && "four" !== Project.jp_vertex_weights) return await original(options);
                    options.jp_vertex_weights && (options.armature = !0);
                    let result = await original(options);
                    return "ascii" === options.encoding || options.encoding, result;
                }));
            }
            /***/;
            const defer_1 = __webpack_require__(40), replace_method_1 = __webpack_require__(740);
        },
        /***/ 868: 
        /***/ module => {
            module.exports = '\r\n.jp-weights-panel {\r\n    overflow: scroll;\r\n    background-image: repeating-linear-gradient(to right, var(--color-dark) 0px, var(--color-dark) 300px, var(--color-back) 300px, var(--color-back) 600px);\r\n    /* Move left because first column is 200px instead of 300px */\r\n    background-position: -100px 0;\r\n}\r\n\r\n.jp-weights-panel .icon {\r\n    vertical-align: text-top;\r\n}\r\n\r\n.jp-weights-table {\r\n    border-spacing: 0;\r\n}\r\n\r\n.jp-weights-table .jp-parent-indicator {\r\n    font-weight: normal;\r\n    font-style: italic;\r\n    font-size: 0.9em;\r\n}\r\n\r\n.jp-weights-table .jp-parent-name {\r\n    font-weight: bold;\r\n}\r\n\r\n.jp-weights-table .jp-group-header .jp-group-remove {\r\n    opacity: 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.jp-weights-table .jp-group-header:hover .jp-group-remove {\r\n    background-color: var(--color-button);\r\n    opacity: 1;\r\n}\r\n\r\n.jp-weights-table .jp-group-header:hover .jp-group-remove:hover {\r\n    background-color: var(--color-accent);\r\n    color: var(--color-accent_text);\r\n}\r\n\r\n.jp-weights-table .jp-vertex-row {\r\n    height: 30px;\r\n}\r\n\r\n.jp-weights-table td,\r\n.jp-weights-table th {\r\n    min-width: 300px;\r\n    max-width: 300px;\r\n}\r\n\r\n.jp-weights-table td:first-child,\r\n.jp-weights-table th:first-child {\r\n    min-width: 200px;\r\n    max-width: 200px;\r\n}\r\n\r\n.jp-weights-table .jp-weight-vertex-cell {\r\n    text-align: center;\r\n    /* width: calc(200px / 3); */\r\n}\r\n\r\n.jp-weights-table .jp-weight-percentage-cell input {\r\n    text-align: right;\r\n}\r\n\r\n.jp-weights-table .jp-weight-percentage-cell.jp-has-influence {\r\n    background-color: var(--group-color-dark);\r\n    color: var(--color-accent_text);\r\n}\r\n\r\n.jp-weights-table .jp-weight-percentage-cell.jp-no-influence {\r\n    /* background-color: var(--color-dark); */\r\n}\r\n\r\n.jp-weights-table .jp-vertex-component {\r\n    width: 33.3%;\r\n}\r\n\r\n.jp-corner {\r\n    position: relative;\r\n}\r\n\r\n.jp-corner::before {\r\n    content: "";\r\n    position: absolute;\r\n    pointer-events: none;\r\n    top: 0;\r\n    right: 0;\r\n    border-width: 4px;\r\n    border-style: solid;\r\n    border-color: var(--corner-color);\r\n    border-bottom-color: transparent !important;\r\n    border-left-color: transparent !important;\r\n}\r\n\r\n.jp-corner-x {\r\n    --corner-color: var(--color-axis-x);\r\n}\r\n\r\n.jp-corner-y {\r\n    --corner-color: var(--color-axis-y);\r\n}\r\n\r\n.jp-corner-z {\r\n    --corner-color: var(--color-axis-z);\r\n}';
            /***/        },
        /***/ 941: 
        /***/ function(__unused_webpack_module, exports, __webpack_require__) {
            var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : {
                    default: mod
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            const defer_1 = __webpack_require__(40), skinned_mesh_preview_1 = __webpack_require__(193), gltf_import_1 = __webpack_require__(93), gltf_export_1 = __webpack_require__(746), weights_mode_1 = __webpack_require__(361), blender_integration_1 = __webpack_require__(351), styles_css_1 = __importDefault(__webpack_require__(950));
            BBPlugin.register("joint_pain", {
                title: "Joint Pain",
                author: "0x13F",
                description: "Add vertex weights to your model, akin to skeletal animation",
                icon: "rheumatology",
                version: "1.0.0",
                variant: "both",
                tags: [ "Format: Generic Model", "Animation", "Exporter" ],
                onload() {
                    (0, defer_1.deferDelete)(new Property(ModelProject, "enum", "jp_vertex_weights", {
                        label: "Joint Pain: Vertex Weights",
                        description: 'Vertex Weights mode for the project. The number of weights per vertex determines how many different bones can have greater than zero influence on any given vertex. "Four" is common for modern styles and is the max amount supported. It offers the most freedom but may be harder to work with. "One" used to be the standard with early 3D graphics. It can be easier to work with and may help achieve a more authentic retro style. ',
                        default: "disabled",
                        options: {
                            disabled: "Disabled",
                            one: "1 Weight per Vertex (Retro)",
                            four: "4 Weights per Vertex (Modern)"
                        }
                    })), (0, defer_1.deferRemoveStyle)(styles_css_1.default), (0, weights_mode_1.loadWeightsMode)(), 
                    (0, skinned_mesh_preview_1.loadSkinnedMeshPreview)(), (0, gltf_import_1.loadGltfImport)(), 
                    (0, gltf_export_1.loadGltfExport)(), (0, blender_integration_1.loadBlenderIntegration)();
                },
                onunload() {
                    (0, defer_1.runDeferred)();
                }
            });
        },
        /***/ 950: 
        /***/ module => {
            module.exports = ".jp-hidden {\r\n    display: none !important;\r\n}\r\n";
            /***/
            /******/        }
    }, __webpack_module_cache__ = {};
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
            /******/ // no module.id needed
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
    /******/ /* webpack/runtime/define property getters */
    /******/    
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
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ __webpack_require__(941);
    /******/
    /******/})();