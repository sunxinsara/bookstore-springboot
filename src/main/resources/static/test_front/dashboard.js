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
                  "defaultContent": '<div>' + // 居中容器
                          '<a href="#editBookModal" class="edit" data-toggle="modal"><i class="fas fa-edit" data-toggle="tooltip" title="Edit" style="color: #555555;"></i></a>' +
                          '  ' + // 添加空格作为分隔
                          '<a href="#deleteBookModal" class="delete" data-toggle="modal"><i class="fas fa-trash" data-toggle="tooltip" title="Delete" style="color: #d35400;"></i></a>' +
                          '</div>',
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
      })