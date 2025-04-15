const array = [] //tömb létrehozása

const containerDiv = makeDiv("container"); //containerdiv létrehozása, aminek a container lesz a classa
document.body.appendChild(containerDiv); //containerdiv hozzáadása a bodyhoz

createTable(containerDiv, (bodyOfTable) => { //createTable függvény létrehozása, amely létrehozza a táblázatot
    createForm(bodyOfTable, containerDiv, array); //createForm létrehozása, amivel új adatokat lehet beküldeni a táblázathoz
    createFileUpload(bodyOfTable, containerDiv, array); //createFileUpload létrehozása, hogy a felhasználó feltölthessen adatokat egy fájlból
    createFileDownload(containerDiv, array); //createFileDownload létrehozása, ami lehetővé teszi az array tömbben tárolt adatok letöltését
    createFilterForm(containerDiv, bodyOfTable, array); //createFilterForm létrehozása, amivel a felhasználó szűrheti a táblázat adatait
});