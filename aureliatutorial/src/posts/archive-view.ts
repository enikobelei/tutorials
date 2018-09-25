import { autoinject } from "aurelia-framework";
import { RouteConfig } from "aurelia-router";
import { Post } from "../common/services/models";
import { PostService } from "../common/services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class ArchiveView {    
  
  posts: Post[];
  archive: string;
 

  constructor(private postService: PostService, private ea: EventAggregator) {
   
  }

  activate(params: any, routeConfig: RouteConfig): Promise<any> {
   
    this.archive = params.archive;
   
    return this.postService.postsByArchive(this.archive)
      .then(data => {
          this.posts = data.posts;
          
       
      }).catch(error=> this.ea.publish('toast', {type:'error', msg: error.message}));
  }
}
