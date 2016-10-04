/**
 * Created by paulo.roberto on 02/06/2015.
 */
$(".btn_upload").click(function(){
    var obj = $(this)
    var id = obj.data('id');
    var url = obj.data('url');
    var assunto = obj.data('assunto').toUpperCase();
    var date = obj.data('date');
    var modal = $('#modalUpload');
    modal.find('form').attr('action',url);
    modal.find('.modal-title').text(assunto+" - DATA: "+date);
    modal.modal();
});

$(function(){
    $(":file").filestyle({buttonText: "Anexar"});
});
