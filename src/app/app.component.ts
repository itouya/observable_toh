import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

// import '../styles.scss';

@Component({
  selector: 'app-root', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
