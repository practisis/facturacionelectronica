function ingresavalorfact(quien){

  var subtotal = 0;
  var cant = parseFloat(document.getElementById('cant'+quien).value);
  var prec = parseFloat(document.getElementById('prec'+quien).value.replace(',','.'));
  var iva = document.getElementById('iva'+quien).checked;
  var producto = document.getElementById('prod'+quien).value;
  var precaux = document.getElementById('prec'+quien).value;
  var cantaux = document.getElementById('cant'+quien).value;
  var desc = parseFloat(document.getElementById('desc'+quien).value);
  var descaux = document.getElementById('desc'+quien).value;
  //alert(prec+'**'+precaux);

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

	   /*var cambiacant=cant.toString().replace(",",".");
		var cambiaprec=prec.toString().replace(",",".");*/
		/*cant=cambiacant;
		prec=parseFloat(cambiaprec);
	  document.getElementById('cant'+quien).value=cant;
      document.getElementById('prec'+quien).value=prec;*/

      totales();
    }
  }

}
function totales(){

    var valoriva = 0.12;
    var valortotaliva = 0;
    var total = 0;
    var subtotal = 0;
    var d = document.getElementById('tablaconsumos').getElementsByTagName('input');
    var totciva = 0;
    var totsiva = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,4);

      if(tiva=='subt'){
        var quien = ww.substr(4);

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
    subtotal = totciva+totsiva;
    //document.getElementById('subt').value=subtotal.toFixed(2);
    document.getElementById('subsi').value=totsiva.toFixed(2);
    document.getElementById('subci').value=totciva.toFixed(2);
    document.getElementById('iva').value=valortotaliva.toFixed(2);
    document.getElementById('total').value=total.toFixed(2);
    //document.getElementById('subtxx').value=subtotal.toFixed(2);
    document.getElementById('subsixx').value=totsiva.toFixed(2);
    document.getElementById('subcixx').value=totciva.toFixed(2);
    document.getElementById('ivaxx').value=valortotaliva.toFixed(2);
    document.getElementById('totalxx').value=total.toFixed(2);

}
function validar(){
  $("#fadeCloud").show();
  //$('#msjinfo').fadeOut('fast');
  var facturacion = '';
  var sutotal = 0;
  var sutotalneto = 0;
  var subsi = parseFloat(document.getElementById('subsi').value);
  var subci = parseFloat(document.getElementById('subci').value);
  var iva = parseFloat(document.getElementById('iva').value);
  var total = parseFloat(document.getElementById('total').value);
  var errordi=0;

  if ($("#idcliente").length > 0 ){
  var idcliente = $('#idcliente').val();
  }else{
   var idcliente=$('.idcliente').val();
  }

  sutotal = subsi+subci;
  sutotalneto = sutotal;
  var establecimiento =document.getElementById('establecimiento').value;
  var caja = document.getElementById('serie').value;
  var factura_no = document.getElementById('facturano').value;
  facturacion = idcliente+'|'+total+'|'+sutotal+'|'+establecimiento+'|'+caja+'|'+factura_no+'|'+sutotalneto+'|'+subci+'|'+iva;


  var d = document.getElementById('tablaconsumos').getElementsByTagName('input');
    var consumos = '';
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,4);
      //alert(tiva);
      if(tiva=='subt'){
        var quien = ww.substr(4);
        //alert(quien);
			if(document.getElementById('subt'+quien).value != ''){
			  var descuento = 0;
			  var cantidad = document.getElementById('cant'+quien).value;
			  var producto = document.getElementById('prod'+quien).value;
			  var tiva = document.getElementById('iva'+quien).checked;
			  var precio = document.getElementById('prec'+quien).value;
			  var descuentoaux = 0;//parseFloat(document.getElementById('desc'+quien).value);
			  var precion = document.getElementById('prec'+quien).value;//document.getElementById('precn'+quien).value;
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
			}else{
				if(document.getElementById('cant'+quien).value != ''){
				errordi=errordi+1;
				}
			}
        }
      }

      //alert(consumos+'**'+errordi)

	  if (errordi>0 || consumos==''){
			alert('Parece que te has equivocado!\nNo se puede grabar la factura.\nPor favor revise los datos, por lo menos debe haber un producto para guardar la factura y no existir lineas de productos vacias.');
            $("#fadeCloud").hide();
			return false;
	  }

  /*if(establecimiento == ''){
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
  }else */if(factura_no == ''){
      $('.alert-danger').not('#uploaderrors').slideUp();
      $('.alert-danger').html('<b>Parece que te has equivocado!</b><br/>Debe ingresar el número de factura.');
      $('.alert-danger').not('#uploaderrors').slideDown();
      $('html,body').animate({
      	scrollTop : 0
      });
      setTimeout(function(){ $('.alert-danger').not('#uploaderrors').slideUp(); }, 3000);
  }else{
    //alert('empresahis='+miidempresa+'&que=1&facturacion='+facturacion+'&consumos='+consumos);
    $.ajax({
		type: 'POST',
		url: "http://practisis.net/practifactura/api.php",
		data: 'empresahis='+miidempresa+'&que=1&facturacion='+facturacion+'&consumos='+consumos,
		success: function(response){
		  //alert(response);
          var res = response.split("|");
              if(res[0] == 'ok'){
                $('#msjok').fadeIn('fast');
                $('.alert-danger').not('#uploaderrors').slideUp();
                $('#message-info').html('<b>Factura ingresada con exito.</b><br/>');
                $('.alert-info').not('#uploaderrors').slideDown();
                $('html,body').animate({
                	scrollTop : 0
                });
                //setTimeout(function(){ location.reload(true); }, 2000);
                document.getElementById('msjinfo').style.display='none';
                setTimeout(function(){ envia('factura'); }, 2000);
                $('#datos').hide();
        		$('#datosconsumos').hide();
                $('#datostotales').hide();
        		$('.idcliente').val('');
                $("#maincontinuar").hide();
                $("#fadeCloud").hide();
                $('#boton1').tooltip('show');
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
function escribe(e){
  //alert(e.which);
  /*if (e.which == 44 || e.which == 188) {
      return false;
  }else{
    return true;
  }*/
}
function intOrFloat(e,value){
  if(value.indexOf('.') !== -1 && (e.keyCode == 190 || e.keyCode == 110)){
      e.preventDefault();
      }

  if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46 || e.keyCode == 190 || e.keyCode == 110 || e.keyCode == 13){
      return;
      }
  else{
      e.preventDefault();
      }
}
$('.soloFloat').on('keydown',function(event,value){
   //alert($(this).val());
intOrFloat(event,$(this).val());
});

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}