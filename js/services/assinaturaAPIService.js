angular.module("assinaturaEletronica").factory("assinaturaAPI", function ($http) {

    let _setAssinatura = function (codigoAssinatura) {
        return "Assinatura Salva"
    }

    return {
        setAssinatura: _setAssinatura
    };

});