import { Injectable } from '@angular/core';

interface User {
  name:       string;
  avatarRef:  string;
  bankRef:    string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor() {
    this.mockUser();
  }

  private mockUser() {
    this.user = {
      name: 'Joe Booth',
      avatarRef: '123',
      bankRef: '0'
    }
  }

  clearUser() {
    this.user = undefined;
  };

  setUser(user:User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
