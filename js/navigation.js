export { navFunction };

const navFunction = () => {
  const navLinks = document.querySelector(".nav-links");
  const menuButton = document.querySelector(".menuButton");
  const navLinksLi = document.querySelectorAll(".nav-links li");
  menuButton.onclick = () => {
    navLinks.classList.toggle("active");

    navLinksLi.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.12
        }s`;
      }
    });
    // menu Animation
    menuButton.classList.toggle("toggle");
  };
};

navFunction();
