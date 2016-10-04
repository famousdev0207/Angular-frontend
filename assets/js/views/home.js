/**
 * Created by luiz.alberto on 16/03/2015.
 */
function modalPass(){
    var $form = $('#formRecupSenha');
    var options = {
        'title': 'Recuperação de senha',
        'size':'md',
        'execute':submeter,
        'params':$form
    }
    $form.ShowAsModal(options).show();
}

function submeter(form){
    form.submit();
}