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
    dayForest.volume = 0.20;
    dayBirds.volume = 0.30;
    nightForest.volume = 0.20;

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
  // ==========================================
// MAINTENANCE REQUEST POPUP
// ==========================================

const maintenancePopup =
    document.getElementById("maintenancePopup");

const closeMaintenance =
    document.querySelector(".closeMaintenance");
  closeMaintenance.addEventListener("click", () => {

    maintenancePopup.style.display = "none";

});

maintenancePopup.addEventListener("click", (e) => {

    if (e.target === maintenancePopup) {

        maintenancePopup.style.display = "none";

    }

});

  // ==========================================
// MAINTENANCE REQUEST
// ==========================================

document.getElementById("submitMaintenance")
.addEventListener("click", () => {

    const maintenanceType =
        document.getElementById("maintenanceType")?.value || "";

    const maintenanceMessage =
        document.getElementById("maintenanceMessage")?.value.trim() || "";

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitMaintenance");

    maintenancePopup.style.display = "none";

    showLoading("Sending Maintenance Request...", () => {

        addRequest(
            "🔧 Maintenance Request",
            maintenanceType || maintenanceMessage || "Guest requested maintenance assistance."
        );

        showNotification(
            "🔧",
            "Maintenance",
            "Your maintenance request has been received."
        );

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your maintenance request has been received.",
            "Our maintenance team will assist you shortly."
        );

    }, btn);

});
  // ==========================================
// EXTEND YOUR STAY POPUP
// ==========================================

const extendStayPopup =
    document.getElementById("extendStayPopup");

const closeExtendStay =
    document.querySelector(".closeExtendStay");
  closeExtendStay.addEventListener("click", () => {

    extendStayPopup.style.display = "none";

});

extendStayPopup.addEventListener("click", (e) => {

    if (e.target === extendStayPopup) {

        extendStayPopup.style.display = "none";

    }

});

  // ==========================================
// EXTEND YOUR STAY REQUEST
// ==========================================

document.getElementById("submitExtendStay")
.addEventListener("click", () => {

    const newCheckoutDate =
        document.getElementById("newCheckoutDate").value;

    const additionalNights =
        document.getElementById("additionalNights").value;

    const message =
        document.getElementById("extendStayMessage").value.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    if (!newCheckoutDate || !additionalNights) {

        showWarning(
            "Incomplete Information",
            "Please select a new checkout date and enter the number of additional nights."
        );

        return;
    }

    const btn =
        document.getElementById("submitExtendStay");

    extendStayPopup.style.display = "none";

    showLoading("Sending Extension Request...", () => {

        addRequest(
            "📅 Extend Stay",
            `${additionalNights} additional night(s) — New checkout: ${newCheckoutDate}${message ? " — " + message : ""}`
        );

        showNotification(
            "📅",
            "Stay Extension",
            "Your stay extension request has been received."
        );

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your stay extension request has been received.",
            "Reception will check availability and confirm your new checkout date."
        );

        document.getElementById("newCheckoutDate").value = "";
        document.getElementById("additionalNights").value = "";
        document.getElementById("extendStayMessage").value = "";

    }, btn);

});
  // ==========================================
// EMERGENCY POPUP
// ==========================================

const emergencyPopup =
    document.getElementById("emergencyPopup");

const closeEmergency =
    document.querySelector(".closeEmergency");

  closeEmergency.addEventListener("click", () => {

    emergencyPopup.style.display = "none";

});

emergencyPopup.addEventListener("click", (e) => {

    if (e.target === emergencyPopup) {

        emergencyPopup.style.display = "none";

    }

});

  // ==========================================
// EMERGENCY ASSISTANCE REQUEST
// ==========================================

document.getElementById("submitEmergency")
.addEventListener("click", () => {

    const emergencyType =
        document.getElementById("emergencyType").value;

    const emergencyLocation =
        document.getElementById("emergencyLocation").value.trim();

    const emergencyMessage =
        document.getElementById("emergencyMessage").value.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    if (!emergencyType) {

        showWarning(
            "Select Emergency Type",
            "Please select the type of emergency."
        );

        return;
    }

    if (!emergencyLocation) {

        showWarning(
            "Location Required",
            "Please tell reception where the emergency is."
        );

        return;
    }

    const btn =
        document.getElementById("submitEmergency");

    emergencyPopup.style.display = "none";

    showLoading("Sending Emergency Alert...", () => {

        addRequest(
            "🚨 Emergency Assistance",
            `${emergencyType} — Location: ${emergencyLocation}${emergencyMessage ? " — " + emergencyMessage : ""}`
        );

        showNotification(
            "🚨",
            "Emergency Assistance",
            "Your emergency request has been sent to reception."
        );

        showConfirmation(
            `We're here to help, ${guestName}.`,
            "Your emergency assistance request has been received.",
            "Reception has been alerted and will assist you immediately."
        );

        document.getElementById("emergencyType").value = "";
        document.getElementById("emergencyLocation").value = "";
        document.getElementById("emergencyMessage").value = "";

    }, btn);

});

  // ==========================================
// SPEAK TO RECEPTION POPUP
// ==========================================

const receptionChatPopup =
    document.getElementById("receptionChatPopup");

const closeReceptionChat =
    document.querySelector(".closeReceptionChat");
  closeReceptionChat.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

});

receptionChatPopup.addEventListener("click", (e) => {

    if (e.target === receptionChatPopup) {

        receptionChatPopup.style.display = "none";

    }

});

// ==========================================
// OTHER ASSISTANCE POPUP
// ==========================================

const otherAssistancePopup =
    document.getElementById("otherAssistancePopup");

const closeOtherAssistance =
    document.querySelector(".closeOtherAssistance");

// Close Other Assistance
closeOtherAssistance.addEventListener("click", () => {

    otherAssistancePopup.style.display = "none";

});

// ==========================================
// RECEPTION CONTACT ACTIONS
// ==========================================
// Close when clicking outside
otherAssistancePopup.addEventListener("click", (e) => {

    if (e.target === otherAssistancePopup) {

        otherAssistancePopup.style.display = "none";

    }

});


// ==========================================
// WHATSAPP
// ==========================================

document.getElementById("openReceptionWhatsApp")
.addEventListener("click", () => {

    const phoneNumber = "256742015605";

    window.open(
        `https://wa.me/${phoneNumber}`,
        "_blank"
    );

});


// ==========================================
// CALL RECEPTION
// ==========================================

document.getElementById("callReception")
.addEventListener("click", () => {

    window.location.href = "tel:+256700894459";

});


// ==========================================
// 🚨 EMERGENCY
// ==========================================

document.getElementById("receptionEmergency")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    emergencyPopup.style.display = "flex";

});


// ==========================================
// 🧳 LUGGAGE
// ==========================================

document.getElementById("receptionLuggage")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    luggagePopup.style.display = "flex";

});


// ==========================================
// 🔧 MAINTENANCE
// ==========================================

document.getElementById("receptionMaintenance")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    maintenancePopup.style.display = "flex";

});


// ==========================================
// 🚕 TRANSPORT
// ==========================================

document.getElementById("receptionTransport")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    transferPopup.style.display = "flex";

});


// ==========================================
// 🛎️ OTHER ASSISTANCE
// ==========================================

document.getElementById("receptionAssistance")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    otherAssistancePopup.style.display = "flex";

});

  // ==========================================
// RECEPTION FAQ POPUP
// ==========================================

const receptionFAQPopup =
    document.getElementById("receptionFAQPopup");

const closeReceptionFAQ =
    document.querySelector(".closeReceptionFAQ");


// ==========================================
// OPEN FAQ
// ==========================================

document.getElementById("receptionFAQ")
.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    receptionFAQPopup.style.display = "flex";

});


// ==========================================
// CLOSE FAQ
// ==========================================

closeReceptionFAQ.addEventListener("click", () => {

    receptionFAQPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

receptionFAQPopup.addEventListener("click", (e) => {

    if (e.target === receptionFAQPopup) {

        receptionFAQPopup.style.display = "none";

    }

});


// ==========================================
// FAQ QUESTIONS
// ==========================================

receptionFAQPopup
.querySelectorAll(".faq-question")
.forEach(question => {

    question.addEventListener("click", () => {

        const faqItem =
            question.closest(".faq-item");

        const answer =
            faqItem.querySelector(".faq-answer");

        const plus =
            question.querySelector(".faq-plus");


        // Close other open questions
        receptionFAQPopup
            .querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== faqItem) {

                    item.classList.remove("active");

                    const otherAnswer =
                        item.querySelector(".faq-answer");

                    const otherPlus =
                        item.querySelector(".faq-plus");

                    otherAnswer.style.maxHeight = null;

                    if (otherPlus) {
                        otherPlus.textContent = "+";
                    }

                }

            });


        // Open / close selected question
        if (faqItem.classList.contains("active")) {

            faqItem.classList.remove("active");

            answer.style.maxHeight = null;

            plus.textContent = "+";

        } else {

            faqItem.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

            plus.textContent = "−";

        }

    });

});              
  // ==========================================
// CAMPFIRE POPUP
// ==========================================

closeCampfire.addEventListener("click", () => {

    campfirePopup.style.display = "none";

});

campfirePopup.addEventListener("click", (e) => {

    if (e.target === campfirePopup) {

        campfirePopup.style.display = "none";

    }

});
// ==========================================
// RESTAURANT & BAR
// ==========================================

const restaurantBarPopup =
    document.getElementById("restaurantBarPopup");

const closeRestaurantBar =
    document.querySelector(".closeRestaurantBar");


// Close Restaurant & Bar popup
closeRestaurantBar.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";

});


// Close when clicking outside
restaurantBarPopup.addEventListener("click", (e) => {

    if (e.target === restaurantBarPopup) {

        restaurantBarPopup.style.display = "none";

    }

});


// ==========================================
// OPEN RESTAURANT & BAR
// ==========================================

explorePopup
.querySelectorAll(".service-option")
.forEach(option => {

    option.addEventListener("click", () => {

        const title =
            option.querySelector(".title");

        if (
            title &&
            title.textContent.trim() === "Restaurant & Bar"
        ) {

            explorePopup.style.display = "none";

            option.classList.remove("selected");

            restaurantBarPopup.style.display = "flex";

        }

    });

});
  // ==========================================
// RESTAURANT MENU POPUP
// ==========================================

const restaurantMenuPopup =
    document.getElementById("restaurantMenuPopup");

const closeRestaurantMenu =
    document.querySelector(".closeRestaurantMenu");


// ==========================================
// OPEN RESTAURANT MENU
// ==========================================

document.getElementById("restaurantMenuButton")
.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";

    restaurantMenuPopup.style.display = "flex";

});


// ==========================================
// CLOSE RESTAURANT MENU
// ==========================================

closeRestaurantMenu.addEventListener("click", () => {

    restaurantMenuPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

restaurantMenuPopup.addEventListener("click", (e) => {

    if (e.target === restaurantMenuPopup) {

        restaurantMenuPopup.style.display = "none";

    }

});
  // ==========================================
// CRATER LAKE TOUR POPUP
// ==========================================

const craterLakePopup =
    document.getElementById("craterLakePopup");

const closeCraterLake =
    document.querySelector(".closeCraterLake");


// ==========================================
// OPEN CRATER LAKE TOUR
// ==========================================

explorePopup
.querySelectorAll(".service-option")
.forEach(option => {

    option.addEventListener("click", () => {

        const title =
            option.querySelector(".title");

        if (
            title &&
            title.textContent.trim() === "Crater Lake Tour"
        ) {

            explorePopup.style.display = "none";

            option.classList.remove("selected");

            craterLakePopup.style.display = "flex";

        }

    });

});


// ==========================================
// CLOSE CRATER LAKE TOUR
// ==========================================

closeCraterLake.addEventListener("click", () => {

    craterLakePopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

craterLakePopup.addEventListener("click", (e) => {

    if (e.target === craterLakePopup) {

        craterLakePopup.style.display = "none";

    }

});
  // ==========================================
// WILDLIFE VIEWING POPUP
// ==========================================

const wildlifeViewingPopup =
    document.getElementById("wildlifeViewingPopup");

const closeWildlifeViewing =
    document.querySelector(".closeWildlifeViewing");


// ==========================================
// OPEN WILDLIFE VIEWING
// ==========================================

explorePopup
    .querySelectorAll(".service-option")
    .forEach(option => {

        option.addEventListener("click", () => {

            const title =
                option.querySelector(".title");

            if (
                title &&
                title.textContent.trim() === "Wildlife Viewing"
            ) {

                explorePopup.style.display = "none";

                option.classList.remove("selected");

                wildlifeViewingPopup.style.display = "flex";

            }

        });

    });


// ==========================================
// CLOSE WILDLIFE VIEWING
// ==========================================

closeWildlifeViewing.addEventListener("click", () => {

    wildlifeViewingPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

wildlifeViewingPopup.addEventListener("click", (e) => {

    if (e.target === wildlifeViewingPopup) {

        wildlifeViewingPopup.style.display = "none";

    }

});
  // ==========================================
// CHIMPANZEE TREKKING POPUP
// ==========================================

const chimpanzeeTrekkingPopup =
    document.getElementById("chimpanzeeTrekkingPopup");

const closeChimpanzeeTrekking =
    document.querySelector(".closeChimpanzeeTrekking");


// ==========================================
// OPEN CHIMPANZEE TREKKING
// ==========================================

explorePopup
    .querySelectorAll(".service-option")
    .forEach(option => {

        option.addEventListener("click", () => {

            const title =
                option.querySelector(".title");

            if (
                title &&
                title.textContent.trim() === "Chimpanzee Trekking"
            ) {

                explorePopup.style.display = "none";

                option.classList.remove("selected");

                chimpanzeeTrekkingPopup.style.display = "flex";

            }

        });

    });


// ==========================================
// CLOSE CHIMPANZEE TREKKING
// ==========================================

closeChimpanzeeTrekking.addEventListener("click", () => {

    chimpanzeeTrekkingPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

chimpanzeeTrekkingPopup.addEventListener("click", (e) => {

    if (e.target === chimpanzeeTrekkingPopup) {

        chimpanzeeTrekkingPopup.style.display = "none";

    }

});

  // ==========================================
// PHOTOGRAPHY TOUR POPUP
// ==========================================

const photographyTourPopup =
    document.getElementById("photographyTourPopup");

const closePhotographyTour =
    document.querySelector(".closePhotographyTour");


// ==========================================
// OPEN PHOTOGRAPHY TOUR
// ==========================================

explorePopup
    .querySelectorAll(".service-option")
    .forEach(option => {

        option.addEventListener("click", () => {

            const title =
                option.querySelector(".title");

            if (
                title &&
                title.textContent.trim() === "Photography Tour"
            ) {

                explorePopup.style.display = "none";

                option.classList.remove("selected");

                photographyTourPopup.style.display = "flex";

            }

        });

    });


// ==========================================
// CLOSE PHOTOGRAPHY TOUR
// ==========================================

closePhotographyTour.addEventListener("click", () => {

    photographyTourPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

photographyTourPopup.addEventListener("click", (e) => {

    if (e.target === photographyTourPopup) {

        photographyTourPopup.style.display = "none";

    }

});
// ==========================================
// EXPLORE EXPERIENCE CONFIRMATIONS
// ==========================================


// 🦍 CHIMPANZEE TREKKING

document.getElementById("bookChimpanzeeTrekking")
.addEventListener("click", () => {

    chimpanzeeTrekkingPopup.style.display = "none";

    showConfirmation(
        "Request Received",
        "Your Chimpanzee Trekking request has been received successfully.",
        "Reception will confirm availability and details shortly."
    );

});


// 🐘 WILDLIFE VIEWING

document.getElementById("bookWildlifeViewing")
.addEventListener("click", () => {

    wildlifeViewingPopup.style.display = "none";

    showConfirmation(
        "Request Received",
        "Your Wildlife Viewing request has been received successfully.",
        "Reception will confirm availability and details shortly."
    );

});


// 🌋 CRATER LAKE TOUR

document.getElementById("bookCraterLake")
.addEventListener("click", () => {

    craterLakePopup.style.display = "none";

    showConfirmation(
        "Request Received",
        "Your Crater Lake Tour request has been received successfully.",
        "Reception will confirm availability and details shortly."
    );

});


// 📸 PHOTOGRAPHY TOUR

document.getElementById("bookPhotographyTour")
.addEventListener("click", () => {

    photographyTourPopup.style.display = "none";

    showConfirmation(
        "Request Received",
        "Your Photography Tour request has been received successfully.",
        "Reception will confirm availability and details shortly."
    );

});
// ==========================================
// SPA POPUP
// ==========================================

closeSpa.addEventListener("click", () => {

    spaPopup.style.display = "none";

});

spaPopup.addEventListener("click", (e) => {

    if (e.target === spaPopup) {

        spaPopup.style.display = "none";

    }

});

  // ==========================================
// NATURE WALK POPUP
// ==========================================

const natureWalkPopup = document.getElementById("natureWalkPopup");
const closeNatureWalk = document.querySelector(".closeNatureWalk");

closeNatureWalk.addEventListener("click", () => {

    clearSelections(natureWalkPopup, ".nature-card");

    natureWalkPopup.style.display = "none";

});

natureWalkPopup.addEventListener("click", (e) => {

    if (e.target === natureWalkPopup) {

        clearSelections(natureWalkPopup, ".nature-card");

        natureWalkPopup.style.display = "none";

    }

});

natureWalkPopup.querySelectorAll(".nature-card").forEach(card => {

    card.addEventListener("click", () => {

        natureWalkPopup.querySelectorAll(".nature-card").forEach(item => {

            item.classList.remove("selected");

        });

        card.classList.add("selected");

    });

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
// MY REQUESTS POPUP
// ==========================================

const myRequestsBtn = document.getElementById("myRequestsBtn");

const requestsPopup = document.getElementById("requestsPopup");

const closeRequests = document.getElementById("closeRequests");

myRequestsBtn.addEventListener("click", () => {

    requestsPopup.style.display = "flex";

});

closeRequests.addEventListener("click", () => {

    requestsPopup.style.display = "none";

});

requestsPopup.addEventListener("click", (e) => {

    if(e.target === requestsPopup){

        requestsPopup.style.display = "none";

    }

});

// ==========================================
// LOADING FUNCTION
// ==========================================

function showLoading(message, callback, button = null){

    const loadingPopup = document.getElementById("loadingPopup");

    const title = document.getElementById("loadingTitle");

    const progress = document.getElementById("loadingProgress");

    const percent = document.getElementById("loadingPercent");

    title.textContent = message;

    loadingPopup.style.display = "flex";

    progress.style.width = "0%";

    percent.textContent = "0%";

    if(button){

        button.disabled = true;

        button.dataset.originalText = button.innerHTML;

        button.innerHTML = "⏳ Sending...";

    }

    let value = 0;

    const interval = setInterval(() => {

        value += 5;

        progress.style.width = value + "%";

        percent.textContent = value + "%";

        if(value >= 100){

            clearInterval(interval);

            loadingPopup.style.display = "none";

            if(button){

                button.disabled = false;

                button.innerHTML = button.dataset.originalText;

            }

            callback();

        }

    },300);

}

// ==========================================
// SAVE REQUEST
// ==========================================

function addRequest(service, status){

    const requestsList = document.getElementById("requestsList");

    const badge = document.getElementById("requestBadge");

    if(requestsList.textContent.includes("You haven't made any requests yet")){

        requestsList.innerHTML = "";

    }

    const request = document.createElement("div");

    request.className = "requestItem";

    request.innerHTML = `
        <strong>${service}</strong><br>
        Status: <span class="requestStatus">${status}</span>
        <hr>
    `;

    requestsList.prepend(request);

    badge.textContent = requestsList.querySelectorAll(".requestItem").length;

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
// LIVE NOTIFICATION
// ==========================================

function showNotification(icon, title, message){

    const notification = document.getElementById("notification");

    document.getElementById("notificationIcon").textContent = icon;

    document.getElementById("notificationTitle").textContent = title;

    document.getElementById("notificationMessage").textContent = message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    },4000);

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

    const selected = receptionPopup.querySelectorAll(".service-option.selected");

    if (selected.length === 0) {

        showWarning(
            "No Service Selected",
            "Please choose at least one service before sending your request."
        );

        return;

    }

    const airportTransfer = selected[0].querySelector(".title");

if (airportTransfer && airportTransfer.textContent.trim() === "Airport Transfer") {

    receptionPopup.style.display = "none";

    clearSelections(receptionPopup, ".service-option");

    setTimeout(() => {

    const guestName = localStorage.getItem("guestName") || "";

    document.getElementById("transferName").value = guestName;

    transferPopup.style.display = "flex";

}, 150);

    return;

}
  // ==========================================
// LUGGAGE ASSISTANCE
// ==========================================

const luggageAssistance =
    selected[0].querySelector(".title");

if (
    luggageAssistance &&
    luggageAssistance.textContent.trim() === "Luggage Assistance"
) {

    receptionPopup.style.display = "none";

    clearSelections(
        receptionPopup,
        ".service-option"
    );

    luggagePopup.style.display = "flex";

    return;

}
   // ==========================================
// MAINTENANCE REQUEST
// ==========================================

const maintenanceRequest =
    selected[0].querySelector(".title");

if (
    maintenanceRequest &&
    maintenanceRequest.textContent.trim() === "Maintenance Request"
) {

    receptionPopup.style.display = "none";

    clearSelections(
        receptionPopup,
        ".service-option"
    );

    maintenancePopup.style.display = "flex";

    return;

}
  // ==========================================
// EXTEND YOUR STAY
// ==========================================

const extendStayRequest =
    selected[0].querySelector(".title");

if (
    extendStayRequest &&
    extendStayRequest.textContent.trim() === "Extend Your Stay"
) {

    receptionPopup.style.display = "none";

    clearSelections(
        receptionPopup,
        ".service-option"
    );

    extendStayPopup.style.display = "flex";

    return;

}

  // ==========================================
// EMERGENCY ASSISTANCE
// ==========================================

const emergencyAssistance =
    selected[0].querySelector(".title");

if (
    emergencyAssistance &&
    emergencyAssistance.textContent.trim() === "Emergency Assistance"
) {

    receptionPopup.style.display = "none";

    clearSelections(
        receptionPopup,
        ".service-option"
    );

    emergencyPopup.style.display = "flex";

    return;

}

  // ==========================================
// SPEAK TO RECEPTION
// ==========================================

const speakToReception =
    selected[0].querySelector(".title");

if (
    speakToReception &&
    speakToReception.textContent.trim() === "Speak to Reception"
) {

    receptionPopup.style.display = "none";

    clearSelections(
        receptionPopup,
        ".service-option"
    );

    receptionChatPopup.style.display = "flex";

    return;

}
  clearSelections(receptionPopup, ".service-option");

    receptionPopup.style.display = "none";

const btn = document.getElementById("sendReceptionRequest");

showLoading("Connecting to Reception...", () => {

  addRequest("🛎️ Reception", "Waiting");

  showNotification(
    "🛎️",
    "Reception",
    "Reception has received your request."
);

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Reception has received your request.",
        "Estimated response: 2–5 minutes"
    );

}, btn);

  });

  // ==========================================
// AIRPORT TRANSFER REQUEST
// ==========================================

document.getElementById("sendTransferRequest").addEventListener("click", () => {

    const transferType = document.getElementById("transferType").value;
    const transferDate = document.getElementById("transferDate").value;
    const transferTime = document.getElementById("transferTime").value;

    if (
        transferType === "" ||
        transferDate === "" ||
        transferTime === ""
    ) {

        showWarning(
            "Incomplete Information",
            "Please complete all required transfer details."
        );

        return;

    }

    const guestName = document.getElementById("transferName").value;

    const btn = document.getElementById("sendTransferRequest");

    showLoading("Booking Airport Transfer...", () => {

        addRequest("🚖 Airport Transfer", "Waiting");

        showNotification(
            "🚖",
            "Transport Team",
            "Your airport transfer request has been received."
        );

        transferPopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your airport transfer has been booked.",
            "Estimated confirmation: 5–10 minutes"
        );

    }, btn);

});

  // ==========================================
// CAMPFIRE REQUEST
// ==========================================

document.getElementById("sendCampfireRequest").addEventListener("click", () => {

    const type = document.getElementById("campfireType").value;
    const date = document.getElementById("campfireDate").value;
    const time = document.getElementById("campfireTime").value;

    if (type === "" || date === "" || time === "") {

        showWarning(
            "Incomplete Information",
            "Please complete all required campfire details."
        );

        return;

    }

    const guestName = document.getElementById("campfireName").value;

    const btn = document.getElementById("sendCampfireRequest");

    showLoading("Preparing Your Campfire...", () => {

        addRequest("🔥 Campfire Experience", "Waiting");

        showNotification(
            "🔥",
            "Camp Activities",
            "Your campfire reservation has been received."
        );

        campfirePopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your campfire has been reserved.",
            "Estimated confirmation: 5–10 minutes"
        );

    }, btn);

});
  
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

  addRequest("🧹 Housekeeping", "Received");

  showNotification(
    "🧹",
    "Housekeeping",
    "Your request has been received."
);
  
    showConfirmation(
        `Thank you, ${guestName}!`,
        "Housekeeping has received your request.",
        "Estimated response: 10–20 minutes"
    );

}, btn);

  });

// ==========================================
// RECEIPT POPUP
// ==========================================

const receiptPopup =
    document.getElementById("receiptPopup");

const closeReceipt =
    document.querySelector(".closeReceipt");
  closeReceipt.addEventListener("click", () => {

    receiptPopup.style.display = "none";

});

receiptPopup.addEventListener("click", (e) => {

    if (e.target === receiptPopup) {

        receiptPopup.style.display = "none";

    }

});
  // ==========================================
// RECEIPT REQUEST
// ==========================================

document.getElementById("requestReceipt")
    .addEventListener("click", () => {

        const guestName =
            localStorage.getItem("guestName") || "Guest";

        receiptPopup.style.display = "none";

        const btn =
            document.getElementById("requestReceipt");

        showLoading("Requesting Receipt...", () => {

            addRequest(
                "🧾 Receipt",
                "Guest requested a payment receipt."
            );

            showNotification(
                "🧾",
                "Receipt",
                "Your receipt request has been received."
            );

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Your receipt request has been received.",
                "Reception will prepare your receipt shortly."
            );

        }, btn);

    });     

  // ==========================================
// CURRENT BILL POPUP
// ==========================================

const currentBillPopup =
    document.getElementById("currentBillPopup");

const closeCurrentBill =
    document.querySelector(".closeCurrentBill");

  closeCurrentBill.addEventListener("click", () => {

    currentBillPopup.style.display = "none";

});

currentBillPopup.addEventListener("click", (e) => {

    if (e.target === currentBillPopup) {

        currentBillPopup.style.display = "none";

    }

});
  // ==========================================
// EXCHANGE POPUP
// ==========================================

const exchangePopup =
    document.getElementById("exchangePopup");

const closeExchange =
    document.querySelector(".closeExchange");
  
  closeExchange.addEventListener("click", () => {

    exchangePopup.style.display = "none";

});

exchangePopup.addEventListener("click", (e) => {

    if (e.target === exchangePopup) {

        exchangePopup.style.display = "none";

    }

});

  // ==========================================
// EXCHANGE CALCULATION
// ==========================================

const exchangeCurrency =
    document.getElementById("exchangeCurrency");

const exchangeAmount =
    document.getElementById("exchangeAmount");

const exchangeRate =
    document.getElementById("exchangeRate");

const exchangeResult =
    document.getElementById("exchangeResult");


// TEMPORARY TEST RATES
// Reception/admin will control these later.

const exchangeRates = {
    USD: 3700,
    EUR: 4300,
    GBP: 5000,
    KES: 28,
    TZS: 1.45,
    RWF: 2.8
};


// Currency selected
exchangeCurrency.addEventListener("change", updateExchange);


// Amount changed
exchangeAmount.addEventListener("input", updateExchange);


function updateExchange() {

    const currency =
        exchangeCurrency.value;

    const amount =
        parseFloat(exchangeAmount.value);


    if (!currency) {

        exchangeRate.textContent =
            "Select a currency";

        exchangeResult.textContent =
            "UGX 0";

        return;
    }


    const rate =
        exchangeRates[currency];


    exchangeRate.textContent =
        `1 ${currency} = UGX ${rate.toLocaleString()}`;


    if (!amount || amount <= 0) {

        exchangeResult.textContent =
            "UGX 0";

        return;
    }


    const result =
        amount * rate;


    exchangeResult.textContent =
        `UGX ${result.toLocaleString()}`;

}
  // ==========================================
// EXCHANGE REQUEST
// ==========================================

document.getElementById("submitExchange")
.addEventListener("click", () => {

    const currency =
        exchangeCurrency.value;

    const amount =
        parseFloat(exchangeAmount.value);

    const note =
        document.getElementById("exchangeNote")
            .value
            .trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";


    if (!currency) {

        showWarning(
            "Currency Required",
            "Please select the currency you want to exchange."
        );

        return;
    }


    if (!amount || amount <= 0) {

        showWarning(
            "Amount Required",
            "Please enter the amount you want to exchange."
        );

        return;
    }


    const rate =
        exchangeRates[currency];

    const ugxAmount =
        amount * rate;


    exchangePopup.style.display = "none";


    const btn =
        document.getElementById("submitExchange");


    showLoading("Sending Exchange Request...", () => {

        addRequest(
            "💱 Currency Exchange",
            `${amount} ${currency} → approximately UGX ${ugxAmount.toLocaleString()}`
            + (note ? ` — ${note}` : "")
        );


        showNotification(
            "💱",
            "Exchange Request",
            "Your currency exchange request has been sent to reception."
        );


        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your currency exchange request has been received.",
            "Reception will confirm the exchange rate and assist you shortly."
        );


        // Reset form
        exchangeCurrency.value = "";

        exchangeAmount.value = "";

        document.getElementById("exchangeNote").value = "";

        exchangeRate.textContent =
            "Rate set by reception";

        exchangeResult.textContent =
            "UGX 0";


    }, btn);

});
  // ==========================================
// BILLING HELP POPUP
// ==========================================

const billingHelpPopup =
    document.getElementById("billingHelpPopup");

const closeBillingHelp =
    document.querySelector(".closeBillingHelp");
  
closeBillingHelp.addEventListener("click", () => {

    billingHelpPopup.style.display = "none";

    billingHelpPopup
        .querySelectorAll(".billing-help-card")
        .forEach(item => {
            item.classList.remove("selected");
        });

    document.getElementById("billingHelpMessage").value = "";

});

billingHelpPopup.addEventListener("click", (e) => {

    if (e.target === billingHelpPopup) {

        billingHelpPopup.style.display = "none";

    }

});
  // ==========================================
// BILLING HELP
// ==========================================

billingHelpPopup
    .querySelectorAll(".billing-help-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            billingHelpPopup
                .querySelectorAll(".billing-help-card")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            card.classList.add("selected");

        });

    });

document.getElementById("submitBillingHelp")
    .addEventListener("click", () => {

        const selectedHelp =
            billingHelpPopup.querySelector(
                ".billing-help-card.selected"
            );

        if (!selectedHelp) {

            showWarning(
                "Select a Help Topic",
                "Please select the billing problem you need help with."
            );

            return;
        }

        const helpTitle =
            selectedHelp.querySelector("strong")
                .textContent
                .trim();

        const message =
            document.getElementById("billingHelpMessage")
                .value
                .trim();

        const guestName =
            localStorage.getItem("guestName") || "Guest";

        billingHelpPopup.style.display = "none";

        selectedHelp.classList.remove("selected");

        document.getElementById("billingHelpMessage").value = "";

        const btn =
            document.getElementById("submitBillingHelp");

        showLoading("Sending Billing Help...", () => {

            addRequest(
                "❓ Billing Help",
                `${helpTitle}${message ? " — " + message : ""}`
            );

            showNotification(
                "❓",
                "Billing Help",
                "Your billing help request has been received."
            );

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Your billing help request has been received.",
                "Reception will assist you shortly."
            );

        }, btn);

    });
  
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

const selectedTitle =
selectedItems[0].querySelector(".title").textContent.trim();

if (selectedTitle === "Late Checkout") {

    billingPopup.style.display = "none";

    clearSelections(
        billingPopup,
        ".service-option"
    );

    lateCheckoutPopup.style.display = "flex";

    return;

}
  if (selectedTitle === "Billing Help") {

    billingPopup.style.display = "none";

    clearSelections(
        billingPopup,
        ".service-option"
    );

    billingHelpPopup.style.display = "flex";

    return;
}

  if (selectedTitle === "Receipt") {

    billingPopup.style.display = "none";

    clearSelections(
        billingPopup,
        ".service-option"
    );

    receiptPopup.style.display = "flex";

    return;
}
  
if (selectedTitle === "Make Payment") {

    billingPopup.style.display = "none";

    clearSelections(billingPopup, ".service-option");

    paymentPopup.style.display = "flex";

    return;

}

  if (selectedTitle === "Current Bill") {

    billingPopup.style.display = "none";

    clearSelections(
        billingPopup,
        ".service-option"
    );

    currentBillPopup.style.display = "flex";

    return;
}

  if (selectedTitle === "Exchange") {

    billingPopup.style.display = "none";

    clearSelections(
        billingPopup,
        ".service-option"
    );

    exchangePopup.style.display = "flex";

    return;
}
    const guestName = localStorage.getItem("guestName") || "Guest";

    clearSelections(billingPopup, ".service-option");

billingPopup.style.display = "none";

const btn = document.getElementById("sendBillingRequest");

showLoading("Processing Billing Request...", () => {

  addRequest("💳 Billing", "Processing");

  showNotification(
    "💳",
    "Billing",
    "Your billing request has been received."
);

    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your billing request has been received.",
        "Estimated response: 5–10 minutes"
    );

}, btn);

  });

// ==========================================
// PAYMENT POPUP
// ==========================================

closePayment.addEventListener("click", () => {

    clearSelections(paymentPopup, ".payment-card");

    paymentPopup.style.display = "none";

});

paymentPopup.addEventListener("click", (e) => {

    if (e.target === paymentPopup) {

        clearSelections(paymentPopup, ".payment-card");

        paymentPopup.style.display = "none";

    }

});

paymentPopup.querySelectorAll(".payment-card").forEach(card => {

    card.addEventListener("click", () => {

        paymentPopup.querySelectorAll(".payment-card").forEach(item => {

            item.classList.remove("selected");

        });

        card.classList.add("selected");

        const paymentMethod =
            card.querySelector("strong").textContent.trim();

        if (paymentMethod === "Mobile Money") {

            paymentPopup.style.display = "none";

            mobileMoneyPopup.style.display = "flex";

        }
      if (paymentMethod === "Card Payment") {

    paymentPopup.style.display = "none";

    clearSelections(paymentPopup, ".payment-card");

    cardPaymentPopup.style.display = "flex";

}

      if (paymentMethod === "Pay at Reception") {

    paymentPopup.style.display = "none";

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    document.getElementById("receptionPaymentGuest").textContent =
        guestName;

    receptionPaymentPopup.style.display = "flex";

}
    });

});

  // ==========================================
// MOBILE MONEY POPUP
// ==========================================

const mobileMoneyPopup =
    document.getElementById("mobileMoneyPopup");

const closeMobileMoney =
    document.querySelector(".closeMobileMoney");

const mobileMoneyInstructions =
    document.getElementById("mobileMoneyInstructions");

closeMobileMoney.addEventListener("click", () => {

    clearSelections(
        mobileMoneyPopup,
        ".mobile-money-card"
    );

    mobileMoneyInstructions.style.display = "none";

    mobileMoneyPopup.style.display = "none";

});

mobileMoneyPopup.addEventListener("click", (e) => {

    if (e.target === mobileMoneyPopup) {

        clearSelections(
            mobileMoneyPopup,
            ".mobile-money-card"
        );

        mobileMoneyInstructions.style.display = "none";

        mobileMoneyPopup.style.display = "none";

    }

});

mobileMoneyPopup
    .querySelectorAll(".mobile-money-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            mobileMoneyPopup
                .querySelectorAll(".mobile-money-card")
                .forEach(item => {

                    item.classList.remove("selected");

                });

            card.classList.add("selected");

            mobileMoneyInstructions.style.display = "block";

            const network =
                card.querySelector("strong")
                    .textContent
                    .trim();

            if (network === "MTN Mobile Money") {

                document.getElementById(
                    "mobileMoneyGuide"
                ).innerHTML =
                    "Dial <strong>*165#</strong>, choose Payments, Merchant Payment, enter the merchant code, confirm the lodge name, and complete your payment.";

            } else {

                document.getElementById(
                    "mobileMoneyGuide"
                ).innerHTML =
                    "Dial <strong>*185#</strong>, choose Payments, Merchant Payment, enter the merchant code, confirm the lodge name, and complete your payment.";

            }

        });

    });

  // ==========================================
// MOBILE MONEY PAYMENT SUBMISSION
// ==========================================

document.getElementById("submitMobileMoney").addEventListener("click", () => {

    const selectedNetwork =
        mobileMoneyPopup.querySelector(".mobile-money-card.selected");

    const phone =
        document.getElementById("paymentPhone").value.trim();

    const transactionId =
        document.getElementById("transactionId").value.trim();

    const accountName =
        document.getElementById("paymentAccountName").value.trim();

    // Check network
    if (!selectedNetwork) {

        showWarning(
            "Select Mobile Network",
            "Please select MTN Mobile Money or Airtel Money."
        );

        return;
    }

    // Check payment number
    if (phone === "") {

        showWarning(
            "Payment Number Required",
            "Please enter the number you used to make the payment."
        );

        return;
    }

    // Check transaction ID
    if (transactionId === "") {

        showWarning(
            "Transaction ID Required",
            "Please enter your mobile money transaction ID."
        );

        return;
    }

    // Check account name
    if (accountName === "") {

        showWarning(
            "Account Name Required",
            "Please enter the name registered on the mobile money account."
        );

        return;
    }

    const network =
        selectedNetwork.querySelector("strong").textContent.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitMobileMoney");

    showLoading("Submitting Payment Details...", () => {

        addRequest(
            `📱 ${network} Payment`,
            "Verification"
        );

        showNotification(
            "📱",
            "Payment Submitted",
            "Your payment details have been sent to reception for verification."
        );

        mobileMoneyPopup.style.display = "none";

        clearSelections(
            mobileMoneyPopup,
            ".mobile-money-card"
        );

        mobileMoneyInstructions.style.display = "none";

        document.getElementById("paymentPhone").value = "";
        document.getElementById("transactionId").value = "";
        document.getElementById("paymentAccountName").value = "";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your mobile money payment details have been received.",
            "Reception will verify your payment and update you shortly."
        );

    }, btn);

});
  
// ==========================================
// CARD PAYMENT POPUP
// ==========================================

const cardPaymentPopup =
    document.getElementById("cardPaymentPopup");

const closeCardPayment =
    document.querySelector(".closeCardPayment");

closeCardPayment.addEventListener("click", () => {

    cardPaymentPopup.style.display = "none";

});

cardPaymentPopup.addEventListener("click", (e) => {

    if (e.target === cardPaymentPopup) {

        cardPaymentPopup.style.display = "none";

    }

});

  // ==========================================
// PAY AT RECEPTION POPUP
// ==========================================

const receptionPaymentPopup =
    document.getElementById("receptionPaymentPopup");

const closeReceptionPayment =
    document.querySelector(".closeReceptionPayment");

closeReceptionPayment.addEventListener("click", () => {

    receptionPaymentPopup.style.display = "none";

});

receptionPaymentPopup.addEventListener("click", (e) => {

    if (e.target === receptionPaymentPopup) {

        receptionPaymentPopup.style.display = "none";

    }

});

document.getElementById("requestReceptionPayment")
    .addEventListener("click", () => {

        const guestName =
            localStorage.getItem("guestName") || "Guest";

        const btn =
            document.getElementById("requestReceptionPayment");

        showLoading("Contacting Reception...", () => {

            addRequest(
                "🏨 Payment at Reception",
                "Waiting"
            );

            showNotification(
                "🏨",
                "Reception",
                "Reception has received your payment request."
            );

            receptionPaymentPopup.style.display = "none";

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Reception has received your payment request.",
                "Please visit the reception desk when you are ready to pay."
            );

        }, btn);

    });

/* ==========================================
   LATE CHECKOUT POPUP
========================================== */

const lateCheckoutPopup =
    document.getElementById("lateCheckoutPopup");

const closeLateCheckout =
    document.querySelector(".closeLateCheckout");

closeLateCheckout.addEventListener("click", () => {

    lateCheckoutPopup.style.display = "none";

});

lateCheckoutPopup.addEventListener("click", (e) => {

    if (e.target === lateCheckoutPopup) {

        lateCheckoutPopup.style.display = "none";

    }

});

  // ==========================================
// LATE CHECKOUT REQUEST
// ==========================================

document.getElementById("submitLateCheckout").addEventListener("click", () => {

    const extraTime =
        document.getElementById("extraCheckoutTime").value;

    const reason =
        document.getElementById("lateCheckoutReason").value.trim();

    // Check extra time
    if (extraTime === "") {

        showWarning(
            "Select Extra Time",
            "Please choose how much additional time you need."
        );

        return;
    }

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitLateCheckout");

    showLoading("Sending Late Checkout Request...", () => {

        addRequest(
            `🕒 Late Checkout - ${extraTime}`,
            "Waiting"
        );

        showNotification(
            "🕒",
            "Late Checkout",
            "Your late checkout request has been sent to reception."
        );

        lateCheckoutPopup.style.display = "none";

        document.getElementById("extraCheckoutTime").value = "";
        document.getElementById("lateCheckoutReason").value = "";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your late checkout request has been received.",
            "Reception will confirm availability and any additional charge shortly."
        );

    }, btn);

});
 
// ==========================================
// CAMPFIRE REQUEST
// ==========================================

document.getElementById("sendCampfireRequest").addEventListener("click", () => {

    const type = document.getElementById("campfireType").value;
    const date = document.getElementById("campfireDate").value;
    const time = document.getElementById("campfireTime").value;
    const guests = document.getElementById("campfireGuests").value;

    if (type === "" || date === "" || time === "" || guests === "") {

        showWarning(
            "Incomplete Information",
            "Please complete the campfire type, date, time, and number of guests."
        );

        return;

    }

    const guestName =
        document.getElementById("campfireName").value || "Guest";

    const btn =
        document.getElementById("sendCampfireRequest");

    showLoading("Preparing Your Campfire...", () => {

        addRequest(
            "🔥 Campfire Experience",
            "Waiting"
        );

        showNotification(
            "🔥",
            "Camp Activities",
            "Your campfire reservation has been received."
        );

        campfirePopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your campfire reservation has been received.",
            "Our activities team will confirm the arrangements shortly."
        );

    }, btn);

});

  // ==========================================
// SPA REQUEST
// ==========================================

document.getElementById("sendSpaRequest").addEventListener("click", () => {

    const service = document.getElementById("spaService").value;
    const date = document.getElementById("spaDate").value;
    const time = document.getElementById("spaTime").value;
    const guests = document.getElementById("spaGuests").value;

    if (service === "" || date === "" || time === "" || guests === "") {

        showWarning(
            "Incomplete Information",
            "Please complete the treatment, date, time, and number of guests."
        );

        return;

    }

    const guestName =
        document.getElementById("spaName").value || "Guest";

    const btn =
        document.getElementById("sendSpaRequest");

    showLoading("Preparing Your Spa Experience...", () => {

        addRequest(
            "💆 Spa & Wellness",
            "Waiting"
        );

        showNotification(
            "💆",
            "Spa & Wellness",
            "Your spa request has been received."
        );

        spaPopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your spa request has been received.",
            "Our wellness team will confirm your appointment shortly."
        );

    }, btn);

});

  // ==========================================
// NATURE WALK REQUEST
// ==========================================

document.getElementById("sendNatureWalkRequest").addEventListener("click", () => {

    const selectedWalk =
        natureWalkPopup.querySelector(".nature-card.selected");

    const date = document.getElementById("natureWalkDate").value;
    const time = document.getElementById("natureWalkTime").value;
    const guests = document.getElementById("natureWalkGuests").value;

    if (!selectedWalk || date === "" || time === "" || guests === "") {

        showWarning(
            "Incomplete Information",
            "Please select a nature experience and complete the date, time, and number of guests."
        );

        return;

    }

    const walkName =
        selectedWalk.querySelector("strong").textContent.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("sendNatureWalkRequest");

    showLoading("Arranging Your Nature Walk...", () => {

        addRequest(
            "🌿 Forest Nature Walk",
            "Waiting"
        );

        showNotification(
            "🌿",
            "Nature Activities",
            `${walkName} request has been received.`
        );

        natureWalkPopup.style.display = "none";

        clearSelections(natureWalkPopup, ".nature-card");

        showConfirmation(
            `Thank you, ${guestName}!`,
            `${walkName} has been requested.`,
            "Our nature activities team will confirm the arrangements shortly."
        );

    }, btn);

});
  
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

// Get the selected activity
const selectedTitle = selectedItems[0].querySelector(".title").textContent.trim();

if (selectedTitle.includes("Campfire")) {
  
    explorePopup.style.display = "none";

    clearSelections(explorePopup, ".service-option");

    document.getElementById("campfireName").value =
        localStorage.getItem("guestName") || "";

    campfirePopup.style.display = "flex";

    return;

}

  if (selectedTitle.includes("Spa")) {

    explorePopup.style.display = "none";

    clearSelections(explorePopup, ".service-option");

    document.getElementById("spaName").value =
        localStorage.getItem("guestName") || "";

    spaPopup.style.display = "flex";

    return;

}

  if (selectedTitle.includes("Forest Nature Walk")) {

    explorePopup.style.display = "none";

    clearSelections(explorePopup, ".service-option");

    natureWalkPopup.style.display = "flex";

    return;

}

const guestName = localStorage.getItem("guestName") || "Guest";

clearSelections(explorePopup, ".service-option");

explorePopup.style.display = "none";
  
const btn = document.getElementById("bookActivity");

showLoading("Booking Your Activity...", () => {

  addRequest("🗺️ Explore", "Booking");

  showNotification(
    "🗺️",
    "Explore",
    "Your activity booking has been received."
);
    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your booking request has been received.",
        "Our activities team will contact you shortly."
    );

}, btn);

  });
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

  addRequest("⭐ Feedback", "Submitted");

  showNotification(
    "⭐",
    "Feedback",
    "Thank you for sharing your feedback."
);
    showConfirmation(
        `Thank you, ${guestName}!`,
        "We appreciate your feedback.",
        "Your comments help us improve."
    );

}, btn);

  });


  // ==========================================
// GREETING
// ==========================================

function updateGreeting(){

    const hour = new Date().getHours();

    let greeting = "";

    if(hour < 12){

        greeting = "☀️ Good Morning";

    }else if(hour < 18){

        greeting = "🌿 Good Afternoon";

    }else{

        greeting = "🌙 Good Evening";

    }

    document.getElementById("weatherTemp").textContent = greeting;

}

updateGreeting();
  
// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    const now = new Date();

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });

}

updateClock();

setInterval(updateClock,1000);

// ==========================================
// CLOSE CONFIRMATION
// ==========================================

const closeConfirmation = document.getElementById("closeConfirmation");

closeConfirmation.addEventListener("click", () => {

    document.getElementById("orderConfirmation").style.display = "none";

});

});
