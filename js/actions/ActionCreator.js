'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VisitorRegConstants = require('../constants/VisitorRegConstants');
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
          actionType: VisitorRegConstants.VISITOR_REG_ADDED,
          resp: resp
        });
      })
      .catch(function () {
        AppDispatcher.dispatche({
          actionType: VisitorRegConstants.VISITOR_REG_RECEIVE_ERROR,
          error: '提交失败，请检查网络连接后重试'
        });      
      });
  },

  getAllVisitors: function() {
    Api
      .get('/api/visitors')
      .then(function (visitors){
        AppDispatcher.dispatch({
          actionType: VisitorRegConstants.VISITOR_REG_RECEIVED,
          resp: visitors
        });
      })
      .catch(function (){
        AppDispatcher.dispatche({
          actionType: VisitorRegConstants.VISITOR_REG_RECEIVE_ERROR,
          error:'获取信息失败，请检查网络连接后重试'
        });
      });
  }
};

module.exports = ActionCreator;
