
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
angForm: FormGroup;
    constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) {
        this.angForm = this.fb.group({
        email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        name: ['', Validators.required, Validators.minLength(1)],
        firstname:['', Validators.required,Validators.minLength(1)],
        username: ['', Validators.required, Validators.minLength(4)],
        mobile: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    postdata(angForm1)
    {
        this.dataService.userregistration(
            angForm1.value.name,angForm1.value.email,angForm1.value.password,angForm1.value.username,angForm1.value.firstname)
        .pipe(first())
        .subscribe(
        data => {
            this.router.navigate(['login']);
        },

        error => {
        });
    }

    get email() { return this.angForm.get('email'); }
    get password() { return this.angForm.get('password'); }
    get name() { return this.angForm.get('name'); }
    get username() { return this.angForm.get('username'); }
    get firstname() { return this.angForm.get('firstname'); }
}