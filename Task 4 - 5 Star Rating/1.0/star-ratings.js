const rating = document.querySelector(".rating");
const showValue = document.querySelector("#rating-value");

rating.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT") {
        const value = e.target.value;
		showValue.innerHTML = value + " out of 5";
    }
});


// const star = document.querySelectorAll('input');

// for (let i = 0; i < star.length; i++) {
// 	star[i].addEventListener('click', function() {
// 		i = this.value;

// 		showValue.innerHTML = i + " out of 5";
// 	});
// }