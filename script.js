// ==========================================
// MIRIMA CONNECT
// Main Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  
   let portalOpened = false;
  
    // Background
    const background = document.querySelector(".background");

    // Audio
    const dayForest = document.getElementById("dayForest");
    const dayBirds = document.getElementById("dayBirds");
    const nightForest = document.getElementById("nightForest");

    // Enter Button
    const enterButton = document.getElementById("enter");

    // Card Animation
    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-12px) scale(1.04)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });

    // Audio Volume
    dayForest.volume = 0.30;
    dayBirds.volume = 0.25;
    nightForest.volume = 0.30;

function fadeOut(audio){

    let fade = setInterval(()=>{

        if(audio.volume > 0.02){

            audio.volume -= 0.02;

        }else{

            audio.pause();
            audio.currentTime = 0;
            clearInterval(fade);

        }

    },100);

}

function fadeIn(audio,targetVolume){

    audio.volume = 0;

    audio.play();

    let fade = setInterval(()=>{

        if(audio.volume < targetVolume){

            audio.volume += 0.02;

        }else{

            audio.volume = targetVolume;
            clearInterval(fade);

        }

    },100);

}

 function updateTheme(){
     
if(portalOpened) return;
     
    const hour = new Date().getHours();

    background.style.opacity = 0;

    setTimeout(() => {

        if(hour >= 18 || hour < 6){

            background.style.backgroundImage =
            'url("images/forest-night.png")';

            document.body.classList.add("night");

        }else{

            background.style.backgroundImage =
            'url("images/forest.png")';

            document.body.classList.remove("night");

        }

        background.style.opacity = 1;

    },1500);

}
    
 function playAmbience(){

    const hour = new Date().getHours();

    if(hour >= 18 || hour < 6){

        fadeOut(dayForest);
        fadeOut(dayBirds);

        fadeIn(nightForest,0.30);

    }else{

        fadeOut(nightForest);

        fadeIn(dayForest,0.30);
        fadeIn(dayBirds,0.25);

    }

}
  
  function typeMessage(message, speed = 60) {

    return new Promise(resolve => {

        const typingText = document.getElementById("typingText");
      const typingSound = document.getElementById("typingSound");

        typingText.textContent = "";

        let i = 0;

      typingSound.currentTime = 0;
typingSound.loop = true;
typingSound.play();

        const timer = setInterval(() => {

            typingText.textContent += message.charAt(i);

            i++;

            if(i >= message.length){

    clearInterval(timer);

    typingSound.pause();
    typingSound.currentTime = 0;

    setTimeout(resolve,1500);

}
          

        },speed);

    });

}    
  
    updateTheme();

    setInterval(updateTheme,60000);

            
// ==========================================
// INTRO VIDEO
// ==========================================

const introScreen = document.getElementById("introScreen");
const introVideo = document.getElementById("introVideo");
const continueBtn = document.getElementById("continueBtn");

enterButton.addEventListener("click", () => {

    playAmbience();

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".portal").style.display = "none";

    introScreen.style.display = "flex";

    introVideo.currentTime = 0;
    introVideo.play();

});

introVideo.addEventListener("ended", () => {

    portalOpened = true;

    introScreen.style.display = "none";

    background.classList.add("fade");

    setTimeout(() => {

        const hour = new Date().getHours();

        if(hour >= 18 || hour < 6){

            background.style.backgroundImage =
            'url("images/lake-night.png")';

        }else{

            background.style.backgroundImage =
            'url("images/lake-day.png")';

        }

        background.classList.remove("fade");

        const welcomeScreen = document.getElementById("welcomeScreen");

        welcomeScreen.style.display = "flex";

        (async () => {

            await typeMessage("Welcome to Mirima Kibale Lodge.");

            document.getElementById("guestNameBox").style.display = "block";

        })();

    },1200);

});

continueBtn.addEventListener("click", async () => {

    const guestName = document.getElementById("guestName").value.trim();
  localStorage.setItem("guestName", guestName);

    if (guestName === "") {

        alert("Please enter your name.");

        return;

    }

    document.getElementById("guestNameBox").style.display = "none";

    const welcomeScreen = document.getElementById("welcomeScreen");

    await typeMessage(`Welcome, ${guestName}.`);

    await typeMessage("We're delighted to host your stay.");

    await typeMessage("Please choose a service below.");

    welcomeScreen.style.display = "none";

    const portal = document.querySelector(".portal");

    portal.classList.remove("show");

    portal.style.display = "block";

    setTimeout(() => {

        portal.classList.add("show");

        const cards = document.querySelectorAll(".card");

        cards.forEach((card, index) => {

            setTimeout(() => {

                card.classList.add("show");

            }, index * 300);

        });

    }, 1500);

});


// ==========================================
// SERVICE POPUP
// ==========================================

const roomServiceCard = document.getElementById("roomServiceCard");

const servicePopup = document.getElementById("servicePopup");

const popupTitle = servicePopup.querySelector("h2");
  
const popupBody = document.getElementById("popupBody");
  
const popupContent = servicePopup.querySelector(".popup-content");

const closePopup = servicePopup.querySelector(".closePopup");
  
  const receptionCard = document.getElementById("receptionCard");

roomServiceCard.addEventListener("click", () => {
  
    popupTitle.textContent = "🛎️ Room Service";

    servicePopup.style.display = "flex";

});

 roomServiceCard.addEventListener("click", () => {

    popupTitle.textContent = "🛎️ Room Service";

    popupBody.innerHTML = `
        <h3>🍳 Breakfast</h3>

        <div class="menuItem">English Breakfast</div>
        <div class="menuItem">Continental Breakfast</div>
        <div class="menuItem">Pancakes & Honey</div>

        <h3>🍽️ Main Meals</h3>

        <div class="menuItem">Grilled Chicken</div>
        <div class="menuItem">Beef Steak</div>
        <div class="menuItem">Tilapia Fish</div>

        <button id="placeOrder">Place Order</button>
    `;

    servicePopup.style.display = "flex";

});

closePopup.addEventListener("click", () => {

    servicePopup.style.display = "none";

});

servicePopup.addEventListener("click", (e) => {

    if (e.target === servicePopup) {

        servicePopup.style.display = "none";

    }

});
// ==========================================
// MENU ITEM SELECTION
// ==========================================

const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("selected");

    });

});

// ==========================================
// PLACE ORDER
// ==========================================

placeOrder.addEventListener("click", () => {

    const guestName = localStorage.getItem("guestName") || "Guest";

    const orderConfirmation = document.getElementById("orderConfirmation");
    const confirmTitle = document.getElementById("confirmTitle");

    confirmTitle.textContent = `Thank you, ${guestName}!`;

    servicePopup.style.display = "none";

    orderConfirmation.style.display = "flex";

});

const closeConfirmation = document.getElementById("closeConfirmation");

closeConfirmation.addEventListener("click", () => {

    document.getElementById("orderConfirmation").style.display = "none";

});

});
