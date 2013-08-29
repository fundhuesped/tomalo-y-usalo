function mapa_init(idContenedorMapa, idAutocompleteInput, cartodblayer, tooltipTplId, geolocate) {
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
        if (geolocate) {
			navigator.geolocation.getCurrentPosition(function(geoposition){
				marcarpunto(geoposition,mapa,'#a2001e', true);
			});
		}
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
    actualizarTamanioMapa(idContenedorMapa, mapa);
    $(window).resize(function() {
       actualizarTamanioMapa(idContenedorMapa, mapa);
    });
    return mapa
} 

function actualizarTamanioMapa(idContenedorMapa, mapa) {
	var domMapa = $("#"+idContenedorMapa);
    domMapa.width($(window).width());
    domMapa.height($(window).height() - domMapa.parents(".ui-page").children('.ui-header').outerHeight(true) - domMapa.parents(".ui-page").children('.ui-footer').outerHeight(true));  
    google.maps.event.trigger(mapa, 'resize'); 
}
function cerrar (elem) {
    $(elem).remove();
}

var dab;
var DBStorage = {
    db: {},
    init: function() {
        //10000000 = 10Mbytes (si kilo = 1000)
       this.db = this.getDBObject();
       this.db.transaction(this.createTables,this.error, this.successInit);
       this.db.transaction(this.getAllTestPoints,this.error, this.success);
    },
    getDBObject: function() {
        return window.openDatabase("tomalo_usalo", "1.0", "Tomalo y Usalo", 10000000);
    },
    checkSync: function() {
        this.db.transaction(this.getAllTestPoints,this.syncTests, this.success);
    },
    successInit: function() {
        console.log("init ok");
        
    },
    createTables: function(cnx){
        console.log("crea tablas");
        //cnx.executeSql('DROP TABLE IF EXISTS TESTS');
        cnx.executeSql('CREATE TABLE IF NOT EXISTS TESTS (id unique, data, fecha)');
        cnx.executeSql('INSERT INTO TESTS (id unique, data, time) VALUES (1, "First row", "asasf")');
        console.log("fin crea tablas");
    },
    syncronize: function(cnx) {
        console.log("tomamos puntos test");
        this.db.transaction(this.getAllTestPoints,this.error, this.success);
        //cnx.executeSql('INSERT INTO carto_test (id, data, time) VALUES (1, "First row", "asasf")');
        //cnx.executeSql('CREATE TABLE IF NOT EXISTS carto_forros (id unique, data, time)');
        //this.db.transaction(this.getAllTestPoints, this.errorCNX, this.successCB);
        console.log("fin tomamos puntos test");
    },
    getAllTestPoints: function(cnx) {
        cnx.executeSql('SELECT * FROM TESTS', [], this.syncTest, this.error);
    },
    getAllForrosPoints: function(cnx) {
        cnx.executeSql('SELECT * FROM carto_forros', [], this.syncForros, this.error);
    },
    error: function(err) {
        console.log("Error processing SQL: "+err.code);
    },

    success: function() {
        
    },

    syncTest: function (cnx, results) {
        alert("test");
        alert(results.rows.length);
      
    },
    syncForros: function (cnx, results) {
        alert("forros");
        alert(results.rows.length);
      
    },

};
