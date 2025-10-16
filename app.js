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
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295 pages", "not read yet");
addBookToLibrary("Enjoy your Life", "Al-areefy", "495 pages", "read");
addBookToLibrary("To kill a mockingbird", "Harper Lee", "120 pages", "read");

function displayArray(array) {
  myLibrary.forEach((book) => {});
}
