$( document ).ready(function() {

	$("#btnpredatorsmin").click(function(){
		//capturo el valor que hay en el input
		val = parseInt($("#numPredators").val())-1;
		console.log(val)
		if(val > 0){
			//modifico el valor
			$("#numPredators").val(val);
		}
	});
	$("#btnpreymin").click(function(){
		//capturo el valor que hay en el input
		val=parseInt($("#numPrey").val())-1;
		if(val > 0){
			//modifico el valor
			$("#numPrey").val(val);
		}

	});

	// ######################

	$("#btnpredatorsplus").click(function(){
		//capturo el valor que hay en el input
		val=parseInt($("#numPredators").val())+1;
		//modifico el valor
		$("#numPredators").val(val);
	});

	$("#btnpreyplus").click(function(){
		//capturo el valor que hay en el input
		val=parseInt($("#numPrey").val())+1;
		//modifico el valor
		$("#numPrey").val(val);
	});

	// ######################

	$("#rategrowthmin").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepredatorgrowth").val())-0.01;
		console.log(val)
		if(val > 0){
			//modifico el valor
			$("#ratepredatorgrowth").val(val.toFixed(2));
		}

	});
	$("#rategrowthplus").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepredatorgrowth").val())+0.01;
		//modifico el valor
		$("#ratepredatorgrowth").val(val.toFixed(2));
	});

	$("#ratedeathmin").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepredatordeath").val())-0.01;
		if(val > 0){
			//modifico el valor
			$("#ratepredatordeath").val(val.toFixed(2));
		}

	});
	$("#ratedeathplus").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepredatordeath").val())+0.01;
		//modifico el valor
		$("#ratepredatordeath").val(val.toFixed(2));
	});

	// ##

	$("#ratepreygrowthmin").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepreygrowth").val())-0.01;
		if(val > 0){
			//modifico el valor
			$("#ratepreygrowth").val(val.toFixed(2));
		}

	});
	$("#ratepreygrowthplus").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepreygrowth").val())+0.01;
		//modifico el valor
		$("#ratepreygrowth").val(val.toFixed(2));
	});
	$("#ratepreydeathmin").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepreydeath").val())-0.01;
		if(val > 0){
			//modifico el valor
			$("#ratepreydeath").val(val.toFixed(2));
		}

	});
	$("#ratepreydeathplus").click(function(){
		//capturo el valor que hay en el input
		val=parseFloat($("#ratepreydeath").val())+0.01;
		//modifico el valor
		$("#ratepreydeath").val(val.toFixed(2));
	});





});