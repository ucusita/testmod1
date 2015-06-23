<?php	
	if (isset($_POST['placa']))
	{		
		require_once(dirname(__FILE__)).'/assets/core/init.php';			

		$placa = $_POST['placa'];
		$lattaxi = $_POST['lattaxi'];
		$longtaxi = $_POST['longtaxi'];
		//$estado = $_POST['estado'];
		//$nroservicio = $_POST['servicio'];

		$Servicio = new Taxi();

		$Localizacion=$Servicio->Update_Taxi_Location($placa,$lattaxi,$longtaxi);
		print_r($Localizacion);
	}
?>