import {HttpClient} from 'aurelia-http-client';

export class AuthService {
  delay: number; 
  currentUser: string;
  
	constructor(private httpClient: HttpClient) {
		
    this.currentUser = null;
    this.httpClient = new HttpClient();
    this.httpClient.configure(config => {
      config
        
        .withBaseUrl('http://localhost:61072/api/')
        
    });
	}
 
	login(name) : Promise<{user: string}> {
		return new Promise((resolve, reject) => {		
      this.httpClient.post("users/login", {name})
        .then(data => {
          this.currentUser =  data.content
          resolve({ user: data.content });}
    ).catch(error => reject(new Error (error)))});
	}

	logout():  Promise<{success: boolean}> {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				this.currentUser = null;
				if (this.currentUser) {
					reject(new Error ('Error logging out.' ));
				} else {
					resolve({ success: true });
				}
		  }, this.delay);
		});	
	}

	signup(name) : Promise<{user: string}> {
    return new Promise((resolve, reject) => {		
      this.httpClient.post("users/signup", {name})
        .then(data => {
          this.currentUser =  data.content;
          resolve({ user: data.content });
        }
    ).catch(error => reject(new Error (error)))});
	}

}
