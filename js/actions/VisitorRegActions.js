/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VisitorRegConstants = require('../constants/VisitorRegConstants');
var VisitorRegActions = {

  /**
   * @param  {string} text
   */
  create: function(info) {
    AppDispatcher.dispatch({
      actionType: VisitorRegConstants.VISITOR_REG_CREATE,
      data: info
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  update: function(id, info) {
    AppDispatcher.dispatch({
      actionType: VisitorRegConstants.VISITOR_REG_UPDATE,
      id: id,
      data: info
    });
  },

    /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  delete: function(id) {
    AppDispatcher.dispatch({
      actionType: VisitorRegConstants.VISITOR_REG_DELETE,
      id: id
    });
  },

};

module.exports = VisitorRegActions;
