export type TUUID = ReturnType<typeof crypto.randomUUID>;

export interface IonResponseCallbacks {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onComplete?: () => void;
}
