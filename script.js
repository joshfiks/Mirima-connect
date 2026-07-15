// ==========================================
// MIRIMA CONNECT
// Main Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

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

    function stopAllAudio(){

        dayForest.pause();
        dayBirds.pause();
        nightForest.pause();

        dayForest.currentTime = 0;
        dayBirds.currentTime = 0;
        nightForest.currentTime = 0;

    }

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

    function playAmbience(){

        stopAllAudio();

        const hour = new Date().getHours();

        if(hour >= 18 || hour < 6){

            nightForest.play();

        }else{

            dayForest.play();
            dayBirds.play();

        }

    }

    updateTheme();

    setInterval(updateTheme,60000);

    enterButton.addEventListener("click", () => {

        playAmbience();

    });

});
