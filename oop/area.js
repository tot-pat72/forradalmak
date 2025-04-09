class Area{ //Area osztály létrehozása
    #div //privát változó létrehozása

    /**
     * @returns {HTMLDivElement}
     */
    get div(){ //get létrehozása, hogy el lehessen érni a divet
        return this.#div //Visszatérés a divvel
    }
    /**
     * 
     * @param {string} className
     */
    constructor(className){ //constructor létrehozása aminek a className a bemeneti paramétere
        let containerDiv = document.querySelector(".containeroop"); //containeroop classal rendelkező elemek eltárolása egy változóban
        if(!containerDiv){ //Ha nincs ilyen elem
            containerDiv = document.createElement("div"); //div elem létrehozása
            containerDiv.className = "containeroop"; //className adása a div elemnek
            document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz
        }
        this.#div = document.createElement("div"); //új privát div elem létrehozása 
        this.#div.className = className; //className adása a div elemnek
        containerDiv.appendChild(this.#div); //div elem hozzáadása a containerdivhez
    }
}

class Table extends Area{ //Table osztály létrehozása, ami az Area leszármazottja
    /**
     * 
     * @param {string} cssClass 
     */
    constructor(cssClass){ //constructor létrehozása aminek egy bemeneti paramétere van
        super(cssClass); //Area osztály constructorának meghívása

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
    }
}

class Form extends Area{ //Form osztály létrehozása, ami az Area leszármazottja
    /**
     * @param {string} cssClass
     */
    constructor(cssClass){ //constructor létrehozása aminek egy bemeneti paramétere van
        super(cssClass) //Area osztály constructorának meghívása

        const form = document.createElement('form'); //form létrehozása
        this.div.appendChild(form); //form hozzáadása az Area által létre hozoztt divhez

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
    }

}