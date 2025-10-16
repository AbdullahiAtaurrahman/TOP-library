const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
const read = document.querySelector("#read");
const form = document.querySelector(".form");
const showForm = document.querySelector(".form-toggle");

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error(
      "You have to use the keyword 'new' to call up the constructor."
    );
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayArray(array) {
  container.innerHTML = "";
  array.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
      <p>${book.title} by ${book.author}, ${book.pages}, ${book.read}</p>
      <button class="remove" data-id="${book.id}">Remove</button>
      <button class="edit" data-id="${book.id}">Edit</button>
    `;
    container.appendChild(bookElement);
  });
}

container.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");

  if (e.target.classList.contains("remove")) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayArray(myLibrary);
    }
  }

  if (e.target.classList.contains("edit")) {
    const book = myLibrary.find((b) => b.id === id);
    if (book) {
      form.style.display = "block";
      showForm.style.display = "none";
      form.querySelector("#title").value = book.title;
      form.querySelector("#author").value = book.author;
      form.querySelector("#pages").value = book.pages;
      form.querySelector("#read").checked = book.read === "read";
      form.setAttribute("data-edit-id", book.id); // Mark form for editing
    }
  }
});

showForm.addEventListener("click", () => {
  form.style.display = "block";
  showForm.style.display = "none";
  form.removeAttribute("data-edit-id");
  form.reset();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  container.innerHTML = "";

  const editId = form.getAttribute("data-edit-id");
  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const read = form.querySelector("#read").checked ? "read" : "not read yet";

  if (title && author && pages) {
    if (editId) {
      const book = myLibrary.find((b) => b.id === editId);
      if (book) {
        book.title = title;
        book.author = author;
        book.pages = pages;
        book.read = read;
      }
    } else {
      addBookToLibrary(title, author, pages, read);
    }

    form.reset();
    displayArray(myLibrary);
    form.style.display = "none";
    showForm.style.display = "block";
    form.removeAttribute("data-edit-id");
  } else {
    alert("Please fill in all required fields.");
  }
});

addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295 pages", "not read yet");
addBookToLibrary("Enjoy your Life", "Al-areefy", "495 pages", "read");
addBookToLibrary("To kill a mockingbird", "Harper Lee", "120 pages", "read");

displayArray(myLibrary);
