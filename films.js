
// RECUPERER LES ELEMENTS HTML

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const filmList = document.getElementById("film-list");

const message = document.getElementById("message-films");
const cleAPI = document.getElementById("cle-api");
const boutonConnexion = document.getElementById("bouton-connexion");

let jeton = "";
let rechercheEnCours = 0;


// RECUPERER LES FILMS DE TMDB

async function recupererFilms(recherche = "") {

    if (jeton === "") {
        message.textContent = "Connectez d'abord TMDB.";
        return false;
    }

    const numero = ++rechercheEnCours;

    let adresse;

    if (recherche === "") {

        adresse = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";

    } else {

        adresse = "https://api.themoviedb.org/3/search/movie?language=fr-FR&query="
            + encodeURIComponent(recherche);
    }

    message.textContent = "Chargement des films...";

    let films = [];

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

        if (numero !== rechercheEnCours) {
            return false;
        }

        afficherFilms(films);

        message.textContent = films.length + " films affichés.";

        return true;

    } catch (erreur) {

        if (numero === rechercheEnCours) {
            message.textContent = "Impossible de charger les films.";
        }

        console.error(erreur);
        return false;
    }
}


// AFFICHER LES FILMS

function afficherFilms(films) {

    filmList.innerHTML = "";

    films.forEach(function(film) {

        if (!film.poster_path) {
            return;
        }

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
            film.vote_average.toFixed(1) + "/10";

        // AJOUT DES ELEMENTS
        infos.appendChild(titre);
        infos.appendChild(annee);
        infos.appendChild(note);

        filmDiv.appendChild(image);
        filmDiv.appendChild(infos);

        filmList.appendChild(filmDiv);
    });
}


// CONNEXION TMDB

boutonConnexion.addEventListener("click", async function() {

    jeton = cleAPI.value.trim();

    if (jeton === "") {
        message.textContent = "Saisissez votre jeton TMDB.";
        return;
    }

    boutonConnexion.disabled = true;

    const resultat = await recupererFilms();

    if (resultat) {
        document.getElementById("connexion-films").hidden = true;
        cleAPI.value = "";
    }

    boutonConnexion.disabled = false;
});


// RECHERCHER UN FILM

function rechercherFilms() {

    const recherche = searchBar.value.trim();

    recupererFilms(recherche);
}


// CLIC SUR RECHERCHER

searchButton.addEventListener("click", rechercherFilms);


// RECHERCHE AVEC LA TOUCHE ENTREE

searchBar.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        rechercherFilms();
    }
});
