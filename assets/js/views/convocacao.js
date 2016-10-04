/**
 * Created by paulo.roberto on 29/05/2015.
 */
function addError(message){
    if(message!=undefined && messages.indexOf(message)==-1) {
        messages.push(message);
    }
}

function test(){
    var valid = true;
    $("#form-enviar").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });

    if($(".btCheck:checked").length == 0){
        updateTips($(".btCheck"), 'Selecione pelo um membro para envio do email de convocação.');
        valid = false;
    }

    return valid;
}

function test_enviar(){
    messages = [];
    var valid = true;
    var assunto = $("#ds_assunto");
    var dataReuniao = $("#dt_reuniao");
    var mensagem = $("#ds_mensagem");

    $("#formInsertEdit").find("input,select,textarea").each(function(index){
        $(this).removeClass("ui-state-error");
    });

    if(assunto.val() == "") {
        assunto.addClass('ui-state-error');
        addError("O campo <strong>Assunto </strong> não pode está vazio");
        valid = false;
    }

    if(dataReuniao.val() == "") {
        dataReuniao.addClass('ui-state-error');
        addError("O campo <strong>Data da Reunião </strong> não pode está vazio");
        valid = false;
    }

    if(mensagem.val().trim() == "") {
        mensagem.addClass('ui-state-error');
        addError("O campo <strong>Mensagem </strong> não pode está vazio");
        valid = false;
    }

    if(!valid) {
        errorMessage = '';
        messages.forEach(function(entry) {
            errorMessage += entry+'.<br/>';
        });

        growAlert(" Alerta", errorMessage, "warning", "exclamation-triangle", 9000);
    }else{
        waitingDialog.show('Aguarde enviando email', {dialogSize: 'sm', progressType: 'success'});
    }
    return valid;
}

$(function(){
    var dataReuniao = $('#dt_reuniao');
    if(dataReuniao.length) {
        var data = new Date().getTime();
        var dataAgora = 4 * (1000 * 60 * 60 * 24);
        dataAgora = new Date(dataAgora + data);
        dataReuniao.datetimepicker({pickTime: false, language: 'pt-br'}).data("DateTimePicker").setMinDate(dataAgora);
    }
});