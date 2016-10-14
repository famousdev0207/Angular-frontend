import { Component} from '@angular/core';
@Component({
    selector: 'my-header',
    templateUrl: './app/templates/header.html'
})

export class HeaderComponent {
    private title:string = 'Tour of Heroes';
    private subtitle:string = 'Windstorm';
}
