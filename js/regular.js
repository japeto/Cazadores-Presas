//       #    #    #     # ####### #######    #    #     # 
//       #   # #   ##   ##    #    #         # #   ##   ## 
//       #  #   #  # # # #    #    #        #   #  # # # # 
//       # #     # #  #  #    #    #####   #     # #  #  # 
// #     # ####### #     #    #    #       ####### #     # 
// #     # #     # #     #    #    #       #     # #     # 
//  #####  #     # #     #    #    ####### #     # #     # 
 
/**
 *
 * En el momento que la pagina este lista carga esta variables y ejecuta estos metodos
 * Esta basado en JQuery
 *
 */

$( document ).ready(function() {


	$('#chkret2d').val(true);
	$("#areadraw").hide();
	$("#areacantidades").hide();
	$("#ratepredatordeath").val(0.08)
	$("#ratepredatorgrowth").val(0.8)
	
	// Este es el area para pintar curvas 
	canvas = document.getElementById('areadraw');
	areaDibujo = canvas.getContext('2d');
	// Este es el area para pintar la reticula
    canvasreticula = document.getElementById("arealienzo");
    areaReticula = canvasreticula.getContext("2d");	

    canvasconteo = document.getElementById("areacantidades");
    areaConteo = canvasconteo.getContext("2d");	
    
    // Variables fijas que solo se acceden en esta pagina
	var interval,generaciones =100,demoraAnimacion=100;
	
	//arranco la ejecucion inicial
	// ejecutar(generaciones);  // llamada al metodo ejecutar para la primera pintada con 100 generaciones
	reticula(areaReticula);	 // llamo al metodo reticula para cargar los datos de la reticula
	moverEntreCeldas(areaReticula); // pinto la primera ejecucion  

	// una vez se de click en start inicia la animacion
	$('#startbutton').on("click", function() {

		if($("#chkret2d").is(':checked')){
			// demoraAnimacion=100
			//contador de tiempo -- paso a paso
			interval= setInterval(function(){ 	
				moverEntreCeldas(areaReticula);	// cambio el estado de la reticula
			}, demoraAnimacion);
		}
		else if($("#chksimple").is(':checked')){
			// demoraAnimacion =100
			//contador de tiempo -- paso a paso
			interval= setInterval(function(){ 	
				generaciones+=100; // actulizo las generaciones
				ejecutar(generaciones);	// llamo a ejecutar con el nuevo numero de generaciones
			}, demoraAnimacion);
		}
		else{
			// demoraAnimacion = 1000
			interval= setInterval(function(){ 	
				generaciones+=100; // actulizo las generaciones
				ejecutar(generaciones);	// llamo a ejecutar con el nuevo numero de generaciones
			}, demoraAnimacion);
		}

		// //contador de tiempo -- paso a paso
		// interval= setInterval(function(){ 	
		// 	generaciones+=100; // actulizo las generaciones
		// 	ejecutar(generaciones);	// llamo a ejecutar con el nuevo numero de generaciones
		// 	moverEntreCeldas(areaReticula);	// cambio el estado de la reticula
		// }, demoraAnimacion);
	});

	// realiza una pausa
	$('#stopbutton').on("click", function() {
		clearInterval(interval);  // me detengo si alguien pulsa
	});

	// si en algun momento se realizan cambios en la interfaz
	$( "input[type='number']" ).change(function(){
		if($(this).val() > 0){
			console.log($(this).val());
			ejecutar(generaciones);		// continuo con lo que iba, pero actulizo los parametros
			// areaReticula.clear();  	// se puede borrar la reticula
			reticula(areaReticula);		// reticula
			moverEntreCeldas(areaReticula);	// reticula
		}else{
			$(this).val(0.01)
		}
	});



	$("input[type='checkbox']").change(function() {
			// clearInterval(interval);

        	if(this.id == "chkret2d"){
        		$('#chksimple').attr('checked', false);
        		$('#chksimpleplus').attr('checked', false);
       			$("#arealienzo").show();
        		$("#areacantidades").hide();        		
        		$("#areadraw").hide();        		
        		$(this).attr('checked', true);

				$("#ratepredatordeath").val(0.08)
				$("#ratepredatorgrowth").val(0.8)

        	}if(this.id== "chksimple"){		
        		$('#chkret2d').attr('checked', false);
        		$('#chksimpleplus').attr('checked', false);
        		$("#arealienzo").hide();
        		$("#areacantidades").hide();
        		$("#areadraw").show();

				$("#ratepredatordeath").val(0.5)
				$("#ratepredatorgrowth").val(0.08)

				ejecutar(generaciones);  // llamada al metodo ejecutar para la primera pintada con 100 generaciones

        		$(this).attr('checked', true);
        	}if(this.id== "chksimpleplus"){
        		$('#chkret2d').attr('checked', false);
        		$('#chksimple').attr('checked', false);
				
				$("#arealienzo").hide();
				$("#areadraw").show();
				$("#areacantidades").show();

				$("#ratepredatordeath").val(0.5)
				$("#ratepredatorgrowth").val(0.08)

				ejecutar(generaciones);  // llamada al metodo ejecutar para la primera pintada con 100 generaciones


        		$(this).attr('checked', true);
        	}
    });
});

/**
 * Este metodo pinta generacion a generacion el estado las dos especies
 * @param {integer} numGeneracion - Estado en la generacion "numGeneracion".
 */

function ejecutar(numGeneracion) {
	
	// historico de cantidades, para pintar
	var arregloPuntosCazador = [];
	var arregloPuntosPresa = [];

	var limite = 0;

	// cantidades iniciales desde la interfaz
	var cantidadPresa = parseInt($("#numPrey").val());
	var cantidadCazador = parseInt($("#numPredators").val());
	    
    var rataDeMuertePresa = parseFloat($("#ratepreydeath").val());
    var rataDeMuerteCazador =  parseFloat($("#ratepredatordeath").val());

    var rataDeNacimientoPresa =  parseFloat($("#ratepreygrowth").val());
    var rataDeNacimientoCazador =   parseFloat($("#ratepredatorgrowth").val());
	
	// cambios en la grafica de acuerdo a las generaciones
    for (var i = 0; i < numGeneracion; i++) {
		arregloPuntosPresa.push(cantidadPresa);
		arregloPuntosCazador.push(cantidadCazador);
		
        
        var nuevaCantidadPresa = calcularPuntosPresa(cantidadPresa, rataDeNacimientoPresa, rataDeMuertePresa, cantidadCazador);
        var nuevaCantidadCazador = calcularPuntosCazador(cantidadPresa, cantidadCazador, rataDeNacimientoCazador, rataDeMuerteCazador);


		limite = (nuevaCantidadPresa > limite) ? nuevaCantidadPresa : limite;
		limite = (nuevaCantidadCazador > limite) ? nuevaCantidadCazador : limite;

        cantidadPresa = (nuevaCantidadPresa > 0) ? nuevaCantidadPresa : 0;
        cantidadCazador = (nuevaCantidadCazador > 0) ? nuevaCantidadCazador : 0;
    }

	
	limite = delimitadorDeArea(limite, 5);
	if($("#chksimpleplus").is(':checked')){
		var contarpresa = Math.ceil(arregloPuntosPresa[arregloPuntosPresa.length-1]);
    	var contarcazador = Math.ceil(arregloPuntosCazador[arregloPuntosCazador.length-1]);
		pintarconteo(contarpresa,contarcazador)
	}
	dibujarEnArea(arregloPuntosPresa, arregloPuntosCazador, limite, 5);

}

function pintarconteo(contarpresa,contarcazador){    

    // var contarpresa = arregloPuntosPresa[arregloPuntosPresa.length-1]
    // var contarcazador = arregloPuntosCazador[arregloPuntosCazador.length-1]
	areaConteo.clearRect(0, 0, canvasconteo.width, canvasconteo.height);

    for(var i = 0; i < contarpresa*10; i++){
		var ejex = Math.floor(Math.random() * 75)
		var ejey = Math.floor(Math.random() * 40)
		areaConteo.fillStyle = "#ff0000";
		areaConteo.fillText("C",10*ejex, 10*ejey);
    }
    for(var j = 0; j < contarcazador*10; j++)
    {
		var ejex = Math.floor(Math.random() * 75)
		var ejey = Math.floor(Math.random() * 40)
		areaConteo.fillStyle = "#336699";
		areaConteo.fillText("Z",10*ejex, 10*ejey);
    }
}

/**
 * Este metodo calcula las nuevas cantidades de presas segun las tasas
 * de mortalidad, natalidad y las cantidades que habian antes
 * -- bonito lo del parentesco de las formulas con respecto a cazador (ritmodeMuerte * presa * cazador)
 *
 * @param {integer} presa - cantidad de presas que existen
 * @param {integer} ritmodeCrecimiento - tasa de nacimiento de la presa
 * @param {integer} ritmodeMuerte - tasa de muerte de la presa
 * @param {integer} cazador - cantidad de cazadores que existen
 */
function calcularPuntosPresa(presa, ritmodeCrecimiento, ritmodeMuerte, cazador) {
    var variacion = ritmodeCrecimiento * presa - ritmodeMuerte * presa * cazador;
    return presa + variacion * pasoapaso;
}
/**
 * Este metodo calcula las nuevas cantidades de cazadores segun las tasas
 * de mortalidad, natalidad y las cantidades que habian antes
 * -- bonito lo del parentesco de las formulas con respecto a la presa (ritmodeCrecimiento * presa * cazador)

 * @param {integer} presa - cantidad de presas que existen
 * @param {integer} cazador - cantidad de cazadores que existen
 * @param {integer} ritmodeCrecimiento - tasa de nacimiento de la cazador
 * @param {integer} ritmodeMuerte - tasa de muerte de la cazador

 */
function calcularPuntosCazador(presa, cazador, ritmodeCrecimiento, ritmodeMuerte) {
    var variacion = ritmodeCrecimiento * presa * cazador - ritmodeMuerte * cazador;
    return cazador + variacion * pasoapaso;
}

/**
 * Este metodo permite actuzlizar la altura de la grafica con respecto a la altura del canvas
 * @param {integer} enestepaso - limite en esta generacion
 * @param {integer} limiteinicial - distancia a la cual se quiere mantener canvas y grafica
 */
function delimitadorDeArea(enestepaso, limiteinicial) {
	cantidad = 0;
	while (cantidad < enestepaso) {
		cantidad += limiteinicial;
	}
	return cantidad;
}
/**
 * Este metodo permite dibuja en el area asignada segun los limites
 * @param {Array} arregloPuntosPresa - todas las cantidades de la presa en el historico
 * @param {Array} arregloPuntosCazador - todas las cantidades de cazadores en el historico
 * @param {integer} limite - distancia a la cual se quiere mantener canvas y grafica
 * @param {incremento} incremento - aumento del limite del canvas para la proxima pintada
 */
function dibujarEnArea(arregloPuntosPresa, arregloPuntosCazador, limite, incremento) {
	// blanqueo el canvas
	areaDibujo.clearRect(0, 0, canvas.width, canvas.height);
	// alguien que me pintes los ejes antes 
	// de pintar la grafica
	dibujarEjes(limite);
	
	var puntosEnArea = arregloPuntosCazador.length / incremento;
	var espaciado = canvas.width / puntosEnArea;
	
	// 
	areaDibujo.lineWidth = 4;
	areaDibujo.strokeStyle = "#ff0000";
	areaDibujo.beginPath();
	// console.log(arregloPuntosPresa.length+"   "+arregloPuntosCazador.length)
	for (var i = 0; i < arregloPuntosPresa.length; i+= incremento) {
		var posicionX = espaciado * i / (incremento * 1.0);
		var posicionY = canvas.height - scale(arregloPuntosPresa[i], limite, canvas.height);
		if (i == 0) {
			areaDibujo.moveTo(posicionX, posicionY);
		}
		else {
			areaDibujo.lineTo(posicionX, posicionY);
		}
	}
	areaDibujo.stroke();
	
	
	areaDibujo.strokeStyle = "#336699";
	areaDibujo.lineWidth = 4;
	areaDibujo.beginPath();
	for (var i = 0; i < arregloPuntosCazador.length; i+= incremento) {
		var posicionX = espaciado * i / (incremento * 1.0);
		var posicionY = canvas.height - scale(arregloPuntosCazador[i], limite, canvas.height);
		
		if (i == 0) {
			areaDibujo.moveTo(posicionX, posicionY);
		}
		else {
			areaDibujo.lineTo(posicionX, posicionY);
		}
	}
	areaDibujo.stroke();

}
/**
 * Este metodo permite dibujar en el area asignada los ejes segun el limite
 * @param {integer} limite - distancia a la cual se quiere mantener canvas y grafica
 */
function dibujarEjes(limite) {

	var cantidadDeLineas = limite / 5;
	var espaciado = canvas.height / (cantidadDeLineas * 1.0);
		
	areaDibujo.strokeStyle = '#aaaaaa';
	areaDibujo.fillStyle = '#aaaaaa';
	areaDibujo.lineWidth = .5;
	areaDibujo.beginPath();
	for (var i = 0; i < cantidadDeLineas; i++) {
		areaDibujo.fillText(limite - (i * 5) + "", 5, i * espaciado + 10); 
		areaDibujo.moveTo(0, i * espaciado);
		areaDibujo.lineTo(canvas.width, i * espaciado);
	}
	areaDibujo.stroke();
	
	
	// areaDibujo.strokeStyle = '#000000';
	// areaDibujo.lineWidth = 4;
	// areaDibujo.beginPath();
	// areaDibujo.moveTo(0, 0);
	// areaDibujo.lineTo(0, canvas.height);
	// areaDibujo.lineTo(canvas.width, canvas.height);
	// areaDibujo.stroke();
}
/**
 * Este metodo permite darle escala a los tick del eje y
 * @param {integer} cantidadInicial - inicial
 * @param {integer} valormaximo - El maximo valor de la escala
 * @param {integer} alturaDelArea - Altura donde se van a pintar
 */
function scale(cantidadInicial, valormaximo, alturaDelArea) {
	return (alturaDelArea * 1.0) * (cantidadInicial / valormaximo);
}

// variables globales javascript
var pasoapaso = .01;
var canvas,canvasreticula,canvasconteo;
var areaReticula,areaConteo;
var canvasreticula;
var areaDibujo,areaReticula;
