import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {error} from 'util';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {
  checkoutForm;
  error: boolean;
  constructor( private formBuilder: FormBuilder, private route: Router, private authService: AuthenticationService) {
    this.checkoutForm = this.formBuilder.group({
      login: '',
      password: ''
    });
  }
  testSubmit() {
    const val = this.checkoutForm.value;
    this.authService.authenticate(val.login, val.password).subscribe(
      () => this.route.navigate(['/profile/' + val.login],
        ),
      () => this.error = true);
  }

  ngOnInit() {
  }

}
