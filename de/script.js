document.addEventListener("scroll", function() {
  var header = document.querySelector("header");
  var logoImage = document.querySelector(".logo-image img");
  var logoText = document.querySelector(".logo-text");
  var threshold = 50; // The scroll threshold to trigger the style change

  if (window.scrollY > threshold) {
      header.classList.add("scrolled");
      logoImage.style.display = 'none'; // Hide logo image
      logoText.style.display = 'block'; // Show text logo
  } else {
      header.classList.remove("scrolled");
      logoImage.style.display = 'block'; // Show logo image
      logoText.style.display = 'none'; // Hide text logo
  }
});

// Variables to track the current and previous room
let currentRoom = 1;

function clearAnimations() {
  document.querySelectorAll('.room-display').forEach(room => {
    room.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
  });
}

function showRoom(roomNumber) {
  const oldRoom = document.getElementById(`room${currentRoom}`);
  const newRoom = document.getElementById(`room${roomNumber}`);
  const buttons = document.querySelectorAll('.cycle-menu button');

  // Update the button states
  buttons.forEach((button, index) => {
    if (index + 1 === roomNumber) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });

  if (roomNumber !== currentRoom) {
    clearAnimations();

    if (roomNumber > currentRoom) {
      // New room slides in from the right, old room slides out to the left
      newRoom.classList.add('slide-in-right', 'active');
      oldRoom.classList.add('slide-out-left');
    } else {
      // New room slides in from the left, old room slides out to the right
      newRoom.classList.add('slide-in-left', 'active');
      oldRoom.classList.add('slide-out-right');
    }

    // Set a timeout to remove the 'active' class from the old room and reset animations
    setTimeout(() => {
      oldRoom.classList.remove('active');
      clearAnimations();
    }, 500); // This should be the duration of your slide animations
  }

  // Update the current room number
  currentRoom = roomNumber;
}

// Event listeners for the cycle menu buttons
document.addEventListener('DOMContentLoaded', function() {
  const cycleMenuButtons = document.querySelectorAll('.cycle-menu button');

  cycleMenuButtons.forEach((button, index) => {
    button.addEventListener('click', () => showRoom(index + 1));
  });

  // Initialize the display of the first room
  showRoom(currentRoom);
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default anchor behavior

      const targetId = this.getAttribute('href'); // Get the href attribute
      const targetElement = document.querySelector(targetId); // Find the corresponding element

      if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; // Get the target position from the top of the document
          const offsetPosition = targetPosition - 70; // Adjust position to account for header

          window.scrollTo({
              top: offsetPosition, // Scroll to the adjusted position
              behavior: 'smooth' // Smooth scroll
          });
      }
  });
});
