// если AccountMoney не содержит логики и  будет использлваться только как тип - то лучше сделать его не классом, а интерфейсом
// (почему не типом - бест практис такой, что пока можно использовать интерфейсы - используем их, типы - только при необходимости конкретной)

export class AccountMoney {

  constructor(
    public id?: number,
    public currency = '',
    public typeCard = '',
    public initSum = 0,
  ) {
  }

}
