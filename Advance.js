var canvAd=document.getElementById("advance");
var ctxAd=canvAd.getContext("2d");





function prendreAd ()
{
    document.getElementById('Advance').classList.remove('EAD');
    document.getElementById('Advance').classList.add('PAD');
    entrain = true;
    entrainad = true;
}

function enleverAd ()
{
    document.getElementById('Advance').classList.remove('PAD');
    document.getElementById('Advance').classList.add('EAD');
    entrain = false;
    entrainad = false;
}

function commencerAd () {

    STARTad = true;
}

var entrainad = false;

var UPad = false;
var DOWNad = false;

var STARTad = false;

var vxad = -2;
var vyad = 1;
var vitessead = 2;

var rouge = 0;
var vert = 255;
var widthChar = 20;

var vjad = 4;

var IDintervalad;

var Idintervalchar;
var bugchargement = true;

var chargement = document.getElementById('chronoQuatre');

var mapad = new Object(0,0,canvAd.width,canvAd.height,"black",ctxAd);
var pcad  = new Object(canvAd.width - 31 , canvAd.height / 2 - 20,10,40,"white",ctxAd);
var playerad = new Object(31,canvAd.height / 2 - 20 ,10,40,"white",ctxAd);
var middlead = new Object(canvAd.width / 2 - 2, 0 ,4 , 15,"white",ctxAd);
var balad = new Object(canvAd.width / 2 - 7 ,canvAd.height / 2 - 6  ,14,14,"white",ctxAd);

function update () {

    movePlayerad();
    movePcad();
    moveBalad();
    mapad.draw();
    pcad.draw();
    playerad.draw();
    drawMiddle();
    balad.draw();

}

function drawMiddle () { // fonction pour dessiner les traits du milieux.

    middlead.y = 0;
    for (var i = 0 ; i<canvAd.height ; i+= 29.6) {

        middlead.draw();
        middlead.y += 29.6;

    }

}

document.addEventListener("keydown",KDad);
function KDad (e) {

    if(entrainad)
        {
             switch(e.keyCode)
               {
                   case 38 :
                       UPad = true;
                       break;
                   case 40:
                       DOWNad = true;
                       break;

               }
        }


}

document.addEventListener("keyup",KUad)
function KUad (e) {

    if(entrainad) {

        switch (e.keyCode)
            {
                case 38 :
                    UPad = false;
                    break;
                case 40 :
                    DOWNad = false;
                    break;
            }
    }
}

function movePlayerad () {

    if(UPad && playerad.y > 0)
        playerad.y -= vjad;
    if(DOWNad && playerad.y + 40 < canvAd.height)
        playerad.y += vjad;
}

function movePcad () {

    pcad.y  = balad.y + 7 + -20 ;

    if(pcad.y < 0)
        pcad.y = 0;
    if(pcad.y + 40 > canvAd.height)
        pcad.y = canvAd.height - 40;
}

function collisionAd () {

    balad.top = balad.y;
    balad.bottom = balad.y + balad.w;
    balad.right = balad.x + balad.w;
    balad.left = balad.x;

    playerad.top = playerad.y;
    playerad.bottom = playerad.y + playerad.h;
    playerad.right = playerad.x + playerad.w;
    playerad.left = playerad.x;

    return (balad.left < playerad.right && balad.left > playerad.left && balad.bottom > playerad.top && balad.top < playerad.bottom)
}

function moveBalad () {


    if(STARTad)
        {
            if(bugchargement)
                {
                    Idintervalchar = setInterval(activerChargement,1000/60);
                    bugchargement=false;
                }


            balad.x += vxad;
            balad.y += vyad;

            if(balad.y < 0 || balad.y + balad.w > 205)
                vyad *= -1;

            if(collisionAd())
                {
                    var pointco = (balad.y + balad.h/2) - (playerad.y + playerad.h/2);
                    pointco = pointco / (playerad.h/2);

                    var angle = pointco * (Math.PI/4);
                    console.log(Math.cos(angle));

                    vxad =vitessead* Math.cos(angle);
                    vyad =vitessead* Math.sin(angle);

                }

            //quand la balle touche le pc elle repart avec un angle de 45°
            if(balad.x > pcad.x - 14)
                {
                    vxad = -vitessead * Math.cos(Math.PI/4);
                    if(vyad > 0)
                    vyad = vitessead * Math.sin(Math.PI/4);
                    else
                    vyad = -vitessead * Math.sin(Math.PI/4);
                }


    if(balad.x < 0) {
        STARTad = false;
        balad.x = canvAd.width/2 - 7;
        balad.y = canvAd.height/2-7;
        clearInterval(Idintervalchar);
        rouge = 0;
        vert = 255;
        widthChar = 20;
        bugchargement = true;
        vitessead = 2;
        vxad = 2;
        vyad = 2;


    } // fond du canvas



        }

}

function activerChargement() {

    rouge += (255/60)/60;
    vert -= (255/60)/60;

    widthChar += (280/60)/60;

    chargement.style.backgroundColor = "rgb("+rouge+","+vert+","+0+")"
    chargement.style.width = widthChar+"px";

    if(widthChar > 300)
        {
            clearInterval(Idintervalchar);
            STARTad = false;
            balad.x = canvAd.width/2 - 7;
            balad.y = canvAd.height/2-7;
            document.getElementById('star2').style.backgroundImage = "url('star.png')";
            victoire=true;
            dessinerMap(11,11,map4)
        }


    if(widthChar > 110 && widthChar < 200)
        vitessead = 3.5;

    if(widthChar > 200)
        vitessead = 5;

}

//la fonction setInterval renvoie un idetifiant (ex : 1) que je stoque dans une variable qui nous permettera de l'utiliser pour utiliser clearInterval.
IDintervalad = setInterval(update,1000/60);
