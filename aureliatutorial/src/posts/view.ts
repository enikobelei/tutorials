import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from './../common/services/auth-service';
import { PostService } from 'common/services/post-service';
import { autoinject } from 'aurelia-framework';
import { RouteConfig, Router } from 'aurelia-router';
import { Post } from 'common/services/models';

@autoinject
export class View {    
 
  error:string;
  post: Post;
  
  constructor(private postService: PostService, private authService: AuthService, 
    private ea: EventAggregator, private router: Router) {  }

  activate(params: any, routeConfig: RouteConfig): Promise<any> {
    this.error = '';
    return this.postService.find(params.slug)
      .then(data => {
          this.post = data.post;
          routeConfig.navModel.setTitle(data.post.title);
       
      }).catch(error=> {
        this.router.navigateToRoute('home');
        this.ea.publish('toast', {type:'error', msg: error.message})
      });
  }

}
