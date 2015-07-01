<?php

	/*Here put the connection to mysql server. unidades_historic.js call this page.
	*unidades_historic need this variables:
	*			lat -> latitude
	*			lng -> longitude
	*			status -> status' taxi (Libre, Ocupado, Inactivo, Emergencia)
	*
	*	this page have to response an array json with this format:
	*	
	*	historial= [
	*				{"lat":"value", "lng":"value", "status":"value"},
	*				{"lat":"value", "lng":"value", "status":"value"},
	*				{"lat":"value", "lng":"value", "status":"value"},
	*				]
	*/
	
	if (isset($_POST['placa']))
	{		
		require_once(dirname(__FILE__)).'/assets/core/init.php';			

		$placa = $_POST['placa'];

		$Servicio = new Taxi();

		$historial=$Servicio->HistoriaGPSUnidad($placa);
		
		echo json_encode($historial);
		//print_r($historial);
	}
	
	/* TESTING EMMA- NO ELIMINAR
	$historial = array(
		array(
			"lat"=>"-29.4182207",
			"lng"=>"-66.8590197",
			"status"=>"Libre",
		),
		array(
			"lat"=>"-29.4182207",
			"lng"=>"-66.8790195",
			"status"=>"Libre",
		),
		array(
			"lat"=>"-29.4182207",
			"lng"=>"-66.8893194",
			"status"=>"Libre",
		),
		array(
			"lat"=>"-29.4182207",
			"lng"=>"-66.8994193",
			"status"=>"Libre",
		),
	);
	
	echo json_encode($historial);
	
	*/
?>
