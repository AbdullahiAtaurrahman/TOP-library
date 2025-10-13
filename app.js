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

func;
