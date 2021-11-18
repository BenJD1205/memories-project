"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (0, _styles.makeStyles)(function (theme) {
  return {
    appBarSearch: {
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px'
    },
    pagination: {
      borderRadius: 4,
      marginTop: '1rem',
      padding: '16px'
    },
    gridContainer: _defineProperty({}, theme.breakpoints.down('xs'), {
      flexDirection: 'column-reverse'
    })
  };
});

exports["default"] = _default;