let hamburger = document.querySelector(".js-hamburger");
let navWrapper = document.querySelector(".js-nav-wrapper");

if (matchMedia("(max-width: 479px)").matches) {
    hamburger.setAttribute("aria-hidden", false);
    navWrapper.setAttribute("aria-hidden", true);
}

hamburger.addEventListener("click", () => {
    navWrapper.classList.toggle("is-nav-open");
    hamburger.setAttribute(
        "aria-expanded",
        hamburger.getAttribute("aria-expanded") === "true" ? false : true
    );
    navWrapper.setAttribute(
        "aria-hidden",
        navWrapper.getAttribute("aria-hidden") === "true" ? false : true
    );

    if (navWrapper.classList.contains("is-nav-open")) {
        navWrapper.childNodes[0].focus();
    }
});