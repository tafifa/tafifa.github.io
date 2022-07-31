document.getElementById('isReaded').addEventListener('change', function() {
  if (this.checked) {
    document.getElementsByClassName('btn2')[0].style.display = 'none';
    document.getElementsByClassName('btn1')[0].style.display = 'block';
  }
  else {
    document.getElementsByClassName('btn1')[0].style.display = 'none';
    document.getElementsByClassName('btn2')[0].style.display = 'block';
  }
})
