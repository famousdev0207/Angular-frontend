/**
 * Created by paulo.roberto on 11/05/2015.
 */

function test(){
    $('select[name="cd_grupo_select[]"] > option').prop('selected', 'selected');
    var valid = true;
    var nm_usuario = $("#nm_usuario");
    var nm_login = $("#nm_login");

    $("#formInsertEdit").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });

    if($('#nm_unidade_trabalho').val().length == 0 || $('#nm_unidade_trabalho_id').val() == 0){
        valid = false;
        updateTips($('#nm_unidade_trabalho'),'Selecione corretamente uma Unidade de Trabalho.', 9000);
    }else if(nm_usuario.val().trim() == ''){
        updateTips(nm_usuario, 'O Campo usuário está vázio', 9000);
        valid = false;
    }else if(checkCaracteresEspecial(nm_usuario, /[!@#$%¨&*`_+={}]/) != -1){
        updateTips(nm_usuario, 'Caracteres Inválido', 9000);
        valid = false;
    }else if(nm_login.val().trim() == ''){
        updateTips(nm_login, 'O Campo login está vázio', 9000);
        valid = false;
    }else if(checkCaracteresEspecial(nm_login, /[!@#$%¨&*`_+={}]/) != -1){
        updateTips(nm_login, 'Caracteres Inválido', 9000);
        valid = false;
    }else if(!checkCpf($('#nm_cpf').val())){
        valid = false;
        updateTips($('#nm_cpf'), 'CPF inválido.', 9000);
    }else if(!checkMail($('#ds_email').val())){
        valid = false;
        updateTips($('#ds_email'), 'Email inválido.', 9000);
    }else if(!checkData($('#dt_nascimento').val())){
        valid = false;
        updateTips($('#dt_nascimento'), 'Data de Nascimento inválida.', 9000);
    }else{
        valid = checkLength('nm_usuario', 'Nome Completo', 3) && valid;
        valid = checkLength('nm_login', 'Login', 3) && valid;
    }

    return valid;
}


var dados;
$('#nm_unidade_trabalho').typeahead({
    source: function (query, process) {
        unidades = [];
        map = {};
        $.get(
            $("#url").val(),
            {'term':$('#nm_unidade_trabalho').val()},
            function(data){
                dados = data[0];
                $.each(data, function (i, unidade) {
                    map[unidade.label] = unidade;
                    unidades.push(unidade.label);
                });
                process(unidades);
            },'json'
        );
    },
    updater: function (item) {
        console.log(map[item]);
        selectedId = map[item].id;
        SelectedInep = map[item].inep;
        $('#cod_unid').text(SelectedInep);
        $('#nm_unidade_trabalho_id').val(selectedId);
        $('#unidade-trab').find('input:eq(0)').prop('disabled', true);
        $('#edit-unidade').prop('disabled', false);
        return item;
    }
});

$('#edit-unidade').click(function(){
    var unid = $('#nm_unidade_trabalho[disabled]');
    if(unid.length > 0){
        $('#cod_unid').text("");
        $('#nm_unidade_trabalho_id').val("");
        $('#nm_unidade_trabalho').val("");
        $('#unidade-trab').find('input:eq(0)').prop('disabled', false);
        $('#edit-unidade').prop('disabled', true);
    }
});


$.fn.selectPicker = function(params){
    var component = $(this);
    var firstSelect = component.find('select:eq(0)');
    var fromOptions = firstSelect.find('option');
    var secondSelect = component.find('select:eq(1)');
    var toOptions = secondSelect.find('option');

    var addOne = component.find('button:eq(0)');
    var addAll = component.find('button:eq(1)');
    var removeOne = component.find('button:eq(2)');
    var removeAll = component.find('button:eq(3)');

    $('.buttons').find('button').css('width', '40px');

    addOne.click(function(){
        var selecionados = firstSelect.find('option:selected');
        selecionados.each(function() {
            secondSelect.append($(this));
            $(this).attr("selected", false);
        });
        //ordena(secondSelect);
    });

    addAll.click(function(){
        fromOptions = firstSelect.find('option');
        fromOptions.each(function() {
            secondSelect.append($(this));
            $(this).attr("selected", false);
        });
        firstSelect.html('');
        //ordena(secondSelect);
    });

    removeOne.click(function(){
        var selecionados = secondSelect.find('option:selected');
        selecionados.each(function() {
            firstSelect.append($(this));
            $(this).attr("selected", false);
        });
        //ordena(firstSelect);
    });

    removeAll.click(function(){
        toOptions = secondSelect.find('option');
        toOptions.each(function() {
            firstSelect.append($(this));
            $(this).attr("selected", false);
        });
        //ordena(firstSelect);
    });

    //Verifica se o elemento ja existe na lista passada
    function jaExiste(elemento, listaPara){
        var retorno = false;
        $(listaPara).each(function(){
            if(elemento.val() == $(this).val()){
                retorno = true;
            }
        });
        return retorno;
    }

    //Ordena os options de um select
    function ordena(elemento){
        var options = elemento.find('option');
        var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
        arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
        options.each(function(i, o) {
            o.value = arr[i].v;
            $(o).text(arr[i].t);
        });
    }
};

$(function(){
    $(".selectPicker").selectPicker();
    $('.datetimepicker').datetimepicker({pickTime:false,language:'pt-br'});
    $("#nm_unidade_trabalho, #nm_usuario").upper();
});