//var bounds;
var bounds = new google.maps.LatLngBounds();
var markers = [];
var marker;
var popup;
var tempo;

$(document).ready(function() {	

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
			    format: 'DD-MM-YYYY',
			    //startDate: '2013-01-01',
			    //endDate: '2015-12-31',
			    startDate: moment().subtract(29, 'days').format('DD-MM-YYYY'),		//Un mes atrás
			    endDate: moment().subtract(0, 'days').format('DD-MM-YYYY'),			//Hoy
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
			    FechaInicial=start.format('YYYY-MM-DD');	//Formato para Mysql
			    FechaFinal=end.format('YYYY-MM-DD');
			    $('input[name="rangoFechas"]').val(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
			});

	$('input[name="rangoFechas"]').val(moment().subtract(29, 'days').format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YY'));
 });



RefreshTimeMarkers=600000;	//Cada 10 minutos

var icontaxi=new Array(20);
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
