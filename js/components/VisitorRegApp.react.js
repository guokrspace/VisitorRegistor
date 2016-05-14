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

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var VisitorRegStore = require('../stores/VisitorRegStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getVisitorRegState() {
  return {
    allVisitorInfo: VisitorRegStore.getAll(),
  };
}

var VisitorRegApp = React.createClass({

  getInitialState: function() {
    return getVisitorRegState();
  },

  componentDidMount: function() {
    VisitorRegStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    VisitorRegStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allVisitorInfo={this.state.allVisitorInfo}
        />
        <Footer allVisitorInfo={this.state.allVisitorInfo} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getVisitorRegState());
  }

});

module.exports = VisitorRegApp;
