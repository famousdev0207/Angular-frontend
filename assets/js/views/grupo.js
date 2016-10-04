/**
 * Created by paulo.roberto on 14/05/2015.
 */
$(function(){
    $(".selectpicker").selectpicker('refresh');
    $.dragONDrop();
    $("#nm_grupo").upper();
});

function test() {
    var valid = true;
    $("#formInsertEdit").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });

    var nm_grupo = $("#nm_grupo");

    if(nm_grupo.val().trim() == ''){
        updateTips(nm_grupo, 'O Campo grupo está vázio');
        valid = false;
    }else if(checkCaracteresEspecial(nm_grupo, /[!@#$%¨&*`_+={}]/) != -1){
        updateTips(nm_grupo, 'Caracteres Inválido');
        valid = false;
    }else if($('#fl_nivel_acesso option:selected').val() == 0){
        updateTips($('#fl_nivel_acesso'), 'Selecione corretamente um Nível de Acesso.');
        valid = false;
    }else{
        valid = valid && checkLength('nm_grupo', 'Grupo', 2);
    }

    return valid;
}