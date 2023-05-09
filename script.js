let library = [];

function Book(name, author, pages) {
    this.name;
    this.author;
    this.pages;
    this.read = false;
}

function addBookToLibrary() {
    const bookName = prompt("book name?");
    library.push(bookName);
}

function displayBooks() {
    const body = document.querySelector("body");
    for (const book of library) {
    }
}

function diaglogAddBook() {
    // display overlay and dialog box for adding new book
    const dialog = document.createElement("div");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const body = document.querySelector("body");
    body.insertAdjacentElement("afterbegin", overlay);

    dialog.innerHTML = `
        <div class="dialog-container">
            <div class="dialog">
                <h3>Add Book</h3>
                <form action="#" id="form-add">
                    <label for="name">Name</label>
                    <input type="text" id="name">
                    <label for="author">Author</label>
                    <input type="text" id="author">
                    <label for="pages">Pages</label>
                    <input type="number" id="pages">
                    <div>
                        <label for="read">Read</label>
                        <input type="checkbox" id="read">
                    </div>

                    <div id="buttons">
                        <button class="btn-cancel">Cancel</button>
                        <button id="add">Add</button>
                    </div>
                </form>
            </div>
        </div>`;

    overlay.appendChild(dialog);

    dialog.querySelector(".btn-cancel").addEventListener("click", e => {
        overlay.remove();

    })
}

document.querySelector("button#add-book")
    .addEventListener("click", diaglogAddBook);

