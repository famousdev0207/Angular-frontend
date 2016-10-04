/**
 * Created by Paulo Roberto on 26/04/2016.
 */
$(function () {
    $("#nm_cpf, #search2").mask("999.999.999-99");
    $("#nr_cep").mask("99.999-999");
    $("#nr_telefone_residencial").mask("(99)9999-9999");
    $("#nr_telefone_celular").mask("(99)99999-9999");
    $("#dt_nascimento").mask("99/99/9999");

    $("#datepicker_nasc").datetimepicker({
        pickTime: false,
        language: 'pt-br'
    });

    $('#loading').hide();
});

$("#nr_cep").blur(function () {
    var cep = $(this).val();
    var url = $("#url_partial").val();
    var cep = cep.replace(/[\.-]/g, "");
    if (cep) {
        $("#loading").show();
    }
    $.ajax({
        url: url+"/partials/get_cep",
        type: "POST",
        data: {nr_cep: cep},
        dataType: "json",
        success: function (json) {
            $("#loading").hide();
            $('#ds_logradouro').val(json.ds_logradouro);
            $('#ds_bairro').val(json.ds_bairro);
            $('#cd_localidade').val(json.ci_localidade);
            $('#cd_estado').val(json.sg_estado);
        }
    });

});

$("#cd_estado").change(function () {
    limpaCamposCEP();
    var cd_estado = $(this).val();
    var url = $("#url_partial").val();
    var option = "<option value='0'>SELECIONE</option>"
    $("#cd_localidade option").remove();

    $.ajax({
        url: url+"/partials/localizacao_box",
        type: "POST",
        data: {cd_estado: cd_estado},
        dataType: "json",
        success: function (json) {
            $.each(json, function (index, value) {
                option += "<option value='"+value.ci_localidade+"'>"+value.ds_localidade+"</option>"
            });
            $("#cd_localidade").append(option);
        }
    });
});


function limpaCamposCEP() {
    $('#ds_logradouro').val('');
    $('#nr_numero').val('');
    $('#ds_complemento').val('');
    $('#nr_cep').val('');
    $('#ds_bairro').val('');
    //$('#cd_estado').val('CE');
    $('#cd_localidade').val(1347);
}
function atualizaBoxLocalidade() {

}

