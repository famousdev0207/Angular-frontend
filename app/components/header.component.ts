import { Component} from '@angular/core';
@Component({
    selector: 'my-header',
    templateUrl: './app/templates/header.html'
})
export class HeaderComponent {
    title = 'Tour of Heroes';
    subtitle = 'Windstorm';
}
