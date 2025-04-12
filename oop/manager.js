class Manager { //Manager osztály létrehozása
    #array; //privát változó létrehozása
    #addDataCallback; //privát változó létrehozása
 
    constructor() { //constructor létrehozása
        this.#array = []; //privát változó egy üres tömb
    }
 
    setAddDataCallback(callback) { //callback függvény beállítása
        this.#addDataCallback = callback; //callback függvény eltárolása egy privát változóban
    }

    addData(data) { //új adat hozzáaadása a listához
        this.#array.push(data); //az adat belerakása a privát tömbbe
        this.#addDataCallback(data); //callback meghívása és új adat átadása
    }

    generateExportString(){ //a fájl tartalmának legenerálása szövegként
        const result = ['forradalom;evszam;sikeres'] //result tömb létrehozása, aminek első sora a fejléc
        for(const data of this.#array){ //privát array bejárása
            result.push(`${data.forradalom};${data.evszam};${data.sikeres}`); //sorok hozzáadása a tömbhöz
        }
        return result.join('\n'); //tömb átalakítása szöveggé(string), elválasztás soronként
    }
}