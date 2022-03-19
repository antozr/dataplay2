console.info('Hello world');

/// gestion des pubs + auteurs 
const tabAllPub = ["assets/images/Frame 2.png", "assets/images/pub2.png", "assets/images/pub3.png", "assets/images/pub4.png"];
const tabAllCreator = ["Mathis", "Jean", "Bastien", "Anto"];
var imgPub = document.querySelector('.main__pubImg');
var pubCreator = document.querySelector('.main__pubTxt');

function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgPub.src = tabAllPub[Random(0, 3)];
pubCreator.innerHTML = "ADS BY " + tabAllCreator[Random(0, 3)];


//// ouverture card info

var cardList = document.querySelectorAll('.sect__el');
cardList.forEach(el => {
    let tabNameCard = ["Flash", "Utilisateur Tablette", "Consomateur", "Consomation", "Sexe(Oral/Anal)"];

    el.addEventListener('click', () => {
        let varControle = el.firstElementChild.children[0].children[0].children[0];
        console.log(el.firstElementChild.children[0].children[0].children[0].children[1].innerText);
        console.log(varControle.children[0].innerText);

        // if(varControle.children[0].innerText === "Flash"){
        //     console.log('yess');
        //     let valueSport = varControle.children[1].innerText;
        //     let valueSport2 = valueSport.slice(0,2);
        //     console.log(valueSport2);
        //     if(valueSport2 < 10){
        //         varControle.children[2].innerText = " Rapide le bougre";
        //     }else{
        //         varControle.children[2].innerText = " Tu es un gros sportif";
        //     }
        // }
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
                varControle.children[2].innerText = " Rapide le bougre";
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