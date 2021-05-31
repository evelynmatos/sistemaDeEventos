import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  desenvolvedor = '© Copyright 2021 Evelyn Matos. Todos os direitos reservados';
  linkedin = 'https://www.linkedin.com/in/evelynmatos/'
  github =  'https://github.com/evelynmatos';
  email =  'https://mail.google.com/mail/u/0/?ogbl#inbox?compose=GTvVlcSMVkjNtxRqkMWgvvwmFvtHHrJQXHGtlwZbRvrzgfpBDrpLNbLgxqNTFBlGKblTNFfnBDMhW';

  constructor() { }

  ngOnInit(): void {}

}
