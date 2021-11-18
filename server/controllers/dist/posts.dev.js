"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.commentPost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPostsBySearch = exports.getPosts = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _postMessage = _interopRequireDefault(require("../models/postMessage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express["default"].Router();

var getPosts = function getPosts(req, res) {
  var page, LIMIT, startIndex, total, posts;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = req.query.page;
          _context.prev = 1;
          LIMIT = 8;
          startIndex = (Number(page) - 1) * LIMIT;
          _context.next = 6;
          return regeneratorRuntime.awrap(_postMessage["default"].countDocuments({}));

        case 6:
          total = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(_postMessage["default"].find().sort({
            _id: -1
          }).limit(LIMIT).skip(startIndex));

        case 9:
          posts = _context.sent;
          res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          res.status(404).json({
            message: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.getPosts = getPosts;

var getPostsBySearch = function getPostsBySearch(req, res) {
  var _req$query, searchQuery, tags, title, posts;

  return regeneratorRuntime.async(function getPostsBySearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, searchQuery = _req$query.searchQuery, tags = _req$query.tags;
          _context2.prev = 1;
          title = new RegExp(searchQuery, 'i');
          _context2.next = 5;
          return regeneratorRuntime.awrap(_postMessage["default"].find({
            $or: [{
              title: title
            }, {
              tags: {
                $in: tags.split(',')
              }
            }]
          }));

        case 5:
          posts = _context2.sent;
          res.status(200).json({
            data: posts
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          res.status(404).json({
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.getPostsBySearch = getPostsBySearch;

var getPost = function getPost(req, res) {
  var id, post;
  return regeneratorRuntime.async(function getPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 4:
          post = _context3.sent;
          res.status(200).json(post);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(404).json({
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getPost = getPost;

var createPost = function createPost(req, res) {
  var post, newPostMessage;
  return regeneratorRuntime.async(function createPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          post = req.body;
          newPostMessage = new _postMessage["default"](_objectSpread({}, post, {
            creator: req.userId,
            createdAt: new Date().toISOString()
          }));
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(newPostMessage.save());

        case 5:
          res.status(201).json(newPostMessage);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](2);
          res.status(409).json({
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.createPost = createPost;

var updatePost = function updatePost(req, res) {
  var id, _req$body, title, message, creator, selectedFile, tags, updatedPost;

  return regeneratorRuntime.async(function updatePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, title = _req$body.title, message = _req$body.message, creator = _req$body.creator, selectedFile = _req$body.selectedFile, tags = _req$body.tags;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("No post with id: ".concat(id)));

        case 4:
          updatedPost = {
            creator: creator,
            title: title,
            message: message,
            tags: tags,
            selectedFile: selectedFile,
            _id: id
          };
          _context5.next = 7;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(id, updatedPost, {
            "new": true
          }));

        case 7:
          res.json(updatedPost);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updatePost = updatePost;

var deletePost = function deletePost(req, res) {
  var id;
  return regeneratorRuntime.async(function deletePost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(404).send("No post with id: ".concat(id)));

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndRemove(id));

        case 5:
          res.json({
            message: "Post deleted successfully."
          });

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deletePost = deletePost;

var likePost = function likePost(req, res) {
  var id, post, index, updatedPost;
  return regeneratorRuntime.async(function likePost$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;

          if (req.userId) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", res.json({
            message: "Unauthenticated"
          }));

        case 3:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", res.status(404).send("No post with id: ".concat(id)));

        case 5:
          _context7.next = 7;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 7:
          post = _context7.sent;
          index = post.likes.findIndex(function (id) {
            return id === String(req.userId);
          });

          if (index === -1) {
            post.likes.push(req.userId);
          } else {
            post.likes = post.likes.filter(function (id) {
              return id !== String(req.userId);
            });
          }

          _context7.next = 12;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(id, post, {
            "new": true
          }));

        case 12:
          updatedPost = _context7.sent;
          res.status(200).json(updatedPost);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.likePost = likePost;

var commentPost = function commentPost(req, res) {
  var id, value, post, updatedPost;
  return regeneratorRuntime.async(function commentPost$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          value = req.body.value;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 4:
          post = _context8.sent;
          post.comments.push(value);
          _context8.next = 8;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(id, post, {
            "new": true
          }));

        case 8:
          updatedPost = _context8.sent;
          res.status(201).json(updatedPost);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.commentPost = commentPost;
var _default = router;
exports["default"] = _default;