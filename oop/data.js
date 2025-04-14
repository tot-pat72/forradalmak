class Data { //Adat osztály létrehozása
    /**
     * @type {string}
     */
    #forradalom; //privát változó létrehozása

    /**
     * @type {Number}
     */
    #evszam; //privát változó létrehozása

    /**
     * @type {string}
     */
    #sikeres; //privát változó létrehozása

    /**
     * @returns {string}
     */
    get forradalom(){ //get létrehozása, hogy el lehessen érni a forradalmat
        return this.#forradalom; //Visszatérés a forradalommal
    }
 
    /**
     * @returns {Number}
     */
    get evszam(){ //get létrehozása, hogy el lehessen érni az évszámot
        return this.#evszam; //Visszatérés az évszámmal
    }
 
    /**
     * @returns {string}
     */
    get sikeres(){ //get létrehozása, hogy el lehessen érni a sikerest
        return this.#sikeres; //Visszatérés a sikeressel
    }
 
    /**
     * 
     * @param {string} forradalom 
     * @param {Number} evszam 
     * @param {string} sikeres 
     */
    constructor(forradalom, evszam, sikeres) { //constructor létrehozása aminek a forradalom, evszam és a sikeres a bemeneti paramétere
        this.#forradalom = forradalom; //forradalom értéke a bemeneti paraméter
        this.#evszam = evszam; //evszam értéke a bemeneti paraméter
        this.#sikeres = sikeres; //sikeres értéke a bemeneti paraméter
    }
}