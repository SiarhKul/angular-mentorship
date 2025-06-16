export class AccountMoney {
  constructor(
    public id?: number,
    public currency = '',
    public typeCard = '',
    public initSum = 0,
  ) {}
}
