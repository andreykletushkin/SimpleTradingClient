import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  name;
  profileForm;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.profileForm = formBuilder.group({
      id: ' ',
      firstName: ' ',
      secondName: ' ',
      birthday: ' ',
      country: ' ',
      description: ' '
    });
  }

  save() {
    this.httpClient.put('http://localhost:8080/profile', this.profileForm.value).subscribe(response => {
      console.log('Profile sumbitted succesfuly');
    });
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.name = params.id;
      this.httpClient.get('http://localhost:8080/profile/' + params.id).subscribe(userDetails => {
        console.log(userDetails['id']);
        const t = new Date(userDetails['birthday']);
        const date = new Date(t.getFullYear(), t.getMonth(), t.getDate());
        this.profileForm.patchValue({
          id: userDetails['id'], firstName: userDetails['firstName'],
          secondName: userDetails['secondName'],
          birthday: date,
          country: userDetails['country'],
          description: userDetails['description']
        });
      });
    });
  }

}
