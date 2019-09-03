states.title = {
    init: function(){
        gameSong = playSound(sounds.song, 1, 0, 0.5, true);
    },

    draw: function(dt) {
        actx = gamectx;
        fr(0,0,c.width,c.height,'yellow');
        actx.fillStyle = '#000';
        actx.font = "30px monospace";
        actx.textAlign = "center";
        actx.fillText("BACKUP", c.width/2, c.height/2);
    },

    step: function(dt) {
        if(Key.justReleased(Key.space)){
            playSound(sounds.cellComplete, 1, 0, 0.5, false);
            state = "play";
            Key.update();
          }
    }
}