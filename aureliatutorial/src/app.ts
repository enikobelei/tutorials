import { I18N } from 'aurelia-i18n';
import { AuthorizeStep } from './pipline-steps/authorize-step';
import { AuthService } from './common/services/auth-service';
import { PostService } from './common/services/post-service';
import {autoinject} from "aurelia-dependency-injection";
import { PLATFORM } from 'aurelia-pal'; 
import * as moment from 'moment';

import {HttpClient} from 'aurelia-http-client'
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {RouterConfiguration, Router} from 'aurelia-router';
import * as toastr from "toastr";
import { signalBindings } from 'aurelia-binding';




@autoinject
export class App  {
  router: Router; 
  tags: string[];
  error: string;
  archives: string[];
  currentUser: string;
  subscription: Subscription;
  postSubscription: Subscription;
  toastSubscription: Subscription;
   
  constructor(
    private postService: PostService, 
    private authService: AuthService,
    private i81N:I18N,
    private ea: EventAggregator) {
  }

  attached(){
    
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    });
    this.postSubscription = this.ea.subscribe('post-updated', updatetedAt => {
      this.updateSidebar();
    })
    this.updateSidebar();

    this.toastSubscription = this.ea.subscribe('toast', toast => {
      toastr[toast.type](toast.msg);
    })

   
  }

  private updateSidebar() {
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {type:'error', msg: error.message})
     
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.ea.publish('toast', {type:'error', msg: error.message})
    });
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Eniko\'s Blog';
    config.addAuthorizeStep ( AuthorizeStep);
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'login',       name: 'login',       moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      { route: 'signup',       name: 'signup',       moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign In'},
      { route: 'create-post',       name: 'create-post',       moduleId: PLATFORM.moduleName('posts/create'), title: 'Create Post', settings: { auth: true } },
      { route: 'post/:slug',       name: 'post-view',       moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
      { route: 'post/:slug/edit',       name: 'post-edit',       moduleId: PLATFORM.moduleName('posts/edit'), title: 'Edit Post', settings: { auth: true } },
      { route: 'tag/:tag',       name: 'tag-view',       moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Posts by Tag'},
      { route: 'archive/:archive',       name: 'archive-view',       moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'View Posts by Archive'},
     
    ]);
    if(router.currentInstruction){
      console.log(router.currentInstruction.config.name);
      }
  }

  detached(){
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.toastSubscription.dispose();
  }

  logout(){
    this.authService.logout().then(data=> {
      console.log(data.success);
      this.ea.publish('user',null);
      this.ea.publish('toast', {type:'success', msg: "You have successfuly loged out"});
      this.router.navigateToRoute('home');
    }).catch(error=> {
      this.ea.publish('toast', {type:'error', msg: error.message})
    })
  }

  setLocale (locale:string){
    this.i81N.setLocale(locale).then(data=>{
      this.ea.publish('locale-changed', Date());
      signalBindings('locale-changed');
    });
   
  }
}
