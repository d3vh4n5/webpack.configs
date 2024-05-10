import './css/styles.css'
import './components/header-component'

const $h1 = document.getElementsByTagName('h1')
console.log($h1)

setTimeout(() => {
    $h1[0].innerHTML = "HAHAHA SOY EL MAIN"
    console.log("SOY EL MAUN")
}, 3000);