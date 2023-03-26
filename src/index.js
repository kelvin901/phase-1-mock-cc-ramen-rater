const ramenMenu = document.querySelector('#ramen-menu');

// Fetch the ramen data from the server
fetch('http://localhost:3000/ramen')
  .then(response => response.json())
  .then(ramenData => {
    // Iterate through each ramen object and display its image
    ramenData.forEach(ramen => {
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;
      ramenMenu.appendChild(ramenImg);
    });
  });
