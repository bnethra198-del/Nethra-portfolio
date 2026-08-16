"use strict";


/* =========================================
   CURRENT YEAR
========================================= */

const yearElements =
    document.querySelectorAll(".current-year");

const currentYear =
    new Date().getFullYear();

yearElements.forEach(function (element) {
    element.textContent = currentYear;
});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navMenu =
    document.querySelector("#primary-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        navMenu.classList.toggle(
            "is-open",
            !isOpen
        );

    });


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navMenu.classList.remove(
                "is-open"
            );

        });

    });

}


/* =========================================
   ACCESSIBLE CONTACT FORM
========================================= */

const contactForm =
    document.querySelector("#contact-form");


if (contactForm) {

    const nameInput =
        document.querySelector("#name");

    const emailInput =
        document.querySelector("#email");

    const messageInput =
        document.querySelector("#message");


    const nameError =
        document.querySelector("#name-error");

    const emailError =
        document.querySelector("#email-error");

    const messageError =
        document.querySelector("#message-error");


    function clearErrors() {

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        nameInput.removeAttribute(
            "aria-invalid"
        );

        emailInput.removeAttribute(
            "aria-invalid"
        );

        messageInput.removeAttribute(
            "aria-invalid"
        );
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            clearErrors();

            let isValid = true;


            /* NAME */

            if (
                nameInput.value.trim() === ""
            ) {

                nameError.textContent =
                    "Please enter your name.";

                nameInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                isValid = false;
            }


            /* EMAIL */

            if (
                emailInput.value.trim() === "" ||
                !emailInput.validity.valid
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                emailInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                isValid = false;
            }


            /* MESSAGE */

            if (
                messageInput.value.trim() === ""
            ) {

                messageError.textContent =
                    "Please enter your message.";

                messageInput.setAttribute(
                    "aria-invalid",
                    "true"
                );

                isValid = false;
            }


            /*
             * IMPORTANT:
             *
             * If the form is invalid, stop submission.
             *
             * If the form is valid, DO NOT call
             * event.preventDefault().
             *
             * This allows Formspree to receive the
             * form submission.
             */

            if (!isValid) {

                event.preventDefault();

                const firstInvalid =
                    contactForm.querySelector(
                        '[aria-invalid="true"]'
                    );

                if (firstInvalid) {
                    firstInvalid.focus();
                }

            }

        }
    );

}