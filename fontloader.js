var _ = require('lodash')
  , fs = require('fs');

var letterW = 32
  , letterH = 32;

var dummyFrame = {
  'frame': {'x':0,'y':0,'w':letterW,'h':letterH},
  'rotated': false,
  'trimmed': false,
  'spriteSourceSize': {'x':0,'y':0,'w':letterW,'h':letterH},
  'sourceSize': {'w':letterW,'h':letterH}
};

// Fake TexturePack sheet
var fontSheet = {
  frames: {},
  meta: {
    'app': 'http://www.texturepacker.com',
    'version': '1.0',
    'image': 'font.png',
    'format': 'RGBA8888',
    'size': {'w':320,'h':192},
    'scale': '1',
    'smartupdate': '$TexturePacker:SmartUpdate:9e3e5afd01ea8e418afabfbdcd724485$'
  }
};

var createSheet = function() {

  var start = ' '.charCodeAt(0);

  for (var i = 0; i < 60; ++i) {

    var frame = _.cloneDeep(dummyFrame);
    frame.frame.x = (i % 10) * letterW;
    frame.frame.y = Math.floor(i / 10) * letterH;

    // var c = String.fromCharCode(start + i);
    //
    var c = start + i;


    fontSheet.frames[c] = frame;
  }


}();

fs.writeFile('font.json', JSON.stringify(fontSheet, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved.");
    }
});
