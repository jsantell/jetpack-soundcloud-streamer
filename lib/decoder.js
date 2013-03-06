const AV = require('aurora-mp3');
let { emit, on, once, off } = require('sdk/event/core');
let asset;

function decode (url) {
  asset = AV.Asset.fromURL(url);

  asset.on('decodeStart', function () {
    console.log('DECODER: START');
    asset.on('data', function (buffer) {
      console.log('DECODER: DATA');
      emit(exports, 'data', buffer);
      asset.decoder.readChunk();
    });
    asset.decoder.readChunk();
  });
  asset.start();
}

function getAsset () {
  return asset;
}

exports.on = on.bind(null, exports);
exports.once = once.bind(null, exports);
exports.off = off.bind(null, exports);
exports.decode = decode;
exports.getAsset = getAsset;
