const localStorageKey = 'BOOKSHELF';

function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(localStorageKey, parsed);
  }
}

function removeData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.removeItem(localStorageKey, parsed);
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(localStorageKey);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

const books = []
const RENDER_EVENT = 'render-books'

// LOAD DOM & SUBMIT FORM
document.addEventListener('DOMContentLoaded', function () {
  reset()
  const submitForm /* HTMLFormElement */ = document.getElementById('form-input');

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
    const val = document.getElementsByClassName('btn1')[0];

    val.style.display === 'none' ? popupsBtn("addNotRead") : popupsBtn("addRead");
    reset()
  });
});

// GENERATE BOOK ID
function generateId() {
  return +new Date();
}

// GENERATE BOOK OBJECT
function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

// EVENT WHEN CHECKBOX TRUE
function isClicked() {
  const checkbox = document.getElementById('isReaded');
  if (checkbox.checked != true) {
    document.getElementsByClassName('btn1')[0].style.display = 'none';
    document.getElementsByClassName('btn2')[0].style.display = 'block';
    return false;
  }
  else {
    document.getElementsByClassName('btn2')[0].style.display = 'none';
    document.getElementsByClassName('btn1')[0].style.display = 'block';
    return true;
  }
}

// READING INFO FROM INPUT & INITIALIZATION VARIABLE TO OBJECT
function addBook() {
  const titleBook = document.getElementById('title').value;
  const authorBook = document.getElementById('author').value;
  const yearBook = document.getElementById('year').value;

  const generatedID = generateId();
  const status = isClicked();
  const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, status)
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}


// RENDERING BOOK
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedList = document.getElementById('uncompletedBookList');
  const completedList = document.getElementById('completedBookList');

  uncompletedList.innerHTML = '';
  completedList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      completedList.innerHTML += bookElement;
    } else {
      uncompletedList.innerHTML += bookElement;
    }
  }
});

// MAKE HTML ELEMENT AFTER OBJECT PROPERTY GET INITIALIZATION
function makeBook(bookObject) {
  const {id, title, author, year, isCompleted} = bookObject;

  if (isCompleted) {
    var className = "readed"
    var inputVal = "1"
    var btnValue = "Sudah Selesai Dibaca"
  }
  else {
    var className = "not-readed"
    var inputVal = '2'
    var btnValue = "Belum Selesai Dibaca"
  }

  let element = `
  <div class="${className}-book" id="${id}">
    <div id="container-book">
      <h3>${title}</h3>
      <p>Penulis: ${author}</p>
      <p>Tahun Terbit: ${year}</p>

      <input type="button" class="btn${inputVal}"  name="" id="swap" value="${btnValue}" onclick="swap(${id})">
      <input type="button" class="btn3" name="" id="delete" value="Hapus Buku" onclick="remove(${id})">
    </div>
  </div>
  `;

  return element;
}

// RESET INPUT VALUE
function reset() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('year').value = '';
  document.getElementById('isReaded').checked = false;
}

// SWAPPING CONDITION OF BOOK PROPERTY WHEN SWAP BUTTON CLICKED TO OTHER BOOKSHELF
function swap(id) {
  const idx = books.findIndex(item => item.id === id);

  const status = !books[idx].isCompleted;

  const titleBook = books[idx].title;
  const authorBook = books[idx].author;
  const yearBook = books[idx].year;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, status)
  books.push(bookObject);

  document.getElementById(id).style.display = 'none'
  books.splice(idx,1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  !status ? popupsBtn("swapNotRead") : popupsBtn("swapRead");
  }

// REMOVE BOOK FROM BOOKSHELF
function remove(id) {


  if (confirm("APAKAH KAMU INGIN MENGHAPUS BUKU INI?")) {
    const idx = books.findIndex(item => item.id === id);

    const status = books[idx].isCompleted;

    document.getElementById(id).style.display = 'none'
    books.splice(idx,1);

    removeData();

    status ? popupsBtn("removeRead") : popupsBtn("removeNotRead");
  }
}

// SWITCH CASE FOR ALL EVENT ALERT
function popupsBtn(id) {

  const str = "\n\t\t--->\t\t[RAK BUKU SUDAH SELESAI DIBACA]"
  const nstr = "\n\t\t-->\t\t[RAK BUKU BELUM SELESAI DIBACA]"

  switch (id) {
    case "addRead":
      alert('DATA BUKU TELAH DITAMBAHKAN KE' + str)
      break;
    case "addNotRead":
      alert('DATA BUKU TELAH DITAMBAHKAN KE' + nstr)
      break;
    case "swapRead":
      alert('DATA BUKU TELAH DIPINDAHKAN KE' + str)
      break;
    case "swapNotRead":
      alert('DATA BUKU TELAH DIPINDAHKAN KE' + nstr)
      break;
    case "removeRead":
      alert('DATA BUKU TELAH DIHAPUS DARI' + str)
      break;
    case "removeNotRead":
      alert('DATA BUKU TELAH DIHAPUS DARI' + nstr)
      break;
  }
}
