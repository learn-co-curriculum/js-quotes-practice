const quoteList = document.querySelector("#quote-list")
const newQuoteForm = document.querySelector("#new-quote-form")

newQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault()
        // console.log(newQuoteForm.quote)
        // create a new quote and add to our list
        // get the user input 
    const newQuote = document.querySelector("#new-quote").value
    const newAuthor = document.querySelector("#author").value

    // once we get the user input, make fetch happen
    // POST /quotes
    fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quote: newQuote,
                author: newAuthor
            })
        })
        .then(r => r.json())
        .then(newQuoteObj => {
            renderSingleQuote(newQuoteObj)
        })


    // then add it to our list of quotes

})

function renderSingleQuote(quote) {
    const newLi = document.createElement("li")
    newLi.className = "quote-card"

    let likesCount;
    if (quote.likes) {
        likesCount = quote.likes.length
    } else {
        likesCount = 0
    }

    newLi.innerHTML = `
  <blockquote id=${quote.id} class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${likesCount}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
  `

    // NESTED EVENT LISTENERS
    const deleteBtn = newLi.querySelector(".btn-danger")
    const likeBtn = newLi.querySelector(".btn-success")

    likeBtn.addEventListener("click", () => {
        // debugger
        fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quoteId: quote.id
                })
            })
            .then(r => r.json())
            .then(() => {
                const likesSpan = newLi.querySelector("span")
                likesSpan.textContent = parseInt(likesSpan.textContent) + 1
            })
    })

    deleteBtn.addEventListener("click", (event) => {
        // remove the quote from our list in the DOM
        newLi.remove()

        // do a fetch to delete on the server
        // DELETE /quotes/:id
        fetch(`http://localhost:3000/quotes/${quote.id}`, {
            method: "DELETE"
        })
    })

    quoteList.append(newLi)
}

// function handleDelete(event) {
//   event.target.closest(".quote-card").remove()
// }

// function to parse thru the data
function renderAllQuotes(quoteArray) {
    // and render each element to the page
    quoteArray.forEach(quote => {
        renderSingleQuote(quote)
    })
}

// Submitting the form creates a new quote 
// and adds it to the list of quotes without 
// having to refresh the page. Pessimistic rendering is reccommended.

fetch("http://localhost:3000/quotes?_embed=likes")
    .then(r => r.json())
    .then(quoteArray => renderAllQuotes(quoteArray))