document.querySelectorAll('form input').forEach(i => {
    i.addEventListener('blur', () => i.classList.add('visited'));
})