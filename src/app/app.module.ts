import { CoreService } from './lib/core.service';
import { UserService } from './lib/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './lib/error.interceptor';
import { JwtInterceptor } from './lib/jwt.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { ProductService } from './productservice';

import { TableModule} from 'primeng/table';
import { ToastModule} from 'primeng/toast';
import { CalendarModule} from 'primeng/calendar';
import { SliderModule} from 'primeng/slider';
import { MultiSelectModule} from 'primeng/multiselect';
import { ContextMenuModule} from 'primeng/contextmenu';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule} from 'primeng/button';
import { DropdownModule} from 'primeng/dropdown';
import { ProgressBarModule} from 'primeng/progressbar';
import { InputTextModule} from 'primeng/inputtext';
import { FileUploadModule} from 'primeng/fileupload';
import { ToolbarModule} from 'primeng/toolbar';
import { RatingModule} from 'primeng/rating';
import { RadioButtonModule} from 'primeng/radiobutton';
import { InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ApiService } from './lib/api.service';;
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent ,
    RegistrationComponent ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ProductService, MessageService, ConfirmationService, ApiService, UserService, CoreService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
