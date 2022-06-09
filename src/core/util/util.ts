import { Account, Audit, AuditInformation } from "@/entity"

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

export const returnCalculatedTotal = (audit:Audit)  : number=>{
  const {auditInformations,information,total} = audit
  if(auditInformations && auditInformations.length > 0) {
    return calculateTotalAudit(auditInformations)
  }
  if(information?.accounts){
    return calculateTotalAccount(information.accounts)
  }
  return total || 0
}