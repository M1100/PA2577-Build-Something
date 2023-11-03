import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'review', component: AddReviewComponent, canActivate: [authGuard] },
    { path: 'comment', component: AddCommentComponent, canActivate: [authGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }