// ==========================================
// MIRIMA CONNECT
// Main Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  
   let portalOpened = false;
  
    // Background
    const background = document.querySelector(".background");

    // Helper: set stable background image and properties to avoid zoom/overflow on mobile
    function setBackgroundImage(url, isNight) {
        if (!background) return;

        background.style.backgroundImage = `url("${url}")`;

        // Force consistent background sizing/positioning so images don't change layout
        background.style.backgroundSize = "cover";
        background.style.backgroundPosition = "center center";
        background.style.backgroundRepeat = "no-repeat";

        // Do NOT use fixed attachment on mobile (commonly causes zoom/shift); use scroll
        background.style.backgroundAttachment = "scroll";

        // Ensure the background container itself can't expand beyond viewport width
        background.style.width = "100%";
        background.style.height = "100%";
        background.style.minHeight = "100vh";
        background.style.boxSizing = "border-box";
        background.style.left = "0";
        background.style.top = "0";

        // Toggle night class for any night-specific styling
        if (isNight) {
            document.body.classList.add("night");
        } else {
            document.body.classList.remove("night");
        }

        // Prevent accidental horizontal scrolling caused by small rounding differences
        // Only set once (safe to call repeatedly).
        try {
            document.documentElement.style.overflowX = "hidden";
        } catch (e) {
            // ignore in restricted environments
        }
    }

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
    if (dayForest) dayForest.volume = 0.20;
    if (dayBirds) dayBirds.volume = 0.30;
    if (nightForest) nightForest.volume = 0.20;

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

            // Night
            setBackgroundImage("images/forest-night.png", true);

        }else{

            // Day
            setBackgroundImage("images/forest.png", false);

        }

        background.style.opacity = 1;

    },1500);

}
    
 function playAmbience(){

    const hour = new Date().getHours();

    if(hour >= 18 || hour < 6){

        if (dayForest) fadeOut(dayForest);
        if (dayBirds) fadeOut(dayBirds);

        if (nightForest) fadeIn(nightForest,0.30);

    }else{

        if (nightForest) fadeOut(nightForest);

        if (dayForest) fadeIn(dayForest,0.30);
        if (dayBirds) fadeIn(dayBirds,0.25);

    }

}
  
  function typeMessage(message, speed = 60) {

    return new Promise(resolve => {

        const typingText = document.getElementById("typingText");
      const typingSound = document.getElementById("typingSound");

        if (typingText) typingText.textContent = "";

        let i = 0;

      if (typingSound) {
        try {
          typingSound.currentTime = 0;
          typingSound.loop = true;
          typingSound.play();
        } catch (e) {
          // play may be blocked by browser autoplay policies
        }
      }

        const timer = setInterval(() => {

            if (!typingText) return;

            typingText.textContent += message.charAt(i);

            i++;

            if(i >= message.length){

    clearInterval(timer);

    if (typingSound) {
      try { typingSound.pause(); typingSound.currentTime = 0; } catch (e) {}
    }

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

            // Night lake
            setBackgroundImage("images/lake-night.png", true);

        }else{

            // Day lake
            setBackgroundImage("images/lake-day.png", false);

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
// CLEAR SELECTED ITEMS
// ==========================================

function clearSelections(popup, selector) {

    popup.querySelectorAll(selector).forEach(item => {

        item.classList.remove("selected");

    });

}
  
// ==========================================
// SERVICE POPUP
// ==========================================

const roomServiceCard = document.getElementById("roomServiceCard");

const receptionCard = document.getElementById("receptionCard");
const receptionPopup = document.getElementById("receptionPopup");
const closeReception = document.querySelector(".closeReception");

const transferPopup = document.getElementById("transferPopup");
const closeTransfer = document.querySelector(".closeTransfer");

const campfirePopup = document.getElementById("campfirePopup");
const closeCampfire = document.querySelector(".closeCampfire");

const spaPopup = document.getElementById("spaPopup");
const closeSpa = document.querySelector(".closeSpa");

const paymentPopup = document.getElementById("paymentPopup");
const closePayment = document.querySelector(".closePayment");
  
const housekeepingCard = document.getElementById("housekeepingCard");
const housekeepingPopup = document.getElementById("housekeepingPopup");
const closeHousekeeping = document.querySelector(".closeHousekeeping");

const billingCard = document.getElementById("billingCard");
const billingPopup = document.getElementById("billingPopup");
const closeBilling = document.querySelector(".closeBilling");

const exploreCard = document.getElementById("exploreCard");
const explorePopup = document.getElementById("explorePopup");
const closeExplore = document.querySelector(".closeExplore");

const feedbackCard = document.getElementById("feedbackCard");
const feedbackPopup = document.getElementById("feedbackPopup");
const closeFeedback = document.querySelector(".closeFeedback");

const servicePopup = document.getElementById("servicePopup");
const popupTitle = servicePopup.querySelector("h2");
const popupBody = document.getElementById("popupBody");
const closePopup = servicePopup.querySelector(".closePopup");

// ==========================================
// ROOM SERVICE
// ==========================================

roomServiceCard.addEventListener("click", () => {

    popupTitle.textContent = "🛎️ Room Service";

    popupBody.innerHTML = `
<h3>🍳 Breakfast</h3>

<div class="menuItem" data-time="20–25">🍽️ Full English Breakfast <small>(20–25 min)</small></div>
<div class="menuItem" data-time="15–20">🥞 Pancakes & Honey <small>(15–20 min)</small></div>
<div class="menuItem" data-time="10–15">🍳 Chef's Omelette <small>(10–15 min)</small></div>
<div class="menuItem" data-time="5–8">🍉 Fresh Tropical Fruit Platter <small>(5–8 min)</small></div>
<div class="menuItem" data-time="20–25">🥣 African Breakfast <small>(20–25 min)</small></div>

<h3>🍽️ Main Meals</h3>

<div class="menuItem" data-time="25–30">🐟 Grilled Nile Tilapia <small>(25–30 min)</small></div>
<div class="menuItem" data-time="25–30">🍗 Roast Chicken <small>(25–30 min)</small></div>
<div class="menuItem" data-time="30–35">🥩 Beef Fillet <small>(30–35 min)</small></div>
<div class="menuItem" data-time="35–45">🍖 Goat Muchomo <small>(35–45 min)</small></div>
<div class="menuItem" data-time="20–25">🥬 Vegetarian Curry <small>(20–25 min)</small></div>

<h3>🥗 Light Meals</h3>

<div class="menuItem" data-time="10–15">🥪 Club Sandwich <small>(10–15 min)</small></div>
<div class="menuItem" data-time="5–10">🥗 Garden Salad <small>(5–10 min)</small></div>
<div class="menuItem" data-time="10–15">🍟 French Fries <small>(10–15 min)</small></div>
<div class="menuItem" data-time="20–25">🍕 Chef's Pizza <small>(20–25 min)</small></div>

<h3>🥤 Drinks</h3>

<div class="menuItem" data-time="3–5">🍹 Fresh Passion Juice <small>(3–5 min)</small></div>
<div class="menuItem" data-time="3–5">🥭 Fresh Mango Juice <small>(3–5 min)</small></div>
<div class="menuItem" data-time="5–7">☕ African Tea <small>(5–7 min)</small></div>
<div class="menuItem" data-time="2–4">☕ Espresso <small>(2–4 min)</small></div>
<div class="menuItem" data-time="4–6">🥛 Cappuccino <small>(4–6 min)</small></div>
<div class="menuItem" data-time="0">💧 Mineral Water <small>(Immediate)</small></div>

<h3>🍰 Desserts</h3>

<div class="menuItem" data-time="3–5">🍰 Chocolate Cake <small>(3–5 min)</small></div>
<div class="menuItem" data-time="0">🍨 Vanilla Ice Cream <small>(Immediate)</small></div>
<div class="menuItem" data-time="5–8">🍓 Seasonal Fruit Salad <small>(5–8 min)</small></div>

<h3>📝 Special Instructions</h3>

<textarea placeholder="Any allergies, dietary requirements or special requests?"></textarea>

<button id="placeOrder">Place Order</button>
`;

    servicePopup.style.display = "flex";

    popupBody.querySelectorAll(".menuItem").forEach(item => {

        item.addEventListener("click", () => {

            item.classList.toggle("selected");

        });

    });

    document.getElementById("placeOrder").addEventListener("click", () => {

    const selectedItems = popupBody.querySelectorAll(".menuItem.selected");

    if (selectedItems.length === 0) {

    showWarning(
        "No Menu Item Selected",
        "Please choose at least one menu item before placing your order."
    );

    return;

}

    const guestName = localStorage.getItem("guestName") || "Guest";
       
        let estimate = "5–10 minutes";

        if (selectedItems.length > 0) {

            let longest = 0;
            let estimateText = "5–10";

            selectedItems.forEach(item => {

                const time = item.dataset.time;

                if (time === "0") return;

                const highest = parseInt(time.split("–")[1]);

                if (highest > longest) {

                    longest = highest;
                    estimateText = time;

                }

            });

            estimate = longest === 0
                ? "Immediate"
                : estimateText + " minutes";
        }

        servicePopup.style.display = "none";

        const btn = document.getElementById("placeOrder");

showLoading("Contacting Room Service...", () => {

  addRequest("🍽️ Room Service", "Preparing");

  showNotification(
    "🍽️",
    "Room Service",
    "Your order has been received."
);
  
    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your order has been received.",
        estimate
    );

}, btn);
      
 });
  
});

closePopup.addEventListener("click", () => {

    clearSelections(servicePopup, ".menuItem");

    servicePopup.style.display = "none";

});

servicePopup.addEventListener("click", (e) => {

    if (e.target === servicePopup) {

        clearSelections(servicePopup, ".menuItem");

        servicePopup.style.display = "none";

    }

});

// ==========================================
// RECEPTION POPUP
// ==========================================

receptionCard.addEventListener("click", () => {

    receptionPopup.style.display = "flex";

});

receptionPopup.querySelectorAll(".service-option").forEach(item => {

    item.addEventListener("click", () => {

        receptionPopup.querySelectorAll(".service-option").forEach(i => {

            i.classList.remove("selected");

        });

        item.classList.add("selected");

    });

});

closeReception.addEventListener("click", () => {

    clearSelections(receptionPopup, ".service-option");

    receptionPopup.style.display = "none";

});

receptionPopup.addEventListener("click", (e) => {

    if (e.target === receptionPopup) {

        clearSelections(receptionPopup, ".service-option");

        receptionPopup.style.display = "none";

    }

});

  // ==========================================
// AIRPORT TRANSFER POPUP
// ==========================================

closeTransfer.addEventListener("click", () => {

    clearSelections(transferPopup, ".service-option");

    transferPopup.style.display = "none";

});

transferPopup.addEventListener("click", (e) => {

    if (e.target === transferPopup) {

        clearSelections(transferPopup, ".service-option");

        transferPopup.style.display = "none";

    }

});

transferPopup.querySelectorAll(".service-option").forEach(item => {

    item.addEventListener("click", () => {

        transferPopup.querySelectorAll(".service-option").forEach(i => {

            i.classList.remove("selected");

        });

        item.classList.add("selected");

    });

});

  // ==========================================
// LUGGAGE ASSISTANCE POPUP
// ==========================================

const luggagePopup =
    document.getElementById("luggagePopup");

const closeLuggage =
    document.querySelector(".closeLuggage");

closeLuggage.addEventListener("click", () => {

    luggagePopup.style.display = "none";

});

luggagePopup.addEventListener("click", (e) => {

    if (e.target === luggagePopup) {

        luggagePopup.style.display = "none";

    }

});
  // ==========================================
// LUGGAGE ASSISTANCE REQUEST
// ==========================================

document.getElementById("submitLuggage")
.addEventListener("click", () => {

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitLuggage");

    luggagePopup.style.display = "none";

    showLoading("Requesting Luggage Assistance...", () => {

        addRequest(
            "🧳 Luggage Assistance",
            "Guest requested luggage assistance."
        );

        showNotification(
            "🧳",
            "Luggage Assistance",
            "Your luggage assistance request has been received."
        );

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your luggage assistance request has been received.",
            "Our reception team will assist you shortly."
        );

    }, btn);

});
