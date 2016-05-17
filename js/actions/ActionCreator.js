'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/VisitorRegConstants');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Api = require('../services/Api');

var ActionCreator = {

  /**
   *
   *
   */
  addVisitor: function (info) {
    Api
      .post('/api/addVisitor',info)
      .then(function (resp) {
        AppDispatcher.dispatch({
          actionType: ActionConstants.VISITOR_REG_ADDED,
          resp: resp
        });
      })
      .catch(function () {
        AppDispatcher.dispatche({
          actionType: ActionConstants.RECEIVE_ERROR,
          error: '提交失败，请检查网络连接后重试'
        });      
      });
  }
};

module.exports = ActionCreator;
