import { Component} from '@angular/core';
@Component({
    selector: 'my-header',
    templateUrl: './templates/header.html'
})
export class HeaderComponent {
    mensagem :String = "";
    error: boolean = false;

    enviar(): void {
        this.error = false;
    }
}
