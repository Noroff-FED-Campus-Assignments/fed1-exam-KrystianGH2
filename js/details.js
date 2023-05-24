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
// `https://marvelous-jargon.flywheelsites.com/wp-json/wp/v2/posts/?${postId}?_embed=true`
async function getBlogs() {
  try {
    const data = await fetch(url, options);
    const response = await data.json();
    const blogPosts = response;
    console.log(blogPosts);

    // const featuredImage =
    // blogPosts._embedded["wp:featuredmedia"][0].media_details.sizes
    //         .medium.source_url;
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

{
  /* <img src="${featuredImage}" alt=""></img> */
}
