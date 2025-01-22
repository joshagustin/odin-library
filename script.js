let addBookCancelled = false;

const addButton = document.querySelector('button.add');
const closeButton = document.querySelector('button.close');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

addButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('close', getFormValues);

const myLibrary = [];

// create book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// create function that adds books to library, after creating them with constructor
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(book);
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

    const content = document.querySelector('.content');
    content.appendChild(div);
}

function getFormValues() {
    if (addBookCancelled) {
        addBookCancelled = false;
        return;
    }

    const book = new FormData(form);
    addBookToLibrary(book.get('title'), book.get('author'), book.get('pages'), book.get('read'));
    form.reset();
}

function closeDialog(event) {
    dialog.close();
    event.preventDefault(); // prevent form submission
    form.reset()
    addBookCancelled = true;
}
