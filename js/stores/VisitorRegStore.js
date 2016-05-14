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


console.log(mongoose);
// mongoose.connect(config.database);
// mongoose.connection.on('error', function() {
//   console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
// });

var _visitorinfo = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function added(data) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _visitorinfo[id] = {
    id: id,
    data: data,
    added: true
  };
  console.log(_visitorinfo[id]);
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
  getAll: function() {
    return _visitorinfo;
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
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case VisitorRegConstants.VISITOR_REG_ADDED:
      data = action.data;
      if (data !== null) {
        added(data);
        VisitorRegStore.emitChange();
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
});

module.exports = VisitorRegStore;
