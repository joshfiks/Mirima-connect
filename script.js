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

        typingText.textContent = "";

        let i = 0;

      typingSound.currentTime = 0;
typingSound.loop = true;
try { typingSound.play(); } catch (e) {}

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

            background.classList.remove("day");
            // Night lake
            setBackgroundImage("images/lake-night.png", true);

        }else{

            background.classList.remove("day");
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
