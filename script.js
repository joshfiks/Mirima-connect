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

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your room service order has been sent to our kitchen.",
            `Estimated preparation: ${estimate}`
        );

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

    receptionPopup.querySelectorAll(".menuItem").forEach(item => {

        item.onclick = () => item.classList.toggle("selected");

    });

});

closeReception.addEventListener("click", () => {

        clearSelections(receptionPopup, ".menuItem");

  receptionPopup.style.display = "none";
  
});

receptionPopup.addEventListener("click", (e) => {

    if (e.target === receptionPopup) {

   clearSelections(receptionPopup, ".menuItem");

        receptionPopup.style.display = "none";

        
    }

});


// ==========================================
// HOUSEKEEPING POPUP
// ==========================================

housekeepingCard.addEventListener("click", () => {

    housekeepingPopup.style.display = "flex";

    housekeepingPopup.querySelectorAll(".menuItem").forEach(item => {

        item.onclick = () => item.classList.toggle("selected");

    });

});

closeHousekeeping.addEventListener("click", () => {

       clearSelections(housekeepingPopup, ".menuItem");
  
   housekeepingPopup.style.display = "none";

});

housekeepingPopup.addEventListener("click", (e) => {

    if (e.target === housekeepingPopup) {

      clearSelections(housekeepingPopup, ".menuItem");
      
        housekeepingPopup.style.display = "none";

        
    }

});


// ==========================================
// BILLING POPUP
// ==========================================

billingCard.addEventListener("click", () => {

    billingPopup.style.display = "flex";

    billingPopup.querySelectorAll(".service-option").forEach(option => {

    option.onclick = () => {

        billingPopup.querySelectorAll(".service-option").forEach(item => {

            item.classList.remove("selected");

        });

        option.classList.add("selected");

    };

});

});

closeBilling.addEventListener("click", () => {
   
   clearSelections(billingPopup, ".service-option");
  
 billingPopup.style.display = "none";
  
});

billingPopup.addEventListener("click", (e) => {

    if (e.target === billingPopup) {

    clearSelections(billingPopup, ".service-option");
      
        billingPopup.style.display = "none";

        
    }

});


// ==========================================
// EXPLORE POPUP
// ==========================================

exploreCard.addEventListener("click", () => {

    explorePopup.style.display = "flex";

   explorePopup.querySelectorAll(".service-option").forEach(option => {

    option.onclick = () => {

        explorePopup.querySelectorAll(".service-option").forEach(item => {

            item.classList.remove("selected");

        });

        option.classList.add("selected");

    };

});

});

closeExplore.addEventListener("click", () => {
   
    clearSelections(explorePopup, ".service-option");

  explorePopup.style.display = "none";

});

explorePopup.addEventListener("click", (e) => {

    if (e.target === explorePopup) {

   clearSelections(explorePopup, ".service-option");
      
        explorePopup.style.display = "none";
             
    }

});


// ==========================================
// FEEDBACK POPUP
// ==========================================

feedbackCard.addEventListener("click", () => {

    feedbackPopup.style.display = "flex";

    feedbackPopup.querySelectorAll(".service-option").forEach(option => {

    option.onclick = () => {

        feedbackPopup.querySelectorAll(".service-option").forEach(item => {

            item.classList.remove("selected");

        });

        option.classList.add("selected");

    };

});

});

closeFeedback.addEventListener("click", () => {

      clearSelections(feedbackPopup, ".service-option");
  
  feedbackPopup.style.display = "none";

});

feedbackPopup.addEventListener("click", (e) => {

    if (e.target === feedbackPopup) {

      clearSelections(feedbackPopup, ".service-option");      
        feedbackPopup.style.display = "none";
        
    }

});

// ==========================================
// LOADING FUNCTION
// ==========================================

function showLoading(message, callback, button = null){

    const loadingPopup = document.getElementById("loadingPopup");

    loadingPopup.querySelector("h2").textContent = message;

    loadingPopup.style.display = "flex";

    if(button){

        button.disabled = true;

        button.dataset.originalText = button.innerHTML;

        button.innerHTML = "⏳ Sending...";

    }

    setTimeout(() => {

        loadingPopup.style.display = "none";

        if(button){

            button.disabled = false;

            button.innerHTML = button.dataset.originalText;

        }

        callback();

    },1500);

}
  
// ==========================================
// CONFIRMATION FUNCTION
// ==========================================

function showConfirmation(title, message, time = "") {

    const orderConfirmation = document.getElementById("orderConfirmation");

    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmMessage").textContent = message;
    document.getElementById("confirmTime").innerHTML =
        time ? `<strong>${time}</strong>` : "";

    servicePopup.style.display = "none";
    receptionPopup.style.display = "none";
    housekeepingPopup.style.display = "none";
    billingPopup.style.display = "none";
    explorePopup.style.display = "none";
    feedbackPopup.style.display = "none";

    orderConfirmation.style.display = "flex";
}

  // ==========================================
// WARNING FUNCTION
// ==========================================

function showWarning(title, message) {

    document.getElementById("warningTitle").textContent = title;

    document.getElementById("warningMessage").textContent = message;

    document.getElementById("warningPopup").style.display = "flex";

}

const closeWarning = document.getElementById("closeWarning");

closeWarning.addEventListener("click", () => {

    document.getElementById("warningPopup").style.display = "none";

});

warningPopup.addEventListener("click", (e) => {

    if (e.target === warningPopup) {

        warningPopup.style.display = "none";

    }

});

  // ==========================================
// RECEPTION REQUEST
// ==========================================

document.getElementById("sendReceptionRequest").addEventListener("click", () => {

    const selected = receptionPopup.querySelectorAll(".menuItem.selected");

    if (selected.length === 0) {
       showWarning(
    "No Service Selected",
    "Please choose at least one service before sending your request."
);
return;
    }

    const guestName = localStorage.getItem("guestName") || "Guest";
  
  clearSelections(receptionPopup, ".menuItem");

    receptionPopup.style.display = "none";

const btn = document.getElementById("sendReceptionRequest");

showLoading("Connecting to Reception...", () => {

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Reception has received your request.",
        "Estimated response: 2–5 minutes"
    );

}, btn);
  
// ==========================================
// HOUSEKEEPING REQUEST
// ==========================================

document.getElementById("sendHousekeepingRequest").addEventListener("click", () => {

    const selected = housekeepingPopup.querySelectorAll(".menuItem.selected");

    if (selected.length === 0) {

        showWarning(
    "No Service Selected",
    "Please choose at least one service before sending your request."
);
return;

    }

    const guestName = localStorage.getItem("guestName") || "Guest";

  clearSelections(housekeepingPopup, ".menuItem");
  
    housekeepingPopup.style.display = "none";
  
const btn = document.getElementById("sendHousekeepingRequest");

showLoading("Notifying Housekeeping...", () => {

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Housekeeping has received your request.",
        "Estimated response: 10–20 minutes"
    );

}, btn);
  
// ==========================================
// BILLING REQUEST
// ==========================================

document.getElementById("sendBillingRequest").addEventListener("click", () => {

    // Find every selected billing option
    const selectedItems = billingPopup.querySelectorAll(".service-option.selected");

    // Stop if nothing is selected
    if (selectedItems.length === 0) {

       showWarning(
    "No Service Selected",
    "Please select at least one billing option before sending your request."
);
return;

    }

    const guestName = localStorage.getItem("guestName") || "Guest";

    clearSelections(billingPopup, ".service-option");

billingPopup.style.display = "none";

const btn = document.getElementById("sendBillingRequest");

showLoading("Processing Billing Request...", () => {

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your billing request has been received.",
        "Estimated response: 5–10 minutes"
    );

}, btn);
  
// ==========================================
// EXPLORE REQUEST
// ==========================================

document.getElementById("bookActivity").addEventListener("click", () => {

    // Find all selected activities
    const selectedItems = explorePopup.querySelectorAll(".service-option.selected");

    // Stop if nothing is selected
    if (selectedItems.length === 0) {

       showWarning(
    "No Service Selected",
    "Please select at least one activity before sending your request."
);
return;

    }

    const guestName = localStorage.getItem("guestName") || "Guest";

  clearSelections(explorePopup, ".service-option");
  
    explorePopup.style.display = "none";

const btn = document.getElementById("bookActivity");

showLoading("Booking Your Activity...", () => {

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your booking request has been received.",
        "Our activities team will contact you shortly."
    );

}, btn);

// ==========================================
// FEEDBACK SUBMISSION
// ==========================================

document.getElementById("submitFeedback").addEventListener("click", () => {

    // Find all selected feedback options
    const selectedItems = feedbackPopup.querySelectorAll(".service-option.selected");

    // Stop if nothing is selected
    if (selectedItems.length === 0) {

    showWarning(
    "No Feedback Selected",
    "Please select at least one feedback option before submitting."
);
 return;

    }

    const guestName = localStorage.getItem("guestName") || "Guest";

  clearSelections(feedbackPopup, ".service-option");
  
    feedbackPopup.style.display = "none";

const btn = document.getElementById("submitFeedback");

showLoading("Submitting Your Feedback...", () => {

    showConfirmation(
        `Thank you, ${guestName}!`,
        "We appreciate your feedback.",
        "Your comments help us improve."
    );

}, btn);
  
// ==========================================
// CLOSE CONFIRMATION
// ==========================================

const closeConfirmation = document.getElementById("closeConfirmation");

closeConfirmation.addEventListener("click", () => {

    document.getElementById("orderConfirmation").style.display = "none";

});

});
