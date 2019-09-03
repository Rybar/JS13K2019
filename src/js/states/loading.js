states.loading = {
    init: function(){

    },

    draw: function(dt) {
        actx = gamectx;
        fr(0,0,c.width,c.height,'black');
    },

    step: function(dt) {
        actx = gamectx;
        actx.fillStyle = '#fff';
        actx.font = "30px monospace";
        actx.textAlign = "center";
        actx.fillText("LOADING", c.width/2, c.height/2);
        
        if(paused){
            actx.font = "10px monospace";
            actx.textAlign = "center";
            actx.fillText("click to focus game", c.width/2, c.height/2+40);
        }else {
            actx.font = "10px monospace";
            actx.textAlign = "center";
            actx.fillText("press p to continue", c.width/2, c.height/2+40);
            if(Key.justReleased(Key.p)){
                playSound(sounds.cellComplete, 1, 0, 0.5, false);
                state = "title";
                Key.update();
              }
        }
        
    }


}