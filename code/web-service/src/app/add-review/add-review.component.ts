import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-root',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  reviewFormGroup!: FormGroup;


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }
  ngOnInit(): void {
    this.reviewFormGroup = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      reviewText: ['', Validators.required],
    });
  }

  handlePostReview() {
    this.http.post(`${environment.reviewServiceUrl}/post-review`, { ...this.reviewFormGroup.value, username: localStorage.getItem('userName') })
      .subscribe(
        (response: any) => {
          this.alertService.success('Review posted successfully!');
        },
        () => this.alertService.success('Error posting review!')
      );
  }
}
