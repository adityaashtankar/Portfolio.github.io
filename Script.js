function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "adityaa.ee21@sbjit.edu.in",
    Password: "F7E8B9222BDA7109ECF68529165974C4F260",
    To: "adityaa.ee21@sbjit.edu.in",
    From: "adityaashtankar.14@gmail.com",
    Subject: "Portfolio Contact Page",
    Body:
      "Name:-" +
      document.getElementById("name").value +
      "<br> Email:" +
      document.getElementById("email").value +
      "<br> Message:" +
      document.getElementById("message").value,
  }).then(message=>{
    if(message == "OK"){
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
    }

  });
}
function isMobileDevice() {
  return window.innerWidth <= 508;
}

document.addEventListener('DOMContentLoaded', function() {
  var viewOnWebButton = document.getElementById('viewOnWebButton');
  if (isMobileDevice()) {
    alert("Use Your Device Browser like Chrome.. for Best User Experience");
  }
});
var lastscolltop = 0;
navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  var scrollTop = window.pageXOffset || document.documentElement.scrollTop;
  if (scrollTop > lastscolltop) {
    navbar.style.top = "-80px";
  } else {
    navbar.style.top = "0";
  }
  lastscolltop = scrollTop;
});
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1000);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



  // Function to toggle between light and dark mode
  function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');

    // Toggle the dark mode class on the body
    body.classList.toggle('dark-mode', !isDarkMode);

    // Update the button text based on the mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

    // Save the user's preference to localStorage
    localStorage.setItem('darkMode', !isDarkMode);
  }

  // Check for user's dark mode preference from localStorage
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode) {
    document.body.classList.toggle('dark-mode', savedDarkMode === 'true');
    
    // Update the button text based on the mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.textContent = savedDarkMode === 'true' ? 'Dark Mode' : 'Light Mode';
  }


