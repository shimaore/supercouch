var _ = require('./util')
  , Request = require('./request');

module.exports = Couch;

function Couch (address, opts) {
  if ('object' === typeof address) {
    opts = address;
    address = 'http://localhost:5984';
  }

  opts = opts || {};
  this.reqOpts = {
    base: address || 'http://localhost:5984'
  }
};

Couch.prototype.request = function (method, _url) {
  var opts = _.merge({
      method: method
    , path: [ _url ]
  }, this.reqOpts);

  var req = new Request(opts);
  return req;
};

Couch.prototype.dbAdd = function (name, fn) {
  var opts = _.merge({
      method: 'PUT'
    , path: [ name ]
  }, this.reqOpts);

  var req = new Request(opts)
  if (fn && 'function' == typeof fn) req.end(fn);
  return req;
};

Couch.prototype.dbDel = function (name, fn) {
  var opts = _.merge({
      method: 'DELETE'
    , path: [ name ]
  }, this.reqOpts);

  var req = new Request(opts)
  if (fn && 'function' == typeof fn) req.end(fn);
  return req;
};

Couch.prototype.dbInfo = function (name, fn) {
  var opts = _.merge({
      method: 'GET'
    , path: [ name ]
  }, this.reqOpts);

  var req = new Request(opts)
  if (fn && 'function' == typeof fn) req.end(fn);
  return req;
};