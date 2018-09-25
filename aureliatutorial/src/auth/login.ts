import { Router } from 'aurelia-router';
import { AuthService } from "../common/services/auth-service";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Login {    
  name: string;
 

  constructor(private authService: AuthService, private router: Router, private ea: EventAggregator) {
    if(router.currentInstruction){
    console.log(router.currentInstruction.config.name);
    }
  }

  activate (){
    
  }

  login (){
   
    this.authService.login(this.name).then(data => { 
      this.ea.publish('user', data.user);
      this.router.navigateToRoute('home');
    }).catch(error=> {
      this.ea.publish('toast', {type:'error', msg: error.message})
      
    })
  }
}
