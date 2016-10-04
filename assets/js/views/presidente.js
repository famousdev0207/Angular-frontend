$(function(){
	
	var t = getObjUrl();
	if(t.method == "novo"){
		$("#presidente").find("input:not(#nr_cpf), select, button").attr("disabled",true)
	}
	
	
	$(".selectPicker").selectPicker();
    $('.datetimepicker').datetimepicker({pickTime:false,language:'pt-br'});
	
	$(":file").filestyle({buttonText: "Anexar"});
	
	$('#nr_cpf').blur(function(){
		if($(this).val().trim() != ""){
			var nome = $("#nm_membro");
			var cpf = $("#nr_cpf");
			var segmento = $("#segmento");
			var escolaridade = $("#escolaridade");
			var unidadeId = $("#nm_unidade_trabalho_id");
			var email = $("#email");
			var nmLogin = $("#nmLogin");
			var dtNascimento = $("#dtNascimento");
			
			$.ajax({
				type:"post",
				url:$("#url").val()+"/partials/verificaPresidente",
				data:{nr_cpf: $(this).val(), unidTrab: unidadeId.val()},
				dataType:"json",
				success: function(json){
					var flP = false;
					if(json.membro.length > 0){
						var membro = json.membro[0];
						if(membro.fl_presidente == undefined ||membro.fl_presidente == 'f' ){
							cpf.val(membro.nr_cpf);
							segmento.val(membro.nr_segmento);
							$("[data-id=segmento] .filter-option").html($("#segmento option[value="+membro.nr_segmento+"]").text())
							escolaridade.val(membro.nr_escolaridade);
							$("[data-id=escolaridade] .filter-option").html($("#escolaridade option[value="+membro.nr_escolaridade+"]").text())
							nome.val(membro.nm_membro);
							email.val(membro.ds_email);
							$("#cd_membro").val(membro.ci_membro);
							$("#presidente").find("input:not(#nr_cpf), select, button").removeAttr("disabled");
						}else{
							var membro = json.membro[0];
							var msg = "O CPF informado pertence a <strong>"+membro.nm_membro+"</strong> </br>Cadastrado como Presidente no conselho da escola <strong>"+membro.nm_unidade_trabalho+"</strong> ";
							if(membro.ci_coselho != undefined){
								dtinicio = stringToDate(membro.dt_inicio);
								dtfim = stringToDate(membro.dt_fim);
								var dif  = parseInt(difDiasDate(dtinicio, dtfim));
								var diarest = parseInt(difDiasDate(new Date(),dtfim));
								msg = msg +"</br> Mandato de <strong>"+membro.dt_inicio+"</strong> à <strong>"+membro.dt_fim+"</strong> - <strong>"+dif+" dia(s) </strong> " +
								"<span style='color:red;'> Restam "+diarest+" dia(s) !</span>";
							}
							
							
							
							growAlert(" Alerta",msg, "warning", "exclamation-triangle", 10000);
							cpf.val("");
							segmento.val(0);
							$("[data-id=segmento] .filter-option").html("Selecione");
							escolaridade.val(0);
							$("[data-id=escolaridade] .filter-option").html("Selecione");
							nome.val("");
							email.val("");
							$("#cd_membro").val("");
							$("#presidente").find("input:not(#nr_cpf), select, button").attr("disabled",true)
							flP = true;
						}
					}else{
						segmento.val(0);
						$("[data-id=segmento] .filter-option").html("Selecione");
						escolaridade.val(0);
						$("[data-id=escolaridade] .filter-option").html("Selecione");
						nome.val("");
						email.val("");
						$("#cd_membro").val("");
						$("#cd_usuario").val("");
						flP = false;
						$("#presidente").find("input:not(#nr_cpf), select, button").removeAttr("disabled");
					}
					
					if(!flP){
						if(json.usuario.length > 1 ){
							var tr = "";
							$.each(json.usuario,function(){
								 tr = tr+"<tr>" +
								 		"   <td>"+this.nm_usuario+"</td>" +
								 		"   <td>"+this.nm_login+"</td>" +
								 		"   <td>"+this.nm_cpf+"</td>" +
								 		"   <td>"+this.ds_email+"</td>" +
								 		"   <td>" +
								 		"		<button onclick='' type='button' class='btn btn-default btn-xs' title='Selecionar' data-toggle='tooltip'>" +
								 		"			<span class='fa fa-pencil'></span>" +
								 		"       </button>" +
								 		"</td>" +
								 		"</tr>";
							})
							
							$("#tableusuario tbody").html(tr);
							$("#modal-usuario").modal()
						}else if(json.usuario.length == 1){
							var usuario = json.usuario[0];
							var cd_usuario = (json.membro.length > 0 ? (json.membro[0].cd_usuario == null ? usuario.ci_usuario : json.membro[0].cd_usuario) : usuario.ci_usuario );
							nmLogin.val(usuario.nm_login);
							dtNascimento.val(usuario.dt_nascimento);
							$('[name=fl_sexo][value='+usuario.fl_sexo+']')[0].checked = true;
							
							if(json.membro.length == 0){
								nome.val(usuario.nm_usuario);
								email.val(usuario.ds_email);
							}
							$("#cd_usuario").val(cd_usuario);
							$("#presidente").find("input:not(#nr_cpf), select, button").removeAttr("disabled");
							
						}else{
							nmLogin.val("");
							dtNascimento.val("");
							$('[name=fl_sexo][value=0]')[0].checked = true;
							$("#cd_usuario").val("");
							$("#presidente").find("input:not(#nr_cpf), select, button").removeAttr("disabled");
						}
					}else{
						nmLogin.val("");
						dtNascimento.val("");
						$('[name=fl_sexo][value=0]')[0].checked = true;
						$("#cd_usuario").val("");
					}
				}
			})
			
		}
	});
	$('#nr_cpf').bind('paste',function(){
		mask(this, cpf);
	})
	
	$('#email').blur(function(){
		$.ajax({
			type:"post",
			url:$("#url").val()+"/partials/verificaEmail",
			data:{email: $(this).val(), cdMembro: $("#cd_membro").val().trim(), cdUsuario:$("#cd_usuario").val().trim()},
			dataType:"json",
			success: function(json){
				if(json.length > 0){
					
				}				
			}
		})
	});
})


$('#nm_unidade_trabalho').typeahead({
    source: function (query, process) {
        unidades = [];
        map = {};
        $.get(
            $("#url").val()+"/partials/unidade_trabalho",
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
    	$.ajax({
    		type:"post",
    		url:$("#url").val()+"/partials/getConselho",
    		data:{unidTrab: map[item].id},
    		dataType:"json",
    		success: function(json){
    			if(json.length == 0){
    				json = json[0];
    				selectedId = map[item].id;
    		        SelectedInep = map[item].inep;
    		        $('#cod_unid').text(SelectedInep);
    		        $('#nm_unidade_trabalho_id').val(selectedId);
    		        $('#unidade-trab').find('input:eq(0)').prop('disabled', true);
    		        $('#edit-unidade').prop('disabled', false);
    			}else{
    				$('#nm_unidade_trabalho').val("");
    				json = json[0];
    				dtfim = stringToDate(json.dt_fim);
                    var dif = parseInt(difDiasDate(new Date(),dtfim));
                    
    				var msg = "A Escola <strong>"+json.nm_unidade_trabalho+"</strong> já possui um conselho ativo </br> Mandato de <strong>"+json.dt_inicio+"</strong> à <strong>"+json.dt_fim+"</strong> - <strong>"+json.dias+" dia(s) </strong> " +
					          "<span style='color:red;'> Restam "+dif+" dia(s) !</span>";
    				
    				growAlert(" Alerta",msg, "warning", "exclamation-triangle", 10000);
    			}
    		}
    	});
    
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
        
    	$("#dt_inicioM").val("");
		$("#dt_fimM").val("");
		$("#duracao").html("");
	}
})

function submitSaveOrUpdate(){
	if(validaAdicionar()){
		return true;
	}else{
		return false;
	}
}

function validaAdicionar(){
	clearStyleError("#formInsertEdit");
	var messages = [];
	var nome = $("#nm_membro");
	var cpf = $("#nr_cpf");
	var matricula = $("#nr_matricula");
	var segmento = $("#segmento");
	var escolaridade = $("#escolaridade");
	var nmLogin = $("#nmLogin");
	var dtNascimento = $("#dtNascimento");
	var unidade = $("#nm_unidade_trabalho");
	var unidadeId = $("#nm_unidade_trabalho_id"); 
	var file = $("#fileAta");
	var email = $("#email");
	var valid = true;
	if(unidade.val().trim() == "" && unidadeId.val().trim() == ""){
		unidade.addClass('ui-state-error');
		addError("O campo <strong>Escola</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(file.val().trim() == ""){
		$(".fileata .bootstrap-filestyle input").addClass('ui-state-error');
		addError("O campo <strong>ATA de Eleição</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(nome.val().trim() == ""){
		nome.addClass('ui-state-error');
		addError("O campo <strong>Nome</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(cpf.val().trim() == "" && $("#panelCpf").css('display') != "none"){
		cpf.addClass('ui-state-error');
		addError("O campo <strong>CPF</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}else if(!checkCpf(cpf.val().trim()) && $("#panelCpf").css('display') != "none"){
		cpf.addClass('ui-state-error');
		addError("<strong>CPF</strong> Inválido!",messages);
		valid = false;
	}
	
	if(nmLogin.val().trim() == ""){
		nmLogin.addClass('ui-state-error');
		addError("O campo <strong>Login</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	
	if(dtNascimento.val().trim() == ""){
		dtNascimento.addClass('ui-state-error');
		addError("O campo <strong>Data de Nascimento</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	
	
	if(matricula.val().trim() == "" && $("#panelMatricula").css('display') != "none"){
		matricula.addClass('ui-state-error');
		addError("O campo <strong>Matrícula</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	
	if(segmento.val().trim() == "0"){
		$("button[data-id=segmento]").addClass("ui-state-error");
		addError("O campo <strong>Segmento</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(escolaridade.val().trim() == "0"){
		$("button[data-id=escolaridade]").addClass("ui-state-error");
		addError("O campo <strong>Escolaridade</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(email.val().trim() == ""){
		email.addClass("ui-state-error");
		addError("O campo <strong>E-mail</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}else if(!checkMail(email.val().trim())){
		email.addClass("ui-state-error");
		addError("<strong>E-mail</strong> inválido!", messages);
		valid = false;
	}
	
	if(!valid) {
		errorMessage = '';
		messages.forEach(function(entry) {
			errorMessage += entry+'<br/>'; 
		});
		growAlert(" Alerta", errorMessage, "danger", "exclamation-triangle", 5000);
	}
	return valid;
}


function selectUsuario(ci, usuario,login, cpf, email, fl_sexo, dtNascimento){
	var nome = $("#nm_membro");
	var cpf = $("#nr_cpf");
	var email = $("#email");
	var nmLogin = $("#nmLogin");
	var dtNascimento = $("#dtNascimento");
	
	
}

function clearStyleError(formOrDiv){
	$(formOrDiv).find(" input, select, textarea").each(function(){
		if(this.localName == "select"){
			$(this).removeClass("ui-state-error");
			$("button[data-id="+$(this).attr("id")+"]").removeClass("ui-state-error");
		}else{
			$(this).removeClass("ui-state-error");
		}
	});
}