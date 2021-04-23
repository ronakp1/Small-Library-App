const submit = document.querySelector('[data-submit]');
const popUp = document.querySelector('[data-addBook]');

const nameo = document.querySelector('[data-name]');
const pages = document.querySelector('[data-pages]');
const author = document.querySelector('[data-author]');
const readYet = document.querySelector('[data-readYet]');

const inputFields = document.querySelectorAll('.fields');

const bookNameDiv = document.getElementById('bookName');
const authorDiv = document.getElementById('author');
const pagesDiv = document.getElementById('pages');
const readYetDiv = document.getElementById('readYet');

const results = document.querySelector('.results');
const hold = document.querySelector('.hold');

let library = [];

function Book(nameOfBook, author, numberOfPages, readYet) {
    this.nameOfBook = nameOfBook;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readYet = readYet;
}

const validateFields = () => {
    const inputs = [...inputFields];
    const fields = inputs.filter(word => word.value.length == 0);

    if (fields.length == 0) {
        addBookToLibrary();
        hold.classList.remove('active');
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlay-active');
    }
}

const addBookToLibrary = () => {
    const bookEntry = new Book(`"${nameo.value}"`, author.value, `${pages.value} pages`, readYet.value);
    library.push(bookEntry);
    clearFields();
    displayBook();
}

const clearFields = () => {
    const inputs = [...inputFields];
    inputs.map(fields => fields.value = "");
}

const displayBook = () => {
    if (library.length !== 0) {
        let card = document.createElement('div');
        card.classList.add("card");
        results.appendChild(card);

        const readYetButton = document.createElement('button');
        readYetButton.classList.add('readYet-button');


        for (let i in library[library.length - 1]) {
            let individual = document.createElement('div');
            individual.classList.add('indi');

            if (i !== "readYet") {
                individual.innerHTML = library[library.length - 1][i];
            }
            if (readYet.checked == true) {
                readYetButton.innerHTML = "READ";
                readYetButton.classList.add('hasRead');
            } else {
                readYetButton.innerHTML = "NOT READ";
                readYetButton.style.backgroundcolor = '#63da63';
                readYetButton.classList.add('notRead');
            }
            card.appendChild(readYetButton);
            card.appendChild(individual);

            if (individual.textContent.length == 0) {
                individual.remove();
            }
        }

        readYetButton.addEventListener('click', (e) => {
            if (e.target.innerHTML === "READ") {
                e.target.innerHTML = "NOT READ"
                readYetButton.classList.remove('hasRead');
                readYetButton.classList.add('notRead');
            } else {
                e.target.innerHTML = "READ"
                readYetButton.classList.remove('notRead');
                readYetButton.classList.add('hasRead');
            }
        })

        const bookNameID = library[library.length - 1].nameOfBook;
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerText = `Remove`;
        card.appendChild(removeButton);
        removeButton.addEventListener('click', (e) => {
            deleteBook(bookNameID);
            e.target.parentNode.remove();
        })

    }
}

const deleteBook = bookNameID => {
    library = library.filter(book => book.nameOfBook !== bookNameID);
}

submit.addEventListener('click', () => {
    validateFields();
})

popUp.addEventListener('click', () => {
    hold.classList.add('active');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay-active');
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
        hold.classList.remove('active');
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlay-active');
    }
})