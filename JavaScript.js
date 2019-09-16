const spreadsheetID = "16ZPc11NiIeO2ph_wkMDJMeKjS_evZ_kcxIw51oE_bdQ";

//https://spreadsheets.google.com/feeds/list/16ZPc11NiIeO2ph_wkMDJMeKjS_evZ_kcxIw51oE_bdQ/od6/public/values?alt=json`
const EndPoint = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;
fetch(EndPoint).then(res => res.json()).then(showStuff);

function showStuff(data) {
    var myArray = data.feed.entry;
    console.log(myArray);

    myArray.sort(compareYearFromNew);
    myArray.forEach(showMovies);
}

              function compareYearFromNew(a,b) {
                if (a.gsx$year.$t > b.gsx$year.$t) {
                  return -1;
                }
                if (a.gsx$year.$t < b.gsx$year.$t) {
                  return 1;
                }
                return 0;
              }

              function compareYearFromOld(a, b) {
                if (a.gsx$year.$t < b.gsx$year.$t) {
                  return -1;
                }
                if (a.gsx$year.$t > b.gsx$year.$t) {
                  return 1;
                }
                return 0;
              }

              function compareAbc(a, b) {
                if (a.gsx$bestpicturenominations.$t < b.gsx$bestpicturenominations.$t) {
                  return -1;
                }
                if (a.gsx$bestpicturenominations.$t > b.gsx$bestpicturenominations.$t) {
                  return 1;
                }
                return 0;
              }


    myArray.sort(compareYearFromNew);

    myArray.forEach(showMovies);
}

            function compareYearFromNew(a,b) {
              if (a.gsx$year.$t > b.gsx$year.$t) {
                return -1;
              }
              if (a.gsx$year.$t < b.gsx$year.$t) {
                return 1;
              }
              return 0;
            }

            function compareYearFromOld(a, b) {
              if (a.gsx$year.$t < b.gsx$year.$t) {
                return -1;
              }
              if (a.gsx$year.$t > b.gsx$year.$t) {
                return 1;
              }
              return 0;
            }

            function compareAbc(a, b) {
              if (a.gsx$bestpicturenominations.$t < b.gsx$bestpicturenominations.$t) {
                return -1;
              }
              if (a.gsx$bestpicturenominations.$t > b.gsx$bestpicturenominations.$t) {
                return 1;
              }
              return 0;
            }


function showMovies(movieData) {

    console.log(movieData);
    console.log(movieData.gsx$bestpicturenominations.$t);

    if (movieData.gsx$winners.$t == 1) {

        let newArticle = document.createElement("article");
        newArticle.classList.add("eachMovieArticle");
        newArticle.setAttribute("id", `movie${movieData.gsx$id.$t}`);
        document.querySelector("main").appendChild(newArticle);


        const template = document.querySelector("template").content;
        const templateCopy = template.cloneNode(true);


        templateCopy.querySelector("h1").textContent = movieData.gsx$bestpicturenominations.$t;
        templateCopy.querySelector(".movie_image").src = `images_movies/${movieData.gsx$image.$t}.jpg`;
    templateCopy.querySelector(".year").textContent = `YEAR: ${movieData.gsx$year.$t}`;
    templateCopy.querySelector(".winner").textContent = `WINNER: ${movieData.gsx$winners.$t}`;
    templateCopy.querySelector(".otherNominations").textContent = `OTHER NOMINATIONS: ${movieData.gsx$othernominations.$t}`;
    templateCopy.querySelector(".studio").textContent = `STUDIOS/PRODUCERS: ${movieData.gsx$studio.$t}`;
    templateCopy.querySelector(".otherAwards").textContent = `OTHER AWARDS: ${movieData.gsx$otherawards.$t}`;

    document.querySelector(`#movie${movieData.gsx$id.$t}`).appendChild(templateCopy);
}

}
