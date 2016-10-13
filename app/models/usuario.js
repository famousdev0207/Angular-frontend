"use strict";
/**
 * Created by Paulo Roberto on 05/10/2016.
 */
var Usuario = (function () {
    function Usuario(login, senha, email, cpf) {
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.cpf = cpf;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map