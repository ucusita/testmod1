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
	
	
	/*Sample*/
	$historial = array(
		array(
			"lat" =>"-29.4182207",
			"lng" => "-66.8590197",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4182207",
			"lng" =>"-66.8691196",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4182207",
			"lng" =>"-66.8792195",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4182207",
			"lng" =>"-66.8893194",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4182207",
			"lng" =>"-66.8994193",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4282207",
			"lng" =>"-66.8994193",
			"status"=>"Libre"),
		array(
			"lat" =>"-29.4282207",
			"lng" =>"-66.8893194",
			"status"=>"Libre"),
	);
	
	echo json_encode($historial);
	
	
?>
