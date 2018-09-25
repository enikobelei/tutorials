import { AuthService } from "../common/services/auth-service";
import { autoinject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class Signup {    
  name: string;
 
  
  constructor(private authService: AuthService, private router: Router, private ea: EventAggregator) {
   
  }

  signup(){
   
    this.authService.signup(this.name).then(data=> {
      this.ea.publish('user', data.user);
      this.router.navigateToRoute('home');
    }).catch(error => this.ea.publish('toast', {type:'error', msg: error.message}));
  }
}
