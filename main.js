const array = [] //tömb létrehozása
/**
 * 
 * @param {string} className 
 * @returns {HTMLDivElement}
 */
const makeDiv = (className) => { //Arrow function létrehozása aminek a className a bemeneti paramétere
    const div = document.createElement("div"); //div elem létrehozása
    div.className = className; //className adása a div elemnek
    return div; //Visszatérés a divvel
}
const containerDiv = makeDiv("container"); //containerdiv létrehozása, aminek a container lesz a classa
document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz

const tableDiv = makeDiv("table"); //tablediv létrehozása, aminek a table lesz a classa

const tableelement = document.createElement('table'); //table elem létrehozása és eltárolása egy változóba
tableDiv.appendChild(tableelement); //tableelement hozzáadása a tableDivhez

const head = document.createElement('thead'); //thead elem létrehozása és eltárolása egy változóba
tableelement.appendChild(head); //head hozzáadása a tableelementhez

const headrow =  document.createElement('tr'); //tr elem létrehozása és eltárolása egy változóba
head.appendChild(headrow) //headrow hozzáadása a headhez

const headcell = ['forradalom', 'évszám', 'sikeres']; //tömb a fejléc tartalmával
for(const cell of headcell){ //headcell tömb bejárása
    const thcell = document.createElement('th'); //th elem létrehozása és eltárolása egy változóba
    thcell.innerText = cell; //thcell tartalma a cellában lévő elem lesz
    headrow.appendChild(thcell); //thcell hozzáadása a headrowhoz
}

const tbody = document.createElement('tbody'); //tbody elem létrehozása és eltárolása egy változóba
tableelement.appendChild(tbody); //tbody hozzáadása a tableelementhez

const formDiv = makeDiv("form"); //formdiv létrehozása, aminek a form lesz a classa
const formSim = document.createElement('form'); //form létrehozása
formDiv.appendChild(formSim); //formSim hozzáadása a formDivhez

const fieldElementList = [{ //tömb létrehozása, benne 3 objektummal
    fieldid: 'forradalom', //1. objektum idja
    fieldLabel: 'forradalom' //1. objektum labelje
},
{
    fieldid: 'evszam', //2. objektum idja
    fieldLabel: 'evszám' //2. objektum labelje
},
{
    fieldid: 'sikeres', //3. objektum idja
    fieldLabel: 'sikeres' //3. objektum labelje
}];

for(const fieldElement of fieldElementList){ //fieldElementList tömb bejárása
    const field = makeDiv('field'); //field létrehozása
    formSim.appendChild(field); //field hozzáadása a formSimhez

    const label = document.createElement('label'); //label létrehozása
    label.htmlFor = fieldElement.fieldid; //beállítja hogy melyik inputhoz tartozik
    label.textContent = fieldElement.fieldLabel; //label szövegének beállítása
    field.appendChild(label); //label hozzáadása a fieldhez
    field.appendChild(document.createElement('br')); //sortörés, hogy az input új sorba legyen
 
    if (fieldElement.fieldid === 'sikeres') { //ha a mező sikeres
        input = document.createElement('select'); //legördülő lista létrehozása
        input.id = fieldElement.fieldid; //id beállítása

        const option_1 = document.createElement('option'); //option_1 létrehozása
        option_1.value = 'igen'; //option_1 értéke: igen
        option_1.innerText = 'igen'; //option_1 megjelenő szövege: igen
 
        const option_2 = document.createElement('option'); //option_2 létrehozása
        option_2.value = 'nem'; //option_2 értéke: nem
        option_2.innerText = 'nem'; //option_2 megjelenő szövege: nem

        input.appendChild(option_1); //option_1(igen) hozzáadása az inputhoz
        input.appendChild(option_2); //option_2(nem) hozzáadása az inputhoz
    }
    else{ //ha a mező sikertelen
        input = document.createElement('input'); //sima input mező létrehozása
        input.id = fieldElement.fieldid; //id beállítása
    }
    field.appendChild(input); //input hozzáadása a fieldhez

    field.appendChild(document.createElement('br')); //sortörés hozzáadása a fieldhez
    const error = document.createElement('span'); //span létrehozása a hiba üzenetnek
    error.className = 'error'; //className adása az error elemnek, ami az error lesz
    field.appendChild(error); //error hozzáadása a fieldhez
}
 
/**
 * @param {HTMLFormElement}
 */
const buttonFormSim = document.createElement('button'); //gomb létrehozása
buttonFormSim.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
formSim.appendChild(buttonFormSim); //buttonFormSim hozzáadása a formSimhez

formSim.addEventListener('submit', (e)=> { //form elküldésével fut le
    e.preventDefault(); //az oldal újra frissülésének megakadályozása
    const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
    const inputFields = e.target.querySelectorAll('input, select'); //az összes input és select mezőt lekérése a formból
    let valid = true; //valid változó létrehozása, aminek az kezdő értéke igaz
    for(const inputField of inputFields){ //inputFields bejárása
        const error = inputField.parentElement.querySelector('.error'); //error classal rendelkező elem eltárolása egy változóban
        if(!error){ //ha nem létezik ilyen mező
            console.error('nincs errorfield'); //nincs errorfield hibaüzenet kiírása a konzolra
            return; //visszatérés
        }
        error.textContent = ''; //hibaüzenet mező kiürítése
        if(inputField.value === ''){ //ha az inputField üres
            error.textContent = 'Kötelező megadni!'; //hibaüzenetet kiírása
            valid = false; //valid értéke false lesz
        }
        valueObject[inputField.id] = inputField.value; //A mező idje lesz a kulcs az objektumban, az aktuális input mező értékének a hozzárendelése.
    }
    if(valid){ //ha a valid értéke true
    array.push(valueObject); //adatok hozzáadása a tömbhöz
 
    const tableBodyRow = document.createElement('tr'); //új sor létrehozása
    tbody.appendChild(tableBodyRow ); //tableBodyRow hozzáadása a tbodyhoz
 
    const forradalomCell = document.createElement('td'); //új cella létrehozása a forradalomnak
    forradalomCell.textContent = valueObject.forradalom; //cella tartalma a forradalom értéke
    tableBodyRow .appendChild(forradalomCell); //forradalomCell hozzáadása a tableBodyRowhoz

    const evszamCell = document.createElement('td'); //új cella létrehozása az évszámnak
    evszamCell.textContent = valueObject.evszam; //cella tartalma az évszám értéke
    tableBodyRow .appendChild(evszamCell); //evszamCell hozzáadása a tableBodyRowhoz

    const sikeresCell = document.createElement('td'); //új cella létrehozása a sikeresnek
    sikeresCell.textContent = valueObject.sikeres; //cella tartalma a sikeres értéke
    tableBodyRow .appendChild(sikeresCell); //sikeresCell hozzáadása a tableBodyRowhoz
    }
})

containerDiv.appendChild(tableDiv); //tablediv hozzáadása a containerdivhez
containerDiv.appendChild(formDiv); //formdiv hozzáadása a containerdivhez

const fileInput = document.createElement('input'); //input létrehozása
containerDiv.appendChild(fileInput); //fileInput hozzáadása a containerDivhez
fileInput.id = 'fileinput'; //fileInput idje fileinput lesz
fileInput.type = 'file'; //fileInput típusa file lesz
fileInput.addEventListener('change', (e) => { //eseménykezelő létrehozása a fileInput elemhez
    const file = e.target.files[0]; //első fájl kiválasztása
    const fileReader = new FileReader(); //FileReader osztály létrehozása
    fileReader.onload = () => { //fájl betöltődése
        const fileLines = fileReader.result.split('\n'); //tömb tartalmának a sorokra bontása
        const removedLines = fileLines.slice(1); //fejléc eltávolítása a tömbből
        for (const line of removedLines) { //removedLines bejárása
            const trimmedLine  = line.trim(); //felesleges szóközöket kiszedése
            const fields = trimmedLine .split(';'); //sorok szétszedése a pontosvesszők mentén
            const adat = { //objektum létrehozása
                forradalom: fields[0], //objektum 1.eleme
                evszam: fields[1], //objektum 2.eleme
                sikeres: fields[2] //objektum 3.eleme
            };
            array.push(adat); //adatok hozzáadása a tömbhöz
            const tableBodyRow = document.createElement('tr'); //új sor létrehozása
            tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
 
            const forradalomCell = document.createElement('td'); //új cella létrehozása a forradalomnak
            forradalomCell.textContent = adat.forradalom; //cella tartalma a forradalom értéke
            tableBodyRow.appendChild(forradalomCell); //forradalomCell hozzáadása a tableBodyRowhoz
 
            const evszamCell = document.createElement('td'); //új cella létrehozása az évszámnak
            evszamCell.textContent = adat.evszam; //cella tartalma az évszám értéke
            tableBodyRow.appendChild(evszamCell); //evszamCell hozzáadása a tableBodyRowhoz

            const sikeresCell = document.createElement('td'); //új cella létrehozása a sikeresnek
            sikeresCell.textContent = adat.sikeres; //cella tartalma a sikeres értéke
            tableBodyRow.appendChild(sikeresCell); //sikeresCell hozzáadása a tableBodyRowhoz
        }
    };
    fileReader.readAsText(file); //fájl beolvasása szövegként
});