const container = document.querySelector(".books");
const submitBtn = document.querySelector(".submit");

const myLibrary = [];

function Book(title, author, read, pages) {
  // the constructor...

  if (!new.target) {
    throw Error("Can't be called without using the word 'new ");
  }

  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, read, pages) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, read, pages);
  myLibrary.push(book);
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("id", `${book.id}`);
  bookElement.innerHTML = `
      <div class="left">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <p class="pages">${book.pages} pages</p>
      <p class="read">${book.read}</p>
      </div>
      <div class="right">
      <label for="read">Read?
      <input type="checkbox" name="read" id="read" />
      <label for="remove">Remove
      <input type="checkbox" name="remove" id="remove" />
      </div>`;
  container.appendChild(bookElement);
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookValue = document.querySelector("#book").value;
  let authorValue = document.querySelector("#author").value;
  let pagesValue = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#readStatus").checked;
  let readLabel = readStatus ? "Read" : "Not read";
  addBookToLibrary(bookValue, authorValue, readLabel, pagesValue);

  document.querySelector("#book").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#readStatus").checked = false;
});

addBookToLibrary("To kill a mocking bird", "Harper Lee", "read", "129");
addBookToLibrary("Enjoy your life", "Al-Areefy", "read", "364");
