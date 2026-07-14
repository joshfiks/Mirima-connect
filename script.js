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

