// Custom Cursor Movement
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    }
});

// Mobile Navigation Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };
}

// Scrollspy Active Nav Links & Sticky Header
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const target = document.querySelector(`header nav a[href*="${id}"]`);
                if (target) target.classList.add('active');
            });
        }
    });

    if (menuIcon && navbar) {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    }
};

// Typewriter Effect
const typeWriterElement = document.querySelector('.typewriter');
const textArray = [
    "Data Analytics",
    "LangChain & RAG Systems",
    "Python & SQL Pipelines",
    "Generative AI Agents",
    "Power BI & Dashboards"
];

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (!typeWriterElement) return;

    if (charIndex < textArray[textArrayIndex].length) {
        typeWriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 2200);
    }
}

function erase() {
    if (!typeWriterElement) return;

    if (charIndex > 0) {
        typeWriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 40);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 600);
    }
}

// Scroll Reveal via Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length && typeWriterElement) setTimeout(type, 600);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(
        '.home-content, .heading, .img-box, .about-content, .skills-box, .project-box, .timeline-item, .achievement-category, .contact-form, .role-card'
    );
    hiddenElements.forEach((el) => observer.observe(el));
});
