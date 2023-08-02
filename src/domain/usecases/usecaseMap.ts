import { backend, type IBackend } from '../backend'

const usecaseMapping = (backend:IBackend
) => {
  return {
    //'open-product-detail': () => new OpenProductDetailUsecase(),
  }
}

export function usecase(usecaseId: string) {
  const selectedUsecaseMap: Record<string, any> = usecaseMapping(backend)

  const usecaseFactory = selectedUsecaseMap[usecaseId]
  if (!usecaseFactory) {
    throw new Error(`Usecase ${usecaseId} not found`)
  }

  return usecaseFactory()
}
