var logox = {
'once': true,
'asetexture' : PIXI.Texture.fromImage('files/logo.png'),

'init': function(url, toscene) {
  // loads the logo
  // make new scene?
  // add sprites to scene, Texture(basetexture, frame = rectangle(x,y,width,height)
  var basetexture = PIXI.BaseTexture.fromImage(url);
  if (this.once) {
    this.once = false;
    var blockWidth = 4;
    var blockHeight = 4;
    for (var y = 0; y < basetexture.height; y += blockHeight) {
      for (var x = 0; x < basetexture.width; x += blockWidth) {
        var rect = new PIXI.Rectangle(x, y, blockWidth, blockHeight);
        var sprite = new PIXI.Sprite(new PIXI.Texture(basetexture, rect));
        sprite.position.x = (window.innerWidth-basetexture.width)/2 + x ;
        sprite.position.y = (window.innerHeight-basetexture.height)/2 + y ;

        sprite.ox = sprite.position.x;
        sprite.oy = sprite.position.y;
        sprite.vx = 0;
        sprite.vy = 0;
        sprite.onset = 0;
        if (toscene) {
          stage.addChild(sprite);
        }
      }
    }
    //this.explode(150, 150, -100, 400);
    //this.explode(100, 200, -50, -40);
    //this.explode(650.5, 150.5, 100, -100);
    //this.explode(500.5, 400.5, -100, 100);

  }
},

'explode': function(cx, cy, forcex, forcey) {
  // particles will have speedx, speedy that depend inversely on distance x and y, and forcex and forcey
  // also onset time that is the distance * scalar
  for (var i = 0; i < stage.children.length; i++) {
    var s = stage.children[i];

    var dx = s.position.x - cx; // negative = left of center
    var dy = s.position.y - cy; // negative = top of center

    // var dist = Math.sqrt(dx*dx + dy*dy);
    // if (dist < 1 && dist >= 0) dist = 1;
    // if (dist > -1 && dist <= 0) dist = -1;
    dist = (dx/window.innerWidth)*(dx/window.innerWidth)-(dy/window.innerHeight)*(dy/window.innerHeight); //(dist*dist); //Math.log(dist + 1.0);

    //console.log(s.position.x, 1/dx, s.position.y, 1/dy);

    s.vx += (dist*forcex);
    s.vy += (dist*forcey);

    // if (dx < 0) s.vx = -1*s.vx;
    // if (dy < 0) s.vy = -1*s.vy;

    // if (s.vx < 10.1 && s.vx > -10.1) s.vx = 0;
    // if (s.vy < 10.1 && s.vy > -10.1) s.vy = 0;

    //s.onset = Math.sqrt(dx*dx + dy*dy);
  }
},

'particles': function() {
  var t = Date.now()
  for (var i = 0; i < stage.children.length; i++) {
    var s = stage.children[i];

    //s.position.x += Math.sin(t+s.position.x);
      var y = Math.floor(i/(860/4));
      var x = (i%(860/4));
      s.position.y = 640+4*y+Math.cos(t*0.0001)*130*Math.sin(t*0.003+x*Math.PI*2/(860/4)+Math.cos(t*0.01));
      s.position.x = 480+4*x+Math.sin(t*0.0002)*50*Math.cos(t*0.005+x*2.0*Math.PI/(860/4)+Math.sin(t*0.002));
      //s.scale.x = s.scale.y = stage.children[(i+1)%(860/4)].position.x - s.position.x;
//    s.vx = s.vx * 0.99;
//    s.vy = s.vy * 0.99;
  }
},

'recoup': function() {
  for (var i = 0; i < stage.children.length; i++) {
    var s = stage.children[i];
    //s.position.x = s.ox;
    //s.position.y = s.oy;
    s.vx = 0.8*s.vx;
    s.vy = 0.8*s.vy;
  }
  // gathers image back together
},

'restore': function() {
  for (var i = 0; i < stage.children.length; i++) {
    var s = stage.children[i];
    //s.position.x = s.ox;
    //s.position.y = s.oy;
    s.vx = 0;
    s.vy = 0;
//    console.log('restore');
  }
  // gathers image back together
},


'logo': function() {

  var sprite = new PIXI.Sprite(this.asetexture);
  sprite.position.x = (window.innerWidth - 860)/2;
  sprite.position.y = 20;
  stage.addChild(sprite);

}

};