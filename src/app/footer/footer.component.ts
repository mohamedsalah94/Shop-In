import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  error: any = null;

  constructor() { }

  ngOnInit(): void {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    $('.subscribe button').click(()=>{
      if (regex.test($('.subscribe input').val()) ) {
        $('.subscribe button svg').removeClass("far fa-paper-plane fas fa-times").addClass("fas fa-check").css('color',"green");
        $(".subscribe input").val(null);
        this.error = null
      }
      else{
        this.error = "please enter a valid email"
        $('.subscribe button svg').removeClass("fas fa-check far fa-paper-plane").addClass("fas fa-times").css('color',"red");
      }
       $('.subscribe button').css({'box-shadow':"none",'outline':"0"});
    })

    $('.subscribe button').click(()=>{
      setTimeout(() => {
        $('.subscribe button svg').removeClass("far fa-paper-plane fas fa-times fas fa-check").addClass("far fa-paper-plane").css('color',"#8D8D8D")
      }, 2000);
    });
  }

}
