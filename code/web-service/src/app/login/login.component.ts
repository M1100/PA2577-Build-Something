import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin() {
    this.alertService.clear();
    this.http.post(`${environment.userServiceUrl}/login`, this.loginFormGroup.value)
      .subscribe(
        (response: any) => {
          this.alertService.success('Login successful!', { keepAfterRouteChange: true });
          localStorage.setItem('userId', response.userId);
        },
        error => {
          const errorMsg = error.error?.message || 'Invalid credentials!';
          this.alertService.error(errorMsg, { keepAfterRouteChange: true });
        }
      );
  }
}
