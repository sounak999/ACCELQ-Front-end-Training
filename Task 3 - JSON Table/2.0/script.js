const table = document.querySelector('.table')

fetch('./users.json')
    .then(response => response.json())
    .then(users => {

        /***** Table Header *****/

        const userFields = Object.keys(users[0])
        const tableHeader = document.createElement('div')
        tableHeader.classList.add('thead')

        let tableRow = document.createElement('div')
        tableRow.classList.add('tr')

        userFields.forEach(fieldName => {
            // creating th class
            const th = document.createElement('div')

            // adding class
            th.classList.add('th')
            th.classList.add(fieldName.toLowerCase())

            // updating the text
            th.appendChild(document.createTextNode(fieldName))

            // setting title attribute
            th.setAttribute('title', fieldName)

            // updating table row
            tableRow.appendChild(th)
        })

        // adding rows in thead
        tableHeader.appendChild(tableRow)

        // thead is added inside table
        table.appendChild(tableHeader)


        /***** Table Body *****/

        const tableBody = document.createElement('div')
        tableBody.classList.add('tbody')

        users.forEach(user => {

            tableRow = document.createElement('div')
            tableRow.classList.add('tr')

            for (const fieldName in user) {
                // extracting the value of object
                const fieldValue = user[fieldName]

                // creating td class
                const td = document.createElement('div')

                // adding class
                td.classList.add('td')
                td.classList.add(fieldName.toLowerCase())

                // updating text
                td.appendChild(document.createTextNode(fieldValue))

                // setting title attribute
                td.setAttribute('title', fieldValue)

                // updating table row
                tableRow.appendChild(td)
            }

            // adding rows in tbody
            tableBody.appendChild(tableRow)
        })
        
        // tbody is added inside table
        table.appendChild(tableBody)
    })
    .catch((err) => {
        document.querySelector('.table').style.display = 'none'
        const h1 = document.createElement('h1')
        h1.innerText = `${err.message}`
        document.querySelector('body').appendChild(h1)
    })
