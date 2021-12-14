var tutorialPageNumber = 1
var selectedDifficulty = ""
var overallGameProgress = 0
const menuClickSound = new Audio("./assets/sounds/sfx/click.wav")
const lastSupriseMusic = new Audio("./assets/sounds/music/lastsuprise.mp3")
const battleStartSound = new Audio("./assets/sounds/sfx/battlestart.wav")
const personaVoiceSound = new Audio("./assets/sounds/sfx/persona.wav")

const allGameContainers = document.querySelector(".gameContainer")
const gameContainerPreSkillSelect = document.querySelector("#gameContainerPreSkillSelect")
const gameContainerLoadingScreen = document.querySelector("#GameContainerLoadingScreen")
const gameContainerSkillSelect = document.querySelector("#gameContainerSkillSelect")

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        processEnterKey()
        console.log("Enter detecte")
    }
})
function processEnterKey() {
    switch (overallGameProgress) {
        case 0 :
            initialTutorialNextPage()
            break;
        case 1 : 
            skillSelect()
            break;
        case 2 :
            openNumberGuess()
            break;
    }
}

function initialTutorialNextPage() {
    const dialogueTitle = document.querySelector("#preGameStartDialogueCard h2")
    const dialogueContent = document.querySelector("#preGameStartDialogueCard p")
    const difficultySelector = document.querySelector(".difficultySelector")
    
    if (tutorialPageNumber != 3) {
        tutorialPageNumber += 1
        menuClickSound.play()
    }
    
    switch(tutorialPageNumber) {
        case 2:
            dialogueContent.innerHTML = "Vous devez deviner des chiffres pour réduire la barre de vie de l'ennemi. Votre barre de vie se situera dans le coin en bas, à droite de du jeu. Cliquez pour continuer."
            console.log(tutorialPageNumber)
            break;
        case 3 :
            dialogueTitle.innerHTML = "Niveau"
            dialogueContent.innerHTML = "Choisissez un niveau"
            difficultySelector.style.display = "inherit"
            console.log(tutorialPageNumber)
            break;   
    }
}

function battleStart(difficulty) {
    console.log("This shit works " + difficulty)
    switch(difficulty) {
        case "Facile" :
            selectedDifficulty = 0
            break;
        case "Moyen" :
            selectedDifficulty = 1
            break;
        case "Difficile" :
            selectedDifficulty = 2
            break;
    }
    console.log("Selected Difficulty: " + selectedDifficulty)
    menuClickSound.play()
    battleStartSound.play()
    lastSupriseMusic.volume = 0.5
    lastSupriseMusic.play()
    lastSupriseMusic.loop = true

    gameContainerLoadingScreen.style.display = "none"
    gameContainerPreSkillSelect.style.display = "inherit"

    overallGameProgress = 1

}

function skillSelect() {
    personaVoiceSound.play()
    gameContainerPreSkillSelect.style.display = "none"
    gameContainerSkillSelect.style.display = "inherit"
    
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }  



const correctNumber = getRandomInt(1, 100)
function validate() { 
    if (document.getElementById("answer").value == correctNumber) {
        alert("ggmjiomj")
    }
}