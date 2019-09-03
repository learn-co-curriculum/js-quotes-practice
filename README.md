# JavaScript Quotes Practice

## Learning Goals

1. Use `json-server` to provide a basic RESTful data store
2. Build a simple, event-driven, JavaScript DOM-modifying application

## Introduction

Hello, let's build a simple app that allows us to keep track of our favorite quotes and who said them.

## Use `json-server` to Provide a Basic RESTful Data Store

If you don't have `json-server` installed, run `$ npm i -g json-server`.

If you already have it installed, run the server by: `$ json-server --watch
db.json`.

## Build a simple, Event-driven, JavaScript DOM-modifying application

* 🔮Populate page with quotes with a `GET` request to
  `http://localhost:3000/quotes`. 

* 🔮Each quote should have the following structure:
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

* 🔮Submitting the form creates a new quote and adds it to the list of quotes
  without having to refresh the page. Pessimistic rendering is reccommended. Make a Post Request to `http://localhost:3000/quotes`.

* 🔮Clicking the delete button should delete the respective quote from the
  API and remove it from the page without having to refresh. Make a Delete Request to `http://localhost:3000/quotes/:id`.


## Extend Your Learning

* Add an edit button to each quote-card that will allow the editing of a quote. _(Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)_

* Add a sort button that can be toggled on or off. When off the list of
  quotes will appear sorted by the ID. When the sort is active, it will
  display the quotes by author's name, alphabetically.
  * One way of doing this is to sort the quotes in JS after you've retrieved them from the API. Try this way first.
  * Another way of doing this is to make a fetch to `http://localhost:3000/quotes?_sort=author`
  * What are the pros and cons in doing the sorting on the client vs. the server? Discuss with a partner.

## Conclusion

Building an application like this is a typical interview exercise. It's not
uncommon to be set in front of a foreign computer (or asked to bring your own)
and to receive a specification like this.

[UNIX time]: https://en.wikipedia.org/wiki/Unix_time
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
