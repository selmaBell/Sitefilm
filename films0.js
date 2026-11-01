// RECUPERER LES ELEMENTS HTML //

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const filmList = document.getElementById("film-list");
const message = document.getElementById("message-films");

// JETON TMDB 
const jeton = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGU3MDM5ZTdiMzQ4MTdjMzdlYTU4MDE4YmZjNWNmZCIsIm5iZiI6MTc5MzQ1MjcyMS41OTcsInN1YiI6IjZhZTVlYWIxZTBlMjI4YzQ3OWM4Yjc4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWjIgN8z7LcszJMNvnr947SVEnUKG2-9gShROe_TbDw";


// RECUPERER LES FILMS DE TMDB

async function recupererFilms(recherche = "") {

    let films = [];
    let adresse;

    if (recherche === "") {
        adresse = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";
    } else {
        adresse = "https://api.themoviedb.org/3/search/movie?language=fr-FR&query="
            + encodeURIComponent(recherche);
    }

    message.textContent = "Chargement des films...";

    try {

        for (let page = 1; page <= 6; page++) {

            const reponse = await fetch(adresse + "&page=" + page, {
                headers: {
                    Authorization: "Bearer " + jeton
                }
            });

            if (!reponse.ok) {
                throw new Error("Erreur TMDB : " + reponse.status);
            }

            const donnees = await reponse.json();

            films = films.concat(donnees.results);

            if (page >= donnees.total_pages) {
                break;
            }
        }

        afficherFilms(films);

    } catch (erreur) {

        message.textContent = "Impossible de charger les films.";
        console.error(erreur);
    }
}


// AFFICHER LES FILMS

function afficherFilms(films) {

    filmList.innerHTML = "";

    const filmsAvecAffiche = films.filter(function(film) {
        return film.poster_path;
    });

    message.textContent =
        filmsAvecAffiche.length + " films affichés.";

    filmsAvecAffiche.forEach(function(film) {

        const filmDiv = document.createElement("div");
        filmDiv.className = "film-poster";

        // IMAGE
        const image = document.createElement("img");

        image.src = "https://image.tmdb.org/t/p/w500" + film.poster_path;
        image.alt = "Affiche de " + film.title;
        image.loading = "lazy";

        // INFORMATIONS
        const infos = document.createElement("div");
        infos.className = "film-item";

        const titre = document.createElement("h3");
        titre.textContent = film.title;

        const annee = document.createElement("p");
        annee.textContent = "Année : " +
            (film.release_date
                ? film.release_date.slice(0, 4)
                : "Inconnue");

        const note = document.createElement("p");
        note.className = "note";

        note.textContent = "Note TMDB : " +
            (typeof film.vote_average === "number"
                ? film.vote_average.toFixed(1) + "/10"
                : "Non renseignée");

        // AJOUT DES ELEMENTS
        infos.appendChild(titre);
        infos.appendChild(annee);
        infos.appendChild(note);

        filmDiv.appendChild(image);
        filmDiv.appendChild(infos);

        filmList.appendChild(filmDiv);
    });
}


// RECHERCHER UN FILM

function rechercherFilms() {

    const recherche = searchBar.value.trim();

    recupererFilms(recherche);
}


// CLIC SUR RECHERCHER

searchButton.addEventListener("click", rechercherFilms);


// RECHERCHE AVEC ENTREE

searchBar.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        rechercherFilms();
    }
});


// CHARGER LES FILMS AUTOMATIQUEMENT

recupererFilms();
