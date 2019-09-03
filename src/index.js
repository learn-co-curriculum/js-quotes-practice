document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.querySelector('#quote-list')
    const newQuoteForm = document.querySelector('#new-quote-form')

    function fetchQuotes() {
        fetch('http://localhost:3000/quotes')
        .then( r => r.json())
        .then(renderQuotes) 
    }

    function renderQuotes(arrofQuotes) {
        quoteList.innerHTML = ""
        arrofQuotes.forEach((quote) => {
            addQuote(quote)
        })
    }

    function addQuote(quote) {
        quoteList.innerHTML += `
            <li class='quote-card' data-id=${quote.id}>
                <blockquote class="blockquote">
                    <p class="mb-0">${quote.quote}</p> 
                    <footer class="blockquote-footer">${quote.author}</footer> 
                    <br/>
                    <button class="btn-dark">Edit</button>
                    <button class='btn-danger'>Delete</button> 
                </blockquote>
                <form class="edit-quote-form" data-id="${quote.id}">
                <div class="form-group" >
                    <input class="form-control" name="quote" type="textarea" value="${quote.quote}">
                    </div>
                    <div class="form-group">
                    <input class="form-control" name="author" type="text" value="${quote.author}">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </li>`
    }


    newQuoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let newQuote = e.target.querySelector('#new-quote').value
        let newAuthor = e.target.querySelector('#author').value
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'quote': `${newQuote}`,
                'author': `${newAuthor}`
            })
        }
        fetch('http://localhost:3000/quotes', config)
        .then(r => r.json())
        .then(quote => {
            e.target.reset()
            addQuote(quote)
        })
    })

    quoteList.addEventListener('click', (e) =>{
        e.preventDefault()
        if (e.target.classList.contains('btn-danger')){
            let quoteId = e.target.parentElement.parentElement.dataset.id
            fetch(`http://localhost:3000/quotes/${quoteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(r => r.json())
            .then(data => {fetchQuotes()})
        }
        // This was trying to get edit button to work
        else if (e.target.classList.contains('btn-dark')){
            let editForm = e.target.parentElement.nextElementSibling
            console.log(editForm)
            //debugger
            // editForm.style.display = "block"
            // console.log(e.target)
            // e.target.parentElement.parentElement.innerHTML += `
            //     <form class="edit-quote-form">
            //         <div class="form-group">
            //         <input class="form-control" name="quote" type="textarea" value="">
            //         </div>
            //         <div class="form-group">
            //         <input class="form-control" name="author" type="text" value="">
            //         </div>
            //         <button type="submit" class="btn btn-primary">Submit</button>
            //     </form>`
            document.addEventListener("submit", (e) => {
                console.log("i am clicked")
            })
            console.log("editing form")
            // editForm.addEventListener('submit', (e) => {
            //     //debugger
            //     //e.preventDefault()
            //     console.log(e)
            // })

        }
    })

    fetchQuotes()
})