states.loading = {
    
    draw: function(dt) {
        actx = gamectx;
        fr(0,0,c.width,c.height,'black');
        actx.fillStyle = '#0f0';
        actx.font = "30px monospace";
        actx.textAlign = "center";
        actx.fillText(loadingText[(soundsReady == totalSounds)+0], c.width/2, c.height/2);
        actx.font = "10px monospace";
        actx.textAlign = "center";
        actx.fillText(loadingText[(paused) + 2], c.width/2, c.height/2+40);
    },

    step: function(dt) {
        actx = gamectx;
        
        
        if(paused){
            
        }else {
            if(Key.justReleased(Key.p)){
                playSound(sounds.cellComplete, 1, 0, 0.5, false);
                state = "title";
                Key.update();
              }
        }
        
    }


}