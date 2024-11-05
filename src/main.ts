import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppmoduleModule } from './app/appmodule.module';


platformBrowserDynamic().bootstrapModule(AppmoduleModule)
.catch(err => console.error(err)
);