const circles = document.querySelectorAll('circle')
const input = document.querySelector('input')
const button = document.querySelector('button')
const percentage = document.querySelector('span')

button.addEventListener('click', func)

function func() {
    let timeInSeconds = Number(input.value)

    let count = 0
    const circulerPath = setInterval(() => {

        percentage.textContent = ` ${count}%`
        circles[1].style.strokeDashoffset = `calc((100 * 6) - ((100 * 6) * ${count}) / 100)`;

        if (count >= 100)
            clearInterval(circulerPath);

        count++
        
    }, timeInSeconds * 10)

    input.value = ''
}