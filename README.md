## Hello, let's build a simple app that allows us to keep track of our favorite quotes and who said it.  

If you don't have json-server installed, run `npm i json-server -g`.  
If you already have it installed, run the server by: `json-server --watch db.json`.

### Deliverables
* Populate page with quotes with a `GET` request to `http://localhost:3000/quotes`.
* Each quotes should have the following structure:
  ```html
    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous</footer>
        <br>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
  ```
* Submitting the form should create a new quote.
* Whether you chooose to optimisticall render or not, the new quote should appear without having to refresh the page.
* Hitting the delete button should delete the respective quote. User should not have to refresh to see the quote removed from the page.  


* **BONUS**
* Add a an edit button to each quote-card that will allow the editing of a quote.
* Add a sort button on the page that I can toggle on and off that will sort the list of quotes by author name.
