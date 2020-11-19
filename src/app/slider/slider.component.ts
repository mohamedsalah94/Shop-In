import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    // $('.carousel-control-next').click(changeNumbersOfSlider)
    // $('.carousel-control-prev').click(changeNumbersOfSlider2)


    // function changeNumbersOfSlider() {

    //   if (    $('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/backpack_PNG6359.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp  animate__faster'>2</div>`)
    //   } 
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/backpack_PNG63591.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>3</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/jacket_PNG8052.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>4</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/polo_shirt_PNG8158.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>5</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src')== "../../assets/images/running_shoes_PNG5815.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>1</div>`)
    //   }
    // }


    // function changeNumbersOfSlider2() {

    //   if (    $('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/backpack_PNG6359.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>5</div>`)
    //   } 
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/backpack_PNG63591.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>1</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/jacket_PNG8052.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>2</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src') == "../../assets/images/polo_shirt_PNG8158.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>3</div>`)
    //   }
    //   else if($('.carousel-item').filter(':visible').find('img').attr('src')== "../../assets/images/running_shoes_PNG5815.png" ) {
    //     $('.numbers').html(`<div class='numbers animate__animated animate__fadeInUp animate__faster'>4</div>`)
    //   }
    // }
    

  }

  }