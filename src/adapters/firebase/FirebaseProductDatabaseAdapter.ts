import type { ProductDatabaseConnector, ProductLoadResponse } from '../../connectors/ProductDatabaseConnector'
import type { Product } from '../../domain/products/Product';
import { firestore } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

export class FirebaseProductDatabaseAdapter implements ProductDatabaseConnector {
  async loadProducts(): Promise<ProductLoadResponse> {
    // We control if the collection exists and if they are some documents.
    // If they are no documents, we upload the data for the first time into the collections
    const products = [] as  Product[];
    try {
      const product: Product = {
        id: "",
        title: 'Demo Firebase product',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        image: undefined,
        price: 110,
        ratings: 4,
        reviews: 2,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        quantity: 1
      };
      const docRef = await addDoc(collection(firestore, "products"), product);      
      console.log("Document written with ID: ", docRef.id, docRef.path);
      product.id = docRef.id;
      products.push(product)
    } catch (e) {      
      console.error("Error adding document: ", e);      
    }
    return Promise.resolve({
      products: products
    })
  }
}
