$(document).ready(function (){
    console.log("document ready");
    findAll();
    //browse-category-1
    $('#browse-category-1').on('click', function (){
        var width = $(this).outerWidth(); // 获取.browse-category的宽度，包括padding和border
        $('.dropdown-menu').width(width); // 设置.dropdown-menu的宽度
        //  var leftPos = $('#browse-category-1').offset().left;
        // 将计算出的左边距赋值给.dropdown-menu
        //  $('.dropdown-menu').css('left', leftPos + 'px');

        $('.dropdown-menu').toggle(); // 切换显示状态
    })
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