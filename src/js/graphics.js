function fr(x,y,w,h,fill='#F0F'){
    actx.fillStyle = fill;
    actx.fillRect(x, y, w, h);
}

function ln(x,y,x2,y2, thick=1, style="#F0F"){
    actx.beginPath();
    actx.moveTo(x,y);
    actx.lineTo(x2,y2);
    actx.lineWidth = thick;
    actx.strokeStyle = style;
    actx.stroke();
}

function fc(x, y, rx=4, ry=2, style="#FF0"){
    actx.fillStyle = style;
    actx.beginPath();
    actx.ellipse(x, y, rx, ry, 0, 0, Math.PI*2);
    actx.fill();
};

function noiseGradBox(x,y,w,h, fill0="#111", fill1="#FFF", size=1, type=0, amount=1000){
    ctx.fillStyle = fill0;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = fill1;
    while(amount--){
        let px = Math.random()*w;
        let py = Math.random()*h;
        if(Math.random() < px/w){
            ctx.fillRect(x+px, y+py, 1, 1); 
        }
        
    }
}

function mC(w,h){
let c = document.createElement('canvas');
c.width = w; c.height= h;
return{c:c, ctx:c.getContext('2d')};
}

function drawBackground(){
    bg.ctx.fillStyle = '#181';
    bg.ctx.fillRect(0,0,worldWidth, worldHeight);
    actx = bg.ctx;
    for(let i = 0; i < 80000; i++){
    let x = prng.nextBoundedInt(0,worldWidth);
    let y = prng.nextBoundedInt(0,worldHeight);
    fc(x, y, 40, 20, 'rgba(10,50,0,0.05)');
  }
}

function drawPlayerSprite(){
    actx = spriteSheet.ctx;
    actx.translate(sprites.player.x, sprites.player.y);
    fc(50,50,40,40, 'white');
    actx.restore;
}

function drawObstacleSprite(){
    actx = spriteSheet.ctx;
    actx.save();
    actx.translate(sprites.obstacle.x, sprites.obstacle.y);
    fr(20,20,60,60,"#400");
    actx.restore();
}

function sprite(obj, x, y){
        actx.drawImage(spriteSheet.c, obj.x, obj.y, obj.width, obj.height, x, y, obj.width, obj.height );
}
