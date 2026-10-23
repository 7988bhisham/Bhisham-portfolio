const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            siteNav.classList.remove("is-open");
        }
    });
}

document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector(".contact-form");

if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);
        const recipient = contactForm.dataset.email;

        if (!recipient) {
            throw new Error("Set a recipient email in the contact form's data-email attribute.");
        }

        const subject = `Portfolio inquiry from ${formData.get("name")}`;
        const body = [
            `Name: ${formData.get("name")}`,
            `Email: ${formData.get("email")}`,
            "",
            String(formData.get("message"))
        ].join("\n");

        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
