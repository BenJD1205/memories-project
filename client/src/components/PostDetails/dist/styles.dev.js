"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (0, _styles.makeStyles)(function (theme) {
  return {
    media: {
      borderRadius: '20px',
      objectFit: 'cover',
      width: '100%',
      maxHeight: '600px'
    },
    card: _defineProperty({
      display: 'flex',
      width: '100%'
    }, theme.breakpoints.down('sm'), {
      flexWrap: 'wrap',
      flexDirection: 'column'
    }),
    section: {
      borderRadius: '20px',
      margin: '10px',
      flex: 1
    },
    imageSection: _defineProperty({
      marginLeft: '20px'
    }, theme.breakpoints.down('sm'), {
      marginLeft: 0
    }),
    recommendedPosts: _defineProperty({
      display: 'flex'
    }, theme.breakpoints.down('sm'), {
      flexDirection: 'column'
    }),
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      height: '39vh'
    },
    commentsOuterContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    commentsInnerContainer: {
      height: '200px',
      overflowY: 'auto',
      marginRight: '30px'
    }
  };
});

exports["default"] = _default;