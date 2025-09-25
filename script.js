function Book(title, author, pages, read) {
  if (!new.target) {
    Error("You have to use the keyword 'new' to call up the constructor.");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read} yet`;
  };
}
