'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">fitlit-backend documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'id="xs-controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AppController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'id="xs-injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'id="xs-controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'id="xs-injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/JwtStrategy.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >JwtStrategy</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/GuardsModule.html\" data-type=\"entity-link\" >GuardsModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' : 'data-bs-target="#xs-injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' : 'id="xs-injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserLimitService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserLimitService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/MailModule.html\" data-type=\"entity-link\" >MailModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' : 'data-bs-target="#xs-injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' : 'id="xs-injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/MailService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >MailService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsersModule.html\" data-type=\"entity-link\" >UsersModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'id="xs-controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UsersController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'id="xs-injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UsersService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links"' : 'data-bs-target="#xs-controllers-links"', ">\n                                <span class=\"icon ion-md-swap\"></span>\n                                <span>Controllers</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"controllers/AppController.html\" data-type=\"entity-link\" >AppController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" >AuthController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/UsersController.html\" data-type=\"entity-link\" >UsersController</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#entities-links"' : 'data-bs-target="#xs-entities-links"', ">\n                                <span class=\"icon ion-ios-apps\"></span>\n                                <span>Entities</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"entities/Company.html\" data-type=\"entity-link\" >Company</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"entities/User.html\" data-type=\"entity-link\" >User</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/CompleteRegistrationDto.html\" data-type=\"entity-link\" >CompleteRegistrationDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateCompanyDto.html\" data-type=\"entity-link\" >CreateCompanyDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateInvitationDto.html\" data-type=\"entity-link\" >CreateInvitationDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateSuperAdminDto.html\" data-type=\"entity-link\" >CreateSuperAdminDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FeatureRestrictionFilter.html\" data-type=\"entity-link\" >FeatureRestrictionFilter</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FilterUsersDto.html\" data-type=\"entity-link\" >FilterUsersDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateUserProfileDto.html\" data-type=\"entity-link\" >UpdateUserProfileDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AppService.html\" data-type=\"entity-link\" >AppService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtAuthGuard.html\" data-type=\"entity-link\" >JwtAuthGuard</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtStrategy.html\" data-type=\"entity-link\" >JwtStrategy</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MailService.html\" data-type=\"entity-link\" >MailService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserLimitService.html\" data-type=\"entity-link\" >UserLimitService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UsersService.html\" data-type=\"entity-link\" >UsersService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#guards-links"' : 'data-bs-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/CompanyAccessGuard.html\" data-type=\"entity-link\" >CompanyAccessGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/FeatureGuard.html\" data-type=\"entity-link\" >FeatureGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/RolesGuard.html\" data-type=\"entity-link\" >RolesGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"guards/UserLimitGuard.html\" data-type=\"entity-link\" >UserLimitGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/FeatureConfig.html\" data-type=\"entity-link\" >FeatureConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PlanLimits.html\" data-type=\"entity-link\" >PlanLimits</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement)));