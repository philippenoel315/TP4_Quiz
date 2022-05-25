/**
 *  Fichier principal javascript
 */

// On utilise le mode strict par défaut pour ajouter de la robustesse à nos variables et à la syntaxe.
// DÉTAILS : https://www.w3schools.com/js/js_strict.asp
"use strict";
/* #################################################################################################*/

    
/**Fichier JSON */

let questionnaire = `
[
    {
        "question":"En quelle année fut créé google?",
        "choix":["1940",
               "1978",
               "1998"
        ],
        "reponse": 3
    },  
     {
        "question":"Qui fut le 40e président des États-Unis ?",
        "choix":["Ronald Reagan",
                "Donald Trump"
        ],
        "reponse":1
    },
    {
        "question":"Quel est le vrai nom de Voltaire ?",
        "choix":[
            "Arrouet",
            "Vivaldi"
        ],
        "reponse":1
    },
    {
        "question":"Qui fut le premier à aller sur la lune ?", 
        "choix":[
            "Neil Amstrong",
            "Julie Payette"
        ],
        "reponse":1
    },
    {
        "question":"Quelle est la langue la plus parlée au monde ?", 
        "choix":[
            "Français",
            "Anglais",
            "Mandarin"
        ],
        "reponse":3
    }
]
`

let objetQuestionnaire = JSON.parse(questionnaire);

const fondChamps = "pink";
let regexAlpha =/^[0-9a-zA-Z]+$/;

let profil = 
{prenom:"",
nom:"",
dateNaissance:"",
motDePasse:"",
statut:"",
};

const newLocal = "Je ne sais pas";

//tableauReponse contiens la valeur des réponses de l'utilisateur. Recoit null si aucune réponse n'est entrée
//Ce tableau sera comparé à l'objet questionnaire pour confirmer les réponses
let tableauReponse  =[];
//Cette variable indique le nombre total de questions
//Elle sert à calculer le résultat
let totalQuestion = objetQuestionnaire.length;
//Variable utile lors du calcul de bonne réponses
let bonneReponse = 0;
//Cet itérateur indique le numero de page
let iterateur = 0;

let varProgression=0;
const itProgression = 100/totalQuestion;

let champPrenom = document.getElementById("prenom");
let champNom = document.getElementById("nom");
let champAnneeNaissance = document.getElementById("start");
let motdepasse = document.getElementById("motdepasse");
let motdepasse2 = document.getElementById("motdepasse2");
let choisir = document.getElementById("choisir");


/**
 * Cette fonction change la couleur du fond d'un champ lorsque le focus est dessus
 * @param {*} e 
 */
   function onFocus (e) {

        console.log("Début onFocus de " + e.target.id);
        document.getElementById(e.target.id).style.backgroundColor = "pink";
    }


/**
 * Cette fonction verifie le prenom
 * @returns true si la chaine est valide sinon false
 */
function blurPrenom(e)
{       
    
    let messageDErreur = document.getElementById("erreurPrenom");
    champPrenom.style.backgroundColor="white";
   if(!regexAlpha.test(champPrenom.value)||champPrenom.value.length<3)
   {
        champPrenom.classList.add("invalide");
       messageDErreur.style.color="red";
       
       return false;
   }
   else
   {
        champPrenom.classList.remove("invalide");
        champPrenom.classList.add("valide");
       profil.prenom=champPrenom.value;
       messageDErreur.style.color="white";

       if(prenomCree==true)
       {
           
           prenomCree==false;
       }
       return true;
   }    
}


/**
 * Cette fonction verifie le nom
 * @returns true si la chaine est valide sinon false
 */
function blurNom()
{
  
     champNom.style.backgroundColor="white";
    let messageDErreur = document.getElementById("erreurNom");
   if(!regexAlpha.test(champNom.value)||champNom.value.length<3)
   {
    champNom.classList.add("invalide");
       messageDErreur.style.color="red";
       
       return false;
   }
   else
   {
       champNom.classList.remove("invalide");
       champNom.classList.add("valide");
    profil.nom=document.getElementById("nom").value;
       messageDErreur.style.color="white";
       if(nomCree==true)
       {
           nomCree==false;
           
       }
       return true;
   }   
}
//// fonction pour la date (code a adapter pour la date)
function ValiderDateDeNaissance() {

    let dateActuelle = new Date().toISOString().substring(0, 10);
    let element = document.getElementById("start");
    if (element.value < dateActuelle) {

        return true;

    } else {

        
        return false;

    }

}
/**
 * Cette fonction verifie la date
 * @returns true si la chaine est valide sinon false
 */
function blurDate()
{   
   
    let valeur=champAnneeNaissance.value;
    let valeur2 = Date.now();
    champAnneeNaissance.style.backgroundColor="white";
    if(!ValiderDateDeNaissance()||champAnneeNaissance.value=="")
    {
        document.getElementById("erreurDate").style.color="red";
        champAnneeNaissance.classList.add("invalide")
        return false;
        
    }
    else
    {
        profil.dateNaissance = valeur;
        document.getElementById("erreurDate").style.color="white";
        champAnneeNaissance.classList.remove("invalide");
        champAnneeNaissance.classList.add("valide");
        if(dateCree==true)
       {
           dateCree==false;
           
       }
        return true;
    }
}
/**
 * Cette fonction s'assure que le mot de passe est plus grand que 5 caractère
 *  et plus petit que 20
 * @returns True si le mot de passe est valide
 * 
 */
function blurMotDePasse()
{

  let motdepasse = document.getElementById("motdepasse");
  motdepasse.style.backgroundColor="white";
  let messageErreur = document.getElementById("erreurMotdePasse");
    if(motdepasse.value==""||motdepasse.value.length<5||motdepasse.value.length>20)
    {
       
       messageErreur.style.color="red";
       motdepasse.classList.add("invalide")
       return false;
        
    }
    else
    {
        if(motDePasseCree==true)
       {
           motDePasseCree==false;
           
       }
        messageErreur.style.color="white";
        motdepasse.classList.remove("invalide");
        motdepasse.classList.add("valide");
        return true;
    }    
}
/**
 * Cette fonction vérifie la validité du deuxième mot de passe
 * @returns True si le deuxième mot de passe est identique au premier
 */
function blurVerifMotDePasse()
{
    
    let messageErreur2 = document.getElementById("erreurMotdePasse2");
    motdepasse2.style.backgroundColor="white";
    if(motdepasse.value!=motdepasse2.value)
    {
       
        messageErreur2.style.color = "red";
        motdepasse2.classList.add("invalide");
        return false;
        
    }
    else{
        profil.motDePasse = motdepasse2.value;
        messageErreur2.style.color = "white";
        motdepasse2.classList.add("valide");
        motdepasse2.classList.remove("invalide");
        if(motDePasse2Cree==true)
       {
           motDePasse2Cree==false;
           
       }
        return true;
    }
}
/**
 * 
 * @returns Cette fonction vérifie le champ Statut
 */
function blurStatut()
{
    
    let messageDErreur = document.getElementById("erreurChamp");
    if(choisir.value=="")
    {
      
      messageDErreur.style.color="red";
      choisir.classList.add("invalide");
      return false;
    }
    else{
        profil.statut = choisir.value;
        messageDErreur.style.color="white";
        choisir.classList.remove("invalide");
        choisir.classList.add("valide");
        if(choisirCree==true)
       {
           choisirCree==false;
           
       }
        return true;
    }


}
const parentListeErreur = document.getElementById("listeErreur");

/**
 * Cette fonction crée et affiche un message d'erreur selon les paramêtres entrés
 * @param {*} messageDErreur le message qu'on veut écrire
 * @param {*} id - le id de l'élement
 */
function creerMessageErreur(messageDErreur, id)
{
    let element;
    element = document.createElement("li");
        element.textContent=(messageDErreur);
        element.style.color="red";
        element.id=id;
        parentListeErreur.appendChild(element);
}

    let prenomCree = false;   
    let nomCree = false;
    let dateCree = false;
    let motDePasseCree = false;
    let motDePasse2Cree = false;
    let choisirCree = false;
/**
 * Cette fonction sert à vérifier la validité de tous les champs
 * @param {*} e 
 */
function validation(e)
{
    // Vérifier si toutes les conditions sont remplies
    let valide = false;
    
    // Condition 1..
    if(blurPrenom()==false&&!prenomCree)
    {    
        creerMessageErreur("Le prenom est invalide", "prenomErreur");
        prenomCree =true;
    }
    
    if(blurNom()==false&&!nomCree)
    {
        creerMessageErreur("Le nom est invalide", "nomErreur");
        nomCree = true;
    }
     if(blurDate()==false&&!dateCree)
    {
        creerMessageErreur("La date est invalide", "dateErreur");
        dateCree = true;
    }
    if(blurMotDePasse()==false&&!motDePasseCree)
    {
        creerMessageErreur("Le mot de passe est invalide", "motDePasse1Erreur");
        motDePasseCree = true;
    }
     if(blurVerifMotDePasse()==false&&!motDePasse2Cree)
    {
        creerMessageErreur("Le second mot de passe est invalide", "motDePasse2Erreur");
        motDePasse2Cree =true;
    }
    if(blurStatut()==false&&!choisirCree)
    {
        creerMessageErreur("Le champ est invalide", "choisirErreur");
        choisirCree = true;
    } 
   
let toutEstValide = (blurStatut()&&blurVerifMotDePasse()&&blurMotDePasse()&&blurDate()&&blurNom()&&blurPrenom()&&blurVerifMotDePasse());
    if(!toutEstValide)
    {
       
       return false;
    }
    else
    {       
        /**Admettre le formulaire et commencer le quiz */
        
        return true;
        
    }
    
}
/**
 * Cette mission est enclanchée lorsque l'utilisateur appuie sur le bouton soumission
 */
function soumission(e)
{   let valide = validation();
    if(valide==true)
    {
        let monElement = document.getElementById("para");
       //Ajout des champs dans l'objet réponse

    profil.prenom = champPrenom.value;
    profil.nom = champNom.value;
    profil.dateNaissance = champAnneeNaissance.value;
    profil.motDePasse = motdepasse.value;
    profil.statut = choisir.value;
    affichageNom();    
    changerPage(); 
    }
    else{
       
    }
    
}

/**
 * Cette fonction affiche le nom entré dans le formulaire
 */
function affichageNom()
{
    // Afficher le nom du joueur dans la section avec l'id sectionErreur dans le haut de la page
    let parent = document.getElementById("sectionErreur");
    parent.style.backgroundColor= "gray";
    parent.classList.remove("container");
    let listeEnfant= document.getElementById("listeErreur");
    parent.removeChild(listeEnfant);
    let affichageNom = document.createElement("h3");
    affichageNom.className = "container";
    affichageNom.textContent = "Bonjour " + profil.prenom + " " + profil.nom;   
    parent.appendChild(affichageNom);
}

/**
 * Cette fonction sert à retirer le formulaire pour y afficher le questions
 */
function changerPage()
{
    
    //Faire avancer la barre de progression

    varProgression +=itProgression;
    progressbar=document.getElementById("progressbar");
    progressbar.style.width=varProgression + '%';
    progressbar.textContent = varProgression+"%";
    progressbar.aria_valuenow=varProgression;
   
        viderPage();
        //creationQuestion();
        creationQuestion();
   
}

/**
 * Cette fonction sert à effacer le contenu du main
 */
function viderPage()
{
    //Retirer le formulaire
    let enfant = document.getElementById("container");
    let leParent = document.getElementById("main");
    leParent.removeChild(enfant);
}

/**
 * Cette fonction crée et affiche les question et les choix de réponse
 */
function creationQuestion()
{
  //Création de la question 
  let valeurIterateur = parseInt(iterateur)+1;
  let leParent = document.getElementById("main");
  let leDiv = document.createElement("div");
  leDiv.id=("container");
  let prog = document.createElement("h2");
  prog.textContent ="Question " + valeurIterateur + "/" +totalQuestion +": ";
    let question = document.createElement("p");
    question.textContent =   objetQuestionnaire[iterateur].question
        
    
  let laQuestion = document.createElement("h2");   
  
    
  leParent.appendChild(leDiv);
  leDiv.appendChild(prog);
  leDiv.appendChild(question);

  

  //Création d'une boucle pour afficher les choix de réponse
for(let iteration in objetQuestionnaire[iterateur].choix)
{
   let div = document.createElement("div");
   div.classList.add("py-4");
   let numero = parseInt(iteration)+1;
   let reponse = document.createElement("label");
   let radio = document.createElement("input");
   radio.type="radio";
   radio.value=parseInt(iteration)+1;
   radio.name="choix";
   reponse.classList.add("ps-2");
  reponse.textContent = radio.value+". " + objetQuestionnaire[iterateur].choix[iteration];
//Pour l'instant les choix sont contenus dans une div et les radiobutton sont identifiés à l'aide de l'itérateur
   leDiv.appendChild(div);
   div.appendChild(radio);
  div.appendChild(reponse);
}
  

  let boutonCommencer = document.createElement("button");
  boutonCommencer.type="button";
  boutonCommencer.textContent="Soumettre";
  boutonCommencer.classList.add("btn");
  boutonCommencer.classList.add("btn-primary");
  boutonCommencer.classList.add("mt-2");
  boutonCommencer.classList.add("col-12");
  boutonCommencer.classList.add("col-sm-3");
  leDiv.appendChild(boutonCommencer);

  boutonCommencer.addEventListener("click",soumissionReponse,false)
}

/**
 * Cette fonction vérifie et incrémente les bonne réponses
 */
function soumissionReponse()
{
console.log("Début de la fonction soumission reponse");
let leChoix = [];    
leChoix = document.getElementsByName("choix");

for(let indice in leChoix)
{
    if(leChoix[indice].checked==true)
    {
        let reponse = parseInt(leChoix[indice].value);
        if(reponse==objetQuestionnaire[iterateur].reponse)
            {
                bonneReponse++;
            }
           
    }
    
}
iterateur++;
if(iterateur<totalQuestion)
    {       
        changerPage();
    }
    else{
        affichageResultat()
    }
}

/**
 * Lorsque toutes les questions sont posées cette fonction sert à afficher les résultats
 * et l'image associée au résultat
 */
 function affichageResultat()
 {
     viderPage();

     let leScore  =bonneReponse/totalQuestion*100;
    
     let vecteurAffichage = {
         prenom: profil.prenom,
         nom:profil.nom,
         statut:profil.statut,
         score: leScore+"%"
         
     }
    

 
     //resultat plus que 60%
     {
         
         let parent = document.getElementById("main");
        
         
         let lienImage="images/crochetVert.png";
         if(bonneReponse/totalQuestion<0.6)
         {
             lienImage="images/redCross.png";
         }
         for(const iterateur in vecteurAffichage)
         {
             let element = document.createElement("h2");
             element.textContent = vecteurAffichage[iterateur];
             
             parent.appendChild(element);
         }
         //affichage image
         let image = document.createElement("img");
         image.src=lienImage;
        
         parent.appendChild(image);  
 
     }
    }

 

    

/*** Cette fonction est rattachée à l'événement "Load". C'est la première fonction qui va s'executer lorsque la page sera entièrement chargée.
 */
 function initialisation() 
 {
     console.log("Initialisation");
    document.getElementById("prenom").addEventListener("focus",onFocus);
    document.getElementById("prenom").addEventListener("blur",blurPrenom);

    document.getElementById("nom").addEventListener("focus",onFocus);
    document.getElementById("nom").addEventListener("blur",blurNom);

    document.getElementById("start").addEventListener("focus",onFocus);
    document.getElementById("start").addEventListener("blur",blurDate);

    document.getElementById("motdepasse").addEventListener("focus",onFocus);
    document.getElementById("motdepasse").addEventListener("blur",blurMotDePasse);

    document.getElementById("motdepasse2").addEventListener("keyup",onFocus);
    document.getElementById("motdepasse2").addEventListener("blur",blurVerifMotDePasse);

    document.getElementById("choisir").addEventListener("change",blurStatut);

    document.getElementById("soumettre").addEventListener("click",soumission); 
 }
  
/**
 * Cet événement est responsable de surveiller lorsque la page web est complètement chargée et de déclancher
 * la fonction initialisation() dès que la page web est chargée. Cet événement permet de s'assurer que tout le DOM est disponible avant
 * de commencer à utiliser javascript
 * DOM : https://www.w3schools.com/js/js_htmldom.asp
 */
window.addEventListener("load", initialisation, false);