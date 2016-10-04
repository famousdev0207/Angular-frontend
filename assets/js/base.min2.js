/**
 * Created by luiz.alberto on 11/11/2014.
 */

function slideToTag($tag){
    $('html,body').stop().animate({scrollTop: $tag.offset().top-50}, 500);
}

/*$('[data-toggle="popover"]').popover();
$('[data-toggle="tooltip"]').tooltip();
$('.selectpicker').selectpicker('render');*/
/*t_message != ''){
    var timer = $('alerta').data('timer'); //500
    setTimeout(function(){
        $('alerta').hide();
    }, timer);
}*/

var $submenu = $('.submenu');
window.onscroll = function(){
    if(window.pageYOffset>100){
        $submenu.stop().animate({top: (window.pageYOffset-100)+"px"}, 500);
    }else{
        $submenu.stop().animate({top: (0)+"px"}, 500);
    }
};

$(window).resize(adjustLayout);
adjustLayout();



function adjustLayout(){
    var nav = $('.navbar');
    var con = $('#content');
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        if (scroll > 100) {
            nav.addClass("nav-fixed");
            con.addClass("adjust");
        } else {
            nav.removeClass("nav-fixed");
            con.removeClass("adjust");
        }
    });

    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight){
        $('#footer').addClass('footer-fixed');
    }else{
        $('#footer').removeClass('footer-fixed');
    }
}

function createWaitModal(){
    var waitModal = $('<div class="modal static" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4>Aguarde...</h4></div><div class="modal-body"><div class="progress progress-striped active"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Carregando...</div></div></div></div></div></div>');
    var dialogEx = $.extend(waitModal, {
        show: function() { waitModal.modal({ backdrop: 'static', keyboard: false }); },
        hide: function(){ waitModal.modal('hide'); }
    });
    return dialogEx;
}

function logout(url){
    var logoutModal = createModal({size:'sm', execute:function(){
        window.location.href = url;
    }});
    logoutModal.setTitle('<i class="fa fa-question-circle"></i> Confirmação');
    logoutModal.setMessage('Deseja realmente sair?');
    logoutModal.show();
}

function createModal(obj){
    var dialog  = $('<div class="modal fade" id="modalComponent" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title text-success"></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-success btn-sim"><span class="glyphicon glyphicon-ok-circle"></span> <span class="confirm_button">Sim</span></button><button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove-circle"></span> <span class="negative_button">Não</span></button></div></div></div></div>').appendTo('body');
    dialog.find('.modal-dialog').addClass("modal-"+obj.size);
    dialog.addClass("bs-example-modal-"+obj.size);

    var dialogEx = $.extend(dialog, {
        setTitle: function(title) { dialog.find('.modal-title').html(title); return dialog;},
        setMessage: function(message) { dialog.find('.modal-body').text(message); return dialog;},
        setContent: function(content) {
            dialog.find('.modal-body').html(content);
            return dialog;
        },
        setConfirmText: function(text) { dialog.find('.confirm_button').text(text); return dialog;},
        setNegativeText: function(text) { dialog.find('.negative_button').text(text); return dialog;},
        hideConfirmButton: function(hide) { dialog.find('.btn-sim').hide(); return dialog;},

        show: function() { dialog.modal('show'); return dialog;},
        hide: function(){ dialog.modal('hide'); return dialog;}
    });
    
    dialog.find('.btn-sim').click(function(){obj.execute(obj.params);});
    return dialogEx;
};

$.fn.ShowAsModal = function(obj){
	var component = $(this);
	var modal = createModal(obj);
	modal.setContent(component);
	modal.setTitle(obj.title);
	component.removeClass('hidden').show();
	return modal;
};

/**
 *
 * @param string title
 * @param string text   The message to show in alert
 * @param string type   Example: 'info', 'warning', 'danger'.
 * @param string icon   Example: 'trash', 'pencil', 'exclamation-triangle', ...
 * @param number timer  The duration time to show the alert
 */
function growAlert(title, text, type, icon, timer){
	if(title =='') title = "Alerta:";
	var template = $('<div class="alert alert-'+type+'" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><i class="fa fa-'+icon+' fa-lg"></i> <strong>'+title+'</strong><br/> '+text+'</div>');
	$(".alert-container").prepend(template);
	template.hide().slideDown();
	if(timer!=null){
		setTimeout(function(){
			template.slideUp('slow'); 
		}, timer);
	}
    $(document).find("html, body").animate({ scrollTop: 0 }, "slow");
}

function growModal(title, text, type, icon, modal, timer){
    if(title =='') title = "Alerta:";
    var template = $('<div class="alert alert-'+type+'" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><i class="fa fa-'+icon+' fa-lg"></i> <strong>'+title+'</strong><br/> '+text+'</div>');
    modal.find(".alert-modal").prepend(template);
    template.hide().slideDown();
    if(timer!=null){
        setTimeout(function(){
            template.slideUp('slow');
        }, timer);
    }
    $(document).find("html, body").animate({ scrollTop: 0 }, "slow");
}

function telefone(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/^(\d)/,"($1")
    v=v.replace(/^\((\d\d)(\d)/g,"($1) $2")
    v=v.replace(/(\d{4})(\d)/,"$1-$2")
    return v
}
function checkCpf(cpf){
    cpf = remove(cpf, ".");
    cpf = remove(cpf, "-");
    if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999"){
        return false;
    }
    soma = 0;
    for(i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11)
        resto = 0;
    if(resto != parseInt(cpf.charAt(9))){
        return false;
    }
    soma = 0;
    for(i = 0; i < 10; i ++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11)
        resto = 0;
    if(resto != parseInt(cpf.charAt(10))){
        return false;
    }
    return true;
}
function checkCnpj(cnpj){
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;

    if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
    }
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
            digitos_iguais = 0;
            break;

        }
    if (!digitos_iguais){
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--){
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--){
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}
//Máscaras, formatação e validação ////////////////////////////////////////////
function mask(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmask()",1)
}
function execmask(){
    v_obj.value=v_fun(v_obj.value)
}
function money(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/[0-9]{14}/,"inv�lido")
    v=v.replace(/(\d{1})(\d{11})$/,"$1.$2")
    v=v.replace(/(\d{1})(\d{8})$/,"$1.$2")
    v=v.replace(/(\d{1})(\d{5})$/,"$1.$2")
    v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2")
    return v;
}
function format(o,m){
    i = o.value.length;
    saida = m.substring(0,1);
    texto = m.substring(i);
    if(texto.substring(0,1) != saida)
        o.value += texto.substring(0,1);
}
function numeros(v){
    return v.replace(/\D/g,"")
}
function data(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/^(\d{2})(\d)/,"$1/$2")
    v=v.replace(/(\d{2})(\d)/,"$1/$2")
    return v
}
function valor(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/[0-9]{12}/,"inv���lido")
    v=v.replace(/(\d{1})(\d{8})$/,"$1.$2")
    v=v.replace(/(\d{1})(\d{5})$/,"$1.$2")
    v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2")
    return v;
}
function cpf(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/^(\d{3})(\d)/,"$1.$2")
    v=v.replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3")
    v=v.replace(/(\d{3})(\d)/,"$1-$2")
    return v
}
function cnpj(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/^(\d{12})(\d)/,"$1-$2")
    v=v.replace(/^(\d{8})(\d)/,"$1/$2")
    v=v.replace(/^(\d{5})(\d)/,"$1.$2")
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")
    return v
}
function cep(v){
    v=v.replace(/\D/g,"")
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")
    v=v.replace(/(\d{3})(\d)/,"$1-$2")
    return v
}
function checkData(data) {
    data = remove(data, "/");
    if(data.length != 8)
        return false;

    var dia=0, mes=0, ano=0;
    dia = parseInt(data.substr(0,2), 10);
    mes = parseInt(data.substr(2,2), 10);
    ano = parseInt(data.substr(4,4), 10);

    if (data =="")
        return false;
    if ((mes < 1) || (mes > 12)) {
        return false;
    }
    if ((dia < 1) || (dia > 31)){
        return false;
    }
    if ((ano < 1500) || (ano > 2100) ){
        return false;
    }
    if ((mes == 2) || (mes == 4) || (mes == 6) || (mes == 9) || (mes == 11)) {
        if (dia > 30) {
            return false;
        }
        if (mes == 2) {
            if (ano % 4 == 0) {
                if (dia > 29) {
                    return false;
                }
            }
            else {
                if (dia > 28) {
                    return false;
                }
            }
        }
    }
    return true;
}
function checkMail(mail){
    var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
    if(typeof(mail) == "string"){
        if(er.exec(mail)){
            return true;
        }
    }
}
function remove(str, sub){
    i = str.indexOf(sub);
    r = "";
    if (i == -1) return str;
    r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
    return r;
}
function addslashes(str) {
    str=str.replace(/\\/g,'\\\\');
    str=str.replace(/\'/g,'\\\'');
    str=str.replace(/\"/g,'\\"');
    str=str.replace(/\0/g,'\\0');
    return str;
}
function stripslashes(str) {
    str=str.replace(/\\'/g,'\'');
    str=str.replace(/\\"/g,'"');
    str=str.replace(/\\0/g,'\0');
    str=str.replace(/\\\\/g,'\\');
    return str;
}
function updateTips(obj, t, timer){
    if(timer == undefined) timer = 3500;
    growAlert(t, '', 'warning', 'warning', timer);
    obj.focus().parent().addClass("has-error");
    $(document).find("html, body").animate({ scrollTop: 0 }, "slow");
}

function updateTipsModal(obj, objAlert, t, title,timer){
    if(timer == undefined) timer = 3500;
    if(title =='') title = "Alerta:";
    var template = $('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><i class="fa fa-exclamation-triangle fa-lg"></i> <strong>'+title+'</strong><br/> '+t+'</div>');
    objAlert.prepend(template);
    template.hide().slideDown();

    if(timer!=null){
        setTimeout(function(){
            template.slideUp('slow');
        }, timer);
    }
    obj.focus().parent().addClass("has-error");
}


function checkLength(f, n, min, t){
    var o = $('#' + f);
    if (o.val().length < min) {
        o.focus();
        if(t == undefined)
            updateTips(o,n + " não pode ter menos que " +	min + " caracteres.");
        else
            updateTips(o,t);
        return false;
    } else {
        return true;
    }
}
function checkNumber(f, n, min, t){
    var o = $('#' + f);
    if (Number(o.val()) < min) {
        o.addClass("ui-state-error");
        o.focus();
        if(t == undefined)
            updateTips(o, n + " não pode ser menor que " +	min + ".");
        else
            updateTips(o,t);
        return false;
    } else {
        return true;
    }
}
function checkRegexp(f, regexp, t){
    var o = $('#' + f);
    if (!( regexp.test(o.val()))){
        o.addClass("ui-state-error");
        updateTips(t);
        return false;
    } else {
        return true;
    }
}

function checkCaracteresEspecial(obj,regex){
    var regExp = new RegExp(regex);
    var myString = obj.val();
    return myString.search(regExp);
}

function checkNumberString(obj){
    var alphaExp = /^[a-zA-Za-zÀ-ú-0-9\,\.\b\s]+$/;
    var string = obj.val().trim();
    if(string.match(alphaExp)) return true;
    else return false;
}


function addError(message, messages){
	if(message!=undefined && messages.indexOf(message)==-1) {
		messages.push(message);
	}
}


function TestKey(evt,addChars){ // , = 44
	chars = "0123456789Xx"+addChars;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);	
//	if ((charCode == 9) || (charCode == 35) || (charCode == 36) || (charCode == 37) || (charCode == 38) || (charCode == 39) || (charCode == 40) || (charCode == 46) )
//	{
//		return true;	
//	}
	
	if(chars.indexOf(String.fromCharCode(charCode)) == -1 && charCode != 8 && charCode != 9 && charCode != 32 && charCode != 46 && charCode != 39) {
		return false;
//		eval("window.event."+charCode+"=0;");
	}
	return true;
}
function TestKeyChar(evt,addChars){ // , = 44
	chars = "aáàãâbcdeèéêfghiíìîjklmnoõôóòpqrstuúùûvwxyzAÀÁÃÂBCDEÉÈÊFGHIÍÌÎJKLMNOÓÒÔÕPQRSTUÚÙÛVWXYZçÇ" + addChars;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);	
	//alert(charCode);
	//	if ((charCode == 9) || (charCode == 35) || (charCode == 36) || (charCode == 37) || (charCode == 38) || (charCode == 39) || (charCode == 40) || (charCode == 46) )
	//	{
	//		return true;	
	//	}
	
	if(chars.indexOf(String.fromCharCode(charCode)) == -1 && charCode != 8 && charCode != 9 && charCode != 32 && charCode != 39) {
		return false;
	//		eval("window.event."+charCode+"=0;");
	}
	return true;
}

/**
 * @author JEFERSON INACIO
 * @date 15/04/2015 
 * @param table 		-> type = @String -> referência da table
 * @param columns 	-> type = @Array[String] -> colunas da table para ser nomeadas no JSON, array segue a ordem em que as colunas estão dispostas
 * @param notColumns -> type = @String -> referência das TDs que não serão adicionadas ao JSON
 * @Exemplo : tableToJson("#tableStatusDisciplina tbody",["coluna1","coluna2","coluna3", "coluna4"],"td:last-child")
 * @returns ArrayJson
*/
function tableToJson(table, columns, notColumns){
	return	$(table+' tr').get().map(function(row){
			  json ="{"
			  $(row).find("td:not("+notColumns+")").each(function(index){
			     json = json+"\""+columns[index]+"\":\""+$(this).html().trim()+"\",";
			  })
			  if(json.substring(json.length,json.length-1) == ","){
			     json = json.substring(0,json.length-1)
			  }
			  json = json+"}"
			  return JSON.parse(json)
			})
}	

/**
 * @author JEFERSON INACIO
 * @param str string
 * @returns {Date}
 */
function stringToDate(str){
	var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
	var dt = new Date(str.replace(pattern,'$3-$2-$1'));
	return dt;
}

/**
 * @author JEFERSON INACIO
 * @param dtInicio
 * @param dtFim
 * @returns {Number}
 */
function difDiasDate(dtInicio, dtFim){
	var diff = (dtFim-dtInicio)/(60*60*24*1000);
	return diff;
}

/**
 * 
 * @returns JSON
 */
function getObjUrl(){
	var t = window.location.href
	var term = t.substring(t.indexOf("organismoscolegiados") + "organismoscolegiados".length+1).split('/')

	var json = '{"page": "'+term[0]+'",';
	if(term.length > 1){
	   json = json+'"method":"'+term[1]+'",';
	}

	if(term.length > 2){
	  var e = 1;
	  for(i = 2; i<= term.length-1; i++){
	     json= json+'"parm_'+e+'": "'+term[i]+'",';
	     e++;
	  }
	}

	json = json.substring(0,json.length-1 );

	json = json+"}"

	return JSON.parse(json);
}

///////////////////////////////////////////////////////////////////////////////
//Carregamento inicial do framework ///////////////////////////////////////////
$(function(){
    $('.selectpicker').selectpicker('render');
    $('[data-toggle="tooltip"]').tooltip();

    //Modal Excluir - Framework
    function actionFormDel(){
        $('#formSearch').submit();
    }

    $('#btCheckAll').click(function(){
        var check = this.checked;
        $('.btCheck').each(function(){
            this.checked = check;
        });
    });

    $("#btDel").button({ icons:{primary:'ui-icon-trash'} }).click(function(){
        var modal = createModal({size:'sm', execute:function(){ actionFormDel(); }});
        modal.setTitle("Confirmação");
        modal.setMessage("Deseja excluir o(s) registro(s) selecionado(s)?");
        modal.show();
    });

    $(".btLimpar").click(function(){
        $($(".btLimpar")[0].form).find("input,select,textarea").each(function(index){
            if(this.localName == "input" || this.localName == "textarea"){
                $(this).val("");
            }else if(this.localName == "select" ){
                $(this).val(0);
            }
            window.location.href = window.location.href;
        });
    });

    if($(".alert:not(.info)")) {
    	var time = $(".alert").data('timer');
        time = (time != undefined && time != null ? parseInt(time) : (time == null) ? false : 9000);
    	
    	if(time != false){
	        setTimeout(function () {
	            $(".alert").slideUp('slow');
	        }, time);
    	}dragONDrop
        $(document).find("html, body").animate({ scrollTop: 0 }, "slow");
    }
});

(function($){
	$.fn.upper = function(options){
		var config = {
		};
		var options = $.extend(config, options);
		$(this).keyup(function(){
			var posInicial = this.selectionStart;
			$(this).val($(this).val().toUpperCase());
			this.selectionStart = posInicial;
			this.selectionEnd = posInicial;
		})
		$(this).css( "text-transform", "uppercase" );
	}
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
	}
    $.dragONDrop = function(options){
        var config = {
            possiveis:"#box_possiveis",
            footerPossivel: "#box_footer_possiveis",
            selecionadas: "#box_selecionadas",
            footerSelecionadas: "#box_footer_selecionadas"
        }
        var options = $.extend(config, options);
        var possiveis = $(options.possiveis);
        var footerPossivel = $(options.footerPossivel);
        var selecionadas = $(options.selecionadas);
        var footerSelecionadas = $(options.footerSelecionadas);

        numeroRegistro = function(){
            var numeroRegistrosPossiveis = possiveis.find("li").length - 1;
            var numeroRegistrosSelecionado = selecionadas.find("li").length - 1;
            footerPossivel.find('span.numTotal').text(numeroRegistrosPossiveis);
            footerSelecionadas.find('span.numTotal').text(numeroRegistrosSelecionado);
        }

        addTrans = function (elem){
            var trans = $(this).parent();
            var objHidden = trans.find('input:hidden');
            var id = objHidden.val();
            var obj = trans.find('input:checkbox');
            objHidden.prop("disabled", false);
            $(obj[0]).attr('name','insert_'+id).val("1").prop("disabled", false);
            $(obj[1]).attr('name','update_'+id).val("1").prop("disabled", false);
            $(obj[2]).attr('name','delete_'+id).val("1").prop("disabled", false);
            selecionadas.append(trans);
            trans.find('.remove-trans').removeClass('hidden');
            trans.find('.add-trans').addClass('hidden');
            trans.find('.check').removeClass('hidden');
            trans.find('.remove-trans').click(removeTrans);

            selecionadas.find('li').find('.remove-trans').click(removeTrans);
            numeroRegistro();
        }


        removeTrans = function (elem){
            var trans = $(this).parent();
            var objHidden = trans.find('input:hidden');
            var obj = trans.find('input:checkbox');
            objHidden.prop("disabled", "disabled");
            $(obj[0]).removeAttr('name').val("").prop("disabled", "disabled").attr("checked", false);
            $(obj[1]).removeAttr('name').val("").prop("disabled", "disabled").attr("checked", false);
            $(obj[2]).removeAttr('name').val("").prop("disabled", "disabled").attr("checked", false);
            possiveis.append(trans);
            trans.find('.add-trans').removeClass('hidden');
            trans.find('.remove-trans').addClass('hidden');
            trans.find('.check').addClass('hidden');

            possiveis.find('li').find('.add-trans').click(addTrans);
            numeroRegistro();
        }

        numeroRegistro();
        possiveis.find('li').find('.add-trans').click(addTrans);
        selecionadas.find('li').find('.remove-trans').click(removeTrans);
    }
})($)