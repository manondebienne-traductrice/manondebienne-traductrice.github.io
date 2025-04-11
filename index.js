let firstIntro;
let workRoles;
let typedEmail;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reloadPage').addEventListener('click', function() {
        location.reload();
    });
    // activate typed.js object for home page
    homeTyped();
    const paragraphs = document.querySelectorAll(".jump");

    // set eventlister on all links to have them switch between sections
    const links = document.querySelectorAll('.nav-link');
    const darkFade = document.getElementById("darkBackground");

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            // Get the target section ID from the clicked link
            const targetSectionID = link.getAttribute('data-section');

            // Locate the corresponding section element
            const correspondingSection = document.getElementById(`section-${targetSectionID}`);

            // Check if the corresponding section is already active
            if (correspondingSection && correspondingSection.classList.contains('active')) {
                // Exit the function early if the section is already active
                return;
            }

            event.preventDefault();
            // expose black background and trigger fadein animation
            darkFade.classList.remove("d-none");
            darkFade.classList.add("active");
            const sections = document.querySelectorAll('.section');
            let currentSection;

            // add dark layer
            // remove the active class from whatever element is active
            setTimeout(function () {
                darkFade.classList.add("d-none");
                darkFade.classList.remove("active");
                for (section of sections) {
                    if (section.classList.contains("active")) {
                        currentSection = section.id;
                        section.classList.remove("active");
                        break;
                    }
                }

                // activate the specified section via the attribute
                const targetSectionID = link.getAttribute('data-section');
                const sectionToBeActive = document.getElementById(`section-${targetSectionID}`);
                if (sectionToBeActive) {
                    sectionToBeActive.classList.add('active');
                }
                handleTypedobjects(currentSection);
                switch (currentSection) {
                    // destroy typed.js objects if home or about
                    case 'section-home':
                        workRoles.destroy();
                        workRoles = null;
                        document.getElementById("workRoles").textContent = "";
                        break;
                    case 'section-about':
                        firstIntro.destroy();
                        firstIntro = null;
                        document.getElementById("firstIntro").textContent = "";
                        document.getElementById("secondIntro").textContent = "";
                        break;
                    case 'section-skills':
                        paragraphs.forEach(p => p.classList.remove('jumpy'));
                        break;
                    case 'section-contact':
                        typedEmail.destroy();
                        typedEmail = null;
                        document.getElementById("email").textContent = "";
                        document.getElementById("downloadCV").textContent = "";
                        break;
                    default:
                        break;
                }

                // initiate animations according to page
                switch (targetSectionID) {
                    // destroy typed.js objects if home or about
                    case 'home':
                        setTimeout(homeTyped(), 3000);
                        break;
                    case 'about':
                        aboutTyped();
                        break;
                    case 'skills':
                        setTimeout(function() {
                            paragraphs.forEach((paragraph) => {
                                paragraph.classList.add("jumpy");
                            });
                        }, 2000)
                        break;
                    case 'contact':
                        contactTyped();
                        break;
                    default:
                        break;
                }

            }, 500)

        });
    });

});

function handleTypedobjects() {

}

// function to start the typing on the home page
function homeTyped() {
    workRoles = new Typed("#workRoles", {
        strings: ["Traductrice de Manga"], // More specific
        typeSpeed: 50,
        startDelay: 3000,
        showCursor: true,
    })
}

// function to start the typing on the about page
function aboutTyped() {
    firstIntro = new Typed("#firstIntro", {
        strings: [
            "Bonjour ! Je suis Manon, passionnée par l'univers du manga et spécialisée dans sa traduction vers le français. ^500 J'aime capturer l'essence des histoires et les rendre accessibles à un public francophone, en respectant le style et l'intention de l'auteur. ^500 Au-delà de la simple conversion des mots, mon travail consiste à adapter les nuances culturelles et linguistiques pour offrir une expérience de lecture immersive. ^500",
            "Mon objectif est de fournir des traductions de haute qualité qui préservent l'authenticité de l'œuvre originale tout en assurant une lecture fluide et agréable. ^500 Je suis rigoureuse, attentive aux détails et m'engage à respecter les délais de livraison. ^500 Chaque projet est pour moi une nouvelle aventure, une opportunité de partager ma passion pour le manga et la langue française.",
        ],
        typeSpeed: 10,
        backSpeed: 2,
        backDelay: 1000,
        startDelay: 2000,
        showCursor: false,
        onComplete: function() {
            new Typed("#secondIntro", {
                strings: [
                    "Si vous recherchez une traductrice de manga professionnelle et passionnée, n'hésitez pas à me contacter. ^500",
                    "Ensemble, donnons vie à vos histoires en français !",
                ],
                typeSpeed: 5,
                backSpeed: 2,
                backDelay: 500,
                startDelay: 500,
                loop: false,
                showCursor: false,
            })
        },
    })
}

// function to start the typing on the about page
function contactTyped() {
    typedEmail = new Typed("#email", {
        strings: [
            "manondebienne@email.com", // Use a real email!
        ],
        typeSpeed: 30,
        startDelay: 1000,
        showCursor: false,
        onComplete: function() {
            new Typed("#downloadCV", {
                strings: [
                    "Téléchargez mon CV.",
                ],
                typeSpeed: 20,
                startDelay: 500,
                loop: false,
                showCursor: false,
            })
        },
    })
}