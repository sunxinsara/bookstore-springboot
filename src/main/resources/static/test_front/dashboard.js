var rootURL = "http://localhost:8080/book";
var table;
var currentRow;
$(document).ready(function(){
    table = $('#example').DataTable({
        "pagingType": "full_numbers",
        "ajax": {
            "url": rootURL, // Insert your API or data source URL here
            "dataSrc": "" // If the returned JSON data is an array, this can be left empty or set to the array path
        },
        "columns": [ // You need to set columns according to the actual JSON data format received from the server
            {
                "data": null,
                "render": function(data, type, row) {
                    return '<input type="checkbox" class="rowCheckbox" value="' + row.id + '">';
                },
                "orderable": false,
                "searchable": false
            },
            { "data": "id" },
            { "data": "title" },
            { "data": "categories" },
            { "data": "author" },
            { "data": "description" },
            { "data": "image_url",
                "render": function(data, type, row) {
                    return '<img src="' + data + '" style="width:60px; height:80px; object-fit: contain; display: block; margin: auto;"/>';
                },
                "orderable": false
            },
            { "data": "price" },
            {
                "data": null,
                "render": function(data, type, row) {
                    return '<div>' +
                        '<a href="#editBookModal" class="edit" data-toggle="modal" data-id="' + row.id + '" data-type="single"><i class="fas fa-edit" data-toggle="tooltip" title="Edit" style="color: #555555;"></i></a>' +
                        '  ' +
                        '<a href="#deleteBookModal" class="delete" data-toggle="modal" data-id="' + row.id + '" data-type="single"><i class="fas fa-trash" data-toggle="tooltip" title="Delete" style="color: #d35400;"></i></a>' +
                        '</div>';
                },
                "orderable": false
            }
        ],
        "columnDefs": [
            { "targets": [5,6], "className": "board-center" }
        ],
        "scrollX": true
    });

    // Selected by checkbox
    $('#example tbody').on('change', 'input.rowCheckbox', function() {
        if (this.checked) {
            if (!$(this).closest('tr').hasClass('selected')){
                $(this).closest('tr').addClass('selected')
            }
            console.log('Checkbox is checked');
        } else {
            if ($(this).closest('tr').hasClass('selected')){
                $(this).closest('tr').removeClass('selected')
            }
            console.log('Checkbox is unchecked');
        }

    });

    // Listen for table's edit button click event
    $('#example tbody').on('click', 'a.edit', function(event) {
        event.preventDefault();

        var tr = $(this).closest('tr');
        currentRow  = table.row(tr); // Update global currentRow
        var rowData = currentRow.data(); // Get current row data here

        // Fill in the modal form fields
        $('#bookId').val(rowData.id);
        $('#bookTitle').val(rowData.title);
        $('#bookCategories').val(rowData.categories);
        $('#bookAuthor').val(rowData.author);
        $('#bookDescription').val(rowData.description);
        $('#bookImage').val(rowData.image_url);
        $('#bookPrice').val(rowData.price);

        // Show modal
        $('#editBookModal').show();
    });

    // Delete button
    $('#example tbody').on('click', 'a.delete', function (event){
        event.preventDefault();
        var tr = $(this).closest('tr');
        currentRow  = table.row(tr); // Update global currentRow
        var rowData = currentRow.data(); // Get current row data here
    })

    $("#saveEdit").on("click", function (event){
        event.preventDefault();
        // Convert form data to an array
        var formDataArray = $("#editBookForm").serializeArray();

        // Convert array to JSON format
        var formDataJSON = {};
        $.each(formDataArray, function() {
            // Add to JSON object
            formDataJSON[this.name] = this.value;
        });

        // Output form data in JSON format
        console.log("Form data in JSON:", formDataJSON);
        updateBook(formDataJSON);
        $('#editBookModal').modal('hide');
    });

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

    $('#saveAdd').on("click", function (event){
        event.preventDefault();
        var formDataArray = $("#addBookForm").serializeArray();
        // Convert array to JSON format
        var formDataJSON = {};
        $.each(formDataArray, function() {
            // Add to JSON object
            formDataJSON[this.name] = this.value;
        });

        addBook(formDataJSON);
    });

    // Handle click on "Select all" control
    $('#selectAll').on('click', function() {
        var rows = table.rows({ 'search': 'applied' }).nodes();
        var isChecked = this.checked;
        $(rows).find('input.rowCheckbox').each(function() {
            this.checked = isChecked;
        });
    });

    // Handle click on checkbox to set state of "Select All" control
    $('#example tbody').on('change', 'input[type="checkbox"]', function(){
        // If checkbox is not checked
        if(!this.checked){
            var el = $('#selectAll').get(0);
            // If "Select all" control is checked and has 'indeterminate' property
            if(el && el.checked && ('indeterminate' in el)){
                el.indeterminate = true;
            }
        }
    });
})
