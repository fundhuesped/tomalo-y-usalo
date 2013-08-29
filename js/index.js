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
        this.bindEvents();
        
        $.mobile.allowCrossDomainPages = true;
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var tests = "http://fundhuesped.cartodb.com/api/v2/viz/d411feb8-f3c1-11e2-a45e-ddabda956258/viz.json";
        var buscar_forros = "http://fundhuesped.cartodb.com/api/v2/viz/9d28261a-f3c2-11e2-b703-417053fa0b43/viz.json";
        $("#forros-page").on('pageshow', function(e, data){
            if (!app.env.geolocate) {
				$(".forros-autocomplete-menu").show();
				mapa_init('forros-map','forros-autocomplete',buscar_forros,"infowindow_template_forros", false);
			}
			else {
				$(".forros-autocomplete-menu").hide();
				mapa_init('forros-map','forros-autocomplete',buscar_forros,"infowindow_template_forros", true);	
			}
        });
        $("#forros-page").on("pagehide", function(e) {
            $("#forros-map").html("");
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
        $("#forros-menu .buscar-icon-link").click( function(e) {
			app.env.geolocate = false;
		});
		$("#forros-menu .ubicame-icon-link").click( function(e) {
			app.env.geolocate = true;
		});
		$("#test-menu .buscar-icon-link").click( function(e) {
			app.env.geolocate = false;
		});
		$("#test-menu .ubicame-icon-link").click( function(e) {
			app.env.geolocate = true;
		});
		$("#test-search-panel-button").click( function(e) {
			$(".test-autocomplete-menu").toggle();
		});
		$("#preservativos-search-panel-button").click( function(e) {
			$(".forros-autocomplete-menu").toggle();
		});
		
        //document.addEventListener('deviceready', this.onDeviceReady, false);
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


