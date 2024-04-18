"use strict";
var $ = jQuery.noConflict();
$(document).ready(function (){
    console.log("document ready");
    findAll();

    function showMenu() {
        $(this).removeClass("drop-collapsed");
        $(this).addClass("open");
    }
    function hideMenu(){
        $(this).removeClass("open");
        var $dropdown = $(".dropdown");

        $dropdown.each(function () {
            $(this).addClass("drop-collapsed");
        });
    }


    var $dropdown = $(".dropdown");

    $dropdown.each(function () {
        var $this = $(this);

        var $dropmenu = $this.find(".dropdown-menu");
        $dropmenu.css("height", $dropmenu.outerHeight());
        $this.addClass("drop-collapsed");
    });


    // dropdown menu hover intent
    var hovsettings = {
        timeout:0,
        interval: 0,
        over: showMenu,
        out: hideMenu
    };

    $(".dropdown").hoverIntent(hovsettings);
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
    $('#book-shelf').empty();
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