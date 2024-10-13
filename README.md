# Royal Rumble - Phase 1 Project

## Project Requirements

- Your app must be a HTML/CSS/JS frontend that accesses data from a public API or from a db.json file using json-server. Your API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format. Try to avoid using an API that requires a key. APIs that are free and require no authorization will be easiest to use. For ideas, see this list of no-auth APIsLinks to an external site.. If you would like to use an API that requires a key, please consult with your instructor on how to protect that key. NEVER push your API key to github!

- Your entire app must run on a single page. There should be NO redirects or reloads. In other words, your project will contain a single HTML file.

- Use at least 3 distinct event listenersLinks to an external site. (3 events of different types) that enable interactivity. What this means is that, if you had 3 click events, that would only count as 1 distinct event and you would need to add at least 2 more. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc. Each of your event listeners should also have its own unique callback function. These must be added using JavaScript's .addEventListener() method. Events embedded into HTML elements and CSS will not count toward the total. Please ask your instructor if you have questions regarding this requirement.

- Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.

- Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.

## Introduction

It is Royal Rumble where multiple wrestlers enter the ring. The goal is to eliminate the other wrestlers by throwing them overboard the top ring. The last wrestler in the ring is considered the winner. For this exercise, the winner is the wrestler with the top most votes. The site is intended to accomplish the following:

1. Access the list of wrestlers from an API (mocked using JSON Server) and render each of the wrestler's name in the wrestler list div on the page.
2. Create a mouseover event listener in the wrestler list where the wrestler image will be displayed in the wrestler container div on the page if the wrestler name is in mouseover.. During the mouseout event listener, the wrestler image will be removed in the wretler container div.
3. Create a click event listener in the wrestler list where the wrestler values will populate in the wrestler card div. It will also create two buttons; Vote button and Eliminate Wrestler button.
4. Create a click event listener in the Vote button which would add a vote in the wrestler card vote value. It will also send a PATCH request to reflect the votes in the API.
5. Create a click event listener in the Eliminate Wrestler button where it will send a DELETE patch to remove the object in the API. It will then send a GET request to refetch from the API and rended each in the wrestler list again, now with the deleted wrestler removed from the list.
6. Create a button to sort the wrestler list based on the wrestler votes.
7. Add a form to add a wrestler. Add a submit event listener to capture the entered information, then to send a POST request to add the new wrestler information in the API. It will then send a GET to refetch from the API and rended each in the wrestler list again, now with the new wrestler added to the list.

### `fetchWrestlers`
* **Behavior**
  * Send a GET request to db.json. The fetch array will be sorted based on the votes, empty the `wrestler-list2` div, then iterate the array that for each array, it would pass through the `renderOneWrestler` function.it would display the wrestler name in the `wrestler-list2` div as an ordered list

### `renderOneWrestler`
* **Behavior**
  * For each iterated array from fetchWrestlers, it would display the wrestler name in the `wrestler-list2` div as an ordered list. Within the the function, there are click, mouseover, and mouseout event listeners. Each event listener leads to the following functions: `mouseOver`, `mouseOut` `mouseClick`.

  ### `mouseOver`
  * **Behavior**
    * It will change the background color of the iterated array to Red. This would delete the HTML within the `wrestler-container` div. It would then capture all the iterated array information as an argument for the `wrestlerContainer` function.

  ### `mouseOut`
  * **Behavior**
    * It will change the background color of the iterated array to black..This would delete the HTML within the `wrestler-container` div.

  ### `mouseClick`
  * **Behavior**
    * This would delete the HTML within the `wrestler-card` div. It would then capture all the iterated array information as an argument for the `wrestlerCard ` function.

### `wrestlerContainer`
* **Behavior**
  * From the iterated array captured from the `mouseClick` event listener, a column div will be created the wrestler image value will be added to the `wrestler-container` div.

### `wrestlerCard`
* **Behavior**
  * From the iterated array captured from the `mouseClick` event listener, a column div be created and all the wrestler values will be added to the `wrestler-card` div. 
  * A Vote button and an Eliminate Wrestler button will be added in the div.
  * A click event listener will be added to the Vote button which would add a vote in the `wrestler-card` div. It will also invoke the `updateLikes` function.
  * A click event listener will be added to the Eliminate Wrestler button which would invoke the `deleteWrestler` function.

  ### `updateLikes`
* **Behavior**
  * A PATCH request will be send updating the ID based on the ID captured in the iterated array now in the `wrestler-card` div.

### `deleteWrestler`
* **Behavior**
  * A DELETE request will be send updating the ID based on the ID captured in the iterated array and delete the object in the API.
  * `fetchWrestlers` will be invoked to provide a new list in the `wrestler-list2` div with the new list.
  * display the default image in the `wrestler-card` div.

### `handleNewWrestler`
* **Behavior**
  * from the `form-example` form, a submit event listener is added, once submitted, it will capture the data entered to create a `wrestlerObj`. This would then be used as an argument and invoke the `addNewWrestler` function.

### `addNewWrestler`
* **Behavior**
  * send a POST request with the `wrestlerObj` from `handleNewWrestler` and add it as an object in the wrestlers API. fetchWrestlers` will be invoked to provide a new list in the `wrestler-list2` div with the new list.