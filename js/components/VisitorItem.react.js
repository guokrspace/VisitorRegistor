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
var ActionCreator = require('../actions/ActionCreator');
var TextInput = require('./TextInput.react');
var Store = require('../stores/VisitorRegStore');

var classNames = require('classnames');

var VisitorItem = React.createClass({

  propTypes: {
   visitor: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false,
      addFollowupSuccess: false,
      numfollowups:0
    };
  },

  componentDidMount:function(){
    $('#followup').on('click', function(){
      $('.ui.modal').modal('show');  
    });

    this.setState({
      numfollowups:this.props.visitor.followups.length
    });
    
    var visitorId = this.props.visitor.visitorId;
    $('#remove').on('click', function(){
      ActionCreator.deleteVisitor(visitorId);  
    });
  },

  componentWillMount: function () {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var visitor = this.props.visitor;
    var numfollowups = this.state.numfollowups;
    var isingroup = ''
    if(visitor.isingroup){
      isingroup = '还没有小组'
    } else {
      isingroup = '活水小组'
    }

    var input;
    if (this.state.isEditing) {
    input =
      <TextInput
        className="edit"
        onSave={this._onSave}
        lastFollowup='This is last time followup'
      />;
    } else {
    input =
      <TextInput
        className="completed"
        onSave={this._onSave}
        lastFollowup='This is last time followup'
      />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    // <pre>{JSON.stringify(visitor)}</pre> 
    return (
      <div className="card">
        <div className="content">
          <pre>Value is : {this.state.addFollowupSuccess}</pre> 
          <img className="right floated mini ui image" src="./images/white-image.png"></img> 
          <a className="header">{visitor.name}</a>
          <div className="meta">
            <span className="cinema">{visitor.mobile}</span>
          </div>

          <div className="description">
            <div className="ui large transparent left icon input">
              <i className="heart outline icon"></i>
              {input}
            </div>
          </div>
        </div>

        <div className="extra content">
          <div className="ui button" id="followup">
            <i className="heart icon"></i> 跟进
          </div>
          <a className="ui basic left pointing label">
          {numfollowups}
          </a>
        </div>
        
        <div className="ui button bottom attach right button" id="remove">
          <i className="remove red icon"></i> 
          已经进入小组，停止跟进
        </div>

      </div>
    );
  },

  _onToggleComplete: function() {
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(followup) {
    var payload = {'visitorId':this.props.visitor.visitorId, 'followup':followup};
    ActionCreator.addFollowup(payload);
    this.setState({isEditing: false});
  },

  _onChange: function() {
    this.setState({
      addFollowupSuccess:Store.getAddFollowUpStatus(),
      numfollowups: this.state.numfollowups+1
    });
  }

});

module.exports = VisitorItem;
