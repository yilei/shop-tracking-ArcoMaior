$(document).ready(function(){
  // On page load: datatable
  var table_shops =  $('#table_shop').DataTable({
    "ajax": {
      "url": window.origin+":3000/shops",
      "dataSrc": 'data',
      "type": "GET"
    },
    "columns": [
      { "data": "day" },
      { "data": "description"},
      { "data": "product_name"},
      { "data": "price"},
      { "data": "amount"},
      { "data": ""}
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

  //Add product
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

  //Delete
  $('#table_shop tbody').on('click', '.function_delete', function () {
        var row = table_shops.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: window.origin+':3000/shops/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            location.reload();
            alert("A compras: "+id+" foi apagado com sucesso");
          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Ocorreu um erro");
          }
        });
    });

  //Add
  $(document).on('submit', '#form_meal.add', function(e){
      e.preventDefault();
      var data = {};
      $("#form_meal.add").serializeArray().map(function(x){data[x.name] = x.value;});
      delete data.meal_products_list;
      data.products = [];
      $('#meal_products_list').val().forEach(function(entry) {
          var id = parseInt(entry)
          data.products.push( { 'id' : id, 'amount' :  list[id].toBeUsed} );
      });
      $.ajax({
        url: window.origin+":3000/shops",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function(response) {
            location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Ocorreu um erro");
        }
    });
  });


  // Get products in stock
  $.ajax({
           type: "GET",
           url: window.origin+":3000/products",
           contentType: "application/json; charset=utf-8",
           dataType: 'json',
           success: function OnPopulateControl(response) {
               list = {};
               for (var i = 0, len = response.data.length; i < len; i++) {
                 list[response.data[i].id] = response.data[i];
               }
               var listitems = '';
               $.each(list, function(key, value){
                 listitems += '<option value=' + key + '>' + value.name +' '+ value.description + '</option>';
               });

               $('#product').append(listitems);
           },
           error: function () {
               alert("Ocorreu um erro");
           }
  });

  //Set default date to today
  document.getElementById('date').valueAsDate = new Date();
  console.log(new Date())

 $('#date').datepicker({ dateFormat: 'dd-mm-yy' }).val();

  function generateProdDescription(name,description,stock,amount){
    var description = name+" ("+description+")";
    if(stock && amount) description += " ("+stock+"/"+amount+")";
    return description;
  }
});