function ingresa(quien){
  var subtotal = 0;
  var cant = parseFloat(document.getElementById('cant'+quien).value);
  var prec = parseFloat(document.getElementById('prec'+quien).value);
  var iva = document.getElementById('iva'+quien).checked;
  var producto = document.getElementById('prod'+quien).value;
  var precaux = document.getElementById('prec'+quien).value;
  var cantaux = document.getElementById('cant'+quien).value;
  var desc = parseFloat(document.getElementById('desc'+quien).value);
  var descaux = document.getElementById('desc'+quien).value;

  if(precaux != '' && cantaux != ''){
    if(producto==''){
      $('.alert-danger').not('#uploaderrors').slideUp();
      $('.alert-danger').html('<b>Parece que te has equivocado!</b><br/>Debe ingresar el producto para la factura.');
      $('.alert-danger').not('#uploaderrors').slideDown();
      $('html,body').animate({
      	scrollTop : 0
      });
      setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 4000);
    }else{
      if(descaux != ''){
        prec = prec-(prec*(desc/100));
      }else{
        prec = prec;
      }
      subtotal = cant*prec;

      document.getElementById('precn'+quien).value=prec.toFixed(2);
      document.getElementById('subt'+quien).value=subtotal.toFixed(2);
      totales();
    }
  }

}
function totales(){

    var valoriva = 0.12;
    var valortotaliva = 0;
    var total = 0;
    var d = document.getElementById('detallefactura').getElementsByTagName('input');
    var totciva = 0;
    var totsiva = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,4);
      //alert(tiva);
      if(tiva=='subt'){
        var quien = ww.substr(4);
        //alert(quien)
        if(document.getElementById('subt'+quien).value != ''){
          var permiso = document.getElementById('iva'+quien).checked;
          if(permiso==true){
              totciva += parseFloat(document.getElementById('subt'+quien).value);
          }else if(permiso==false){
              totsiva += parseFloat(document.getElementById('subt'+quien).value);
          }
        }
      }
      }

    valortotaliva = totciva*valoriva;
    total = totciva+totsiva+valortotaliva;
    document.getElementById('subsi').value=totsiva.toFixed(2);
    document.getElementById('subci').value=totciva.toFixed(2);
    document.getElementById('iva').value=valortotaliva.toFixed(2);
    document.getElementById('total').value=total.toFixed(2);

}
function validar(){
  var facturacion = '';
  var sutotal = 0;
  var sutotalneto = 0;
  var subsi = parseFloat(document.getElementById('subsi').value);
  var subci = parseFloat(document.getElementById('subci').value);
  var iva = parseFloat(document.getElementById('iva').value);
  var total = parseFloat(document.getElementById('total').value);
  var idcliente = document.getElementById('idcliente').value;
  sutotal = subsi+subci;
  sutotalneto = sutotal;
  var establecimiento = document.getElementById('establecimiento').value;
  var caja = document.getElementById('caja').value;
  var factura_no = document.getElementById('factura_no').value;
  facturacion = idcliente+'|'+total+'|'+sutotal+'|'+establecimiento+'|'+caja+'|'+factura_no+'|'+sutotalneto+'|'+subci+'|'+iva;

  var d = document.getElementById('detallefactura').getElementsByTagName('input');
    var consumos = '';
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,4);
      //alert(tiva);
      if(tiva=='subt'){
        var quien = ww.substr(4);
        //alert(quien)
        if(document.getElementById('subt'+quien).value != ''){
          var descuento = 0;
          var cantidad = document.getElementById('cant'+quien).value;
          var producto = document.getElementById('prod'+quien).value;
          var tiva = document.getElementById('iva'+quien).checked;
          var precio = document.getElementById('prec'+quien).value;
          var descuentoaux = parseFloat(document.getElementById('desc'+quien).value);
          var precion = document.getElementById('precn'+quien).value;
          var prodsubtotal = document.getElementById('subt'+quien).value;

          if(document.getElementById('desc'+quien).value !=''){
            descuento = 1-(descuentoaux/100);
          }else{
            descuento = 1;
          }
          if(tiva == true){
            var textoiva = 'i';
          }else{
            var textoiva = '';
          }


          consumos += idcliente+'||'+cantidad+'||'+producto+'||'+precio+'||'+descuento+'||'+textoiva+'||'+tiva+'@@';

        }
      }
      }

  if(establecimiento == ''){
      $('.alert-danger').not('#uploaderrors').slideUp();
      $('.alert-danger').html('<b>Parece que te has equivocado!</b><br/>Debe ingresar el establecimiento para la factura.');
      $('.alert-danger').not('#uploaderrors').slideDown();
      $('html,body').animate({
      	scrollTop : 0
      });
      setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 3000);
  }else if(caja == ''){
      $('.alert-danger').not('#uploaderrors').slideUp();
      $('.alert-danger').html('<b>Parece que te has equivocado!</b><br/>Debe ingresar la caja para la factura.');
      $('.alert-danger').not('#uploaderrors').slideDown();
      $('html,body').animate({
      	scrollTop : 0
      });
      setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 3000);
  }else if(factura_no == ''){
      $('.alert-danger').not('#uploaderrors').slideUp();
      $('.alert-danger').html('<b>Parece que te has equivocado!</b><br/>Debe ingresar el número de factura.');
      $('.alert-danger').not('#uploaderrors').slideDown();
      $('html,body').animate({
      	scrollTop : 0
      });
      setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 3000);
  }else{

    $.ajax({
		type: 'POST',
		url: "http://practisis.net/practifactura/api.php",
		data: 'que=1&facturacion='+facturacion+'&consumos='+consumos,
		success: function(response){
		  alert(response);
          var res = response.split("|");
              if(res[0] == 'ok'){
                $('.alert-danger').not('#uploaderrors').slideUp();
                $('#message-info').html('<b>Factura ingresada con exito.</b><br/>');
                $('.alert-info').not('#uploaderrors').slideDown();
                $('html,body').animate({
                	scrollTop : 0
                });
                setTimeout(function(){ location.reload(true); }, 3000);
              }else{
                $('.alert-danger').not('#uploaderrors').slideUp();
                $('.alert-danger').html('<b>Hubo un error!</b><br/>Vuelva a intentar.');
                $('.alert-danger').not('#uploaderrors').slideDown();
                $('html,body').animate({
                	scrollTop : 0
                });
                setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 3000);
              }
			}
		});

    //document.getElementById('facturacion').value = facturacion;
    //document.getElementById('consumos').value = consumos;
  }
}