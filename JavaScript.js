const body = document.querySelector("body");

//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
    body.classList.remove("modal-open");
    const nominees = modal.querySelector("ul");
    while (nominees.firstChild) {
        nominees.removeChild(nominees.firstChild);
    }

});


const spreadsheetID = "16ZPc11NiIeO2ph_wkMDJMeKjS_evZ_kcxIw51oE_bdQ";

const EndPoint = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;
fetch(EndPoint).then(res => res.json()).then(showStuff);

function showStuff(data) {
    const myArray = data.feed.entry;
    //    console.log(myArray);
    myArray.forEach(showMovies);
}


function showMovies(movieData) {

    //    console.log(movieData);

    if (movieData.gsx$winners.$t == 1) {

        let newArticle = document.createElement("article");
        newArticle.classList.add("eachMovieArticle");
        newArticle.setAttribute("id", `movie${movieData.gsx$id.$t}`);

        // This eventListener opens the modal for each movie
        newArticle.addEventListener("click", function () {

            body.classList.add("modal-open");
            modal.querySelector(".modal-movie-image").src = `images_movies/${movieData.gsx$image.$t}.jpg`;
            modal.querySelector(".modal-movie-name").textContent = movieData.gsx$bestpicturenominations.$t;
            modal.querySelector(".year").textContent = movieData.gsx$year.$t;
            modal.querySelector(".otherNominations").textContent = `Other Nomimations: ${movieData.gsx$othernominations.$t}`;
            modal.querySelector(".studio").textContent = `Studio: ${movieData.gsx$studio.$t}`;
            modal.querySelector(".otherAwards").textContent = `Other Awards: ${movieData.gsx$otherawards.$t}`;
            console.log(movieData);

            // ⇓⇓⇓ Fetching the DB again in order to display the movies that were nomminated but didnt win ⇓⇓⇓

            fetch(EndPoint).then(res => res.json()).then(showAgain);

            function showAgain(moreData) {
                const myArray2 = moreData.feed.entry;
                myArray2.forEach(function (noms) {

                    // Choosing only the movies that have the same year as the winning movie and are not the winner
                    if (noms.gsx$year.$t == movieData.gsx$year.$t && noms.gsx$winners.$t == 0) {
                        const list = document.createElement("li");
                        list.textContent = noms.gsx$bestpicturenominations.$t;
                        modal.querySelector("ul").appendChild(list);
                    }
                });
            }

            modal.classList.remove("hide");
        });

        document.querySelector("main").appendChild(newArticle);

        const template = document.querySelector("template").content;
        const templateCopy = template.cloneNode(true);

        templateCopy.querySelector("h1").textContent = movieData.gsx$bestpicturenominations.$t;
        templateCopy.querySelector(".movie_image").src = `images_movies/${movieData.gsx$image.$t}.jpg`;
        templateCopy.querySelector(".year").textContent = `YEAR: ${movieData.gsx$year.$t}`;

        document.querySelector(`#movie${movieData.gsx$id.$t}`).appendChild(templateCopy);
    }
}
