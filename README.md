# jetpack-soundcloud-streamer

Experimental FireFox add-on for streaming SoundCloud songs as an add-on

MP3 decoding and Web Audio API coming very soon to Firefox stable, but pushing buffers around is more fun. __Totally doesn't work yet.__

## Notes

* Jetpacks Panel accepts input query, sends to main context to request tracks from SC
* User selects track in panel, sends stream URL to main context due to SoundCloud not sending CORS
* Main context passes URL into modified [aurora.js](https://github.com/ofmlabs/aurora.js) and uses [mp3.js](https://github.com/devongovett/mp3.js) to decode MP3 (aurora modified with Jetpacks' `net/xhr` module), currently throws an `AV.UnderflowError` upon decoding.
* Decoded PCM data is sent to a hiddenFrame into an Audio element via `mozWriteAudio`.

## Libs

* [aurora.js](https://github.com/ofmlabs/aurora.js) (should fork and add jetpack build for this)
* [mp3.js](https://github.com/devongovett/mp3.js)
