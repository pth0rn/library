class Library {
    constructor() {
        this.list = [];
    }

    removeEmptyTable() {
        // remove table and display the no books message
        document.querySelector("table").remove();
        const divMessage = document.createElement("div");
        divMessage.innerHTML = `
        <div class="message">
            <p>No books added yet</p>
        </div>
        `;
        document.querySelector("main").appendChild(divMessage);
    }

    createTable() {
        const table = document.createElement("table");
        table.innerHTML = `
                <thead>
                    <tr>
                    <th data-cell="name">Book</th>
                    <th data-cell="author">Author</th>
                    <th data-cell="pages">Pages</th>
                    <th data-cell="read">Read</th>
                    </tr>
                </thead>
            
                <tbody>
                </tbody>
        `;

        const container = document.querySelector("#table-container");
        return container.appendChild(table);
    }

    displayTable() {
        //remove current table and display updated table
        if (document.querySelector("table")) {
            document.querySelector("table").remove();
        }
        const table = this.createTable();

        for (const book of lib.list) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><input type="checkbox"class="read" data-name="${book.name}" ${
                book.read ? "checked" : null
            }></td>
            <td><button class="btn-cancel remove" data-name="${
                book.name
            }">x</button></td>
            `;
            table.querySelector("tbody").appendChild(row);
        }

        // click events for remove buttons
        table.querySelectorAll(".remove").forEach((el) => {
            el.addEventListener("click", (e) => {
                const bookName = e.target.dataset.name;
                this.removeBook(bookName);
            });
        });

        // click events for toggling read status
        table.querySelectorAll(".read").forEach((el) => {
            el.addEventListener("click", (e) => {
                const bookName = e.target.dataset.name;

                const bookIndex = lib.list.findIndex(
                    (book) => book.name === bookName
                );
                this.list[bookIndex].toggleRead();
            });
        });
    }

    removeBook(name) {
        lib.list = this.list.filter((book) => {
            return book.name !== name;
        });

        if (this.list.length === 0) {
            this.removeEmptyTable();
        } else {
            this.displayTable();
        }
    }

    addBookToLibrary(book) {
        this.list.push(book);
        const message = document.querySelector(".message");
        if (message) {
            message.remove();
        }
    }
}

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
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
                <form id="form-add">
                    <label for="name">Name</label>
                    <input type="text" id="name" required>
                    <label for="author">Author</label>
                    <input type="text" id="author" required>
                    <label for="pages">Pages</label>
                    <input type="number" id="pages" required>
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

    dialog.querySelector(".btn-cancel").addEventListener("click", (e) => {
        overlay.remove();
    });

    dialog.querySelector("#add").addEventListener("click", (e) => {
        const name = document.querySelector("#name");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const read = document.querySelector("#read");

        if (name.validity.valueMissing) {
            name.classList.add("invalid");
            return;
        } else {
            name.classList.remove("invalid");
        }

        if (author.validity.valueMissing) {
            author.classList.add("invalid");
            return;
        } else {
            author.classList.remove("invalid");
        }

        if (pages.validity.valueMissing) {
            pages.classList.add("invalid");
            return;
        } else {
            pages.classList.remove("invalid");
        }

        const newBook = new Book(
            name.value,
            author.value,
            pages.value,
            read.checked
        );
        overlay.remove();
        lib.addBookToLibrary(newBook);
        lib.displayTable();
    });
}

function addExampleBooks() {
    document.querySelector(".message").remove();

    lib.list = [
        new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true),
        new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
        new Book("1984", "George Orwell", 328, true),
        new Book("Pride and Prejudice", "Jane Austen", 432, false),
        new Book("The Catcher in the Rye", "J.D. Salinger", 224, true),
        new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
        new Book("Brave New World", "Aldous Huxley", 288, false),
        new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
        new Book(
            "One Hundred Years of Solitude",
            "Gabriel Garcia Marquez",
            417,
            true
        ),
        new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, false),
    ];
    lib.displayTable();
}

const lib = new Library();

const addBookButton = document.querySelector("button#add-book");
addBookButton.onclick = diaglogAddBook;

addExampleBooks();
