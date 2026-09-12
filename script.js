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

<div class="menuItem"
     data-time="20–25"
     data-image="images/menu/full-english-breakfast.png">
    🍽️ Full English Breakfast
    <small>(20–25 min)</small>
</div>

<div class="menuItem"
     data-time="15–20"
     data-image="images/menu/pancakes-honey.png">
    🥞 Pancakes & Honey
    <small>(15–20 min)</small>
</div>

<div class="menuItem"
     data-time="10–15"
     data-image="images/menu/chefs-omelette.png">
    🍳 Chef's Omelette
    <small>(10–15 min)</small>
</div>

<div class="menuItem"
     data-time="5–8"
     data-image="images/menu/tropical-fruit-platter.png">
    🍉 Fresh Tropical Fruit Platter
    <small>(5–8 min)</small>
</div>

<div class="menuItem"
     data-time="20–25"
     data-image="images/menu/african-breakfast.png">
    🥣 African Breakfast
    <small>(20–25 min)</small>
</div>

<h3>🍽️ Main Meals</h3>

<div class="menuItem"
     data-time="25–30"
     data-image="images/menu/nile-tilapia.png">
    🐟 Grilled Nile Tilapia <small>(25–30 min)</small>
</div>

<div class="menuItem"
     data-time="25–30"
     data-image="images/menu/roast-chicken.png">
    🍗 Roast Chicken <small>(25–30 min)</small>
</div>

<div class="menuItem"
     data-time="30–35"
     data-image="images/menu/beef-fillet.png">
    🥩 Beef Fillet <small>(30–35 min)</small>
</div>

<div class="menuItem"
     data-time="35–45"
     data-image="images/menu/goat-muchomo.png">
    🍖 Goat Muchomo <small>(35–45 min)</small>
</div>

<div class="menuItem"
     data-time="20–25"
     data-image="images/menu/vegetarian-curry.png">
    🥬 Vegetarian Curry <small>(20–25 min)</small>
</div>

<h3>🥗 Light Meals</h3>

<div class="menuItem"
     data-time="10–15"
     data-image="images/menu/club-sandwich.png">
    🥪 Club Sandwich <small>(10–15 min)</small>
</div>

<div class="menuItem"
     data-time="5–10"
     data-image="images/menu/garden-salad.png">
    🥗 Garden Salad <small>(5–10 min)</small>
</div>

<div class="menuItem"
     data-time="10–15"
     data-image="images/menu/french-fries.png">
    🍟 French Fries <small>(10–15 min)</small>
</div>

<div class="menuItem"
     data-time="20–25"
     data-image="images/menu/chefs-pizza.png">
    🍕 Chef's Pizza <small>(20–25 min)</small>
</div>


<h3>🥤 Drinks</h3>

<div class="menuItem"
     data-time="3–5"
     data-image="images/menu/fresh-passion-juice.png">
    🍹 Fresh Passion Juice <small>(3–5 min)</small>
</div>

<div class="menuItem"
     data-time="3–5"
     data-image="images/menu/fresh-mango-juice.png">
    🥭 Fresh Mango Juice <small>(3–5 min)</small>
</div>

<div class="menuItem"
     data-time="5–7"
     data-image="images/menu/african-tea.png">
    ☕ African Tea <small>(5–7 min)</small>
</div>

<div class="menuItem"
     data-time="2–4"
     data-image="images/menu/espresso.png">
    ☕ Espresso <small>(2–4 min)</small>
</div>

<div class="menuItem"
     data-time="4–6"
     data-image="images/menu/cappuccino.png">
    🥛 Cappuccino <small>(4–6 min)</small>
</div>

<div class="menuItem"
     data-time="0"
     data-image="images/menu/mineral-water.png">
    💧 Mineral Water <small>(Immediate)</small>
</div>


<h3>🍰 Desserts</h3>

<div class="menuItem"
     data-time="3–5"
     data-image="images/menu/chocolate-cake.png">
    🍰 Chocolate Cake <small>(3–5 min)</small>
</div>

<div class="menuItem"
     data-time="0"
     data-image="images/menu/vanilla-ice-cream.png">
    🍨 Vanilla Ice Cream <small>(Immediate)</small>
</div>

<div class="menuItem"
     data-time="5–8"
     data-image="images/menu/seasonal-fruit-salad.png">
    🍓 Seasonal Fruit Salad <small>(5–8 min)</small>
</div>

<h3>📝 Special Instructions</h3>

<textarea placeholder="Any allergies, dietary requirements or special requests?"></textarea>

<button id="placeOrder">Place Order</button>
`;

servicePopup.style.display = "flex";


/* ==========================================
   FOOD IMAGE PREVIEW
========================================== */

let foodPreview = servicePopup.querySelector(".foodPreview");

if (!foodPreview) {

    foodPreview = document.createElement("div");

    foodPreview.className = "foodPreview";

    foodPreview.innerHTML = `
        <img src="" alt="Food preview">
    `;

    servicePopup
        .querySelector(".popup-content")
        .appendChild(foodPreview);
}

const previewImage = foodPreview.querySelector("img");


/* ==========================================
   PRELOAD FOOD IMAGES
========================================== */

popupBody
    .querySelectorAll(".menuItem[data-image]")
    .forEach(item => {

        const preloadImage = new Image();

        preloadImage.src = item.dataset.image;

    });
/* ==========================================
   MENU ITEM SELECTION
   — ONE ITEM PER ORDER
========================================== */

popupBody
    .querySelectorAll(".menuItem")
    .forEach(item => {

        item.addEventListener("click", event => {

            /*
             * Mobile preview click should not
             * interfere with selection.
             */

            if (window.innerWidth <= 650) {
                event.stopPropagation();
            }


            /*
             * Remove selection from all
             * other menu items.
             */

            popupBody
                .querySelectorAll(".menuItem.selected")
                .forEach(selectedItem => {

                    if (selectedItem !== item) {

                        selectedItem.classList.remove("selected");

                   }

               });
          

           /*
 * Toggle selection.
 * Clicking the selected item again
 * will deselect it.
 */

if (item.classList.contains("selected")) {

    item.classList.remove("selected");

} else {

    item.classList.add("selected");

}
            /*
             * Show its image immediately.
             */

            if (item.dataset.image) {

                previewImage.src =
                    item.dataset.image;

                foodPreview.classList.add("show");

            }

        });

    });


/* ==========================================
   DESKTOP — HOVER PREVIEW
========================================== */

popupBody
    .querySelectorAll(".menuItem[data-image]")
    .forEach(item => {

        item.addEventListener("mouseenter", () => {

            if (window.innerWidth <= 650) return;

            previewImage.src =
                item.dataset.image;

            const rect =
                item.getBoundingClientRect();

            foodPreview.style.left =
                `${rect.right + 18}px`;

            foodPreview.style.top =
                `${rect.top + (rect.height / 2) - 90}px`;

            foodPreview.classList.add("show");

        });


        item.addEventListener("mouseleave", () => {

            if (window.innerWidth <= 650) return;

            foodPreview.classList.remove("show");

        });

    });


/* ==========================================
   PLACE ORDER
========================================== */

document
    .getElementById("placeOrder")
    .addEventListener("click", () => {


        /* --------------------------------------
           CHECK SELECTED ITEM
        -------------------------------------- */

        const selectedItems =
            popupBody.querySelectorAll(
                ".menuItem.selected"
            );


        if (selectedItems.length === 0) {

            showWarning(
                "No Menu Item Selected",
                "Please choose a menu item before placing your order."
            );

            return;
        }


        /* --------------------------------------
           ORDER LIMIT
           Maximum 2 orders
        -------------------------------------- */

        const orderHistory =
            JSON.parse(
                localStorage.getItem(
                    "roomServiceOrders"
                ) || "[]"
            );


        const now = Date.now();


        /*
         * Remove orders older than the
         * current session limit window.
         */

        const recentOrders =
            orderHistory.filter(order => {

                return now - order.time <
                    24 * 60 * 60 * 1000;

            });


        /* --------------------------------------
           MAXIMUM 2 ORDERS
        -------------------------------------- */

        if (recentOrders.length >= 2) {

            showWarning(
                "Order Limit Reached",
                "You cannot place more than two Room Service orders within 24 hours."
            );

            return;
        }


        /* --------------------------------------
           10 MINUTE WAITING PERIOD
        -------------------------------------- */

        if (recentOrders.length > 0) {

            const lastOrder =
                recentOrders[recentOrders.length - 1];

            const tenMinutes =
                10 * 60 * 1000;

            const timePassed =
                now - lastOrder.time;


            if (timePassed < tenMinutes) {

                const remaining =
                    Math.ceil(
                        (tenMinutes - timePassed)
                        / 60000
                    );


                showWarning(
                    "Please Wait",
                    `Please wait ${remaining} minute${remaining === 1 ? "" : "s"} before placing another Room Service order.`
                );

                return;
            }

        }


        /* --------------------------------------
           GUEST INFORMATION
        -------------------------------------- */

        const guestName =
            localStorage.getItem("guestName")
            || "Guest";


        /* --------------------------------------
           PREPARATION TIME
        -------------------------------------- */

        let estimate =
            "5–10 minutes";

        let longest = 0;

        let estimateText =
            "5–10";


        selectedItems.forEach(item => {

            const time =
                item.dataset.time;


            if (time === "0") return;


            const highest =
                parseInt(
                    time.split("–")[1]
                );


            if (highest > longest) {

                longest = highest;

                estimateText = time;

            }

        });


        estimate =
            longest === 0
                ? "Immediate"
                : estimateText + " minutes";


        /* --------------------------------------
           SAVE ORDER TIME
        -------------------------------------- */

        recentOrders.push({

            time: now,

            item:
                selectedItems[0].textContent
                    .trim()

        });


        localStorage.setItem(
            "roomServiceOrders",
            JSON.stringify(recentOrders)
        );


        /* --------------------------------------
           CLOSE POPUP
        -------------------------------------- */

        servicePopup.style.display =
            "none";


        foodPreview.classList.remove(
            "show"
        );


        /* --------------------------------------
           EXISTING LOADING SYSTEM
        -------------------------------------- */

        const btn =
            document.getElementById(
                "placeOrder"
            );


showLoading(
    "Contacting Room Service...",
    () => {

        const orderedItem =
            selectedItems[0].textContent
                .trim()
                .replace(/\s*\([^)]*\)/g, "")
                .trim();

        const estimatedMinutes =
            longest === 0 ? 0 : longest;

        addRequest(
            "🍽️ Room Service",
            "Preparing",
            `Order: ${orderedItem}`,
            estimatedMinutes
        );

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

    },
    btn
);

      

/* ==========================================
   CLOSE POPUP
========================================== */

closePopup.addEventListener("click", () => {

    clearSelections(
        servicePopup,
        ".menuItem"
    );

    foodPreview.classList.remove(
        "show"
    );

    servicePopup.style.display =
        "none";

});


/* ==========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================== */

servicePopup.addEventListener("click", e => {

    if (e.target === servicePopup) {

        clearSelections(
            servicePopup,
            ".menuItem"
        );

        foodPreview.classList.remove(
            "show"
        );

        servicePopup.style.display =
            "none";

    }

});

});
  
// ==========================================
// RECEPTION POPUP
// ==========================================

receptionCard.addEventListener("click", () => {

    receptionPopup.style.display = "flex";

});

receptionPopup.querySelectorAll(".service-option").forEach(item => {

    item.addEventListener("click", () => {

        // Remove selection from other cards
        receptionPopup
            .querySelectorAll(".service-option.selected")
            .forEach(selectedItem => {

                if (selectedItem !== item) {
                    selectedItem.classList.remove("selected");
                }

            });


        // Toggle this card
        if (item.classList.contains("selected")) {

            item.classList.remove("selected");

        } else {

            item.classList.add("selected");

        }

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

    // Return to Reception
    receptionPopup.style.display = "flex";

});


transferPopup.addEventListener("click", (e) => {

    if (e.target === transferPopup) {

        clearSelections(transferPopup, ".service-option");

        transferPopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

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

    // Return to Reception
    receptionPopup.style.display = "flex";

});


luggagePopup.addEventListener("click", (e) => {

    if (e.target === luggagePopup) {

        luggagePopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

    }

});

// ==========================================
// LUGGAGE ASSISTANCE REQUEST
// ==========================================

document.getElementById("submitLuggage")
.addEventListener("click", () => {

    const luggageService =
        document.getElementById("luggageService").value.trim();

    const luggageLocation =
        document.getElementById("luggageLocation").value.trim();

    const luggageTime =
        document.getElementById("luggageTime").value.trim();

    const luggageMessage =
        document.getElementById("luggageMessage").value.trim();


    // ==========================================
    // CHECK REQUIRED INFORMATION
    // ==========================================

    if (
        !luggageService ||
        !luggageLocation ||
        !luggageTime
    ) {

        showWarning(
            "Incomplete Information",
            "Please fill in all required information before you continue."
        );

        return;
    }


    // ==========================================
    // CHECK COTTAGE / ROOM NUMBER
    // ONLY COTTAGES 1–12 ARE VALID
    // ==========================================

    const roomNumber = Number(luggageLocation);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        return;
    }


    // ==========================================
    // CHECK TIME
    // MUST BE AT LEAST 10 MINUTES FROM NOW
    // ==========================================

    const now = new Date();

    const currentMinutes =
        (now.getHours() * 60) + now.getMinutes();

    const [hours, minutes] =
        luggageTime.split(":").map(Number);

    const selectedMinutes =
        (hours * 60) + minutes;


    if (selectedMinutes < currentMinutes + 10) {

        showWarning(
            "Invalid Preferred Time",
            "Please select a time that is at least 10 minutes from now."
        );

        return;
    }


    // ==========================================
    // ALL INFORMATION IS VALID
    // ==========================================

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitLuggage");


    // ==========================================
    // CLEAR FORM AFTER SUCCESSFUL REQUEST
    // ==========================================

    const clearLuggageForm = () => {

        document.getElementById("luggageService").value = "";
        document.getElementById("luggageLocation").value = "";
        document.getElementById("luggageTime").value = "";
        document.getElementById("luggageMessage").value = "";

    };


    showLoading(
        "Requesting Luggage Assistance...",
        () => {

            addRequest(
                "🧳 Luggage Assistance",
                `${luggageService} — Cottage ${luggageLocation} — ${luggageTime}${luggageMessage ? " — " + luggageMessage : ""}`
            );

            showNotification(
                "🧳",
                "Luggage Assistance",
                "Your luggage assistance request has been received."
            );

            clearLuggageForm();

            luggagePopup.style.display = "none";

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Your luggage assistance request has been received.",
                "Our reception team will assist you shortly."
            );

        },
        btn
    );

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

    // Return to Reception
    receptionPopup.style.display = "flex";

});


maintenancePopup.addEventListener("click", (e) => {

    if (e.target === maintenancePopup) {

        maintenancePopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

    }

});

// ==========================================
// MAINTENANCE REQUEST
// ==========================================

document.getElementById("submitMaintenance")
.addEventListener("click", () => {

    const maintenanceType =
        document.getElementById("maintenanceType").value.trim();

    const maintenanceLocation =
        document.getElementById("maintenanceLocation").value.trim();

    const maintenancePriority =
        document.getElementById("maintenancePriority").value.trim();

    const maintenanceMessage =
        document.getElementById("maintenanceMessage").value.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitMaintenance");


    // ==========================================
    // VALIDATE REQUIRED INFORMATION
    // ==========================================

    if (
        !maintenanceType ||
        !maintenanceLocation ||
        !maintenanceMessage
    ) {

        showWarning(
            "Incomplete Information",
            "Please fill in all required information before you continue."
        );

        return;
    }


    // ==========================================
    // CHECK COTTAGE / ROOM NUMBER
    // ONLY COTTAGES 1–12 ARE VALID
    // ==========================================

    const roomNumber =
        Number(maintenanceLocation);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        return;
    }


    // ==========================================
    // ALL INFORMATION IS VALID
    // ==========================================

    maintenancePopup.style.display = "none";


    showLoading(
        "Sending Maintenance Request...",
        () => {

            addRequest(
                "🔧 Maintenance Request",
                `${maintenanceType} — Cottage ${maintenanceLocation} — ${maintenancePriority} — ${maintenanceMessage}`
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

        },
        btn
    );

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

    // Return to Reception
    receptionPopup.style.display = "flex";

});


extendStayPopup.addEventListener("click", (e) => {

    if (e.target === extendStayPopup) {

        extendStayPopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

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


    // ==========================================
    // CHECK REQUIRED INFORMATION
    // ==========================================

    if (!newCheckoutDate || !additionalNights) {

        showWarning(
            "Incomplete Information",
            "Please select a new checkout date and enter the number of additional nights."
        );

        return;
    }


    // ==========================================
    // CHECK CHECKOUT DATE
    // DATE CANNOT BE BEFORE TODAY
    // ==========================================

    const today = new Date();

    const todayYear =
        today.getFullYear();

    const todayMonth =
        String(today.getMonth() + 1).padStart(2, "0");

    const todayDay =
        String(today.getDate()).padStart(2, "0");

    const todayString =
        `${todayYear}-${todayMonth}-${todayDay}`;


    if (newCheckoutDate < todayString) {

        showWarning(
            "Invalid Checkout Date",
            "Please select today or a future date for your new checkout."
        );

        return;
    }


    // ==========================================
    // CHECK ADDITIONAL NIGHTS
    // MUST BE AT LEAST 1
    // ==========================================

    const nights =
        Number(additionalNights);

    if (
        !Number.isInteger(nights) ||
        nights < 1
    ) {

        showWarning(
            "Invalid Number of Nights",
            "Please enter at least 1 additional night."
        );

        return;
    }


    // ==========================================
    // ALL INFORMATION IS VALID
    // ==========================================

    const btn =
        document.getElementById("submitExtendStay");

    extendStayPopup.style.display = "none";


    showLoading(
        "Sending Extension Request...",
        () => {

            addRequest(
                "📅 Extend Stay",
                `${nights} additional night(s) — New checkout: ${newCheckoutDate}${message ? " — " + message : ""}`
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


            // ==========================================
            // CLEAR FORM AFTER SUCCESSFUL REQUEST
            // ==========================================

            document.getElementById("newCheckoutDate").value = "";
            document.getElementById("additionalNights").value = "";
            document.getElementById("extendStayMessage").value = "";

        },
        btn
    );

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

    // Return to Reception
    receptionPopup.style.display = "flex";

});


emergencyPopup.addEventListener("click", (e) => {

    if (e.target === emergencyPopup) {

        emergencyPopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

    }

});


// ==========================================
// EMERGENCY ASSISTANCE REQUEST
// ==========================================

document.getElementById("submitEmergency")
.addEventListener("click", () => {

    const emergencyType =
        document.getElementById("emergencyType").value.trim();

    const emergencyLocation =
        document.getElementById("emergencyLocation").value.trim();

    const emergencyMessage =
        document.getElementById("emergencyMessage").value.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";


    // ==========================================
    // EMERGENCY TYPE REQUIRED
    // ==========================================

    if (!emergencyType) {

        showWarning(
            "Select Emergency Type",
            "Please select the type of emergency."
        );

        return;
    }


    // ==========================================
    // COTTAGE / ROOM REQUIRED
    // ==========================================

    if (!emergencyLocation) {

        showWarning(
            "Location Required",
            "Please tell reception where the emergency is."
        );

        return;
    }


    // ==========================================
    // CHECK COTTAGE NUMBER
    // ONLY COTTAGES 1–12 ARE VALID
    // ==========================================

    const roomNumber =
        Number(emergencyLocation);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        return;
    }


    // ==========================================
    // DESCRIPTION REQUIRED
    // ==========================================

    if (!emergencyMessage) {

        showWarning(
            "Description Required",
            "Please describe what happened before you continue."
        );

        return;
    }

    // ==========================================
    // ALL INFORMATION IS VALID
    // ==========================================

    const btn =
        document.getElementById("submitEmergency");

    emergencyPopup.style.display = "none";


    showLoading(
        "Sending Emergency Alert...",
        () => {

            addRequest(
                "🚨 Emergency Assistance",
                `${emergencyType} — Cottage ${emergencyLocation} — ${emergencyMessage}`
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


            // ==========================================
            // CLEAR FORM AFTER SUCCESSFUL REQUEST
            // ==========================================

            document.getElementById("emergencyType").value = "";
            document.getElementById("emergencyLocation").value = "";
            document.getElementById("emergencyMessage").value = "";

        },
        btn
    );

});
  
 // ==========================================
// SPEAK TO RECEPTION POPUP
// ==========================================

const receptionChatPopup =
    document.getElementById("receptionChatPopup");

const closeReceptionChat =
    document.querySelector(".closeReceptionChat");


// ==========================================
// CLOSE SPEAK TO RECEPTION
// ==========================================

closeReceptionChat.addEventListener("click", () => {

    receptionChatPopup.style.display = "none";

    // Return to Reception
    receptionPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE SPEAK TO RECEPTION
// ==========================================

receptionChatPopup.addEventListener("click", (e) => {

    if (e.target === receptionChatPopup) {

        receptionChatPopup.style.display = "none";

        // Return to Reception
        receptionPopup.style.display = "flex";

    }

});


// ==========================================
// OTHER ASSISTANCE POPUP
// ==========================================

const otherAssistancePopup =
    document.getElementById("otherAssistancePopup");

const closeOtherAssistance =
    document.querySelector(".closeOtherAssistance");


// ==========================================
// CLOSE OTHER ASSISTANCE
// ==========================================

closeOtherAssistance.addEventListener("click", () => {

    otherAssistancePopup.style.display = "none";

    // Return to Speak to Reception
    receptionChatPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE OTHER ASSISTANCE
// ==========================================

otherAssistancePopup.addEventListener("click", (e) => {

    if (e.target === otherAssistancePopup) {

        otherAssistancePopup.style.display = "none";

        // Return to Speak to Reception
        receptionChatPopup.style.display = "flex";

    }

});

// ==========================================
// OTHER ASSISTANCE REQUEST
// ==========================================

document.getElementById("submitOtherAssistance")
.addEventListener("click", () => {

    const message =
        document.getElementById("otherAssistanceMessage").value.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitOtherAssistance");


    // ==========================================
    // VALIDATE DESCRIPTION
    // ==========================================

    if (!message) {

        showWarning(
            "Incomplete Information",
            "Please describe what you need before you continue."
        );

        return;
    }


    // ==========================================
    // ALL INFORMATION IS COMPLETE
    // ==========================================

    otherAssistancePopup.style.display = "none";


    showLoading(
        "Sending Assistance Request...",
        () => {

            addRequest(
                "🛎️ Other Assistance",
                message
            );

            showNotification(
                "🛎️",
                "Reception",
                "Your assistance request has been received."
            );

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Your assistance request has been received.",
                "Reception will assist you shortly."
            );


            // ==========================================
            // CLEAR MESSAGE AFTER SUCCESSFUL REQUEST
            // ==========================================

            document.getElementById("otherAssistanceMessage").value = "";

        },
        btn
    );

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

    // Return to Speak to Reception
    receptionChatPopup.style.display = "flex";

});


// ==========================================
// CLOSE FAQ WHEN CLICKING OUTSIDE
// ==========================================

receptionFAQPopup.addEventListener("click", (e) => {

    if (e.target === receptionFAQPopup) {

        receptionFAQPopup.style.display = "none";

        // Return to Speak to Reception
        receptionChatPopup.style.display = "flex";

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

    // Close Campfire
    campfirePopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});

campfirePopup.addEventListener("click", (e) => {

    if (e.target === campfirePopup) {

        // Close Campfire
        campfirePopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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

    // Return to Explore
    explorePopup.style.display = "flex";

});


// Close when clicking outside
restaurantBarPopup.addEventListener("click", (e) => {

    if (e.target === restaurantBarPopup) {

        restaurantBarPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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
// RESTAURANT & BAR CONTACT
// ==========================================

const restaurantContactButton =
    document.getElementById("restaurantContactButton");

const restaurantContactPopup =
    document.getElementById("restaurantContactPopup");

const closeRestaurantContact =
    document.querySelector(".closeRestaurantContact");

const callRestaurantButton =
    document.getElementById("callRestaurantButton");

const whatsappRestaurantButton =
    document.getElementById("whatsappRestaurantButton");


// ==========================================
// OPEN CONTACT
// ==========================================

restaurantContactButton.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";

    restaurantContactPopup.style.display = "flex";

});


// ==========================================
// CLOSE CONTACT — X
// ==========================================

closeRestaurantContact.addEventListener("click", () => {

    restaurantContactPopup.style.display = "none";

    restaurantBarPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE CONTACT
// ==========================================

restaurantContactPopup.addEventListener("click", (e) => {

    if (e.target === restaurantContactPopup) {

        restaurantContactPopup.style.display = "none";

        restaurantBarPopup.style.display = "flex";

    }

});


// ==========================================
// CALL RESTAURANT
// ==========================================

callRestaurantButton.addEventListener("click", () => {

    window.location.href = "tel:+256700894459";

});


// ==========================================
// WHATSAPP RESTAURANT
// ==========================================

whatsappRestaurantButton.addEventListener("click", () => {

    window.open(
        "https://wa.me/25742015605",
        "_blank"
    );

});
  
// ==========================================
// RESTAURANT MENU — COMPLETE FUNCTIONALITY
// ==========================================

const restaurantMenuPopup =
    document.getElementById("restaurantMenuPopup");

const closeRestaurantMenu =
    document.querySelector(".closeRestaurantMenu");

const restaurantMenuButton =
    document.getElementById("restaurantMenuButton");

const restaurantMenuItems =
    restaurantMenuPopup.querySelectorAll(".menu-item");

const orderFromRestaurant =
    document.getElementById("orderFromRestaurant");

const restaurantOrderConfirmPopup =
    document.getElementById("restaurantOrderConfirmPopup");

const closeRestaurantOrderConfirm =
    document.getElementById("closeRestaurantOrderConfirm");

const cancelRestaurantOrder =
    document.getElementById("cancelRestaurantOrder");

const confirmRestaurantOrder =
    document.getElementById("confirmRestaurantOrder");

const restaurantOrderDetails =
    document.getElementById("restaurantOrderDetails");

let selectedRestaurantMeal = null;


// ==========================================
// OPEN RESTAURANT MENU
// ==========================================

restaurantMenuButton.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";
    restaurantMenuPopup.style.display = "flex";

});


// ==========================================
// SELECT / DESELECT RESTAURANT MEAL
// ==========================================

restaurantMenuItems.forEach(item => {

    item.addEventListener("click", () => {

        // Deselect if the same meal is tapped again
        if (item.classList.contains("selected")) {

            item.classList.remove("selected");
            selectedRestaurantMeal = null;

            return;
        }

        // Remove selection from other meals
        restaurantMenuItems.forEach(menuItem => {
            menuItem.classList.remove("selected");
        });

        // Select this meal
        item.classList.add("selected");

        selectedRestaurantMeal = {
            name: item.querySelector("strong").textContent.trim(),
            description: item.querySelector("small").textContent.trim(),
            price: item.querySelector("span").textContent.trim()
        };

    });

});


// ==========================================
// CLOSE RESTAURANT MENU
// ==========================================

closeRestaurantMenu.addEventListener("click", () => {

    restaurantMenuItems.forEach(item => {
        item.classList.remove("selected");
    });

    selectedRestaurantMeal = null;

    restaurantMenuPopup.style.display = "none";
    restaurantBarPopup.style.display = "flex";

});
// ==========================================
// CLOSE RESTAURANT MENU OUTSIDE
// ==========================================

restaurantMenuPopup.addEventListener("click", (e) => {

    if (e.target === restaurantMenuPopup) {

        restaurantMenuItems.forEach(item => {
            item.classList.remove("selected");
        });

        selectedRestaurantMeal = null;

        // Close Restaurant Menu
        restaurantMenuPopup.style.display = "none";

        // Return to Restaurant & Bar
        restaurantBarPopup.style.display = "flex";

    }

});

// ==========================================
// ORDER FROM RESTAURANT
// ==========================================

orderFromRestaurant.addEventListener("click", () => {

    if (!selectedRestaurantMeal) {

        showWarning("Please select a meal first.");

        return;
    }

    restaurantOrderDetails.innerHTML = `
        <div class="restaurant-confirm-meal">

            <strong>${selectedRestaurantMeal.name}</strong>

            <small>
                ${selectedRestaurantMeal.description}
            </small>

            <span>
                ${selectedRestaurantMeal.price}
            </span>

        </div>
    `;

    restaurantMenuPopup.style.display = "none";
    restaurantOrderConfirmPopup.style.display = "flex";

});


// ==========================================
// CLOSE RESTAURANT CONFIRMATION
// ==========================================

closeRestaurantOrderConfirm.addEventListener("click", () => {

    restaurantOrderConfirmPopup.style.display = "none";
    restaurantMenuPopup.style.display = "flex";

});


// ==========================================
// CANCEL RESTAURANT ORDER
// ==========================================

cancelRestaurantOrder.addEventListener("click", () => {

    restaurantOrderConfirmPopup.style.display = "none";
    restaurantMenuPopup.style.display = "flex";

});


// ==========================================
// CONFIRM RESTAURANT ORDER
// ==========================================

confirmRestaurantOrder.addEventListener("click", () => {

    restaurantOrderConfirmPopup.style.display = "none";

    showLoading(
        "Sending Restaurant Order...",
        "Please wait while we notify the restaurant."
    );

    setTimeout(() => {

        addRequest(
            "Restaurant Order — " + selectedRestaurantMeal.name,
            "Pending"
        );

        showNotification(
            "Restaurant Order Sent",
            selectedRestaurantMeal.name +
            " has been sent to the restaurant."
        );

        showConfirmation(
            "Order Confirmed",
            "Your restaurant order has been successfully sent."
        );

        // Clear selection after successful order
        restaurantMenuItems.forEach(item => {
            item.classList.remove("selected");
        });

        selectedRestaurantMeal = null;

    }, 1200);

});


// ==========================================
// CLOSE RESTAURANT CONFIRMATION OUTSIDE
// ==========================================

restaurantOrderConfirmPopup.addEventListener("click", (e) => {

    if (e.target === restaurantOrderConfirmPopup) {

        restaurantOrderConfirmPopup.style.display = "none";
        restaurantMenuPopup.style.display = "flex";

    }

});


// ==========================================
// BAR MENU — COMPLETE FUNCTIONALITY
// ==========================================

const barMenuPopup =
    document.getElementById("barMenuPopup");

const closeBarMenu =
    document.querySelector(".closeBarMenu");

const barMenuButton =
    document.getElementById("barMenuButton");

const barMenuItems =
    barMenuPopup.querySelectorAll(".bar-item");

const orderFromBar =
    document.getElementById("orderFromBar");

const barOrderConfirmPopup =
    document.getElementById("barOrderConfirmPopup");

const closeBarOrderConfirm =
    document.getElementById("closeBarOrderConfirm");

const cancelBarOrder =
    document.getElementById("cancelBarOrder");

const confirmBarOrder =
    document.getElementById("confirmBarOrder");

const barOrderDetails =
    document.getElementById("barOrderDetails");

let selectedBarDrink = null;


// ==========================================
// OPEN BAR MENU
// ==========================================

barMenuButton.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";
    barMenuPopup.style.display = "flex";

});


// ==========================================
// SELECT / DESELECT BAR DRINK
// ==========================================

barMenuItems.forEach(item => {

    item.addEventListener("click", () => {

        // Deselect if the same drink is tapped again
        if (item.classList.contains("selected")) {

            item.classList.remove("selected");
            selectedBarDrink = null;

            return;
        }

        // Remove selection from other drinks
        barMenuItems.forEach(barItem => {
            barItem.classList.remove("selected");
        });

        // Select this drink
        item.classList.add("selected");

        selectedBarDrink = {
            name: item.querySelector("strong").textContent.trim(),
            description: item.querySelector("small").textContent.trim(),
            price: item.querySelector("span").textContent.trim()
        };

    });

});


// ==========================================
// CLOSE BAR MENU
// ==========================================

closeBarMenu.addEventListener("click", () => {

    barMenuItems.forEach(item => {
        item.classList.remove("selected");
    });

    selectedBarDrink = null;

    barMenuPopup.style.display = "none";
    restaurantBarPopup.style.display = "flex";

});

// ==========================================
// CLOSE BAR MENU OUTSIDE
// ==========================================

barMenuPopup.addEventListener("click", (e) => {

    if (e.target === barMenuPopup) {

        barMenuItems.forEach(item => {
            item.classList.remove("selected");
        });

        selectedBarDrink = null;

        // Close Bar Menu
        barMenuPopup.style.display = "none";

        // Return to Restaurant & Bar
        restaurantBarPopup.style.display = "flex";

    }

});

// ==========================================
// ORDER FROM BAR
// ==========================================

orderFromBar.addEventListener("click", () => {

    if (!selectedBarDrink) {

        showWarning("Please select a drink first.");

        return;
    }

    barOrderDetails.innerHTML = `
        <div class="bar-confirm-drink">

            <strong>${selectedBarDrink.name}</strong>

            <small>
                ${selectedBarDrink.description}
            </small>

            <span>
                ${selectedBarDrink.price}
            </span>

        </div>
    `;

    barMenuPopup.style.display = "none";
    barOrderConfirmPopup.style.display = "flex";

});


// ==========================================
// CLOSE BAR CONFIRMATION
// ==========================================

closeBarOrderConfirm.addEventListener("click", () => {

    barOrderConfirmPopup.style.display = "none";
    barMenuPopup.style.display = "flex";

});


// ==========================================
// CANCEL BAR ORDER
// ==========================================

cancelBarOrder.addEventListener("click", () => {

    barOrderConfirmPopup.style.display = "none";
    barMenuPopup.style.display = "flex";

});


// ==========================================
// CONFIRM BAR ORDER
// ==========================================

confirmBarOrder.addEventListener("click", () => {

    barOrderConfirmPopup.style.display = "none";

    showLoading(
        "Sending Bar Order...",
        "Please wait while we notify the bar."
    );

    setTimeout(() => {

        addRequest(
            "Bar Order — " + selectedBarDrink.name,
            "Pending"
        );

        showNotification(
            "Bar Order Sent",
            selectedBarDrink.name +
            " has been sent to the bar."
        );

        showConfirmation(
            "Order Confirmed",
            "Your bar order has been successfully sent."
        );

        // Clear selection after successful order
        barMenuItems.forEach(item => {
            item.classList.remove("selected");
        });

        selectedBarDrink = null;

    }, 1200);

});


// ==========================================
// CLOSE BAR CONFIRMATION OUTSIDE
// ==========================================

barOrderConfirmPopup.addEventListener("click", (e) => {

    if (e.target === barOrderConfirmPopup) {

        barOrderConfirmPopup.style.display = "none";
        barMenuPopup.style.display = "flex";

    }

});

// ==========================================
// ROOM DINING — COMPLETE FUNCTIONALITY
// ==========================================

const roomDiningButton = document.getElementById("roomDiningButton");
const roomDiningPopup = document.getElementById("roomDiningPopup");
const closeRoomDining = document.querySelector(".closeRoomDining");

const roomDiningMeal = document.getElementById("roomDiningMeal");
const roomDiningTime = document.getElementById("roomDiningTime");
const roomDiningNotes = document.getElementById("roomDiningNotes");
const sendRoomDiningRequest = document.getElementById("sendRoomDiningRequest");

// Confirmation popup
const roomDiningConfirmPopup =
    document.getElementById("roomDiningConfirmPopup");

const closeRoomDiningConfirm =
    document.getElementById("closeRoomDiningConfirm");

const cancelRoomDining =
    document.getElementById("cancelRoomDining");

const confirmRoomDining =
    document.getElementById("confirmRoomDining");

const roomDiningConfirmDetails =
    document.getElementById("roomDiningConfirmDetails");


// ==========================================
// OPEN ROOM DINING
// ==========================================

roomDiningButton.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";

    roomDiningPopup.style.display = "flex";

});

// ==========================================
// CLOSE ROOM DINING
// ==========================================

closeRoomDining.addEventListener("click", () => {

    roomDiningPopup.style.display = "none";

    roomDiningMeal.value = "";
    roomDiningTime.value = "";
    roomDiningNotes.value = "";

    // Return to Restaurant & Bar
    restaurantBarPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE ROOM DINING
// ==========================================

roomDiningPopup.addEventListener("click", (e) => {

    if (e.target === roomDiningPopup) {

        roomDiningPopup.style.display = "none";

        roomDiningMeal.value = "";
        roomDiningTime.value = "";
        roomDiningNotes.value = "";

        // Return to Restaurant & Bar
        restaurantBarPopup.style.display = "flex";

    }

});


// ==========================================
// REQUEST ROOM DINING
// ==========================================

sendRoomDiningRequest.addEventListener("click", () => {

    const meal = roomDiningMeal.value.trim();
    const deliveryTime = roomDiningTime.value;
    const notes = roomDiningNotes.value.trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (!meal) {

        showWarning("Please tell us what you would like to order.");

        roomDiningMeal.focus();

        return;
    }


    if (!deliveryTime) {

    showWarning(
        "Delivery Time Required",
        "Please select your preferred delivery time."
    );

    roomDiningTime.focus();

    return;
}

// ======================================
// VALIDATE DELIVERY TIME
// ======================================

const now = new Date();

const [hours, minutes] = deliveryTime.split(":").map(Number);

const currentMinutes =
    (now.getHours() * 60) + now.getMinutes();

const selectedMinutes =
    (hours * 60) + minutes;


// Must be at least 10 minutes from now
if (selectedMinutes < currentMinutes + 10) {

    showWarning(
        "Invalid Delivery Time",
        "Please select a delivery time that is at least 10 minutes from now."
    );

    roomDiningTime.focus();

    return;
}
  
    // ======================================
    // BUILD CONFIRMATION
    // ======================================

    roomDiningConfirmDetails.innerHTML = `

        <div class="room-dining-confirm-item">

            <small>MEAL REQUEST</small>

            <strong>${meal}</strong>

        </div>


        <div class="room-dining-confirm-item">

            <small>DELIVERY TIME</small>

            <strong>${deliveryTime}</strong>

        </div>


        ${
            notes
            ? `
                <div class="room-dining-confirm-item">

                    <small>SPECIAL REQUEST</small>

                    <strong>${notes}</strong>

                </div>
              `
            : `
                <div class="room-dining-confirm-item">

                    <small>SPECIAL REQUEST</small>

                    <strong>None</strong>

                </div>
              `
        }

    `;


    // ======================================
    // SHOW CONFIRMATION
    // ======================================

    roomDiningPopup.style.display = "none";

    roomDiningConfirmPopup.style.display = "flex";

});


// ==========================================
// CLOSE CONFIRMATION — X
// ==========================================

closeRoomDiningConfirm.addEventListener("click", () => {

    roomDiningConfirmPopup.style.display = "none";

    roomDiningPopup.style.display = "flex";

});


// ==========================================
// CANCEL CONFIRMATION
// ==========================================

cancelRoomDining.addEventListener("click", () => {

    roomDiningConfirmPopup.style.display = "none";

    roomDiningPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE CONFIRMATION
// ==========================================

roomDiningConfirmPopup.addEventListener("click", (e) => {

    if (e.target === roomDiningConfirmPopup) {

        roomDiningConfirmPopup.style.display = "none";

        roomDiningPopup.style.display = "flex";

    }

});


// ==========================================
// CONFIRM ROOM DINING REQUEST
// ==========================================

confirmRoomDining.addEventListener("click", () => {

    const meal = roomDiningMeal.value.trim();
    const deliveryTime = roomDiningTime.value;
    const notes = roomDiningNotes.value.trim();


    // Close confirmation
    roomDiningConfirmPopup.style.display = "none";


    // ======================================
    // SHOW LOADING
    // ======================================

    showLoading(
        "Sending Room Dining Request...",
        "Please wait while we notify the restaurant."
    );


    // ======================================
    // SEND REQUEST
    // ======================================

    setTimeout(() => {

        let requestName = "Room Dining Request";

        if (meal) {
            requestName += " — " + meal;
        }


        // Add to My Requests
        addRequest(requestName, "Pending");


        // Notification
        showNotification(
            "Room Dining Requested",
            "Your room dining request has been sent to the restaurant."
        );


        // ==================================
        // SUCCESS CONFIRMATION
        // ==================================

        showConfirmation(
            "Room Dining Request Sent",
            "Your request has been successfully sent to the restaurant."
        );


        // ==================================
        // CLEAR FORM
        // ==================================

        roomDiningMeal.value = "";
        roomDiningTime.value = "";
        roomDiningNotes.value = "";


        // Clear confirmation details
        roomDiningConfirmDetails.innerHTML = "";


    }, 1200);

});
  
// ==========================================
// RESTAURANT RESERVATION — COMPLETE FUNCTIONALITY
// ==========================================

const restaurantReservationPopup =
    document.getElementById("restaurantReservationPopup");

const closeRestaurantReservation =
    document.querySelector(".closeRestaurantReservation");

const restaurantReservationButton =
    document.getElementById("restaurantReservationButton");

const reservationDate =
    document.getElementById("reservationDate");

const reservationTime =
    document.getElementById("reservationTime");

const reservationGuests =
    document.getElementById("reservationGuests");

const reservationNotes =
    document.getElementById("reservationNotes");

const sendRestaurantReservation =
    document.getElementById("sendRestaurantReservation");


// ==========================================
// CONFIRMATION POPUP
// ==========================================

const restaurantReservationConfirmPopup =
    document.getElementById(
        "restaurantReservationConfirmPopup"
    );

const closeRestaurantReservationConfirm =
    document.getElementById(
        "closeRestaurantReservationConfirm"
    );

const cancelRestaurantReservation =
    document.getElementById(
        "cancelRestaurantReservation"
    );

const confirmRestaurantReservation =
    document.getElementById(
        "confirmRestaurantReservation"
    );

const restaurantReservationConfirmDetails =
    document.getElementById(
        "restaurantReservationConfirmDetails"
    );


// ==========================================
// OPEN RESERVATION
// ==========================================

restaurantReservationButton.addEventListener("click", () => {

    restaurantBarPopup.style.display = "none";

    restaurantReservationPopup.style.display = "flex";

});

// ==========================================
// CLOSE RESERVATION
// ==========================================

closeRestaurantReservation.addEventListener("click", () => {

    restaurantReservationPopup.style.display = "none";

    reservationDate.value = "";
    reservationTime.value = "";
    reservationGuests.value = "";
    reservationNotes.value = "";

    // Return to Restaurant & Bar
    restaurantBarPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE RESERVATION
// ==========================================

restaurantReservationPopup.addEventListener("click", (e) => {

    if (e.target === restaurantReservationPopup) {

        restaurantReservationPopup.style.display = "none";

        reservationDate.value = "";
        reservationTime.value = "";
        reservationGuests.value = "";
        reservationNotes.value = "";

        // Return to Restaurant & Bar
        restaurantBarPopup.style.display = "flex";

    }

});
  
// ==========================================
// REQUEST RESERVATION
// ==========================================

sendRestaurantReservation.addEventListener("click", () => {

    const date = reservationDate.value;
    const time = reservationTime.value;
    const guests = reservationGuests.value;
    const notes = reservationNotes.value.trim();


// ======================================
// VALIDATE DATE
// ======================================

if (!date) {

    showWarning(
        "Date Required",
        "Please select your preferred reservation date."
    );

    reservationDate.focus();

    return;
}


// ======================================
// GET TODAY'S DATE
// ======================================

const today = new Date();

const todayYear = today.getFullYear();

const todayMonth =
    String(today.getMonth() + 1).padStart(2, "0");

const todayDay =
    String(today.getDate()).padStart(2, "0");

const todayString =
    `${todayYear}-${todayMonth}-${todayDay}`;

    
// ======================================
// REJECT PAST DATES
// ======================================

if (date < todayString) {

    showWarning(
        "Invalid Reservation Date",
        "Please select today or a future date."
    );

    reservationDate.focus();

    return;
}


// ======================================
// VALIDATE TIME
// ======================================

if (!time) {

    showWarning(
        "Time Required",
        "Please select your preferred reservation time."
    );

    reservationTime.focus();

    return;
}


// ======================================
// CHECK TIME FOR TODAY
// ======================================

if (date === todayString) {

    const [hours, minutes] =
        time.split(":").map(Number);

    const currentMinutes =
        (today.getHours() * 60) +
        today.getMinutes();

    const selectedMinutes =
        (hours * 60) + minutes;


    // Must be at least 10 minutes from now
    if (selectedMinutes < currentMinutes + 10) {

        showWarning(
            "Invalid Reservation Time",
            "For today's reservation, please select a time that is at least 10 minutes from now."
        );

        reservationTime.focus();

        return;
    }
}

    // ======================================
    // FORMAT DATE
    // ======================================

    const selectedDate =
        new Date(date + "T00:00:00");

    const formattedDate =
        selectedDate.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    // ======================================
    // BUILD CONFIRMATION
    // ======================================

    restaurantReservationConfirmDetails.innerHTML = `

        <div class="reservation-confirm-item">

            <small>RESERVATION DATE</small>

            <strong>${formattedDate}</strong>

        </div>


        <div class="reservation-confirm-item">

            <small>PREFERRED TIME</small>

            <strong>${time}</strong>

        </div>


        <div class="reservation-confirm-item">

            <small>NUMBER OF GUESTS</small>

            <strong>${guests}</strong>

        </div>


        <div class="reservation-confirm-item">

            <small>SPECIAL REQUEST</small>

            <strong>
                ${notes ? notes : "None"}
            </strong>

        </div>

    `;


    // ======================================
    // SHOW CONFIRMATION
    // ======================================

    restaurantReservationPopup.style.display = "none";

    restaurantReservationConfirmPopup.style.display = "flex";

});


// ==========================================
// CLOSE CONFIRMATION — X
// ==========================================

closeRestaurantReservationConfirm.addEventListener(
    "click",
    () => {

        restaurantReservationConfirmPopup.style.display =
            "none";

        restaurantReservationPopup.style.display =
            "flex";

    }
);


// ==========================================
// CANCEL CONFIRMATION
// ==========================================

cancelRestaurantReservation.addEventListener(
    "click",
    () => {

        restaurantReservationConfirmPopup.style.display =
            "none";

        restaurantReservationPopup.style.display =
            "flex";

    }
);


// ==========================================
// CLICK OUTSIDE CONFIRMATION
// ==========================================

restaurantReservationConfirmPopup.addEventListener(
    "click",
    (e) => {

        if (e.target === restaurantReservationConfirmPopup) {

            restaurantReservationConfirmPopup.style.display =
                "none";

            restaurantReservationPopup.style.display =
                "flex";

        }

    }
);


// ==========================================
// CONFIRM RESERVATION
// ==========================================

confirmRestaurantReservation.addEventListener(
    "click",
    () => {

        const date = reservationDate.value;
        const time = reservationTime.value;
        const guests = reservationGuests.value;
        const notes = reservationNotes.value.trim();


        // Close confirmation
        restaurantReservationConfirmPopup.style.display =
            "none";


        // ==================================
        // SHOW LOADING
        // ==================================

        showLoading(
            "Sending Reservation Request...",
            "Please wait while we notify the restaurant."
        );


        // ==================================
        // SEND RESERVATION
        // ==================================

        setTimeout(() => {

            const requestName =
                "Restaurant Reservation — " +
                guests +
                (guests === "1"
                    ? " Guest"
                    : " Guests");


            // Add to My Requests
            addRequest(
                requestName,
                "Pending"
            );


            // ==================================
            // NOTIFICATION
            // ==================================

            showNotification(
                "Reservation Requested",
                "Your table reservation request has been sent to the restaurant."
            );


            // ==================================
            // SUCCESS CONFIRMATION
            // ==================================

            showConfirmation(
                "Reservation Request Sent",
                "Your reservation request has been successfully sent to the restaurant."
            );


            // ==================================
            // CLEAR FORM
            // ==================================

            reservationDate.value = "";

            reservationTime.value = "";

            reservationGuests.value = "";

            reservationNotes.value = "";


            // Clear confirmation details
            restaurantReservationConfirmDetails.innerHTML =
                "";


        }, 1200);

    }
);
 
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

    // Close Crater Lake Tour
    craterLakePopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

craterLakePopup.addEventListener("click", (e) => {

    if (e.target === craterLakePopup) {

        // Close Crater Lake Tour
        craterLakePopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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

    // Close Wildlife Viewing
    wildlifeViewingPopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

wildlifeViewingPopup.addEventListener("click", (e) => {

    if (e.target === wildlifeViewingPopup) {

        // Close Wildlife Viewing
        wildlifeViewingPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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

    // Close Chimpanzee Trekking
    chimpanzeeTrekkingPopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

chimpanzeeTrekkingPopup.addEventListener("click", (e) => {

    if (e.target === chimpanzeeTrekkingPopup) {

        // Close Chimpanzee Trekking
        chimpanzeeTrekkingPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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
// CLOSE PHOTOGRAPHY TOUR
// ==========================================

closePhotographyTour.addEventListener("click", () => {

    // Close Photography Tour
    photographyTourPopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

photographyTourPopup.addEventListener("click", (e) => {

    if (e.target === photographyTourPopup) {

        // Close Photography Tour
        photographyTourPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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


// ==========================================
// 📸 PHOTOGRAPHY TOUR BOOKING
// ==========================================

const bookPhotographyTour =
    document.getElementById("bookPhotographyTour");

bookPhotographyTour.addEventListener("click", () => {

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    // Close Photography Tour popup
    photographyTourPopup.style.display = "none";

    // Show confirmation
    showConfirmation(
        `Thank you, ${guestName}!`,
        "Your Photography Tour request has been received successfully.",
        "Reception will confirm availability and details shortly."
    );

});
  
// ==========================================
// SPA POPUP
// ==========================================

closeSpa.addEventListener("click", () => {

    // Close Spa
    spaPopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});

spaPopup.addEventListener("click", (e) => {

    if (e.target === spaPopup) {

        // Close Spa
        spaPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

    }

});
// ==========================================
// NATURE WALK POPUP
// ==========================================

const natureWalkPopup = document.getElementById("natureWalkPopup");
const closeNatureWalk = document.querySelector(".closeNatureWalk");

closeNatureWalk.addEventListener("click", () => {

    // Clear selected nature walk
    clearSelections(natureWalkPopup, ".nature-card");

    // Close Nature Walk
    natureWalkPopup.style.display = "none";

    // Return to Explore
    explorePopup.style.display = "flex";

});

natureWalkPopup.addEventListener("click", (e) => {

    if (e.target === natureWalkPopup) {

        // Clear selected nature walk
        clearSelections(natureWalkPopup, ".nature-card");

        // Close Nature Walk
        natureWalkPopup.style.display = "none";

        // Return to Explore
        explorePopup.style.display = "flex";

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


    // ==========================================
    // CREATE IMAGE PREVIEW
    // ==========================================

    let housekeepingPreview =
        housekeepingPopup.querySelector(".foodPreview");

    if (!housekeepingPreview) {

        housekeepingPreview = document.createElement("div");

        housekeepingPreview.className = "foodPreview";

        housekeepingPreview.innerHTML = `
            <img src="" alt="Housekeeping preview">
        `;

        housekeepingPopup
            .querySelector(".popup-content")
            .appendChild(housekeepingPreview);
    }


    const previewImage =
        housekeepingPreview.querySelector("img");


    // ==========================================
    // PRELOAD HOUSEKEEPING IMAGES
    // ==========================================

    housekeepingPopup
        .querySelectorAll(".menuItem[data-image]")
        .forEach(item => {

            const preload = new Image();

            preload.src = item.dataset.image;

        });


    // ==========================================
    // MENU ITEMS
    // ==========================================

    housekeepingPopup
        .querySelectorAll(".menuItem")
        .forEach(item => {


            // ======================================
            // CLICK
            // ======================================

            item.onclick = event => {

                event.stopPropagation();

// ----------------------------------
// ROMANTIC ROOM SETUP
// ----------------------------------

if (
    item.textContent.includes(
        "Romantic Room Setup"
    )
) {

    // Select Romantic Room Setup
    housekeepingPopup
        .querySelectorAll(".menuItem.selected")
        .forEach(selectedItem => {

            if (selectedItem !== item) {

                selectedItem.classList.remove(
                    "selected"
                );

            }

        });

    if (item.classList.contains("selected")) {

    item.classList.remove("selected");

} else {

    item.classList.add("selected");

}

    // Open Romantic customization
    const romanticPopup =
        document.getElementById("romanticPopup");

    if (romanticPopup) {

        romanticPopup.style.display = "flex";

    }


    // Show its image
    if (item.dataset.image) {

        previewImage.src =
            item.dataset.image;

        housekeepingPreview.classList.add(
            "show"
        );

    }

    return;
}


// ----------------------------------
// NORMAL HOUSEKEEPING ITEM
// ----------------------------------

housekeepingPopup
    .querySelectorAll(".menuItem.selected")
    .forEach(selectedItem => {

        if (selectedItem !== item) {

            selectedItem.classList.remove(
                "selected"
            );

        }

    });


if (item.classList.contains("selected")) {

    item.classList.remove("selected");

} else {

    item.classList.add("selected");

}
              

// ----------------------------------
// SHOW IMAGE
// ----------------------------------   

if (item.dataset.image) {

    previewImage.src =
        item.dataset.image;

    housekeepingPreview.classList.add(
        "show"
    );

}

};


// ======================================
// DESKTOP — HOVER PREVIEW
// ======================================

item.onmouseenter = () => {

    if (window.innerWidth <= 650) return;

    if (!item.dataset.image) return;


    const rect =
        item.getBoundingClientRect();


    previewImage.src =
        item.dataset.image;


    housekeepingPreview.style.left =
        `${rect.right + 18}px`;


    housekeepingPreview.style.top =
        `${rect.top + (rect.height / 2) - 90}px`;


    housekeepingPreview.classList.add(
        "show"
    );

};


// ======================================
// DESKTOP — HIDE PREVIEW
// ======================================

item.onmouseleave = () => {

    if (window.innerWidth <= 650) return;

    housekeepingPreview.classList.remove(
        "show"
    );

};

});

});


// ==========================================
// ROMANTIC ROOM SETUP
// ==========================================

const romanticPopup =
    document.getElementById("romanticPopup");

const closeRomantic =
    document.getElementById("closeRomantic");

const confirmRomantic =
    document.getElementById("confirmRomantic");


if (
    romanticPopup &&
    closeRomantic &&
    confirmRomantic
) {


    // ==========================================
    // ROMANTIC OPTION SELECTION
    // ==========================================

    romanticPopup
        .querySelectorAll(
            ".romantic-option-group"
        )
        .forEach(group => {

            const options =
                group.querySelectorAll(
                    ".romanticOption"
                );


            options.forEach(option => {

                option.addEventListener(
                    "click",
                    () => {

                        options.forEach(
                            other => {

                                other.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        option.classList.add(
                            "selected"
                        );

                    }
                );

            });

        });


  // ==========================================
// CLOSE ROMANTIC POPUP
// ==========================================

closeRomantic.addEventListener(
    "click",
    () => {

        romanticPopup.style.display = "none";

        // Return to Housekeeping
        housekeepingPopup.style.display = "flex";

    }
);


// ==========================================
// CLOSE ROMANTIC OUTSIDE
// ==========================================

romanticPopup.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            romanticPopup
        ) {

            romanticPopup.style.display = "none";

            // Return to Housekeeping
            housekeepingPopup.style.display = "flex";

        }

    }
);

    // ==========================================
    // CONFIRM ROMANTIC SETUP
    // ==========================================

    confirmRomantic.addEventListener(
        "click",
        () => {

            const selectedOptions =
                romanticPopup.querySelectorAll(
                    ".romanticOption.selected"
                );


            if (
                selectedOptions.length === 0
            ) {

                showWarning(
                    "Choose Your Setup",
                    "Please select your preferred romantic room setup."
                );

                return;

            }


            // Get selected choices
            const choices =
                Array.from(
                    selectedOptions
                ).map(
                    option =>
                        option.dataset.value
                );


            // Get special message
            const messageElement =
                document.getElementById(
                    "romanticMessage"
                );


            const message =
                messageElement
                    ? messageElement.value.trim()
                    : "";


            // Save customization
            const romanticDetails = {

                choices: choices,

                message: message

            };


            localStorage.setItem(
                "romanticRoomSetup",
                JSON.stringify(
                    romanticDetails
                )
            );

// ==========================================
// ADD TO MY REQUESTS
// ==========================================

addRequest(
    "🌹 Romantic Room Setup",
    "Received",
    `Setup: ${choices.join(", ")}${message ? ` — Special Request: ${message}` : ""}`,
    0
);
            // Close popup
            romanticPopup.style.display =
                "none";

        }
    );

}

// ==========================================
// BABY COT REQUEST
// ==========================================

const babyCotPopup =
    document.getElementById("babyCotPopup");

const closeBabyCot =
    document.getElementById("closeBabyCot");

const confirmBabyCot =
    document.getElementById("confirmBabyCot");


// ==========================================
// OPEN BABY COT POPUP
// ==========================================

housekeepingPopup
    .querySelectorAll(".menuItem")
    .forEach(item => {

        if (
            item.textContent.includes(
                "Baby Cot Request"
            )
        ) {

            item.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    // Select Baby Cot
                    housekeepingPopup
                        .querySelectorAll(
                            ".menuItem.selected"
                        )
                        .forEach(selectedItem => {

                            if (
                                selectedItem !== item
                            ) {

                                selectedItem.classList.remove(
                                    "selected"
                                );

                            }

                        });

                    item.classList.add(
                        "selected"
                    );


                    // Open Baby Cot popup
                    if (babyCotPopup) {

                        babyCotPopup.style.display =
                            "flex";

                    }

                }
            );

        }

    });


// ==========================================
// BABY COT OPTION SELECTION
// ==========================================

if (babyCotPopup) {

    babyCotPopup
        .querySelectorAll(
            ".romantic-option-group"
        )
        .forEach(group => {

            const options =
                group.querySelectorAll(
                    ".romanticOption"
                );


            options.forEach(option => {

                option.addEventListener(
                    "click",
                    () => {

                        options.forEach(
                            other => {

                                other.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        option.classList.add(
                            "selected"
                        );

                    }
                );

            });

        });

// ==========================================
// CLOSE BABY COT
// ==========================================

closeBabyCot.addEventListener(
    "click",
    () => {

        babyCotPopup.style.display = "none";

        // Return to Housekeeping
        housekeepingPopup.style.display = "flex";

    }
);


// ==========================================
// CLOSE OUTSIDE
// ==========================================

babyCotPopup.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            babyCotPopup
        ) {

            babyCotPopup.style.display = "none";

            // Return to Housekeeping
            housekeepingPopup.style.display = "flex";

        }

    }
);
 
    // ==========================================
    // CONFIRM BABY COT
    // ==========================================

    confirmBabyCot.addEventListener(
        "click",
        () => {

            const selectedOptions =
                babyCotPopup.querySelectorAll(
                    ".romanticOption.selected"
                );


            if (
                selectedOptions.length === 0
            ) {

                showWarning(
                    "Choose Cot Options",
                    "Please select your preferred baby cot options."
                );

                return;

            }


            const choices =
                Array.from(
                    selectedOptions
                ).map(
                    option =>
                        option.dataset.value
                );


            const messageElement =
                document.getElementById(
                    "babyCotMessage"
                );


            const message =
                messageElement
                    ? messageElement.value.trim()
                    : "";


            const babyCotDetails = {

                choices: choices,

                message: message

            };


            localStorage.setItem(
                "babyCotRequest",
                JSON.stringify(
                    babyCotDetails
                )
            );

// ==========================================
// ADD TO MY REQUESTS
// ==========================================

addRequest(
    "👶 Baby Cot Request",
    "Received",
    `Cot Options: ${choices.join(", ")}${message ? ` — Special Request: ${message}` : ""}`,
    0
);
                      // Keep Baby Cot selected in Housekeeping
            const babyCotItem =
                Array.from(
                    housekeepingPopup.querySelectorAll(".menuItem")
                ).find(item =>
                    item.textContent.includes("Baby Cot Request")
                );

            if (babyCotItem) {
                babyCotItem.classList.add("selected");
            }

            // Close popup
            babyCotPopup.style.display = "none";

            // Return to Housekeeping
            housekeepingPopup.style.display = "flex";

        }
    );

}
// ==========================================
// CLOSE HOUSEKEEPING
// ==========================================

closeHousekeeping.addEventListener(
    "click",
    () => {

        clearSelections(
            housekeepingPopup,
            ".menuItem"
        );


        const preview =
            housekeepingPopup.querySelector(
                ".foodPreview"
            );


        if (preview) {

            preview.classList.remove(
                "show"
            );

        }


        if (romanticPopup) {

            romanticPopup.style.display =
                "none";

        }


        housekeepingPopup.style.display =
            "none";

    }
);


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

housekeepingPopup.addEventListener(
    "click",
    e => {

        if (
            e.target ===
            housekeepingPopup
        ) {

            clearSelections(
                housekeepingPopup,
                ".menuItem"
            );


            const preview =
                housekeepingPopup.querySelector(
                    ".foodPreview"
                );


            if (preview) {

                preview.classList.remove(
                    "show"
                );

            }


            if (romanticPopup) {

                romanticPopup.style.display =
                    "none";

            }


            housekeepingPopup.style.display =
                "none";

        }

    }
);
  
// ==========================================
// BILLING POPUP
// ==========================================

billingCard.addEventListener("click", () => {

    billingPopup.style.display = "flex";


    // ==========================================
    // BILLING CARD SELECTION
    // ==========================================

    billingPopup
        .querySelectorAll(".service-option")
        .forEach(option => {

            option.onclick = () => {

                // Remove selection from other cards
                billingPopup
                    .querySelectorAll(".service-option.selected")
                    .forEach(item => {

                        if (item !== option) {
                            item.classList.remove("selected");
                        }

                    });


                // Toggle the clicked card
                if (option.classList.contains("selected")) {

                    option.classList.remove("selected");

                } else {

                    option.classList.add("selected");

                }

            };

        });

});


// ==========================================
// CLOSE BILLING
// ==========================================

closeBilling.addEventListener("click", () => {

    clearSelections(
        billingPopup,
        ".service-option"
    );

    billingPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

billingPopup.addEventListener("click", (e) => {

    if (e.target === billingPopup) {

        clearSelections(
            billingPopup,
            ".service-option"
        );

        billingPopup.style.display = "none";

    }

});

// ==========================================
// EXPLORE POPUP
// ==========================================

exploreCard.addEventListener("click", () => {

    // Always start Explore with nothing selected
    explorePopup
        .querySelectorAll(".service-option")
        .forEach(option => {
            option.classList.remove("selected");
        });

    explorePopup.style.display = "flex";


// ==========================================
// EXPLORE CARD SELECTION
// ==========================================

explorePopup
    .querySelectorAll(".service-option")
    .forEach(option => {

        option.onclick = () => {

            // ------------------------------------------
            // REMOVE SELECTION FROM OTHER CARDS
            // ------------------------------------------

            explorePopup
                .querySelectorAll(".service-option.selected")
                .forEach(item => {

                    if (item !== option) {
                        item.classList.remove("selected");
                    }

                });


            // ------------------------------------------
            // TOGGLE SELECTED CARD
            // ------------------------------------------

            if (option.classList.contains("selected")) {

                option.classList.remove("selected");

            } else {

                option.classList.add("selected");

            }


            // ------------------------------------------
            // GET CARD TITLE
            // ------------------------------------------

            const titleElement = option.querySelector(".title");

            if (!titleElement) {
                return;
            }

            const title = titleElement.textContent.trim();


            // ==========================================
            // PHOTOGRAPHY TOUR
            // ==========================================

            if (title === "Photography Tour") {

                explorePopup.style.display = "none";

                option.classList.remove("selected");

                photographyTourPopup.style.display = "flex";

            }

        };

    });
  
});

// ==========================================
// CLOSE EXPLORE WITH X
// ==========================================

closeExplore.addEventListener("click", () => {

    // Clear all selected cards
    explorePopup
        .querySelectorAll(".service-option")
        .forEach(option => {
            option.classList.remove("selected");
        });

    // Close Explore
    explorePopup.style.display = "none";

});


// ==========================================
// CLOSE EXPLORE BY CLICKING OUTSIDE
// ==========================================

explorePopup.addEventListener("click", (e) => {

    if (e.target === explorePopup) {

        // Clear all selected cards
        explorePopup
            .querySelectorAll(".service-option")
            .forEach(option => {
                option.classList.remove("selected");
            });

        // Close Explore
        explorePopup.style.display = "none";

    }

});
// ==========================================
// FEEDBACK POPUP
// ==========================================

feedbackCard.addEventListener("click", () => {

    feedbackPopup.style.display = "flex";


    // ==========================================
    // FEEDBACK CARD SELECTION
    // ==========================================

    feedbackPopup
        .querySelectorAll(".service-option")
        .forEach(option => {

            option.onclick = () => {

                // Remove selection from other cards
                feedbackPopup
                    .querySelectorAll(".service-option.selected")
                    .forEach(item => {

                        if (item !== option) {
                            item.classList.remove("selected");
                        }

                    });


                // Toggle the clicked card
                if (option.classList.contains("selected")) {

                    option.classList.remove("selected");

                } else {

                    option.classList.add("selected");

                }

            };

        });

});


// ==========================================
// CLOSE FEEDBACK
// ==========================================

closeFeedback.addEventListener("click", () => {

    clearSelections(
        feedbackPopup,
        ".service-option"
    );

    feedbackPopup.style.display = "none";

});


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

feedbackPopup.addEventListener("click", (e) => {

    if (e.target === feedbackPopup) {

        clearSelections(
            feedbackPopup,
            ".service-option"
        );

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

    updateAllRequestStatuses();

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
// SAVE REQUEST — ADVANCED REQUEST TRACKER
// ==========================================

function addRequest(service, status, details = "", estimatedMinutes = 0) {

    const requestsList =
        document.getElementById("requestsList");

    const badge =
        document.getElementById("requestBadge");

    // Remove empty message
    if (
        requestsList.textContent.includes(
            "You haven't made any requests yet"
        )
    ) {
        requestsList.innerHTML = "";
    }


    // ==========================================
    // REQUEST TIME
    // ==========================================

    const requestTime = Date.now();


    // ==========================================
    // REQUEST DATA
    // ==========================================

    const request = document.createElement("div");

    request.className = "requestItem";

    request.dataset.requestTime = requestTime;

    request.dataset.estimatedMinutes =
        estimatedMinutes || 0;

    request.dataset.originalStatus =
        status || "Pending";


    // ==========================================
    // REQUEST CONTENT
    // ==========================================

    request.innerHTML = `

        <strong>${service}</strong>

        ${details ? `
            <div class="requestDetails">
                ${details}
            </div>
        ` : ""}

        <div class="requestMeta">

            <span>
                Status:
            </span>

            <span class="requestStatus">
                ${status || "Pending"}
            </span>

        </div>

        ${
            estimatedMinutes
                ? `
                <div class="requestEstimated">
                    Estimated:
                    ${estimatedMinutes} minutes
                </div>
                `
                : ""
        }

        <div class="requestTime">
            Requested:
            ${new Date(requestTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}
        </div>

    `;


    // ==========================================
    // ADD TO TOP
    // ==========================================

    requestsList.prepend(request);


    // ==========================================
    // UPDATE BADGE
    // ==========================================

    badge.textContent =
        requestsList.querySelectorAll(
            ".requestItem"
        ).length;


    // ==========================================
    // START STATUS TRACKING
    // ==========================================

    updateRequestStatus(request);

}

  // ==========================================
// UPDATE REQUEST STATUS
// ==========================================

function updateRequestStatus(request) {

    const requestTime =
        Number(request.dataset.requestTime);

    const estimatedMinutes =
        Number(request.dataset.estimatedMinutes);

    const originalStatus =
        request.dataset.originalStatus || "Pending";

    const statusElement =
        request.querySelector(".requestStatus");


    if (!statusElement) return;


    // ==========================================
    // NO ESTIMATED TIME
    // ==========================================

    if (!estimatedMinutes || estimatedMinutes <= 0) {
        statusElement.textContent = originalStatus;
        return;
    }


    // ==========================================
    // CHECK ELAPSED TIME
    // ==========================================

    const elapsedMinutes =
        (Date.now() - requestTime) / 60000;


    // ==========================================
    // AUTOMATIC DELIVERY
    // 5 MINUTES AFTER ESTIMATED MAXIMUM
    // ==========================================

    const deliveryTime =
        estimatedMinutes + 5;


    if (elapsedMinutes >= deliveryTime) {

        statusElement.textContent =
            "Delivered";

        statusElement.classList.add(
            "requestDelivered"
        );

    }

    else {

        statusElement.textContent =
            originalStatus;

    }

}
  // ==========================================
// CHECK ALL REQUEST STATUSES
// ==========================================

function updateAllRequestStatuses() {

    document
        .querySelectorAll("#requestsList .requestItem")
        .forEach(request => {

            updateRequestStatus(request);

        });

}


// Check every minute

setInterval(() => {

    updateAllRequestStatuses();

}, 60000);
  
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

let warningReturnPopup = null;

function showWarning(title, message, returnPopup = null) {

    document.getElementById("warningTitle").textContent = title;

    document.getElementById("warningMessage").textContent = message;

    warningReturnPopup = returnPopup;

    document.getElementById("warningPopup").style.display = "flex";
}

const closeWarning = document.getElementById("closeWarning");

closeWarning.addEventListener("click", () => {

    document.getElementById("warningPopup").style.display = "none";

    if (warningReturnPopup) {
        warningReturnPopup.style.display = "flex";
        warningReturnPopup = null;
    }

});

warningPopup.addEventListener("click", (e) => {

    if (e.target === warningPopup) {

        warningPopup.style.display = "none";

        if (warningReturnPopup) {
            warningReturnPopup.style.display = "flex";
            warningReturnPopup = null;
        }

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

    const transferName =
        document.getElementById("transferName").value.trim();

    const transferRoom =
        document.getElementById("transferRoom").value.trim();

    const transferType =
        document.getElementById("transferType").value.trim();

    const transferDate =
        document.getElementById("transferDate").value.trim();

    const transferTime =
        document.getElementById("transferTime").value.trim();

    const flightNumber =
        document.getElementById("flightNumber").value.trim();

    const airline =
        document.getElementById("airline").value.trim();

    const adults =
        document.getElementById("adults").value.trim();

    const children =
        document.getElementById("children").value.trim();

    const bags =
        document.getElementById("bags").value.trim();

    const pickupLocation =
        document.getElementById("pickupLocation").value.trim();

    const transferNotes =
        document.getElementById("transferNotes").value.trim();


    // ==========================================
    // CHECK REQUIRED INFORMATION
    // ==========================================

    if (
        !transferName ||
        !transferRoom ||
        !transferType ||
        !transferDate ||
        !transferTime ||
        !flightNumber ||
        !airline ||
        !adults ||
        !children ||
        !bags ||
        !pickupLocation
    ) {

        showWarning(
            "Incomplete Information",
            "Please fill in all required information before you continue."
        );

        return;
    }


    // ==========================================
    // CHECK COTTAGE / ROOM NUMBER
    // ONLY COTTAGES 1–12 ARE VALID
    // ==========================================

    const roomNumber = Number(transferRoom);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        return;
    }


    // ==========================================
// CHECK TRANSFER DATE
// DATE MUST BE TODAY OR A FUTURE DATE
// ==========================================

const today = new Date();

const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
const todayDay = String(today.getDate()).padStart(2, "0");

const todayString =
    `${todayYear}-${todayMonth}-${todayDay}`;


if (transferDate < todayString) {

    showWarning(
        "Invalid Transfer Date",
        "Please select today or a future date for your airport transfer."
    );

    return;
}


// ==========================================
// CHECK TRANSFER TIME
// ONLY REQUIRED FOR TODAY
// MUST BE AT LEAST 10 MINUTES FROM NOW
// ==========================================

if (transferDate === todayString) {

    const [hours, minutes] =
        transferTime.split(":").map(Number);

    const now = new Date();

    const currentMinutes =
        (now.getHours() * 60) + now.getMinutes();

    const selectedMinutes =
        (hours * 60) + minutes;


    if (selectedMinutes < currentMinutes + 10) {

        showWarning(
            "Invalid Transfer Time",
            "For today's transfer, please select a time that is at least 10 minutes from now."
        );

        return;
    }
}

    // ==========================================
    // ALL INFORMATION IS VALID
    // ==========================================

    const guestName = transferName;

    const btn =
        document.getElementById("sendTransferRequest");


    // ==========================================
    // CLEAR FORM AFTER SUCCESSFUL REQUEST
    // ==========================================

    const clearTransferForm = () => {

        document.getElementById("transferRoom").value = "";
        document.getElementById("transferType").value = "";
        document.getElementById("transferDate").value = "";
        document.getElementById("transferTime").value = "";
        document.getElementById("flightNumber").value = "";
        document.getElementById("airline").value = "";
        document.getElementById("adults").value = "";
        document.getElementById("children").value = "";
        document.getElementById("bags").value = "";
        document.getElementById("pickupLocation").value = "";
        document.getElementById("transferNotes").value = "";

    };


    showLoading("Booking Airport Transfer...", () => {

        addRequest(
            "🚖 Airport Transfer",
            `${transferType} — Cottage ${transferRoom} — ${transferDate} ${transferTime}`
        );

        showNotification(
            "🚖",
            "Transport Team",
            "Your airport transfer request has been received."
        );

        // Clear everything after successful request
        clearTransferForm();

        transferPopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your airport transfer has been booked.",
            "Estimated confirmation: 5–10 minutes"
        );

    }, btn);

});

// ==========================================
// CAMPFIRE CLOSE & CLEAR
// ==========================================

const clearCampfireForm = () => {

    // Keep the guest name
    document.getElementById("campfireName").value =
        localStorage.getItem("guestName") || "";

    document.getElementById("campfireRoom").value = "";
    document.getElementById("campfireType").value = "";
    document.getElementById("campfireDate").value = "";
    document.getElementById("campfireTime").value = "";
    document.getElementById("campfireGuests").value = "";
    document.getElementById("campfireExtras").value = "";
    document.getElementById("campfireNotes").value = "";
};


// ==========================================
// CLOSE CAMPFIRE WITH X
// ==========================================

closeCampfire.addEventListener("click", () => {

    clearCampfireForm();

    campfirePopup.style.display = "none";

});


// ==========================================
// CLOSE CAMPFIRE BY CLICKING OUTSIDE
// ==========================================

campfirePopup.addEventListener("click", (e) => {

    if (e.target === campfirePopup) {

        clearCampfireForm();

        campfirePopup.style.display = "none";

    }

});
  
// ==========================================
// CAMPFIRE REQUEST
// ==========================================

document.getElementById("sendCampfireRequest").addEventListener("click", () => {

    const name =
        document.getElementById("campfireName").value.trim();

    const room =
        document.getElementById("campfireRoom").value.trim();

    const type =
        document.getElementById("campfireType").value;

    const date =
        document.getElementById("campfireDate").value;

    const time =
        document.getElementById("campfireTime").value;

    const guests =
        document.getElementById("campfireGuests").value;

    const extras =
        document.getElementById("campfireExtras").value;

    const notes =
        document.getElementById("campfireNotes").value.trim();

    // ==========================================
    // REQUIRED INFORMATION
    // ==========================================

    if (!name || !room || !type || !date || !time || !guests) {

        showWarning(
            "Incomplete Information",
            "Please complete your name, cottage number, experience, date, time, and number of guests before continuing."
        );

        return;
    }

    // ==========================================
    // COTTAGE NUMBER
    // ==========================================

    const roomNumber = Number(room);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        return;
    }

    // ==========================================
    // NUMBER OF GUESTS
    // ==========================================

    const guestCount = Number(guests);

    if (
        !Number.isInteger(guestCount) ||
        guestCount < 1
    ) {

        showWarning(
            "Invalid Number of Guests",
            "The number of guests must be at least 1."
        );

        return;
    }

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
    const todayDay = String(today.getDate()).padStart(2, "0");

    const todayString =
        `${todayYear}-${todayMonth}-${todayDay}`;

    if (date < todayString) {

        showWarning(
            "Invalid Date",
            "Please select today or a future date for your campfire."
        );

        return;
    }

    // ==========================================
    // TIME VALIDATION FOR TODAY
    // ==========================================

    if (date === todayString) {

        const [hours, minutes] =
            time.split(":").map(Number);

        const currentMinutes =
            (today.getHours() * 60) + today.getMinutes();

        const selectedMinutes =
            (hours * 60) + minutes;

        if (selectedMinutes < currentMinutes + 10) {

            showWarning(
                "Invalid Time",
                "For today's campfire, please select a time that is at least 10 minutes from now."
            );

            return;
        }
    }

    // ==========================================
    // SUBMIT REQUEST
    // ==========================================

    const guestName =
        localStorage.getItem("guestName") ||
        name ||
        "Guest";

    const btn =
        document.getElementById("sendCampfireRequest");

    showLoading("Preparing Your Campfire...", () => {

        addRequest(
            "🔥 Campfire Experience",
            `${type} — Cottage ${roomNumber} — ${date} at ${time} — ${guestCount} guest${guestCount > 1 ? "s" : ""}${extras ? " — " + extras : ""}${notes ? " — " + notes : ""}`
        );

        showNotification(
            "🔥",
            "Camp Activities",
            "Your campfire reservation has been received."
        );

        // ==========================================
        // CLEAR FORM
        // ==========================================

        document.getElementById("campfireRoom").value = "";
        document.getElementById("campfireType").value = "";
        document.getElementById("campfireDate").value = "";
        document.getElementById("campfireTime").value = "";
        document.getElementById("campfireGuests").value = "";
        document.getElementById("campfireExtras").value = "";
        document.getElementById("campfireNotes").value = "";

        campfirePopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            "Your campfire has been reserved.",
            "Our camp activities team will confirm the arrangements shortly."
        );

    }, btn);

});
  
// ==========================================
// HOUSEKEEPING REQUEST
// ==========================================

document.getElementById("sendHousekeepingRequest").addEventListener("click", () => {

    const selected =
        housekeepingPopup.querySelectorAll(".menuItem.selected");

    if (selected.length === 0) {

        showWarning(
            "No Service Selected",
            "Please choose at least one service before sending your request."
        );

        return;
    }

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("sendHousekeepingRequest");

    // Get selected housekeeping services
    const services = [];

    selected.forEach(item => {

        const serviceText =
            item.textContent.trim();

        // Remove the emoji from the beginning
        const serviceName =
            serviceText.replace(/^[^\wÀ-ÿ]+/, "").trim();

        services.push(serviceName);

    });

    clearSelections(
        housekeepingPopup,
        ".menuItem"
    );

    housekeepingPopup.style.display = "none";

    showLoading(
        "Notifying Housekeeping...",
        () => {

            // Add every selected service separately
            services.forEach(service => {

                let icon = "🧹";

                if (service === "Make Up Room") {
                    icon = "🛏️";
                }

                else if (service === "Fresh Towels") {
                    icon = "🧺";
                }

                else if (service === "Toiletries") {
                    icon = "🧼";
                }

                else if (service === "Toilet Paper") {
                    icon = "🧻";
                }

                else if (service === "Bathroom Cleaning") {
                    icon = "🛁";
                }

                else if (service === "Full Room Cleaning") {
                    icon = "🧹";
                }

                else if (service === "Romantic Room Setup") {
                    icon = "🌹";
                }

                else if (service === "Baby Cot Request") {
                    icon = "🍼";
                }

                else if (service === "Laundry Collection") {
                    icon = "🧺";
                }

                else if (service === "Extra Blanket") {
                    icon = "🧥";
                }

                addRequest(
                    `${icon} ${service}`,
                    "Received",
                    "Housekeeping request received.",
                    20
                );

            });

            showNotification(
                "🧹",
                "Housekeeping",
                "Your housekeeping request has been received."
            );

            showConfirmation(
                `Thank you, ${guestName}!`,
                "Housekeeping has received your request.",
                "Your selected services are being processed."
            );

        },
        btn
    );

});

  
// ==========================================
// RECEIPT POPUP
// ==========================================

const receiptPopup =
    document.getElementById("receiptPopup");

const closeReceipt =
    document.querySelector(".closeReceipt");


// ==========================================
// CLOSE RECEIPT — RETURN TO BILLING
// ==========================================

closeReceipt.addEventListener("click", () => {

    // Close Receipt
    receiptPopup.style.display = "none";

    // Return to Billing
    billingPopup.style.display = "flex";

});


receiptPopup.addEventListener("click", (e) => {

    if (e.target === receiptPopup) {

        // Close Receipt
        receiptPopup.style.display = "none";

        // Return to Billing
        billingPopup.style.display = "flex";

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
// DOWNLOAD PAYMENT RECEIPT — PDF
// ==========================================

document.getElementById("downloadReceipt")
    .addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    // ==========================================
    // GET CURRENT RECEIPT INFORMATION
    // ==========================================

    const guest =
        document.getElementById("receiptGuestName")
            .textContent.trim();

    const cottage =
        document.getElementById("receiptCottage")
            .textContent.trim();

    const amount =
        document.getElementById("receiptAmount")
            .textContent.trim();

    const method =
        document.getElementById("receiptMethod")
            .textContent.trim();

    const transaction =
        document.getElementById("receiptTransaction")
            .textContent.trim();

    const date =
        document.getElementById("receiptDate")
            .textContent.trim();

    const status =
        document.getElementById("receiptStatus")
            .textContent.trim();


    // ==========================================
    // CREATE PDF
    // ==========================================

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });


    // ==========================================
    // COLORS
    // ==========================================

    const gold = [212, 175, 55];

    const darkGold = [150, 110, 25];

    const dark = [35, 25, 15];

    const cream = [250, 247, 238];

    const muted = [110, 100, 85];


    // ==========================================
    // BACKGROUND
    // ==========================================

    doc.setFillColor(...cream);

    doc.rect(
        0,
        0,
        210,
        297,
        "F"
    );


    // ==========================================
    // OUTER GOLD FRAME
    // ==========================================

    doc.setDrawColor(...gold);

    doc.setLineWidth(1);

    doc.roundedRect(
        12,
        12,
        186,
        273,
        5,
        5,
        "S"
    );


    // Inner frame

    doc.setLineWidth(.3);

    doc.roundedRect(
        16,
        16,
        178,
        265,
        4,
        4,
        "S"
    );


    // ==========================================
    // LODGE NAME
    // ==========================================

    doc.setTextColor(...darkGold);

    doc.setFont(
        "times",
        "bold"
    );

    doc.setFontSize(20);

    doc.text(
        "MIRIMA KIBALE LODGE",
        105,
        35,
        { align: "center" }
    );


    // ==========================================
    // RECEIPT TITLE
    // ==========================================

    doc.setFontSize(25);

    doc.setTextColor(...dark);

    doc.text(
        "PAYMENT RECEIPT",
        105,
        51,
        { align: "center" }
    );


    doc.setFont(
        "times",
        "normal"
    );

    doc.setFontSize(12);

    doc.setTextColor(...muted);

    doc.text(
        "Official Guest Payment Record",
        105,
        59,
        { align: "center" }
    );


    // ==========================================
    // GOLD DIVIDER
    // ==========================================

    doc.setDrawColor(...gold);

    doc.setLineWidth(.8);

    doc.line(
        70,
        68,
        140,
        68
    );


    // ==========================================
    // RECEIPT DETAILS BOX
    // ==========================================

    doc.setDrawColor(
        205,
        190,
        150
    );

    doc.setLineWidth(.4);

    doc.roundedRect(
        27,
        80,
        156,
        101,
        4,
        4,
        "S"
    );


    // ==========================================
    // DETAIL ROW FUNCTION
    // ==========================================

    function addRow(label, value, y) {

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);

        doc.setTextColor(
            120,
            110,
            95
        );

        doc.text(
            label,
            37,
            y
        );


        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(10);

        doc.setTextColor(...dark);

        doc.text(
            value || "—",
            173,
            y,
            { align: "right" }
        );


        doc.setDrawColor(
            225,
            215,
            190
        );

        doc.setLineWidth(.25);

        doc.line(
            37,
            y + 6,
            173,
            y + 6
        );
    }


    addRow("Guest", guest, 94);

    addRow("Cottage", cottage, 108);

    addRow("Amount", amount, 122);

    addRow("Payment Method", method, 136);

    addRow("Transaction ID", transaction, 150);

    addRow("Date", date, 164);


    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    doc.setFillColor(
        248,
        241,
        216
    );

    doc.setDrawColor(...gold);

    doc.roundedRect(
        27,
        193,
        156,
        18,
        4,
        4,
        "FD"
    );


    doc.setTextColor(
        ...darkGold
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.text(
        status,
        105,
        204,
        { align: "center" }
    );


    // ==========================================
    // FOOTER MESSAGE
    // ==========================================

    doc.setFont(
        "times",
        "italic"
    );

    doc.setFontSize(12);

    doc.setTextColor(...muted);

    doc.text(
        "Thank you for choosing Mirima Kibale Lodge.",
        105,
        238,
        { align: "center" }
    );


    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(8);

    doc.setTextColor(
        145,
        135,
        120
    );

    doc.text(
        "This receipt reflects the payment information currently displayed in the guest portal.",
        105,
        249,
        { align: "center" }
    );


    // ==========================================
    // DOWNLOAD
    // ==========================================

    const fileName =
        "Mirima-Kibale-Lodge-Payment-Receipt.pdf";

    doc.save(fileName);


    // ==========================================
    // NOTIFICATION
    // ==========================================

    showNotification(
        "🧾",
        "Receipt Downloaded",
        "Your payment receipt PDF has been downloaded successfully."
    );

});
  
// ==========================================
// CURRENT BILL POPUP
// ==========================================

const currentBillPopup =
    document.getElementById("currentBillPopup");

const closeCurrentBill =
    document.querySelector(".closeCurrentBill");


// ==========================================
// CLOSE CURRENT BILL — RETURN TO BILLING
// ==========================================

closeCurrentBill.addEventListener("click", () => {

    // Close Current Bill
    currentBillPopup.style.display = "none";

    // Return to Billing
    billingPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE — RETURN TO BILLING
// ==========================================

currentBillPopup.addEventListener("click", (e) => {

    if (e.target === currentBillPopup) {

        // Close Current Bill
        currentBillPopup.style.display = "none";

        // Return to Billing
        billingPopup.style.display = "flex";

    }

});
// ==========================================
// EXCHANGE POPUP
// ==========================================

const exchangePopup =
    document.getElementById("exchangePopup");

const closeExchange =
    document.querySelector(".closeExchange");


// ==========================================
// CLOSE EXCHANGE — RETURN TO BILLING
// ==========================================

closeExchange.addEventListener("click", () => {

    // Close Exchange
    exchangePopup.style.display = "none";

    // Return to Billing
    billingPopup.style.display = "flex";

});


exchangePopup.addEventListener("click", (e) => {

    if (e.target === exchangePopup) {

        // Close Exchange
        exchangePopup.style.display = "none";

        // Return to Billing
        billingPopup.style.display = "flex";

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


// ==========================================
// CLOSE BILLING HELP — RETURN TO BILLING
// ==========================================

closeBillingHelp.addEventListener("click", () => {

    billingHelpPopup.style.display = "none";

    billingHelpPopup
        .querySelectorAll(".billing-help-card")
        .forEach(item => {
            item.classList.remove("selected");
        });

    document.getElementById("billingHelpMessage").value = "";

    // Return to Billing
    billingPopup.style.display = "flex";

});


billingHelpPopup.addEventListener("click", (e) => {

    if (e.target === billingHelpPopup) {

        billingHelpPopup.style.display = "none";

        billingHelpPopup
            .querySelectorAll(".billing-help-card")
            .forEach(item => {
                item.classList.remove("selected");
            });

        document.getElementById("billingHelpMessage").value = "";

        // Return to Billing
        billingPopup.style.display = "flex";

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


        // ==========================================
        // CHECK HELP TOPIC
        // ==========================================

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


        // ==========================================
        // GET BILLING PROBLEM DESCRIPTION
        // ==========================================

        const message =
            document.getElementById("billingHelpMessage")
                .value
                .trim();


        // ==========================================
        // DESCRIPTION IS REQUIRED
        // ==========================================

        if (!message) {

            showWarning(
                "Description Required",
                "Please describe your billing issue or problem before submitting."
            );

            document.getElementById("billingHelpMessage").focus();

            return;
        }


        // ==========================================
        // GUEST INFORMATION
        // ==========================================

        const guestName =
            localStorage.getItem("guestName") || "Guest";

        const btn =
            document.getElementById("submitBillingHelp");


        // ==========================================
        // CLOSE BILLING HELP
        // ==========================================

        billingHelpPopup.style.display = "none";


        // ==========================================
        // SUBMIT BILLING HELP
        // ==========================================

        showLoading("Sending Billing Help...", () => {

            addRequest(
                "❓ Billing Help",
                `${helpTitle} — ${message}`
            );

            showNotification(
                "❓",
                "Billing Help",
                "Your billing help request has been received."
            );


            // Clear selected topic
            selectedHelp.classList.remove("selected");


            // Clear description
            document.getElementById("billingHelpMessage").value = "";


            // Show confirmation
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

    // Close Make Payment
    paymentPopup.style.display = "none";

    // Return to Billing
    billingPopup.style.display = "flex";

});


paymentPopup.addEventListener("click", (e) => {

    if (e.target === paymentPopup) {

        clearSelections(paymentPopup, ".payment-card");

        // Close Make Payment
        paymentPopup.style.display = "none";

        // Return to Billing
        billingPopup.style.display = "flex";

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

    // Close Mobile Money
    mobileMoneyPopup.style.display = "none";

    // Return to Make Payment
    paymentPopup.style.display = "flex";

});

mobileMoneyPopup.addEventListener("click", (e) => {

    if (e.target === mobileMoneyPopup) {

        clearSelections(
            mobileMoneyPopup,
            ".mobile-money-card"
        );

        mobileMoneyInstructions.style.display = "none";

        // Close Mobile Money
        mobileMoneyPopup.style.display = "none";

        // Return to Make Payment
        paymentPopup.style.display = "flex";

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


    // ==========================================
    // CHECK NETWORK
    // ==========================================

    if (!selectedNetwork) {

        showWarning(
            "Select Mobile Network",
            "Please select MTN Mobile Money or Airtel Money."
        );

        return;
    }


    // ==========================================
    // CHECK PHONE NUMBER
    // Must be exactly 12 digits
    // Must start with 256
    // ==========================================

    if (!phone) {

        showWarning(
            "Payment Number Required",
            "Please enter the mobile money number used to make the payment."
        );

        document.getElementById("paymentPhone").focus();

        return;
    }

    if (!/^256\d{9}$/.test(phone)) {

        showWarning(
            "Invalid Phone Number",
            "The phone number must contain exactly 12 digits and start with 256. Example: 256700123456."
        );

        document.getElementById("paymentPhone").focus();

        return;
    }


    // ==========================================
    // CHECK TRANSACTION ID
    // Must be exactly 12 numbers
    // ==========================================

    if (!transactionId) {

        showWarning(
            "Transaction ID Required",
            "Please enter your mobile money transaction ID."
        );

        document.getElementById("transactionId").focus();

        return;
    }

    if (!/^\d{12}$/.test(transactionId)) {

        showWarning(
            "Invalid Transaction ID",
            "The transaction ID must contain exactly 12 numbers. Letters and other characters are not allowed."
        );

        document.getElementById("transactionId").focus();

        return;
    }


    // ==========================================
    // CHECK REGISTERED ACCOUNT NAME
    // Letters and spaces only
    // ==========================================

    if (!accountName) {

        showWarning(
            "Account Name Required",
            "Please enter the name registered on the mobile money account."
        );

        document.getElementById("paymentAccountName").focus();

        return;
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(accountName)) {

        showWarning(
            "Invalid Account Name",
            "The registered account name must contain letters and spaces only. Numbers and special characters are not allowed."
        );

        document.getElementById("paymentAccountName").focus();

        return;
    }


    // ==========================================
    // GET NETWORK
    // ==========================================

    const network =
        selectedNetwork
            .querySelector("strong")
            .textContent
            .trim();


    // ==========================================
    // GUEST NAME
    // ==========================================

    const guestName =
        localStorage.getItem("guestName") || "Guest";


    // ==========================================
    // SUBMIT BUTTON
    // ==========================================

    const btn =
        document.getElementById("submitMobileMoney");


    // ==========================================
    // SUBMIT PAYMENT
    // ==========================================

    showLoading("Submitting Payment Details...", () => {

        addRequest(
            `📱 ${network} Payment`,
            `Phone: ${phone} — Transaction ID: ${transactionId} — Account Name: ${accountName}`
        );

        showNotification(
            "📱",
            "Payment Submitted",
            "Your payment details have been sent to reception for verification."
        );


        // Close Mobile Money
        mobileMoneyPopup.style.display = "none";


        // Clear selected network
        clearSelections(
            mobileMoneyPopup,
            ".mobile-money-card"
        );


        // Hide instructions
        mobileMoneyInstructions.style.display = "none";


        // Clear payment fields
        document.getElementById("paymentPhone").value = "";
        document.getElementById("transactionId").value = "";
        document.getElementById("paymentAccountName").value = "";


        // Confirmation
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


// ==========================================
// CLOSE CARD PAYMENT — RETURN TO MAKE PAYMENT
// ==========================================

closeCardPayment.addEventListener("click", () => {

    // Close Card Payment
    cardPaymentPopup.style.display = "none";

    // Return to Make Payment
    paymentPopup.style.display = "flex";

});


// ==========================================
// CLICK OUTSIDE — RETURN TO MAKE PAYMENT
// ==========================================

cardPaymentPopup.addEventListener("click", (e) => {

    if (e.target === cardPaymentPopup) {

        // Close Card Payment
        cardPaymentPopup.style.display = "none";

        // Return to Make Payment
        paymentPopup.style.display = "flex";

    }

});

// ==========================================
// PAY AT RECEPTION POPUP
// ==========================================

const receptionPaymentPopup =
    document.getElementById("receptionPaymentPopup");

const closeReceptionPayment =
    document.querySelector(".closeReceptionPayment");


// ==========================================
// CLOSE PAY AT RECEPTION — RETURN TO MAKE PAYMENT
// ==========================================

closeReceptionPayment.addEventListener("click", () => {

    // Close Pay at Reception
    receptionPaymentPopup.style.display = "none";

    // Return to Make Payment
    paymentPopup.style.display = "flex";

});


receptionPaymentPopup.addEventListener("click", (e) => {

    if (e.target === receptionPaymentPopup) {

        // Close Pay at Reception
        receptionPaymentPopup.style.display = "none";

        // Return to Make Payment
        paymentPopup.style.display = "flex";

    }

});


// ==========================================
// REQUEST RECEPTION PAYMENT
// ==========================================

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


// ==========================================
// CLOSE LATE CHECKOUT — RETURN TO BILLING
// ==========================================

closeLateCheckout.addEventListener("click", () => {

    // Close Late Checkout
    lateCheckoutPopup.style.display = "none";

    // Return to Billing
    billingPopup.style.display = "flex";

});


lateCheckoutPopup.addEventListener("click", (e) => {

    if (e.target === lateCheckoutPopup) {

        // Close Late Checkout
        lateCheckoutPopup.style.display = "none";

        // Return to Billing
        billingPopup.style.display = "flex";

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
// SPA REQUEST
// ==========================================

document.getElementById("sendSpaRequest").addEventListener("click", () => {

    const service =
        document.getElementById("spaService").value.trim();

    const room =
        document.getElementById("spaRoom").value.trim();

    const date =
        document.getElementById("spaDate").value;

    const time =
        document.getElementById("spaTime").value;

    const guests =
        document.getElementById("spaGuests").value;


    // ======================================
    // VALIDATE REQUIRED INFORMATION
    // ======================================

    if (!service || !room || !date || !time || !guests) {

        showWarning(
            "Incomplete Information",
            "Please complete the cottage number, treatment, date, time, and number of guests."
        );

        return;
    }


    // ======================================
    // VALIDATE COTTAGE NUMBER
    // ======================================

    const roomNumber = Number(room);

    if (
        !Number.isInteger(roomNumber) ||
        roomNumber < 1 ||
        roomNumber > 12
    ) {

        showWarning(
            "Invalid Cottage Number",
            "Please enter a valid cottage number between 1 and 12."
        );

        document.getElementById("spaRoom").focus();

        return;
    }


    // ======================================
    // VALIDATE NUMBER OF GUESTS
    // ======================================

    const guestCount = Number(guests);

    if (
        !Number.isInteger(guestCount) ||
        guestCount < 1
    ) {

        showWarning(
            "Invalid Number of Guests",
            "The number of guests must be at least 1."
        );

        document.getElementById("spaGuests").focus();

        return;
    }


    // ======================================
    // GET TODAY'S DATE
    // ======================================

    const today = new Date();

    const todayYear =
        today.getFullYear();

    const todayMonth =
        String(today.getMonth() + 1).padStart(2, "0");

    const todayDay =
        String(today.getDate()).padStart(2, "0");

    const todayString =
        `${todayYear}-${todayMonth}-${todayDay}`;


    // ======================================
    // REJECT PAST DATES
    // ======================================

    if (date < todayString) {

        showWarning(
            "Invalid Spa Date",
            "Please select today or a future date."
        );

        document.getElementById("spaDate").focus();

        return;
    }


    // ======================================
    // CHECK TIME FOR TODAY
    // ======================================

    if (date === todayString) {

        const [hours, minutes] =
            time.split(":").map(Number);

        const currentMinutes =
            (today.getHours() * 60) +
            today.getMinutes();

        const selectedMinutes =
            (hours * 60) + minutes;


        if (selectedMinutes < currentMinutes + 10) {

            showWarning(
                "Invalid Spa Time",
                "For today's appointment, please select a time that is at least 10 minutes from now."
            );

            document.getElementById("spaTime").focus();

            return;
        }
    }


    // ======================================
    // GUEST NAME
    // ======================================

    const guestName =
        document.getElementById("spaName").value || "Guest";


    const btn =
        document.getElementById("sendSpaRequest");


    // ======================================
    // SEND REQUEST
    // ======================================

    showLoading(
        "Preparing Your Spa Experience...",
        () => {

            addRequest(
                "💆 Spa & Wellness",
                `${service} — Cottage ${roomNumber} — ${date} at ${time} — ${guestCount} guest${guestCount > 1 ? "s" : ""}`
            );


            showNotification(
                "💆",
                "Spa & Wellness",
                "Your spa request has been received."
            );


            // ==================================
            // CLEAR FORM AFTER SUCCESS
            // ==================================

            document.getElementById("spaRoom").value = "";
            document.getElementById("spaService").value = "";
            document.getElementById("spaDate").value = "";
            document.getElementById("spaTime").value = "";
            document.getElementById("spaGuests").value = "";
            document.getElementById("spaNotes").value = "";


            spaPopup.style.display = "none";


            showConfirmation(
                `Thank you, ${guestName}!`,
                "Your spa request has been received.",
                "Our wellness team will confirm your appointment shortly."
            );

        },
        btn
    );

});

// ==========================================
// NATURE WALK REQUEST
// ==========================================

document.getElementById("sendNatureWalkRequest").addEventListener("click", () => {

    const selectedWalk =
        natureWalkPopup.querySelector(".nature-card.selected");

    const date =
        document.getElementById("natureWalkDate").value;

    const time =
        document.getElementById("natureWalkTime").value;

    const guests =
        document.getElementById("natureWalkGuests").value;

    const notes =
        document.getElementById("natureWalkNotes").value.trim();

    // ==========================================
    // REQUIRED INFORMATION
    // ==========================================

    if (!selectedWalk || !date || !time || !guests) {

        showWarning(
            "Incomplete Information",
            "Please select a nature experience and complete the date, time, and number of guests."
        );

        return;
    }

    // ==========================================
    // NUMBER OF GUESTS
    // ==========================================

    const guestCount = Number(guests);

    if (!Number.isInteger(guestCount) || guestCount < 1) {

        showWarning(
            "Invalid Number of Guests",
            "The number of guests must be at least 1."
        );

        return;
    }

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
    const todayDay = String(today.getDate()).padStart(2, "0");

    const todayString =
        `${todayYear}-${todayMonth}-${todayDay}`;

    if (date < todayString) {

        showWarning(
            "Invalid Date",
            "Please select today or a future date for your nature walk."
        );

        return;
    }

    // ==========================================
    // TIME VALIDATION FOR TODAY
    // ==========================================

    if (date === todayString) {

        const [hours, minutes] =
            time.split(":").map(Number);

        const currentMinutes =
            (today.getHours() * 60) + today.getMinutes();

        const selectedMinutes =
            (hours * 60) + minutes;

        if (selectedMinutes < currentMinutes + 10) {

            showWarning(
                "Invalid Time",
                "For today's nature walk, please select a time that is at least 10 minutes from now."
            );

            return;
        }
    }

    // ==========================================
    // GET WALK NAME
    // ==========================================

    const walkName =
        selectedWalk.querySelector("strong").textContent.trim();

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("sendNatureWalkRequest");

    // ==========================================
    // SEND REQUEST
    // ==========================================

    showLoading("Arranging Your Nature Walk...", () => {

        addRequest(
            "🌿 Forest Nature Walk",
            `${walkName} — ${date} at ${time} — ${guestCount} guest${guestCount > 1 ? "s" : ""}${notes ? " — " + notes : ""}`
        );

        showNotification(
            "🌿",
            "Nature Activities",
            `${walkName} request has been received.`
        );

        // Clear form
        natureWalkPopup.querySelectorAll(".nature-card")
            .forEach(card => card.classList.remove("selected"));

        document.getElementById("natureWalkDate").value = "";
        document.getElementById("natureWalkTime").value = "";
        document.getElementById("natureWalkGuests").value = "";
        document.getElementById("natureWalkNotes").value = "";

        natureWalkPopup.style.display = "none";

        showConfirmation(
            `Thank you, ${guestName}!`,
            `${walkName} has been requested for ${guestCount} guest${guestCount > 1 ? "s" : ""}.`,
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

    // Find selected feedback options
    const selectedItems =
        feedbackPopup.querySelectorAll(".service-option.selected");

    // Get guest experience
    const experience =
        feedbackPopup.querySelector("textarea").value.trim();


    // ==========================================
    // CHECK FEEDBACK RATING
    // ==========================================

    if (selectedItems.length === 0) {

        showWarning(
            "No Feedback Selected",
            "Please select at least one feedback option before submitting."
        );

        return;
    }


    // ==========================================
    // CHECK EXPERIENCE MESSAGE
    // ==========================================

    if (!experience) {

        showWarning(
            "Experience Required",
            "Please tell us about your experience in the text area before submitting your feedback."
        );

        feedbackPopup.querySelector("textarea").focus();

        return;
    }


    // ==========================================
    // GUEST INFORMATION
    // ==========================================

    const guestName =
        localStorage.getItem("guestName") || "Guest";

    const btn =
        document.getElementById("submitFeedback");


    // ==========================================
    // CLOSE FEEDBACK POPUP
    // ==========================================

    feedbackPopup.style.display = "none";


    // ==========================================
    // SUBMIT FEEDBACK
    // ==========================================

    showLoading("Submitting Your Feedback...", () => {

        addRequest(
            "⭐ Feedback",
            experience
        );

        showNotification(
            "⭐",
            "Feedback",
            "Thank you for sharing your feedback."
        );


        // Clear rating selection
        clearSelections(
            feedbackPopup,
            ".service-option"
        );


        // Clear experience text
        feedbackPopup.querySelector("textarea").value = "";


        // Show confirmation
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

    document.getElementById("weatherGreeting").textContent = greeting;
}

updateGreeting();

// ==========================================
// LIVE WEATHER
// ==========================================

async function updateWeather(){

    const latitude = 0.5196;
    const longitude = 30.3184;

    const temperature = document.getElementById("weatherTemp");
    const humidity = document.getElementById("weatherHumidity");
    const icon = document.getElementById("weatherIcon");

    try {

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Africa%2FKampala`
        );

        if(!response.ok){

            throw new Error(
                `Weather request failed: ${response.status}`
            );

        }

        const data = await response.json();

        if(!data.current){

            throw new Error("No current weather data received");

        }

        const current = data.current;


        // TEMPERATURE

        if(temperature){

            temperature.textContent =
                `${Math.round(current.temperature_2m)}°C`;

        }


        // HUMIDITY

        if(humidity){

            humidity.textContent =
                `${Math.round(current.relative_humidity_2m)}%`;

        }


        // WEATHER ICON

        if(icon){

            icon.textContent =
                getWeatherIcon(current.weather_code);

        }


        console.log(
            "Mirima weather updated:",
            current.temperature_2m + "°C",
            current.relative_humidity_2m + "%",
            current.weather_code
        );


    } catch(error){

        console.error(
            "Mirima weather error:",
            error
        );

        // Keep the bar usable if the API temporarily fails

        if(temperature){
            temperature.textContent = "--°C";
        }

        if(humidity){
            humidity.textContent = "--%";
        }

        if(icon){
            icon.textContent = "🌤️";
        }

    }
}


// ==========================================
// WEATHER ICON
// ==========================================

function getWeatherIcon(code){

    if(code === 0) return "☀️";

    if(code >= 1 && code <= 3) return "🌤️";

    if(code >= 45 && code <= 48) return "🌫️";

    if(code >= 51 && code <= 67) return "🌧️";

    if(code >= 71 && code <= 77) return "❄️";

    if(code >= 80 && code <= 82) return "🌦️";

    if(code >= 95) return "⛈️";

    return "🌤️";
}


// First update
updateWeather();


// Refresh every 10 minutes
setInterval(updateWeather, 600000);
// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    const clock = document.getElementById("currentTime");

    if(!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("en-UG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
}

updateClock();

setInterval(updateClock, 1000);
// ==========================================
// CLOSE CONFIRMATION
// ==========================================

const closeConfirmation = document.getElementById("closeConfirmation");

closeConfirmation.addEventListener("click", () => {

    document.getElementById("orderConfirmation").style.display = "none";

 
});

});
