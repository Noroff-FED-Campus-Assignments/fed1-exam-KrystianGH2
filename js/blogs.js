import { navFunction } from "./navigation.js";
navFunction();

const travelBlogs = document.querySelector(".travelBlogsElements");

// --------------PLACES LIST --------------------
const liAfrica = document.querySelector(".africa-li");
const liAmericas = document.querySelector(".americas-li");
const liAntarctica = document.querySelector(".antartica-li");
const liAsia = document.querySelector(".asia-li");
const liEurope = document.querySelector(".europe-li");
const liOceania = document.querySelector(".oceania-li");
const selectOption = document.querySelector("#selectOption");

const searchEl = document.querySelector(".search");
const loader  = document.querySelector(".loader-container");

searchEl.addEventListener("input", async (e) => {
  setTimeout(async () => {
    e.preventDefault();
    clearTravelBlogs();
    const searchValue = e.target.value.trim().toLowerCase();
    await getBlogs(searchValue);
  }, 600);
});

const options = { method: "GET" };
let url =
  "https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts?_embed&per_page=10";

let blogsPostPerPage = 10;
let selectedValues = "AZ";
let isLoaded = false;

selectOption.addEventListener("change", async (e) => {
  e.preventDefault();
  selectedValues = e.target.value;
  clearTravelBlogs();
  setTimeout(() => {
    getBlogs();
  }, 800);
});

const getBlogs = async (searchValue = "") => {
  const getCategoryName = async (categoryId) => {
    const categoryUrl = `https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/categories/${categoryId}`;
    const categoryData = await fetch(categoryUrl, options);
    const categoryResult = await categoryData.json();
    return categoryResult.name;
  };

  try {
    const data = await fetch(url, options);
    const result = await data.json();

    let blogsItems = result;

    if (isLoaded) {
      sortCards(blogsItems);
    }

    for (let i = 0; i < blogsItems.length; i++) {
      let blogTitle = blogsItems[i].title.rendered;
      if (blogTitle.toLowerCase().includes(searchValue)) {
        const featuredImage =
          blogsItems[i]._embedded["wp:featuredmedia"][0].media_details.sizes
            .medium.source_url;

        const altText = blogsItems[i]._embedded["wp:featuredmedia"][0].alt_text;

        const categoryId = blogsItems[i].categories[0];
        const categoryName = await getCategoryName(categoryId);

        loader.innerHTML = "";
        travelBlogs.innerHTML += `
        
        <div class="cards cards-blogsPage">
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
    isLoaded = true;
  } catch (e) {
    console.log(e);
  }
};

const sortCards = (blogsItems) => {
  if (selectedValues === "AZ") {
    blogsItems.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
  } else if (selectedValues === "ZA") {
    blogsItems.sort((a, b) => b.title.rendered.localeCompare(a.title.rendered));
  }
};

const clearTravelBlogs = () => {
  travelBlogs.innerHTML = "";
};

liAfrica.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=4`;
    getBlogs();
  }, 800);
});

liAmericas.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=6`;
    getBlogs();
  }, 800);
});

liAntarctica.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=5`;
    getBlogs();
  }, 800);
});

liAsia.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=3`;
    getBlogs();
  }, 800);
});

liEurope.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=7`;
    getBlogs();
  }, 800);
});
liOceania.addEventListener("click", async () => {
  clearTravelBlogs();
  setTimeout(() => {
    url = `${url}&categories=8`;
    getBlogs();
  }, 800);
});

getBlogs();

const loadMore = document.querySelector("#loadMore");
loadMore.addEventListener("click", (e) => {
  e.preventDefault();
  clearTravelBlogs();
  setTimeout(() => {
    blogsPostPerPage += 10;
    url = `https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts?_embed&per_page=${blogsPostPerPage}`;
    getBlogs();
  }, 800);
});
