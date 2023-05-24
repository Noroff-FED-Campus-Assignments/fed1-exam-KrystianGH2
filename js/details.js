const myUrlValues = window.location.search;
const params = new URLSearchParams(myUrlValues);
const postId = params.get("id");

import { navFunction } from "./navigation.js";
navFunction();

const cardHolder = document.querySelector(".cardHolder");

const options = { method: "GET" };
const url =
  "https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts/" +
  postId +
  "/?_embed";
async function getBlogs() {
  try {
    const data = await fetch(url, options);
    const response = await data.json();
    const blogPosts = response;

    const content = blogPosts.content.rendered;

    cardHolder.innerHTML += `
                <div class="blogCards">
                <h1 class="blogTitle-details">${blogPosts.title.rendered}</h1>
                <div class="blogContent">${content}</div>
            </div>

                `;
  } catch (err) {
    console.log(err);
  }
}

getBlogs();

const commentForm = document.querySelector("#commentForm");
const commentInput = document.querySelector("#commentInput");
const commentSection = document.querySelector("#commentSection");
const comments = [];

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const commentText = commentInput.value;
  commentInput.value = "";

  const newComment = {
    text: commentText,
    timeStamp: new Date().toLocaleDateString("en-NO"),
  };

  comments.push(newComment);
  renderedComments();
});

const renderedComments = () => {
  commentSection.innerHTML = "";

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const postComments = document.createElement("div");
    postComments.innerHTML = `
    <div class="comment">
    <div class="iconUser"><i class="fa-solid fa-user"></i></div>
    <div class="commentDates">
    <p class="commentText">${comment.text}</p>
    <small class="commentTimeStamp">${comment.timeStamp}</small></div>
    </div>
    `;
    commentSection.appendChild(postComments);
  }
  if (commentSection !== "") {
    commentSection.style.display = "flex";
  }
};

const slider = document.querySelector(".slider");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

let url2 =
  "https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts?_embed&per_page=100";

const getBlogs2 = async () => {
  const getCategoryName = async (categoryId) => {
    const categoryUrl = `https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/categories/${categoryId}`;
    const categoryData = await fetch(categoryUrl, options);
    const categoryResult = await categoryData.json();
    return categoryResult.name;
  };

  try {
    const data = await fetch(url2, options);
    const result = await data.json();

    const blogsItems = result;

    for (let i = 0; i < blogsItems.length; i++) {
      const featuredImage =
        blogsItems[i]._embedded["wp:featuredmedia"][0].media_details.sizes
          .medium.source_url;

      const altText = blogsItems[i]._embedded["wp:featuredmedia"][0].alt_text;
      let blogTitle = blogsItems[i].title.rendered;
      const categoryId = blogsItems[i].categories[0 && 1 && 2];

      const categoryName = await getCategoryName(categoryId);
      if (categoryName.startsWith("L")) {
        slider.innerHTML += `
        
        <div class="cards">
        <img class="cardsImg" src="${featuredImage}" alt="${altText}">
        <a href="details.html?id=${blogsItems[i].id}&${blogTitle}">
            <h5 class="blogTitle">${blogTitle}</h5>
            <div class="smallTags">
            <p>${blogsItems[i].excerpt.rendered}</p>
            <small>${categoryName}</small>
            </div></a>
        </div>
        
        `;
      }
    }

    const carouselItems = document.querySelectorAll(".carouselItems");
    // const carouselContainer = document.querySelector(".carousel-container");
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    console.log(totalItems);

    let carouselItemsWidth = 16.8;

    // Move to next slide
    const nextSlide = () => {
      currentIndex = currentIndex + 1 * totalItems;
      let offset = -currentIndex * carouselItemsWidth;
      slider.style.transform = `translateX(${offset}%)`;
    };

    // Move to previous slide
    const previousSlide = () => {
      if (offset === 0) {
        offset++;
        prevButton.disabled = true;
      }
      currentIndex = currentIndex - 1 * totalItems;
      let offset = -currentIndex * carouselItemsWidth;
      slider.style.transform = `translateX(${offset}%)`;
    };

    nextButton.addEventListener("click", () => {
      console.log("cliked");
      nextSlide();
    });

    prevButton.addEventListener("click", () => {
      console.log("cliked");
      previousSlide();
    });
  } catch (e) {
    console.log(e);
  }
};

getBlogs2();
