import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { company } from "@/services/estate"
import { useFlagcard } from "@/contexts/flagcard-context"

const useCompany = (query?: WithId<{ params?: CompanyListParams }>) => {
  const flagcard = useFlagcard()
  const queryClient = useQueryClient()

  /**
   * Method for list companies with given filter data
   * pageIndex and pageSize is accepted (size is 20 by default )
   */
  const list = useQuery({
    queryKey: ["company", query?.params],
    queryFn: () => query?.params && company.list(query?.params),
    enabled: Boolean(query?.params),
  })

  /**
   * Method for find a company with given private key
   */
  const find = useQuery({
    queryKey: ["company", { id: query?.id }],
    queryFn: () => company.find(query?.id as number),
    enabled: Boolean(query?.id),
  })

  /**
   * Method for create a company with given payload
   */
  const create = useMutation({
    mutationFn: company.create,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      })
      flagcard.appear({
        type: "success",
        message: `${response.data.title} şirketi oluşturuldu.`,
      })
    },
  })

  /**
   * Method for update a company with given payload
   */
  const update = useMutation({
    mutationFn: ({ id, ...payload }: WithId<CompanyCreatePayload>) =>
      company.update(id as number, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      })
      flagcard.appear({
        type: "success",
        message: `${response.data.title} şirketi güncellendi.`,
      })
    },
  })

  /**
   * Method for delete a company with given payload
   */
  const destroy = useMutation({
    mutationFn: company.destroy,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      })
      flagcard.appear({
        type: "success",
        message: response.data.title + ` adlı şirket silindi.`,
      })
    },
  })

  return { list, create, find, destroy, update }
}

export default useCompany
