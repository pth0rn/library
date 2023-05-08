let library = [];

function Book(name,author,pages) {
    this.name
    this.author
    this.pages
    this.read = 'not read yet'
}

function addBookToLibrary() {
    const bookName = prompt("book name?");
    library.push(bookName);
}

function displayBooks() {
    const body = document.querySelector('body')
    for (const book of library) {
        
    }
}