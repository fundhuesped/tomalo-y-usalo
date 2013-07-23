      function main_forro() {
        var mapa = inicializarMapa('forros-map');

        //autocomplete del mapa
        $("#geocomplete").geocomplete({
            map: mapa,
            country: 'ar'
        }).bind("geocode:result", function(event, result){
            $(".forros-map-menu").toggle();
        });
        $("#geocomplete").geocomplete("forros-map"); 
        
        //agrega layer de cartoDB
        cartodb.createLayer(mapa, 'http://fundhuesped.cartodb.com/api/v2/viz/6e2ce16a-f2ec-11e2-a228-699358bddf8e/viz.json')
        .addTo(mapa)
        .on('done', function(layer) {   
          $(window).resize(function() {
             $('#forros-map').width($(window).width());
             $('#forros-map').height($(window).height());
          });
          //tooltips
            var sublayer = layer.getSubLayer(0);
            sublayer.infowindow.set('template', $('#infowindow_template').html());
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


 function ubicame_forro() {
        var mapa = inicializarMapa('forros-map-ubicame');
     
     
        //agrega layer de cartoDB
        cartodb.createLayer(mapa, 'http://fundhuesped.cartodb.com/api/v2/viz/6e2ce16a-f2ec-11e2-a228-699358bddf8e/viz.json')
        .addTo(mapa)
        .on('done', function(layer) {
          //agregamos el marcador con la ubicacion actual (geoposition = location de phonegap)
          navigator.geolocation.getCurrentPosition(function(geoposition){
                marcarpunto(geoposition,mapa,'#a2001e', true);
          });
  
          $(window).resize(function() {
             $('#forros-map-ubicame').width($(window).width());
             $('#forros-map-ubicame').height($(window).height());
          });
            //tooltips
            var sublayer = layer.getSubLayer(0);
            sublayer.infowindow.set('template', $('#infowindow_template').html());
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

function inicializarMapa(idContenedor) {
    // opciones del mapa
    var mapOptions = {
      zoom: 3,
      center: new google.maps.LatLng("-34.7235745", "-58.381585"),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //inicializa mapa
    var mapa = new google.maps.Map(document.getElementById(idContenedor), mapOptions);
    
    //tamaño del mapa (al 100% no funciona en mobile)
    $('#'+idContenedor).width($(window).width());
    $('#'+idContenedor).height(($(window).height()-$('.ui-navbar').height()));  
    google.maps.event.trigger(mapa, 'resize'); 

    return mapa
} 