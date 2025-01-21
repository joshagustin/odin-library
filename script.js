const content = document.querySelector('.content');
const myLibrary = [];


// create book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}.`
    // }
}

// create function that adds books to library, after creating them with constructor
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBook(book) {
    const div = document.createElement('div');
    div.classList.toggle('card');

    for (const property in book) {
        const p = document.createElement('p');
        if (property === 'read')
            book.read ? p.textContent = 'Read' : p.textContent = 'Unread';
        else
            p.textContent = book[property];
        div.appendChild(p);
    }
    content.appendChild(div);
}

addBookToLibrary('The Lightning Thief', 'Rick Riordan', 350, true);
addBookToLibrary('The Song of Achilles', 'Madeline Miller', 408, false);
myLibrary.forEach(displayBook);
