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
var Store = require('../stores/VisitorRegStore')
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
        visitors.push(<VisitorListItem visitor={this.state.myVisitors[key]} />);
    }

    return (
      <div className="ui container">
      <Header
        menuItemActiveStatus={this.state.menuStatus}
      />

      <div className="ui cards">{visitors}</div>


    <div className="ui modal">
  <i className="close icon"></i>
  <div className="header">
    Profile Picture
  </div>
  <div className="image content">
    <div className="ui medium image">
      <img src="./images/white-image.png"></img>
    </div>
    <div className="description">
      <div className="ui header">We've auto-chosen a profile image for you.</div>
      <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
      <p>Is it okay to use this photo?</p>
    </div>
  </div>
  <div className="actions">
    <div className="ui black deny button">
      Nope
    </div>
    <div className="ui positive right labeled icon button">
      Yep, that's me
      <i className="checkmark icon"></i>
    </div>
  </div>
</div>

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
