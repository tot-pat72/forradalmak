class Area{ //Area osztály létrehozása
    /**
     * @type {HTMLElement}
     */
    #div //privát változó létrehozása
    /**
     * @type {Manager}
     */
    #manager //privát változó létrehozása

    /**
     * @returns {HTMLElement}
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
     * @returns {HTMLElement}
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

    /**
     * 
     * @param {string} label 
     * @returns {HTMLButtonElement}
     */
    createButton(label){ //függvény a gomb létrehozására
        const button = document.createElement('button'); //gomb létrehozása
        button.textContent = label; //button szövege a label értéke lesz
        return button; //visszatérés a buttonnal
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
        this.manager.setAddDataCallback(this.#addDataCallback(tbody)) //callback függvény, ami új adat hozzáadásakor hívódik meg
        this.manager.setRenderTableCallback(this.#renderTableCallback(tbody)) //callback függvény, a táblázat újrarendereléséhez
    }
    /**
     * 
     * @param {HTMLElement} tbody 
     * @returns {RenderTableCallback}
     */
    #renderTableCallback(tbody){ //táblázat újrarenderelése 
        return (array) => { //callback függvény visszaadása
            tbody.innerHTML = ''; //táblázat kiürítése
            for(const data of array){ //array bejárása
                this.#createDataRow(data, tbody); //új sor létrehozása
            } 
        }
    }
    /**
     * 
     * @param {HTMLElement} tbody 
     * @returns {AddDataCallback}
     */
    #addDataCallback(tbody){ //új sor hozzáadása a táblázathoz
        return (data) => { //callback függvény visszaadása
            this.#createDataRow(data, tbody); //új sor hozzáadása
        }
    }  
    /**
     * 
     * @param {Data} data 
     * @param {HTMLTableSectionElement} tbody 
     */
    #createDataRow(data, tbody){ //createDataRow függvény egy új sort ad a táblázathoz
        const tableBodyRow = document.createElement('tr'); //új sor létrehozása
        this.#createCell(tableBodyRow, data.forradalom); //forradalom cella adatainak hozzáadása
        this.#createCell(tableBodyRow, data.evszam); //evszam cella adatainak hozzáadása
        this.#createCell(tableBodyRow, data.sikeres); //sikeres cella adatainak hozzáadása
        tbody.appendChild(tableBodyRow); //tableBodyRow hozzáadása a tbodyhoz
    }
    /**
     * 
     * @param {stHTMLTableRowElementring} row 
     * @param {string} textContent 
     * @param {string} type 
     */
    #createCell(row, textContent, type='td'){ //cella létrehozása és hozzáadása a sorhoz
        const cell = document.createElement(type); //cella létrehozása
        cell.textContent = textContent; //cella tartalmának beállítása
        row.appendChild(cell); //cell hozzáadása a rowhoz
    }
    /**
     * 
     * @returns {HTMLElement}
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
            this.#createCell(headrow, cell, 'th') //cella létrehozása és hozzáadása a fejléc sorához
        }
        
        const tbody = document.createElement('tbody'); //tbody elem létrehozása és eltárolása egy változóba
        table.appendChild(tbody); //tbody hozzáadása a tableelementhez
        return tbody; //visszatérés a tbodyval
    }
}

class Form extends Area{ //Form osztály létrehozása, ami az Area leszármazottja
    /**
     * @type {FormField[]}
     */
    #formField //privát változó létrehozása
    /**
     * 
     * @param {string} cssClass 
     * @param {{fieldid: string, fieldLabel: string}[]} fieldConfig 
     * @param {Manager} manager 
     */
    constructor(cssClass, fieldConfig, manager){ //constructor létrehozása aminek három bemeneti paramétere van
        super(cssClass, manager) //Area osztály constructorának meghívása
        this.#formField = []; //üres tömb létrehozása
        const form = this.#createForm(fieldConfig); //form létrehozása
        form.addEventListener('submit', this.#formsubmitEventListener())//eseménykezelőt hozzáadása a form submit eseményéhez
    }
    /**
     * 
     * @param {string} fieldConfigurationList 
     * @returns {HTMLElement}
     */
    #createForm(fieldConfigurationList){ //privát metódus a form létrehozásához
        const form = document.createElement('form'); //form létrehozása
        this.div.appendChild(form); //form hozzáadása az Area által létre hozoztt divhez

        for(const fieldElement of fieldConfigurationList){ //fieldConfigurationList tömb bejárása
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); //új FormField objektum létrehozása
            this.#formField.push(formField); //formfield eltárolása a tömbben
            form.appendChild(formField.getDiv()); //formFieldhez tartozó elemek hozzáadása a formhoz
        }
        const button = this.createButton('hozzáadás'); //gomb létrehozása
        form.appendChild(button); //button hozzáadása a formhoz
        return form; //visszatérés a formmal
    } 
    /**
     * 
     * @returns {EventListener}
     */ 
    #formsubmitEventListener(){ //event listener létrehozása és visszaadása
        return (e)=> { //esemenykezelő a form elküldéséhez
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            if(this.#validateAllFields()){ //ha a valid értéke true
                const valueObject = this.#getValueObject(); //mezők értékeinek összegyűjtése egy objektumba
                const data = new Data(valueObject.forradalom, valueObject.evszam, valueObject.sikeres); //új Data objektum létrehozása a felhasználó által megadott adatokkal
                this.manager.addData(data); //új objektum hozzáadása a managerhez
            }
        }
    }
    /**
     * 
     * @returns {boolean}
     */
    #validateAllFields(){ //kitöltött mezők ellenőrzése
        let valid = true; //valid változó létrehozása, aminek az kezdő értéke igaz
        for(const formField of this.#formField){ //formField bejárása
            formField.error = ''; //hibaüzenet mező kiürítése
            if(formField.value === ''){ //ha a formField üres
                formField.error = 'Kötelező megadni!'; //hibaüzenetet kiírása
                valid = false; //valid értéke false lesz
            }
        }
        return valid; //visszatérés a validdal
    }
    /**
     * 
     * @returns {{forradalom: string, evszam: string, sikeres: string}}
     */
    #getValueObject(){ //mezők értékeinek összegyűjtése és visszaadása egy objektumban
        const valueObject = {}; //üres objektum létrehozása, a mezők értékeinek az eltárolása
        for(const formField of this.#formField){ //formField bejárása
            valueObject[formField.id] = formField.value; //A mező idje lesz a kulcs az objektumban, az aktuális form mező értékének a hozzárendelése
        }
        return valueObject; //visszatérés a valueObjectel
    }
}

class UploadDownload extends Area { //UploadDownload osztály létrehozása, ami az Area leszármazottja
    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) { //constructor létrehozása aminek két bemeneti paramétere van
        super(cssClass, manager); //Area osztály constructorának meghívása
        const fileInput = document.createElement('input'); //input létrehozása
        fileInput.id = 'fileinput'; //fileInput idje fileinput lesz
        fileInput.type = 'file'; //fileInput típusa file lesz
        this.div.appendChild(fileInput); //fileInput hozzáadása az Area által létre hozoztt divhez
        fileInput.addEventListener('change', this.#importInputEventListener()) //eseménykezelő hozzáadása a fileInputhoz
        const exportButton = this.createButton('Letöltés') //Letöltés gomb létrehozása
        this.div.appendChild(exportButton); //exportButton hozzáadása az Area által létre hozoztt divhez
        exportButton.addEventListener('click', this.#exportButtonEventListener()) //eseménykezelő hozzáadása az exportButtonhoz
    }
    /**
     * 
     * @returns {EventListener}
     */
    #exportButtonEventListener(){ //eseménykezelő a letöltés gombra
        return () => { //visszatérés
            const link = document.createElement('a'); //link elem létrehozása
            const content = this.manager.generateExportString(); //manager objektum generateExportString() metódusának meghívása
            const file = new Blob([content]) //Blob létrehozása
            link.href = URL.createObjectURL(file);// A fájlhoz tartozó ideiglenes URL létrehozása, hogy letölthető legyen a fájl
            link.download = 'newdata.csv' //letöltött fájl nevének megadása
            link.click(); //linkre kattintásnál elindul a letöltés
            URL.revokeObjectURL(link.href); //ideiglenes URL visszavonása
        }
    }
    /**
     * 
     * @returns {EventListener}
     */
    #importInputEventListener(){ //eseménykezelő az importálásra
        return (e) => { //esemenykezelő a fajl feltöltéséhez
            const file = e.target.files[0]; //első fájl kiválasztása
            const fileReader = new FileReader(); //FileReader osztály létrehozása
            fileReader.onload = () => { //fájl betöltődése
                const fileLines = fileReader.result.split('\n'); //tömb tartalmának a sorokra bontása
                const removedLines  = fileLines.slice(1); //fejléc eltávolítása a tömbből
                for(const line of removedLines) { //removedLines bejárása
                    const trimmedLine = line.trim(); //felesleges szóközöket kiszedése
                    const fields = trimmedLine.split(';'); //sorok szétszedése a pontosvesszők mentén
                    const adat = new Data(fields[0], Number(fields[1]), fields[2]); //objektum létrehozása, a fájl elemeivel
                    this.manager.addData(adat); //új objektum hozzáadása a managerhez
                }
            };
            fileReader.readAsText(file); //fájl beolvasása szövegként
        }
    }
}

class FormField { //FormField osztály létrehozása
    /**
     * @param {string} id
     */
    #id; //privát változó létrehozása

    /**
     * @param {HTMLInputElement} inputElement
     */
    #inputElement; //privát változó létrehozása

    /**
     * @param {HTMLLabelElement} labelElement
     */
    #labelElement; //privát változó létrehozása

    /**
     * @param {HTMLSpanElement} errorElement
     */
    #errorElement; //privát változó létrehozása

    /**
     * @returns {string}
     */
    get id() { //get létrehozása, hogy el lehessen érni az idét
        return this.#id; //Visszatérés az idvel
    }
 
    /**
     * @returns {string}
     */
    get value() { //get létrehozása, hogy el lehessen érni a valuet
        return this.#inputElement.value; //Visszatérés a valueval
    }
 
    /**
     * @param {string}
     */
    set error(value) { //setter létrehozása az 'error' értékének beállításához
        this.#errorElement.textContent = value; //errorElement szövegének beállítása a kapott értékre
    }

    /**
     * 
     * @param {string} id 
     * @param {string} labelContent 
     */
    constructor(id, labelContent) { //constructor létrehozása aminek két bemeneti paramétere van
        this.#id = id; //id értéke a bemeneti paraméter
        this.#labelElement = document.createElement('label'); //label elem létrehozása
        this.#labelElement.htmlFor = id; //label beállítása, hogy melyik inputhoz tartozik
        this.#labelElement.textContent = labelContent; //label szövegének beállítása
 
        if (id === 'sikeres') { //ha az id sikeres
            this.#inputElement = document.createElement('select'); //legördülő lista létrehozása
            this.#inputElement.id = id; //id beállítása
 
            const option_igen = document.createElement('option'); //option_igen létrehozása
            option_igen.value = 'igen'; //option_igen értéke: igen
            option_igen.innerText = 'igen'; //option_igen megjelenő szövege: igen
 
            const option_nem = document.createElement('option'); //option_nem létrehozása
            option_nem.value = 'nem'; //option_nem értéke: nem
            option_nem.innerText = 'nem'; //option_nem megjelenő szövege: nem
 
            this.#inputElement.appendChild(option_igen); //option_igen(igen) hozzáadása az inputElementhez
            this.#inputElement.appendChild(option_nem); //option_nem(igen) hozzáadása az inputElementhez
        } 
        else { //ha a mező sikertelen
            this.#inputElement = document.createElement('input'); //input mező létrehozása
            this.#inputElement.id = id; //id beállítása
        }
        this.#errorElement = document.createElement('span'); //span elem létrehozása
        this.#errorElement.className = 'error'; //className adása, ami az error lesz
    }

    /**
     * 
     * @returns {HTMLDivElement}
     */
    getDiv() { //metódus, ami visszaadja a teljes mezőt egy div-ben
        const div = makeDiv('field'); //div elem létrehozása, amibe az elemek kerülnek
        const br1 = document.createElement('br'); //első sortörés
        const br2 = document.createElement('br'); //második sortörés
        const elements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement]; //tömbbe, az összes elem belerakása
        for (const element of elements) { //elements tömb bejárása
            div.appendChild(element); //element hozzáadása a divhez
        }
        return div; //Visszatérés a divvel
    }
}