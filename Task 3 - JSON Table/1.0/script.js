const table = document.querySelector('table')

fetch('./users.json')
    .then(response => response.json())
    .then(users => {

        /***** Table Header *****/

        const userFields = Object.keys(users[0])
        const tableHeader = document.createElement('thead')
        let tableRow = document.createElement('tr')

        tableHeader.appendChild(tableRow)

        userFields.forEach(fieldName => {

            tableRow.innerHTML += `<th>${fieldName}</th>`
        })

        table.appendChild(tableHeader)

        /***** Table Body *****/

        const tableBody = document.createElement('tbody')

        users.forEach(user => {

            tableRow = document.createElement('tr')

            for (const fieldName in user) {

                const fieldValue = user[fieldName]
                tableRow.innerHTML += `<td data-label="${fieldName}">${fieldValue}</td>`
            }

            tableBody.appendChild(tableRow)
        })

        table.appendChild(tableBody)
    })
    .catch((err) => {
        document.querySelector('table').style.display = 'none'
        const h1 = document.createElement('h1')
        h1.innerText = `${err.message}`
        document.querySelector('body').appendChild(h1)
    })