import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { smartModel } from "@/services/estate"
import { useFlagcard } from "@/contexts/flagcard-context"

const useSmartModelQuery = (
  query?: WithId<{ params?: SmartModelListParams }>
) => {
  const flagcard = useFlagcard()
  const queryClient = useQueryClient()

  const list = useQuery({
    queryKey: ["smart-model", query?.params],
    queryFn: () => query?.params && smartModel.list(query?.params),
    enabled: Boolean(query?.params),
  })

  /**
   * Method for create a company with given payload
   */
  const create = useMutation({
    mutationFn: smartModel.create,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["smart-model"],
      })
      flagcard.appear({
        type: "success",
        message: `${response.data.modelName} model created`,
      })
    },
  })
  return { list, create }
}

export default useSmartModelQuery
