<?php
require_once(dirname(__FILE__)).'/../core/init.php';
	
class Taxi
{
	
	
		private $_db;
		
		public
		$numero_de_documento, 
		$email, 		
		$nombre, 

		public function __construct(){
			$this->_db = new DB();
			$this->_db = $this->_db ->Connect();
		}


//////////////////////////////////////////////////////////////////////////////////////////
//////////   Actualiza el estado del taxi
//////////////////////////////////////////////////////////////////////////////////////////
	public function Update_Taxi_Status($placa, $Estado)
	{
			// Borra el estado anterior 
			$cadena="UPDATE unidades SET estado_taxi='-' WHERE placa = '$placa'";
			$query_Update = $this->_db->prepare($cadena);
			$query_Update->execute();
			// Actualizo el nuevo estado
			$cadena="UPDATE unidades SET estado_taxi='$Estado' WHERE placa = '$placa'";
			//echo $cadena;
			$query_Update = $this->_db->prepare($cadena);
			$query_Update->execute();

			$t=$this->Log_Taxi('Cambio de estado de '.$placa.' a '.$Estado, $placa, '-');
			
			if($query_Update->rowCount() == 1){	
				return 0;  // Cambio correcto de estado
			}else{
				return 1;  // No se pudo actualizar
			}
			
	 } // Fin de la funcion

		
//////////////////////////////////////////////////////////////////////////////////////////
//////////   ACTUALIZA EL PAGO DEL SERVICIO Y CIERRA CON LOS DEMAS DATOS
//////////////////////////////////////////////////////////////////////////////////////////
		
	public function Update_Taxi_Location($placa, $lattaxi, $longtaxi, $estado, $servicio)
	{
				$cadena="UPDATE unidades SET lattaxi='$lattaxi', longtaxi='$longtaxi' WHERE placa = '$placa'";								
				$query_Update = $this->_db->prepare($cadena);
				$query_Update->execute();
				
				$fecha=date('Y-m-d');
				$hora=date('G:i:s');
				$cadena="INSERT INTO `taxivoy`.`localizacion_estado` 
				(`idlocalizacion_estado`, `placa`, `latitud`, `longitud`, `estado`, `servicio`, `fecha`, `hora`) 
				VALUES ('', '$placa', '$lattaxi', '$longtaxi', '$estado', '$servicio', '$fecha', '$hora')";
				$query_Update = $this->_db->prepare($cadena);
				$query_Update->execute();

				if($query_Update->rowCount() == 1){				
					return 1;  // Actualizo correctamente					
				}else{
					return 0;  // No actualizo
				}
			
	 } // end function Update_User;

//////////////////////////////////////////////////////////////////////////////////////////
//////////   DEVUELVE EL HISTORIAL DE LA UUNIDAD
//////////////////////////////////////////////////////////////////////////////////////////
		
	public function HistoriaGPSUnidad($placa)
	{
				$cadena="SELECT * FROM localizacion_estado WHERE placa = '$placa'";				
				
				$query = $this->_db->prepare($cadena);
				$query->execute();
				$historial= $query->fetchAll(PDO::FETCH_ASSOC);

				return $historial; 
			
	 } // end function HistoriaGPSUnidad;

		
} 

