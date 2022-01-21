angular.module("assinaturaEletronica").controller("signatureCtrl", function ($scope, $http, assinaturaAPI) {

    $scope.codigoAssinatura;

    // Blob - Pseudoprotocolo que permite objetos Blob e file sejam usados como fonte de URL para coisas como imagens
    // links de downloads e dados binários
    // Font: https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used
    // Converte de URL para Blob
    function dataURLToBlob(dataURL) {

        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(":")[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        // Retorna um file Blob
        return new Blob([uInt8Array], { type: contentType });
    }

    // Define estilos de interação com Canvas
    var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0,0,0)'
    });

    // *********************************************************************************Limpar

    // Botão de limpar o documento
    var cancelButton = document.getElementById('limpar');

    // Função que limpa a assinatura desenhada
    cancelButton.addEventListener('click', function (event) {
        signaturePad.clear();
        $("#verCodigoAssinatura").val('');
    });

    // *********************************************************************************Download

    // Botão que vai efetuar o download
    var downloadButton = document.getElementById('baixar');

    // Função que efetua o Download da assinatura
    function download(dataURL, filename) {

        // Verifica Qual é o Navegador do Usuário
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
            window.open(dataURL);
        } else {
            // Converte a URL vindo e transforma em Blob
            var blob = dataURLToBlob(dataURL);
            // Cria um Objeto de Url
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        }
    }

    // Função que efetua o download em png da assinatura
    downloadButton.addEventListener('click', function (event) {
        if (signaturePad.isEmpty()) {
            alert("Faça sua assinatura");
        } else {
            var dataURL = signaturePad.toDataURL();

            // Chama a função que efetua o download e a salva como "assinatura.jpeg"
            download(dataURL, "Assinatura.webp");
        }
    });

    // *********************************************************************************Salvar

    // Botão de salvar o documento
    var saveButton = document.getElementById('salvar');

    // Função que salva a assinatura
    saveButton.addEventListener("click", function (event) {
        // Se o campo Canvas estiver vazio
        if (signaturePad.isEmpty()) {
            alert("Faça sua assinatura");
            // Se não estiver vazio ele irá salvar
        } else {
            var dataURL = signaturePad.toDataURL();
            // alert(dataURL); Debug
            $("#verCodigoAssinatura").val(dataURL);

            $scope.enviaAssinatura(dataURL);
        }
    });

    // Função que envia para o back-end
    $scope.enviaAssinatura = function (dataURL) {
        // Salva na variável de escopo
        $scope.codigoAssinatura = dataURL;
        assinaturaAPI.setAssinatura($scope.codigoAssinatura).success(function (data) {
            delete $scope.codigoAssinatura;
        });

        // Envia para o back end
        // $http.post('salvaImagem/salvaImagem.php', { img: dataURL }).then(successCallback, errorCallback);

        // Função caso retorne sucesso ------------------------------------
        // function successCallback(response) {
        //     console.log("Função que envia " + response.data);
        //     console.log("Base64 " + dataURL);
        // }
        // 
        // Função caso retorne erro ---------------------------------------
        // function errorCallback(error) {
        //     $(".onlyload").fadeOut(200);
        //     $(".anerror").fadeIn(200);
        //     $('.anerror b').html("Houve um erro ao salvar a imagem: " + error);
        //     // listarImgs();
        //     // $scope.resetEditor();
        //     // $scope.showToastMessage('Não foi possível adicionar a imagem.');
        // }
    }

});
