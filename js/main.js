const form = document.getElementById("form");
const submitBtn = document.getElementById("submit-btn");
const inputId = document.getElementById("input");
const formSection = document.querySelector(".form-section");



form.addEventListener("submit", function (e) {
  e.preventDefault();

  getPost(inputId.value);

})

function getPost(idValue) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${idValue}`)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      throw Error;
    })
    .then(function (data) {
      createPost(data);
      form.classList.add("-hidden");
    }
    ).catch(error => {
      console.log(error);
    })
}

function getCommentsForTherPost(postId) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      throw Error;
    })
    .then(data =>
      createCellsWithComments(data)
    ).catch(error => {
      console.log(error);
    })
}

function createPost(data) {
  const divForPost = document.createElement("div");
  divForPost.classList.add("post");

  const headingForPost = document.createElement("h1");
  headingForPost.classList.add("post__heading");
  headingForPost.textContent = data.title;

  const postText = document.createElement("p");
  postText.classList.add("post__text");
  postText.textContent = data.body;

  const commentsBtn = document.createElement("button");
  commentsBtn.textContent = "получить комментарии к посту";
  commentsBtn.classList.add("post__btn");


  divForPost.append(headingForPost, postText, commentsBtn);
  formSection.appendChild(divForPost);

  const postBtn = document.querySelector(".post__btn");
  console.log(postBtn);
  postBtn.addEventListener("click", function (e) {
    getCommentsForTherPost(data.id);
    postBtn.classList.add("-hidden");
  })
}

function createCellsWithComments(data) {
  const divComment = document.createElement("div");
  data.forEach(element => {
    const commentPad = document.createElement("div");
    const content = `
  <div class="padd">
    <h2>Comment:</h2>
    <p class="email">${element.email}</p>
    <h2 class="heading">${element.name}</h2>
    <p class="text">${element.body}</p>
  </div>
`
    commentPad.innerHTML = content;
    divComment.appendChild(commentPad);
  });
  formSection.appendChild(divComment);
}
