import { useCallback, useEffect, useState } from "react"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { PaginatedTransactionsResult } from "./types"
import { useCustomFetch } from "./useCustomFetch"
import { useWrappedRequest } from "./useWrappedRequest"

export function usePaginatedTransactions(): PaginatedTransactionsResult {
  const { fetchWithCache } = useCustomFetch()
  const { loading, wrappedRequest } = useWrappedRequest()
  const [paginatedTransactions, setPaginatedTransactions] = useState<PaginatedResponse<
    Transaction[]
  > | null>(null)

  const fetchAll = useCallback(
    () =>
    wrappedRequest(async () => {
      const response = await fetchWithCache<PaginatedResponse<Transaction[]>, PaginatedRequestParams>(
        "paginatedTransactions",
        {
          page: paginatedTransactions === null ? 0 : paginatedTransactions.nextPage,
        }
      )

    setPaginatedTransactions((previousResponse) => {
      if (response === null || previousResponse === null) {
        return response
      }

      return { data: [...previousResponse.data, ...response.data], nextPage: response.nextPage }
    })

  }), 

  [fetchWithCache, paginatedTransactions,wrappedRequest]
)

  const invalidateData = useCallback(() => {
    setPaginatedTransactions(null)
  }, [])

  return { data: paginatedTransactions, loading, fetchAll, invalidateData }
}


