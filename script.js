'use strict';

let container = document.querySelector('#cardsContainer');

let addTitle = document.querySelector('#title');
let addAuthor = document.querySelector('#author');
let addGenre = document.querySelector('#genre');
let addPages = document.querySelector('#pages');

let showForm = document.querySelector('#addNewBook');
let form = document.querySelector('#formContainer');

let addButton = document.querySelector('#add');

let localData = localStorage.getItem("myBooks");
// if localData not undefined then parse that as cars array, otherwise is empty array
let myBooks = localData ? JSON.parse(localData) : [];

// Inicializa datos de local torage
for (let elem of myBooks) {
	createCard(elem, myBooks.indexOf(elem));	
};

// Book Constructor
function Book(title, author, genre, pages, read) {
	this.title = title;
	this.author = author; 
	this.genre = genre;
	this.pages = pages; 
	this.read = read;
};


//Show & Hide Form 
showForm.addEventListener('click', function() {
	(form.classList.contains('hidden')) ? form.classList.remove('hidden') : form.classList.add('hidden');
});


// Create cards in the html
function createCard(obj, position) {
	let card = document.createElement('div');
	card.classList.add('cardStyle');
	
	let titleCard = document.createElement('h4');
	titleCard.classList.add('cardTitle');
	titleCard.innerHTML = obj.title;
	
	let authorCard = document.createElement('p');
	authorCard.classList.add('cardAuthor');
	authorCard.innerHTML = obj.author;
	
	let genreCard = document.createElement('p');
	genreCard.classList.add('cardGenre');
	genreCard.innerHTML = obj.genre;
	
	let pagesCard = document.createElement('p');
	pagesCard.classList.add('cardPages');
	pagesCard.innerHTML = obj.pages;
	
	let readCard = document.createElement('p');
	readCard.classList.add('cardStatus');
	if (obj.read == 'notRead') {
		readCard.innerHTML = 'NOT READ';
		readCard.classList.add('notReadP');
	} else if (obj.read == 'reading') {
		readCard.innerHTML = 'READING';
		readCard.classList.add('readingP');
	} else if (obj.read == 'read') {
		readCard.innerHTML = 'READ';
		readCard.classList.add('readP');
	};
	readCard.setAttribute('data-status', position);
	readCard.addEventListener('click', changeStatus);
	
	let deleteCard = document.createElement('div');
	deleteCard.classList.add('cardDelete');
	deleteCard.setAttribute('data-position', position);
	let imgDelete = document.createElement('img');
	imgDelete.src = 'images/close-box.png';
	
	deleteCard.appendChild(imgDelete);
	deleteCard.addEventListener('click', deleteBook);
	
	card.appendChild(titleCard);
	card.appendChild(authorCard);
	card.appendChild(genreCard);
	card.appendChild(pagesCard);
	card.appendChild(readCard);
	card.appendChild(deleteCard);
	
	container.appendChild(card);
}

// Grab values from input and create cards
function grabValues() {
	let newTitle = addTitle.value;
	let newAuthor = addAuthor.value;
	let newGenre = addGenre.value;
	let newPages = addPages.value;
	let newStatus = document.querySelector('input[name=status]:checked').value;
	if (newTitle == '' || newAuthor == '' || newGenre == '' || newPages == '') {
		alert('Please fill every field');
	} else {
		let obj = new Book(newTitle, newAuthor, newGenre, newPages, newStatus);
		myBooks.push(obj);
		localStorage.setItem('myBooks', JSON.stringify(myBooks));
		reset();
	}
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	for (let elem of myBooks) {
		createCard(elem, myBooks.indexOf(elem));	
	}
}

// Empty inputs
function reset() {
	addTitle.value = '';
	addAuthor.value = '';
	addGenre.value = '';
	addPages.value = '';
}

// Delete book from library
function deleteBook(e) {
	let x = e.path[1].attributes[1].value;
	myBooks.splice(x, 1);
	localStorage.setItem('myBooks', JSON.stringify(myBooks));
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	for (let elem of myBooks) {
		createCard(elem, myBooks.indexOf(elem));	
	}
}

// Change Status
function changeStatus(e) {
	let x = e.path[0].attributes[1].value;
	if (myBooks[x].read == 'notRead') {
		myBooks[x].read = 'reading';
	} else if (myBooks[x].read == 'reading') {
		myBooks[x].read = 'read';
	} else if (myBooks[x].read == 'read') {
		myBooks[x].read = 'notRead';
	};
	localStorage.setItem('myBooks', JSON.stringify(myBooks));
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	for (let elem of myBooks) {
		createCard(elem, myBooks.indexOf(elem));	
	}
}

add.addEventListener('click', grabValues);


// Local Storage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
};

if (storageAvailable('localStorage')) {
  console.log('yipii!');
}
else {
  console.log('nooooo....')
}










