class Data { //Adat osztály létrehozása
    #forradalom; //privát változó létrehozása
    #evszam; //privát változó létrehozása
    #sikeres; //privát változó létrehozása

    get forradalom(){ //get létrehozása, hogy el lehessen érni a forradalmat
        return this.#forradalom; //Visszatérés a forradalommal
    }
 
    get evszam(){ //get létrehozása, hogy el lehessen érni az évszámot
        return this.#evszam; //Visszatérés az évszámmal
    }
 
    get sikeres(){ //get létrehozása, hogy el lehessen érni a sikerest
        return this.#sikeres; //Visszatérés a sikeressel
    }
 
    constructor(forradalom, evszam, sikeres) { //constructor létrehozása aminek a forradalom, evszam és a sikeres a bemeneti paramétere
        this.#forradalom = forradalom; //forradalom értéke a bemeneti paraméter
        this.#evszam = evszam; //evszam értéke a bemeneti paraméter
        this.#sikeres = sikeres; //sikeres értéke a bemeneti paraméter
    }
}