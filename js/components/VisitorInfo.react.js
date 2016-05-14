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
var VisitorInfoInput = require('./VisitorInfoInput.react');
var ActionCreator = require('../actions/ActionCreator');
var Store = require('../stores/VisitorRegStore');
var classNames = require('classnames');
var objectAssign = require('object-assign');

var ENTER_KEY_CODE = 13;

var VisitorInfo = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  
  componentWillMount:function(){
    Store.addChangeListener(this._onChange);
  },
  
  componentDidMount() {
    $('.ui.dropdown').dropdown({maxSelections: 3});

    $('.button').on('click',function(){
      $form = $('.ui.form');
      allFields = $form.form('get values');
      var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      allFields = objectAssign({'visitorId':id}, allFields);
      ActionCreator.addVisitor(allFields);
    });
  },

  componentDidUnMount:function()
  {
    Store.removeChangeListener(this._onChange);
  },
  
  _onChange:function(){
    this.setState
  },

  render() {
    return (
    <form className="ui form container" id="header">
        <h1 className="ui dividing header">新人信息登记表</h1>
            <div className="field">
                <label>基本信息</label>
                <div className="four fields">
                    <div className="field">
                      <input type="text" name="name" placeholder="姓名"/>
                    </div>
                    <div>
                      <select className="ui fluid dropdown" name="gender" id="gender">
                      <option value="">性别</option>
                      <option value="1">男性</option>
                      <option value="0">女性</option>
                      </select>
                    </div>
                    <div className="field">
                      <select className="ui fluid dropdown search" name="yearofbirth" id="yearofbirth">
                        <option value="">出生年份</option>
                        <option value="1">1960</option>
                        <option value="2">1961</option>
                        <option value="3">1962</option>
                        <option value="4">1963</option>
                        <option value="5">1964</option>
                        <option value="6">1965</option>
                        <option value="7">1966</option>
                        <option value="8">1967</option>
                        <option value="9">1968</option>
                        <option value="10">1969</option>
                        <option value="11">1970</option>
                        <option value="12">1971</option>
                        <option value="13">1972</option>
                        <option value="14">1973</option>
                        <option value="15">1974</option>
                        <option value="16">1975</option>
                        <option value="17">1976</option>
                        <option value="18">1977</option>
                        <option value="19">1978</option>
                        <option value="20">1979</option>
                        <option value="21">1980</option>
                        <option value="22">1981</option>
                        <option value="23">1982</option>
                        <option value="24">1983</option>
                        <option value="25">1984</option>
                        <option value="26">1985</option>
                        <option value="27">1986</option>
                        <option value="28">1987</option>
                        <option value="29">1988</option>
                        <option value="30">1989</option>
                        <option value="31">1990</option>
                        <option value="32">1991</option>
                        <option value="33">1992</option>
                        <option value="34">1993</option>
                        <option value="35">1994</option>
                        <option value="36">1995</option>
                        <option value="37">1996</option>
                        <option value="38">1997</option>
                        <option value="39">1998</option>
                        <option value="40">1999</option>
                        <option value="41">2000</option>
                        <option value="42">2001</option>
                        <option value="43">2002</option>
                        <option value="44">2003</option>
                        <option value="45">2004</option>
                        <option value="46">2005</option>
                      </select>
                    </div>
                    <div className="field">
                      <select className="ui fluid dropdown" name="monthofbirth" id="monthofbirth">
                        <option value="">出生月份</option>
                        <option value="1">01月</option>
                        <option value="2">02月</option>
                        <option value="3">03月</option>
                        <option value="4">04月</option>
                        <option value="5">05月</option>
                        <option value="6">06月</option>
                        <option value="7">07月</option>
                        <option value="8">08月</option>
                        <option value="9">09月</option>
                        <option value="10">10月</option>
                        <option value="11">11月</option>
                        <option value="12">12月</option>
                      </select>
                    </div>
                </div>
                <label>联系方式</label>
                <div className="two fields">
                    <div className="field">
                      <input type="text" name="mobile" placeholder="电话"/>
                    </div>
                    <div className="field">
                      <input type="text" name="wechat" placeholder="微信"/>
                    </div>
                </div>

                <label>落户情况</label>
                <div className="two fields">
                    <div className="field">
                      <select id="multi-select" className="ui dropdown fluid" multiple="multiple" name="recommandgroud">
                        <option value="">推荐小组:</option>
                        <option value="1">活水小组</option>
                        <option value="2">葡萄树小组</option>
                        <option value="3">知行小组</option>
                        <option value="4">橄榄山小组</option>
                        <option value="5">加勒团契</option>
                      </select>
                    </div>
                    <div className="field">
                        <div className="ui checkbox toggle">
                          <input type="checkbox" name="isingroup"/>
                          <label>是否已经进入小组</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                  <label>祷告事项：</label>
                  <textarea name="prayers"> </textarea>
                </div>
            </div>
            <div className="ui primary button Fluid" tabIndex="0">保存信息</div>
        </form>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },
});

module.exports = VisitorInfo;
