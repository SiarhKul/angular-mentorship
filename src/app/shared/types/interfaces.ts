export interface User {
  id: number;
  username: string;
}

export interface IOnSubscriptionCallbacks {
  onSuccess?: Function;
  onError?: Function;
  onComplete?: Function;
}
