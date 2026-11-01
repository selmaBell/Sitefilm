/* CARROUSEL DE LA PAGE DECOUVRIR */

const slides = document.querySelectorAll(".hero-slide");
const points = document.querySelectorAll(".hero-points .point");

const precedent = document.getElementById("hero-precedent");
const suivant = document.getElementById("hero-suivant");

let position = 0;

// AFFICHER UNE BANNIERE

function afficherSlide(numero) {

    slides[position].classList.remove("active");
    points[position].classList.remove("active");

    position = numero;

    slides[position].classList.add("active");
    points[position].classList.add("active");
}

// FLECHE DROITE

suivant.addEventListener("click", function() {

    let numero = position + 1;

    if (numero >= slides.length) {
        numero = 0;
    }

    afficherSlide(numero);
});

// FLECHE GAUCHE

precedent.addEventListener("click", function() {

    let numero = position - 1;

    if (numero < 0) {
        numero = slides.length - 1;
    }

    afficherSlide(numero);
});

// PETITS POINTS

points.forEach(function(point, index) {

    point.addEventListener("click", function() {
        afficherSlide(index);
    });

});

/* NAVIGATION ENTRE LES EPOQUES */

const epoques = document.querySelectorAll(".epoque");

epoques.forEach(function(epoque) {

    epoque.addEventListener("click", function() {

    // Fermer les autres images
        epoques.forEach(function(element) {
            element.classList.remove("active");
            element.setAttribute("aria-expanded", "false");
        });

// Agrandir l'image choisie
        epoque.classList.add("active");
        epoque.setAttribute("aria-expanded", "true");

    });

});
