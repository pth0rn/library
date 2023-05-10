let library = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function removeEmptyLibrary() {
    const divMessage = document.createElement('div');
    divMessage.innerHTML = `
    <div class="message">
        <p>No books added yet</p>
    </div>
    `
    document.querySelector('main').appendChild(divMessage);

}

function createTable() {
    const table = document.createElement('table');
    table.innerHTML=`

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
`

    const container = document.querySelector('#table-container');
    return container.appendChild(table);
    
}

function displayTable() {
    if (document.querySelector('table')) {
        document.querySelector('table').remove()
    }
    const table = createTable();

    ;
    for (const book of library) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><input type="checkbox"class="read" data-name="${book.name}" ${book.read ? 'checked' : null}></td>
        <td><button class="btn-cancel remove" data-name="${book.name}">x</button></td>
        `
        table.querySelector('tbody').appendChild(row);
    
    }

     // remove book on button click
     table.querySelectorAll(".remove").forEach(el => {
        el.addEventListener('click', e => {
            const bookName = e.target.dataset.name;
            removeBook(bookName)
        })
    })

    table.querySelectorAll(".read").forEach(el => {
        el.addEventListener('click', e => {
            const bookName = e.target.dataset.name;
            console.log(library.findIndex( book => book.name === bookName))

            const bookIndex = library.findIndex( book => book.name === bookName)
            library[bookIndex].toggleRead()
        })
    })
}


function removeBook(name) {
    library = library.filter( book => {
        return book.name !== name;
    })
    
    if (library.length === 0) {
        removeEmptyLibrary()
    } else {
        displayTable()
    }
    
}

function addBookToLibrary(book) {
    library.push(book)
    const message = document.querySelector('.message')
    if (message) {
        message.remove()
    }

    displayTable()

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

    dialog.querySelector("#add").addEventListener("click", e => {
        const newBook = new Book(
            document.querySelector("#name").value,
            document.querySelector("#author").value,
            document.querySelector("#pages").value,
            document.querySelector("#read").checked
        );
        overlay.remove()
        addBookToLibrary(newBook)
    })
}

document.querySelector("button#add-book")
    .addEventListener("click", diaglogAddBook);




function addExampleBooks() {
    document.querySelector('.message').remove()

    library = [
        new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true),
        new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
        new Book("1984", "George Orwell", 328, true),
        new Book("Pride and Prejudice", "Jane Austen", 432, false),
        new Book("The Catcher in the Rye", "J.D. Salinger", 224, true),
        new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
        new Book("Brave New World", "Aldous Huxley", 288, false),
        new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
        new Book("One Hundred Years of Solitude", "Gabriel Garcia Marquez", 417, true),
        new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, false),
    ]
displayTable()
}

addExampleBooks()
