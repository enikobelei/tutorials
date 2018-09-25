
import { PostService } from '../common/services/post-service';
import { autoinject } from 'aurelia-framework';
import { Post } from '../common/services/models';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Create {    
  post: Post;
  title: string;
  
  constructor(private postService: PostService, private router: Router, private ea: EventAggregator) {
   
  }

  attached () {
    this.post = new Post("","","","",[],null);
    this.title = 'create-post';
  }

  
  createPost(){
    this.postService.create(this.post).then(data=> {
      this.ea.publish('post-updated', Date())
      this.ea.publish('toast', {type:'success', msg: "Post Created"});
      this.router.navigateToRoute("post-view", {slug: data.slug});
    }).catch(error => {
      this.ea.publish('toast', {type:'error', msg: error.message})
    });
    
  }

  
}
