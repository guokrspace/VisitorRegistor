
var React = require('react')
var Router = require('react-router').Router
var Route = require('react-router').Route
var hashHistory = require('react-router').history
var Link = require('react-router').Link
var Register = require('./js/components/VisitorRegister.react')
var VisitorList = require('./js/components/VisitorList.react')
var App = require('./js/components/VisitorRegister.react')

React.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/register" component={Register}/>
    <Route path="/list" component={VisitorList}/>
  </Router>
), document.getElementById('todoapp'))