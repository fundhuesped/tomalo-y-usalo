
      function main_forro() {
          var map;
          // create google maps map
          var mapOptions = {
            zoom: 3,
            center: new google.maps.LatLng(43, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById('map'), mapOptions);

          // create layer and add to the map, then add some intera
          cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
          .addTo(map)
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
