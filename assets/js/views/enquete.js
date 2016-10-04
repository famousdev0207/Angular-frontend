/**
 * Created by paulo.roberto on 19/05/2015.
 */
function ajaxEscola(ci_escola){
    $.ajax({
        type: "POST",
        url: "partials/getConselho.php",
        dataType: "json",
        data: {id: ci_escola},
        success: function(json){
            $("#cd_conselho").val(json.ci_conselho);
        },
        erro: function(erro){
            alert(erro);
        }
    });
}

$(function(){
    $(".nm_esp").hide();
    $("#opcao76_p").hide();
    $("#opcao85_p").hide();
    $(".sendfile,.sendfile11").hide();

    $(":file").filestyle({buttonText: "Anexar"});

    var opcao2 = $("input:radio[name=opcao2]:checked").val();
    if( opcao2 == 1)
        $(".sendfile").show('slow');

    var opcao1 = $("#opcao1").val();
    if( opcao1 == 3)
        $(".nm_esp").show('slow');

    var opcao11 = $("input:radio[name=opcao11]:checked").val();
    if( opcao11 == 1)
        $(".sendfile11").show('slow');


    var opcao76 = $("#opcao76").is(':checked');
    if( opcao76 )
        $("#opcao76_p").show('slow');

    var opcao85 = $("#opcao85").is(':checked');
    if( opcao85 )
        $("#opcao85_p").show('slow');

    $( "#down_file, #down_file_11" ).button({
        icons: { primary: "ui-icon-arrowthickstop-1-s" },
        text: false
    });

    $( "#excluir_file, #excluir_file_11" ).button({
        icons: { primary: "ui-icon-trash" },
        text: false
    }).click(function(){
        var ci_file = (($("#ci_file_2").val()) ? $("#ci_file_2").val() : $("#ci_file_11").val());
        $.ajax({
            url:"partials/setDel.php",
            type:"POST",
            data: {ci_file: ci_file},
            success: function(data){
                if(data == true){
                    location.reload();
                }else{
                    $.gritter.add({
                        title: 'Histórico',
                        text: 'Erro excluído com sucesso!',
                        image: 'assets/css/gritter/growl_error.png'
                    });
                }
            },
            error: function(data){
                $.gritter.add({
                    title: 'Histórico',
                    text: 'Erro excluído com sucesso!',
                    image: 'assets/css/gritter/growl_error.png'
                });
            }
        });
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

    $("#formInsertEdit").find("input,select,textarea").each(function(index){
        $(this).removeClass("ui-state-error");
    });

    var opcao1 = $("#opcao1").val();
    var opcao1_p = $("#opcao1_p").val();
    var opcao2 = $("input[name=opcao2]").is(':checked');
    var opcao3 = $("#opcao3").val();
    var opcao41 = $("input[name=opcao41]").is(':checked');
    var opcao42 = $("input[name=opcao42]").is(':checked');
    var opcao43 = $("input[name=opcao43]").is(':checked');
    var opcao44 = $("input[name=opcao44]").is(':checked');
    var opcao45 = $("input[name=opcao45]").is(':checked');
    var opcao46 = $("input[name=opcao46]").is(':checked');
    var opcao5 = $("input[name=opcao5]").is(':checked');
    var opcao61 = $("#opcao61").val();
    var opcao62 = $("#opcao62").val();
    var opcao63 = $("#opcao63").val();
    var opcao64 = $("#opcao64").val();
    var opcao65 = $("#opcao65").val();
    var opcao66 = $("#opcao66").val();
    var opcao67 = $("#opcao67").val();
    var opcao68 = $("#opcao68").val();
    var opcao69 = $("#opcao69").val();
    var opcao610 = $("#opcao610").val();
    var opcao611 = $("#opcao611").val();
    var opcao612 = $("#opcao612").val();
    var opcao7 = $(".opcao7").is(':checked');
    var opcao8 = $("input[name=opcao8]").is(':checked');
    var opcao85 = $("#opcao85").val();
    var opcao85_p = $("#opcao85_p").val();
    var opcao9 = $("input[name=opcao9]").is(':checked');
    var opcao10 = $("#opcao10").val();
    var opcao11 = $("input[name=opcao11]").is(':checked');
    var nr_filePl = $("input[name=nr_filePl]").val();

    if(opcao1 == 0) {
        $("#opcao1").addClass('ui-state-error');
        addError("<strong>Questão 1.</strong> Selecione um critério para seleção dos membros.");
        valid = false;
    }
    if(opcao1==3){
        if(opcao1_p == 0 || opcao1_p == ""){
            $("#opcao1_p").addClass('ui-state-error');
            addError("<strong>Questão 1.</strong> Especifique qual o critério para a escolha dos membros.");
            valid = false;
        }
    }

    if(!opcao2){
        $("input[name=opcao2]").addClass('ui-state-error');
        addError("<strong>Questão 2.</strong> Indique se há regimento interno no conselho.");
        valid = false;
    }
    if(opcao3 == 0){
        $("#opcao3").addClass('ui-state-error');
        addError("<strong>Questão 3.</strong> Selecione a frequência da reunião do conselho.");
        valid = false;
    }
    if(!opcao41){
        $("#opcao41_s").addClass('ui-state-error');
        addError("<strong>Questão 4.1.</strong> Indique se há cronograma prévio!");
        valid = false;
    }
    if(!opcao42){
        $("#opcao42_s").addClass('ui-state-error');
        addError("<strong>Questão 4.2.</strong> Indique sobre a antecedência prévia de convocação de reuniões!");
        valid = false;
    }
    if(!opcao43){
        $("#opcao43_s").addClass('ui-state-error');
        addError("<strong>Questão 4.3.</strong> Indique sobre a realização prévia de pautas!");
        valid = false;
    }
    if(!opcao44){
        $("#opcao44_s").addClass('ui-state-error');
        addError("<strong>Questão 4.4.</strong> Indique sobre a liberdade de expressão nas reuniões do conselho!");
        valid = false;
    }
    if(!opcao45){
        $("#opcao45_s").addClass('ui-state-error');
        addError("<strong>Questão 4.5.</strong> Indique se há a publicações de decisões do conselho!");
        valid = false;
    }
    if(!opcao46){
        $("#opcao46_s").addClass('ui-state-error');
        addError("<strong>Questão 4.6.</strong> Indique se há o registro em livros das reuniões do conselho!");
        valid = false;
    }
    if(!opcao5){
        $("#opcao5").addClass('ui-state-error');
        addError("<strong>Questão 5.</strong> Informe se o Conselho é Unidade Executora da Escola!");
        valid = false;
    }
    if(opcao61 == 0){
        $("#opcao61").addClass('ui-state-error');
        addError("<strong>Questão 6.1.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao62 == 0){
        $("#opcao62").addClass('ui-state-error');
        addError("<strong>Questão 6.2.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao63 == 0){
        $("#opcao63").addClass('ui-state-error');
        addError("<strong>Questão 6.3.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao64 == 0){
        $("#opcao64").addClass('ui-state-error');
        addError("<strong>Questão 6.4.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao65 == 0){
        $("#opcao65").addClass('ui-state-error');
        addError("<strong>Questão 6.5.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao66 == 0){
        $("#opcao66").addClass('ui-state-error');
        addError("<strong>Questão 6.6.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao67 == 0){
        $("#opcao67").addClass('ui-state-error');
        addError("<strong>Questão 6.7.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao68 == 0){
        $("#opcao68").addClass("ui-state-error").focus();
        addError("<strong>Questão 6.8.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao69 == 0){
        $("#opcao69").addClass("ui-state-error").focus();
        addError("<strong>Questão 6.9.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao610 == 0){
        $("#opcao610").addClass("ui-state-error").focus();
        addError("<strong>Questão 6.10.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false
    }
    if(opcao611 == 0){
        $("#opcao611").addClass("ui-state-error").focus();
        addError("<strong>Questão 6.11.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(opcao612 == 0){
        $("#opcao612").addClass('ui-state-error');
        addError("<strong>Questão 6.12.</strong> É obrigatório atribuir nota de 0 a 5 para todos os subitens desta questão!");
        valid = false;
    }
    if(!opcao7){
        $(".opcao7").addClass("ui-state-error").focus();
        addError("<strong>Questão 7.</strong> Selecione pelo menos 1 item referente a mobilização do seus segmentos.");
        valid = false;
    }
    if($("#opcao76").is(":checked") && $("#opcao76_p").val() == ""){
        $("#opcao76").addClass('ui-state-error');
        addError("<strong>Questão 7.</strong> Informe outros motivos de mobilização de segmentos!");
        valid = false;
    }
    if(!opcao8){
        $("input[name=opcao8]").addClass("ui-state-error").focus();
        addError("<strong>Questão 8.</strong> Informe a periodicidade de avaliação dos trabalhos do Conselho!");
        valid = false;
    }
    if($("#opcao85").is(":checked")){
        if(opcao85_p == ""){
            $("#opcao85_p").addClass("ui-state-error").focus();
            addError("<strong>Questão 8.</strong> Informe outros motivos para periodicidade de avaliação dos trabalhos do Conselho!");
            valid = false;
        }else{
            valid= true;
        }
    }
    if(!$("input:radio[name=opcao9]").is(":checked")){
        $("#opcao9").addClass('ui-state-error');
        addError("<strong>Questão 9.</strong> Informe sobre a participação dos conselheiros em Atividades de Formação!");
        valid = false;
    }
    if(opcao10 == 0){
        $("#opcao10").addClass('ui-state-error');
        addError("<strong>Questão 10.</strong> Escolha uma das opções abaixo!");
        valid = false;
    }
    if(!opcao11){
        $("#opcao11").addClass('ui-state-error');
        addError("<strong>Questão 11.</strong> Informe sobre a existência (ou não) de plano de formação continuada dos conselheiros!");
        valid = false;
    }
    if($('input:radio[name=opcao11]:checked').val() == 1){
        if(nr_filePl == ""){
            $("input:radio[name=opcao11]").addClass('ui-state-error');
            addError("<strong>Questão 11.</strong> Anexar plano de formação.");
            valid = false;
        }
    }

    if(!valid) {
        errorMessage = '';
        messages.forEach(function(entry) {
            errorMessage += entry+';<br/>';
        });

        growAlert(" Alerta", errorMessage, "warning", "exclamation-triangle", 9000);
    }

    return valid;
}

//Esconder enviar email
$("#opcao2_s").click(function(){
    $(".sendfile").show('slow');
});
$("#opcao2_n").click(function(){
    $(".sendfile").hide('slow');
});

$("#opcao11_s").click(function(){
    $(".sendfile11").show('slow');
});
$("#opcao11_n").click(function(){
    $(".sendfile11").hide('slow');
});

$("#opcao76").click(function(){
    var bool = $(this).is(":checked");
    if(bool){
        $("#opcao76_p").show('slow');
    }else{
        $("#opcao76_p").hide('slow');
    }
});
$("#opcao81,#opcao82,#opcao83,#opcao84").click(function(){
    var bool = $(this).is(":checked");
    if(bool)
        $("#opcao85_p").hide('slow');

});
$("#opcao85").click(function(){
    var bool = $(this).is(":checked");
    if(bool)
        $("#opcao85_p").show('slow');

});

$("#opcao1").change(function(){
    if($(this).val() == 3){
        $(".nm_esp").show('slow');
    }else{
        $(".nm_esp").hide('slow');
    }
});