const allStars = document.querySelector(".allStars");
let clickedValue = 0, isHalf = false

function displayStars(stars, clickedValue, isHalf) {
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
            if (isHalf) {

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
}

allStars.addEventListener('mouseover', (e) => {
    const stars = e.target.parentElement
    console.log(stars.tagName);

    stars.addEventListener("click", (e) => {
        const star = e.target
        clickedValue = parseInt(star.getAttribute("data-value"))

        // star width calculation
        const totalWidth = e.clientX;
        const starWidth = star.clientWidth;

        const starEffectiveWidth = totalWidth % starWidth;
        // console.log("eff", starEffectiveWidth);

        if (starEffectiveWidth < starWidth / 2) {
            isHalf = true
        } else {
            isHalf = false
        }

        displayStars(stars, clickedValue, isHalf)
    })

    stars.addEventListener("mouseover", (e) => {
        const star = e.target
        const hoveredValue = star.getAttribute("data-value");

        // star width calculation
        // const totalWidth = e.clientX - stars.offsetLeft;
        const totalWidth = e.clientX;
        const starWidth = star.clientWidth;

        const starEffectiveWidth = totalWidth % starWidth;
        let isHalfOnHover = false

        if (starEffectiveWidth < starWidth / 2) {
            isHalfOnHover = true
        }

        if ((clickedValue == 0) || (hoveredValue == clickedValue && isHalf && !isHalfOnHover) || (hoveredValue > clickedValue)) {
            displayStars(stars, hoveredValue, isHalfOnHover)
        }
    })

    stars.addEventListener('mouseout', () => {
        // console.log(clickedValue, ' ', isHalf);
        displayStars(stars, clickedValue, isHalf)
    })

})

