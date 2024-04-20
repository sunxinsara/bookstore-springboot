var rootURL = "http://localhost:8080/book";
var table;
var currentRow;
  $(document).ready(function(){
      table = $('#example').DataTable({
          "pagingType": "full_numbers",
          "ajax": {
              "url": rootURL, // 这里填写您的 API 或数据源 URL
              "dataSrc": "" // 如果返回的 JSON 数据是一个数组，这里可以留空或设置为数组的路径
          },
          "columns": [ // 您需要根据实际从服务器接收到的 JSON 数据格式来设置列
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

      // select effect
  /*
      $('#example tbody').on('click', 'tr', function() {
          if ($(this).hasClass('selected')) {
              $(this).removeClass('selected');
          } else {
              table.$('tr.selected').removeClass('selected');
              $(this).addClass('selected');
          }
      });*/

      // selected by checkbox
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

      // 监听表格内的编辑按钮点击事件
      $('#example tbody').on('click', 'a.edit', function(event) {
          event.preventDefault();

          var tr = $(this).closest('tr');
          currentRow  = table.row(tr); // update global currentRow
          var rowData = currentRow.data(); // 这里获取当前行的数据

          // 填充模态框中的表单字段
          $('#bookId').val(rowData.id);
          $('#bookTitle').val(rowData.title);
          $('#bookCategories').val(rowData.categories);
          $('#bookAuthor').val(rowData.author);
          $('#bookDescription').val(rowData.description);
          $('#bookImage').val(rowData.image_url);
          $('#bookPrice').val(rowData.price);

          // 显示模态框
          $('#editBookModal').show();
      });

      // delete button
      $('#example tbody').on('click', 'a.delete', function (event){
          event.preventDefault();
          var tr = $(this).closest('tr');
          currentRow  = table.row(tr); // update global currentRow
          var rowData = currentRow.data(); // 这里获取当前行的数据
      })

      $("#saveEdit").on("click", function (event){
          event.preventDefault();
          // 将表单数据转换为数组
          var formDataArray = $("#editBookForm").serializeArray();

          // 将数组转换为 JSON 格式
          var formDataJSON = {};
          $.each(formDataArray, function() {
              // 添加到 JSON 对象中
              formDataJSON[this.name] = this.value;
          });

          // 输出 JSON 格式的表单数据
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
          // 将数组转换为 JSON 格式
          var formDataJSON = {};
          $.each(formDataArray, function() {
              // 添加到 JSON 对象中
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

// 发送 AJAX 请求更新数据
var updateBook = function (formDataJSON){
    $.ajax({
        url: rootURL,
        type: "PUT", // 或者 "PUT"、"PATCH"，根据你的需求选择合适的方法
        contentType: "application/json",
        data: JSON.stringify(formDataJSON),
        success: function(responseData) {
            // 处理成功响应
            currentRow.data(responseData).draw(false);
            alert("Data updated successfully");
            console.log("Data updated successfully:", responseData);
        },
        error: function(xhr, status, error) {
            // 处理错误响应
            alert("Error updating data");
            console.error("Error updating data:", error);
        }
    });
}

var addBook = function (formDataJSON){
    $.ajax({
        url: rootURL,
        type: "POST", // 或者 "PUT"、"PATCH"，根据你的需求选择合适的方法
        contentType: "application/json",
        data: JSON.stringify(formDataJSON),
        success: function(responseData) {
            // 处理成功响应
            table.ajax.reload();
            alert("Data adding successfully");
            console.log("Data addBook successfully:", responseData);
        },
        error: function(xhr, status, error) {
            // 处理错误响应
            alert("Error addBook data");
            console.error("Error addBook data:", error);
        }
    });
}

var deleteBookById = function (id){
    $.ajax({
        url: rootURL + "/" + id,
        type: "DELETE", // 或者 "PUT"、"PATCH"，根据你的需求选择合适的方法
        contentType: "application/json",
        success: function(response) {
            // 处理成功响应
            currentRow.remove();
            table.draw(false); // 重绘表格，但保持分页状态
            alert("Data DELETED successfully");
            console.log("Data DELETED successfully:", response);
        },
        error: function(xhr, status, error) {
            // 处理错误响应
            alert("Error deleting data");
            console.error("Error deleting data:", error);
        }
    });
}

function getSelectedRowIds() {
    var ids = [];
    // 遍历所有选中的checkbox
    $('.rowCheckbox:checked').each(function() {
        ids.push($(this).val());  // 假设checkbox的value属性是行的ID
    });
    return ids;
}

function getSelectedRowIds() {
    var ids = [];
    // 遍历所有选中的checkbox
    $('.rowCheckbox:checked').each(function() {
        ids.push($(this).val());  // 假设checkbox的value属性是行的ID
    });
    return ids;
}

// It is not recommended to use DELETE, because according to RFC standards, the body of a DELETE request is semantically meaningless.
// In fact, some gateways, proxies, and firewalls may strip the body from a DELETE request upon receipt.
var deleteSelectedBooks = function (){
    let ids = getSelectedRowIds();  // Assuming getSelectedRowIds() correctly retrieves the IDs of selected rows.
    $.ajax({
        url: rootURL + '/deleteBooks',  // Your server-side deletion endpoint URL
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ ids: ids }),  // Convert the array of IDs into a JSON string
        success: function(response) {
            // Reload DataTable or remove corresponding rows upon successful deletion
            $('#example').DataTable().ajax.reload();  // Reload data if server-side processing is used
            alert('Successfully deleted ' + ids.length + ' records.');
        },
        error: function(xhr, status, error) {
            alert('Deletion failed: ' + error);
        }
    });
}