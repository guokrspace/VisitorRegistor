/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var VisitorRegConstants = require('../constants/VisitorRegConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var mongoose = require('mongoose');
var config = require('../config')

var _visitorinfo = {};
var _addvisitorsuccess = false;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function handleResponse(resp) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  if(resp.status == 0)
    _addvisitorsuccess = true;
  else
    _addvisitorsuccess = false;

  console.log(_addvisitorsuccess);
}

function receiveAllVisitorInfo(visitors) {
  _visitorinfo = visitors;
  console.log("GOT HERE")
  console.log(visitors);
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _visitorinfo[id] = assign({}, _visitorinfo[id], updates);
}


/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _visitorinfo[id];
}

var VisitorRegStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAllVisitors: function() {
    return _visitorinfo;
  },

  getAddVisitorStatus: function() {
    return _addvisitorsuccess;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
VisitorRegStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case VisitorRegConstants.VISITOR_REG_ADDED:
      resp = action.resp;
      if (resp !== null) {
        handleResponse(resp);
      }
      break;

    case VisitorRegConstants.VISITOR_REG_RECEIVED:
      visitors = action.resp;
      if (visitors !== null) {
        receiveAllVisitorInfo(visitors);
      }
      break;

    case VisitorRegConstants.VISITOR_REG_UPDATE:
      data = action.data;
      if (data != null && id != null) {
        update(id,data);
        VisitorRegStore.emitChange();
      }
      break;

    case VisitorRegConstants.VISITOR_REG_DELETE:
      if (data != null && id != null) {
        delete(id);
        VisitorRegStore.emitChange();
      }
      break;

    default:
      // no op
  }

  VisitorRegStore.emitChange();

  return true;
});

module.exports = VisitorRegStore;
