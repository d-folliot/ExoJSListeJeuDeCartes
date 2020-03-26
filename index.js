
let sortbyatt = function(card1, card2){
    if (card1.attack > card2.attack) return -1;
    else return 1;
};
let sortbyarm = function (card1, card2){
    if (card1.armor > card2.armor) return -1;
    else return 1;};

let sortbyplay = function(card1, card2){
    if (card1.played > card2.played) return -1;
    else return 1;
};
let sortbywin = function(card1, card2){
    if (card1.victory > card2.victory) return -1;
    else return 1;
};
let displaytable = function (tableok,  ...tableko){
    if (tableok != null) {tableok.style.display="block";}
    tableko.forEach(table => table.style.display ="none" );
};
const buttonxhr = document.querySelector('#xhr');
const buttonfetch = document.querySelector('#fetch');
const buttonaxios = document.querySelector('#axios');
const buttonclear = document.querySelector('#clear');
const tablexhr = document.querySelector('#tablexhr');
const tablefetch = document.querySelector('#tablefetch');
const tableaxios = document.querySelector('#tableaxios');

buttonxhr.addEventListener("click", function(){displaytable(tablexhr,tablefetch,tableaxios)} );
buttonfetch.addEventListener("click", function(){displaytable(tablefetch,tablexhr,tableaxios)} );
buttonaxios.addEventListener("click", function(){displaytable(tableaxios,tablefetch,tablexhr)} );
buttonclear.addEventListener("click", function(){displaytable(null, tableaxios,tablefetch,tablexhr)} );

// FILLING TABLE AND ROWS
function onLoadJson(array, table) {     
    const thRow = document.createElement('tr');
    const listOfKeys = Object.keys(array[0]);
    listOfKeys.forEach(function(key) {
        const th = document.createElement('th');
        th.textContent = key;
        th.style.width = Math.floor(100/listOfKeys.length) + "%";
        thRow.append(th);    
    });
    table.append(thRow);
    for (let i = 0; i < array.length ; i++){
        const tdRow = document.createElement('tr'); 
        listOfKeys.forEach( function(key){ 
            const td = document.createElement('td');
            td.textContent = array[i][key];
            tdRow.append(td)
        });
        table.append(tdRow);
        
    }
}
function fillcard(card, cardlayout){
    cardlayout.querySelector('.level').textContent = card.level;
    cardlayout.querySelector('.charname').textContent = card.name;
    cardlayout.querySelector('.play').textContent = card.played;    
    cardlayout.querySelector('.vict').textContent = card.victory;
    cardlayout.querySelector('.pow').textContent = card.power;
    cardlayout.querySelector('.att').textContent = card.attack;
    cardlayout.querySelector('.def').textContent = card.armor;
    
}

function getTopScorers(array){
    fillcard(array.sort(sortbyarm)[0], document.querySelector('#toparm'));
    fillcard(array.sort(sortbyplay)[0], document.querySelector('#topplay'));
    fillcard(array.sort(sortbywin)[0], document.querySelector('#topvict'));
    fillcard(array.sort(sortbyatt)[0], document.querySelector('#topatt'));  
    
}



// XHR PART
let req = new XMLHttpRequest();
req.onload =function (){
    array = JSON.parse(this.responseText);
    onLoadJson(array, tablexhr);
    getTopScorers(array);
};
req.open("GET", 'https://arfp.eu/dataset/cards.json',true);
req.send();

// API FETCH PART 
fetch('https://arfp.eu/dataset/cards.json')
.then(response => response.json())
.then(function(json) {
    onLoadJson(json, tablefetch);
});


// API AXIOS PART
axios({
    method: 'get',
    url: 'https://arfp.eu/dataset/cards.json',
    responseType: 'json'
  })
.then(response => onLoadJson(response.data, tableaxios));
    
// init
displaytable(null, tableaxios,tablefetch,tablexhr);