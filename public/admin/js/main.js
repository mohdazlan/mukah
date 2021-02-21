document.addEventListener('DOMContentLoaded', async function () {
  let posts = await getPosts();
  let articles = document.querySelector('.articles');
  articles.innerHTML = '';
  posts.forEach((post) => {
    let postHTML = `<article
class="d-flex justify-content-between align-items-center article-inline">
<div class="id w5">${post.id}</div>
<div class="name w30">${post.title}</div>
<div class="date w30">${post.date}</div>
<div class="country w20">${post.country}</div>
<div class="edit w10"><button class="btn btn-link">Edit</button></div>
<div class="remove w5"><button class="btn btn-link">X</button></div>
</article>`;
    articles.insertAdjacentHTML('afterend', postHTML);
  });
});
