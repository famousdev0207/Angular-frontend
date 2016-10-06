import { Component} from '@angular/core';

import { Usuario } from '../model/usuario';

@Component({
    templateUrl: './app/views/login.html'
})
export class LoginComponent {
    private _sucesso: boolean = false;
    private _erro: boolean = false;
    private _mensagem: string = "";
    private usuario = new Usuario();

    debug(mensagem): string {
        return JSON.stringify(mensagem);
    }

    enviar(): void {
        this._sucesso = true;

        if(this._sucesso){
            this._mensagem = 'Formulario enviado. '+this.usuario.login;
        }else{
            this._erro = true;
            this._mensagem = 'Erro formulário';
        }

        this.debug(this._mensagem);
    }
}
