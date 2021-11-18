"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = exports.comment = exports.deletePost = exports.updatePost = exports.likePost = exports.createPost = exports.fetchPostsBySearch = exports.fetchPosts = exports.fetchPost = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: 'http://localhost:5000'
});

API.interceptors.request.use(function (req) {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = "Bearer ".concat(JSON.parse(localStorage.getItem('profile')).token);
  }

  return req;
});

var fetchPost = function fetchPost(id) {
  return API.get("/posts/".concat(id));
};

exports.fetchPost = fetchPost;

var fetchPosts = function fetchPosts(page) {
  return API.get("/posts?page=".concat(page));
};

exports.fetchPosts = fetchPosts;

var fetchPostsBySearch = function fetchPostsBySearch(searchQuery) {
  return API.get("/posts/search?searchQuery=".concat(searchQuery.search || 'none', "&tags=").concat(searchQuery.tags));
};

exports.fetchPostsBySearch = fetchPostsBySearch;

var createPost = function createPost(newPost) {
  return API.post('/posts', newPost);
};

exports.createPost = createPost;

var likePost = function likePost(id) {
  return API.patch("/posts/".concat(id, "/likePost"));
};

exports.likePost = likePost;

var updatePost = function updatePost(id, updatedPost) {
  return API.patch("/posts/".concat(id), updatedPost);
};

exports.updatePost = updatePost;

var deletePost = function deletePost(id) {
  return API["delete"]("/posts/".concat(id));
};

exports.deletePost = deletePost;

var comment = function comment(value, id) {
  return API.post("/posts/".concat(id, "/commentPost"), {
    value: value
  });
};

exports.comment = comment;

var signIn = function signIn(formData) {
  return API.post('/user/signin', formData);
};

exports.signIn = signIn;

var signUp = function signUp(formData) {
  return API.post('/user/signup', formData);
};

exports.signUp = signUp;