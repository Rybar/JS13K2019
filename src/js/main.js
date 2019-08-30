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
  prng = new PRNG(1019);

  deadzoneX = 500;
  deadzoneY = 300;
  viewX = player.x -640/2;
  viewY = player.y -360/2;
  player.x = 400;
  player.y = 400;
  viewW = 640
  viewH = 360


  c.width = 640; c.height = 360;
  c.style = 'width: 1280px; height: 720px';

  gamectx = c.getContext('2d');

  bg = mC(2560,2560);
  bg.ctx.fillStyle = '#080';
  bg.ctx.fillRect(0,0,2560,2560);
  actx = bg.ctx;
  for(let i = 0; i < 1000; i++){
   
    let x = prng.nextBoundedInt(0,2560);
    let y = prng.nextBoundedInt(0,2560);
    fr(x, y, 100, 100, 'rgba(0,50,0,0.55)');
  }
  actx = gamectx;

  sc = mC(200, 200);
  sprites = sc.c;
  spritectx = sc.ctx
  actx = spritectx;
  fc(100,100,50, 'white',);
  
  //change
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
  if(Key.justReleased(Key.r)){
    playSound(sounds.cellComplete, 1, 0, 0.5, false);
    Key.update();
  }
  player.update();
  if(player.x - viewX + deadzoneX > viewW){
    viewX = player.x - (viewW - deadzoneX)
  }
  else if(player.x - deadzoneX < viewX){
    viewX = player.x - deadzoneX
  }
  if(player.y - viewY + deadzoneY > viewH){
    viewY = player.y -(viewH - deadzoneY)
  }
  else if(player.y - deadzoneY < viewY){
    viewY = player.y - deadzoneY 
  }
}
draw = dt => {
  actx = gamectx;
  fr(0,0,c.width,c.height,'red');
  actx.drawImage(bg.c, viewX, viewY,640,360,0,0,640,360);
  
  //actx.drawImage(sprites, 100, 100);
  player.draw();
}

timeStamp = () => {
  if (window.performance && window.performance.now)
    return window.performance.now();
  else
    return new Date().getTime();
}
//----- END main.js---------------
