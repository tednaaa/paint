import { makeAutoObservable } from 'mobx';

class AuthModalState {
  isActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setActive(value: boolean) {
    this.isActive = value;
  }
}

export const authModalState = new AuthModalState();
