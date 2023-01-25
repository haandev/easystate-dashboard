import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { agent } from "@/services/estate"
import { useFlagcard } from "@/contexts/flagcard-context"

const useAgent = (query?: WithId<{ params?: AgentListParams }>) => {
  const flagcard = useFlagcard()
  const queryClient = useQueryClient()

  /**
   * Method for list companies with given filter data
   * pageIndex and pageSize is accepted (size is 20 by default )
   */
  const list = useQuery({
    queryKey: ["agent", query?.params],
    queryFn: () => query?.params && agent.list(query?.params),
    enabled: Boolean(query?.params),
  })

  /**
   * Method for find a company with given private key
   */
  const find = useQuery({
    queryKey: ["agent", { id: query?.id }],
    queryFn: () => agent.find(query?.id as number),
    enabled: Boolean(query?.id),
  })

  /**
   * Method for create a company with given payload
   */
  const create = useMutation({
    mutationFn: agent.create,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agent"],
      })
      flagcard.appear({
        type: "success",
        message: response.data.name + " " + response.data.surname +` adlı temsilci oluşturuldu.`,
      })
    },
  })

  /**
   * Method for update a company with given payload
   */
  const update = useMutation({
    mutationFn: ({ id, ...payload }: WithId<AgentCreatePayload>) =>
      agent.update(id as number, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agent"],
      })
      flagcard.appear({
        type: "success",
        message: response.data.name + " " + response.data.surname +` adlı temsilci güncellendi.`,
      })
    },
  })

  /**
   * Method for delete a company with given payload
   */
  const destroy = useMutation({
    mutationFn: agent.destroy,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agent"],
      })
      flagcard.appear({
        type: "success",
        message: response.data.name + " " + response.data.surname +` adlı temsilci silindi.`,
      })
    },
  })

  return { list, create, find, destroy, update }
}

export default useAgent
