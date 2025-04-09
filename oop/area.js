class Area{ //Area osztály létrehozása
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
        const div = document.createElement("div"); //div elem létrehozása
        div.className = className; //className adása a div elemnek
        containerDiv.appendChild(div); //div hozzáadása a containerdivhez
    }
}