require('./hamburger');
require('./form')

MicroModal.init({
    awaitCloseAnimation: true
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
                console.log("ServiceWorker registration successful", registration);
            })
            .catch(err => {
                console.log("ServiceWorker registration failed: ", err);
            });
    });
}