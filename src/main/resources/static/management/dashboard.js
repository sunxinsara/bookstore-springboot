var rootURL = "http://localhost:8080/book";
var table;
var currentRow;  // used for edit function, with global currentRow can avoid redraw the whole table
$(document).ready(function() {
    initializeDataTable();
    handleRowCheckboxChange();
    handleEditButtonClick();
    handleDelete();
    handleSaveEdit();
    handleSaveAdd();
    handleSelectAllCheckbox();
});

function initializeDataTable() {
    table = $('#example').DataTable({
        "pagingType": "full_numbers",
        "ajax": {
            "url": rootURL,  // Data source URL
            "dataSrc": ""    // Data source format
        },
        "columns": [
            {
                "data": null,
                "render": checkboxColumnRenderer,
                "orderable": false,
                "searchable": false
            },
            { "data": "id" },
            { "data": "title" },
            { "data": "categories" },
            { "data": "author" },
            { "data": "description" },
            {
                "data": "image_url",
                "render": imageColumnRenderer,
                "orderable": false
            },
            { "data": "price" },
            {
                "data": null,
                "render": actionsColumnRenderer,
                "orderable": false
            }
        ],
        "columnDefs": [
            { "targets": [5, 6], "className": "text-center" }
        ],
        "scrollX": true
    });
}

function checkboxColumnRenderer(data, type, row) {
    return '<input type="checkbox" class="rowCheckbox" value="' + row.id + '">';
}

function imageColumnRenderer(data, type, row) {
    return '<img src="' + data + '" style="width:60px; height:80px; object-fit: contain; display: block; margin: auto;"/>';
}

function actionsColumnRenderer(data, type, row) {
    return '<div>' +
        '<a href="#editBookModal" class="edit" data-toggle="modal" data-id="' + row.id + '" data-type="single"><i class="fas fa-edit" data-toggle="tooltip" title="Edit" style="color: #555555;"></i></a>' +
        '  ' +
        '<a href="#deleteBookModal" class="delete" data-toggle="modal" data-id="' + row.id + '" data-type="single"><i class="fas fa-trash" data-toggle="tooltip" title="Delete" style="color: #d35400;"></i></a>' +
        '</div>';
}

function handleRowCheckboxChange() {
    $('#example tbody').on('change', 'input.rowCheckbox', function() {
        var row = $(this).closest('tr');
        row.toggleClass('selected', this.checked);
        console.log('Checkbox state changed to: ' + this.checked);
    });
}

function handleEditButtonClick() {
    $('#example tbody').on('click', 'a.edit', function(event) {
        event.preventDefault();
        showEditModal($(this).closest('tr'));
    });
}

function handleDelete() {
    // delete button
    $('#example tbody').on('click', 'a.delete', function (event){
        event.preventDefault();
        var tr = $(this).closest('tr');
        currentRow  = table.row(tr); // update global currentRow
    })

    $('#deleteBookModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var type = button.data('type'); // Extract info from data-* attributes
        var modal = $(this);

        // Clear previous data-type attribute
        var deleteConfirmButton = $('#deleteConform');
        deleteConfirmButton.removeData('type');

        if (type === 'single') {
            var id = button.data('id'); // Get the id for single deletion
            deleteConfirmButton.data('type', 'single').data('id', id);

        } else if (type === 'batch') {
            $('#deleteConform').removeClass("data-type");
            deleteConfirmButton.data('type', 'batch');
        }
    });

    $("#deleteConform").on("click", function (event){
        event.preventDefault();
        var type = $(this).data('type');
        if (type === 'single') {
            var id = $(this).data('id');
            deleteBookById(id);
        } else if (type === 'batch') {
            deleteSelectedBooks();
        }
        $('#deleteBookModal').modal('hide');
    })
}

function handleSaveEdit() {
    $("#saveEdit").on("click", function(event) {
        event.preventDefault();
        var bookData = formDataToJson($("#editBookForm").serializeArray());
        updateBook(bookData);
        $('#editBookModal').modal('hide');
    });
}

function handleSaveAdd() {
    $('#saveAdd').on("click", function(event) {
        event.preventDefault();
        var bookData = formDataToJson($("#addBookForm").serializeArray());
        addBook(bookData);
        $('#addBookModal').modal('hide');
    });
}

function handleSelectAllCheckbox() {
    $('#selectAll').on('click', function() {
        var rows = table.rows({ 'search': 'applied' }).nodes();
        $('input.rowCheckbox', rows).prop('checked', this.checked);
    });

    $('#example tbody').on('change', 'input[type="checkbox"]', function() {
        // If checkbox is not checked
        if (!this.checked) {
            var el = $('#selectAll').get(0);
            if (el && el.checked && ('indeterminate' in el)) {
                el.indeterminate = true;
            }
        }
    });
}

function showEditModal(row) {
    currentRow = table.row(row);
    var rowData = currentRow.data();
    $('#bookId').val(rowData.id);
    $('#bookTitle').val(rowData.title);
    $('#bookCategories').val(rowData.categories);
    $('#bookAuthor').val(rowData.author);
    $('#bookDescription').val(rowData.description);
    $('#bookImage').val(rowData.image_url);
    $('#bookPrice').val(rowData.price);
    $('#editBookModal').show();
}

function confirmDelete(bookId) {
    $('#deleteBookModal').show();
    $('#deleteConform').data('id', bookId);
}

function formDataToJson(formArray) {
    var formDataJSON = {};
    $.each(formArray, function() {
        formDataJSON[this.name] = this.value;
    });
    return formDataJSON;
}

// AJAX request to update a book's data
var updateBook = function (formDataJSON){
    $.ajax({
        url: rootURL + '/' + formDataJSON.id, // Append the book ID to the URL
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formDataJSON),
        success: function(responseData) {
            // On successful update, refresh the current row data
            currentRow.data(responseData).draw(false);
            alert("Book data updated successfully.");
            console.log("Update success:", responseData);
        },
        error: function(xhr, status, error) {
            // Handle errors during book update
            alert("Failed to update book data.");
            console.error("Update error:", error);
        }
    });
}

// AJAX request to add a new book
var addBook = function (formDataJSON){
    $.ajax({
        url: rootURL,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formDataJSON),
        success: function(responseData) {
            // On successful addition, reload the DataTable to show the new entry
            table.ajax.reload(null, false); // Reload without resetting user's paging
            alert("New book added successfully.");
            console.log("Add success:", responseData);
        },
        error: function(xhr, status, error) {
            // Handle errors during book addition
            alert("Failed to add new book.");
            console.error("Add error:", error);
        }
    });
}

// AJAX request to delete a book by its ID
var deleteBookById = function (id){
    $.ajax({
        url: rootURL + "/" + id, // URL to the book deletion endpoint
        type: "DELETE",
        contentType: "application/json",
        success: function() {
            // On successful deletion, remove the book from the DataTable
            currentRow.remove().draw(false); // Redraw the table without resetting paging
            alert("Book deleted successfully.");
        },
        error: function(xhr, status, error) {
            // Handle errors during book deletion
            alert("Failed to delete the book.");
            console.error("Delete error:", error);
        }
    });
}

// AJAX request to delete selected books
var deleteSelectedBooks = function (){
    let ids = getSelectedRowIds(); // Retrieve IDs of all selected books
    if (ids.length === 0) {
        alert("No books selected for deletion.");
        return;
    }
    $.ajax({
        url: rootURL + '/deleteBooks', // Endpoint for batch deletion
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ ids: ids }), // Send IDs as JSON
        beforeSend: function(xhr) {
            // Log the request data (including headers) before sending
            console.log("Request Data:");
            console.log(xhr);
        },
        success: function() {
            // On successful batch deletion, reload the DataTable
            table.ajax.reload(null, false); // Reload without resetting user's paging
            alert('Successfully deleted ' + ids.length + ' books.');
        },
        error: function(xhr, status, error) {
            alert('Failed to delete selected books.');
            console.error('Batch delete error:', error);
        }
    });
}

// Utility function to get IDs of selected books
function getSelectedRowIds() {
    var ids = [];
    $('.rowCheckbox:checked').each(function() {
        ids.push($(this).val()); // Assume the checkbox value is the row ID
    });
    return ids;
}