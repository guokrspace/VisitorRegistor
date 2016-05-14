
var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line

/**
 * Wrapper for calling a API
 */
var Api = {
  get: function (url) {
    return new Promise(function (resolve, reject) {
      request
        .get(url)
        .end(function (res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  post: function (url,data) {
    return new Promise(function (resolve, reject) {
      request
        .post(url)
        .send(data)
        .set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end(function (res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};

module.exports = Api;
