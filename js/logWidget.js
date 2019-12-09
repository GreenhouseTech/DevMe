async function log() {
    console.log(await fetch('../assets/changelog.json'))
}

log();