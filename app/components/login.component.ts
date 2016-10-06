import { Component} from '@angular/core';

import { Usuario } from '../model/usuario';

@Component({
    templateUrl: './app/views/login.html'
})
export class LoginComponent {
    private _sucesso: boolean = false;
    private _erro: boolean = false;
    private _mensagem: string;
    private usuario = new Usuario();

    debug(): string {
        if(this._erro){
            this._mensagem = 'Erro no formulario';
        }

        return JSON.stringify(this._mensagem);
    }
}
