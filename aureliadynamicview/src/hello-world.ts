import { bindable, PLATFORM } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";

export class HelloWorld {
  country: string;
    
  constructor() { 
    console.log("calling hello world contructor");
  }

  activate(params: any, routeConfig: RouteConfig){
    this.country = params.country;
    console.log(`calling hello world activate, country: ${this.country}`);
   
  }


  getViewStrategy() {
    console.log(`calling hello world getViewStrategy, country: ${this.country}`);
    if( this.country.toUpperCase() === 'UK' )
      return  PLATFORM.moduleName('./alternative-hello-world.html');
    else
      return PLATFORM.moduleName('./hello-world.html');
  }
}
