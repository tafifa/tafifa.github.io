var books_name = document.getElementById('name');
var books_author = document.getElementById('author');
var books_year = document.getElementById('year');

const btn_readed = document.getElementById('submitReaded');
const btn_unreaded = document.getElementById('submitUnreaded');

btn_readed.addEventListener('click', function(event) {
  const books = {
    name : books_name.value,
    author : books_author.value,
    year : books_year.value
  }
  event.preventDefault();

  const book00 = document.getElementById('shelf-readed');
  if (books.name == "" || books.author == "" || books.year == "") {
    alert("Kamu Belum Mengisikan Data Apapun");
  }
  else {
    alert("Data Buku Dimasukkan ke Rak Buku Sudah Selesai Dibaca");
    book00.innerHTML = `
    <div class="readed book00">
      <div id="container-book">
        <h3>${books.name}</h3>
        <p>Penulis: ${books.author}</p>
        <p>Tahun Terbit: ${books.year}</p>

        <input type="button" class="move add-option01"  name="" value="Belum Selesai Dibaca">
        <input type="button" class="delete" name="" value="Hapus Buku">
      </div>
    </div>
    `;
  }
})

btn_unreaded.addEventListener('click', function(event) {
  const books = {
    name : books_name.value,
    author : books_author.value,
    year : books_year.value
  }
  event.preventDefault();

  if (books.name == "" || books.author == "" || books.year == "") {
    alert("Kamu Belum Mengisikan Data Apapun");
  }
  else {
  alert("Data Buku Dimasukkan ke Rak Buku Belum Selesai Dibaca");

  const book00 = document.getElementById('shelf-not-readed');
  book00.innerHTML = `
  <div class="not-readed book00">
    <div id="container-book">
      <h3>${books.name}</h3>
      <p>Penulis: ${books.author}</p>
      <p>Tahun Terbit: ${books.year}</p>

      <input type="button" class="move add-option01"  name="" value="Sudah Selesai Dibaca">
      <input type="button" class="delete" name="" value="Hapus Buku">
    </div>
  </div>
  `;
  }
})

/*
  TESTING
  document.getElementById('name').value = "TESTING BOOK NAME";
  document.getElementById('author').value = "TESTING BOOK AUTHOR";
  document.getElementById('year').value = "2000";

*/
