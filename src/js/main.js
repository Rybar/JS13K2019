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

  state = 'play';

  sounds = {};
  prng = new PRNG(1019);

  data = [];

  worldWidth = 10240;
  worldHeight = 10240;

  deadzoneX = 100;
  deadzoneY = 100;
  player.x = 400;
  player.y = 400;
  viewX = player.x-640/2;
  viewY = player.y-360/2;
  viewW = 640;
  viewH = 360;
  obstacleCount = 1000;
  bg = mC(worldWidth, worldHeight);
  spriteSheet = mC(1000, 1000);

  obstacles = [];
  createObstacles();

  c.width = 640; c.height = 360;
  c.style = 'width: 1280px; height: 720px';

  gamectx = c.getContext('2d');

  
  drawBackground();
  drawSprites();
  drawPlayerSprite();
  drawObstacleSprite();
  
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
     states[state].step(tick);
   }
   states[state].draw(dt);
   //stats.end();
  requestAnimationFrame(loop);
}

timeStamp = () => {
  if (window.performance && window.performance.now)
    return window.performance.now();
  else
    return new Date().getTime();
}

createObstacles = () => {

  for(let i = 0; i < obstacleCount; i++){
    obstacles.push({
      type: "obstacle",
      x: prng.nextBoundedInt(0, worldWidth),
      y: prng.nextBoundedInt(0, worldHeight),
      width: 40,
      height: 40
    })
  }
}

drawObstacles = () => {
  obstacles.forEach(function(el, i, arr){
    if(inView(el.x-viewX, el.y-viewH)){
      sprite(sprites.obstacle, el.x-viewX, el.y-viewY)
    }
  })
}

sprites = {
  player: {
    x: 0, y: 0, width: 100, height: 100
  },
  obstacle: {
    x: 100, y: 0, width: 80, height: 80
  }
}
//----- END main.js---------------


drawSprites = () => {

}