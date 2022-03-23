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


//// gestion du burger menu 

let btnMenu = document.querySelector('.head__btn');
let navMenuList = document.querySelector('.head__nav');

btnMenu.addEventListener('click', () => {

    if (navMenuList.classList.contains('head__nav--none')) {
        navMenuList.classList.remove('head__nav--none');
        btnMenu.classList.add('head__btn--actif');
    } else {
        navMenuList.classList.add('head__nav--none');
        btnMenu.classList.remove('head__btn--actif');
    }
});





/// gestion des pubs + auteurs 
const tabAllPub = ["assets/images/Frame 2.png", "assets/images/pub2.png", "assets/images/pub3.png", "assets/images/pub4.png", "assets/images/pub5.png"];
const tabDocumentaire = ["https://www.youtube.com/watch?v=hQZN1nSPL5k", "https://www.youtube.com/watch?v=IcwAMLcliIY", "https://www.youtube.com/watch?v=vR1jra31dkk"]
const tabAllCreator = ["Mathis", "Jean", "Bastien", "Anto"];
var imgPub = document.querySelector('.main__pubImg');
var pubCreator = document.querySelector('.main__pubTxt');
let imgPubLink = document.querySelector('.main__pubImg');
let alphaRan = Random(0, 5);
let btnPubClose = document.querySelector('.main__pub--btn');
let boxScreen = document.querySelectorAll('.sect__cardScreen');

function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgPub.src = tabAllPub[Random(0, tabAllPub.length)];
pubCreator.innerHTML = "ADS BY " + tabAllCreator[Random(0, 3)];

btnPubClose.addEventListener('click', () => {
    imgPubLink.classList.add('main__pubImg--none');
    if (alphaRan === 3) {
        window.open("https://youtu.be/o-YBDTqX_ZU", '_blank')
        //window.location.href="https://youtu.be/o-YBDTqX_ZU";
    }
});


imgPubLink.addEventListener('click', () => {
    window.open(tabDocumentaire[Random(0, 3)], '_blank')
    //window.location.href="https://www.youtube.com/watch?v=IcwAMLcliIY";
});



//// ouverture card info
let i = 0;
var cardList = document.querySelectorAll('.sect__el');
let dataGraph = document.querySelectorAll('.card__dataList');
let sectCardInfo = document.querySelectorAll('.sect__listCard');
//console.log(dataGraph);
console.log(sectCardInfo);
//fetch 
fetch('assets/data/cul.json')
    .then(
        response => response.json()
    )
    .then(
        data => {
           // console.log(data);
           // console.log(data[2].DataBE[0].visitorSexBE.male);
           // console.log('click clikchu');
           // console.log(data[2].DataBE[0].visitorSexBE[0]);
            document.querySelector('#sexHom').innerHTML = data[2].DataBE[0].visitorSexBE.male;
            document.querySelector('#sexHom').parentElement.parentElement.style.width = (100 + parseInt(data[2].DataBE[0].visitorSexBE.male.slice(0,2))) +"px";
            document.querySelector('#sexHom').parentElement.parentElement.style.height = (100 + parseInt(data[2].DataBE[0].visitorSexBE.male.slice(0,2))) +"px";
            document.querySelector('#sexFemme').parentElement.parentElement.style.width = (100 + parseInt(data[2].DataBE[0].visitorSexBE.female.slice(0,2))) +"px";
            document.querySelector('#sexFemme').parentElement.parentElement.style.height = (100 + parseInt(data[2].DataBE[0].visitorSexBE.female.slice(0,2))) +"px";
            document.querySelector('#sexFemme').innerHTML = data[2].DataBE[0].visitorSexBE.female;
            document.querySelector('#numPourcentageUtil').innerHTML = data[2].DataBE[0].visitorSexBE.male;

        }
    );


cardList.forEach(el => {
    let tabNameCard = ["Flash", "Utilisateur Tablette", "Consomateur", "Consomation", "Sexe(Oral/Anal)"];
    let tabCatForm = ['temps', 'devices', 'age', 'categorie', 'sexe'];
    let varControle = el.firstElementChild.children[0].children[0].children[0];
    let indexNum = tabNameCard.indexOf(varControle.children[0].innerText);

    if (el.classList.contains('sect__el--small')) {
        i = 8;
    } else {
        phraseVignetteRecord(varControle, tabNameCard[indexNum], el);
        el.firstElementChild.children[0].children[0].children[0].children[1].innerText = localStorage.getItem(tabCatForm[i]);
        if (i === 5) {
            i = 0;
        } else if (i === 0) {
            el.firstElementChild.children[0].children[0].children[0].children[1].innerText = localStorage.getItem(tabCatForm[i]) + 'min';
            i++
        } else {
            i++
        }
    }

    el.addEventListener('click', () => {
        let varControle = el.firstElementChild.children[0].children[0].children[0];
        //console.log(el.firstElementChild.children[0].children[0].children[0].children[1].innerText);
        //console.log(varControle.children[0].innerText);
        let indexNum = tabNameCard.indexOf(varControle.children[0].innerText);
        phraseVignetteRecord(varControle, tabNameCard[indexNum], el);
        OpenGrafView(el);

    });
});

function phraseVignetteRecord(varControle, nomCarte, el) {

    if (varControle.children[0].innerText === nomCarte) {
        console.log('yess');
        let valueSport = localStorage.getItem('temps');
        // check valeur + fonction spécial 
        if (nomCarte === "Flash") {
            let valueSport2 = valueSport.slice(0, 2);
            console.log(valueSport2);
            if (valueSport2 < 10) {
                varControle.children[2].innerText = "Tu es présser mon petit";
            } else {
                varControle.children[2].innerText = " Tu es un gros sportif";
                console.log('gros boulet au cheville');
            }
        }
        if (nomCarte === "Utilisateur Tablette") {
            console.log('Rend largent');
        }
        if (nomCarte === "Consomateur") {
            console.log('Rend la vielle');
        }
        if (nomCarte === "Consomation") {
            console.log('HA');
        }
        if (nomCarte === "Sexe(Oral/Anal)") {
            let valueSexe = localStorage.getItem('sexe');
            console.log(valueSexe);

            //let dataGraph = document.querySelectorAll('.card__dataList');
            if (valueSexe == "femme") {
                varControle.children[2].innerText = "Chaude comme une baraque à frite";

            } else if (valueSexe == 'homme') {
                varControle.children[2].innerText = " La poutre en vue";
                el.firstElementChild.children[0].children[0].children[1].children[0].src = 'assets/images/poutre.png'
            }
        }

    }

}

function OpenGrafView(el){


        console.log('graphhh');
        if (dataGraph[0].classList.contains('card__dataList--actif')) {
            console.log('femmmme');
            dataGraph[0].classList.remove('card__dataList--actif');
            boxScreen[4].classList.remove('sect__cardScreen--open1');
            sectCardInfo[4].classList.remove('sect__listCard--none');
        } else {
            console.log('putt');
            dataGraph[0].classList.add('card__dataList--actif');
            boxScreen[4].classList.add('sect__cardScreen--open1');
            sectCardInfo[4].classList.add('sect__listCard--none');
        }
    
}
