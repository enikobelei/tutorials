import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal'; 

export class App {
  country: string;
  router: Router; 
  constructor (){
    console.log("calling app contructor");
    this.country = ''
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
  
    config.map([
      { route:'',       name: 'home',       moduleId: PLATFORM.moduleName('home'), title: 'Home'},
     
      { route: 'hello-world/:country',       name: 'hello-world',       moduleId: PLATFORM.moduleName('hello-world'), title: 'Hello', activationStrategy: 'replace' },
     
    ]);
    
  }

  greet(){
    this.router.navigateToRoute(
      "hello-world",
      {
        country: this.country
      },
      { trigger: true },
    );
  }
}
