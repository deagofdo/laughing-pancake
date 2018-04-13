import {Component, OnInit} from '@angular/core';
// import { AntiPatternMasterComponent } from './anti-pattern-master/anti-pattern-master.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router:Router){

  }
  goToEdit(){
    console.log("In edit rule");
    
     //document.getElementById("menu3").style.display='block';
    this.router.navigate(['/edit'])
  }
}
