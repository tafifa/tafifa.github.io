// api spreadsheets link: https://www.apispreadsheets.com/table/xOL3PyVQ08gWOzpx/
<script>
    src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous"
</script>

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
