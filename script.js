// Oyun bilgisayara karşı oynanacak
// - 3 buton olsun. Oyuncu taş, kağıt veya makas seçsin
// - Bilgisayar ise rastgele seçeneklerden birini seçsin
// - Hangisi kazanırsa ekrana bilgi yazdıralım
// - Skor sayısı tutulsun ve localstorage'da saklansın
// - Math.floor(Math.random() * 3) kodu rastgele sayı üretmektedir. 0, 1 veya 2 döner

const guestScore = document.querySelector('#guestScore');
const pcScore = document.querySelector('#pcScore');
const winner = document.querySelector('#winner');

let kullaniciSkor = 0;
let pcSkor = 0;

function loadLocal() {
    if(localStorage.kullaniciSkorLocal) {
        kullaniciSkor = Number(JSON.parse(localStorage.kullaniciSkorLocal));
    }
    
    if(localStorage.pcSkorLocal) {
        pcSkor = Number(JSON.parse(localStorage.pcSkorLocal));
    }
}

loadLocal();

guestScore.innerText = ("Kullanici Skor: " + kullaniciSkor);
pcScore.innerText = ("Bilgisayar Skor: " + pcSkor);

let pcHand = '';

function pcTurn() {
    
    let pcRandom = Math.floor(Math.random() * 3);
    
    if(pcRandom == 0) {
        pcHand = "Tas";
    } else if(pcRandom == 1) {
        pcHand = "Kagit";
    } else {
        pcHand = "Makas";
    }
    return pcHand;
}

function bindEvent() {
    const btnAll = document.querySelectorAll('.btnAll');

    for(let btn of btnAll) {
        btn.addEventListener('click', turnFunc);
        
    }
}

function turnFunc() {

    pcTurn();
    console.log("***********");
    console.log(this.innerText);
    console.log(pcTurn());

    if(this.innerText == 'Tas' && pcHand == 'Makas' || this.innerText == 'Kagit' && pcHand == 'Tas' || this.innerText == 'Makas' && pcHand == 'Kagit') {
        console.log('Kullanici Kazandi');
        kullaniciSkor += 1;
        winner.innerText="Kullanici Kazandi";
    } else if(this.innerText == pcHand) {
        console.log('Berabere');
        winner.innerText="Berabere";

    } else {
        console.log('Bilgisayar Kazandı');
        winner.innerText="Bilgisayar Kazandi";
        pcSkor += 1;

    }  

    guestScore.innerText = "Kullanici Skor: " + kullaniciSkor;
    pcScore.innerText = "Bilgisayar Skor: " + pcSkor;

    saveLocal();
}

bindEvent();

function saveLocal() {
    localStorage.kullaniciSkorLocal = JSON.stringify(kullaniciSkor);
    localStorage.pcSkorLocal = JSON.stringify(pcSkor);

}

const clear = document.querySelector('#clear');

clear.addEventListener('click', clearLocal);

function clearLocal() {
    localStorage.removeItem('kullaniciSkorLocal');
    localStorage.removeItem('pcSkorLocal');
    kullaniciSkor = 0;
    pcSkor = 0;
    guestScore.innerText = "Kullanici Skor: " + kullaniciSkor;
    pcScore.innerText = "Bilgisayar Skor: " + pcSkor;
}