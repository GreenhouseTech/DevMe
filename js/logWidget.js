(async function() {
    let res = await fetch('../assets/changelog.json');
    console.log(await res.json())
})();