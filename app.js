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
  renderLibrary();
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1); // Remove from array
    renderLibrary(); // Re-render the list
  }
}
let editingBookId = null;

function startEditBook(id) {
  const book = myLibrary.find((b) => b.id === id);
  if (!book) return;

  document.querySelector("#book").value = book.title;
  document.querySelector("#author").value = book.author;
  document.querySelector("#pages").value = book.pages;
  document.querySelector("#readStatus").checked = book.read === "Read";

  editingBookId = id;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookValue = document.querySelector("#book").value;
  let authorValue = document.querySelector("#author").value;
  let pagesValue = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#readStatus").checked;
  let readLabel = readStatus ? "Read" : "Not read";

  if (editingBookId) {
    const book = myLibrary.find((b) => b.id === editingBookId);
    if (book) {
      book.title = bookValue;
      book.author = authorValue;
      book.pages = pagesValue;
      book.read = readLabel;
    }
    editingBookId = null;
  } else {
    addBookToLibrary(bookValue, authorValue, readLabel, pagesValue);
  }

  document.querySelector("#book").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#readStatus").checked = false;

  renderLibrary();
});

addBookToLibrary("To kill a mocking bird", "Harper Lee", "Read", "129");
addBookToLibrary("Enjoy your life", "Al-Areefy", "Read", "364");

function renderLibrary() {
  container.innerHTML = "";

  myLibrary.forEach((book) => {
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
      <button class="edit-btn" data-id="${book.id}">Edit</button>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
      </div>`;
    container.appendChild(bookElement);
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      removeBook(bookId);
    });
  });
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      startEditBook(bookId);
    });
  });
}
