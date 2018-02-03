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

  //Add shop
  $(document).on('submit', '#form_shop.add', function(e){
      e.preventDefault();
      var data = {};
      $("#form_shop.add").serializeArray().map(function(x){data[x.name] = x.value;});
      data.day = $.datepicker.formatDate('mm-dd-yy', $('#day').datepicker('getDate'));
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
  $('#day').datepicker({
   buttonImage: 'images/calendar.png',
   buttonImageOnly: true,
   dateFormat: 'dd/mm/yy',
   dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
   dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
   dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
   monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
   monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
   nextText: 'Próximo',
   prevText: 'Anterior'
 }).datepicker("setDate", new Date());


  function generateProdDescription(name,description,stock,amount){
    var description = name+" ("+description+")";
    if(stock && amount) description += " ("+stock+"/"+amount+")";
    return description;
  }
});
