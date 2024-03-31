$(document).ready(function (){
    console.log("document ready");
    findAll();
})
var rootURL = "http://localhost:8080/book";
var findAll = function (){
    $.ajax({
        type: 'GET',
        url: rootURL + "/all",
        dataType: "json",
        success: renderBookShelf,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("request fail: " + textStatus + ", error information: " + errorThrown);
        }
    })
}

var renderBookShelf = function(books){
    $('#book-shelf').val("");
    books.forEach(function(book) {
        var categories = book.categories.split(',').join(' ');
        var articleContent = `
            <article class="col-md-3 col-sm-6 filterDiv ${categories}">
                <img src="${book.image_url}" />
                <p class="text-center">${book.title}<br><em>${book.author}</em></p>
            </article>
        `;
        // 将构建好的article HTML字符串直接添加到bookShelf中
        $('#book-shelf').append(articleContent);
    });
}