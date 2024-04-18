        var rootURL = "http://localhost:8080/book/all";
      $(document).ready(function(){
          var table = $('#example').DataTable({
              "pagingType": "full_numbers",
              "ajax": {
                  "url": rootURL, // 这里填写您的 API 或数据源 URL
                  "dataSrc": "" // 如果返回的 JSON 数据是一个数组，这里可以留空或设置为数组的路径
              },
              "columns": [ // 您需要根据实际从服务器接收到的 JSON 数据格式来设置列
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
                          '<a href="#editBookModal" class="edit" data-toggle="modal" data-id="' + row.id + '"><i class="fas fa-edit" data-toggle="tooltip" title="Edit" style="color: #555555;"></i></a>' +
                          '  ' +
                          '<a href="#deleteBookModal" class="delete" data-toggle="modal" data-id="' + row.id + '"><i class="fas fa-trash" data-toggle="tooltip" title="Delete" style="color: #d35400;"></i></a>' +
                          '</div>';
                  },
                  "orderable": false
                }
              ],
              "columnDefs": [
                  { "targets": [5,6], "className": "board-center" }
              ]
          });

          $('#example tbody').on('click', 'tr', function() {
              if ($(this).hasClass('selected')) {
                  $(this).removeClass('selected');
              } else {
                  table.$('tr.selected').removeClass('selected');
                  $(this).addClass('selected');
              }
          });

          // 监听表格内的编辑按钮点击事件
          $('#example tbody').on('click', 'a.edit', function(event) {
              event.preventDefault();

              var tr = $(this).closest('tr');
              var row = table.row(tr);
              var rowData = row.data(); // 这里获取当前行的数据

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

          $("#saveEdit").on("click", function (event){
              event.preventDefault();
              // 将表单数据转换为数组
              var formDataArray = $("#edit-form").serializeArray();

              // 将数组转换为 JSON 格式
              var formDataJSON = {};
              $.each(formDataArray, function() {
                  // 将字段名转换为小写形式
                  var fieldName = this.name.toLowerCase();

                  // 添加到 JSON 对象中
                  formDataJSON[fieldName] = this.value;
              });

              // 输出 JSON 格式的表单数据
              console.log("Form data in JSON:", formDataJSON);
              updateBook();
              console.log();
          })
      })

var updateBook = function (){

}