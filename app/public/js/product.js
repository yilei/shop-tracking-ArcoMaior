$(document).ready(function(){
  // On page load: datatable
  var table_products =  $('#table_products').DataTable({
    "ajax": {
      "url": window.origin+":3000/products",
      "dataSrc": 'data',
      "type": "GET"
    },
    "columns": [
      { "data": "id" },
      { "data": "name"},
      { "data": "description"},
      { "data": ""},
    ],
    "columnDefs": [
    {
        "render": function ( data, type, row ) {
            return   '<div class="function_buttons"><ul>'
                     /*+ '<button class="function_edit">Edit</button>'*/
                     + '<button class="function_delete">Apagar</button>'
                     + '</ul></div>';
        },
        "targets": -1
    }
    ],
    language: {
        'url' : '//cdn.datatables.net/plug-ins/1.10.13/i18n/Portuguese.json',
    },
  });

  /* Edit
  $('#table_products tbody').on('click', '.function_edit', function () {
        var data = table_products.row( $(this).closest('tr') ).data();
        alert( data.name +"'s salary is: "+ data.id );
  } );
*/

  //Delete
  $('#table_products tbody').on('click', '.function_delete', function () {
        var row = table_products.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: window.origin+':3000/products/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            location.reload();
            alert("O produto: "+id+" foi apagado com sucesso");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Ocorreu um erro");
          }
        });
    });

  //Add
  $(document).on('submit', '#form_product.add', function(e){
      e.preventDefault();
      var data = {};
      $("#form_product.add").serializeArray().map(function(x){data[x.name] = x.value;});
      $.ajax({
        url: window.origin+":3000/products",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function(response) {
            location.reload();
            alert("Produto adicionado com sucesso")
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Ocorreu um erro");
        }
    });
  });

  function myFunction() {
      if (x.style.display === "none") {
        $("#myDiv").css({"display":"block"});
      } else {
        $("#myDiv").css({"display":"none"});
      }
  }

});
