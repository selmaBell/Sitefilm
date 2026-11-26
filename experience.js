// Recuperer les elements HTML
const formulaire = document.getElementById("form-experience");
const liste = document.getElementById("liste-experiences");
const message = document.getElementById("message-experience");

// Recuperer les anciens avis
let avis = JSON.parse(localStorage.getItem("avisCinema") || "[]");

// Afficher les avis
function afficherAvis() {

    liste.innerHTML = "";

    if (avis.length === 0) {
        liste.textContent = "Tu n'as pas encore donné ton avis.";
        return;
    }

    avis.forEach(function(item, index) {

        const carte = document.createElement("div");
        carte.className = "carte-avis";

        const titre = document.createElement("h3");
        titre.textContent = item.film;

        const ressenti = document.createElement("p");
        ressenti.textContent = item.ressenti;

        const commentaire = document.createElement("p");
        commentaire.textContent = item.commentaire;

        const bouton = document.createElement("button");
        bouton.textContent = "Supprimer";

        // Supprimer un avis
        bouton.addEventListener("click", function() {

            avis.splice(index, 1);

            localStorage.setItem("avisCinema", JSON.stringify(avis));

            afficherAvis();
        });

        carte.appendChild(titre);
        carte.appendChild(ressenti);
        carte.appendChild(commentaire);
        carte.appendChild(bouton);

        liste.appendChild(carte);
    });
}

// Enregistrer un avis
formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    const film = document.getElementById("film-choisi").value;
    const ressenti = document.getElementById("ressenti").value;
    const commentaire = document.getElementById("avis-film").value.trim();

    const nouvelAvis = {
        film: film,
        ressenti: ressenti,
        commentaire: commentaire
    };

    avis.push(nouvelAvis);

    localStorage.setItem("avisCinema", JSON.stringify(avis));

    afficherAvis();

    formulaire.reset();

    message.textContent = "Ton avis a bien été enregistré !";
});

// Affichage au chargement
afficherAvis();
