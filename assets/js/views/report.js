/**
 * Created by paulo.roberto on 27/05/2015.
 */
$(function(){
    var url = $("#url_").val();
    if(url != ""){
        setTimeout(function () {
            window.location.href = url;
        }, 100);
    }
});
