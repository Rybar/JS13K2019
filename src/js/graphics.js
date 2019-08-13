function fr(x,y,w,h,fill='#F0F'){
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
}

function ln(x,y,x2,y2, thick=1, style="#F0F"){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = thick;
    ctx.strokeStyle = style;
    ctx.stroke();
}

function fc(x, y, rad=4, style="#FF0"){
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fill();
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