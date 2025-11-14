const container = document.querySelector(".books");

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
      </div>
      <div class="right">
      <input type="checkbox" name="read" id="read" />
      </div>`;
  container.appendChild(bookElement);
  console.log(container);
}

addBookToLibrary("Musa", "Isa", "read", "124");
addBookToLibrary("Musa", "Isa", "read", "124");
addBookToLibrary("Musa", "Isa", "read", "124");
