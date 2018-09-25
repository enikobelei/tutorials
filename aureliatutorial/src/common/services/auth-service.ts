export class AuthService {
  delay: number; 
  currentUser: string;
  users: string[];
	constructor() {
		this.delay = 100;
		this.currentUser = null;
		this.users = ['Nick Shallee', 'Jane Doe'];
	}

	login(name) : Promise<{user: string}> {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (this.users.includes(name)) {
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error ('Invalid credentials.' ));
				}
		  }, this.delay);
		});
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
		  setTimeout(() => {
				if (!this.users.includes(name)) {
					this.users.push(name);
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error ('This user already exists.' ));
				}
		  }, this.delay);
		});		
	}

}
