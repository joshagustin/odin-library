let addBookCancelled = false;

const content = document.querySelector('.content');
const addButton = document.querySelector('button.add');
const closeButton = document.querySelector('button.close');
const dialog = document.querySelector('dialog');

addButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('close', getFormValues);


function closeDialog(event) {
    dialog.close();
    event.preventDefault(); // prevent form submission
    addBookCancelled = true;
}

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

// show books as cards
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

function getFormValues() {
    if (addBookCancelled) {
        addBookCancelled = false;
        return;
    }

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    addBookToLibrary(title, author, pages, read);
    displayBook(myLibrary.slice(-1)[0]); // fastest method to get last element
}

addBookToLibrary('The Lightning Thief', 'Rick Riordan', 350, true);
addBookToLibrary('The Song of Achilles', 'Madeline Miller', 408, false);
myLibrary.forEach(displayBook);
