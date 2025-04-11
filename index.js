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
        strings: ["Traductrice"],
        typeSpeed: 50,
        startDelay: 3000,
        showCursor: true,
    })
}
 
// function to start the typing on the about page
function aboutTyped() {
    firstIntro = new Typed("#firstIntro", {
        strings: [
            "Salut! Moi c'est Manon, la traductrice des mangas les plus rigolos et les plus kawaii! ^500 J'adore lire des mangas et changer les mots en français, même si des fois je me trompe (mais ça fait rien, c'est rigolo, non?). ^500 J'aime aussi boire du thé vert et manger des ramen en même temps que je traduis - faut bien rester concentrée, non? ^500",
            "Mon rêve c'est de devenir une super-héroïne de traduction, un peu comme dans les mangas, avec un pouvoir magique : changer tous les mots d'un coup!^500 Mais attention, parfois je traduis trop vite et des fois ça fait des phrases bizarres comme « J'ai mangé un chat ce matin » au lieu de « J'ai mangé un gâteau »… oops! C'est ça qui rend le travail encore plus amusant, n'est-ce pas?",
        ],
        typeSpeed: 10,
        backSpeed: 2,
        backDelay: 1000,
        startDelay: 2000,
        showCursor: false,
        onComplete: function() {
            new Typed("#secondIntro", {
                strings: [
                    "Si tu veux des traductions avec des petites erreurs rigolotes, je suis là pour toi.^500",
                    "Les mangas n'ont jamais été aussi drôles, promis!"
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
            "manondebienne@gmail.com",
        ],
        typeSpeed: 30,
        startDelay: 1000,
        showCursor: false,
        onComplete: function() {
            new Typed("#downloadCV", {
                strings: [
                    "N'oublie pas de télécharger mon CV !",
                ],
                typeSpeed: 20,
                startDelay: 500,
                loop: false,
                showCursor: false,
            })
        },
    })
}
