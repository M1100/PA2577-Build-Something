import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-root',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  commentFormGroup!: FormGroup;
  reviews: any[] = [];
  selectedReviewId: string = '';


  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.fetchReviews();
  }
  ngOnInit(): void {
    this.commentFormGroup = this.formBuilder.group({
      commentText: ['', Validators.required],
    });
  }

  fetchReviews() {
    this.http.get(`${environment.reviewServiceUrl}/get-reviews`)
      .subscribe((data: any) => {
        this.reviews = data;
      }, error => {
        console.error('Failed to fetch reviews', error);
      });
  }

  selectReview(reviewId: string) {
    this.selectedReviewId = reviewId;
  }

  handlePostComment() {
    this.http.post(`${environment.commentServiceUrl}/post-comment`, {
      reviewId: this.selectedReviewId,
      commentText: this.commentFormGroup.value.commentText,
      username: localStorage.getItem('userName')
    })
      .subscribe(
        () => this.alertService.success('Comment posted successfully!'),
        () => this.alertService.error('Error posting comment!')
      );
  }
}
