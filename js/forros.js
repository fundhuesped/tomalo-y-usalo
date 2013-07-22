
      function main_forro() {
        var mapa;
          // create google maps map
        var mapOptions = {
          zoom: 3,
          center: new google.maps.LatLng(43, 0),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        mapa = new google.maps.Map(document.getElementById('forros-map'), mapOptions);
        
          $("#geocomplete").geocomplete({
            map: mapa,
            country: 'ar'
         });
          var mapeo =  $("#geocomplete").geocomplete("forros-map"); 
        
        cartodb.createLayer(mapa, 'http://fundhuesped.cartodb.com/api/v2/viz/6e2ce16a-f2ec-11e2-a228-699358bddf8e/viz.json')
        .addTo(mapa)
        .on('done', function(layer) {
           
          
          var sublayer = layer.getSubLayer(0);
          sublayer.on('featureOver', function(e, pos, latlng, data) {
            cartodb.log.log(e, pos, latlng, data);
          });

          sublayer.on('error', function(err) {
            cartodb.log.log('error: ' + err);
          });

        })
        .on('error', function(error) {
          cartodb.log.log(error);
        });

      };
