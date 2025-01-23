let addBookCancelled = false;

const addButton = document.querySelector('button.add');
const closeButton = document.querySelector('button.close');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

addButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('close', getFormValues);
dialog.addEventListener('cancel', closeDialog);

const myLibrary = [];
let bookID = 0;

// create book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookID = bookID;
}

// create function that adds books to library, after creating them with constructor
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    displayBook(book);
    myLibrary.push(book);
    bookID++;
}

// show books as cards
function displayBook(book) {
    const div = createCardProperties(book);
    div.appendChild(createRemoveButton());
    div.appendChild(createReadToggle(book.read));
    const content = document.querySelector('.content');
    content.appendChild(div);
}

function createCardProperties(book) {
    const div = document.createElement('div');
    div.classList.toggle(`card`);
    div.id = `book-${bookID}`;
    for (const property in book) {
        const p = document.createElement('p');
        if (property === 'read')
            book.read ? p.textContent = 'Read' : p.textContent = 'Unread';
        else if (property === 'bookID')
            continue;
        else
            p.textContent = book[property];
        p.classList.toggle(property);
        div.appendChild(p);
    }
    return div;
}

function createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.toggle('remove');
    removeButton.addEventListener('click', removeBookFromLibrary);
    return removeButton;
}

function createReadToggle(bookIsRead) {
    const toggle = document.createElement('input')
    toggle.setAttribute('type', 'checkbox');
    toggle.addEventListener('change', toggleReadStatus);
    if (bookIsRead)
        toggle.setAttribute('checked', '');
    return toggle;
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

function removeBookFromLibrary(event) {
    // remove element from DOM
    const targetCard = event.target.parentElement;
    const targetCardID = targetCard.id;
    const targetBook = Number(targetCardID.split('-')[1]);
    targetCard.remove();

    // remove element from myLibrary
    for (let i = 0, length = myLibrary.length; i < length; i++) {
        if (myLibrary[i].bookID === targetBook) {
            myLibrary.splice(i, 1);
            break;
        } 
    }
}

function toggleReadStatus(event) {
    const targetCard = event.target.parentElement;
    const targetCardID = targetCard.id;
    const targetBook = Number(targetCardID.split('-')[1]);

    for (let i = 0, length = myLibrary.length; i < length; i++) {
        if (myLibrary[i].bookID === targetBook) {
            const read = !myLibrary[i].read;
            myLibrary[i].read = read;

            const readIndicator = document.querySelector(`#${targetCardID} .read`);
            readIndicator.textContent = read ? 'Read' : 'Unread';
            break;
        }
    }
}

const remove = document.querySelectorAll('.remove');
remove.forEach(button => button.addEventListener('click', removeBookFromLibrary));