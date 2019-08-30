function lineLine(x1, y1, x2, y2, x3, y3, x4, y4){
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    //if uA and uB are between 0 and 1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        let intX = x1 + (uA * (x2-x1));
        let intY = y1 + (uA * (y2-y1));
        
        return [intX, intY];
        //return true;
      }else return false;
}

function lineBox(x1, y1, x2, y2, rx, ry, rw, rh){
    let left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    let right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    let top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

  // if ANY of the above are true, the line
  // has hit the rectangle
  if (left || right || top || bottom) {
      //return true;
    return [left, right, top, bottom];
  }
  return false;
}

boxBox = (a, b) => {
  let aleft = a.x,
      aright = a.x+a.width,
      atop = a.y,
      abottom = a.y+a.height,
      bleft = b.x,
      bright = b.x+b.width,
      btop = b.y,
      bbottom = b.y+b.height;
      
  return !(bleft > aright || 
    bright < aleft || 
    btop > abottom ||
    bbottom < atop);
}