import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {
  username;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['id'];
  }

}
