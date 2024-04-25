var rootURL = "http://localhost:8080/book";

$(document).ready(function() {
    findAll();
});

$(window).on('load', function() {
    console.log('All resources finished loading!');
    // 这里可以安全地执行依赖于图片和其他资源完全加载的代码
    //normalizeProductHeights();
});

function normalizeProductHeights() {
    var maxHeight = 0;
    // Reset the height
    $('.product-style').css('height', '');

    // Find the max height
    $('.product-style').each(function() {
        var height = $(this).height();
        console.log("$(this).height()" + height);
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Set all to max height
    $('.product-item').css('min-height', maxHeight);
    console.log($('.product-item').attr('min-height'));
}

var findAll = function (){
    $.ajax({
        url: rootURL, // 后端 API 地址
        type: 'GET',
        dataType: 'json',
        success: renderBookList,
        error: function(xhr, status, error) {
            console.error("An error occurred fetching the product data: " + error);
        }
    });
}

var renderBookList = function(products){
        var productsHtml = '';
        products.forEach(function(product) {
            productsHtml += '<div class="col-md-3">' +
                '<div class="product-item">' +
                '<figure class="product-style">' +
                '<img src="' + product.image_url + '" alt="Books" class="product-item img-fluid img-custom">' +
                '<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>' +
                '</figure>' +
                '<figcaption>' +
                '<h3>' + product.title + '</h3>' +
                '<span>' + product.author + '</span>' +
                '<div class="item-price">$ ' + product.price + '</div>' +
                '</figcaption>' +
                '</div>' +
                '</div>';
        });
        $('#product-list').html(productsHtml);
}