"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionTypes = require("../constants/actionTypes");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isLoading: true,
    posts: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.START_LOADING:
      return _objectSpread({}, state, {
        isLoading: true
      });

    case _actionTypes.END_LOADING:
      return _objectSpread({}, state, {
        isLoading: false
      });

    case _actionTypes.FETCH_ALL:
      return _objectSpread({}, state, {
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      });

    case _actionTypes.FETCH_BY_SEARCH:
      return _objectSpread({}, state, {
        posts: action.payload
      });

    case _actionTypes.FETCH_POST:
      return _objectSpread({}, state, {
        post: action.payload
      });

    case _actionTypes.LIKE:
      return _objectSpread({}, state, {
        posts: state.posts.map(function (post) {
          return post._id === action.payload._id ? action.payload : post;
        })
      });

    case _actionTypes.CREATE:
      return _objectSpread({}, state, {
        posts: [].concat(_toConsumableArray(state.posts), [action.payload])
      });

    case _actionTypes.UPDATE:
      return _objectSpread({}, state, {
        posts: state.posts.map(function (post) {
          return post._id === action.payload._id ? action.payload : post;
        })
      });

    case _actionTypes.DELETE:
      return _objectSpread({}, state, {
        posts: state.posts.filter(function (post) {
          return post._id !== action.payload;
        })
      });

    case _actionTypes.COMMENT:
      return _objectSpread({}, state, {
        posts: state.posts.map(function (post) {
          if (post._id === action.payload._id) {
            return action.payload;
          }

          return post;
        })
      });

    default:
      return state;
  }
};

exports["default"] = _default;