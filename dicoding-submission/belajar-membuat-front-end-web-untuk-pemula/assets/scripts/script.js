const btn_readed = document.getElementById('submitReaded');
const btn_notreaded = document.getElementById('submitNotreaded');

const books_name = document.getElementById('name');
const books_author = document.getElementById('author');
const books_year = document.getElementById('year');

const readedArray = [];
const notreadedArray = [];

function generateID() {
  return +new Date();
}

// RAK BUKU SUDAH DIBACA

btn_readed.addEventListener('click', function(event) {
  event.preventDefault();
  addtoReaded();
  alert("Data Buku Dimasukkan ke Rak Buku Sudah Selesai Dibaca");
})

function addtoReaded() {
  const generateId = generateID();

  const readedObject = generateReadedShelfObject(generateId, books_name.value, books_author.value, books_year.value);
  readedArray.push(readedObject);
  console.log(readedArray);
  const readedShelf = document.getElementById('shelf-readed');
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
  readedShelf.innerHTML += el;
}

function generateReadedShelfObject(id, name, author, year) {
  return {
      id,
      name,
      author,
      year
  }
}

// RAK BUKU BELUM SELESAI DIBACA

btn_notreaded.addEventListener('click', function(event) {
  event.preventDefault();
  addtoNotreaded();
  alert("Data Buku Dimasukkan ke Rak Buku Belum Selesai Dibaca");
})

function addtoNotreaded() {
  const generateId = generateID();

  const notreadedObject = generateNotReadedShelfObject(generateId, books_name.value, books_author.value, books_year.value);
  notreadedArray.push(notreadedObject);
  console.log(notreadedArray);
  const notreadedShelf = document.getElementById('shelf-not-readed');
  let el = `
    <div class="not-readed book00">
      <div id="container-book">
        <h3>${notreadedObject.name}</h3>
        <p>Penulis: ${notreadedObject.author}</p>
        <p>Tahun Terbit: ${notreadedObject.year}</p>

        <input type="button" class="move add-option01"  name="" value="Sudah Selesai Dibaca">
        <input type="button" class="delete" name="" value="Hapus Buku">
      </div>
    </div>
    `;
  notreadedShelf.innerHTML += el;
}

function generateNotReadedShelfObject(id, name, author, year) {
  return {
      id,
      name,
      author,
      year
  }
}
