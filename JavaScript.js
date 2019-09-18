window.onload = function () {
    document.getElementById('search').value = '';  //clear the input field on reload
}


const body = document.querySelector("body");

//close the modal when clicked
const modalContent = document.querySelector(".modal-content");
const modalText = document.querySelector(".modal-text");
const modalImage = document.querySelector(".modal-image-container");
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

//https://spreadsheets.google.com/feeds/list/16ZPc11NiIeO2ph_wkMDJMeKjS_evZ_kcxIw51oE_bdQ/od6/public/values?alt=json`
const EndPoint = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;
fetch(EndPoint).then(res => res.json()).then(showStuff);

function showStuff(data) {

    const myArray = data.feed.entry;

    console.log(myArray);
    const select = document.querySelector("select");
    const main = document.querySelector("main");

    myArray.sort(compareYearFromNew);
    myArray.forEach(showMovies);

    select.addEventListener("change", function () {
        if (select.value == "Newest") {
            myArray.sort(compareYearFromNew);
            main.innerHTML = "";
            myArray.forEach(showMovies);
        };

        if (select.value == "Oldest") {
            myArray.sort(compareYearFromOld);
            main.innerHTML = "";
            myArray.forEach(showMovies);
        };

        if (select.value == "A-Z") {
            myArray.sort(compareAbc);
            main.innerHTML = "";
            myArray.forEach(showMovies);
        };

        if (select.value == "Z-A") {
            myArray.sort(compareCba);
            main.innerHTML = "";
            myArray.forEach(showMovies);
        };
    })
}

function compareYearFromNew(a, b) {
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

function compareCba(a, b) {
    if (a.gsx$bestpicturenominations.$t < b.gsx$bestpicturenominations.$t) {
        return 1;
    }
    if (a.gsx$bestpicturenominations.$t > b.gsx$bestpicturenominations.$t) {
        return -1;
    }
    return 0;
}

function showMovies(movieData) {

    //    console.log(movieData);
    if (movieData.gsx$winners.$t == 1) {

        document.querySelector("main").appendChild(modal);

        let newArticle = document.createElement("article");
        newArticle.classList.add("eachMovieArticle");
        newArticle.setAttribute("id", `movie${movieData.gsx$id.$t}`);

        // This eventListener opens the modal for each movie
        newArticle.addEventListener("click", function () {

            body.classList.add("modal-open");
            modal.querySelector(".modal-movie-image").src = `images_movies/${movieData.gsx$image.$t}.jpg`;
            modal.querySelector(".modal-movie-name").textContent = movieData.gsx$bestpicturenominations.$t;
            modal.querySelector(".modal-year").textContent = movieData.gsx$year.$t;
            modal.querySelector(".otherNominations").textContent = `Other Nomimations: ${movieData.gsx$othernominations.$t}`;
            modal.querySelector(".studio").textContent = `Studio/Producer: ${movieData.gsx$studio.$t}`;
            modal.querySelector(".otherAwards").textContent = `Other Awards: ${movieData.gsx$otherawards.$t}`;
            modal.querySelector(".Plot").textContent = movieData.gsx$plot.$t;

            // ⇓⇓⇓ Fetching the DB again in order to display the movies that were nomminated but didnt win ⇓⇓⇓

            fetch(EndPoint).then(res => res.json()).then(showAgain);

            function showAgain(moreData) {
                const myArray2 = moreData.feed.entry;
                myArray2.forEach(function (noms) {

                    // Choosing only the movies that have the same year as the winning movie and are not the winner, by comparing all of te movies in the database
                    if (noms.gsx$year.$t == movieData.gsx$year.$t && noms.gsx$winners.$t == 0) {
                        const list = document.createElement("li");
                        list.textContent = noms.gsx$bestpicturenominations.$t;
                        modal.querySelector("ul").appendChild(list);
                    }
                });
            }

            modal.classList.remove("hide");
            modalContent.classList.add("animationAppear");
            modalText.classList.add("animationOpacityRise");
            modalImage.classList.add("animationOpacityRise");

        });

        document.querySelector("main").appendChild(newArticle);

        const template = document.querySelector("template").content;
        const templateCopy = template.cloneNode(true);

        templateCopy.querySelector("h1").textContent = movieData.gsx$bestpicturenominations.$t;
        templateCopy.querySelector(".movie_image").style.backgroundImage = `url("images_movies/${movieData.gsx$image.$t}.jpg")`;
        templateCopy.querySelector(".year").textContent = movieData.gsx$year.$t;

        document.querySelector(`#movie${movieData.gsx$id.$t}`).appendChild(templateCopy);
    }
}

const UP = document.querySelector(".jump");
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        UP.style.display = "block";
    } else {
        UP.style.display = "none";
    }
}

var input = document.getElementById('search');
input.addEventListener("keyup", Filter);

console.log(input.value);
if (input.value !=""){
    Filter();
}


function Filter() {
    // Declare variables
    var filter, main, article, h1, i, txtValue;
    filter = input.value.toUpperCase();
    main = document.querySelector("main");
    article = main.getElementsByClassName("eachMovieArticle");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < article.length; i++) {
        a = article[i].getElementsByTagName("h1")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            article[i].style.display = "flex";
        } else {
            article[i].style.display = "none";
        }
    }
}
