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
		geolocate: true,
		selected_cartodbid: -1
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
        var tests = "http://fundhuesped.cartodb.com/api/v2/viz/6e72a246-20ae-11e3-b014-c7356bf9cc05/viz.json";
        var buscar_preservativos = "http://fundhuesped.cartodb.com/api/v2/viz/eecfd722-20ab-11e3-9492-0598d4d2fd17/viz.json";
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
				$("#info-dialog-msg").html("Los datos se han enviado correctamente. Muchas gracias.");
			})
			.fail( function() {
				$("#info-dialog-msg").html("Ha ocurrido un error al enviar su sugerencia, intente de nuevo mas tarde. Muchas gracias.");
			})
			.always( function() { 
				$(".ui-loader").hide();
				$.mobile.changePage("#info-dialog");
			});
		});
		$(".nueva-sugerencia-link").click( function(e) {
			app.env.selected_cartodbid = -1;
		});
		$("#nueva-sugerencia-test-page").on("pageshow", function(e, data) {
			if (app.env.selected_cartodbid > -1) {
				$("#cartodbid-correccion").val(app.env.selected_cartodbid);
				$(".correccion-label").show();
				$(".nueva-sugerencia-label").hide();
				// es una correccion.
			} else {
				$(".nueva-sugerencia-label").show();
				$(".correccion-label").hide();
				$("#cartodbid-correccion").val(-1);
				// no es una correccion, es una nueva sugerencia.
			}
		});
		$("#ir-a-testeo").click( function(e) {
			$.mobile.changePage("#test-page");
		});
		$("#ir-a-preservativos").click( function(e) {
			$.mobile.changePage("#preservativos-page");
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


