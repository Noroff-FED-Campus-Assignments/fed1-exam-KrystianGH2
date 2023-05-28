export { navFunction, errorMessage, openModal, closeModal} ;

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


const errorMessage = `<div class="errorMessage">Apologies! We're experiencing a temporary issue fetching the latest travel blog data. Our team is working to fix it. Please bear with us.</div>`

 function openModal (image){
  const modal = document.querySelector("#imgModal");
  const modalImage = document.querySelector("#modalImages")
  modal.style.display = "block";
  modalImage.src = image.src
}

function closeModal (){
  const closeModalButton = document.querySelector(".close");
  const  modal = document.querySelector("#imgModal");
  closeModalButton.addEventListener("click", () =>{
    modal.style.display = "none"

  })
}