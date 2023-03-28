// BASE URL for Ramen JSON Local Server (Note:  There are 5 Objects, ID's 1-5)

const BASE_URL = "http://localhost:3000";

// Containers
const ramenMenuDiv = document.getElementById('ramen-menu');
const ramenDetailsDiv = document.getElementById('ramen-detail');

// Forms
const ramenForms = document.getElementById('ramen-forms');
const submitRamenForm = document.getElementById('new-ramen');
const updateRamenForm = document.getElementById('edit-ramen');

// Render On Page Locations
const ramenImage = document.querySelector('#ramen-detail img');
const ramenName = document.querySelector('#ramen-detail h2.name');
const ramenRestaurant = document.querySelector('#ramen-detail h3.restaurant');
const ramenRating = document.querySelector('#rating-display');
const ramenComment = document.querySelector('#comment-display');

const updatedRamenRating = document.getElementById('update-rating');
const updatedRamenComment = document.getElementById('update-comment');

// Fetch Ramen Data from API
const fetchRamens = () => {
    fetch(BASE_URL + "/ramens")
    .then(response => response.json())
    .then((ramenArr) => {
        console.log(ramenArr);
        renderRamenInMenu(ramenArr);
        renderFirstRamen(ramenArr);
    })
    .catch(error => console.log(error))
}

const renderRamenInMenu = (ramenArr) => {
    ramenArr.forEach(ramenObj => {
        const ramen = document.createElement('img');
        // Setting Attributes for Newly Created "RamenImg" Element
        // Turn these into an Object with src, name, restaurant, etc being keys and ramenObj.image, etc as the values
        ramen.src = ramenObj.image;
        ramen.name = ramenObj.name;
        ramen.restaurant = ramenObj.restaurant;
        ramenMenuDiv.appendChild(ramen);
        ramen.id = `ramen${ramenObj.id}`;
        ramen.rating = ramenObj.rating;
        ramen.comment = ramenObj.comment;
        displayRamen(ramen);
        submitNewRamen();
    })
}

const renderFirstRamen = (ramenArr) => {
    // const ramenImage = document.querySelector('#ramen-detail img');
    // const ramenName = document.querySelector('#ramen-detail h2.name');
    // const ramenRestaurant = document.querySelector('#ramen-detail h3.restaurant');
    ramenImage.src = ramenArr[0].image;
    ramenName.textContent = ramenArr[0].name;
    ramenRestaurant.textContent = ramenArr[0].restaurant;
    ramenRating.textContent = ramenArr[0].rating;
    ramenComment.textContent = ramenArr[0].comment;
}

const submitNewRamen = () => {
    submitRamenForm.addEventListener('submit', (event) => {
        const newRamen = document.createElement('img');
        // turn this into an object for newRamen.  Keys of name, restaurant, image, etc with the query selectors being the values
        // Note:  querySelector('#id') can be replaced with .restaurant, [new-rating], etc.  Looks Cleaner
        newRamen.name = submitRamenForm.querySelector('#new-name').value;
        newRamen.restaurant = submitRamenForm.querySelector('#new-restaurant').value;
        newRamen.src = submitRamenForm.querySelector('#new-image').value;
        // newRamen.alt = "Whoops!"; - This Kept Rendering 4 Images when the Source didn't render.
        newRamen.alt = newRamen.restaurant; // This Works though.
        newRamen.rating = submitRamenForm.querySelector('#new-rating').value;
        newRamen.comment = submitRamenForm.querySelector('#new-comment').value;
        
        console.log(newRamen);
        ramenMenuDiv.appendChild(newRamen);
        submitRamenForm.reset();
        event.preventDefault();
        displayRamen(newRamen);
    })
}

const displayRamen = (ramen) => {
    ramen.addEventListener('click', (event) => {
        ramenImage.src = event.target.src;
        ramenName.textContent = event.target.name;
        ramenRestaurant.textContent = event.target.restaurant;
        ramenRating.textContent = event.target.rating;
        ramenComment.textContent = event.target.comment;
        // console.log(ramenRating);
        // console.log(ramenComment);
        // console.log(ramen);
        // updateRamen(ramen);
})
}

const updateRamen = () => {
    updateRamenForm.addEventListener('submit', (event) => {
        ramenRating.textContent = updatedRamenRating.value;
        ramenComment.textContent = updatedRamenComment.value;
        event.preventDefault();
        updateRamenForm.reset();
    })
}

const deleteRamen = () => {
    const deleteButtonDiv = document.createElement('div')
    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete Ramen';
    deleteButton.id = "deleteButton";
    deleteButtonDiv.appendChild(deleteButton);
    ramenDetailsDiv.prepend(deleteButtonDiv);
    //docment.querySelector(`#ramen-${ramenObj.id}`).remove();
    // Need to set the Interpolation for ramenObj and give ramenObj an id in the first place(also with interpolation)
}

document.addEventListener('DOMContentLoaded', function() {
    fetchRamens();
    updateRamen();
    deleteRamen();
})