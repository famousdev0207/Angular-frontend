/**
 * Created by Paulo Roberto on 28/04/2016.
 */
$(function () {
    $(".vlr").css("text-align","right");
    $(".loadingTable").hide();
})

function limparCampos(campo){
    campo.value = "";
}

function restauraValor(campo,valor,cid,idItem) {
    if(campo.value == valor || campo.value == ""){
        var valorNew = $("#vlrNew"+idItem).val();
        if(valorNew != ""){
            campo.value = valorNew;
        }else{
            campo.value = valor;
        }
    }else{
        $("#loadingTable"+idItem).show();
        salvar(campo.value,cid,idItem);
    }
}
function salvar(valor,cid,idItem) {
    $.ajax({
        type:"post",
        url:$("#url").val()+"/save",
        data:{valor: valor, cid:cid, idItem:idItem},
        dataType:"json",
        success: function(json){
            if(json.result){
                $("#loadingTable"+idItem).hide();
                $("#vlrNew"+idItem).val(valor);
            }
        },
        error: function (json) {
            growAlert(" Alerta","Erro!", "danger", "exclamation-triangle", 8000);
        }
    });
}