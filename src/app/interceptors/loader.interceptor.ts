import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private readonly dialogService: NbDialogService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(request.reportProgress){
      const dialog = this.dialogService.open(LoaderComponent, { closeOnEsc: false, closeOnBackdropClick: false });
      return next.handle(request).pipe(finalize(() => dialog.close()));
    }
    
    return next.handle(request);
  }
}
