// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', init())

function init() {
    getQuotes()
}

function getQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(res => res.json()).then(data => data.forEach(renderQuote))
}

function renderQuote(quote) {
    console.log(quote)
    html = ` <li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">Someone famous</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li> `
    const quoteContainer = document.querySelector('#quote-list')

}