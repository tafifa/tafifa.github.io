var valueRange = document.getElementById("rangeValue");

function getRangeValue(val) {
    valueRange.innerHTML = val;
}

var submitForm = document.getElementsByClassName("btn-submit")[0];
submitForm.addEventListener("click", function (event) {
    alert("Terima kasih atas komentarnya!")
})

function dropdown() {
    var x = document.getElementById("ul-dropdown");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function SubForm (){
    $.ajax({
        url:"https://api.apispreadsheets.com/data/xOL3PyVQ08gWOzpx/",
        type:"post",
        data:$("#myForm").serializeArray(),
        success: function(){
            alert("Form Data Submitted :)")
        },
        error: function(){
            alert("There was an error :(")
        }
    });
}
