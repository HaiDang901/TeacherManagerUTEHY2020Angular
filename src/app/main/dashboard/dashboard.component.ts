import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';
// import * as CanvasJS from 'canvasjs';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user=this.authenticationService.userValue;
  //   $(function(){
  //     $('html').append('<img id="halo" title="Happy Noel" style="opacity: 0.6;cursor:pointer;position:fixed;z-index:99999" height="265" src="../../../assets/img/ImgTeacher/tuanloc.jpg"/>')
  //     setInterval(function(){
  //        var $X=Math.ceil(Math.random()*$(window).width())
  //        var $Y=Math.ceil(Math.random()*$(window).height())
  //        $('img#halo').animate({'left':$X,'top':$Y},5000)
  //     },5000)
  //     $('img#halo').click(function(){
  //         window.open('../../../assets/img/ImgTeacher/tuanloc.jpg','')
  //     })
  //  })
  }
}
