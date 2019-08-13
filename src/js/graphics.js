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