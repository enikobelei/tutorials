import { EventAggregator } from 'aurelia-event-aggregator';
import { Post } from './../common/services/models';
import { autoinject } from 'aurelia-framework';
import { PostService } from './../common/services/post-service';


@autoinject
export class Index {    
  message: string;
  posts: Post[];
  

  
  constructor(private postService: PostService, private ea: EventAggregator) {
    this.message = 'Hello world';
  }

  attached () {
   
    this.postService.allPostPreviews().then(data => {
      
        this.posts = data.posts;
       
    }).catch(error=> {this.ea.publish('toast', {type:'error', msg: error.message})})
  }
}
