// Interacciones de la página web
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const learnMoreBtn = document.getElementById("learnMoreBtn");
    const startBtn = document.getElementById("startBtn");
    const toast = document.getElementById("toast");
    const currentYear = document.getElementById("currentYear");
    const navLinks = document.querySelectorAll(".nav-link");
    let toastTimer;

    // Mostrar el año actual automáticamente.
    currentYear.textContent = new Date().getFullYear();

    // Abrir y cerrar el menú en pantallas pequeñas.
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar el menú móvil al seleccionar una sección.
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    // Mostrar un aviso accesible y temporal.
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    learnMoreBtn.addEventListener("click", () => {
        document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
        showToast("¡Conoce HTML, CSS y JavaScript en la sección de tecnologías!");
    });

    startBtn.addEventListener("click", () => {
        showToast("¡Excelente! Elige una tecnología y comienza a crear tu proyecto.");
        document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
    });

    // Cada tarjeta informa qué tecnología se ha seleccionado.
    document.querySelectorAll("[data-tech]").forEach((link) => {
        link.addEventListener("click", () => {
            const technology = link.dataset.tech;
            showToast(`Has seleccionado ${technology}. ¡Es un buen punto de partida!`);
        });
    });

    // Actualizar el enlace activo según la sección visible.
    const sections = document.querySelectorAll("#inicio, #servicios, #contacto");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { rootMargin: "-30% 0px -55% 0px" });

        sections.forEach((section) => observer.observe(section));
    }
});
