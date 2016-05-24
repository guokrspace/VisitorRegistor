/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var VisitorInfo = require('./VisitorInfo.react');
var Link = require('react-router').Link;
var classNames = require('classnames');

var Header = React.createClass({

   propTypes: {
    menuItemActiveStatus: ReactPropTypes.array.isRequired,
  },
  /**
   * @return {object}
   */
  componentDidMount:function(){
    // fix menu when passed
    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      })
    ;

    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;
  },

  render: function() {
    var menuItemStatus = this.props.menuItemActiveStatus;
    return (
      // <header>     
      //     <VisitorInfo
      //     id="new-todo"
      //     onSave={this._onSave}
      //   />
      // </header>

    <div id="header">

    <div className="ui vertical inverted sidebar menu">
      <a className= {classNames({ 'item'  : true, 'active': menuItemStatus[0] })}>主页</a>
      <a className= {classNames({ 'item'  : true, 'active': menuItemStatus[1] })}>登记</a>
      <a className= {classNames({ 'item'  : true, 'active': menuItemStatus[2] })}>跟进</a>
      <a className= {classNames({ 'item'  : true, 'active': menuItemStatus[3] })}>教会</a>
      <a className= {classNames({ 'item' : true })}>登陆</a>
      <a className= {classNames({ 'item' : true})}>注册</a>
    </div>

    <div className="pusher">
      <div className="ui vertical masthead center aligned segment bg1">

        <div className="ui container">
          <div className="ui large secondary inverted pointing menu">
            <a className="toc item">
              <i className="sidebar icon"></i>
            </a>
            <a className={classNames({ 'item'  : true, 'active': menuItemStatus[0] })}>主页</a>
            <Link to={`/register`} className={classNames({ 'item'  : true, 'active': menuItemStatus[1] })}>登记</Link>
            <a className={classNames({ 'item'  : true, 'active': menuItemStatus[2] })}>跟进</a>
            <a className={classNames({ 'item'  : true, 'active': menuItemStatus[3] })}>教会</a>
            <div className="right item">
              <a className="ui button">登陆</a>
              <a className="ui primary button">注册</a>
            </div>
          </div>
        </div>

        <div className="ui text container">
          <h1 className="ui inverted header">
            为他们守望
          </h1>
          <h2>为他们祷告，与他们联络，建立关系！</h2>
          <div className="ui huge primary button"> 跟进信息 <i className="right arrow icon"></i></div>
        </div>

      </div> 
     </div> 
     </div>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }

  }

});

module.exports = Header;
