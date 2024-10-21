    // Toggle mobile
    const menu = document.querySelector('#mobile-menu');
    const menuLinks= document.querySelector('.nb-menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    }) 

    // Micro Interaction di logo
    var image = document.querySelector('.nb-container img');
    var threshold = 30; // Distance in pixels
    
    // Function to calculate the distance between the cursor and the image
    function getDistanceFromImage(e, image) {
        var rect = image.getBoundingClientRect();
        var imageX = rect.left + rect.width / 2;
        var imageY = rect.top + rect.height / 2;
        var distX = e.clientX - imageX;
        var distY = e.clientY - imageY;
        return Math.sqrt(distX * distX + distY * distY);
    }
    
    // Event listener for mousemove on the document
    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, image);
    
        if (distance < threshold) {
            image.src = 'images/growth.gif'; // Replace PNG with GIF if close enough
        } else {
            image.src = 'images/growth.png'; // Revert to PNG if far
        }
    });
