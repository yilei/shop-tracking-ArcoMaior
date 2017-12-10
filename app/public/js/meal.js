$(document).ready(function(){
  // On page load: datatable
  var table_meals =  $('#table_meals').DataTable({
    "ajax": {
      "url": window.origin+":3000/meals",
      "dataSrc": 'data',
      "type": "GET"
    },
    "columns": [
      { "data": "day" },
      { "data": "name"},
      { "data": "description"},
      { "data": "type"},
      { "data": "people"},
      { "data": "price_per_person"},
      { "data": "products"},
      { "data": "created_at"},
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
  $('#table_meals tbody').on('click', '.function_edit', function () {
        var data = table_meals.row( $(this).closest('tr') ).data();
        alert( data.name +"'s salary is: "+ data.id );
  } );
*/

  //Delete
  $('#table_meals tbody').on('click', '.function_delete', function () {
        var row = table_meals.row( $(this).closest('tr') )
        var id = row.data().id;
        $.ajax({
          url: window.origin+':3000/meals/'+id,
          dataType: 'json',
          type:'DELETE',
          success: function (response) {
            location.reload();
            alert("O utilizador: "+id+" foi apagado com sucesso");
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
        url: window.origin+":3000/meals",
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

  $('#meal_products_list').multiSelect({ keepOrder: true ,
         afterSelect: function(values){
           var stock = list[values];
           var quantity = parseInt(prompt("Em stock: "+stock.amount+"\nQuantidade:", "1"));
           if (quantity > 0 || quantity < stock) {
             stock.toBeUsed = quantity;

             var desc = $('#meal_products_list').find("option[value='"+values+"']").text();
             $("span:contains('"+desc+"'):last").text(generateProdDescription(stock.name,stock.description,stock.toBeUsed,stock.amount));

           } else {
               $('#meal_products_list').multiSelect('deselect', values);
           }
         },
         afterDeselect: function(values){
           //alert("Deselect value: "+values);
         }
  });

  // Get products in stock
  $.ajax({
           type: "GET",
           url: window.origin+":3000/products/inStock",
           contentType: "application/json; charset=utf-8",
           dataType: 'json',
           success: function OnPopulateControl(response) {
               list = {};
               for (var i = 0, len = response.data.length; i < len; i++) {
                 list[response.data[i].id] = response.data[i];
               }
               $.each(list, function () {
                  $('#meal_products_list').multiSelect('addOption', { value: this.id, text: generateProdDescription(this.name,this.description)});
               });
               $('#meal_products_list').multiSelect('refresh');
           },
           error: function () {
               alert("Ocorreu um erro");
           }
  });

  function generateProdDescription(name,description,stock,amount){
    var description = name+" ("+description+")";
    if(stock && amount) description += " ("+stock+"/"+amount+")";
    return description;
  }
});
