$(document).ready(function(){

  // On page load: datatable
  var table_companies = $('#table_meals').dataTable({
    "ajax": {
      "url": "http://localhost:3000/meals",
      "dataSrc": 'data',
      "type": "GET"
    },
    "columns": [
      { "data": "id"},
      { "data": "name"},
      { "data": "description"},
      { "data": "type"},
      { "data": "people"},
      { "data": "day" },
      { "data": "price_per_person"},
      { "data": "created_at"}
    ],
    language: {
        'url' : '//cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese.json',
    },
  });

});
