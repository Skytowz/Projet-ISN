var canvMap = document.getElementById("jeux");
var ctxMap = canvMap.getContext("2d");
var canvPerso = document.getElementById("perso");
var ctxPerso = canvPerso.getContext("2d");




var map1 =
[
1,2,5,5,5,5,5,5,5,3,4,
10,11,14,14,14,14,14,14,14,12,13,
19,20,74,74,74,74,74,74,74,21,22,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
28,29,32,32,32,32,32,32,32,30,31
];




var map2 =
[
1,2,5,5,35,79,34,5,5,3,4,
10,11,14,14,44,79,43,14,14,12,13,
19,20,74,74,53,47,52,74,74,21,22,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,33,25,
26,36,47,47,47,47,47,47,47,33,25,
28,29,32,32,32,32,32,32,32,30,31
];




var map3 =
[
1,2,5,5,5,5,5,5,5,3,4,
10,11,14,14,14,14,14,14,14,12,13,
19,20,74,74,74,74,74,74,74,21,22,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
28,29,32,32,17,47,16,32,32,30,31
];




var map4 =
[
1,2,5,5,35,79,34,5,5,3,4,
10,11,14,14,44,79,43,14,14,12,13,
19,20,74,74,53,47,52,74,74,21,22,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
26,27,47,47,47,47,47,47,47,24,25,
28,29,32,32,17,47,16,32,32,30,31
];





var image =new Image();
image.src ="ISN PROJECT.png";


function dessinerMap (nombreCasex,nombreCasey,map)
{
	for (let yMap=0;yMap<nombreCasey;yMap++)
	{
		for(let xMap=0;xMap<nombreCasex;xMap++)
		{
			let numero = (map[((yMap*11)+xMap)]-1);
			let sx =(numero%9)*32;
			let sy =(Math.trunc(numero/9))*32;

			ctxMap.drawImage(image,sx,sy,32,32,xMap*48,yMap*48,48,48);
			ctxMap.imageSmoothingEnabled = false;
			ctxMap.drawImage(table,0,0,32,32,240,264,48,48)
		}
	}
}





/*********************************************************************************************************************************************************************/




var perso1= new Image();
var table= new Image();
var perso2= new Image();

var cheatpers=0;

var perso= [perso1,perso2];

var ghost=false

table.src="table.png";
perso1.src="pers.png";
perso2.src="perso.png";

var mappy=0

var xp=240;
var yp=432;

var dxp=0;
var dyp=0;

var entrain = false;

var flecheHaut = false;
var flecheBas = false;
var flecheGauche = false;
var flecheDroite = false;
var entrée = false;
var haut = false

var bugper = true;
var VP = 9;

var un =false;
var deux =false;

var timevar=0;
var timeh;
var temps=true;


function drawperso(o)//fonction qui dessine le personnage
	{
		var pers= perso[cheatpers];
		if (ghost)
		{canvPerso.style.filter="blur(8px)"}
		else {
			canvPerso.style.filter="blur(0px)"
		}
		ctxPerso.clearRect(0,0,528,528);//effacer le personnage

		ctxPerso.drawImage(pers,dxp*64,o*64,64,64,xp,yp,48,48);//redessiner le personnage

        if (o==3)//permet de detecter si le personnage regarde vers le haut ou non
            {
                haut=true
            }
        else
            {
                haut=false
            }
		dx();
        console.log(timevar)
	}

function time()
    {
        timevar++;
    }


document.addEventListener("keydown", KD); //abonnement à la fonction KD
document.addEventListener("keyup", KU); //abonnement à la fonction KU


function KD (e)
{
    if(temps)
        {
            timeh=setInterval(time,50);
            temps=false;
        }


	if(e.keyCode==38)
	{

		flecheHaut=true;
		deux=true;
	}

	if(e.keyCode==39)
	{

		flecheDroite=true;
		un=true;
	}

	if(e.keyCode==40)
	{

		flecheBas=true;
		deux=true;
	}

	if(e.keyCode==37)
	{

		flecheGauche=true;
		un=true;
	}

    if(e.keyCode==13)
    {
        entrée=true;
    }


}


function KU (e)
{
    timevar=0;
    clearInterval(timeh)
    temps=true;

	if(e.keyCode==38)
	{
		flecheHaut=false;
		deux=false;
	}

	if(e.keyCode==39)
	{
		flecheDroite=false;
		un=false;
	}

	if(e.keyCode==40)
	{
		flecheBas=false;
		deux=false;
	}

	if(e.keyCode==37)
	{
		flecheGauche=false;
		un=false;
	}

    if(e.keyCode==13)
    {
        entrée=false;
    }
}



function collisionmap1()
{
    if (yp<=72 && flecheHaut)
     {
        flecheHaut=false;
        drawperso(3);
        drawperso(3);
     }


     if (xp==42 && flecheGauche)
     {
         flecheGauche=false;
         drawperso(1);
         drawperso(1);
     }


    if (xp==438 && flecheDroite)
    {

         flecheDroite=false;
         drawperso(2);
         drawperso(2);

    }
    if (yp>=432 && flecheBas)
    {
         flecheBas=false;
         drawperso(0);
         drawperso(0);
    }
}


function collisionmap2()
{
         		  if (!(yp>72 || xp>216 && xp<264))
            {
                    if (flecheHaut)
                {
                        flecheHaut=false;
                        drawperso(3);
                        drawperso(3);
                }
            }

                  if (!(yp>=72 && xp>42 || yp<72 && xp>234))
            {
                    if (flecheGauche)
                {
                        flecheGauche=false;
                        drawperso(1);
                        drawperso(1);
                }
            }

                  if (!(yp>=72 && xp<438 || yp<72 && xp<257))
            {
                    if (flecheDroite)
                {
                        flecheDroite=false;
                        drawperso(2);
                        drawperso(2);
                }
            }
                  if (yp>=432 && flecheBas)
                {
                        flecheBas=false;
                        drawperso(0);
                        drawperso(0);
                }

}



function collisionmap3()
{
    if (yp<=72 && flecheHaut)
     {
        flecheHaut=false;
        drawperso(3);
        drawperso(3);
     }
    if (!((xp>42 && yp<=441) || (yp>441 && xp>234)))
            {
                    if (flecheGauche)
                {
                        flecheGauche=false;
                        drawperso(1);
                        drawperso(1);
                }
            }

                  if (!((xp<438 && yp<=441)||(yp>441 && xp<257)))
            {
                    if (flecheDroite)
                {
                        flecheDroite=false;
                        drawperso(2);
                        drawperso(2);
                }
            }
                  if (!(yp<432 || xp>216 && xp<264))
                {
                	if (flecheBas) {
                        flecheBas=false;
                        drawperso(0);
                        drawperso(0);
                    }
                }

         		}


function collisionmap4()
{
         		  if (!(yp>72 || xp>216 && xp<264))
            {
                    if (flecheHaut)
                {
                        flecheHaut=false;
                        drawperso(3);
                        drawperso(3);
                }
            }
    if (!((yp>=72 && xp>42 && yp<=432) || (yp<72 || yp>432) && xp>234))
            {
                    if (flecheGauche)
                {
                        flecheGauche=false;
                        drawperso(1);
                        drawperso(1);
                }
            }

                  if (!((yp>=72 && xp<438 && yp<=432)|| (yp<72|| yp>432) && xp<257))
            {
                    if (flecheDroite)
                {
                        flecheDroite=false;
                        drawperso(2);
                        drawperso(2);
                }
            }
                  if (!(yp<432 || xp>216 && xp<264))
                {
                	if (flecheBas) {
                        flecheBas=false;
                        drawperso(0);
                        drawperso(0);
                    }
                }

         		}



function collision()
{
    if (victoire==0 && mappy==0)
        {
            collisionmap1()
        }
    if (victoire>=1 && mappy==0)
        {
            collisionmap2()
        }
    if (victoire==0 && mappy>=1)
        {
            collisionmap3()
        }
    if (victoire>=1 && mappy>=1)
        {
            collisionmap4()
        }
}



function collision_table()
    {
        if (yp<=288 && xp>=213 && xp<=267 && yp>216 && flecheHaut)
            {
                flecheHaut=false;
                drawperso(3)
                drawperso(3)
            }
        if (yp>=216 && xp>=213 && xp<=267 && yp<287 && flecheBas)
            {
                flecheBas=false;
                drawperso(0)
                drawperso(0)
            }
        if (yp>216 && xp>213 && xp<=276 && yp<287 && flecheGauche)
            {
                flecheGauche=false;
                drawperso(1)
                drawperso(1)
            }
        if (yp>216 && xp>=204 && xp<276 && yp<287 && flecheDroite)
            {
                flecheDroite=false;
                drawperso(2)
                drawperso(2)
            }
    }

function demarerjeu()
{   if(entrée && yp==288 && xp>=222 && xp<=258 && haut)
        {
            if (mappy==0)
                {
                    Lconsole()
                }
            if (mappy==1)
                {
                    prendreAd()
                }
        }
}


function marcher ()
{

        if(!entrain)
        {

        if(bugper == true) //pour que le perso retombe sur ses 2 pieds
        {
            drawperso(0);
            bugper =false;
        }
    if(timevar>0)
       {
    setTimeout(function()
        {
        collision_table();
        collision();

            if(flecheHaut&&!un)
            {
                yp = yp-VP;
                drawperso(3);

                setTimeout(function()
                {
                    yp=yp-VP;
                    drawperso(3);
                },50)
                changemap();
                console.log("x="+xp+" y="+yp)
            }




            if(flecheBas&&!un)
            {
                yp = yp+VP;
                drawperso(0);

                setTimeout(function()
                {
                    yp=yp+VP;
                    drawperso(0);
                },50)
                changemap();
                console.log("x="+xp+" y="+yp)
            }






            if(flecheGauche&&!deux)
            {
                xp = xp-VP;
                drawperso(1);

                setTimeout(function()
                {
                    xp=xp-VP;
                    drawperso(1);
                },50)
                console.log("x="+xp+" y="+yp)

            }



            if(flecheDroite&&!deux)
            {
                 xp = xp+VP;
                drawperso(2);

                setTimeout(function()
                {
                    xp=xp+VP;
                    drawperso(2);
                },50)
                console.log("x="+xp+" y="+yp)
            }
        },50)
        }
           else
        {
            if(flecheHaut&&!un)
                {
                    drawperso(3)
                    drawperso(3)
                }
            if(flecheBas&&!un)
                {
                    drawperso(0)
                    drawperso(0)
                }
            if(flecheGauche&&!deux)
                {
                    drawperso(1)
                    drawperso(1)
                }
            if(flecheDroite&&!deux)
                {
                    drawperso(2)
                    drawperso(2)
                }

        }


        }

        setTimeout(function()
        {
            collision_table();
            collision();
            marcher();
            demarerjeu();


        },100)


    }



function dx()
	{
		dxp=(dxp+1)%4;
	}

function changemap()
	{
		if (yp<=0)
			 {
                if(victoire==1)
                    {
                        dessinerMap(11,11,map3)

                    }
                 else
                     {
                        dessinerMap(11,11,map4)

                     }
                        yp=441
                        mappy=mappy+1
                        victoire=victoire-1

             }
		if (yp>=450) {
			yp=9
			if (mappy>1)
			{
				dessinerMap(11,11,map4)

			}
			else
			{
				dessinerMap(11,11,map2)

			}
			mappy=mappy-1
			victoire=victoire+1
		}

	}




/*A EFFACER APRÉS*/
function test1()
{
    victoire=1
    dessinerMap(11,11,map2)
}
function test2()
{
    victoire=1
    dessinerMap(11,11,map4)
}
