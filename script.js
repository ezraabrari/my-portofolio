document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');
    const navBar = document.getElementById('navbar');

    // --- Navbar Toggle for Mobile ---
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Close nav on link click for mobile
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navItems.forEach(item => item.style.animation = '');
            }
        });
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.dataset.words);
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150; // ms per character
        const deletingSpeed = 100; // ms per character
        const delayBetweenWords = 1500; // ms

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex--);
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex++);
            }

            let typeSpeed = typingSpeed;
            if (isDeleting) {
                typeSpeed /= 2; // Delete faster
            }

            if (!isDeleting && charIndex === currentWord.length + 1) {
                typeSpeed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = typingSpeed;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Active Navbar Link on Scroll & Header Blur ---
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navBar.offsetHeight - 20; // Adjust for header height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });

        // Add blur to header on scroll
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });
});