import {inject, autoinject} from 'aurelia-framework';
import {AuthService} from './auth-service';
import {Post} from "./models";
import {HttpClient} from 'aurelia-http-client';

@autoinject
export class PostService {
  delay: number;
  posts: Post[];
 
	constructor(private authService: AuthService, private httpClient: HttpClient) {

    

    this.httpClient.configure(config => {
      config
        
        .withBaseUrl('http://localhost:61072/api/')
        
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            console.log(`Received ${response.content} `);
            return response; // you can return a modified Response
          }})
          
        
    });
		
	}

	allPostPreviews() : Promise<{posts: Post[]}>{
	
    return new Promise((resolve, reject) => {		
      this.httpClient.get("posts")
        .then(data => resolve({ posts: data.content })
    ).catch(error => reject(new Error (error)))});

  }

	allArchives() :Promise<{archives: string[]}> {
    return new Promise((resolve, reject) => {		
      this.httpClient.get("archives")
        .then(data => resolve({ archives: data.content })
    ).catch(error => reject(new Error (error)))});
	}

	allTags() : Promise<{tags: string[]}> {
    return new Promise((resolve, reject) => {		
      this.httpClient.get("tags")
        .then(data => resolve({ tags: data.content })
    ).catch(error => reject(new Error (error)))});
	}

	create(post : Post) : Promise<{slug: string}>{
		return new Promise((resolve, reject) => {
		 
		  	let currentUser = this.authService.currentUser;
		  	let slug = this.slugify(post.title);
				if (currentUser) {
          var newpost = new Post(post.title, post.body, currentUser, slug,post.tags, new Date());
          this.httpClient.post("posts", newpost).then(data=>
					
          resolve({ slug: data.content.slug }))
          .catch(error => reject(new Error (error)))
				} else {
					reject(new Error ('You must be logged in to create a post.' ));
				}
		  
		});	
	}

	find(slug: string) : Promise<{post: Post}> {
		
    return  new Promise((resolve, reject) => {		
      this.httpClient.get(`posts/${slug}`)
    
     .then(data => {
       resolve({ post: data.content });
     }).catch(error => reject(new Error (error))) });
    			
	}

	postsByTag(tag: string) : Promise<{posts: Post[]}> {		
	
    return  new Promise((resolve, reject) => {		
      this.httpClient.get(`tags/${tag}`)
     
     .then(data => {
       resolve({ posts: data.content });
     })});
    
	}

	postsByArchive(archive:string) : Promise<{posts: Post[]}> {
    var date = archive.split(" ")
    
    return  new Promise((resolve, reject) => {		
      this.httpClient.get(`archives/${date[0]}/${date[1]}`)
     
     .then(data => {
       resolve({ posts: data.content });
     })});
	}

	slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
	}

	update(post: Post): Promise<{slug: string}> {
		return new Promise((resolve, reject) => {
      let currentUser = this.authService.currentUser;

      var newpost = new Post(post.title, post.body, post.author , post.slug ,post.tags,post.createdAt);
      this.httpClient.post("posts", newpost).then(data=>
      
      resolve({ slug: data.content.slug }))
      .catch(error => reject(new Error (error)))
		  	// Get post based on slug and auther
		  	let toUpdate = this.posts.find(x => {
		  		return x.slug === post.slug && x.author === this.authService.currentUser;
		  	})
		  	if (!toUpdate) {
          reject(new Error ('There was an error updating the post.' ));	
		  	} else {
		  		toUpdate = post;
		  		resolve({ slug: toUpdate.slug });
		  	}
		 
		});			
	}

}
