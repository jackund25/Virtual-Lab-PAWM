    //Pilih Konten section
    var pilihKontenimg1 = document.querySelector('#img1');
    var pilihKontenimg2 = document.querySelector('#img2');
    var pilihKontenimg3 = document.querySelector('#img3');
    var pilihKontenimg4 = document.querySelector('#img4');
    var threshold1 = 50;

    // Event listener for mousemove on the document
    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, pilihKontenimg1);
    
        if (distance < threshold1) {
            pilihKontenimg1.src = 'images/collision.gif';
        } else {
            pilihKontenimg1.src = 'images/collision.png';
        }
    });

    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, pilihKontenimg2);
    
        if (distance < threshold1) {
            pilihKontenimg2.src = 'images/billiard.gif';
        } else {
            pilihKontenimg2.src = 'images/billiard.png';
        }
    });

    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, pilihKontenimg3);
    
        if (distance < threshold1) {
            pilihKontenimg3.src = 'images/friction.gif';
        } else {
            pilihKontenimg3.src = 'images/friction.png';
        }
    });

    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, pilihKontenimg4);
    
        if (distance < threshold1) {
            pilihKontenimg4.src = 'images/growth.gif';
        } else {
            pilihKontenimg4.src = 'images/growth.png';
        }
    });

    // // Dragger Section
    // var swiper = new Swiper(".slide-content", {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //     loop: true,
    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //     },
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //   });
    
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let scrollAmount = 0;

nextBtn.addEventListener('click', () => {
  scrollAmount += carousel.offsetWidth;
  if (scrollAmount >= carousel.scrollWidth) {
    scrollAmount = 0;
  }
  carousel.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= carousel.offsetWidth;
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
  carousel.style.transform = `translateX(-${scrollAmount}px)`;
});

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