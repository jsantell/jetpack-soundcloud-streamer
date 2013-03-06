const Request = require('sdk/request').Request;
const URL = 'http://api.soundcloud.com/tracks/';
const CLIENT_ID = '45ee254a8f2e210a3364f138b0e5f9cc';
const HEADERS = {
  accept: 'application/json'
}

function getNext (query, callback) {
  Request({
    url: URL + '?q=' + query + '&client_id=' + CLIENT_ID,
    headers: HEADERS,
    onComplete: callback
  }).get();
}

function getStream (id) {

}

exports.getNext = getNext;
exports.getStream = getStream;
exports.CLIENT_ID = CLIENT_ID;
