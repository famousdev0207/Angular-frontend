/**
 * Created by Paulo Roberto on 28/06/2015.
 */


$(document).ready(function() {
    $("#btn_agenda").click(function(){
        $('.selectpicker').selectpicker();
        $('#formInsertEdit').submit();
        //$('#painel_agenda').modal('hide');
    });

    $('#calendar').fullCalendar({
        weekends: true,
        lang: 'pt-BR',
        firstHour: 8,
        minTime: "08:00:00",
        maxTime: "22:00:00",
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        allDayText: 'Dia Inteiro',
        defaultView: 'agendaWeek',
        axisFormat: 'H:mm',
        hiddenDays: [0],
        slotDuration: '00:15:00',
        buttonText: {
            today: 'hoje',
            month: 'mês',
            week: 'semana',
            day: 'dia'
        },
        timeFormat: 'h:mm',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        columnFormat: {
            month: 'ddd',
            week: 'ddd D/MM',
            day: 'dddd'
        },
        timeFormat: {
            '': 'H(:mm)',
            agenda: 'H:mm'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            $("#painel_agenda").modal('show');
            $("#dt_agenda").val(start.toISOString().substr(0, 10).split('-').reverse().join('/'));
            $("#nr_horario_inicio").val(moment(start).format("HH:mm"));
            $("#nr_horario_fim").val(moment(end).format("HH:mm"));
            $("#duracao").val(duracao($("#nr_horario_inicio").val(),$("#nr_horario_fim").val()));
            $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        events: 'agenda/partials/getAgenda',
        eventClick: function(event) {
            var id = event.id;
            $.ajax({
                url: "agenda/partials/get_event",
                dataType:"json",
                type: "POST",
                data: {id:id},
                success: function(json){
                    console.log(json);
                    $("#nm_cliente").val(json.nm_cliente).attr("disabled", "disabled");
                    $("#nm_cliente_id").val(json.ci_cliente);
                    $("#dt_agenda").val(json.dt_agendacalendar);
                    $("#fl_status option[value = "+json.fl_status+"]").attr("selected", "selected");
                    $("#nr_horario_inicio").val(json.nr_horario_inicio);
                    $("#nr_horario_fim").val(json.nr_horario_fim);
                    $("#duracao").val(duracao($("#nr_horario_inicio").val(),$("#nr_horario_fim").val()));
                    $("#ds_descricao").val(json.ds_descricao);
                    $("#form").val(json.ci_agenda);
                    $('#calendar').fullCalendar('unselect');
                    $("#painel_agenda").modal('show');
                }
            });
        },
        eventDrop: function(event, delta, revertFunc) {
            var start = event.start;
            var end = event.end;
            $.ajax({
                url: "agenda/partials/set_eventDrop",
                data:{
                    id: event.id,
                    cliente: event.title,
                    dt_agenda: end.toISOString().substr(0, 10).split('-').reverse().join('/'),
                    nr_horario_inicio: moment(start).format("HH:mm"),
                    nr_horario_fim: moment(end).format("HH:mm")
                },
                dataType: "json",
                type: "POST",
                success: function(data){
                    if(data.result == "true"){
                        growAlert("Agenda", "Agenda salvo com sucesso.", 'success', 'exclamation-triangle', 2000);
                    }else{
                        growAlert("Agenda", "Erro ao salvar agenda.", 'danger', 'exclamation-triangle', 2000);
                    }
                }
            });
        },
        eventResize: function(event, delta, revertFunc) {
            var end = event.end;
            $.ajax({
                url: "agenda/partials/set_eventResize",
                data:{
                    id: event.id,
                    cliente: event.title,
                    nr_horario_fim: moment(end).format("HH:mm")
                },
                dataType: "json",
                type: "POST",
                success: function(data){
                    if(data.result == "true"){
                        growAlert("Agenda", "Agenda salvo com sucesso.", 'success', 'exclamation-triangle', 2000);
                    }else{
                        growAlert("Agenda", "Erro ao salvar agenda.", 'danger', 'exclamation-triangle', 2000);
                    }
                }
            });
        }
    });
    $('#timeInicio').clockpicker({
        placement: 'top',
        align: 'left',
        autoclose: true,
        init: function() {
            console.log("colorpicker initiated");
        },
        beforeShow: function() {
            console.log("before show");
        },
        afterShow: function() {
            //console.log("after show");
            disabledHour();
        },
        beforeHide: function() {
            console.log("before hide");
        },
        afterHide: function() {
            console.log("after hide");
        },
        beforeHourSelect: function() {
            console.log("before hour selected");
        },
        afterHourSelect: function() {
            console.log("after hour selected");
        },
        beforeDone: function() {
            console.log("before done");
        },
        afterDone: function() {
            console.log("after done");
        }
    }).find('input').change(function(){
        $(".clockpicker-dial.clockpicker-hours .clockpicker-tick").each(function(){
            var hour = parseInt($(this).text());
            if(hour < 8 || hour >=20){
                growModal("Hora Inválida", "A hora deve ser maior que 8 e menor igual a 20", "danger", 'exclamation-triangle', $("#painel_agenda"),8000);
                $(this).attr("disabled", "disabled");
            }
        });
    });

    $('#timeFim').clockpicker({
        placement: 'top',
        align: 'left',
        autoclose: true,
        init: function() {
            console.log("colorpicker initiated");
        },
        beforeShow: function() {
            console.log("before show");
        },
        afterShow: function() {
            //console.log("after show");
            disabledHour();
        },
        beforeHide: function() {
            console.log("before hide");
        },
        afterHide: function() {
            console.log("after hide");
        },
        beforeHourSelect: function() {
            console.log("before hour selected");
        },
        afterHourSelect: function() {
            console.log("after hour selected");
        },
        beforeDone: function() {
            console.log("before done");
        },
        afterDone: function() {
            console.log("after done");
        }
    }).find('input').change(function(){
        // TODO: time changed
        console.log(this.value);
    });
});

function duracao(start,end){
    s = start.split(':');
    e = end.split(':');

    min = e[1]-s[1];
    hour_carry = 0;
    if(min < 0){
        min += 60;
        hour_carry += 1;
    }
    hour = e[0]-s[0]-hour_carry;
    time = (parseInt(hour)*60)+parseInt(min);
    //diff = hour + ":" + min;
    return time+" minutos";
}

function disabledHour() {
    $(".clockpicker-dial.clockpicker-hours .clockpicker-tick").each(function(){
        var hour = parseInt($(this).text());
        if(hour < 8 || hour >=20){
            $(this).attr("disabled", "disabled");
        }
    });
}


var dados;
$('#nm_cliente').typeahead({
    source: function (query, process) {
        unidades = [];
        map = {};
        $.get(
            'agenda/partials/paciente_json',
            {'term':$('#nm_cliente').val()},
            function(data){
                $.each(data, function (i, unidade) {
                    map[unidade.label] = unidade;
                    unidades.push(unidade.label);
                });
                process(unidades);
            },'json'
        );
    },
    updater: function (item) {
        selectedId = map[item].id;
        $('#nm_cliente_id').val(selectedId);
        $('#cliente-load').addClass('has-success has-feedback').find('input:eq(0)').prop('disabled', true);
        $('#cliente-load').find('.form-control-feedback').removeClass('hidden');
        $('#edit-cliente').prop('disabled', false).click(function(){
            $(this).prop('disabled', true);
            $('#cliente-load').removeClass('has-success has-feedback').find('input:eq(0)').prop('disabled', false).val('');
            $('#cliente-load').find('.form-control-feedback').addClass('hidden');
            $('#cliente-load').find('input:eq(1)').val('');
        });
        return item;
    }
});


function addError(message){
    if(message!=undefined && messages.indexOf(message)==-1) {
        messages.push(message);
    }
}
function limparValidacao(){
    $("#formInsertEditModal").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });
}


function testModal(){
    messages = [];
    var valid = true;
    var nm_cliente = $("#nm_cliente_");
    var nr_telefone_residencial = $("#nr_telefone_residencial");

    $("#formInsertEditModal").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });

    if (nm_cliente.val().trim() == '') {
        nm_cliente.parent().addClass('has-error');
        addError("O Campo <strong>Nome Completo</strong> está vazio");
        valid = false;
    }

    if (nr_telefone_residencial.val().trim() == '') {
        nr_telefone_residencial.parent().addClass('has-error');
        addError("O Campo <strong>Telefone Residencial</strong> está vazio");
        valid = false;
    }

    if(!valid) {
        errorMessage = '';
        messages.forEach(function(entry) {
            errorMessage += entry+';<br/>';
        });

        growModal(" Alerta", errorMessage, "warning", "exclamation-triangle", $("#cadastroCliente .alert-modal"), 5000)
    }

    return valid;
}
function test(){
    messages = [];
    var valid = true;
    var nm_cliente = $("#nm_cliente");

    $("#formInsertEditModal").find("input,select,textarea").each(function(index){
        $(this).parent().removeClass("has-error");
    });

    if (nm_cliente.val().trim() == '') {
        nm_cliente.parent().addClass('has-error');
        addError("O Campo <strong>Nome Completo</strong> está vazio");
        valid = false;
    }

    if(!valid) {
        errorMessage = '';
        messages.forEach(function(entry) {
            errorMessage += entry+';<br/>';
        });

        growModal(" Alerta", errorMessage, "warning", "exclamation-triangle", $("#painel_agenda .alert-modal"), 5000)
    }

    return valid;
}