player = {
    type: "player",
    x: 0, 
    y: 0,
    width: 64,
    height: 64,
    xVel: 0,
    yVel: 0,
    xAcc: 0,
    yAcc: 0,
    drag: 10,
    speed: 0.05,

    draw: function(dt){
        actx = gamectx;
        actx.drawImage(spriteSheet.c, 0,0,100,100, this.x-viewX-this.width/2, this.y-viewY-this.height/2, 100, 100);
    },

    update: function(dt){
        if(Key.isDown(Key.a)){
            this.x -= this.speed;
        }else if(Key.isDown(Key.d)){
            this.x += this.speed;
        }
        if(Key.isDown(Key.w)){
            this.y -= this.speed;
        }else if(Key.isDown(Key.s)){
            this.y += this.speed;
        }
    }
}
