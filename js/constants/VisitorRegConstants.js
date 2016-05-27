/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  VISITOR_REG_ADDED: null,
  VISITOR_REG_RECEIVE_ERROR: null,
  VISITOR_REG_ADDFOLLOWUP:null,
  VISITOR_REG_ADDFOLLOWUP_ERROR:null,
  VISITOR_REG_RECEIVED: null,
  VISITOR_REG_DELETE: null,
  VISITOR_REG_ITEM_DELETE: null  /* User click the remove button on an item */
});
