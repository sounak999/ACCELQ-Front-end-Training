// const stars = document.querySelector('#stars')

// stars.addEventListener('mouseover', (e) => {
//     console.log(e.target);
// })

// stars.addEventListener('click', (e) => {
//     console.log(e);
// })

// Get all the star elements
const stars = document.querySelectorAll("#stars .star");

function isLeft(num) {
    let div = num / 0.5;
    if (div & 1) {
        return true;
    }

    return false;
}

let clickedValue = 0

// Add event listener to each star element
stars.forEach((star) => {
    star.addEventListener("click", () => {
        clickedValue = parseFloat(star.getAttribute("data-value"));

        // Loop through all the stars
        stars.forEach((star) => {
            const currentValue = parseFloat(star.getAttribute("data-value"));

            // If the current star's value is less than or equal
            // to the clicked star's value, add a class to it
            if (currentValue <= clickedValue) {
                if (isLeft(currentValue)) {
                    star.classList.add("left");
                } else {
                    star.classList.add("right");
                }
            } else {
                if (isLeft(currentValue)) {
                    star.classList.remove("left");
                } else {
                    star.classList.remove("right");
                }
            }
        });

        
        document.querySelector('h2').innerText = `You clicked ${clickedValue} stars`
    });

    star.addEventListener("mouseover", () => {
        clickedValue = parseFloat(star.getAttribute("data-value"));

        // Loop through all the stars
        stars.forEach((star) => {
            const currentValue = parseFloat(star.getAttribute("data-value"));

            // If the current star's value is less than or equal
            // to the clicked star's value, add a class to it
            if (currentValue <= clickedValue) {
                if (isLeft(currentValue)) {
                    star.classList.add("left");
                } else {
                    star.classList.add("right");
                }
            } else {
                if (isLeft(currentValue)) {
                    star.classList.remove("left");
                } else {
                    star.classList.remove("right");
                }
            }
        });

        document.querySelector('h2').innerText = `You clicked ${clickedValue} stars`
    });
});