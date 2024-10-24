function validateForm(event) {
    // Get the feedback value
    var feedback = document.getElementById("feedback").value.trim();
    var successMessage = document.getElementById("successMessage");
    
    // Check if feedback is empty
    if (feedback === "") {
        // Prevent form submission
        event.preventDefault();
        
        // Show an alert
        alert("Feedback cannot be empty! Please provide your feedback.");
    } else {
        // Show success message
        successMessage.style.display = "block";
        
        // Clear the form fields
        document.getElementById("feedbackForm").reset();
        
        // Prevent actual submission for this demo
        event.preventDefault();
    }
}

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