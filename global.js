let tutorialPageNumber = 1
let selectedDifficulty = ""
let overallGameProgress = 0
let healthpoints = 84
let correctRandomNumber = 0
let randomNumberRange = []
let ennemyHealth = 3

const menuClickSound = new Audio("./assets/sounds/sfx/click.wav")
const lastSupriseMusic = new Audio("./assets/sounds/music/lastsuprise.mp3")
const battleStartSound = new Audio("./assets/sounds/sfx/battlestart.wav")
const personaVoiceSound = new Audio("./assets/sounds/sfx/persona.wav")
const menuCancelSound = new Audio("./assets/sounds/sfx/menucancel.wav")
const damageTakenSound = new Audio("./assets/sounds/sfx/damagetaken.wav")
const hitSound = new Audio("./assets/sounds/sfx/hit.wav")
const criticalSound = new Audio("./assets/sounds/sfx/critical.mp3")
const menuSelectSound = new Audio("./assets/sounds/sfx/menuselect.wav")
const victoryMusic = new Audio("./assets/sounds/music/victory.flac")
const velvetRoomMusic = new Audio("./assets/sounds/music/velvetroom.flac")
const allGameContainers = document.querySelector(".gameContainer")

const gameContainerPreSkillSelect = document.querySelector("#gameContainerPreSkillSelect")
const gameContainerLoadingScreen = document.querySelector("#GameContainerLoadingScreen")
const gameContainerSkillSelect = document.querySelector("#gameContainerSkillSelect")
const gameContainerNumberGuess = document.querySelector("#gameContainerGuessNumber")
const gameContainerVictoryScreen = document.querySelector("#gameContainerVictoryScreen")
const gameContainerGameOverScreen = document.querySelector("#gameContainerGameOverScreen")

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        processEnterKey()
        //console.log("Enter detected")
    } else if (event.key === "Escape") {
        processEscKey()
        //console.log("Escape Detected")
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
        case 5 :
            location.reload()
            break;
    }
}

function processEscKey() {
    switch (overallGameProgress) {
        case 2 :
            gameContainerSkillSelect.style.display = "none"
            gameContainerPreSkillSelect.style.display = "inherit"
            menuCancelSound.play()
            overallGameProgress = 1
            break;
        case 3 :
            gameContainerNumberGuess.style.display = "none"
            gameContainerSkillSelect.style.display = "inherit"
            menuCancelSound.play()
            randomNumberRange = []
            overallGameProgress = 2
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
            dialogueContent.innerHTML = " Votre barre de vie se situera dans le coin en bas. Noter que chaque fois tu performes une attaque, le nombre change. Selon le niveau, il y a une marge d'erreur. Une attaque est critique lorsqu'on trouve le nombre exact."
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
    const healthpointsDiv = document.querySelector("#hpCountPreSkillSelect")
    console.log("This shit works " + difficulty)
    switch(difficulty) {
        case "Facile" :
            selectedDifficulty = 2
            break;
        case "Moyen" :
            selectedDifficulty = 1
            break;
        case "Difficile" :
            selectedDifficulty = 0
            break;
    }
    console.log("Selected Difficulty: " + selectedDifficulty)
    switch (selectedDifficulty) {
        case 2 :
            healthpoints = 84
            break;
        case 1 :
            healthpoints = 64
            break;
        case 0 :
            healthpoints = 44
            break;
    }

    healthpointsDiv.innerHTML = String(healthpoints)

    menuClickSound.play()
    battleStartSound.play()
    lastSupriseMusic.volume = 0.75
    lastSupriseMusic.play()
    lastSupriseMusic.loop = true

    gameContainerLoadingScreen.style.display = "none"
    gameContainerPreSkillSelect.style.display = "inherit"

    overallGameProgress = 1

}

function skillSelect() {
    const healthpointsDiv = document.querySelector("#hpCountSkillSelect")
    healthpointsDiv.innerHTML = String(healthpoints)
    menuSelectSound.play()
    personaVoiceSound.volume = 0.75
    personaVoiceSound.play()
    gameContainerPreSkillSelect.style.display = "none"
    gameContainerSkillSelect.style.display = "inherit"
    overallGameProgress = 2
}


function openNumberGuess() {
    gameContainerSkillSelect.style.display = "none"
    gameContainerNumberGuess.style.display = "inherit"
    overallGameProgress = 3
    menuSelectSound.play()
    correctRandomNumber = getRandomInt(1, 100)
    randomNumberRange.push(correctRandomNumber-(5*(selectedDifficulty+1)))
    if (randomNumberRange[0] <= 0) {
        randomNumberRange[0] = 1
    }
    randomNumberRange.push(correctRandomNumber+(5*(selectedDifficulty+1))) 
    if (randomNumberRange[1] >= 100) {
        randomNumberRange[1] = 100
    } 

    console.log("Correct Answer: " + correctRandomNumber)
    console.log("Random Number Range: " + randomNumberRange)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  

let attacktype = 0
function validate() { 
    let answer = document.querySelector("#guessedNumberInput").value
    menuSelectSound.play()

    if (answer == correctRandomNumber) {
        attacktype = 2
        console.log("Critical Hit!, Number guessed exactly.")
    } else if (answer >= randomNumberRange[0] && answer <= randomNumberRange[1]) {
        attacktype = 1
        console.log("Hit!, Number guessed within range")
    } else {
        attacktype = 0
        console.log("Block!")
        healthpoints = healthpoints-10
        if (healthpoints < 0) {
            healthpoints = 0
        }
    }
    returnToBattle()
}

function returnToBattle() {
    overallGameProgress = 4
    gameContainerNumberGuess.style.display = "none"
    gameContainerPreSkillSelect.style.display = "inherit"
    const healthpointsDiv1 = document.querySelector("#hpCountPreSkillSelect")
    const healthpointsDiv2 = document.querySelector("#hpCountSkillSelect")
    randomNumberRange = []
    switch (attacktype) {
        case 0 :
            damageTakenSound.play()
            healthpointsDiv1.innerHTML = String(healthpoints)
            healthpointsDiv2.innerHTML = String(healthpoints)
            healthpointsDiv1.style.animationName = "shake"
            healthpointsDiv1.style.animationDuration = "1s"
            healthpointsDiv1.style.animationIterationCount = "1"
            setTimeout(function() {
                healthpointsDiv1.style.removeProperty("animation-name")
                healthpointsDiv1.style.removeProperty("animation-duration")
                healthpointsDiv1.style.removeProperty("animation-iteration-count")
            }, 1000)
            const hitMarkBlock = document.querySelector(".hitMarkBlock img")
            hitMarkBlock.style.display = "inherit"
            hitMarkBlock.style.animationName = "shake"
            hitMarkBlock.style.animationDuration = "1s"
            hitMarkBlock.style.animationIterationCount = "1"
            setTimeout(function() {
                hitMarkBlock.style.display = "none"
                hitMarkBlock.style.removeProperty("animation-name")
                hitMarkBlock.style.removeProperty("animation-duration")
                hitMarkBlock.style.removeProperty("animation-iteration-count")  
            }, 1500);
            if (healthpoints == 0) {
                overallGameProgress = 5
                gameOverSequence()
            } else {
                overallGameProgress = 1
            }
            break;
        case 1 : 
            hitSound.play()
            ennemyHealth = ennemyHealth - 1
            switch (ennemyHealth) {
                case 2 :
                    gameContainerPreSkillSelect.style.backgroundImage = "url(./assets/battle-screen-2-3-health.png)"
                    break;
                case 1 :
                    gameContainerPreSkillSelect.style.backgroundImage = "url(./assets/battle-screen-1-3-health.png)"
                    break;
                case 0 :
                    gameContainerPreSkillSelect.style.backgroundImage = "url(./assets/battle-screen-no-health.png)"
                    break;
            }
            if (ennemyHealth == 0) {
                overallGameProgress = 5
                victorySequence()
            } else {
                overallGameProgress = 1
            }
            break;
        case 2 :
            criticalSound.play()
            document.querySelector(".hitMarkCriticalCutIn img").style.display = "inherit";
            setTimeout(function() {
                document.querySelector(".hitMarkCriticalCutIn img").style.display = "none"
                hitSound.play()
                document.querySelector(".hitMarkCritical img").style.display = "inherit";
                setTimeout(function() {
                    document.querySelector(".hitMarkCritical img").style.display = "none";
                }, 1500)
                gameContainerPreSkillSelect.style.backgroundImage = "url(./assets/battle-screen-no-health.png)"
                ennemyHealth = 0
                overallGameProgress = 5
                
                victorySequence()
            }, 1200);
            
            
    }
}

function victorySequence() {
    lastSupriseMusic.pause()
    lastSupriseMusic.currentTime = 0
    setTimeout(function(){
        gameContainerPreSkillSelect.style.display = "none"
        gameContainerVictoryScreen.style.display = "inherit"
        gameContainerVictoryScreen.style.backgroundImage = "url(./assets/victoryscreen.gif)"
        victoryMusic.loop = true
        victoryMusic.volume = 0.75
        victoryMusic.play()
    }, 2000)
}

function gameOverSequence() {
    lastSupriseMusic.pause()
    lastSupriseMusic.currentTime = 0
    setTimeout(function(){
        gameContainerPreSkillSelect.style.display = "none"
        gameContainerGameOverScreen.style.display = "inherit"
        velvetRoomMusic.loop = true
        velvetRoomMusic.volume = 0.75
        velvetRoomMusic.play()
    }, 2000)
}