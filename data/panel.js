var body = document.getElementsByTagName('body')[0];
var queryEl = document.getElementById('query');
var audioEl = document.getElementById('audio');
var playlistEl = document.getElementById('playlist');
var delay = 1000;

// debugging
document.getElementById('play').addEventListener('click', function (e) {
  self.port.emit('play', 'http://www.maninblack.org/demos/WhereDoAllTheJunkiesComeFrom.mp3');
});
//


queryEl.addEventListener('keyup', debounce(handleKeyup, delay));
playlistEl.addEventListener('click', handleSongClick);

function handleKeyup (e) {
  loading();
  self.port.emit('query', queryEl.value);
}

function handleSongClick (e) {
  var target = e.target;
  if (!target.classList.contains('play')) { return; }
  self.port.emit('play', target.getAttribute('data-url'));
}

self.port.on('data', function (json) {
  loaded();
  playlistEl.innerHTML = '';
  json.forEach(function (track) {
    playlistEl.appendChild(createListItem(track));
  });
});

function updateList (json) {
  console.log(json[2].title, json[3].title);
}

/*
 * Utility
 */

function createListItem (data) {
  var el = document.createElement('li');
  var img = data['artwork_url'] || data.user['avatar_url'];
  el.setAttribute('data-id', data.id);
  el.innerHTML =
      '<a href="#" data-url="' + data['stream_url'] + '" class="play">' +
        'play' +
      '</a>' +
      '<img src="' + img + '" />' +
      '<span>' + data.user.username + ' - ' + data.title + '</span>' +
      '<a href="' + data['permalink_url'] + '" target="_new">(link)</a>';
  console.log(el.innerHTML);
  return el;
}

function loading () {
  body.classList.add('loading');
}

function loaded () {
  body.classList.remove('loading');
}

/*
 * `debounce` from underscore.js
 * https://github.com/documentcloud/underscore
 * Copyright (c) 2009-2013 Jeremy Ashkenas, DocumentCloud
 */

function debounce (func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
}
