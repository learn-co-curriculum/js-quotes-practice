const quoteList = document.querySelector("#quote-list")
const quoteForm = document.querySelector("#new-quote-form")

quoteForm.addEventListener("submit", formSubmit)

//function to submit form
function formSubmit(event){
    event.preventDefault()
    const quote = event.target["quote"].value
    const author =  event.target["author"].value

    quoteObj = {
        "quote": quote,
        "author": author
    }
    postQuote(quoteObj)
    event.target.reset()
}

//function to get quotes
function getQuotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(response => response.json())
    .then(renderQuotes)
}

//function to post a quote
function postQuote(quoteObj){
    fetch("http://localhost:3000/quotes",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then(response => response.json())
    .then(quoteObj =>{
        renderQuote(quoteObj)
    })
}

//function to render quotes
function renderQuotes(quotes){
    quotes.forEach(renderQuote)
}

//render quote function
function renderQuote(quote){
        if (!quote.likes){
            quote.likes = []
        }
        //li for each quote
        const card = document.createElement("li")
        card.classList.add("quote-card")
        card.dataset.id = quote.id

        //blockquote element for each card
        const blockquote = document.createElement('blockquote')
        blockquote.classList.add("blockquote")

        //p element for quote content
        const p = document.createElement("p")
        p.classList.add("mb-0")
        p.textContent = quote.quote

        //footer element for quote author
        const footer = document.createElement("footer")
        footer.classList.add("blockquote-footer")
        footer.textContent = quote.author

        //like button element for quote
        const likeButton = document.createElement("button")
        likeButton.classList.add("btn-success")
        likeButton.innerHTML = `Likes: <span>${quote.likes.length}</span>`

        //delete button element for quote
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("btn-danger")
        deleteBtn.textContent = "Delete"

        //append p, footer, like button, and delete button to blockquote
        blockquote.append(p, footer, likeButton, deleteBtn)

        //append blockquote to card and card to quote list
        card.append(blockquote)
        quoteList.append(card)

        //add event listener to card, callback handle button function to determine which button was clicked
        card.addEventListener("click", handleButton)


}

//function to handle button clicks on card
function handleButton(event){
    card = event.target.parentElement.parentElement
    // console.log(card)
    if (event.target.textContent == "Delete"){
        deleteQuote(card.dataset.id)
        card.remove()
    }else if (event.target.textContent.includes("Likes: ")){
        likeQuote(card.dataset.id)
        const likeBtn = card.querySelector(".btn-success")
        likesCount = likeBtn.getElementsByTagName("span")
        likesCount.item(0).textContent = parseInt(likesCount.item(0).textContent) + 1

    }
}


//function to delete a quote
function deleteQuote(id){
    return fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())

}

//function to like a quote
function likeQuote(id){
    const data = {
        "quoteId": parseInt(id),
        "createdAt": Date.now()
    }
    return fetch(`http://localhost:3000/likes`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
}


getQuotes()