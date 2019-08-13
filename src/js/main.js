//-----main.js---------------


states = {};

init = () => {
  
  //stats = new Stats();
  //stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  //document.body.appendChild( stats.dom );

  audioCtx = new AudioContext;
  audioMaster = audioCtx.createGain();
  audioMaster.connect(audioCtx.destination);

  fps  = 60;
  tick = 1/fps;
  dt   = 0;
  start = elapsed = now = last = timeStamp();

  
  sounds = {};
  c.width = 640; c.height = 360;
  c.style = 'width: 1280px; height: 720px';

  ctx = c.getContext('2d');
  
  music = new CPlayer();
  music.init(song);
  done = false;
  
  soundsReady = 0;
  sndData = [
    {name:'song', data: song},
    {name:'cellComplete', data: cellComplete},
    ]
  //music stuff-----------------------------------------------------
      sndData.forEach(function(o){
          var sndGenerator = new CPlayer();
          sndGenerator.init(o.data);
          var done = false;
          setInterval(function () {
            if (done) {
              return;
            }
            done = sndGenerator.generate() == 1;
            if(done){
              let wave = sndGenerator.createWave().buffer;
              audioCtx.decodeAudioData(wave, function(buffer) {
                sounds[o.name] = buffer;
                soundsReady++;
                gameSong = playSound(sounds.song, 1, 0, 0.5, true);
              })
            }
          },0)
    })
    
  //FLAGS--------------------------------------------------------------
  paused = false;
  
   loop();

}

//initialize  event listeners--------------------------
window.addEventListener('keyup', function (event) {
  Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function (event) {
  Key.onKeydown(event);
}, false);
window.addEventListener('blur', function (event) {
  paused = true;
}, false);
window.addEventListener('focus', function (event) {
  paused = false;
}, false);



loop = () => {
  //stats.begin();
   now = timeStamp();
   dt = dt + Math.min(1, (now - last) / 1000);
   elapsed = now - start;
   while(dt > tick) {
     dt = dt - tick;
     step(tick);
   }
   draw(dt);
   //stats.end();
  requestAnimationFrame(loop);
}



step = dt => {
  if(Key.justReleased(Key.a)){
    playSound(sounds.cellComplete, 1, 0, 0.5, false);
    Key.update();
  }
}
draw = dt => {
  let boxFill = 'green';
  fr(0,0,c.width,c.height,'#303');
  let x = 100 + Math.sin(elapsed/1000) * 50;
  let y = 100 + Math.cos(elapsed/1000) * 50;

  let lx = c.width/2 + Math.sin(elapsed/1000) * c.height/2;
  let ly = c.height/2 + Math.cos(elapsed/1000) * c.height/2;
  let ldx = c.width/2 + Math.sin(elapsed/1000 + Math.PI) * c.height/2;
  let ldy = c.height/2 + Math.cos(elapsed/1000 + Math.PI) * c.height/2;

  collide = lineBox(lx, ly, ldx, ldy, x, y, 64, 64);
  if(collide){
    boxFill = 'red';
  }
  noiseGradBox(30,30,200,64);
  fr(x,y,64,64, boxFill);
  ln(lx, ly, ldx, ldy, 3);

  if(collide){
    collide.forEach(function(e){
      if(e){
        //console.log(e);
        fc(e[0], e[1]);
      }
    })
  }
}

timeStamp = () => {
  if (window.performance && window.performance.now)
    return window.performance.now();
  else
    return new Date().getTime();
}
//----- END main.js---------------
