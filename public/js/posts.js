async function getPosts() {
  return await fetch('http://localhost:9900/posts')
    .then((response) => response.json())
    .then((data) => data);
}
