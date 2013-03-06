function AudioPlayer () {
  this.audio = new Audio();
  this.audio.mozSetup(2, 44100);

  this.writePos = 0;
  this.prebufferSize = 44100/2;
  this.tail = null;
  this.tailPos = null;
}

AudioPlayer.prototype.push = function (buffer) {
  var currentPos = this.audio.mozCurrentSampleOffset();
  var available = currentPos + this.prebufferSize - this.writePos;
  if (available > 0) {

  }

  this.audio.mozWriteAudio(buffer);
}

AudioPlayer.prototype.play = function () {
  var written;
  // Check if some data was not written in previous attempts
  if (this.tail) {
    written = this.audio.mozWriteAudio(tail.subarray(tailPosition));
    this.writePos += written;
    this.tailPos += written;
    if (tailPos < tail.length) {
      // Not all the data was written, saving tail
      return;
    }
    tail = null;
  }
}
    if(available > 0) {
      // Request some sound data from the callback function.
      var soundData = new Float32Array(available);
      readFn(soundData);

      // Writting the data.
      written = audio.mozWriteAudio(soundData);
      if(written < soundData.length) {
        // Not all the data was written, saving the tail.
        tail = soundData;
        tailPosition = written;
      }
      currentWritePosition += written;
    }
  }, 100);
}

var frequency = 440, currentSoundSample = 0;
var sampleRate = 44100;

function requestSoundData(soundData) {
  if (!frequency) { return; }
