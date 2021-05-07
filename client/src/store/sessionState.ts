import { makeAutoObservable } from 'mobx';

class SessionState {
  id = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSessionID(id: string) {
    this.id = id;
  }
}

export const sessionState = new SessionState();
