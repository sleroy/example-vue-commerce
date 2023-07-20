import type { Usecase } from './types'
import { ProductRepository } from '../products/ProductRepository'
import  { Product } from '../products/Product'
import { SystemInfoRepository } from '../systeminfo/SystemInfoRepository'

export class RemoveFromCartUsecase implements Usecase {
  constructor(
    private productRepo: ProductRepository,
    private systemInfoRepository: SystemInfoRepository
  ) {}

  execute(id: string) {
    let data = {
      id: id,
      status: false
    }
    this.productRepo.removeFromCart(id)
    this.productRepo.setAddedBtn(data)
    this.systemInfoRepository.setCheckoutRequired(true)
  }
}
