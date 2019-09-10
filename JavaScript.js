const spreadsheetID = "16ZPc11NiIeO2ph_wkMDJMeKjS_evZ_kcxIw51oE_bdQ";

const EndPoint = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;
fetch(EndPoint).then(res=>res.json()).then(showStuff);

function showStuff(data){
    const myArray = data.feed.entry;
    console.log(myArray);
    myArray.forEach(showMovies);
}


function showMovies(movieData){
    const template = document.querySelector("template").content;
    const templateCopy = template.cloneNode(true);
    console.log(movieData);
    templateCopy.querySelector("h1").textContent = movieData.gsx$name.$t;
    templateCopy.querySelector(".year").textContent = movieData.gsx$year.$t;
    templateCopy.querySelector(".BoxOffice").textContent = movieData.gsx$boxoffice.$t;

    document.querySelector("main").appendChild(templateCopy);
}
