console.info('Hello world');

// localestorage - profil//
var submit = document.querySelector(".submit");

if (submit) {
    submit.addEventListener("click", activate);
}

function activate() {
    var x = document.querySelector('input[name="sexe"]:checked');

    var reponse = document.querySelectorAll(".formulaire__item:not(:last-child)");

    localStorage.setItem('nom', reponse[0].value);
    localStorage.setItem('age', reponse[1].value);
    localStorage.setItem('categorie', reponse[2].value);
    localStorage.setItem('temps', reponse[3].value);
    localStorage.setItem('device', reponse[4].value);
    localStorage.setItem('sexe', x.value);

    console.log(localStorage.getItem('nom'));
    console.log(localStorage.getItem('age'));
    console.log(localStorage.getItem('categorie'));
    console.log(localStorage.getItem('temps'));
    console.log(localStorage.getItem('device'));
    console.log(localStorage.getItem('sexe'));
}

var majorite = document.querySelector(".pene");
var back = document.querySelector(".cover");
var pop = document.querySelector(".popup");

if (majorite) {
    majorite.addEventListener("click", blurnone);
}

function blurnone() {
    back.classList.toggle("blur-out");
    pop.classList.toggle("none");
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
console.log(dataGraph);
console.log(sectCardInfo);
//fetch 
fetch('assets/data/cul.json')
    .then(
        response => response.json()
    )
    .then(
        data => {
            let dataTabCat = [];
            let dataTabAge = [data[4].AgeWorld[0].AgeGlobal.genZ, data[4].AgeWorld[0].AgeGlobal.genY, data[4].AgeWorld[0].AgeGlobal.genX, data[4].AgeWorld[0].AgeGlobal.boomers];
            let i = 1;
            for (i; i <= 6; i++) {
                dataTabCat.push(data[3].Categorie.CategorieWorld[i]);
            }
            let dataDeviceBe = data[2].DataBE[2].DeviceBE;
            console.log(dataDeviceBe);
            let indexNumCat = dataTabCat.indexOf(localStorage.getItem('categorie'));
            calcHeightTimeBar(data);
            graphDataSex(data);
            calcWidthDevice(dataDeviceBe);
            graphAgeComparatif(dataTabAge);
            graphCatComparatif(indexNumCat, dataTabCat[indexNumCat]);



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
        } else if (i === 1) {
            el.firstElementChild.children[0].children[0].children[0].children[1].innerText = localStorage.getItem('device');
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

function graphDataSex(data) {
    document.querySelector('#sexHom').innerHTML = data[2].DataBE[0].visitorSexBE.male;
    document.querySelector('#sexHom').parentElement.parentElement.style.width = (100 + parseInt(data[2].DataBE[0].visitorSexBE.male.slice(0, 2))) + "px";
    document.querySelector('#sexHom').parentElement.parentElement.style.height = (100 + parseInt(data[2].DataBE[0].visitorSexBE.male.slice(0, 2))) + "px";
    document.querySelector('#sexFemme').parentElement.parentElement.style.width = (100 + parseInt(data[2].DataBE[0].visitorSexBE.female.slice(0, 2))) + "px";
    document.querySelector('#sexFemme').parentElement.parentElement.style.height = (100 + parseInt(data[2].DataBE[0].visitorSexBE.female.slice(0, 2))) + "px";
    document.querySelector('#sexFemme').innerHTML = data[2].DataBE[0].visitorSexBE.female;
    if (localStorage.getItem('sexe') === "homme") {
        document.querySelector('#numPourcentageUtil').innerHTML = data[2].DataBE[0].visitorSexBE.male;
        document.querySelector('#sexHom').parentElement.parentElement.classList.add('card__dataEl--checkBox');
    } else {
        document.querySelector('#numPourcentageUtil').innerHTML = data[2].DataBE[0].visitorSexBE.female;
        document.querySelector('#sexFemme').parentElement.parentElement.classList.add('card__dataEl--checkBox');
    }
}




function phraseVignetteRecord(varControle, nomCarte, el) {

    if (varControle.children[0].innerText === nomCarte) {
        console.log('yess');
        let valueSport = localStorage.getItem('temps');
        // check valeur + fonction spécial 
        if (nomCarte === "Flash") {
            let idBoxTextTemp = document.querySelector('#tempUtilPourcentage');
            let valueSport2 = valueSport.slice(0, 2);
            // console.log(valueSport2);
            if (valueSport2 < 10) {
                varControle.children[2].innerText = "Tu es présser mon petit";
                idBoxTextTemp.innerText = 'est  plus rapide que la moyen Belge';
            } else if (valueSport2 > 20) {
                varControle.children[2].innerText = "Calme toi frère";
                idBoxTextTemp.innerText = ' fais sauter touuuuuuut les records';

            } else {
                varControle.children[2].innerText = " Tu es un gros sportif";
                idBoxTextTemp.innerText = 'est  proche de la moyen, on est fier de toi';
                // console.log('gros boulet au cheville');
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
            if (localStorage.getItem('categorie') === 'Doule pénétration') {
                varControle.children[2].innerText = "Tu connais le 18 trous au golf? ";
            }
            // let valueCat = localStorage.getItem('categorie');
            // let allElLiCat = document.querySelectorAll('.card__dataEl--cat');
            // document.querySelector('#numCat').innerHTML = valueCat;
        }
        if (nomCarte === "Sexe(Oral/Anal)") {
            let valueSexe = localStorage.getItem('sexe');
            console.log(valueSexe);

            //let dataGraph = document.querySelectorAll('.card__dataList');
            if (valueSexe == "femme") {
                varControle.children[2].innerText = "Chaude comme une baraque à frite";

            } else if (valueSexe == 'homme') {
                varControle.children[2].innerText = " La poutre en vue";
                el.firstElementChild.children[0].children[0].children[1].children[0].src = 'assets/images/poutre.png';
            }
        }

    }

}

function calcWidthDevice(dataCu) {
    let listDevice = document.querySelectorAll('.card__dataSpan--device ');
    let listAllLiDevice = document.querySelectorAll('.card__dataEl--device');
    let txtDeviceAll = document.querySelector('#resumDevice');
    let i = 0;
    listDevice.forEach(el => {
        if (i == 0) {
            el.innerText = dataCu.tablet;
            listAllLiDevice[i].style.width = 120 + parseInt(dataCu.tablet) + "px";
            listAllLiDevice[i].style.height = 120 + parseInt(dataCu.tablet) + "px";
            
       
            i++
        } else if (i === 1) {
            el.innerText = dataCu.gsm;
            listAllLiDevice[i].style.width = 120 + parseInt(dataCu.gsm) + "px";
            listAllLiDevice[i].style.height = 120 + parseInt(dataCu.gsm) + "px";
           
            i++
        } else {
            el.innerText = dataCu.pc;
            listAllLiDevice[i].style.width = 120 + parseInt(dataCu.pc) + "px";
            listAllLiDevice[i].style.height = 120 + parseInt(dataCu.pc) + "px";
           
            i = 0;
        }

        if(localStorage.getItem('device')==='tablet'){
            txtDeviceAll.innerText=dataCu.tablet;
            listAllLiDevice[0].classList.add('card__dataEl--checkBox');
        }else if(localStorage.getItem('device')==='gsm'){
            txtDeviceAll.innerText=dataCu.gsm;
            listAllLiDevice[1].classList.add('card__dataEl--checkBox');
        }else{
            txtDeviceAll.innerText=dataCu.pc;
            listAllLiDevice[2].classList.add('card__dataEl--checkBox');
        }
    });
}


function calcHeightTimeBar() {
    let barreGraph = document.querySelector('.card__dataEl--moi');
    let dataLocal = localStorage.getItem('temps');

    if (dataLocal > 20) {
        barreGraph.style.height = "600px";
        document.querySelector('#timePerso').innerText = dataLocal + 'min' + '\u00a0😲';
    } else if (dataLocal < 20 && dataLocal > 10) {
        barreGraph.style.height = (410 + parseInt(dataLocal) + "px");
        document.querySelector('#timePerso').innerText = dataLocal + 'min' + '\u00a0😏'
    } else if (dataLocal < 10) {
        barreGraph.style.height = ((410 - dataLocal) + "px");
        document.querySelector('#timePerso').innerText = dataLocal + 'min' + '\u00a0😖'
    }
}





function graphCatComparatif(tab, i) {
    let valueCat = localStorage.getItem('categorie');
    let allElLiCat = document.querySelectorAll('.card__dataEl--cat');

    if (valueCat === i) {
        allElLiCat[tab].classList.add('card__dataEl--checkBox');
        document.querySelector('#numCat').innerHTML = valueCat + ", " + (tab + 1) + "e" + " du top mondial";

    } else {
        document.querySelector('#numCat').innerHTML = valueCat + ', tu es un cas rare 😏';
        allElLiCat.forEach(el => {
            el.classList.remove('card__dataEl--checkBox');
        })
    }

}
function graphAgeComparatif(dataTabAge) {
    let valueAge = localStorage.getItem('age');
    let allElLiAge = document.querySelectorAll('.card__dataEl--age');
    if (valueAge === "genZ") {
        document.querySelector('#numAgePourcentage').innerHTML = dataTabAge[0];
        allElLiAge[0].classList.add('card__dataEl--checkBox');
    } else if (valueAge === "genY") {
        document.querySelector('#numAgePourcentage').innerHTML = dataTabAge[1];
        allElLiAge[1].classList.add('card__dataEl--checkBox');
    } else if (valueAge === "genX") {
        document.querySelector('#numAgePourcentage').innerHTML = dataTabAge[2];
        allElLiAge[2].classList.add('card__dataEl--checkBox');
    } else if (valueAge === "boomer") {
        document.querySelector('#numAgePourcentage').innerHTML = dataTabAge[3];
        allElLiAge[3].classList.add('card__dataEl--checkBox');
    }
}

function OpenGrafView(el) {


    console.log('graphhh');
    console.log(el);
    if (el.id === "listSex") {
        console.log('puttttte');
        if (dataGraph[4].classList.contains('card__dataList--actif')) {
            console.log('femmmme');
            dataGraph[4].classList.remove('card__dataList--actif');
            boxScreen[4].classList.remove('sect__cardScreen--open1');
            sectCardInfo[4].classList.remove('sect__listCard--none');
        } else {
            console.log('putt');
            dataGraph[4].classList.add('card__dataList--actif');
            boxScreen[4].classList.add('sect__cardScreen--open1');
            sectCardInfo[4].classList.add('sect__listCard--none');
        }
    }
    if (el.id === "listCat") {
        if (dataGraph[3].classList.contains('card__dataList--actif')) {
            console.log('femmmme');
            dataGraph[3].classList.remove('card__dataList--actif');
            boxScreen[3].classList.remove('sect__cardScreen--open2');
            sectCardInfo[3].classList.remove('sect__listCard--none');
        } else {
            console.log('putt');
            dataGraph[3].classList.add('card__dataList--actif');
            boxScreen[3].classList.add('sect__cardScreen--open2');
            sectCardInfo[3].classList.add('sect__listCard--none');
        }
    }
    if (el.id === "listAge") {
        if (dataGraph[2].classList.contains('card__dataList--actif')) {
            console.log('femmmme');
            dataGraph[2].classList.remove('card__dataList--actif');
            boxScreen[2].classList.remove('sect__cardScreen--open2');
            sectCardInfo[2].classList.remove('sect__listCard--none');
        } else {
            console.log('putt');
            dataGraph[2].classList.add('card__dataList--actif');
            boxScreen[2].classList.add('sect__cardScreen--open2');
            sectCardInfo[2].classList.add('sect__listCard--none');
        }
    }
    if (el.id === "listDivice") {
        if (dataGraph[1].classList.contains('card__dataList--actif')) {
            dataGraph[1].classList.remove('card__dataList--actif');
            boxScreen[1].classList.remove('sect__cardScreen--open3');
            sectCardInfo[1].classList.remove('sect__listCard--none');
        } else {
            dataGraph[1].classList.add('card__dataList--actif');
            boxScreen[1].classList.add('sect__cardScreen--open3');
            sectCardInfo[1].classList.add('sect__listCard--none');
        }
    }
    if (el.id === "listTemp") {
        console.log('Pute de tes morts');
        if (dataGraph[0].classList.contains('card__dataList--actif')) {
            console.log('femmmme');
            dataGraph[0].classList.remove('card__dataList--actif');
            dataGraph[0].classList.remove('card__dataList--time');
            boxScreen[0].classList.remove('sect__cardScreen--open2');
            sectCardInfo[0].classList.remove('sect__listCard--none');
        } else {
            console.log('putt');
            dataGraph[0].classList.add('card__dataList--actif');
            dataGraph[0].classList.add('card__dataList--time');
            boxScreen[0].classList.add('sect__cardScreen--open2');
            sectCardInfo[0].classList.add('sect__listCard--none');
        }
    }


}
