// GRANDES BANNIERES

const slides = document.querySelectorAll(".hero-slide");
const points = document.querySelectorAll(".point");

const heroSuivant = document.getElementById("hero-suivant");
const heroPrecedent = document.getElementById("hero-precedent");

let slideActuelle = 0;

function afficherSlide(numero) {

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    points.forEach(function(point) {
        point.classList.remove("active");
    });

    slides[numero].classList.add("active");
    points[numero].classList.add("active");
}

heroSuivant.addEventListener("click", function() {
    slideActuelle++;

    if (slideActuelle >= slides.length) {
        slideActuelle = 0;
    }

    afficherSlide(slideActuelle);
});

heroPrecedent.addEventListener("click", function() {
    slideActuelle--;

    if (slideActuelle < 0) {
        slideActuelle = slides.length - 1;
    }

    afficherSlide(slideActuelle);
});


// CARROUSEL DES FILMS

const liste = document.getElementById("liste-films");

const suivant = document.getElementById("suivant");
const precedent = document.getElementById("precedent");

suivant.addEventListener("click", function() {
    liste.scrollBy({
        left: 382,
        behavior: "smooth"
    });
});

precedent.addEventListener("click", function() {
    liste.scrollBy({
        left: -382,
        behavior: "smooth"
    });
});


// DEFILEMENT AVEC LA SOURIS

let sourisAppuyee = false;
let positionDepart = 0;
let defilementDepart = 0;

liste.addEventListener("mousedown", function(e) {
    sourisAppuyee = true;
    positionDepart = e.pageX;
    defilementDepart = liste.scrollLeft;

    liste.classList.add("glissement");
});

window.addEventListener("mouseup", function() {
    sourisAppuyee = false;
    liste.classList.remove("glissement");
});

window.addEventListener("mousemove", function(e) {

    if (sourisAppuyee) {
        e.preventDefault();

        let distance = e.pageX - positionDepart;

        liste.scrollLeft = defilementDepart - distance;
    }
});