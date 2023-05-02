const stars = document.querySelector(".stars");

stars.addEventListener("click", (e) => {
    const star = e.target;
    const clickedValue = star.getAttribute("data-value");

    // star width calculation
    const totalWidth = e.clientX;
    const starWidth = star.clientWidth;

    const starEffectiveWidth = totalWidth % starWidth;
    // console.log("eff", starEffectiveWidth);


    const starsArray = Array.from(stars.children);
    // console.log(starsArray);

    starsArray.forEach(function (star) {
        const starValue = parseInt(star.getAttribute("data-value"));

        // when star value is less than clicked value, full star
        if (starValue < clickedValue) {
            // if half is assigned, remove it
            if (star.classList.contains("half")) 
                star.classList.remove("half");

            star.classList.add("full");

        } else if (starValue == clickedValue) {
            // when effective width is half or less, half star
            if (starEffectiveWidth < starWidth / 2) {

                // if full star is already there, remove it
                if (star.classList.contains("full"))
                    star.classList.remove("full");

                star.classList.add("half");

            // when more than half, full star
            } else {
                // if half star is already there, remove it
                if (star.classList.contains("half"))
                    star.classList.remove("half");
                    
                star.classList.add("full");
            }

        } else if (star.classList.contains("full")) {
            star.classList.remove("full");
        } else {
            star.classList.remove("half");
        }
    });
});
