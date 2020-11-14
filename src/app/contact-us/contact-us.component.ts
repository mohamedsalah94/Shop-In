import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  sendMessage :FormGroup = new FormGroup({
    'fullName' : new FormControl(null, [Validators.required]),
    'emailMessage' : new FormControl(null, [Validators.required,Validators.email]),
    'phone' : new FormControl(null),
    'subject' : new FormControl(null, Validators.required),
    'message' : new FormControl(null,[Validators.pattern(/^[A-Za-z\d]{1,}$/),Validators.required]),
  })

  constructor() { }

  getMessage(sendMessage){
    console.log(sendMessage.value)
  }

  ngOnInit(): void {

    // text area remaining letters
    let max30 = document.getElementById("max30");
    let textArea = document.getElementById("textArea");
    let maxLength = textArea.getAttribute("maxlength");

    function calcMaxLength() {
      max30.innerHTML = this.maxLength - this.value.length + " lettre remaining";
  
      if (max30.innerHTML == "0 lettre remaining") {
          max30.classList.replace("text-muted", "text-danger");
      } else {
          max30.classList.replace("text-danger", "text-muted");
      }
  };
  
  textArea.addEventListener("input", calcMaxLength);
  }

}