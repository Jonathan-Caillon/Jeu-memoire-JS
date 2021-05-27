const divResultat = document.querySelector("#resultat");

let tabJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

let tabResultat = genereTableauAleatoire();
let oldSelection = [];
let nbAffiche = 0;
let ready = true;
let rejouer = 0
let essais = 0
const rejouerBTn = document.getElementById("rejouer");
const essaisBTn = document.getElementById("essais");

afficherTableau()

function afficherTableau(){
    let txt = "";

    for(let i = 0; i < tabJeu.length ; i++) {       //Parcours les éléments du tableau tabJeu (4 lignes)
        txt += "<div>"; // ajout de div a chaque incrementations de ligne
        for(let j = 0; j < tabJeu[i].length ; j++){ //Parcours les éléments des éléments du tabJeu (4 colonnes)
            if(tabJeu[i][j] === 0){ // SI la valeur du tableau = 0
                // ajout d'un bouton a chaque colonne de chaque lignes

                txt += '<button class ="btn btn-primary" onClick="verif(\''+i+'-'+j+'\')">?</button>'
            }
            else { // SI la valeur !== 0 ALors affiche une image
                txt += '<img src="'+getImage(tabJeu[i][j])+'">'
            }
            
        }
        txt += "</div>"; // ajout de /div a chaque incrementations de ligne
    }

    divResultat.innerHTML = txt;
}

function getImage(valeur){  // Affiche une image en fonction de la valeur (1 à 8)
    let imgTxt = "./image/"
    switch(valeur){
        case 1 : imgTxt += "elephant.png";
        break;
        
        case 2 : imgTxt += "giraffe.png"
        break;

        case 3 : imgTxt += "hippo.png"
        break;

        case 4 : imgTxt += "monkey.png"
        break;

        case 5 : imgTxt += "panda.png"
        break;

        case 6 : imgTxt += "parrot.png"
        break;

        case 7 : imgTxt += "penguin.png"
        break;

        case 8 : imgTxt += "snake.png"
        break;

        default: console.log("Cas non pris en compte")
    }
    return imgTxt   //Recup de imgTxt en dehors de la boucle
}

// Fonction recuperer les caracteres 0 et 2 qui sont les positions des images

function verif(bouton,){
    if(ready){      //SI
        nbAffiche++;        // Ajoute +1 a chaque clique
        let ligne = bouton.substr(0,1); //recup de la ligne
        let colonne = bouton.substr(2,1); // recup de la colonne
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];   //Remplace le bouton par l'image
        afficherTableau();
    
        if(nbAffiche>1) {       

            ready = false; //Ne peut plus cliquer
            
            setTimeout(function(){      // Apres les 2 cliques 1s d'attente
                if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                    tabJeu[ligne][colonne] = 0;
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0; 
                }
                afficherTableau();
                ready = true    //Peut recliquer
                nbAffiche = 0;  // Reinitialisa a 0 apres 2 cliques
                oldSelection = [ligne,colonne];
                if(tabJeu[ligne][colonne] == tabResultat[oldSelection[0]][oldSelection[1]]){
                    rejouer++
                    if(rejouer == 8){
                        rejouerBTn.style.display = "block";
                    }
                }
                essais++
                essaisBTn.textContent = "Essais: " + essais
                console.log(rejouer)
                console.log(tabResultat)
            },1000)
        }
        else {
            oldSelection = [ligne,colonne];
        }
    }

}

function genereTableauAleatoire(){
    let tab = [];
    let nbImagePosition = [0,0,0,0,0,0,0,0]; 

    for(let i = 0; i < 4; i++){
        let ligne = [];
        for(let j = 0; j < 4; j++){
            let fin = false;
            while(!fin){        //Tant que les images ne sont pas generer
                let randomImage = Math.floor(Math.random() * 8); //Genere une valeur de 0 a 7
                if(nbImagePosition[randomImage] < 2){
                    ligne.push(randomImage + 1 );
                    nbImagePosition[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(ligne);
    }
    return tab;
}

rejouerBTn.addEventListener("click", () => {
    rejouerBTn.style.display = "none";
    document.location.reload(true);
})


