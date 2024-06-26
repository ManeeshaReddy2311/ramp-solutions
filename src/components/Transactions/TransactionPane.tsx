import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"
import { useCallback } from "react"
import { fakeFetch } from "../../utils/fetch"

export const TransactionPane: TransactionPaneComponent = ({
  transaction
}) => {
  const [approved, setApproved] = useState(transaction.approved)

  const setTransactionApproval = useCallback(
    (newValue: boolean) => {
      fakeFetch<Boolean>("setTransactionApproval", {
        transactionId: transaction.id,
      })
      setApproved(newValue)
    },
    [transaction.id]
  )

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        onChange={setTransactionApproval}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})


