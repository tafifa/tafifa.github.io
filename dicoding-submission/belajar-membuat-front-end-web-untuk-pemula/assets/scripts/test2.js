const btn_readed = document.getElementById('submitReaded');
const btn_notreaded = document.getElementById('submitNotreaded');

const books_name = document.getElementById('name').value;
const books_author = document.getElementById('author').value;
const books_year = document.getElementById('year').value;

document.addEventListener('DOMContentLoaded', function() {
  btn_readed.addEventListener('click', function(event) {
      event.preventDefault();
      addtoReaded();
  })
  btn_notreaded.addEventListener('click', function(event) {
      event.preventDefault();
      addtoNotreaded();
  })
})
const readedShelf = [];
const notreadedShelf = [];

const RENDER_EVENT = 'render_shelf';

document.addEventListener(RENDER_EVENT, function () {
  /*
  const renderReadedShelf = document.getElementById('shelf-readed');
  const renderNotreadedShelf = document.getElementById('shelf-not-readed');

  let el = `
    <div class="readed book00">
      <div id="container-book">
        <h3>${readedObject.name}</h3>
        <p>Penulis: ${readedObject.author}</p>
        <p>Tahun Terbit: ${readedObject.year}</p>

        <input type="button" class="move add-option01"  name="" value="Belum Selesai Dibaca">
        <input type="button" class="delete" name="" value="Hapus Buku">
      </div>
    </div>
    `;
  renderReadedShelf.innerHTML += el;
  */

  console.log(readedShelf);
  console.log(notreadedShelf);
});

function addtoReaded() {
  const generateID = generateId();

  const readedObject = generateReadedShelfObject(generateID, books_name.value, books_author.value, books_year.value);
  readedShelf.push(readedObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function addtoNotreaded() {
  const generateID = generateId();

  const notreadedObject = generateNotReadedShelfObject(generateID, books_name.value, books_author.value, books_year.value);
  notreadedShelf.push(notreadedObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateReadedShelfObject(id, name, author, year) {
  return {
      id,
      name,
      author,
      year
  }
}

function generateNotReadedShelfObject(id, name, author, year) {
  return {
      id,
      name,
      author,
      year
  }
}
