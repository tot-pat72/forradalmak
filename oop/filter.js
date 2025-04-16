class Filter extends Area{ //Filter osztály létrehozása, ami az Area leszármazottja
    /**
     * 
     * @param {string} cssclass 
     * @param {Manager} manager 
     */
    constructor(cssclass, manager){ //constructor létrehozása aminek a cssClass és a manager a bemeneti paramétere
        super(cssclass, manager); //Area osztály constructorának meghívása

        const formForFilter = document.createElement('form'); //form létrehozása
        this.div.appendChild(formForFilter); //formForFilter hozzáadása a filterFormDivhez
        
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

        const button = this.createButton('Szűrés') //gomb létrehozása a createButton segítségével
        formForFilter.appendChild(button); //button hozzáadása a formForFilterhez

        const div = document.createElement('div'); //div létrehozása
        formForFilter.appendChild(div); //div hozzáadása a formForFilterhez

        formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            
            const counter = manager.counter(select.value, filterInputField.value); //manager osztály counter metódusának meghívása
            div.innerHTML = `A számlálás eredménye: ${counter}`; //div tartalmának megadása, ami a counter értéke lesz
        })
    }
}