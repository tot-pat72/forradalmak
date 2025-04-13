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
/**
 * 
 * @param {Array} dataArray
 * @param {boolean} callback
 * @returns {Array}
 */
const filter = (dataArray, callback) => { //Arrow function létrehozása aminek a dataArray és a callback a bemeneti paramétere
    const result = []; //üres tömb létrehozása, a szürt elemeknek
    for(const element of dataArray){ //dataArray bejárása
        if(callback(element)){ //ha a callback függvény truet ad vissza
            result.push(element); //result hozzáadása a tömbhöz
        }
    }
    return result; //visszatérés resulttal
}
/**
 * @param {HTMLElement} containerDiv
 * @param {Function} callback
 */
const createTable = (containerDiv, callback) => { //Arrow function létrehozása aminek a containerDiv és a callback a bemeneti paramétere
    const tableDiv = makeDiv("table"); //tablediv létrehozása, aminek a table lesz a classa
    containerDiv.appendChild(tableDiv);

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
    callback(tbody);
}
/**
 * @param {HTMLElement} tbody
 * @param {HTMLElement} containerDiv
 * @param {Array} array
 */
const createFileUpload = (tbody, containerDiv, array) => { //Arrow function létrehozása aminek a tbody, containerDiv és az array a bemeneti paramétere
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
}
/**
* @param {HTMLElement} tbody
* @param {HTMLElement} containerDiv
* @param {Array} array
*/
const createForm = (tbody, containerDiv, array) => { //Arrow function létrehozása aminek a tbody, containerDiv és az array a bemeneti paramétere
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
        addRow(valueObject, tbody)
        }
    })
    containerDiv.appendChild(formDiv); //formdiv hozzáadása a containerdivhez
}
/**
 *
 * @param {Object} valueObject
 * @param {HTMLElement} tbody
 */
const addRow = (valueObject, tbody) => { //Arrow function létrehozása aminek a tbody és a valueObject a bemeneti paramétere
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
/**
 *
 * @param {HTMLElement} containerDiv
 * @param {Array} array
 */
const createFileDownload  = (containerDiv, array) => { //Arrow function létrehozása aminek a containerDiv és az array a bemeneti paramétere
    const exportButton = document.createElement('button'); //új gomb létrehozása
    exportButton.textContent = 'Letöltés'; //gomb szövege a Letöltés lesz
    containerDiv.appendChild(exportButton); //exportButton hozzáadása a containerDivhez
    exportButton.addEventListener('click', () => { //eseménykezelő létrehozása az exportButton elemhez
    const link = document.createElement('a'); //link elem létrehozása
    const contentArray = ['forradalom;evszam;sikeres'] //contentArray tömb létrehozása, aminek első sora a fejléc
    for(const data of array){ //array bejárása
        contentArray.push(`${data.forradalom};${data.evszam};${data.sikeres}`); //sorok hozzáadása a tömbhöz
    }
    const content = contentArray.join('\n'); //tömb átalakítása szöveggé(string), elválasztás soronként
    const file = new Blob([content]) //Blob létrehozása
    link.href = URL.createObjectURL(file);// A fájlhoz tartozó ideiglenes URL létrehozása, hogy letölthető legyen a fájl
    link.download = 'newdata.csv' //letöltött fájl nevének megadása
    link.click(); //linkre kattintásnál elindul a letöltés
    URL.revokeObjectURL(link.href); //ideiglenes URL visszavonása
});
}
/**
 *
 * @param {HTMLElement} containerDiv
 * @param {HTMLElement} tbody
 * @param {Array} array
 */
const createFilterForm = (containerDiv, tbody, array) => { //Arrow function létrehozása aminek a tbody, containerDiv és az array a bemeneti paramétere
    const filterFormDiv = makeDiv('filterForm') //filterFormDiv létrehozása, aminek a filterForm lesz a classa
    containerDiv.appendChild(filterFormDiv); //filterFormDiv hozzáadása a containerDivhez

    const formForFilter = document.createElement('form'); //form létrehozása
    filterFormDiv.appendChild(formForFilter); //formForFilter hozzáadása a filterFormDivhez

    const select = document.createElement('select'); //legördülő lista létrehozása
    formForFilter.appendChild(select); //select hozzáadása a formForFilterhez

    const options = [{ //tömb létrehozása, benne objektummal
        value: '', //lista 1.értéke
        innerText: '' //üres szöveg
    },
    {
        value: 'forradalom', //lista 2.értéke
        innerText: 'forradalom' //szövege: forradalom
    },
    {
        value: 'evszam', //lista 3.értéke
        innerText: 'évszám' //szövege: évszám
    },
    {
        value: 'sikeres', //lista 4.értéke
        innerText: 'sikeres' //szövege: sikeress
    }]
    for(const option of options){ //options tömb bejárása
        const optionElement = document.createElement('option'); //optionElement létrehozása
        optionElement.value = option.value; //érték beállítása
        optionElement.innerText = option.innerText //megjelenő szöveg beállítása
        select.appendChild(optionElement); //optionElement hozzáadása a selecthez
    }
    
    const filterInputField = document.createElement('input'); //input létrehozása
    filterInputField.id = 'filterInput'; //filterInputField idje filterInput lesz
    formForFilter.appendChild(filterInputField); //filterInputField hozzáadása a formForFilterhez
    
    const button = document.createElement('button'); //új gomb létrehozása
    button.innerText = 'Szűrés'; //gomb szövege a Szűrés lesz
    formForFilter.appendChild(button); //button hozzáadása a formForFilterhez

    formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
        e.preventDefault(); //az oldal újra frissülésének megakadályozása
        const filterInput = e.target.querySelector('#filterInput'); //filterinput classal rendelkezö elem kiválasztása
        const select = e.target.querySelector('select'); //select classal rendelkezö elem kiválasztása
        const filteredArray = filter(array, (element) => { //filteredArray létrehozása a megadott mező és érték alapján
            if(select.value == 'forradalom'){ //ha a kiválasztott mező a forradalom
                if(filterInput.value === element.forradalom){ //ha a filterInput értéke egyenlő a forradalom értékével
                    return true; //visszatérés igazzal
                }
            }
            else if(select.value == 'evszam'){ //ha a kiválasztott mező az evszam
                if(filterInput.value === element.evszam){ //ha a filterInput értéke egyenlő az evszam értékével
                    return true; //visszatérés igazzal
                }
            }
            else if(select.value == 'sikeres'){ //ha a kiválasztott mező a sikeres
                if(filterInput.value === element.sikeres){ //ha a filterInput értéke egyenlő a sikeres értékével
                    return true; //visszatérés igazzal
                }
            }
            else{
                return true; //visszatérés igazzal
            }
        })
        tbody.innerHTML = ''; //táblázat kiürítése
        for(const filteredElement of filteredArray){ //filteredArray bejárása
            addRow(filteredElement, tbody) //addRow függvény egy új sort ad a táblázathozs
                
        }
    })
}
const containerDiv = makeDiv("container"); //containerdiv létrehozása, aminek a container lesz a classa
document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz
/**
 * 
 * @param {HTMLElement} containerDiv
 * @param {Function} bodyOfTable
 */
createTable(containerDiv, (bodyOfTable) => { //createTable függvény létrehozása, amely létrehozza a táblázatot
    createForm(bodyOfTable, containerDiv, array); //createForm létrehozása, amivel új adatokat lehet beküldeni a táblázathoz
    createFileUpload(bodyOfTable, containerDiv, array); //createFileUpload létrehozása, hogy a felhasználó feltölthessen adatokat egy fájlból
    createFileDownload(containerDiv, array); //createFileDownload létrehozása, ami lehetővé teszi az array tömbben tárolt adatok letöltését
    createFilterForm(containerDiv, bodyOfTable, array); //createFilterForm létrehozása, amivel a felhasználó szűrheti a táblázat adatait
});