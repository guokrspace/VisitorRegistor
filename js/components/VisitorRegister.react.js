/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Header = require('./Header.react');
var React = require('react');
var Store = require('../stores/VisitorRegStore');
var VisitorInfo = require('./VisitorInfo.react')

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete(),
    menuStatus: [true,true,false,false,false,false]
  };
}

var VisitorRegister = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header
            menuItemActiveStatus={this.state.menuStatus}
        />
         <VisitorInfo
           allTodos={this.state.allTodos}
           areAllComplete={this.state.areAllComplete}
         />
      //   <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = VisitorRegister;
