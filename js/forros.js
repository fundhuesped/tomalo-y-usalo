        
      function main_forro() {
          
        
        var mapa;
          // create google maps map
        var mapOptions = {
          zoom: 3,
          center: new google.maps.LatLng("-34.7235745", "-58.381585"),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //inicializa mapa
        mapa = new google.maps.Map(document.getElementById('forros-map'), mapOptions);
        //geocoder
        
        $('#forros-map').width($(window).width());
        $('#forros-map').height($(window).height());
          
    google.maps.event.trigger(mapa, 'resize'); 
        
        
        $("#geocomplete").geocomplete({
            map: mapa,
            country: 'ar'
        }).bind("geocode:result", function(event, result){
            $(".forros-map-menu").toggle();
            
        });
        var mapeo =  $("#geocomplete").geocomplete("forros-map"); 
        //agrega layer de cartoDB
        cartodb.createLayer(mapa, 'http://fundhuesped.cartodb.com/api/v2/viz/6e2ce16a-f2ec-11e2-a228-699358bddf8e/viz.json')
        .addTo(mapa)
        .on('done', function(layer) {
           
          $(window).resize(function() {
             $('#forros-map').width($(window).width());
             $('#forros-map').height($(window).height());
          });
          var sublayer = layer.getSubLayer(0);
  
          sublayer.infowindow.set('template', $('#infowindow_template').html());
          sublayer.on('featureOver', function(e, pos, latlng, data) {
            
          });

          sublayer.on('error', function(err) {
            
          });

        })
        .on('error', function(error) {
          
        });

      };
