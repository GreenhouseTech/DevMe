if(matchMedia('(max-width: 479px)').matches) {
    let hamburger = document.querySelector('.js-hamburger');
    let navWrapper = document.querySelector('.js-nav-wrapper');

    hamburger.setAttribute('aria-hidden', false);
    navWrapper.setAttribute('aria-hidden', true);
    
    hamburger.addEventListener('click', () => {
        navWrapper.classList.toggle('is-nav-open');
        hamburger.setAttribute('aria-expanded', hamburger.getAttribute('aria-expanded') === 'true' ? false : true );
        navWrapper.setAttribute('aria-hidden', navWrapper.getAttribute('aria-hidden') === 'true' ? false : true);
        
        
        if(navWrapper.classList.contains('is-nav-open')) {
            navWrapper.childNodes[0].focus();
        }
    })
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").then(registration => {
          console.log("ServiceWorker registration successful", registration);
        }).catch(err => {
          console.log("ServiceWorker registration failed: ", err);
        });
    });
  }