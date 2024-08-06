import { FederativeUnit } from "../types/FederativeUnit.type";
import Birthdate from "../value-objects/Birthdate";

export class Loan {
  readonly userUf: FederativeUnit;
  readonly userBirthdate: Birthdate;
  readonly interestRate: number = 0;

  constructor(
    readonly id: string,
    readonly userCpf: string,
    userUf: string,
    userBirthdate: Date,
    readonly total: number,
    readonly monthlyInstallment: number,
    readonly date: Date
  ) {
    this.validateTotal(total);
    this.validateMonthlyInstallment(total, monthlyInstallment);
    this.userUf = this.validateFederativeUnit(userUf);
    this.userBirthdate = new Birthdate(userBirthdate);
    this.interestRate = this.getInterestRate(userUf);
  }

  static create(
    userCpf: string,
    userUf: string,
    userBirthdate: Date,
    total: number,
    monthlyInstallment: number
  ): Loan {
    const id = crypto.randomUUID();
    const date = new Date();
    return new Loan(
      id,
      userCpf,
      userUf,
      userBirthdate,
      total,
      monthlyInstallment,
      date
    );
  }

  static restore(
    id: string,
    userCpf: string,
    userUf: string,
    userBirthdate: Date,
    total: number,
    monthlyInstallment: number,
    date: Date
  ): Loan {
    return new Loan(
      id,
      userCpf,
      userUf,
      userBirthdate,
      total,
      monthlyInstallment,
      date
    );
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

  private validateFederativeUnit(value: string) {
    const validUnits: FederativeUnit[] = ["MG", "ES", "SP", "RJ"];
    if (!validUnits.includes(value as FederativeUnit)) {
      throw new Error(`Invalid federative unit: ${value}`);
    }
    return value as FederativeUnit;
  }
}