/*
 * Includes
 */

const Widget = require('sdk/widget').Widget;
const self = require('sdk/self');
const Panel = require('sdk/panel').Panel;
const Page = require('sdk/page-worker').Page;
const Request = require('sdk/request').Request;
const hiddenFrames = require('hidden-frame');

const SoundCloud = require('soundcloud');
const Decoder = require('decoder');

/*
 * Frame for audio
 */

let audioFrame = hiddenFrames.add(hiddenFrames.HiddenFrame({
  onReady: function () {
    let audio = new this.element.contentWindow.Audio();
    Decoder.on('data', function (buffer) {
      audio.mozWriteAudio(buffer);
    });
  }
}));

/*
 * UI
 */

let panel = Panel({
  width: 300,
  height: 200,
  contentURL: self.data.url('panel.html'),
  contentScriptFile: self.data.url('panel.js')
})

let widget = Widget({
  id: 'cloudplay',
  label: 'Cloud Play',
  contentURL: self.data.url('icon.png'),
  panel: panel
});

panel.port.on('query', function (query) {
  SoundCloud.getNext(query, function (data) {
    // TODO error handling
    let songs = data.json;
    songs.forEach(function (song) {
      song.stream_url += '?client_id=' + SoundCloud.CLIENT_ID;
    });
    panel.port.emit('data', songs);
  });
});

panel.port.on('play', function (url) {
  Decoder.decode(url);
});
