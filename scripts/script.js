let listOptions = document.querySelector('.optionSource')
let index = 0
let score = 0
let zoneProposition = document.querySelector('div.zoneProposition')
let btnValiderMot = document.getElementById("btnValiderMot")
let selectedOption
let listProposition = listMots
let formPartage = document.querySelector(".popup form")

zoneProposition.textContent = listProposition[index]

listOptions.addEventListener('change', (e) => {
    selectedOption = e.target.value
    selectedOption === "1" ? listProposition = listMots : listProposition = listPhrases
    zoneProposition.textContent = listProposition[index]
})

function afficherResultat(resultat, nombreMots) {
    let zoneScore = document.querySelector('div.zoneScore span')
    zoneScore.textContent = `${resultat}/${nombreMots}`
}

function afficherProposition(word) {
    zoneProposition.textContent = word
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    console.log(mailto);

    location.href = mailto
}

formPartage.onsubmit = (e) => {
    try {
        e.preventDefault()
        let nom = document.querySelector('#nom').value
        let email = document.querySelector('#email').value
        let scoreMail = `${score}/${index}`

        const nomOk = validerNom(nom)
        const mailOK = validerEmail(email)

        if (nomOk && mailOK) {
            afficherEmail(nom, email, scoreMail)
        } else {
            console.log("Oups, un problème est survenue")
        }
    } catch (error) {
        console.log("Une erreur est survenue : " + error.message)
        afficherMessageErreur(error.message)
    }
}

function afficherMessageErreur(messageErr) {
    let messageErreur = document.querySelector(".messageErreur")
    messageErreur.textContent = messageErr
}

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`Le champ doit contenir au moins deux lettres`)
    }
    if (nom === "") {
        throw new Error(`Le champ ne doit pas être vide`)
    }

    return true
}

function validerEmail(email) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
    let resultat = regex.test(email)

    if (!resultat) {
        throw new Error("Le format du mail n'est pas correct")
    }
    return resultat
}

function lancerJeu() {
    initAddEventListenerPopup()

    btnValiderMot.addEventListener('click', () => {
        let inputEcriture = document.getElementById("inputEcriture")

        if (inputEcriture.value === listProposition[index]) {
            score++
        }

        index++

        if (listProposition[index] === undefined) {
            afficherProposition("Le jeu est fini !")
            btnValiderMot.setAttribute("disabled", true)
        } else {
            afficherProposition(listProposition[index])
        }

        inputEcriture.value = ""
        afficherResultat(score, index)
    })
}
