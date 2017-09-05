module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export subscribers */
/* unused harmony export getCurrentUrl */
/* unused harmony export route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Router; });
/* unused harmony export Route */
/* unused harmony export Link */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* unused harmony default export */ var _unused_webpack_default_export = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "0c/n":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"loadMore":"loadMore__22S4y","content":"content__2ZYJ-"};

/***/ }),

/***/ "1zR5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"repo":"repo__3ksdY","repoForked":"repoForked__32wz1","repoStars":"repoStars__3teqj","repoUpdatedAt":"repoUpdatedAt__2OzzU","repoLanguage":"repoLanguage__2TzNU","repoLanguageIcon":"repoLanguageIcon__36xdw","repoStarsIcon":"repoStarsIcon__3Ory6"};

/***/ }),

/***/ "2pE/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sorting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("84XI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sorting__ = __webpack_require__("w4HZ");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'label',
  { htmlFor: 'sorting' },
  'Sort'
);

var Sorting = function (_Component) {
  _inherits(Sorting, _Component);

  function Sorting() {
    var _temp, _this, _ret;

    _classCallCheck(this, Sorting);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlerOnSort = function (event) {
      var sortingType = [].find.call(event.target.childNodes, function (option) {
        return option.selected;
      }).value;
      var sortingObj = __WEBPACK_IMPORTED_MODULE_2__sorting__["a" /* sortingOptions */][sortingType];
      _this.props.handlerOnSort(sortingObj);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Sorting.prototype.render = function render(_ref) {
    var sortingObj = _ref.sortingObj,
        handlerOnSort = _ref.handlerOnSort;

    console.log();
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.sortingContainer },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.sort },
        _ref2,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'select',
          { size: '1', id: 'sorting', name: 'sorting', onChange: this.handlerOnSort },
          Object.keys(__WEBPACK_IMPORTED_MODULE_2__sorting__["a" /* sortingOptions */]).map(function (key) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'option',
              { value: key,
                selected: __WEBPACK_IMPORTED_MODULE_2__sorting__["a" /* sortingOptions */][key].sortingField === sortingObj.sortingField && __WEBPACK_IMPORTED_MODULE_2__sorting__["a" /* sortingOptions */][key].sortingOrder === sortingObj.sortingOrder },
              __WEBPACK_IMPORTED_MODULE_2__sorting__["a" /* sortingOptions */][key].title
            );
          })
        )
      )
    );
  };

  return Sorting;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "46Jo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"innerContainer":"innerContainer__3Yclp"};

/***/ }),

/***/ "6fJj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchRepositories; });
var searchRepositories = function searchRepositories(user) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var baseURL = 'https://api.github.com/users/';
  var headers = new Headers();
  headers.set('Accept', 'application/vnd.github.mercy-preview+json');
  return fetch(baseURL + user + '/repos?page=' + page, { headers: headers }).then(function (result) {
    return result.json();
  });
};



/***/ }),

/***/ "7ges":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReposList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("sfs/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repo__ = __webpack_require__("ycKs");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ReposList = function (_Component) {
  _inherits(ReposList, _Component);

  function ReposList() {
    _classCallCheck(this, ReposList);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ReposList.prototype.render = function render(_ref) {
    var handlerOnOpenDialog = _ref.handlerOnOpenDialog,
        data = _ref.data,
        filterLang = _ref.filterLang;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      null,
      data.map(function (item) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__repo__["a" /* default */], { handlerOnOpenDialog: handlerOnOpenDialog,
          filterLang: filterLang,
          item: item,
          key: item.id });
      })
    );
  };

  return ReposList;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "84XI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"sort":"sort__WH8WR","sortingContainer":"sortingContainer__1M2c-"};

/***/ }),

/***/ "91N+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("46Jo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h1',
  null,
  'Mini github client'
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { id: 'searchInput', type: 'search',
  placeholder: 'Search GitHub' });

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'button',
  { type: 'submit' },
  'Search'
);

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlerOnSearch = function (event) {
      event.preventDefault();
      var $input = event.target.querySelector('#searchInput');
      var query = $input.value;
      $input.value = '';
      _this.props.handlerOnSearch(query);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Search.prototype.render = function render() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'header',
      null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.innerContainer },
        _ref,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'form',
          { action: '', onSubmit: this.handlerOnSearch },
          _ref2,
          _ref3
        )
      )
    );
  };

  return Search;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__("rq4c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app__ = __webpack_require__("qLaj");



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_app__["a" /* default */]);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KRSG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_utils__ = __webpack_require__("zSYu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__ = __webpack_require__("qpXK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("dkia");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('canvas', { className: 'piechart' });

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h4',
  null,
  'Contributors list'
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'h4',
  null,
  'Pull requests'
);

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    var _temp, _this, _ret;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlerOnClick = function (event) {
      if (event.target.id === 'dialogContainer' || event.target.id === 'dialogClose') {
        _this.props.handlerOnCloseDialog();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Dialog.prototype.componentDidMount = function componentDidMount() {

    var $piechart = document.querySelector('.piechart');
    $piechart.width = 150;
    $piechart.height = 150;
    var ctx = $piechart.getContext('2d');
    var initialShift = 1.5 * Math.PI;
    var shift = initialShift;
    var centerX = 75;
    var centerY = 75;
    var radius = 50;
    var languagesInPercent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_utils__["e" /* getLanguagesShares */])(this.props.dialogItem.languages);
    Object.keys(languagesInPercent).forEach(function (language, id) {
      var share = languagesInPercent[language];
      var angle = share / 100 * 2 * Math.PI + shift;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, shift, angle);
      ctx.closePath();
      ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][language] ? __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][language].color : '#586069';
      ctx.strokeStyle = '#fff';
      ctx.fill();
      shift = angle;
    });
  };

  Dialog.prototype.render = function render(_ref) {
    var dialogItem = _ref.dialogItem;
    var fullName = dialogItem.fullName,
        htmlUrl = dialogItem.htmlUrl,
        sourceUrl = dialogItem.sourceUrl,
        sourceName = dialogItem.sourceName,
        contributors = dialogItem.contributors,
        languages = dialogItem.languages,
        pulls = dialogItem.pulls;


    var languagesInPercent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_utils__["e" /* getLanguagesShares */])(languages);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { id: 'dialogContainer',
        'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialogContainer,
        onClick: this.handlerOnClick },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { id: 'dialog',
          'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialog },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'span',
          { id: 'dialogClose',
            'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialogClose,
            onClick: this.handlerOnClick },
          '\xD7'
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'a',
          { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialogTitle, href: htmlUrl },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h3',
            null,
            fullName
          )
        ),
        sourceUrl && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'span',
          { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialogSource },
          'Forked from',
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'a',
            { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.dialogSourceLink, href: sourceUrl },
            sourceName
          )
        ),
        languagesInPercent && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.languagesContainer },
          _ref2,
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'ul',
            { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.languagesList },
            Object.keys(languagesInPercent).map(function (language) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'li',
                { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.language },
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.languageIcon,
                  style: {
                    backgroundColor: language && __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][language] ? __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][language].color : '#586069'
                  } }),
                language,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'span',
                  { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.languageShare },
                  languagesInPercent[language].toFixed(1),
                  '%'
                )
              );
            })
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.repoDetails },
          contributors && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            null,
            _ref3,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'ul',
              { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributorsList },
              contributors.map(function (_ref4) {
                var html_url = _ref4.html_url,
                    avatar_url = _ref4.avatar_url,
                    login = _ref4.login,
                    contributions = _ref4.contributions;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributor },
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributorAvatar,
                    src: avatar_url,
                    alt: login }),
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'div',
                    { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributorDetails },
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                      'a',
                      { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributorLink,
                        href: html_url },
                      login
                    ),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                      'span',
                      { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.contributions },
                      contributions,
                      ' commits'
                    )
                  )
                );
              })
            )
          ),
          pulls.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.pullsContainer },
            _ref5,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'ul',
              { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.pullsList },
              pulls.map(function (_ref6) {
                var title = _ref6.title,
                    html_url = _ref6.html_url;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                  'li',
                  { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.pullItem },
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                    'a',
                    { 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.pullItemLink, href: html_url },
                    title
                  )
                );
              })
            )
          ) : null
        )
      )
    );
  };

  return Dialog;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "PR2z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var initialState = {
  data: [],
  additionalData: {},
  query: '',
  languages: [],
  selectedItemId: null,
  filterObj: {
    hasOpenIssues: false,
    hasTopics: false,
    starredGTXTimes: 0,
    updatedAfter: '2000-01-01',
    type: 'all',
    lang: 'Any'
  },
  sortingObj: {
    sortingField: 'full_name',
    sortingOrder: 'asc'
  },
  page: 0,
  allPagesLoaded: false,
  updateRoute: true,
  spinnerVisible: false
};

/* harmony default export */ __webpack_exports__["a"] = (initialState);

/***/ }),

/***/ "S8+p":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("WotE");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'label',
  { htmlFor: 'starred' },
  'Stars'
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'label',
  { htmlFor: 'updatedAfter' },
  'Updated'
);

var _ref4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'label',
  { htmlFor: 'type' },
  'Type'
);

var _ref5 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'label',
  { htmlFor: 'language' },
  'Language'
);

var Filters = function (_Component) {
  _inherits(Filters, _Component);

  function Filters() {
    var _temp, _this, _ret;

    _classCallCheck(this, Filters);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlerOnFilterBy = function (event) {
      var t = event.target;
      var $inputId = t.id;
      var $inputName = t.name;
      var filterObj = _extends({}, _this.props.filterObj);

      if ($inputId === 'hasOpenIssues') {
        filterObj.hasOpenIssues = t.checked;
      } else if ($inputId === 'hasTopics') {
        filterObj.hasTopics = t.checked;
      } else if ($inputId === 'starred') {
        filterObj.starredGTXTimes = t.value;
      } else if ($inputId === 'updatedAfter') {
        filterObj.updatedAfter = t.value;
      } else if ($inputId === 'type') {
        filterObj.type = [].find.call(t.childNodes, function (option) {
          return option.selected;
        }).value.toLowerCase();
      } else if ($inputId === 'language') {
        filterObj.lang = [].find.call(t.childNodes, function (option) {
          return option.selected;
        }).value;
      }

      _this.props.handlerOnFilter(filterObj);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Filters.prototype.render = function render(_ref) {
    var filterObj = _ref.filterObj,
        languages = _ref.languages;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.filtersContainer },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { id: 'hasOpenIssues',
        type: 'checkbox',
        checked: filterObj.hasOpenIssues,
        onChange: this.handlerOnFilterBy }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'label',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.checkbox,
          htmlFor: 'hasOpenIssues' },
        'Open issues'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { id: 'hasTopics',
        type: 'checkbox',
        checked: filterObj.hasTopics,
        onChange: this.handlerOnFilterBy }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'label',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.checkbox,
          htmlFor: 'hasTopics' },
        'Topics'
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.filter },
        _ref2,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { id: 'starred',
          type: 'number',
          value: filterObj.starredGTXTimes,
          onInput: this.handlerOnFilterBy })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.filter },
        _ref3,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { id: 'updatedAfter',
          type: 'date',
          value: filterObj.updatedAfter,
          onChange: this.handlerOnFilterBy })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.filterSelect },
        _ref4,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'select',
          { id: 'type', name: 'type', size: '1', onChange: this.handlerOnFilterBy },
          ['All', 'Fork', 'Source'].map(function (type) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'option',
              { value: type,
                selected: type.toLowerCase() === filterObj.type },
              type
            );
          })
        )
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.filterSelect },
        _ref5,
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'select',
          { name: 'language', id: 'language', size: '1', onChange: this.handlerOnFilterBy },
          languages.map(function (language) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'option',
              { value: language,
                selected: language === filterObj.lang },
              language
            );
          })
        )
      )
    );
  };

  return Filters;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "WotE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"filter":"filter__2WRYO","filterSelect":"filterSelect__2n5vo","filtersContainer":"filtersContainer__3F1je"};

/***/ }),

/***/ "aQ15":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"spinnerContainer":"spinnerContainer__3xIe6","spinner":"spinner__NowJs","rotator":"rotator__1303Q","path":"path__1I-Ml","dash":"dash__2zBIs","colors":"colors__1Sikk"};

/***/ }),

/***/ "dkia":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"dialogContainer":"dialogContainer__IVND_","dialog":"dialog__3PbTx","dialogClose":"dialogClose__3ixSM","dialogTitle":"dialogTitle__3Ga1D","dialogSource":"dialogSource__2yql4","dialogSourceLink":"dialogSourceLink__38AJN","languagesContainer":"languagesContainer__3oqYD","languagesList":"languagesList__3DumK","language":"language__jUxIG","languageShare":"languageShare__1D69Q","languageIcon":"languageIcon__1lnXF","contributorsList":"contributorsList__1TEPA","contributor":"contributor__3mCf6","contributorLink":"contributorLink__CgQca","contributorAvatar":"contributorAvatar__XoBZo","contributions":"contributions__g0cIY","contributorDetails":"contributorDetails__S9PFx","repoDetails":"repoDetails__1-YnR","pullsContainer":"pullsContainer__20JuI","pullsList":"pullsList__3RDlQ","pullItem":"pullItem__1zNJj","pullItemLink":"pullItemLink__2NLxw"};

/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_github_api__ = __webpack_require__("6fJj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__initialState__ = __webpack_require__("PR2z");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search__ = __webpack_require__("91N+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reposList__ = __webpack_require__("7ges");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filters__ = __webpack_require__("S8+p");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sorting__ = __webpack_require__("2pE/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog__ = __webpack_require__("KRSG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__spinner__ = __webpack_require__("tanD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_utils__ = __webpack_require__("zSYu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css__ = __webpack_require__("0c/n");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_9__spinner__["a" /* default */], null);

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = _extends({}, __WEBPACK_IMPORTED_MODULE_3__initialState__["a" /* default */]), _this.handleRoute = function (e) {
      if (!_this.state.query && e.url !== '/') {
        _this.setState({ spinnerVisible: true });

        var matches = e.current.attributes.matches;
        var sort = matches.sort,
            order = matches.order,
            has_open_issues = matches.has_open_issues,
            language = matches.language,
            starred_gt = matches.starred_gt,
            type = matches.type,
            updated_after = matches.updated_after,
            user = matches.user,
            has_topics = matches.has_topics;


        var sortingObj = {
          sortingField: sort,
          sortingOrder: order
        };

        var filterObj = {
          hasOpenIssues: matches.hasOwnProperty('has_open_issues'),
          hasTopics: matches.hasOwnProperty('has_topics'),
          starredGTXTimes: matches.hasOwnProperty('starred_gt') ? starred_gt : 0,
          updatedAfter: updated_after && updated_after.replace(/_/g, '-') || '2000-01-01',
          type: type || 'all',
          lang: language || 'Any'
        };

        var page = 1;
        __WEBPACK_IMPORTED_MODULE_2__lib_github_api__["a" /* searchRepositories */](user, page).then(function (data) {
          if (!data.length) {
            throw 'no data';
          }
          var languages = data.reduce(function (acc, item) {
            if (item.language === null || acc.includes(item.language)) {
              return acc;
            }
            return acc.concat(item.language);
          }, []).sort(__WEBPACK_IMPORTED_MODULE_10__lib_utils__["a" /* sortingAlg */]);

          var URLWithoutPage = e.url.replace(/.page=\d+/g, '');
          history.replaceState({ filterObj: filterObj, sortingObj: sortingObj }, 'Mini github client', URLWithoutPage);

          _this.setState(_extends({}, __WEBPACK_IMPORTED_MODULE_3__initialState__["a" /* default */], {
            query: user,
            data: data,
            languages: ['Any'].concat(languages),
            allPagesLoaded: data.length < 30,
            page: page,
            filterObj: filterObj,
            sortingObj: sortingObj,
            spinnerVisible: false
          }));
        }).catch(function (err) {
          return console.log(err);
        });
      }
    }, _this.handlerOnOpenDialog = function (selectedItemId) {
      _this.setState({ spinnerVisible: true });

      if (_this.state.additionalData[selectedItemId]) {
        return _this.setState({ selectedItemId: selectedItemId });
      }

      var selectedItem = _this.state.data.find(function (item) {
        return item.id === selectedItemId;
      });
      var URLs = [selectedItem.languages_url, selectedItem.contributors_url, selectedItem.url + '/pulls?sort=popularity&per_page=5'];

      if (selectedItem.fork) {
        URLs.push(selectedItem.url);
      }

      var promises = URLs.map(function (URL) {
        return fetch(URL).then(function (res) {
          return res.json();
        });
      });

      Promise.all(promises).then(function (responses) {
        var _extends2;

        var contributors = _this.setState({
          selectedItemId: selectedItemId,
          additionalData: _extends({}, _this.state.additionalData, (_extends2 = {}, _extends2[selectedItemId] = {
            fullName: selectedItem.full_name,
            htmlUrl: selectedItem.html_url,
            languages: responses[0],
            contributors: responses[1].sort(function (a, b) {
              return b.contributions - a.contributions;
            }).slice(0, 3),
            pulls: responses[2],
            sourceUrl: responses[3] ? responses[3].parent.html_url : '',
            sourceName: responses[3] ? responses[3].parent.full_name : ''
          }, _extends2)),
          spinnerVisible: false
        });
      }).catch(function (err) {
        return console.log(err);
      });
    }, _this.handlerOnSearch = function (query) {
      _this.setState({ spinnerVisible: true });

      var page = 1;

      __WEBPACK_IMPORTED_MODULE_2__lib_github_api__["a" /* searchRepositories */](query, page).then(function (data) {
        var languages = data.reduce(function (acc, item) {
          if (item.language === null || acc.includes(item.language)) {
            return acc;
          }
          return acc.concat(item.language);
        }, []).sort(__WEBPACK_IMPORTED_MODULE_10__lib_utils__["a" /* sortingAlg */]);

        var newState = _extends({}, __WEBPACK_IMPORTED_MODULE_3__initialState__["a" /* default */], {
          query: query,
          data: data,
          languages: ['Any'].concat(languages),
          page: page,
          allPagesLoaded: data.length < 30,
          updateRoute: true,
          spinnerVisible: false
        });

        _this.setState(newState);
      }).catch(function (err) {
        return console.log(err);
      });
    }, _this.handlerLoadMore = function () {
      var page = _this.state.page + 1;

      __WEBPACK_IMPORTED_MODULE_2__lib_github_api__["a" /* searchRepositories */](_this.state.query, page).then(function (data) {
        var languages = data.reduce(function (acc, item) {
          if (item.language === null || acc.includes(item.language)) {
            return acc;
          }
          return acc.concat(item.language);
        }, []);

        _this.setState({
          data: [].concat(_this.state.data, data),
          languages: ['Any'].concat(Array.from(new Set([].concat(_this.state.languages.slice(1), languages))).sort(__WEBPACK_IMPORTED_MODULE_10__lib_utils__["a" /* sortingAlg */])),
          page: page,
          allPagesLoaded: data.length < 30,
          updateRoute: true,
          spinnerVisible: false
        });
      }).catch(function (err) {
        return console.log(err);
      });
    }, _this.handlerOnFilter = function (filterObj) {
      _this.setState({
        filterObj: filterObj,
        updateRoute: true
      });
    }, _this.handlerOnSort = function (sortingObj) {
      _this.setState({
        sortingObj: sortingObj,
        updateRoute: true
      });
    }, _this.handlerOnCloseDialog = function () {
      _this.setState({ selectedItemId: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  App.prototype.componentDidUpdate = function componentDidUpdate() {
    var _state = this.state,
        query = _state.query,
        sortingObj = _state.sortingObj,
        filterObj = _state.filterObj,
        updateRoute = _state.updateRoute,
        page = _state.page;

    var newRoute = __WEBPACK_IMPORTED_MODULE_10__lib_utils__["b" /* getFullRoute */](query, sortingObj, filterObj, page);
    if (newRoute !== this.currentRoute && updateRoute) {
      this.currentRoute = newRoute;
      history.pushState({ filterObj: filterObj, sortingObj: sortingObj }, 'Mini github client', newRoute);
    }
  };

  App.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    window.addEventListener('popstate', function (e) {
      _this2.setState(_extends({}, e.state, { updateRoute: false }));
    });
  };

  App.prototype.render = function render(_ref, _ref2) {
    var data = _ref2.data,
        additionalData = _ref2.additionalData,
        sorting = _ref2.sorting,
        languages = _ref2.languages,
        selectedItemId = _ref2.selectedItemId,
        languagesList = _ref2.languagesList,
        query = _ref2.query,
        filterObj = _ref2.filterObj,
        sortingObj = _ref2.sortingObj,
        allPagesLoaded = _ref2.allPagesLoaded,
        spinnerVisible = _ref2.spinnerVisible;

    _objectDestructuringEmpty(_ref);

    var filterFunction = __WEBPACK_IMPORTED_MODULE_10__lib_utils__["c" /* filterFunction */](filterObj);
    var sortingFunction = __WEBPACK_IMPORTED_MODULE_10__lib_utils__["d" /* sortingFunction */](sortingObj);
    var filteredAndSortedData = data.filter(filterFunction).sort(sortingFunction);

    //load more data if filtered results count less than 10
    if (data.length > 0 && filteredAndSortedData.length < 10 && !allPagesLoaded) {
      this.handlerLoadMore();
    }
    var selectedItem = selectedItemId && additionalData[selectedItemId];

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { id: 'app' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        __WEBPACK_IMPORTED_MODULE_1_preact_router__["a" /* Router */],
        { onChange: this.handleRoute },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_4__search__["a" /* default */], { path: '/:user?', handlerOnSearch: this.handlerOnSearch })
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'main',
        null,
        query ? data.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h1',
          null,
          query
        ) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'h1',
          null,
          'No user with name ' + query + ' is found'
        ) : null,
        data.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': __WEBPACK_IMPORTED_MODULE_11__style_css___default.a.content },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__filters__["a" /* default */], { filterObj: filterObj,
            languages: languages,
            handlerOnFilter: this.handlerOnFilter }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_7__sorting__["a" /* default */], { sortingObj: sortingObj,
            handlerOnSort: this.handlerOnSort,
            sorting: sorting }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__reposList__["a" /* default */], { data: filteredAndSortedData,
            filterLang: filterObj.lang,
            handlerOnOpenDialog: this.handlerOnOpenDialog }),
          data.length === 0 || data.length % 30 ? null : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { type: 'button', 'class': __WEBPACK_IMPORTED_MODULE_11__style_css___default.a.loadMore, onClick: this.handlerLoadMore },
            'Load more'
          )
        ) : null
      ),
      selectedItemId && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_8__dialog__["a" /* default */], { dialogItem: selectedItem,
        handlerOnCloseDialog: this.handlerOnCloseDialog }),
      spinnerVisible && _ref3
    );
  };

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "qpXK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var languageColors = {
  '1C Enterprise': {
    color: '#814CCC'
  },
  'ABAP': {
    color: '#E8274B'
  },
  'ActionScript': {
    color: '#882B0F'
  },
  'Ada': {
    color: '#02f88c'
  },
  'Agda': {
    color: '#315665'
  },
  'AGS Script': {
    color: '#B9D9FF'
  },
  'Alloy': {
    color: '#64C800'
  },
  'Alpine Abuild': {
    color: null
  },
  'AMPL': {
    color: '#E6EFBB'
  },
  'ANTLR': {
    color: '#9DC3FF'
  },
  'Apex': {
    color: null
  },
  'API Blueprint': {
    color: '#2ACCA8'
  },
  'APL': {
    color: '#5A8164'
  },
  'Apollo Guidance Computer': {
    color: null
  },
  'AppleScript': {
    color: '#101F1F'
  },
  'Arc': {
    color: '#aa2afe'
  },
  'Arduino': {
    color: '#bd79d1'
  },
  'ASP': {
    color: '#6a40fd'
  },
  'AspectJ': {
    color: '#a957b0'
  },
  'Assembly': {
    color: '#6E4C13'
  },
  'ATS': {
    color: '#1ac620'
  },
  'Augeas': {
    color: null
  },
  'AutoHotkey': {
    color: '#6594b9'
  },
  'AutoIt': {
    color: '#1C3552'
  },
  'Awk': {
    color: null
  },
  'Batchfile': {
    color: '#C1F12E'
  },
  'Befunge': {
    color: null
  },
  'Bison': {
    color: null
  },
  'BitBake': {
    color: null
  },
  'BlitzBasic': {
    color: null
  },
  'BlitzMax': {
    color: '#cd6400'
  },
  'Bluespec': {
    color: null
  },
  'Boo': {
    color: '#d4bec1'
  },
  'Brainfuck': {
    color: '#2F2530'
  },
  'Brightscript': {
    color: null
  },
  'Bro': {
    color: null
  },
  'C': {
    color: '#555555'
  },
  'C#': {
    color: '#178600'
  },
  'C++': {
    color: '#f34b7d'
  },
  'C2hs Haskell': {
    color: null
  },
  'Cap\'n Proto': {
    color: null
  },
  'CartoCSS': {
    color: null
  },
  'Ceylon': {
    color: null
  },
  'Chapel': {
    color: '#8dc63f'
  },
  'Charity': {
    color: null
  },
  'ChucK': {
    color: null
  },
  'Cirru': {
    color: '#ccccff'
  },
  'Clarion': {
    color: '#db901e'
  },
  'Clean': {
    color: '#3F85AF'
  },
  'Click': {
    color: '#E4E6F3'
  },
  'CLIPS': {
    color: null
  },
  'Clojure': {
    color: '#db5855'
  },
  'CMake': {
    color: null
  },
  'COBOL': {
    color: null
  },
  'CoffeeScript': {
    color: '#244776'
  },
  'ColdFusion': {
    color: '#ed2cd6'
  },
  'ColdFusion CFC': {
    color: null
  },
  'Common Lisp': {
    color: '#3fb68b'
  },
  'Component Pascal': {
    color: '#B0CE4E'
  },
  'Cool': {
    color: null
  },
  'Coq': {
    color: null
  },
  'Crystal': {
    color: '#776791'
  },
  'Csound': {
    color: null
  },
  'Csound Document': {
    color: null
  },
  'Csound Score': {
    color: null
  },
  'CSS': {
    color: '#563d7c'
  },
  'Cuda': {
    color: '#3A4E3A'
  },
  'CWeb': {
    color: null
  },
  'Cycript': {
    color: null
  },
  'Cython': {
    color: null
  },
  'D': {
    color: '#ba595e'
  },
  'Dart': {
    color: '#00B4AB'
  },
  'DIGITAL Command Language': {
    color: null
  },
  'DM': {
    color: '#447265'
  },
  'Dogescript': {
    color: '#cca760'
  },
  'DTrace': {
    color: null
  },
  'Dylan': {
    color: '#6c616e'
  },
  'E': {
    color: '#ccce35'
  },
  'Eagle': {
    color: '#814C05'
  },
  'eC': {
    color: '#913960'
  },
  'ECL': {
    color: '#8a1267'
  },
  'ECLiPSe': {
    color: null
  },
  'Eiffel': {
    color: '#946d57'
  },
  'Elixir': {
    color: '#6e4a7e'
  },
  'Elm': {
    color: '#60B5CC'
  },
  'Emacs Lisp': {
    color: '#c065db'
  },
  'EmberScript': {
    color: '#FFF4F3'
  },
  'EQ': {
    color: '#a78649'
  },
  'Erlang': {
    color: '#B83998'
  },
  'F#': {
    color: '#b845fc'
  },
  'Factor': {
    color: '#636746'
  },
  'Fancy': {
    color: '#7b9db4'
  },
  'Fantom': {
    color: '#14253c'
  },
  'Filebench WML': {
    color: null
  },
  'Filterscript': {
    color: null
  },
  'fish': {
    color: null
  },
  'FLUX': {
    color: '#88ccff'
  },
  'Forth': {
    color: '#341708'
  },
  'Fortran': {
    color: '#4d41b1'
  },
  'FreeMarker': {
    color: '#0050b2'
  },
  'Frege': {
    color: '#00cafe'
  },
  'Game Maker Language': {
    color: '#8fb200'
  },
  'GAMS': {
    color: null
  },
  'GAP': {
    color: null
  },
  'GCC Machine Description': {
    color: null
  },
  'GDB': {
    color: null
  },
  'GDScript': {
    color: null
  },
  'Genie': {
    color: '#fb855d'
  },
  'Genshi': {
    color: null
  },
  'Gentoo Ebuild': {
    color: null
  },
  'Gentoo Eclass': {
    color: null
  },
  'Gherkin': {
    color: '#5B2063'
  },
  'GLSL': {
    color: null
  },
  'Glyph': {
    color: '#e4cc98'
  },
  'Gnuplot': {
    color: '#f0a9f0'
  },
  'Go': {
    color: '#375eab'
  },
  'Golo': {
    color: '#88562A'
  },
  'Gosu': {
    color: '#82937f'
  },
  'Grace': {
    color: null
  },
  'Grammatical Framework': {
    color: '#79aa7a'
  },
  'Groovy': {
    color: '#e69f56'
  },
  'Groovy Server Pages': {
    color: null
  },
  'Hack': {
    color: '#878787'
  },
  'Harbour': {
    color: '#0e60e3'
  },
  'Haskell': {
    color: '#5e5086'
  },
  'Haxe': {
    color: '#df7900'
  },
  'HCL': {
    color: null
  },
  'HLSL': {
    color: null
  },
  'HTML': {
    color: '#e34c26'
  },
  'Hy': {
    color: '#7790B2'
  },
  'HyPhy': {
    color: null
  },
  'IDL': {
    color: '#a3522f'
  },
  'Idris': {
    color: null
  },
  'IGOR Pro': {
    color: null
  },
  'Inform 7': {
    color: null
  },
  'Inno Setup': {
    color: null
  },
  'Io': {
    color: '#a9188d'
  },
  'Ioke': {
    color: '#078193'
  },
  'Isabelle': {
    color: '#FEFE00'
  },
  'Isabelle ROOT': {
    color: null
  },
  'J': {
    color: '#9EEDFF'
  },
  'Jasmin': {
    color: null
  },
  'Java': {
    color: '#b07219'
  },
  'Java Server Pages': {
    color: null
  },
  'JavaScript': {
    color: '#f1e05a'
  },
  'JFlex': {
    color: null
  },
  'Jison': {
    color: null
  },
  'Jison Lex': {
    color: null
  },
  'Jolie': {
    color: '#843179'
  },
  'JSONiq': {
    color: '#40d47e'
  },
  'JSX': {
    color: null
  },
  'Julia': {
    color: '#a270ba'
  },
  'Jupyter Notebook': {
    color: '#DA5B0B'
  },
  'KiCad': {
    color: null
  },
  'Kotlin': {
    color: '#F18E33'
  },
  'KRL': {
    color: '#28431f'
  },
  'LabVIEW': {
    color: null
  },
  'Lasso': {
    color: '#999999'
  },
  'Lean': {
    color: null
  },
  'Lex': {
    color: '#DBCA00'
  },
  'LFE': {
    color: null
  },
  'LilyPond': {
    color: null
  },
  'Limbo': {
    color: null
  },
  'Literate Agda': {
    color: null
  },
  'Literate CoffeeScript': {
    color: null
  },
  'Literate Haskell': {
    color: null
  },
  'LiveScript': {
    color: '#499886'
  },
  'LLVM': {
    color: '#185619'
  },
  'Logos': {
    color: null
  },
  'Logtalk': {
    color: null
  },
  'LOLCODE': {
    color: '#cc9900'
  },
  'LookML': {
    color: '#652B81'
  },
  'LoomScript': {
    color: null
  },
  'LSL': {
    color: '#3d9970'
  },
  'Lua': {
    color: '#000080'
  },
  'M': {
    color: null
  },
  'M4': {
    color: null
  },
  'M4Sugar': {
    color: null
  },
  'Makefile': {
    color: '#427819'
  },
  'Mako': {
    color: null
  },
  'Mask': {
    color: '#f97732'
  },
  'Mathematica': {
    color: null
  },
  'Matlab': {
    color: '#bb92ac'
  },
  'Max': {
    color: '#c4a79c'
  },
  'MAXScript': {
    color: '#00a6a6'
  },
  'Mercury': {
    color: '#ff2b2b'
  },
  'Meson': {
    color: '#007800'
  },
  'Metal': {
    color: '#8f14e9'
  },
  'MiniD': {
    color: null
  },
  'Mirah': {
    color: '#c7a938'
  },
  'Modelica': {
    color: null
  },
  'Modula-2': {
    color: null
  },
  'Module Management System': {
    color: null
  },
  'Monkey': {
    color: null
  },
  'Moocode': {
    color: null
  },
  'MoonScript': {
    color: null
  },
  'MQL4': {
    color: '#62A8D6'
  },
  'MQL5': {
    color: '#4A76B8'
  },
  'MTML': {
    color: '#b7e1f4'
  },
  'MUF': {
    color: null
  },
  'mupad': {
    color: null
  },
  'Myghty': {
    color: null
  },
  'NCL': {
    color: '#28431f'
  },
  'Nemerle': {
    color: '#3d3c6e'
  },
  'nesC': {
    color: '#94B0C7'
  },
  'NetLinx': {
    color: '#0aa0ff'
  },
  'NetLinx+ERB': {
    color: '#747faa'
  },
  'NetLogo': {
    color: '#ff6375'
  },
  'NewLisp': {
    color: '#87AED7'
  },
  'Nginx': {
    color: '#9469E9'
  },
  'Nim': {
    color: '#37775b'
  },
  'Nit': {
    color: '#009917'
  },
  'Nix': {
    color: '#7e7eff'
  },
  'NSIS': {
    color: null
  },
  'Nu': {
    color: '#c9df40'
  },
  'NumPy': {
    color: null
  },
  'Objective-C': {
    color: '#438eff'
  },
  'Objective-C++': {
    color: '#6866fb'
  },
  'Objective-J': {
    color: '#ff0c5a'
  },
  'OCaml': {
    color: '#3be133'
  },
  'Omgrofl': {
    color: '#cabbff'
  },
  'ooc': {
    color: '#b0b77e'
  },
  'Opa': {
    color: null
  },
  'Opal': {
    color: '#f7ede0'
  },
  'OpenCL': {
    color: null
  },
  'OpenEdge ABL': {
    color: null
  },
  'OpenRC runscript': {
    color: null
  },
  'OpenSCAD': {
    color: null
  },
  'Ox': {
    color: null
  },
  'Oxygene': {
    color: '#cdd0e3'
  },
  'Oz': {
    color: '#fab738'
  },
  'P4': {
    color: '#7055b5'
  },
  'Pan': {
    color: '#cc0000'
  },
  'Papyrus': {
    color: '#6600cc'
  },
  'Parrot': {
    color: '#f3ca0a'
  },
  'Parrot Assembly': {
    color: null
  },
  'Parrot Internal Representation': {
    color: null
  },
  'Pascal': {
    color: '#E3F171'
  },
  'PAWN': {
    color: '#dbb284'
  },
  'Pep8': {
    color: '#C76F5B'
  },
  'Perl': {
    color: '#0298c3'
  },
  'Perl 6': {
    color: '#0000fb'
  },
  'PHP': {
    color: '#4F5D95'
  },
  'PicoLisp': {
    color: null
  },
  'PigLatin': {
    color: '#fcd7de'
  },
  'Pike': {
    color: '#005390'
  },
  'PLpgSQL': {
    color: null
  },
  'PLSQL': {
    color: '#dad8d8'
  },
  'PogoScript': {
    color: '#d80074'
  },
  'Pony': {
    color: null
  },
  'PostScript': {
    color: '#da291c'
  },
  'POV-Ray SDL': {
    color: null
  },
  'PowerBuilder': {
    color: '#8f0f8d'
  },
  'PowerShell': {
    color: '#012456'
  },
  'Processing': {
    color: '#0096D8'
  },
  'Prolog': {
    color: '#74283c'
  },
  'Propeller Spin': {
    color: '#7fa2a7'
  },
  'Puppet': {
    color: '#302B6D'
  },
  'Pure Data': {
    color: '#91de79'
  },
  'PureBasic': {
    color: '#5a6986'
  },
  'PureScript': {
    color: '#1D222D'
  },
  'Python': {
    color: '#3572A5'
  },
  'Python console': {
    color: null
  },
  'QMake': {
    color: null
  },
  'QML': {
    color: '#44a51c'
  },
  'R': {
    color: '#198CE7'
  },
  'Racket': {
    color: '#22228f'
  },
  'Ragel': {
    color: '#9d5200'
  },
  'RAML': {
    color: '#77d9fb'
  },
  'Rascal': {
    color: '#fffaa0'
  },
  'REALbasic': {
    color: null
  },
  'Reason': {
    color: null
  },
  'Rebol': {
    color: '#358a5b'
  },
  'Red': {
    color: '#f50000'
  },
  'Redcode': {
    color: null
  },
  'Ren\'Py': {
    color: '#ff7f7f'
  },
  'RenderScript': {
    color: null
  },
  'REXX': {
    color: null
  },
  'Ring': {
    color: '#0e60e3'
  },
  'RobotFramework': {
    color: null
  },
  'Roff': {
    color: '#ecdebe'
  },
  'Rouge': {
    color: '#cc0088'
  },
  'Ruby': {
    color: '#701516'
  },
  'RUNOFF': {
    color: '#665a4e'
  },
  'Rust': {
    color: '#dea584'
  },
  'Sage': {
    color: null
  },
  'SaltStack': {
    color: '#646464'
  },
  'SAS': {
    color: '#B34936'
  },
  'Scala': {
    color: '#c22d40'
  },
  'Scheme': {
    color: '#1e4aec'
  },
  'Scilab': {
    color: null
  },
  'Self': {
    color: '#0579aa'
  },
  'ShaderLab': {
    color: null
  },
  'Shell': {
    color: '#89e051'
  },
  'ShellSession': {
    color: null
  },
  'Shen': {
    color: '#120F14'
  },
  'Slash': {
    color: '#007eff'
  },
  'Smali': {
    color: null
  },
  'Smalltalk': {
    color: '#596706'
  },
  'Smarty': {
    color: null
  },
  'SMT': {
    color: null
  },
  'SourcePawn': {
    color: '#5c7611'
  },
  'SQF': {
    color: '#3F3F3F'
  },
  'SQLPL': {
    color: null
  },
  'Squirrel': {
    color: '#800000'
  },
  'SRecode Template': {
    color: '#348a34'
  },
  'Stan': {
    color: '#b2011d'
  },
  'Standard ML': {
    color: '#dc566d'
  },
  'Stata': {
    color: null
  },
  'SuperCollider': {
    color: '#46390b'
  },
  'Swift': {
    color: '#ffac45'
  },
  'SystemVerilog': {
    color: '#DAE1C2'
  },
  'Tcl': {
    color: '#e4cc98'
  },
  'Tcsh': {
    color: null
  },
  'Terra': {
    color: '#00004c'
  },
  'TeX': {
    color: '#3D6117'
  },
  'Thrift': {
    color: null
  },
  'TI Program': {
    color: '#A0AA87'
  },
  'TLA': {
    color: null
  },
  'Turing': {
    color: '#cf142b'
  },
  'TXL': {
    color: null
  },
  'TypeScript': {
    color: '#2b7489'
  },
  'Unified Parallel C': {
    color: null
  },
  'Unix Assembly': {
    color: null
  },
  'Uno': {
    color: null
  },
  'UnrealScript': {
    color: '#a54c4d'
  },
  'UrWeb': {
    color: null
  },
  'Vala': {
    color: '#fbe5cd'
  },
  'VCL': {
    color: null
  },
  'Verilog': {
    color: '#b2b7f8'
  },
  'VHDL': {
    color: '#adb2cb'
  },
  'Vim script': {
    color: '#199f4b'
  },
  'Visual Basic': {
    color: '#945db7'
  },
  'Volt': {
    color: '#1F1F1F'
  },
  'Vue': {
    color: '#2c3e50'
  },
  'Web Ontology Language': {
    color: '#9cc9dd'
  },
  'WebAssembly': {
    color: '#04133b'
  },
  'WebIDL': {
    color: null
  },
  'wisp': {
    color: '#7582D1'
  },
  'X10': {
    color: '#4B6BEF'
  },
  'xBase': {
    color: '#403a40'
  },
  'XC': {
    color: '#99DA07'
  },
  'Xojo': {
    color: null
  },
  'XPages': {
    color: null
  },
  'XProc': {
    color: null
  },
  'XQuery': {
    color: '#5232e7'
  },
  'XS': {
    color: null
  },
  'XSLT': {
    color: '#EB8CEB'
  },
  'Xtend': {
    color: null
  },
  'Yacc': {
    color: '#4B6C4B'
  },
  'Zephir': {
    color: '#118f9e'
  },
  'Zimpl': {
    color: null
  }
};

/* harmony default export */ __webpack_exports__["a"] = (languageColors);

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sfs/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tanD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spinner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("aQ15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Spinner = function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Spinner.prototype.render = function render() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.spinnerContainer },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'svg',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.spinner,
          width: '65px',
          height: '65px',
          viewBox: '0 0 66 66',
          xmlns: 'http://www.w3.org/2000/svg' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('circle', { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.path,
          fill: 'none',
          strokeWidth: '6',
          strokeLinecap: 'round',
          cx: '33',
          cy: '33',
          r: '30' })
      )
    );
  };

  return Spinner;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "w4HZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sortingOptions; });
var sortingOptions = {
  repoNameAsc: {
    title: 'By name A-Z',
    sortingField: 'full_name',
    sortingOrder: 'asc'
  },
  repoNameDesc: {
    title: 'By name Z-A',
    sortingField: 'full_name',
    sortingOrder: 'desc'
  },
  starsCountDesc: {
    title: 'Most stars',
    sortingField: 'stargazers_count',
    sortingOrder: 'desc'
  },
  starsCountAsc: {
    title: 'Fewest stars',
    sortingField: 'stargazers_count',
    sortingOrder: 'asc'
  },
  openIssuesCountDesc: {
    title: 'Most open issues',
    sortingField: 'open_issues_count',
    sortingOrder: 'desc'
  },
  openIssuesCountAsc: {
    title: 'Least open issues',
    sortingField: 'open_issues_count',
    sortingOrder: 'asc'

  },
  updatedDateDesc: {
    title: 'Recently updated',
    sortingField: 'updated_at',
    sortingOrder: 'desc'

  },
  updatedDateAsc: {
    title: 'Least recently updated',
    sortingField: 'updated_at',
    sortingOrder: 'asc'

  }
};



/***/ }),

/***/ "ycKs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Repo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__("1zR5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__ = __webpack_require__("qpXK");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 14 14', width: '14px' },
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('path', { fillRule: 'evenodd', fill: '#586069', d: 'M 14 6 l -4.9 -0.64 L 7 1 L 4.9 5.36 L 0 6 l 3.6 3.26 L 2.67 14 L 7 11.67 L 11.33 14 l -0.93 -4.74 Z' })
);

var Repo = function (_Component) {
  _inherits(Repo, _Component);

  function Repo() {
    var _temp, _this, _ret;

    _classCallCheck(this, Repo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlerOnOpenDialog = function (itemId) {
      return function (event) {
        _this.props.handlerOnOpenDialog(itemId);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Repo.prototype.render = function render(_ref) {
    var item = _ref.item,
        filterLang = _ref.filterLang;

    var languageColor = {
      backgroundColor: item.language && __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][item.language] ? __WEBPACK_IMPORTED_MODULE_2__lib_language_colors__["a" /* default */][item.language].color : '#586069'
    };

    var stars = item.stargazers_count < 1000 ? item.stargazers_count : (item.stargazers_count / 1000).toFixed(1) + 'k';

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repo,
        onClick: this.handlerOnOpenDialog(item.id) },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h2',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoName },
        item.full_name
      ),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h3',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoDescription },
        item.description
      ),
      item.fork ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoForked },
        'Forked'
      ) : null,
      stars ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoStars },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'i',
          { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoStarsIcon },
          _ref2
        ),
        stars
      ) : null,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'time',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoUpdatedAt, dateTime: item.updated_at },
        'Updated at: ',
        item.updated_at.slice(0, 10)
      ),
      item.language && (!filterLang || filterLang !== item.language) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'span',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoLanguage },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('i', { 'class': __WEBPACK_IMPORTED_MODULE_1__style___default.a.repoLanguageIcon,
          style: languageColor }),
        item.language
      ) : null
    );
  };

  return Repo;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "zSYu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sortingFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterFunction; });
/* unused harmony export getFilterRoute */
/* unused harmony export getSortingRoute */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getFullRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sortingAlg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getLanguagesShares; });
var sortingAlg = function sortingAlg(x, y) {
  if (typeof x === 'string' || typeof y === 'string') {
    x = x.toLowerCase();
    y = y.toLowerCase();
  }
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  } else {
    return 0;
  }
};

var sortingFunction = function sortingFunction(_ref) {
  var sortingField = _ref.sortingField,
      _ref$sortingOrder = _ref.sortingOrder,
      sortingOrder = _ref$sortingOrder === undefined ? 'asc' : _ref$sortingOrder;
  return function (a, b) {
    return sortingOrder === 'asc' ? sortingAlg(a[sortingField], b[sortingField]) : sortingAlg(b[sortingField], a[sortingField]);
  };
};

var filterFunction = function filterFunction(_ref2) {
  var hasOpenIssues = _ref2.hasOpenIssues,
      hasTopics = _ref2.hasTopics,
      starredGTXTimes = _ref2.starredGTXTimes,
      updatedAfter = _ref2.updatedAfter,
      type = _ref2.type,
      lang = _ref2.lang;
  return function (item) {
    return (hasOpenIssues ? item.open_issues_count > 0 : true) && (hasTopics ? item.topics.length > 0 : true) && item.stargazers_count >= starredGTXTimes && item.updated_at > updatedAfter && (lang === 'Any' ? true : item.language === lang) && (type === 'fork' ? item.fork === true : type === 'source' ? item.fork === false : true);
  };
};

var getFilterRoute = function getFilterRoute(_ref3) {
  var hasOpenIssues = _ref3.hasOpenIssues,
      hasTopics = _ref3.hasTopics,
      starredGTXTimes = _ref3.starredGTXTimes,
      updatedAfter = _ref3.updatedAfter,
      type = _ref3.type,
      lang = _ref3.lang;

  var route = '';

  if (hasOpenIssues) {
    route += '&has_open_issues';
  }
  if (hasTopics) {
    route += '&has_topics';
  }
  if (starredGTXTimes) {
    route += '&starred_gt=' + starredGTXTimes;
  }
  if (updatedAfter > '2000-01-01') {
    route += '&updated_after=' + updatedAfter.slice(0, 10).replace(/-/g, '_');
  }
  if (type !== 'all') {
    route += '&type=' + type.toLowerCase();
  }
  if (lang !== 'Any') {
    route += '&language=' + lang.toLowerCase();
  }

  return route;
};

var getSortingRoute = function getSortingRoute(_ref4) {
  var sortingField = _ref4.sortingField,
      sortingOrder = _ref4.sortingOrder;

  return sortingField ? 'sort=' + sortingField + '&order=' + sortingOrder : '';
};

var getFullRoute = function getFullRoute(query, sortingObj, filterObj, page) {
  var sortingRoute = getSortingRoute(sortingObj);
  var filterRoute = getFilterRoute(filterObj);

  var fullRoute = query;
  fullRoute += sortingRoute || filterRoute || page > 1 ? '?' : '';
  fullRoute += sortingRoute ? sortingRoute : '';
  fullRoute += filterRoute ? filterRoute : '';
  fullRoute += page > 1 ? '&page=' + page : '';

  return fullRoute.replace(/\?&/, '?');
};

var getLanguagesShares = function getLanguagesShares(languages) {
  var languagesTotalSum = Object.keys(languages).reduce(function (acc, lang) {
    return acc += languages[lang];
  }, 0);
  var otherLanguagesSum = Object.keys(languages).reduce(function (acc, lang) {
    return acc += languages[lang] < 1024 ? languages[lang] : 0;
  }, 0);
  var languagesInPercent = {};
  Object.keys(languages).forEach(function (lang) {
    if (languages[lang] >= 1024) {
      var languageShare = languages[lang] / languagesTotalSum * 100;
      if (languageShare > 0) {
        languagesInPercent[lang] = languageShare;
      }
    }
  });

  if (otherLanguagesSum > 0) {
    languagesInPercent.Others = otherLanguagesSum / languagesTotalSum * 100;
  }
  return languagesInPercent;
};



/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map