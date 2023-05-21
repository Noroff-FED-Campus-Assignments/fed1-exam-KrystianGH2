
const navLinks = document.querySelector(".nav-links");
const menuButton = document.querySelector(".menuButton");
const navLinksLi = document.querySelectorAll(".nav-links li");

const navFunction = () => {
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


// const carouselContainer = document.querySelector(".carousel-container");
const slider = document.querySelector(".slider");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");


const options = { method: "GET" };
let url =
"https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts?_embed&per_page=100";

const getBlogs = async () => {
  const getCategoryName = async (categoryId) => {
    const categoryUrl = `https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/categories/${categoryId}`;
    const categoryData = await fetch(categoryUrl, options);
    const categoryResult = await categoryData.json();
    return categoryResult.name;
  };
  
  try {
    const data = await fetch(url, options);
    const result = await data.json();
    
    console.log(result);
    
    const blogsItems = result;
    
    for (let i = 0; i < blogsItems.length; i++) {
      const featuredImage =
      blogsItems[i]._embedded["wp:featuredmedia"][0].media_details.sizes
      .medium.source_url;
      
      const altText = blogsItems[i]._embedded["wp:featuredmedia"][0].alt_text;
      
      const categoryId = blogsItems[i].categories[0];
      
      
      
      const categoryName = await getCategoryName(categoryId);
      if(categoryName.startsWith("L")) {
        slider.innerHTML += `
        
        <div class="cards">
        <img class="cardsImg" src="${featuredImage}" alt="${altText}">
        <h5 class="blogTitle">${blogsItems[i].title.rendered}</h5>
        <div class="smallTags">
        <p>${blogsItems[i].excerpt.rendered}</p>
        <small>${categoryName}</small>
        </div>
        </div>
        
        `;
        
      }
    }

    const cards = document.querySelector('.cards');
    const carouselItems = document.querySelectorAll(".carouselItems");
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    console.log(totalItems);

    // Move to next slide
    
    const nextSlide = () =>{
      currentIndex = currentIndex + 1 * totalItems;
      if (currentIndex === 0) {
        currentIndex = totalItems -1 * 0}

      updateCarousel();
      
    }
    
    // Move to previous slide
    
    const previousSlide = () =>{
        if(currentIndex <= 0) {
          currentIndex = currentIndex - 0 * totalItems;
        } 
        currentIndex = currentIndex - 1 * totalItems;
      
      updateCarousel();
    }
    
    const updateCarousel = () =>{
      const offset = -currentIndex * 16.8;
      slider.style.transform = `translateX(${offset}%)`;
    }
    
    nextButton.addEventListener("click", ()=>{
      console.log("cliked");
      nextSlide();
    });
    

    prevButton.addEventListener("click", ()=>{
      console.log("cliked");
      previousSlide();
    });
    
    

  } catch (e) {
    console.log(e);
  }
};

getBlogs();

