import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import routeConfig from "./app/routes"
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { App } from './app/app';
import { authInterceptor } from './app/Interceptors/auth-interceptor';

bootstrapApplication(App, {
  providers: [provideRouter(routeConfig), provideHttpClient(withInterceptors([authInterceptor]))]
}).catch((err) => console.error(err));
