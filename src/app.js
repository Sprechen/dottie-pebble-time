/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Voice = require('ui/voice');
var Settings = require('settings');

Settings.option('txt', 0);

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  body: 'Press select button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'select', function(e) {
  Voice.dictate('start', false, function(e) {
    if (e.err) {
      console.log('Error: ' + e.err);
      return;
    }
  
    main.body(e.transcription);
    var dict = {
      'txt': e.transcription
    };
    Pebble.sendAppMessage(dict, function() {
      console.log('Message sent successfully: ' + JSON.stringify(dict));
    }, function(e) {
      console.log('Message failed: ' + JSON.stringify(e));
    });
    
    
  });
});
