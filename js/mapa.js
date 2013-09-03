function mapa_init(idContenedorMapa, idAutocompleteInput, cartodblayer, tooltipTplId) {
    var mapa = inicializarMapa(idContenedorMapa);

    //autocomplete del mapa
	$("#"+idAutocompleteInput).geocomplete({
		map: mapa,
		country: 'ar'
	}).bind("geocode:result", function(event, result){
		$("."+idAutocompleteInput+"-menu").hide();
	});

    //agrega layer de cartoDB
    cartodb.createLayer(mapa,cartodblayer,function(layer) {   
		navigator.geolocation.getCurrentPosition(function(geoposition){
			marcarpunto(geoposition,mapa,'#a2001e', true);
		});
		
        //tooltips
        var sublayer = layer.getSubLayer(0);
        sublayer.infowindow.set('template', $('#'+tooltipTplId).html());
        sublayer.on('featureOver', function(e, pos, latlng, data) {
      });

      sublayer.on('error', function(err) {
          //si hay algun error en el tooltip
      });

    })
    .addTo(mapa)
    .on('error', function(error) {
       //si hay algun error con cartoDB
    });
}

/*
 * Agrega un marcador al mapa
 */
function marcarpunto(geoposition, mapa, color, centrar) {
    var position = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude);
    var marcador = new google.maps.Marker({
                        position: position,
                        map: mapa
                    });
    var circle = new google.maps.Circle({
        map: mapa,
        radius: geoposition.coords.accuracy,    // 10 miles in metres
        fillColor: color,//'#a2001e',
        
        strokeWeight: 0 
      });
    circle.bindTo('center', marcador, 'position');
    if (typeof(centrar) != 'undefined') {
        mapa.setCenter(position);
        mapa.setZoom(15);
    } 
    
}

function inicializarMapa(idContenedorMapa) {
    // opciones del mapa
    var mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng("-34.7235745", "-58.381585"),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //inicializa mapa
    var mapa = new google.maps.Map(document.getElementById(idContenedorMapa), mapOptions);
    
    //tamaño del mapa (al 100% no funciona en mobile)
    setTimeout( function() {
		actualizarTamanioMapa(idContenedorMapa, mapa);
	}, 10);
    $(window).resize(function() {
       actualizarTamanioMapa(idContenedorMapa, mapa);
    });
    return mapa
} 

function actualizarTamanioMapa(idContenedorMapa, mapa) {
	var domMapa = $("#"+idContenedorMapa);
    domMapa.width($(window).width());
    domMapa.height($(window).height() - 50);
    google.maps.event.trigger(mapa, 'resize'); 
}

function cerrar (elem) {
    $(elem).remove();
}
