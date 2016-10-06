import { Component} from '@angular/core';
@Component({
    selector: 'my-footer',
    templateUrl: './app/templates/footer.html'
})
export class FooterComponent {
    mensagem :String = "";
    error: boolean = false;

    enviar(): void {
        this.error = false;
    }
}
