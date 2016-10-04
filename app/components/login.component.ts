import { Component} from '@angular/core';
@Component({
    templateUrl: './views/login.html'
})
export class LoginComponent {
    mensagem :String = "";
    error: boolean = false;

    enviar(): void {
        this.error = false;
    }
}
