import GetLoanInput from "../dtos/loan/GetLoanInput";
import GetLoanOutput from "../dtos/loan/GetLoanOutput";
import ILoanRepository from "../repositories/ILoanRepository";
import UseCase from "./UseCase";
import Birthdate from "../../domain/value-objects/Birthdate";

export default class GetLoan implements UseCase {
  constructor(readonly loanRepository: ILoanRepository) {}

  async execute(input: GetLoanInput): Promise<GetLoanOutput> {
    const loan = await this.loanRepository.getById(input.loanId);
    console.log(loan);
    if (!loan) throw new Error("Loan not found");
    return {
      id: loan.id,
      userCpf: loan.userCpf,
      userUf: loan.userUf,
      userBirthdate: new Birthdate(loan.userBirthdate?.value),
      total: loan.total,
      monthlyInstallment: loan.monthlyInstallment,
      date: loan.date,
    };
  }
}