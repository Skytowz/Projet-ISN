    var c = 1;
	var debut ;
	var couleurSerpent;
    var bug ;
    var score =0;
    var boy =document.getElementById("boy");
    var ctxb = boy.getContext('2d');
	var canv = document.getElementById("mon_canvas");
	var ctx = canv.getContext('2d');
    var tab =document.getElementById("tabScore");

    var hard=document.getElementById('hardMode');
    var cHard=hard.getContext('2d');
    var victoire=false;
    var bugd = false;
    var serpent =
    [
        {x:180,y:144},
        {x:168,y:144},
        {x:156,y:144},
        {x:144,y:144},
        {x:132,y:144},
        {x:120,y:144},
        {x:108,y:144}
	 ]

	var vitesse =13;
    var vx =12;
    var vy =0;


    function go()
    {
    	debut = true; //debut permet de determinner si on a clicker sur le bouton jouer .
        SAD();
        document.getElementById("tuto1").style.visibility= "hidden";
    }

    function avancer()
    {
        bug = false;

        nettoyer();         //dessiner la map.
        dessiner();         //dessiner le serpent.
        scoreManagement();  // dessiner le score.
        couleurManager();   //permet de changer la couleur du serpent grace aux boutons de la gameboy.

        if(debut)
            {
                dessinerN();//dessiner nourriture.
                mouvement()// permet d'avancer le serpent
            }


    	if (GameOver())
            {

                bugd = false;
                return;
            }


        if(score==10)
        {
            MAHM(); //afficher le hard Mode
            vitesse=20; //j'augmente la vittesse (je passe de 13fps à 20 )
        }

        if(score == 15)
        {
            nettoyer();
            drawText("congratulations",2,150,"red","40px Arial",ctx);
            scoreManagement();
            victoire=1;
            dessinerMap(11,11,map2);
             document.getElementById('star1').style.backgroundImage = "url('star.png')";
            return;
        }


		setTimeout(avancer,1000/vitesse);
    }


    function Recommencer()// je remet toutes les variables au point de depart,et relance  la fonction avancer qui n'a pas encore etait lancée ou qui l'était mais qui a été arrétée
    {
        //bugd permet d' utiliser la fonction recommencer uniquement au debut et quand on a perdu
        if(!bugd)
            {
                vx = 12;
                vy = 0;
                score = 0;
                debut= false;
                vitesse = 13;
                MAHE();        //j'enleve l'animation de hard mode ,pour pouvoir la rejouer quand le score arrivera à 10.
                serpent =
                [
                {x:180,y:144},
                {x:168,y:144},
                {x:156,y:144},
                {x:144,y:144},
                {x:132,y:144},
                {x:120,y:144},
                {x:108,y:144}
                ]

                scoreManagement();
                nettoyer();
                avancer();

                bugd = true;
            }

    }


    function dessiner()
    {
        for(var i = 0; i<serpent.length ; i++)
            {
                drawRect(serpent[i].x,serpent[i].y,12,12,couleurSerpent,ctx);
            }
    }

    function nettoyer()
    {
        drawRect(0,0,canv.width,canv.height,"white",ctx);
    }

    function mouvement()
    {
        var tete = {x:serpent[0].x + vx, y:serpent[0].y + vy};

        serpent.unshift(tete);

        // si ma tete n'est pas sur de la nourriture ,j'enleve le dernier element de mon tableau .Autrement dit : quand ma tete sera sur de la nourriture ,pop() ne sera pas effectué ce qui fera augmenter la taille du serpent.
        if(!(serpent[0].x==foodX && serpent[0].y==foodY))
        serpent.pop();
        else score++ //quand ma tete sera sur de la nourriture , le score augmentera de 1.
    }




    document.addEventListener("keydown",controleur); //la fonction controleur sera appelée a chaque fois que je ferais une action de type "keydown" en mettant comme argument a cette meme fonction l'evenement écouté
    function controleur(e)
    {

    if(bug) //pour pas pouvoir changer de direction 2 fois de suite
    return;

    bug = true;

       if(e.keyCode == 38 && vy != 12) // si je veux aller vers le haut je dois m'assurer que je ne vais pas vers le bas
            {
                vy = -12;
                vx = 0;
            }

       if(e.keyCode == 40 && vy != -12) // si je veux aller vers le bas je dois m'assurer que je ne vais pas vers le haut
            {
                vy = 12;
                vx = 0;
            }

       if(e.keyCode == 37 && vx != 12) // si je veux aller vers la gauche je dois m'assurer que je ne vais pas vers la droite
            {
                vy = 0;
                vx = -12;
            }

       if(e.keyCode == 39 && vx != -12) // si je veux aller vers la droite je dois m'assurer que je ne vais pas vers la gauche
            {
                vy = 0;
                vx = 12;
            }



	}
    document.addEventListener("keydown",touche1);
  function touche1 (e)
  {
    if(e.keyCode == 80 && entrain)
         {
           go()
         }
    if (e.keyCode == 82 && entrain)
    {
       Recommencer()
    }
  }

	function GameOver ()
	{
        for (var i = 4 ; i<serpent.length ; i++) // je commence à i = 4 car la tete  ne peut rentrer dans le corps que a partir du 4eme bout de son corps
        {
            if(serpent[i].x==serpent[0].x && serpent[i].y==serpent[0].y)
                return true ;
        }

        if(serpent[0].x < 0 || serpent[0].x > canv.width - 12 || serpent[0].y < 0 || serpent[0].y > canv.height - 12)
        return true;


    }

    function changerC()
    {
        switch(c)
        {
            case 0:
                couleurSerpent = "lightgreen";
                break;

            case 1:
                couleurSerpent = "red";
                break;

            case 2:
                couleurSerpent = "black";
                break;

            case 3:
                couleurSerpent = "blue";
                break;

            case 4:
                couleurSerpent = "purple";
                break;

            case 5:
                couleurSerpent = "yellow";
                break;

            case 6:
                couleurSerpent = "pink";
                break;

            case 7:
                couleurSerpent = "brown";
                break;
        }

    }

    function couleurManager ()
    {
        if (c==8)
        {
            c=0;
        }
        if (c==-1)
        {
            c=7;
        }
        changerC();
    }

    function Cplus()
    {
        c = c+1;
    }

    function Cmoins()
    {
        c = c-1;
    }

    function Lconsole()
    {
        document.getElementById('div1').classList.remove('versLeBas');
        document.getElementById('div1').classList.add('animation');
        Recommencer();
        entrain = true; //entrain est une variable qui permet de detecter si on est entrain de jouer à une console; elle est inisialisé dasn map.js, elle empeche le perso de bouger
    }

    function enlever()
    {
        document.getElementById('div1').classList.remove('animation');
        document.getElementById('div1').classList.add('versLeBas');
        SAG();
        entrain = false;
    }

/***********************************************************************************/

/* j'ai 2 class dans mon css:

scoreAnimd contenant l'animation pour sortir le panaux du score de derriere la gameboy
scoreAnimg contenant l'animation pour remettre le panaux du score derriere la gamboy

scoreAnim sont deux class opposée .

si je veux ajouter scoreAnimd je dois m'assurer que scoreAnimg ne sois pas deja dans tabScore et inversement.

*/
    function SAG()
    {
        document.getElementById('tabScore').classList.remove('scoreAnimd'); //c'est pour cela que j'enleve toujours l'oposée avant d'ajouter l'autre.
        document.getElementById('tabScore').classList.add('scoreAnimg');
    }

    function SAD()
    {
        document.getElementById('tabScore').classList.remove('scoreAnimg');
        document.getElementById('tabScore').classList.add('scoreAnimd');
    }

/***************************************************************************************/



    function Cnourriture ()
    {
        // je multiplie un chiffre aléatoire entre 1 et 0 (1 exclue) par 100 pour avoir un chiffre qui peut etre plus grand que 23.
        // ensuite je prend l'arrondie de la valeur au dessus (ex : 2.05 = 3) pour avoir un nombre entier.
        // je prend le reste de la division de ce nombre entier par 21 pour avoir un nombre entre 0 et 20.
        // je multiplie ce nombre par 12 pour que la nourritue sois dans le meme x et le meme y que mon serpent (le serpent se deplace de 12 en 12).
        // si j'ai 0 lors du reste ,ça fera 0*12 = 0. si je rajoute un +12 c'est pour que le x ou le y de la nourriture ne sois pas colé au bord.
        foodX =(((Math.ceil(Math.random()*100))%21)*12)+12 ;
        foodY =(((Math.ceil(Math.random()*100))%21)*12)+12 ;
     }


    function dessinerN()
    {
        for(var i = 0 ; i<serpent.length ; i++) {
            //je verifie avant de dessiner la nourriture si mon serpent n'est pas dessus.Si c'est la cas, je calcul de nouvelle coordonées.
            //cette verification devrait logiquement se faire dans la fonction qui permet de creer les coordonées et pas ici.
            //mais la fonction Cnourriture est appelé uniquement si les coordonées du serpent sont egales à celle de la nourriture.
            //et vue que dessinerN et joué dans la boucle , alors le meilleur endroit de faire cette verification c'est ici
            if(serpent[i].x == foodX && serpent[i].y == foodY)
                Cnourriture();
        }
        drawRect(foodX,foodY,12,12,"black",ctx);
    }



    function Dhard()
    {
        drawText("Hard Mode",40,23,"red","30px Arial",cHard);//je purrais utiliser hard.innerText = 'Hard Mode' mais j'ai envie d'essayer pour varier.
    }

    function scoreManagement()
    {
        tab.innerText = score;
    }


    function MAHM()
    {
        document.getElementById('hardMode').classList.add('mah');    //MAHM sert à ajouter au niveau du CSS mah à hardMode .mah  est l'animation pour afficher le " hard mode".
    }

    function MAHE()
    {
         document.getElementById('hardMode').classList.remove('mah'); // j'enleve mah de harMode car la prochaine fois que je lancerais MAHM ,si mah est deja dans harMode , alors l'animation ne sera pas joué car elle aura deja etait joué
    }

    Dhard();            //je le lance une seul fois car la valeur de harde mode sera toujours hard mode.
    Cnourriture();      // je le lance pas dans la boucle car je veux qu'elle soit lancée uniquement si mon serpent est sur de la nouriture.
