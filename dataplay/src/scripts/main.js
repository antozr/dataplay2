console.info('Hello world');

// localestorage - profil//
var submit = document.querySelector(".submit");

if (submit) {
    submit.addEventListener("click", activate);
}

function activate() {
    var x = document.getElementById("sexe").value;
    var reponse = document.querySelectorAll(".formulaire__item:not(:last-child)");
  
    localStorage.setItem('nom', reponse[0].value);
    localStorage.setItem('age', reponse[1].value);
    localStorage.setItem('categorie', reponse[2].value);
    localStorage.setItem('temps', reponse[3].value);
    localStorage.setItem('sexe', x);
    
    console.log(localStorage.getItem('nom'));
    console.log(localStorage.getItem('age'));
    console.log(localStorage.getItem('categorie'));
    console.log(localStorage.getItem('temps'));
    console.log(localStorage.getItem('sexe'));
  }






/// gestion des pubs + auteurs 
const tabAllPub = ["assets/images/Frame 2.png", "assets/images/pub2.png", "assets/images/pub3.png", "assets/images/pub4.png"];
const tabAllCreator = ["Mathis", "Jean", "Bastien", "Anto"];
var imgPub = document.querySelector('.main__pubImg');
var pubCreator = document.querySelector('.main__pubTxt');
let imgPubLink = document.querySelector('.main__pubImg');
let alphaRan = Random(0, 5);
let btnPubClose = document.querySelector('.main__pub--btn');


function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgPub.src = tabAllPub[Random(0, 3)];
pubCreator.innerHTML = "ADS BY " + tabAllCreator[Random(0, 3)];

btnPubClose.addEventListener('click', ()=>{
    imgPubLink.classList.add('main__pubImg--none');
    if(alphaRan === 3){
        window.open("https://youtu.be/o-YBDTqX_ZU", '_blank')
        //window.location.href="https://youtu.be/o-YBDTqX_ZU";
    } 
});


imgPubLink.addEventListener('click', ()=>{
    window.open("https://www.youtube.com/watch?v=IcwAMLcliIY", '_blank')
    //window.location.href="https://www.youtube.com/watch?v=IcwAMLcliIY";
});



//// ouverture card info

var cardList = document.querySelectorAll('.sect__el');
cardList.forEach(el => {
    let tabNameCard = ["Flash", "Utilisateur Tablette", "Consomateur", "Consomation", "Sexe(Oral/Anal)"];

    el.addEventListener('click', () => {
        let varControle = el.firstElementChild.children[0].children[0].children[0];
        console.log(el.firstElementChild.children[0].children[0].children[0].children[1].innerText);
        console.log(varControle.children[0].innerText);

        let indexNum = tabNameCard.indexOf(varControle.children[0].innerText);
        phraseVignetteRecord(varControle, tabNameCard[indexNum]);

    });
});

function phraseVignetteRecord(varControle, nomCarte) {

    if (varControle.children[0].innerText === nomCarte) {
        console.log('yess');
        let valueSport = varControle.children[1].innerText;
        // check valeur + fonction spécial 
        if (nomCarte === "Flash") {
            let valueSport2 = valueSport.slice(0, 2);
            console.log(valueSport2);
            if (valueSport2 < 10) {
                varControle.children[2].innerText = " Tu es présser  ";
            } else {
                varControle.children[2].innerText = " Tu es un gros sportif";
                console.log('gros boulet au cheville');
            }
        }
         if(nomCarte === "Utilisateur Tablette"){
            console.log('Rend largent');
        }
         if(nomCarte === "Consomateur"){
            console.log('Rend la vielle');
        }
         if(nomCarte === "Consomation"){
            console.log('HA');
        }
         if(nomCarte === "Sexe(Oral/Anal)"){
            console.log('first');
        }
    }

}
