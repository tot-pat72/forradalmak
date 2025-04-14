class Manager { //Manager osztály létrehozása
    /**
     * @type {Data[]}
     */
    #array; //privát változó létrehozása
    /**
     * @type {AddDataCallback}
     */
    #addDataCallback; //privát változó létrehozása
    /**
     * @type {RenderTableCallback}
     */
    #renderTableCallback; //privát változó létrehozása
 
    constructor() { //constructor létrehozása
        this.#array = []; //privát változó egy üres tömb
    }
 
    /**
     * 
     * @param {Function} callback 
     */
    setAddDataCallback(callback) { //callback függvény beállítása
        this.#addDataCallback = callback; //callback függvény eltárolása egy privát változóban
    }

    /**
     * 
     * @param {Function} callback 
     */
    setRenderTableCallback(callback){ //callback függvény beállítása
        this.#renderTableCallback = callback; //callback függvény eltárolása egy privát változóban
    }

    /**
     * 
     * @param {Data} data 
     */
    addData(data) { //új adat hozzáaadása a listához
        this.#array.push(data); //az adat belerakása a privát tömbbe
        this.#addDataCallback(data); //callback meghívása és új adat átadása
    }

    /**
     * 
     * @param {Function} callback 
     */
    filter(callback){ //callback függvény beállítása
        const result = []; //üres tömb létrehozása, a szürt elemeknek
        for(const data of this.#array){ //array bejárása
            if(callback(data)){ //ha a callback függvény truet ad vissza
                result.push(data); //result hozzáadása a tömbhöz
            }
        }
        this.#renderTableCallback(result); //renderTableCallback meghívása a szürt adatokkal
    }

    /**
     * 
     * @returns {string}
     */
    generateExportString(){ //a fájl tartalmának legenerálása szövegként
        const result = ['forradalom;evszam;sikeres'] //result tömb létrehozása, aminek első sora a fejléc
        for(const data of this.#array){ //privát array bejárása
            result.push(`${data.forradalom};${data.evszam};${data.sikeres}`); //sorok hozzáadása a tömbhöz
        }
        return result.join('\n'); //tömb átalakítása szöveggé(string), elválasztás soronként
    }
}