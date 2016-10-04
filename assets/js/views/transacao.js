$(function(){
	$("#nmTransacao").keyup(function(){
		$(this).val($(this).val().toUpperCase());
	    var varString = $(this).val();
	    var stringAcentos = ('àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ');
	    var stringSemAcento = ('aaeouaoaeioucuAAEOUAOAEIOUCU');
	    
	    var i = new Number();
	    var j = new Number();
	    var cString = new String();
	    var varRes = '';
	    
	    for (i = 0; i < varString.length; i++) {
	        cString = varString.substring(i, i + 1);
	        for (j = 0; j < stringAcentos.length; j++) {
	            if (stringAcentos.substring(j, j + 1) == cString){
	                cString = stringSemAcento.substring(j, j + 1);
	            }
	        }
	        varRes += cString;        
	    }
	    varRes = varRes.replace( /\s/g, '_');
	    $("#nmlabel").val(varRes.toLowerCase());
	});
});


function addError(message){
	if(message!=undefined && messages.indexOf(message)==-1) {
		messages.push(message);
	}
}

function test(){	
	messages = [];
	var valid = true;
	var nm_transacao = $("#nmTransacao");
	var nm_label = $("#nmlabel");

	$("#formInsertEdit").find("input,select,textarea").each(function(index){
		$(this).parent().removeClass("ui-state-error");
	});

	if (nm_transacao.val().trim() == '') {
		nm_transacao.addClass('ui-state-error');
		addError("O Campo <strong>Transação</strong> está vazio");
		valid = false;
	}else if(checkCaracteresEspecial(nm_transacao, /[!@#$%¨&*`_+={}]/) != -1){
		nm_transacao.addClass('ui-state-error');
		addError("Campo <strong>Transação</strong> : Caracteres invalidos!");
		valid = false;
	}
	
    if(nm_label.val().trim() == ''){
		nm_label.addClass('ui-state-error');
		addError("O Campo <strong>Label</strong> está vazio");
		valid = false;
	}else if(checkCaracteresEspecial(nm_label, /[!@#$%¨&*`+={}]/) != -1){
		nm_label.addClass('ui-state-error');
		addError("Campo <strong>Label</strong> : Caracteres invalidos!");
		valid = false;
	}
    
    if(!valid) {
		errorMessage = '';
		messages.forEach(function(entry) {
			errorMessage += entry+';<br/>';
		    console.log(entry);
		});
		
		growAlert(" Alerta", errorMessage, "warning", "exclamation-triangle", 5000);
	}
    
	return valid;	
}