import type {
  ProductDatabaseConnector,
  ProductLoadResponse
} from '../../connectors/ProductDatabaseConnector'
import type { Product } from '../../domain/products/Product'
export class DemoProductDatabaseAdapter implements ProductDatabaseConnector {
  async loadProducts(): Promise<ProductLoadResponse> {
    const allProducts : Product[] = [
      {
        id: 1,
        title: 'Product 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image:
          'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-graphite-2023?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1679072989055',
        price: 50,
        ratings: 3,
        reviews: 5,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 35,
        ratings: 5,
        reviews: 10,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 3,
        title: 'Product 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 110,
        ratings: 2,
        reviews: 3,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 4,
        title: 'Product 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 50,
        ratings: 1,
        reviews: 0,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 5,
        title: 'Product 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 35,
        ratings: 4,
        reviews: 2,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 6,
        title: 'Product 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 110,
        ratings: 5,
        reviews: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 7,
        title: 'Product 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 50,
        ratings: 5,
        reviews: 7,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 8,
        title: 'Product 8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 35,
        ratings: 3,
        reviews: 0,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      },
      {
        id: 9,
        title: 'Product 9',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 110,
        ratings: 4,
        reviews: 2,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      }
    ]
    const response : ProductLoadResponse = {
      products: allProducts
    }
    return Promise.resolve(response)
  }
}
