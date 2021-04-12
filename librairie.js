/*==== LIBRAIRE POUR GAGNER DU TEMPS SUR LES AUTRES SCRIPT ===*/

function drawRect (x,y,w,h,c,context) {

    context.fillStyle = c;
    context.fillRect(x,y,w,h);
}

 function drawCircle (ctx,x,y,r,c) {

    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

}
function drawText (text,x,y,c,font,context) {

    context.fillStyle = c;
    context.font = font;
    context.fillText(text,x,y);

}

function Object (x,y,w,h,c,context,object) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;


    this.draw  = () => {  // ceci est une arrow function .C'est l'équivalent de " function () "

        context.fillStyle = this.c;
        context.fillRect(this.x,this.y,this.w,this.h);
    };

     this.colid = () => {
    
          if(object.x + object.w > this.x && object.x < this.x + this.w && object.y  + object.h > this.y && object.y < this.y + this.h)
              {
                 console.log("yolo");
              }
}
}