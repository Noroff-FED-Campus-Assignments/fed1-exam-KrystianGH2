import { navFunction } from "./navigation.js";
navFunction();

const slider = document.querySelector(".slider");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const trendingPostsElements = document.querySelector(".trendingPostsElements");
const latestFromElements = document.querySelector(".latestFromElements");

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

    const blogsItems = result;

    for (let i = 0; i < blogsItems.length; i++) {
      const featuredImage =
        blogsItems[i]._embedded["wp:featuredmedia"][0].media_details.sizes
          .medium.source_url;

      const altText = blogsItems[i]._embedded["wp:featuredmedia"][0].alt_text;
      let blogTitle = blogsItems[i].title.rendered;
      const categoryId = blogsItems[i].categories[0];

      const categoryName = await getCategoryName(categoryId);
      if (categoryName.startsWith("L")) {
        slider.innerHTML += `
        
        <div class="cards cardSlides">
        <img class="cardsImg" src="${featuredImage}" alt="${altText}">
        <a href="details.html?id=${blogsItems[i].id}&${blogTitle}">
            <h5 class="blogTitle">${blogTitle}</h5>
            <div class="smallTags">
            <p>${blogsItems[i].excerpt.rendered}</p>
            <small>${categoryName}</small>
            </div></a>
        </div>
        
        `;
      } else if (i <= 10) {
        trendingPostsElements.innerHTML += "";

        trendingPostsElements.innerHTML += `
        <div class="cards trendingPosts">
        <img class="cardsImg" src="${featuredImage}" alt="${altText}">
        <a href="details.html?id=${blogsItems[i].id}&${blogTitle}">
        <h5 class="blogTitle">${blogTitle}</h5>
        <div class="smallTags">
        <p>${blogsItems[i].excerpt.rendered}</p>
        <small>${categoryName}</small>
        </div></a>
        </div>`;
      } else if (
        categoryName.startsWith("E") &&
        latestFromElements.children.length < 6
      ) {
        latestFromElements.innerHTML += `
        <div class="cards latestFrom">
        <img class="cardsImg" src="${featuredImage}" alt="${altText}">
        <a href="details.html?id=${blogsItems[i].id}&${blogTitle}">
        <h5 class="blogTitle">${blogTitle}</h5>
        <div class="smallTags">
        <p>${blogsItems[i].excerpt.rendered}</p>
        <small>${categoryName}</small>
        </div></a>
        </div>`;
      }
    }

    const carouselItems = document.querySelectorAll(".cardSlides");
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    let carouselItemsWidth = 16.8;

    // Move to next slide
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalItems;
      let offset = -currentIndex * carouselItemsWidth;
      slider.style.transform = `translateX(${offset}%)`;
    };

    // Move to previous slide
    const previousSlide = () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      let offset = -currentIndex * carouselItemsWidth;
      slider.style.transform = `translateX(${offset}%)`;
    };

    nextButton.addEventListener("click", () => {
      nextSlide();
    });

    prevButton.addEventListener("click", () => {
      previousSlide();
    });
  } catch (e) {
    console.log(e);
  }
};

getBlogs();
