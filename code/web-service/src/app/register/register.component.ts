import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  handleRegister() {
    this.http.post(`${environment.userServiceUrl}/register`, this.registerFormGroup.value)
      .subscribe(
        () => this.alertService.success('User registered successfully!', { keepAfterRouteChange: true }),
        () => this.alertService.error('Error registering user!', { keepAfterRouteChange: true })
      );
  }
}
