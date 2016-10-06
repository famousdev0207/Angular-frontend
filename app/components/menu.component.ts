import { Component} from '@angular/core';
@Component({
    selector: 'my-menu',
    templateUrl: './app/templates/menu.html'
})
export class MenuComponent {
    mensagem :String = "";
    error: boolean = false;

    enviar(): void {
        this.error = false;
    }
}
