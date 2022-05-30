import { Account, AuditInformation } from "@/entity"

export const calculateTotalAudit = (auditInformations:AuditInformation[]):number =>{
    return auditInformations.reduce((cost, auditInformation)=>
    cost + auditInformation.quantity * auditInformation.unitPrice
  ,0)
}
export const calculateTotalAccount = (accounts : Account[]):number=>{
    return accounts.reduce(
        (total, account) => total + account.newPrice,
        0
      );
}