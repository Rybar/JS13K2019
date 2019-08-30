player = {
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

    draw: function(){
        actx = gamectx;
        actx.drawImage(sprites, this.x-viewX, this.y-viewY);
    },

    update: function(){
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
