var rootURL = "http://localhost:8080/book";

$(document).ready(function() {
    findAll();

});

var findAll = function (){
    $.ajax({
        url: rootURL + "/all", // 后端 API 地址
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
                                    '<img src="' + product.image_url + '" alt="Books" class="product-item">' +
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