$(document).ready(function(){
  // On page load: datatable
  var table_stocks =  $('#table_stocks').DataTable({
    "ajax": {
      "url": window.origin+":3000/stocks",
      "dataSrc": 'data',
      "type": "GET"
    },
    "columns": [
      { "data": "name" },
      { "data": "amount"},
      { "data": "price"},
      { "data": ""},
    ],
    "columnDefs": [
    {
        "render": function ( data, type, row ) {
            return   '<div class="function_buttons"><ul>'
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

  //Delete
  $('#table_stocks tbody').on('click', '.function_delete', function () {
        var row = table_stocks.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: window.origin+':3000/stocks/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            location.reload();
            alert("O produto em armazem: "+id+" foi apagado com sucesso");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Ocorreu um erro");
          }
        });
    });

  //Delete
  $('#table_stocks tbody').on('click', '.function_delete', function () {
        var row = table_stocks.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: window.origin+':3000/stocks/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            location.reload();
            alert("O produto em armazem: "+id+" foi apagado com sucesso");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Ocorreu um erro");
          }
        });
    });

  //Add
  $(document).on('submit', '#form_stock.add', function(e){
      e.preventDefault();
      var data = {};
      $("#form_stock.add").serializeArray().map(function(x){data[x.name] = x.value;});
      $.ajax({
        url: window.origin+":3000/stocks",
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

  $.ajax({
    url: window.origin+":3000/products",
    type: "GET",
    dataType: 'json',
    success: function(response) {
      $.each(response.data, x => {
        $('#products').append('<option value="' + response.data[x].id + '">' + generateProdDescription(response.data[x].name,response.data[x].description) + '</option>');
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Ocorreu um erro");
    }
  });

  function generateProdDescription(name,description,stock,amount){
    var description = name+" ("+description+")";
    if(stock && amount) description += " ("+stock+"/"+amount+")";
    return description;
  }
});
