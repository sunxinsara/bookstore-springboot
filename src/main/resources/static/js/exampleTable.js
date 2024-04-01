new DataTable('#example', {
    columnDefs: [
        {
            orderable: false,
            render: DataTable.render.select(),
            targets: 0
        }
    ],
    fixedColumns: {
        start: 2
    },
    order: [[1, 'asc']],
    paging: false,
    scrollCollapse: true,
    scrollX: true,
    scrollY: 300,
    select: {
        style: 'os',
        selector: 'td:first-child'
    }
});