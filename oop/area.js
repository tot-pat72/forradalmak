class Area{ //Area osztály létrehozása
    #div //privát változó létrehozása
    #manager //privát változó létrehozása

    /**
     * @returns {HTMLDivElement}
     */
    get div(){ //get létrehozása, hogy el lehessen érni a divet
        return this.#div //Visszatérés a divvel
    }

    /**
     * @returns {Manager}
     */
    get manager(){ //get létrehozása, hogy el lehessen érni a managert
        return this.#manager //Visszatérés a managerrel
    }
    /**
     * 
     * @param {string} className
     * @param {Manager} manager
     */
    constructor(className, manager){ //constructor létrehozása aminek a className és a manager a bemeneti paramétere
        this.#manager = manager; //manager értéke a bemeneti paraméter
        const container = this.#getContainerDiv(); //#getContainerDiv meghívása és ennek eltárolása egy változóba
        this.#div = document.createElement('div'); //új div elem létrehozása
        this.#div.className = className; //className adása az új div elemnek
        container.appendChild(this.#div); //új div elem hozzáadása a containerhez
    }
 
    /**
     * 
     * @returns {HTMLDivElement}
     */
    #getContainerDiv(){
        let containerDiv = document.querySelector(".containeroop"); //containeroop classal rendelkező elem eltárolása egy változóban
        if(!containerDiv){ //Ha nincs ilyen elem
            containerDiv = document.createElement("div"); //div elem létrehozása
            containerDiv.className = "containeroop"; //className adása a div elemnek
            document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz
        }
        return containerDiv; //Visszatérés a containerDivvel
    }
}

class Table extends Area{ //Table osztály létrehozása, ami az Area leszármazottja
    /**
     * 
     * @param {string} cssClass
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){ //constructor létrehozása aminek két bemeneti paramétere van
        super(cssClass, manager); //Area osztály constructorának meghívása
        const tbody = this.#createTable(); //createTable visszatérési értékének az eltárolása egy változóba
        this.manager.setAddDataCallback((datas) => { //arrow function létrehozása 
        const tableBodyRow = document.createElement('tr'); //új sor létrehozása
        tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz

        const forradalomCell = document.createElement('td'); //új cella létrehozása a forradalomnak
        forradalomCell.textContent = datas.forradalom; //cella tartalma a forradalom értéke
        tableBodyRow.appendChild(forradalomCell); //forradalomCell hozzáadása a tableBodyRowhoz
 
        const evszamCell = document.createElement('td'); //új cella létrehozása az évszámnak
        evszamCell.textContent = datas.evszam; //cella tartalma az évszám értéke
        tableBodyRow.appendChild(evszamCell); //evszamCell hozzáadása a tableBodyRowhoz

        const sikeresCell = document.createElement('td'); //új cella létrehozása a sikeresnek
        sikeresCell.textContent = datas.sikeres; //cella tartalma a sikeres értéke
        tableBodyRow.appendChild(sikeresCell); //sikeresCell hozzáadása a tableBodyRowhoz
        })
    }

    /**
     * 
     * @returns {HTMLTableSectionElement}
     */
    #createTable(){ //táblázat létrehozása
        const table = document.createElement('table'); //table elem létrehozása és eltárolása egy változóba
        this.div.appendChild(table); //table hozzáadás az Area által létre hozoztt divhez
        
        const head = document.createElement('thead'); //thead elem létrehozása és eltárolása egy változóba
        table.appendChild(head); //head hozzáadása a tableelementhez
        
        const headrow =  document.createElement('tr'); //tr elem létrehozása és eltárolása egy változóba
        head.appendChild(headrow) //headrow hozzáadása a headhez
        
        const headcell = ['forradalom', 'évszám', 'sikeres']; //tömb a fejléc tartalmával
        for(const cell of headcell){ //headcell tömb bejárása
            const thcell = document.createElement('th'); //th elem létrehozása és eltárolása egy változóba
            thcell.innerText = cell; //thcell tartalma a cellában lévő elem lesz
            headrow.appendChild(thcell); //thcell hozzáadása a headrowhoz
        }
        
        const tbody = document.createElement('tbody'); //tbody elem létrehozása és eltárolása egy változóba
        table.appendChild(tbody); //tbody hozzáadása a tableelementhez
        return tbody; //Visszatérés a tbodyval
    }
}

class Form extends Area{ //Form osztály létrehozása, ami az Area leszármazottja
    /**
     * @param {string} cssClass
     */
    constructor(cssClass, fieldConfig, manager){ //constructor létrehozása aminek három bemeneti paramétere van
        super(cssClass, manager) //Area osztály constructorának meghívása

        const form = document.createElement('form'); //form létrehozása
        this.div.appendChild(form); //form hozzáadása az Area által létre hozoztt divhez

        for(const fieldElement of fieldConfig){ //fieldConfig tömb bejárása
            const field = makeDiv('field'); //field létrehozása
            form.appendChild(field); //field hozzáadása a formhoz

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

                input.appendChild(option_1); //option_1(igen) hozzáadása
                input.appendChild(option_2); //option_2(nem) hozzáadása
            }
            else{ //ha a mező sikertelen
                input = document.createElement('input'); //sima input mező létrehozása
                input.id = fieldElement.fieldid; //id beállítása
            }
            field.appendChild(input); //input hozzáadása a fieldhez
        }
        
        const button = document.createElement('button'); //gomb létrehozása
        button.textContent = 'hozzáadás'; //gomb szövegének beállítása(hozzáadás)
        form.appendChild(button); //button hozzáadása a formhoz

        form.addEventListener('submit', (e)=> { //form elküldésével fut le
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
            const inputFields = e.target.querySelectorAll('input, select'); //az összes input és select mezőt lekérése a formból
            for(const inputField of inputFields){ //inputFields bejárása
                valueObject[inputField.id] = inputField.value; //A mező idje lesz a kulcs az objektumban, az aktuális input mező értékének a hozzárendelése.
            }
            const data = new Data(valueObject.forradalom, valueObject.evszam, valueObject.sikeres) //új Data objektum létrehozása a felhasználó által megadott adatokkal
            this.manager.addData(data) //új objektum hozzáadása a managerhez
        })
    }

}