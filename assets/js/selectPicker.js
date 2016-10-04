$.fn.selectPicker = function(params){
	console.log(this);
	var _addAll= function(){
		
		
	}
	
	return {
		addAll: _addAll 
	};
}



$("divtal").selectPicker();

//Adiciona os elementos nos picklists
   	function addAll(){
   		options = $('#alunos_disp option');
		for (var i=0; i < options.length; i++){
			
			if(!jaExiste($(options[i]), $('#alunos_adic option'))){
   				if($('#alunos_adic option').length < $("#qtd-alunos").val()){
   					$('#alunos_adic').append($(options[i]));
   				}else{
   					alert("Tavez alguns alunos não foram adicionados, pois você atingiu o limite máximo de alunos permitidos!");
   					break;
   				}
   			}
   			$(this).attr("selected", false);
		}
   		$('#info-alunos1').html('');
		ordena('#alunos_disp');
		ordena('#alunos_adic');
   	}

   	function addOne(){
   		$('#alunos_disp option:selected').each(function() {
   			if(!jaExiste($(this), $('#alunos_adic option'))){
   				if($('#alunos_adic option').length < $("#qtd-alunos").val()){
   					$('#alunos_adic').append($(this));
   					$(this).attr("selected", false);
   				}else{
   					alert("O aluno não pode ser adicionado pois você atingiu a quantidade máxima de alunos para essa turma!")
   				}
   			}else{
   				$(this).remove();
   				$('#alunos_disp').scrollTop(0);
   			};
		});
		ordena('#alunos_adic');
		$('#info-alunos1').html('');
   	}

   	function removeAll(){
		$('#alunos_adic option').each(function() {
   			if(jaExiste($(this), $('#alunos_disp option'))){
				$(this).remove();
			}else{
				$('#alunos_disp').append($(this));
			}
			$(this).attr("selected", false);
		});
		$('#alunos_adic').html('');
		ordena('#alunos_disp');
		$('#info-alunos2').html('');
   	}   

   	function removeOne(){
   		$('#alunos_adic option:selected').each(function() {
   			if(jaExiste($(this), $('#alunos_disp option'))){
				$(this).remove();
			}else{
				$('#alunos_disp').append($(this));
			}
			$(this).attr("selected", false);
		});
		ordena('#alunos_disp');
		$('#info-alunos2').html('');
   	}

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
   		var options = $(elemento).find('option');
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		options.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});

		$("#alunos_disp option").off();
		$("#alunos_adic option").off();

		$("#alunos_disp option").click(function(){
			exibeAluno($(this).val(), 1);
		});
		$("#alunos_adic option").click(function(){
			exibeAluno($(this).val(), 2);
		});

		$('#alunos_disp option').dblclick(addOne);

	    $('#alunos_adic option').dblclick(removeOne);

	    atualizaQuantidades();
   	}  