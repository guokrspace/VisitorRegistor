
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Register = require('./js/component/VisitorRegister.react')

render((
  <Router history={hashHistory}>
    <Route path="/" component={ToDoApp}/>
    {/* add the routes here */}
    <Route path="/register" component={Register}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('todoapp'))