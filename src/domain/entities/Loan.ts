import { FederativeUnit } from "../types/FederativeUnit.type";

export class Loan {
  id?: number;
  interestRate: number = 0;

  constructor(
    readonly userCpf: string,
    readonly userUf: FederativeUnit,
    readonly userBirthdate: Date,
    readonly total: number,
    readonly monthlyInstallment: number
  ) {
    this.validateUserBirthday(userBirthdate);
    this.validateTotal(total);
    this.validateMonthlyInstallment(total, monthlyInstallment);
    this.interestRate = this.getInterestRate(userUf);
  }

  private validateUserBirthday(userBirthdate: Date) {
    if (new Date() < userBirthdate) {
      throw new Error("User's birthdate cannot be in the future");
    }
  }

  private validateTotal(total: number) {
    if (total < 50000)
      throw new Error("The minimum value for a loan is 50,000");
  }

  private validateMonthlyInstallment(total: number, monthlyValue: number) {
    if (monthlyValue / total < 0.01)
      throw new Error(
        "The monthly installment for a loan must be equal to or greater than 0.01 of the total"
      );
  }

  private getInterestRate(uf: string): number {
    switch (uf) {
      case "ES":
        return 0.0111;
      case "MG":
        return 0.01;
      case "RJ":
        return 0.009;
      case "SP":
        return 0.008;
      default:
        throw new Error(`No interest rate defined for state: ${uf}`);
    }
  }
}