export class Post{
  public title:string;
  public body: string;
  public author: string;
	public slug: string;
  public tags: string[];
	public createdAt: Date;
  constructor(title: string, body: string, author: string, slug: string, tags: string[], createdAt: Date){
    this.title = title;
    this.body = body;
    this.author = author;
    this.slug = slug;
    this.tags = tags;
    this.createdAt = createdAt;
    
  }
}

export class PostServiceResponse{
  
}
