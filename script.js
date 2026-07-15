// ==========================================
// MIRIMA CONNECT
// Guest Services Portal
// ==========================================

// ---------------------------
// Personalized Welcome
// ---------------------------

const guestName = "Guest";
const cottageNumber = 7;

document.addEventListener("DOMContentLoaded", () => {

const title = document.getElementById("welcomeTitle");
const message = document.getElementById("welcomeMessage");

title.innerHTML = `Welcome, ${guestName}!`;

message.innerHTML =
`
You are staying in <strong>Cottage ${cottageNumber}</strong>.<br><br>
Order food, request housekeeping, contact reception and explore Mirima Kibale Lounge with just one tap.
`;

});

// ---------------------------
// Card Animation
// ---------------------------

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.04)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

// ---------------------------
// Time Greeting
// ---------------------------

const hour=new Date().getHours();

let greeting="Welcome";

if(hour<12){

greeting="Good Morning";

}else if(hour<18){

greeting="Good Afternoon";

}else{

greeting="Good Evening";

}

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("welcomeTitle").innerHTML=
`${greeting}, ${guestName}!`;

});

const background = document.querySelector(".background");

function updateTheme(){

    const hour = new Date().getHours();

    if(hour >= 18 || hour < 6){

        background.style.backgroundImage =
        'url("images/forest-night.png")';

        document.body.classList.add("night");

    }else{

        background.style.backgroundImage =
        'url("images/forest.png")';

        document.body.classList.remove("night");

    }

}

updateTheme();

/* Check every minute */
setInterval(updateTheme,60000);

// ==========================================
// Ambient Sounds
// ==========================================

const dayForest = document.getElementById("dayForest");
const dayBirds = document.getElementById("dayBirds");
const nightForest = document.getElementById("nightForest");

// Fixed volume

dayForest.volume = 0.30;
dayBirds.volume = 0.25;
nightForest.volume = 0.30;

function updateAmbience(){

    const hour = new Date().getHours();

    if(hour >= 18 || hour < 6){

        dayForest.pause();
        dayBirds.pause();

        dayForest.currentTime = 0;
        dayBirds.currentTime = 0;

        nightForest.play();

    }else{

        nightForest.pause();

        nightForest.currentTime = 0;

        dayForest.play();
        dayBirds.play();

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    updateAmbience();

    setInterval(updateAmbience,60000);

});

document.getElementById("enter").addEventListener("click",()=>{

    updateAmbience();

});

// ==========================================
// AMBIENT AUDIO
// ==========================================

const dayForest = document.getElementById("dayForest");
const dayBirds = document.getElementById("dayBirds");
const nightForest = document.getElementById("nightForest");

// Medium volume
dayForest.volume = 0.30;
dayBirds.volume = 0.25;
nightForest.volume = 0.30;

function playAmbience(){

    const hour = new Date().getHours();

    // Stop all sounds first
    dayForest.pause();
    dayBirds.pause();
    nightForest.pause();

    dayForest.currentTime = 0;
    dayBirds.currentTime = 0;
    nightForest.currentTime = 0;

    if(hour >= 18 || hour < 6){

        nightForest.play();

    }else{

        dayForest.play();
        dayBirds.play();

    }

}

// Start audio when guest clicks ENTER
document.getElementById("enter").addEventListener("click", ()=>{

    playAmbience();

});
