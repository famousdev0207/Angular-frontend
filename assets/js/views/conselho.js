


$(function(){
	$('#editMembro').modal();
	
    $(".selectPicker").selectPicker();
    $('.datetimepicker').datetimepicker({pickTime:false,language:'pt-br'});
    
    $(".datetimepicker").on("dp.change", function (e) {
    	if($("#dt_inicioM").val().trim() != "" && $("#dt_fimM").val().trim() != ""){
	    	$("#dt_fimM").removeClass("ui-state-error");
	    	$dtInicio = stringToDate($("#dt_inicioM").val().trim());
	    	$dtFim    = stringToDate($("#dt_fimM").val().trim());  
	    	var numDias = difDiasDate($dtInicio,$dtFim);
	    	if(numDias >= 0){
	    		$("#duracao").val(numDias+" dias");
	    		
	    	}else{
	    		$("#dt_fimM").addClass("ui-state-error");
	    		$("#dt_fimM").val("");
	    		growAlert(" Alerta","O <strong>Fim do mandato</strong> não pode ser menor que o <strong>Inicio do mandato</strong>!", "danger", "exclamation-triangle", 5000);
	    	}
    	}
    });
    
    
    $("#btSearch").click(function(){
    	var tr = "";
    	$.ajax({
    		type:"post",
    		url:$("#url").val()+"/partials/searchMembro",
    		data:{cpf: $("#nr_cpf").val(), conselho:$("#cdconselho").val(), matricula:$("#nr_matricula").val(), nome:$("#nm_membro").val(), status:"t"},
    		dataType:"json",
    		success: function(json){	    	
    			
    			if(json.length > 0){
    				$.each(json,function(key,value){
    					var segmento =  (this.ds_segmento == null ? "" : this.ds_segmento);
    					var escolaridade =  (this.ds_escolaridade == null ? "" : this.ds_escolaridade);
    					
    					var icon = (this.fl_presidente == 't' ? "<i title='Presidente' style='color:red;'class='fa fa-check'></i>" :"" );
    					tr = tr+"<tr>" +
    							    "<td style='vertical-align: middle;'>"+this.nm_membro.toUpperCase()+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>"+segmento+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>"+escolaridade+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>"+icon+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>" +
    							    "  <button onclick=\" location.href = \' "+$("#url").val()+"/membro/"+this.ci_membro+"/"+$("#cdconselho").val()+" \' \"  type='button' class='btn btn-default btn-xs' title='Editar' data-toggle='tooltip'>" +
    							    		"<span class='fa fa-pencil'></span>" +
    							    "  </button>" +
    							    "</td>" +
    							 "</tr>";

    				});
    				
    				$("#tableMembroSearch tbody tr").remove();
    				$("#tableMembroSearch tbody").append(tr);
    				
    			}else{
    				$("#tableMembroSearch tbody tr").remove();
    				tr = '<tr id="empty"><td colspan="7" style="text-align: center;vertical-align: middle;"> Nenhum registro encontrado!</td></tr>';
    				$("#tableMembroSearch tbody").append(tr);
    				growAlert(" Alerta","Nenhum registro Encontrado!", "warning", "exclamation-triangle", 8000);
    			}
    		}
    	});
    });
    
    
    $("#btSearchInativo").click(function(){
    	var tr = "";
    	$.ajax({
    		type:"post",
    		url:$("#url").val()+"/partials/searchMembro",
    		data:{cpf: $("#nr_cpfInativo").val(), conselho:$("#cdconselho").val(), matricula:$("#nr_matriculaInativo").val(), nome:$("#nm_membroInativo").val(), status:"f"},
    		dataType:"json",
    		success: function(json){	    	
    			console.log(json);
    			if(json.length > 0){
    				$.each(json,function(key,value){
    					var segmento =  (this.ds_segmento == null ? "" : this.ds_segmento);
    					var escolaridade =  (this.ds_escolaridade == null ? "" : this.ds_escolaridade);
    					
    					var icon = (this.fl_presidente == 't' ? "<i title='Presidente' style='color:red;'class='fa fa-check'></i>" :"" );
    					tr = tr+"<tr>" +
    							    "<td style='vertical-align: middle;'>"+this.nm_membro.toUpperCase()+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>"+segmento+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>"+escolaridade+"</td>" +
    							    "<td style='text-align:center; vertical-align: middle;'>" +
    							    "  <button onclick=\" location.href = \' "+$("#url").val()+"/membro/"+this.ci_membro+"/"+$("#cdconselho").val()+" \' \"  type='button' class='btn btn-default btn-xs' title='Editar' data-toggle='tooltip'>" +
    							    		"<span class='fa fa-pencil'></span>" +
    							    "  </button>" +
    							    "</td>" +
    							 "</tr>";

    				});
    				
    				$("#tableMembroSearchInativo tbody tr").remove();
    				$("#tableMembroSearchInativo tbody").append(tr);
    				
    			}else{
    				$("#tableMembroSearchInativo tbody tr").remove();
    				tr = '<tr id="empty"><td colspan="7" style="text-align: center;vertical-align: middle;"> Nenhum registro encontrado!</td></tr>';
    				$("#tableMembroSearchInativo tbody").append(tr);
    				growAlert(" Alerta","Nenhum registro Encontrado!", "warning", "exclamation-triangle", 8000);
    			}
    		}
    	});
    });
    $("#nm_unidade_trabalho, #nm_usuario").upper();
    
    $(".inputCpf").blur(function(){
    	if($(this).val().trim() != ""){
	    	$.ajax({
	    		type:"post",
	    		url:$("#url").val()+"/partials/validaCpf",
	    		data:{cpf: $(this).val(), idMembro:$("#idMembro").val()},
	    		dataType:"json",
	    		success: function(json){	    			
	    			if(json != "1"){
	    				$(".inputCpf").val("");
	    				var msg = "O <strong>CPF</strong> informado já está sendo usado pelo Membro <strong>"+json.nm_membro+" !</strong>";
	    				growAlert(" Alerta",msg, "warning", "exclamation-triangle", 10000);
	    			}
	    		}
	    	});
    	}
    });
    
    $(".inputCpf").bind('paste',function(){
    	mask(this, cpf);
    })
    
    $(".cpfSearch").bind('paste',function(){
    	mask(this, cpf);
    })
    
    $(".inputMatricula").blur(function(){
    	if($(this).val().trim() != ""){
	    	$.ajax({
	    		type:"post",
	    		url:$("#url").val()+"/partials/validaMatricula",
	    		data:{matricula: $(this).val()},
	    		dataType:"json",
	    		success: function(json){	    			
	    			if(json != "1"){
	    				$(".inputMatricula").val("");
	    				var msg = "A <strong>Matricula</strong> informado já está sendo usado pelo Membro <strong>"+json.nm_membro+"</strong> !";
	    				growAlert(" Alerta",msg, "warning", "exclamation-triangle", 10000);
	    			}
	    		}
	    	});
    	}
    });
    
    $(".inputMatricula").bind('paste',function(){
    	mask(this, numeros);
    })
    
    
    $(".matriculaSearch").bind('paste',function(){
    	mask(this, numeros);
    })
    
    $(".selectSegmento").change(function(){
    	if($(this).val().trim() == "2"){
    			$("#panelCpf").hide("slow");
    			$(".inputCpf").val("");
    			$("#panelMatricula").show("slow");
    			$(".inputMatricula").val("");
    	}else{
	    		$("#panelCpf").show("slow");
	    		$("#panelMatricula").hide("slow");
	    		$(".inputMatricula").val("");	
    	}
    });
});



var dados;
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
        //console.log(map[item]);
    	$.ajax({
    		type:"post",
    		url:$("#url").val()+"/partials/validaConselho",
    		data:{unidTrab: map[item].id},
    		dataType:"json",
    		success: function(json){	    			
    			if(json != "1"){
                    dtfim = stringToDate(json.dt_fim);
                    var dif = parseInt(difDiasDate(new Date(),dtfim));
                    
    				var msg = "A Escola <a title='Click aqui para editar este conselho!' href='"+$("#url").val()+"/editar/"+json.ci_conselho+"'><strong>"+json.nm_unidade_trabalho+"</strong></a> já possui um conselho ativo </br> Mandato de <strong>"+json.dt_inicio+"</strong> à <strong>"+json.dt_fim+"</strong> - <strong>"+json.dias+" dia(s) </strong> " +
    						  "<span style='color:red;'> Restam "+dif+" dia(s) !</span>";
    				growAlert(" Alerta",msg, "warning", "exclamation-triangle");
    				$('#nm_unidade_trabalho').val("");
    			}else{
    				selectedId = map[item].id;
    		        SelectedInep = map[item].inep;
    		        $('#cod_unid').text(SelectedInep);
    		        $('#nm_unidade_trabalho_id').val(selectedId);
    		        $('#unidade-trab').find('input:eq(0)').prop('disabled', true);
    		        $('#edit-unidade').prop('disabled', false);
    		        
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
	}
})


function toggleMenu(aba, campo){
	if($(campo).attr("disabled") == undefined){
		$("#menuMembro .active").removeClass('active')
		$('#'+aba).addClass('active');
		$("[id *=membro_]").hide();
		$("#membro_"+aba).show();
	}
}


function adicionarMembro(){
	if(validaAdicionar()){
		var table = $("#membrosAdd");
		var nmMembro = $("#nm_membroNew");
		var cpf = $("#nr_cpfNew");
		var matricula = $("#nr_matriculaNew");
		var segmento = $("#segmentoNew");
		var dsSegmento = segmento[0].selectedOptions[0].text;
		var escolaridade = $("#escolaridadeNew");	
		var dsEscolaridade = escolaridade[0].selectedOptions[0].text;
		var email = $("#email");
		var ciTr = $("#membrosAdd tbody tr").length + 1;
		
		var linha = "<tr lid='"+ciTr+"'>" +
						"<td style='vertical-align: middle;'>"+matricula.val()+"</td>" +
						"<td style='vertical-align: middle;'>"+nmMembro.val()+"</td>" +
						"<td style='text-align: center;vertical-align: middle;'>"+cpf.val()+"</td>" +
						"<td style='vertical-align: middle;'>"+dsSegmento+"</td>" +
						"<td style='vertical-align: middle;'>"+dsEscolaridade+"</td>" +
						"<td style='text-align: center;vertical-align: middle;'>"+email.val()+"</td>" +
						"<td style='text-align: center;vertical-align: middle;'><button onclick='removerMembro("+ciTr+")' type='button' class='btn btn-default'><i  class='fa fa-trash-o'></i></button></td>" +
					"</tr>";
		
		table.find("tbody #empty").remove();
		table.find("tbody").append(linha);
		
		nmMembro.val("");
		cpf.val("");
		matricula.val("");
		segmento.val(0);
		$("[data-id=segmentoNew] .filter-option").html("Selecione");
		escolaridade.val(0);
		$("[data-id=escolaridadeNew] .filter-option").html("Selecione");
		email.val("");
		
		$("#tableMembroAdd").show();
		
		$("#search").attr("disabled","disabled");
		$("#inativos").attr("disabled","disabled");
	}
}

function removerMembro(lid){
	$("[lid = "+lid+"]").remove();
	if($("#membrosAdd tbody tr").length == 0 ){
		$("#search").removeAttr("disabled");
		$("#inativos").removeAttr("disabled","disabled");
		var linha = '<tr id="empty"><td colspan="7" style="text-align: center;vertical-align: middle;"> Nenhum registro encontrado!</td></tr>';
		$("#membrosAdd").append(linha);
	}
}

function validaAdicionar(){
	clearStyleError("#formInsertEdit");
	var messages = [];
	var nome = $("#nm_membroNew");
	var cpf = $("#nr_cpfNew");
	var matricula = $("#nr_matriculaNew");
	var segmento = $("#segmentoNew");
	var escolaridade = $("#escolaridadeNew");
	var email = $("#email");
	var valid = true;
	
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
	
	if(matricula.val().trim() == "" && $("#panelMatricula").css('display') != "none"){
		matricula.addClass('ui-state-error');
		addError("O campo <strong>Matrícula</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	
	if(segmento.val().trim() == "0"){
		$("button[data-id=segmentoNew]").addClass("ui-state-error");
		addError("O campo <strong>Segmento</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(escolaridade.val().trim() == "0"){
		$("button[data-id=escolaridadeNew]").addClass("ui-state-error");
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

function validaConselho(){
	clearStyleError("#formInsertEditConselho");
	var messages = [];
	var nm_unidade_trabalho = $("#nm_unidade_trabalho");
	var cd_unidade_trabalho = $("#nm_unidade_trabalho_id");
	var dtInicio = $("#dt_inicioM");
	var dtFim = $("#dt_fimM");
	var valid = true;
	
	if(nm_unidade_trabalho.val().trim() == "" && cd_unidade_trabalho.val().trim() == ""){
		nm_unidade_trabalho.addClass("ui-state-error");
		addError("O campo <strong>Escola</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(dtInicio.val().trim() == ""){
		dtInicio.addClass("ui-state-error");
		addError("O campo <strong>Inicio de Mandato</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}else{
		$dtIni = stringToDate($("#dt_inicioM").val().trim());
    	$dtF    = stringToDate($("#dt_fimM").val().trim());  
    	var numDias = difDiasDate($dtIni,$dtF);
    	if(numDias <=365 || numDias >= 1095){
    		addError("O Periodo do Mandato tem que ser no mínimo <strong>1 ano (365 dias)</strong> e no máximo <strong>3 anos (1095 dias)</strong>", messages);
    		valid = false;
    	}
	}
	if(dtFim.val().trim() == ""){
		dtFim.addClass("ui-state-error");
		addError("O campo <strong>Fim de Mandato</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	debugger;
	if($("#menuMembro #search").css('display') == 'none'){
		var nrMembroAdd = $("#membrosAdd tbody #empty").length;
		if(nrMembroAdd == 1){
			addError( "<i class='fa fa-exclamation-triangle'></i> Não foi adicionado nenhum membro para este <strong>Conselho!</strong>", messages);
			valid = false;
		}
	}
	
	if(!valid) {
		errorMessage = '';
		messages.forEach(function(entry) {
			errorMessage += entry+'<br/>'; 
		});
		growAlert(" Alerta", errorMessage, "danger", "exclamation-triangle", 10000);
	}
	return valid;
}

function validaEdit(){
	clearStyleError("#formEdit");
	var messages = [];
	var nome = $("#nm_membroEdit");
	var cpf = $("#nr_cpfEdit");
	var matricula = $("#nr_matriculaEdit");
	var segmento = $("#segmentoEdit");
	var escolaridade = $("#escolaridadeEdit");
	var email = $("#email");
	var valid = true;
	
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
	if(matricula.val().trim() == "" && $("#panelMatricula").css('display') != "none"){
		matricula.addClass('ui-state-error');
		addError("O campo <strong>Matrícula</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	
	if(segmento.val().trim() == "0"){
		$("button[data-id=segmentoEdit]").addClass("ui-state-error");
		addError("O campo <strong>Segmento</strong> é de preenchimento obrigatório !", messages);
		valid = false;
	}
	if(escolaridade.val().trim() == "0"){
		$("button[data-id=escolaridadeEdit]").addClass("ui-state-error");
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

function submitSave(){
	if(validaConselho()){
		var cdUnidadeTrabalho = $("#nm_unidade_trabalho_id").val();
		var dtInicio = $("#dt_inicioM").val();
		var dtFim = $("#dt_fimM").val();
		
		var conselho = '{\'cd_unidade_trabalho\':\''+cdUnidadeTrabalho+'\',\'dt_inicio\':\' '+dtInicio+'\',\'dt_fim\':\' '+dtFim+'\'}';
		
		var json = getTableJson();
		
		arr = ['matricula','nome','cpf','segmento','escolaridade','email'];
		hidden = '<input type="hidden" name="addmembro" value="'+json+'" />'+
				 '<input type="hidden" name="conselho" value="'+conselho+'" />';
		
		$("#formInsertEdit").append(hidden);
		return true;
	}else{
		return false;
	}
}

function getTableJson(){
	var json = "[";
	arr = ['matricula','nome','cpf','segmento','escolaridade','email'];
	
	$("#membrosAdd tbody tr:not(#empty)").each(function(){
	  json = json+"{";
	  $(this).find("td:not(td:last-child)").each(function(key){
		 if(arr[key] == "segmento"){
			 json = json+"'"+arr[key]+"': '"+getSegmentoEscolaridade($(this).text(),"segmentoNew")+"',";
		 }else if(arr[key] == "escolaridade"){
			 json = json+"'"+arr[key]+"': '"+getSegmentoEscolaridade($(this).text(),"escolaridadeNew")+"',";
		 }else{
			 json = json+"'"+arr[key]+"': '"+$(this).text()+"',";
		 }
	  });
	   if(json.substring(json.length,json.length-1) == ","){
			json = json.substring(0,json.length-1)
	   }
	   
	  json = json+"},"  
	});
	
	if(json.substring(json.length,json.length-1) == ","){
		json = json.substring(0,json.length-1)
	}
	json = json+"]"
	return json
}

function getSegmentoEscolaridade(term, idSelect){
	var valor = 0;
	
	$("#"+idSelect+" option").each(function(){
	   if($(this).text().trim() == term.trim()){
		   valor = $(this).val();
	   }
	});
	
	return valor;
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

function prepareEdit(){
	$('#editMembro').modal();
}

function submitUpdate(){
	if(validaEdit()){
		var nm_membro = $("#nm_membroEdit").val();
		var nrSegmento = $("#segmentoEdit").val();
		var matricula = $("#nr_matriculaEdit").val();
		var cpf = $("#nr_cpfEdit").val();
		var nrEscolaridade = $("#escolaridadeEdit").val();
		var ci_membro = $("#idMembro").val();
		var mail = $("#email").val();
		var status = $("#statusEdit").val()
		
		var json= "{'ci_membro':'"+ci_membro+"','nm_membro':'"+nm_membro+"', 'nr_segmento':'"+nrSegmento+"'," +
				   "'nr_escolaridade':'"+nrEscolaridade+"', 'cd_aluno':'"+matricula+"', 'ds_email':'"+mail+"','nr_cpf':'"+cpf+"','fl_ativo':'"+status+"'}";
		
		var hidden= '<input name="membro" type="hidden" value="'+json+'"/>';
		
		$("#formEdit").append(hidden);
	}else{
		return false;
	}
}

function clearsearch(term){
	debugger;
	$(term+" input,"+term+" select").each(function(){
	     if(this.localName == 'select'){
	        $(this).val(0)
	     }else{
	       $(this).val("")
	     }
	})
}
