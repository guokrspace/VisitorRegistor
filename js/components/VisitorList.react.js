/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var VisitorListItem = require('./VisitorItem.react')
var Header = require('./Header.react')
var ReactPropTypes = React.PropTypes;
var Store = require('../Stores/VisitorRegStore')
var ActionCreator = require('../actions/ActionCreator')

var ENTER_KEY_CODE = 13;

var VisitorList = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string,
    menuStatus: ReactPropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      value: this.props.value || '',
      myVisitors: Store.getAllVisitors(),
      menuStatus: [false,false,true,false,false,false]
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this._onChange);
  },

  componentDidMount: function () {
    ActionCreator.getAllVisitors();
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var visitors = [];

    for(var key in this.state.myVisitors)
    {
        visitors.push(<VisitorListItem visitor={key} />);
    }

    return (
      <div>
      <Header
        menuItemActiveStatus={this.state.menuStatus}
      />

      <pre>{JSON.stringify(this.state.myVisitors)}</pre>
      <div className="ui divided items">{visitors}</div>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      myVisitors: Store.getAllVisitors()
    });
  }

});

module.exports = VisitorList;
