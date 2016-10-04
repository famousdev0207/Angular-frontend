var formValid = true;
var percentagem;
var errorMessage='';
var messages = [];

function addError(message){
	if(message!=undefined && messages.indexOf(message)==-1) {
		messages.push(message);
	}
}

$(document).ready(function(){
	$('#nm_nova_senha').pStrength({
	    'bind': 'keyup change',
	    'changeBackground': false,
	    'passwordValidFrom': 60, // 60%
	    'onValidatePassword': function(percentage) { },
	    'onPasswordStrengthChanged' : function(passwordStrength, percentage) {
		    percentagem = percentage; 
		    $('.pass-force').text(percentage+'%');
		    $('.progress-bar').css('width', percentage+'%');
		    if(percentage > 50){
		    	$('.progress-bar').removeClass().addClass('progress-bar progress-bar-striped active progress-bar-success'); 
		    }else if(percentage > 40){
		    	$('.progress-bar').removeClass().addClass('progress-bar progress-bar-striped active progress-bar-warning');
		    }else if(percentage < 40){
		    	$('.progress-bar').removeClass().addClass('progress-bar progress-bar-striped active progress-bar-danger');
		    }
		}
	});
	$('#nm_nova_senha').keyup(validatePass);
	$('#nm_repetir_senha').keyup(validatePass);
});

function validatePass(){
	if($(this).val()==''){
		$('#pass-tip').text('Digite uma senha').show();
		formValid = false;
	}else if($(this).val().length<6){
		$('#pass-tip').text('Digite pelo menos 6 caracteres!').show();
		formValid = false;
	}else if($('#nm_repetir_senha').val() == $('#nm_nova_senha').val()){
		$('#pass-tip').hide();
	}else{
		$('#pass-tip').text('As senhas não estão iguais!').show();
		formValid = false;
	}
}

function submitForm(){
	if(validadeForm()) $('#formInsertEdit').submit();
}


function validadeForm(){
	messages = [];
	var nm_usuario = $("#nm_usuario").val();
	var nm_senha_atual = $("#nm_senha_atual").val();
	var nm_nova_senha = $("#nm_nova_senha").val();
	var nm_repetir_senha = $("#nm_repetir_senha").val();
	formValid = true;
	if (nm_usuario == '') {
		addError("O Campo <strong>Usuario</strong> está vazio");
		formValid = false;
	}if(nm_senha_atual == ''){
		addError("O Campo <strong>Senha Atual</strong> está vazio");
		formValid = false;
	}if(nm_nova_senha == ''){
		addError("O Campo <strong>Nova Senha</strong> está vazio");
		formValid = false;
	}if(nm_repetir_senha == ''){
		errorMessage = '';
		addError("O Campo <strong>Repetir Senha</strong> está vazio");
		formValid = false;
	}if(percentagem < parseInt(50)){
    	addError("A senha deve possuir uma força mínima de 50%");
    	formValid = false;
	}
	if(nm_nova_senha != nm_repetir_senha){
    	addError("A senha digitada no campo <strong>Repetir Senha</strong> nao confere");
    	formValid = false;
	}
	if(!formValid) {
		errorMessage = '';
		messages.forEach(function(entry) {
			errorMessage += entry+';<br/>';
		    console.log(entry);
		});
		console.log(errorMessage);
		growAlert("Alerta", errorMessage, "danger", "ban", 5000);
	}
	return formValid;	
	
}