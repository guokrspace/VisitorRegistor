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
var VisitorRegStore = require('../stores/VisitorRegStore');
var classNames = require('classnames');
var objectAssign = require('object-assign');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ENTER_KEY_CODE = 13;

// var BetterSelect = React.createClass({
//   render: function() {
//     if (this.props.valueLink) {
//       return this.transferPropsTo(
//         <select value={this.props.valueLink.value}
//                 valueLink={null} onChange={this.handleChange}>
//           {this.props.children}
//         </select>
//       );
//     } else {
//       return this.transferPropsTo(
//         <select onChange={this.handleChange}>
//           {this.props.children}
//         </select>
//       );
//     }
//   },
  
//   handleChange: function(e) {
//     var selectedValue;
//     if (this.props.multiple) {
//       // We have to iterate the `options` elements
//       // to figure out which ones are selected.
//       selectedValue = [];
//       var options = e.target.options;
//       for (var i = 0, l = options.length; i < l; i++) {
//         if (options[i].selected) {
//           selectedValue.push(options[i].value);
//         }
//       }
//     } else {
//       selectedValue = e.target.value;
//     }

//     // Fire onChange manually if it exists since we overwrote it
//     this.props.onChange && this.props.onChange(e);

//     // Finally, manually take care of any valueLink passed
//     if (this.props.valueLink) {
//       this.props.valueLink.requestChange(selectedValue);
//     }
//   }
// });

var VisitorInfo = React.createClass({

  // mixins: [React.addons.LinkedStateMixin],

  getInitialState:function() { 
    return {
      isvisitoraddsuccess:false,
      name:'',
      gender:'',
      yearofbirth:'',
      monthofbirth:'',
      mobile:'',
      wechat:'',
      recommandgroup:['1','2'],
      isingroup:false,
      prayers:''
    };
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleGenderChange: function(e) {
    this.setState({gender: e.target.value});
  },
  handleYearofbirthChange: function(e) {
    this.setState({yearofbirth: e.target.value});
  },
  handleMonthofbirthChange: function(e) {
    this.setState({monthofbirth: e.target.value});
  },
  handleMobileChange: function(e) {
    this.setState({mobile: e.target.value});
  },
  handleWechatChange: function(e) {
    this.setState({wechat: e.target.value});
  },
  handleRecommandgroupChange: function(e) {
    // this.setState({recommandgroup: e.target.value});
  },
  handleisingroupChange: function(e) {
    this.setState({isingroup: e.target.value});
  },
  handleprayersChange: function(e) {
    this.setState({prayers: e.target.value});
  },

  componentWillMount:function(){
    VisitorRegStore.addChangeListener(this._onChange);
  },
  
  componentDidMount:function() {
    $form = $('.ui.form');
    $('#submit').on('click',function(){
      if($form.form('is valid'))
      {
        allFields = $form.form('get values');
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        allFields = objectAssign({'visitorId':id}, allFields);
        ActionCreator.addVisitor(allFields);
      }
    });

    $('.ui.form').form({
      on: 'blur',
      fields: {
        name: {
          identifier  : 'name',
          rules: [
            {
            type   : 'empty',
            prompt : 'Please enter a value'
            }
          ]
        },
        wechat: {
          identifier  : 'wechat',
          rules: [
            {
            type   : 'empty',
            prompt : 'Please enter a value'
            }
          ]
        },
        mobile: {
          identifier  : 'mobile',
          rules: [
            {
            type   : 'number',
            prompt : 'Must Be Numeric'
            },
            {
            type   : 'minLength[11]',
            prompt : 'Please Enter Valid 11 Digit Mobile Number'
            },

          ]
        },
        gender: {
          identifier  : 'gender',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender value'
            }
          ]
        },
        yearofbirth: {
          identifier  : 'yearofbirth',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a year'
            }
          ]
        },
        monthofbirth: {
          identifier  : 'monthofbirth',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a month'
            }
          ]
        },
        recommandgroup: {
          identifier  : 'recommandgroup',
          rules: [
            {
              type   : 'minCount[1]',
              prompt : 'Please select at least one group'
            }
          ]
        },
      },
    });
    $('.ui.dropdown').dropdown({maxSelections: 3});
  },

  componentDidUnMount:function()
  {
    VisitorRegStore.removeChangeListener(this._onChange);
  },

  render:function() {
    return (
    <form className= {classNames({
          'ui form container segment' : true,
          'completed': this.state.isvisitoraddsuccess
        })} 
          id="header" onSubmit={this.handleSubmit}>
      <h1 className="ui dividing header">新人信息登记表</h1>
      <label>基本信息</label>
      <div className="ui four column stackable grid">
        <div className="column field">
          <input className="ui segment" type="text" 
                 name="name" value={this.state.name} placeholder="姓名"
                 onChange={this.handleNameChange}/>
        </div>
        <div className="column field">
          <select className="ui fluid dropdown segment" name="gender" id="gender" onChange={this.handleGenderChange} value={this.state.gender}>
          <option value="">性别</option>
          <option value="1">男性</option>
          <option value="0">女性</option>
          </select>
        </div>
        <div className="column field">
            <select className="ui fluid dropdown search segment" name="yearofbirth" id="yearofbirth" onChange={this.handleYearofbirthChange} value={this.state.yearofbirth}>
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
          <div className="column field">
            <select className="ui fluid dropdown segment" name="monthofbirth" id="monthofbirth" onChange={this.handleMonthofbirthChange} value={this.state.monthofbirth}>
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
      <div className="ui two column stackable grid">
          <div className="column field">
            <input className="ui segment" type="text" name="mobile" placeholder="电话" onChange={this.handleMobileChange} value={this.state.mobile}/>
          </div>
          <div className="column field">
            <input className="ui segment" type="text" name="wechat" placeholder="微信" onChange={this.handleWechatChange} value={this.state.wechat}/>
          </div>
      </div>

      <label>落户情况</label>
      <div className="ui two column stackable grid">
          <div className="column field">
            <pre>{JSON.stringify(this.state.recommandgroup)}</pre>

              <select id="multi-select" className="ui dropdown fluid segment" multiple="multiple" name="recommandgroup" value={this.state.recommandgroup}>
              <option value="">推荐小组:</option>
              <option value="1">活水小组</option>
              <option value="2">葡萄树小组</option>
              <option value="3">知行小组</option>
              <option value="4">橄榄山小组</option>
              <option value="5">加勒团契</option>
            </select>
          </div>
          <div className="column">
              <div className="ui checkbox toggle">
                <input type="checkbox" name="isingroup" checked={this.state.isingroup} onChange={this.handleisingroupChange}/>
                <label>是否已经进入小组</label>
              </div>
          </div>
      </div>

      <div className="field">
        <label>祷告事项：</label>
        <textarea name="prayers" value={this.state.prayers} onChange={this.handleprayersChange}> </textarea>
      </div>
      <div className="ui two button attached buttons">
        <div className="ui blue button" id = "submit" tabIndex="0">保存信息</div>
        <div className="ui red clear button" tabIndex="0">清除信息</div>
      </div>
      <div class="ui message" hidden={!this.state.isvisitoraddsuccess}>
          <p> Congrates! You have added a new visitor!</p>
      </div>
    </form>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function() 
  {
      this.setState({
        isvisitoraddsuccess: VisitorRegStore.getAddVisitorStatus(),
        name:'',
        gender:'',
        yearofbirth:0,
        monthofbirth:0,
        mobile:'',
        wechat:'',
        recommandgroup:[''],
        isingroup:false,
        prayers:''
      });
  }
});

module.exports = VisitorInfo;
