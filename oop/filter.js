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

        formForFilter.addEventListener('submit', (e) => { //eseménykezelő létrehozása a formForFilter submit eseményére
            e.preventDefault(); //az oldal újra frissülésének megakadályozása
            const filterInput = e.target.querySelector('#filterInput'); //filterinput classal rendelkezö elem kiválasztása
            const select = e.target.querySelector('select'); //select classal rendelkezö elem kiválasztása
            this.manager.filter((element) => { //callback függvény, amely minden elemre lefut
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
        })
    }
}