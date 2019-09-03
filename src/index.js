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
                    <form class="edit-quote-form" data-id=${quote.id}>
                        <input class="form-control" name="quote" type="textarea" placeholder="${quote.quote}">
                        <input class="form-control" name="author" type="text" placeholder="${quote.author}">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <button class="btn-dark">Edit</button>
                    <button class='btn-danger'>Delete</button> 
                </blockquote>
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
        // else if (e.target.classList.contains('btn-dark')){
        //     const editForm = e.target.previousElementSibling
        //     editForm.style.display = "block"
        //     console.log(editForm)
        //     editForm.onsubmit = (e) => {
        //         console.log('I am submitted')
        //         debugger
        //     }
        // }
    })

    fetchQuotes()
})