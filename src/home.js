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
    
    // Function untuk menghitung jarak dari image
    function getDistanceFromImage(e, image) {
        var rect = image.getBoundingClientRect();
        var imageX = rect.left + rect.width / 2;
        var imageY = rect.top + rect.height / 2;
        var distX = e.clientX - imageX;
        var distY = e.clientY - imageY;
        return Math.sqrt(distX * distX + distY * distY);
    }
    
    // Event listener
    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, image);
    
        if (distance < threshold) {
            image.src = 'images/growth.gif';
        } else {
            image.src = 'images/growth.png';
        }
    });