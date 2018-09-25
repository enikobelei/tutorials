import { PostService } from './../common/services/post-service';
import { autoinject } from "aurelia-framework";
import { RouteConfig } from 'aurelia-router';
import { Post } from '../common/services/models';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class TagView {    
  error: string;
  posts: Post[];
  tag: any;
  title: string;
  
  constructor(private postService: PostService, private ea: EventAggregator) {
   
  }

  activate(params: any, routeConfig: RouteConfig): Promise<any> {
    this.error = '';
    this.tag = params.tag
    this.title = `Viewing posts by ${this.tag}`;
    return this.postService.postsByTag(this.tag)
      .then(data => {
          this.posts = data.posts;
          
       
      }).catch(error=> this.ea.publish('toast', {type:'error', msg: error.message}));
  }

}
