import { Component} from '@angular/core';

import { Usuario } from '../model/usuario';

@Component({
    templateUrl: './app/views/login.html'
})
export class LoginComponent {
    private _sucesso: boolean = false;
    private _erro: boolean = false;
    private _mensagem: string = "";
    private tipoaleta: string = "";
    private usuario = new Usuario();

    debug(): string {
        return this._mensagem;
    }

    enviar(): void {

        this._mensagem = 'Formulario enviado. '+this.usuario.login;
        this.tipoaleta = "alert-success";
        if(this.usuario.login != 'nagpaulo'){
            this._erro = true;
            this.tipoaleta = "alert-danger";
            this._mensagem = 'Usuario ou Senha inválida.';
        }

        this.debug();
    }
}
