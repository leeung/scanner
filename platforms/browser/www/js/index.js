
var app = {
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('click', this.consultaProduto, false);
    },

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent2: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    consultaProduto: function (id) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                /*alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);*/
                app.getEPI(result.text);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    },

    getEPI: function (cod) {
        $.ajax({
            url: "http://192.168.0.200/srvbuscapreco/index.php/Consulta/consultaproduto/" + cod + "/010115/001",
            type: "POST",
            dataType: "json"
        }).done(function (resposta) {
            $('#img').html('<img src="http://192.168.0.200/srvbuscapreco/assets/imagens_produtos/'+resposta.result.IMG+'">');
            $('#barra').html(resposta.result.EAN);
            $('#codigo').html(resposta.result.CODIGO);
            $('#descricao').html(resposta.result.DESCRICAO);
            $('#varejo').html("VAREJO: "+resposta.result.VAREJO);
            $('#atacado').html("ATACADO: "+resposta.result.ATACADO);
        }).fail(function (jqXHR, textStatus) {
            console.log('falhou')
        }).always(function () {
            console.log('concluiu');
        });

    }

};
