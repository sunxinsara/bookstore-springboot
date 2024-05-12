var rootURL = "http://localhost:8080/book";

$(document).ready(function() {
    findAll();
    handleTabLogic();
    handleSearch();
    handleHome();
});

function handleHome(){
    $('#home-button').on('click', function (event) {
        event.preventDefault();
        location.reload();
    })
}
function handleSearch(){
    $('form').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting automatically

        var query = $('#search-input').val();
        if (query) {
            $.ajax({
                url: rootURL + '/search/' + encodeURIComponent(query), // Use encodeURIComponent to ensure URL validity
                type: 'get',
                beforeSend: function(xhr) {
                    // Log the request data (including headers) before sending
                    console.log("Request Data:");
                    console.log(xhr);
                },
                success: renderSearchResult,
                error: function() {
                    $('#myCarousel').html("");
                    $('#popular-books').html("");
                    $('#search-results').html('<h2>No results found.</h2>'); // Display error message if the request fails
                }
            });
        }
    });
}

function renderSearchResult(response){
    $('#myCarousel').html("");
    $('#popular-books').html("");
    var products = response;   // The server returns an array containing multiple products
    if (products && products.length > 0) {
        var html = '';
        products.forEach(function(product) {
            html += '<div class="col-md-3">' +
                '<div class="product-item">' +
                '<figure class="product-style">' +
                '<img src="' + product.image_url + '" alt="Books" class="product-item img-fluid img-custom">' +
                '<button type="button" class="add-to-cart" data-product-id="' + product.id + '">Add to Cart</button>' +
                '</figure>' +
                '<figcaption>' +
                '<h3>' + product.title + '</h3>' +
                '<span>' + product.author + '</span>' +
                '<div class="item-price">$ ' + product.price + '</div>' +
                '</figcaption>' +
                '</div>' +
                '</div>';
        });
        $('#search-results').html(html);
    } else {
        $('#search-results').html('<p>No results found.</p>');
    }
}

function handleTabLogic(){
    $('.tab').each(function() {
        $(this).on('click', function() {
            // Remove 'active' class from all tabs and tab content
            $('.tab').removeClass('active');  // This targets the tabs
            $('.tab-content > div').removeClass('active');  // This targets all tab content divs

            // Add 'active' class to the clicked tab
            $(this).addClass('active');

            // Get the target content area and make it active
            var tabTarget = $(this).data('tab-target');
            $(tabTarget).addClass('active');

            // Hide all tab content areas, then show the active one
            $('.tab-content > div').hide();  // Hide all content
            $(tabTarget).show();  // Only show the active content
        });
    });
}

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
        url: rootURL,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) {
            // Log the request data (including headers) before sending
            console.log("Request Data:");
            console.log(xhr);
        },
        success: renderBookList,
        error: function(xhr, status, error) {
            console.error("An error occurred fetching the product data: " + error);
        }
    });
}

var renderBookList = function(products){
    // Initialize HTML strings for different categories
    var productsHtml = {
        'all-genre': '',
        'business': '',
        'technology': '',
        'romantic': '',
        'adventure': '',
        'fictional': ''
    };

    products.forEach(function(product) {
        // Create HTML string for a single product
        var productHtml = '<div class="col-md-3">' +
            '<div class="product-item">' +
            '<figure class="product-style">' +
            '<img src="' + product.image_url + '" alt="Books" class="product-item img-fluid img-custom">' +
            '<button type="button" class="add-to-cart" data-product-id="' + product.id + '">Add to Cart</button>' +
            '</figure>' +
            '<figcaption>' +
            '<h3>' + product.title + '</h3>' +
            '<span>' + product.author + '</span>' +
            '<div class="item-price">$ ' + product.price + '</div>' +
            '</figcaption>' +
            '</div>' +
            '</div>';

        // Check product category and add to the respective HTML string
        if (product.categories.includes('business')) {
            productsHtml['business'] += productHtml;
        }
        if (product.categories.includes('technology')) {
            productsHtml['technology'] += productHtml;
        }
        if (product.categories.includes('romantic')) {
            productsHtml['romantic'] += productHtml;
        }
        if (product.categories.includes('adventure')) {
            productsHtml['adventure'] += productHtml;
        }
        if (product.categories.includes('fictional')) {
            productsHtml['fictional'] += productHtml;
        }
        // Add all products to 'all-genre'
        productsHtml['all-genre'] += productHtml;
    });

    // Update HTML content in the corresponding divs
    $('#product-list').html(productsHtml['all-genre']);
    $('#product-list-business').html(productsHtml['business']);
    $('#product-list-technology').html(productsHtml['technology']);
    $('#product-list-romantic').html(productsHtml['romantic']);
    $('#product-list-adventure').html(productsHtml['adventure']);
    $('#product-list-fictional').html(productsHtml['fictional']);
}