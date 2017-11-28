$(document).ready(function(){

  // On page load: datatable
  var table_meals =  $('#table_meals').DataTable({
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
      { "data": "products"},
      { "data": "created_at"},
    ],
    "columnDefs": [
    {
        "render": function ( data, type, row ) {
            return   '<div class="function_buttons"><ul>'
                     + '<button class="function_edit">Edit</button>'
                     + '<button class="function_delete">Delete</button>'
                     + '</ul></div>';
        },
        "targets": -1
    }
    ],
    language: {
        'url' : '//cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese.json',
    },
  });

  //Edit
  $('#table_meals tbody').on( 'click', '.function_edit', function () {
        var data = table_meals.row( $(this).closest('tr') ).data();
        alert( data.name +"'s salary is: "+ data.id );
  } );

  //Delete
  $('#table_meals tbody').on( 'click', '.function_delete', function () {
        var row = table_meals.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: 'http://localhost:3000/meals/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            row.remove().draw();
            alert("O utilizador: "+id+" foi apagado com sucesso");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + thrownError);
          }
        });
    });

   $(document).on('submit', '#form_meal.add', function(e){
      e.preventDefault();
      var data = {};
      $("#form_meal.add").serializeArray().map(function(x){data[x.name] = x.value;});
      $.ajax({
        url: "http://localhost:3000/meals",
        type: "POST",
        data: data,
        dataType:     'json',
        success: function(response) {
            data.id = response.data[0].id
            // Finishing
            data.price_per_person =""
            data.products =""
            table_meals.row.add(data).draw();
            alert("Nova refeição adicionada");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert(xhr.status + thrownError);
        }
    });
  });

});
