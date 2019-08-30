states.play = {
    draw: function(dt) {
        actx = gamectx;
        fr(0,0,c.width,c.height,'red');
        actx.drawImage(bg.c, viewX, viewY,640,360,0,0,640,360);
        
        //actx.drawImage(sprites, 100, 100);
        player.draw(dt);
        drawObstacles();
    },

    step: function(dt) {
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
}