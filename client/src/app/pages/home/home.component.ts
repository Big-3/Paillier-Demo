import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bc from 'bigint-conversion';
import { PaillierPublicKey } from '@big3/ciber-modules';
import { Poll } from 'src/app/shared/interfaces/poll';
import { PollService } from 'src/app/shared/services/poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poll!: Poll;
  form!: FormGroup;
  isLoaded: Boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private pollService: PollService) { 
    this.form = formBuilder.group({
      opt: ['', Validators.required]
    });
    this.pollService.getPoll().subscribe(
      (value) =>{
        console.log(value);
        var pubKey = new PaillierPublicKey(
          bc.hexToBigint(value.publicKey.n), bc.hexToBigint(value.publicKey.n2), bc.hexToBigint(value.publicKey.g));
        this.poll = {
          pollName: value.pollName,
          options: value.options,
          pubKey: pubKey,
          result: value.result
        } as Poll;
        this.isLoaded = true;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
  }

  vote(): void{
      if(this.form!.valid){
        var rawVal = this.form?.controls['opt'].value;
        console.log(typeof rawVal);
        var cvote = bc.bigintToHex(this.poll!.pubKey.encrypt(BigInt(rawVal)));
        this.pollService.vote(cvote).subscribe(
          (val) => {
            console.log(val);
            this.router.navigateByUrl('/results');
          }
        );
    }
  }
}
