const localStorageKey = 'BOOKSHELF';
const RENDER_EVENT = 'render-books'
const RENDERSEARCH_EVENT = 'render-search-books'
const books = []

function checkStorage() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (checkStorage()) {
    const parsing = JSON.stringify(books);
    localStorage.setItem(localStorageKey, parsing);
  }
}

function removeData() {
  if (checkStorage()) {
    const parsing = JSON.stringify(books);
    localStorage.removeItem(localStorageKey, parsing);
  }
}

function loadDataFromStorage() {
  const booksData = localStorage.getItem(localStorageKey);
  let data = JSON.parse(booksData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
// LOAD DOM & SUBMIT FORM
document.addEventListener('DOMContentLoaded', function () {
  reset()
  const submitForm = document.getElementById('form-input');

  if (checkStorage()) {
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
    var className = "not-readed"
    var inputVal = '2'
    var btnValue = "Belum Selesai Dibaca"
  } else {
    var className = "readed"
    var inputVal = "1"
    var btnValue = "Sudah Selesai Dibaca"
  }

  let element = `
  <div class="${className}-book" id="${id}">
    <div id="container-book">
      <h4>${title}</h4>
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
  document.getElementById('search-bar').value = '';
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
  removeData();
  books.splice(idx,1);
  saveData();

  document.dispatchEvent(new Event(RENDER_EVENT));
  !status ? popupsBtn("swapNotRead") : popupsBtn("swapRead");
}
 
// REMOVE BOOK FROM BOOKSHELF
function remove(id) {

  if (confirm("APAKAH KAMU INGIN MENGHAPUS BUKU INI?")) {
    const idx = books.findIndex(item => item.id === id);

    const status = books[idx].isCompleted;

    document.getElementById(id).style.display = 'none';
    removeData();
    books.splice(idx,1);
    saveData();

    status ? popupsBtn("removeRead") : popupsBtn("removeNotRead");
  }
}
 
// RESET BUTTON
document.getElementById('reset').addEventListener('click', function() {
  if (confirm("APAKAH KAMU YAKIN INGIN MENGHAPUS SEMUA DATA?")) {
    removeData();
    window.location.reload();
  }
})
 
// SEARCH BOOK
function search() {
  searching()

  const arr = searching();
  if (arr.length > 0) {
    document.getElementsByClassName('search-result')[0].style.display = 'block';
    const searchList = document.getElementById('searchList');
    searchList.innerHTML = `

    `;  
    document.dispatchEvent(new Event(RENDERSEARCH_EVENT))
  } else popupsBtn("notFound");
}

function searching() {
  const option = document.getElementsByClassName('search-option')[0].value;
  const inputVal = document.getElementById('search-bar').value;

  const searchArray = [];

  if (inputVal === "") {
    return searchArray;
  } else if (option === "title-search") {
    for (const bookItem of books) {
      if (bookItem.title.toLowerCase().includes(inputVal.toLowerCase())) {
        searchArray.unshift(bookItem);
      }
    } return searchArray;

  } else if (option === "author-search") {
    for (const bookItem of books) {
      if (bookItem.author === inputVal) {
        searchArray.unshift(bookItem);
      }
    } return searchArray;

  } else if (option === "year-search") {
    for (const bookItem of books) {
      if (bookItem.year === inputVal) {
        searchArray.unshift(bookItem);
      }
    } return searchArray;

  }
}
 
// RENDERING SEARCH
document.addEventListener(RENDERSEARCH_EVENT, function () {
  const searchList = document.getElementById('searchList');

  const searchArray = searching();

  searchList.innerHTML = '';

  const dummyElement = `
    <div class="resultSearch" id="dummy"></div>
  `;

  if (searchArray.length % 2 != 0) {
    for (const bookItem of searchArray) {
      const bookElement = makeBookSearch(bookItem);
      searchList.innerHTML += bookElement;
    } searchList.innerHTML += dummyElement;
  } else {
    for (const bookItem of searchArray) {
      const bookElement = makeBookSearch(bookItem);
      searchList.innerHTML += bookElement;
    }
  }
});
 
// MAKE HTML ELEMENT AFTER OBJECT PROPERTY GET INITIALIZATION
function makeBookSearch(bookObject) {
  const {id, title, author, year, isCompleted} = bookObject;

  if (isCompleted) {
    var className = "not-readed"
    var inputVal = '2'
    var btnValue = "Belum Selesai Dibaca"
    var emValue = "Sudah Selesai Dibaca"
  } else {
    var className = "readed"
    var inputVal = "1"
    var btnValue = "Sudah Selesai Dibaca"
    var emValue = "Belum Selesai Dibaca"
  }

  let element = `
  <div class="resultSearch ${className}-book" id="${id}">
    <div id="container-book">
      <h4>${title} <span><br>[ <em>${emValue}</em> ]</span> </h4>
      <p>Penulis: ${author}</p>
      <p>Tahun Terbit: ${year}</p>

      <input type="button" class="btn${inputVal}"  name="" id="swap" value="${btnValue}" onclick="swap(${id})">
      <input type="button" class="btn3" name="" id="delete" value="Hapus Buku" onclick="remove(${id})">
    </div>
  </div>
  `;

  return element;
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
    case "notFound":
      alert("BUKU YANG ANDA CARI TIDAK ADA")
      break;
  }
}
