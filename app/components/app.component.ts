import { Component, Input } from '@angular/core';

import { HeaderComponent }   from './header.component';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {

    private _isLogado : boolean = true;

    get isLogado(): boolean {
        return this._isLogado;
    }

    set isLogado(value: boolean) {
        this._isLogado = value;
    }
}
