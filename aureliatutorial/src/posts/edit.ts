import { AuthService } from './../common/services/auth-service';
import { autoinject } from "aurelia-framework";
import { PostService } from "../common/services/post-service";
import { Post } from "../common/services/models";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";

@autoinject
export class Edit {    
  post: Post;
  title: string;
  
  constructor(private postService: PostService, private router: Router, private ea: EventAggregator, private authService: AuthService) {
    
  }

  attached () {
    //this.post = new Post("","","","",[],null);
    this.title = 'edit-post';
  }

  activate(params: any){
    this.postService.find(params.slug).then(data=>{
      if(this.authService.currentUser !== data.post.author){
        this.router.navigateToRoute('home');
      }
      this.post = data.post;
    }).catch(error=> {
      this.ea.publish('toast', {type:'error', msg: "Post Not Found"});
      this.router.navigateToRoute('home');
    });

   
  }

  
  editPost(){
    this.postService.update(this.post).then(data=> {
      this.ea.publish('post-updated', Date())
      this.router.navigateToRoute("post-view", {slug: data.slug});
      this.ea.publish('toast', {type:'success', msg: "Post Updated"})
    }).catch(error => {
      this.ea.publish('toast', {type:'error', msg: error.message});
    })
  }
}
