//var bounds;
var bounds;
var markers = [];
var marker;
var popup;
var tempo;

/*by Emmanuel*/
var map;
var mapOptions;
var historial;

/*end by Emmanuel*/
RefreshTimeMarkers=600000;	//Cada 10 minutos

var icontaxi;


$(document).ready(function() {	

var  _FechaInicial = moment();
var  _FechaFinal = moment().subtract(29, 'days');

var _HoraInicial = moment().format("00:00:00","HH:MM:ss");
var _HoraFinal = moment().format("23:59:59","HH:MM:ss");

//////////////////////////////////////////////////////////////////////////////////////
//Selector de fechas
	var regional = 
	 	{
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'Desde',
            toLabel: 'Hasta',
            weekLabel: 'Sem',
            customRangeLabel: 'Otro rango',
            daysOfWeek: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
            monthNames: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		};

	$('input[name="rangoFechas"]').daterangepicker(
			{
				locale : regional,
			    format: 'DD-MM-YYYY HH:MM:ss',
				timePicker: true,
			    //startDate: '2013-01-01',
			    //endDate: '2015-12-31',
			    startDate: moment().subtract(29, 'days').format('DD-MM-YYYY'),		//Un mes atrás
			    endDate: moment().subtract(0, 'days').format('DD-MM-YYYY'),			//Hoy
			   	timePickerIncrement: 5,
		        timePicker12Hour: false,
		        timePickerSeconds: false,
			    ranges: {
			       'Hoy': [moment(), moment()],
			       'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			       'Ultimos 7 Dias': [moment().subtract(6, 'days'), moment()],
			       'Ultimos 30 Dias': [moment().subtract(29, 'days'), moment()],
			       'Este mes': [moment().startOf('month'), moment().endOf('month')],
			       'Ultimo mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			    }
			}, 
			function(start, end, label) {
			    _FechaInicial=start.format('YYYY-MM-DD');	//Formato para Mysql
			    _FechaFinal=end.format('YYYY-MM-DD');
				_HoraInicial=start.format('HH:MM:ss');
				_HoraFinal=end.format('HH:MM:ss');
			    $('input[name="rangoFechas"]').val(start.format('DD-MM-YYYY') +' '+ _HoraInicial + ' - ' + end.format('DD-MM-YYYY') +' '+ _HoraFinal);
				$.ajax({
					url: "./tools/consult-historic.php", /*this is a php that connect with the mysql server and extract the historic data*/
					type: "POST",
					dataType:'json',
					data:{
							FechaInicial: _FechaInicial,
							FechaFinal: _FechaFinal,
							HoraInicial: _HoraInicial,
							HoraFinal: _HoraFinal,
						},
				}).done(function(data){
					historial = data;
					if(historial.length != 0){
						drawMarker();	
					}else{
						alert("No existe historial para el taxi");
						removeMarkers();
					}
				});
			});
			

	$('input[name="rangoFechas"]').val(moment().subtract(29, 'days').format('DD-MM-YYYY') +' '+ _HoraInicial +' - ' + moment().format('DD-MM-YYYY')+ ' '+_HoraFinal);
	
	
 });

/*added by Emmanuel*/
//initilize google maps
function loadScript(){
	var script = document.createElement("script");
    script.type ="text/javascript";
    script.src ="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=places&callback=iniMaps";
    document.body.appendChild(script);
}
function iniMaps(){
	icontaxi=new Array(20);
			icontaxi['Libre'] = new google.maps.MarkerImage(urllocal + "iconitos/1-32.png",
			 new google.maps.Size(32, 32), new google.maps.Point(0, 0),
			 new google.maps.Point(16, 32));
			icontaxi['Ocupado'] = new google.maps.MarkerImage(urllocal + "iconitos/2-32.png",
			 new google.maps.Size(32, 32), new google.maps.Point(0, 0),
			 new google.maps.Point(16, 32));
			icontaxi['Inactivo'] = new google.maps.MarkerImage(urllocal + "iconitos/3-32.png",
			 new google.maps.Size(32, 32), new google.maps.Point(0, 0),
			 new google.maps.Point(16, 32));
			icontaxi['Emergencia'] = new google.maps.MarkerImage(urllocal + "iconitos/4-32.png",
			 new google.maps.Size(32, 32), new google.maps.Point(0, 0),
			 new google.maps.Point(16, 32));
	
	mapOptions = {
		center : new google.maps.LatLng(centromapa_latitud,centromapa_longitud), //using configuracion.js
		zoom : 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP, //street
	}	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	
}

function drawMarker(){
	removeMarkers() //remove old markers 
	var lat; //latitude
	var lng; //longitude
	var state; //state taxi  in this position
	for(var i = 0; i<historial.length; i++){
		lat = historial[i]['lat'];
		lng = historial[i]['lng'];
		status = historial[i]['status'];
		
		marker = new google.maps.Marker();
		marker.setPosition(new google.maps.LatLng(lat, lng)); // put lat & lng
		marker.setIcon(icontaxi[status]); // put the status icon
		marker.setMap(map); //put marker in the map
		
		markers.push(marker);
	}
	historial = null;
}

function removeMarkers(){
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
	
}
window.onload = loadScript;
/*END*/