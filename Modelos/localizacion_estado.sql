CREATE TABLE `localizacion_estado` (
  `idlocalizacion_estado` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `placa` varchar(10) NOT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `servicio` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`idlocalizacion_estado`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;