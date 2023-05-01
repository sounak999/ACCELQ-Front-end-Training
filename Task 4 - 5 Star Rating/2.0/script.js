// Get all star elements
const stars = document.querySelectorAll(".star");

// Add event listener for mouseover and mouseout
stars.forEach((star) => {
    star.addEventListener("mouseover", hoverStar);
    star.addEventListener("mouseout", resetStars);
    star.addEventListener("click", setRating);
});

// Hover over a star
function hoverStar(e) {
    const star = e.target;
    const value = star.dataset.value;
    highlightStars(value);
}

// Reset all stars
function resetStars() {
    stars.forEach((star) => {
        star.classList.remove("full");
        star.classList.remove("half");
    });
}

// Set the rating on click
function setRating(e) {
    const star = e.target;
    const value = star.dataset.value;
    alert(`You rated ${value} stars!`);
}

// Highlight stars up to the selected one
function highlightStars(value) {
    stars.forEach((star) => {
        star.classList.remove("full");
        star.classList.remove("half");
        const starValue = star.dataset.value;
        if (starValue <= value) {
            star.classList.add("full");
        } else if (starValue - 0.5 === parseFloat(value)) {
            star.classList.add("half");
        }
    });
}
