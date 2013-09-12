/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var jqmReady = $.Deferred();
var pgReady = $.Deferred();

var app = {
	env: {
		geolocate: false
	},
    // Application Constructor
    initialize: function() {
		
		checkMobileSafari();
		this.bindEvents();
        $.mobile.allowCrossDomainPages = true;
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		app.env.geolocate = true;
        var tests = "http://fundhuesped.cartodb.com/api/v2/viz/d411feb8-f3c1-11e2-a45e-ddabda956258/viz.json";
        var buscar_preservativos = "http://fundhuesped.cartodb.com/api/v2/viz/9d28261a-f3c2-11e2-b703-417053fa0b43/viz.json";
        $("#preservativos-page").on('pageshow', function(e, data){
            if (!app.env.geolocate) {
				$(".preservativos-autocomplete-menu").show();
				mapa_init('preservativos-map','preservativos-autocomplete',buscar_preservativos,"infowindow_template_preservativos", false);
			}
			else {
				$(".preservativos-autocomplete-menu").hide();
				mapa_init('preservativos-map','preservativos-autocomplete',buscar_preservativos,"infowindow_template_preservativos", true);	
			}
        });
        $("#preservativos-page").on("pagehide", function(e) {
            $("#preservativos-map").html("");
        });
        $("#test-page").on('pageshow', function(e, data){
			if (!app.env.geolocate) {
				$(".test-autocomplete-menu").show();
				mapa_init('test-map','test-autocomplete',tests,"infowindow_template", false);	
			}
			else {
				$(".test-autocomplete-menu").hide();
				mapa_init('test-map','test-autocomplete',tests,"infowindow_template", true);	
			}
        });
         $("#test-page").on("pagehide", function(e) {
            $("#test-map").html("");
        });
		$("#test-search-panel-button").click( function(e) {
			$(".test-autocomplete-menu").toggle();
		});
		$("#preservativos-search-panel-button").click( function(e) {
			$(".preservativos-autocomplete-menu").toggle();
		});
		$("#geolocalizar").click(function(e) {
			navigator.geolocation.getCurrentPosition(function(geoposition) {
				$("#sugerencia-latitud").val(geoposition.coords.latitude);
				$("#sugerencia-longitud").val(geoposition.coords.longitude);
				$("#sugerencia-precision").val(geoposition.coords.accuracy);
				$("#sugerencia-mostrargeolocalizacion").val(geoposition.coords.latitude + ", "+ geoposition.coords.longitude);
			});
		});
		$("#nuevasugerencia").submit(function(e) {
			$(".ui-loader").show();
			//cache the form element for use in this function
			var $this = $(this);
			//prevent the default submission of the form
			e.preventDefault();
			//run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
			$.post($this.attr('action'), $this.serialize(), function (responseData) {

			})
			.always( function() { $(".ui-loader").hide(); });
		});
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};


