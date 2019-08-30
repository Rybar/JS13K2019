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

function fc(x, y, rad=4, style="#FF0"){
    actx.fillStyle = style;
    actx.beginPath();
    actx.arc(x, y, rad, 0, Math.PI*2);
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
