import { AuthService } from './../common/services/auth-service';
import { NavigationInstruction, Next, Redirect } from "aurelia-router";
import { autoinject } from "aurelia-framework";

@autoinject
export class AuthorizeStep {

  constructor(private authService: AuthService){

  }

  run(navigationInstruction: NavigationInstruction, next: Next) {
    console.log(navigationInstruction.config.name);
    if(navigationInstruction.getAllInstructions().some(i=>i.config.settings.auth)){
      if(!this.authService.currentUser)  {
        return next.cancel(new Redirect('login'));
      }
    }
    return next();
  }
}
