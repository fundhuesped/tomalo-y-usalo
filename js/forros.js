function mapa_porcalle(idContenedorMapa, idAutocompleteInput, cartodblayer, tooltipTplId) {
    var mapa = inicializarMapa(idContenedorMapa);

    //autocomplete del mapa
    $("#"+idAutocompleteInput).geocomplete({
        map: mapa,
        country: 'ar'
    }).bind("geocode:result", function(event, result){
        $("."+idAutocompleteInput+"-menu").toggle();
    });
    $("#"+idAutocompleteInput).geocomplete(idContenedorMapa); 

    //agrega layer de cartoDB
    cartodb.createLayer(mapa,cartodblayer )
    .addTo(mapa)
    .on('done', function(layer) {   
        
        //tooltips
        var sublayer = layer.getSubLayer(0);
        sublayer.infowindow.set('template', $('#'+tooltipTplId).html());
        sublayer.on('featureOver', function(e, pos, latlng, data) {
      });

      sublayer.on('error', function(err) {
          //si hay algun error en el tooltip
      });

    })
    .on('error', function(error) {
       //si hay algun error con cartoDB
    });
};


 function mapa_ubicame(idContenedorMapa, cartodblayer,tooltipTplId) {
        var mapa = inicializarMapa(idContenedorMapa);
        
        //agrega layer de cartoDB
        cartodb.createLayer(mapa, cartodblayer)
        .addTo(mapa)
        .on('done', function(layer) {
          //agregamos el marcador con la ubicacion actual (geoposition = location de phonegap)
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
        .on('error', function(error) {
           //si hay algun error con cartoDB
        });
      };
      
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
        radius: 500,    // 10 miles in metres
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
    actualizarTamanioMapa(idContenedorMapa, mapa);
    $(window).resize(function() {
       actualizarTamanioMapa(idContenedorMapa, mapa);
    });
    return mapa
} 

function actualizarTamanioMapa(idContenedorMapa, mapa) {
    $('#'+idContenedorMapa).width($(window).width());
    $('#'+idContenedorMapa).height(($(window).height()-$('.ui-navbar').height()));  
    google.maps.event.trigger(mapa, 'resize'); 
}
function cerrar (elem) {
    $(elem).remove();
}