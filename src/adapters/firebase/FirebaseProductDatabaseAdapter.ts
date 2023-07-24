import type {
  ProductDatabaseConnector,
  ProductLoadResponse
} from '../../connectors/ProductDatabaseConnector'
import { Product } from '../../domain/products/Product'
import { firestore } from './firebaseConfig'
import { collection, addDoc, query, getDocs, QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'
import { hasFeature, setFeature } from './firebaseFeatures'

const featureName = 'db_products'

async function loadDemoDataInFirebase(products: Product[]) {
  console.log("Loading data into Firebase")
  try {
    const product = {
      id: '',
      title: 'Demo Firebase product',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      image: null,
      price: 110,
      ratings: 4,
      reviews: 2,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
    }
    const docRef = await addDoc(collection(firestore, 'products'), product)
    console.log('Document written with ID: ', docRef.id, docRef.path)
    product.id = docRef.id
    products.push(Object.assign(new Product(), product))
    await setFeature(featureName, true)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// Firestore data converter
const productConverter = {
  toFirestore: (product: Product) => {
    return Object.assign(new Product(),
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        ratings: product.ratings,
        reviews: product.reviews,

        isAddedToCart: product.isAddedToCart,
        isAddedBtn: product.isAddedBtn,
        isFavourite: product.isFavourite,
        image: product.image,
        quantity: product.quantity
      })
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    data.id = snapshot.id
    return Object.assign(new Product(), data)
  }
}

export class FirebaseProductDatabaseAdapter implements ProductDatabaseConnector {
  async loadProducts(): Promise<ProductLoadResponse> {
    try {
      // We control if the collection exists and if they are some documents.
      // If they are no documents, we upload the data for the first time into the collections
      const products = [] as Product[]
      if (!(await hasFeature(featureName))) {
        await loadDemoDataInFirebase(products)
      } else {
        const q = query(collection(firestore, 'products'))
        const querySnapshot = await getDocs(q.withConverter(productConverter))
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          products.push(Object.assign(new Product(), product))
        })
      }
      return Promise.resolve({
        products: products
      })
    } catch (e: any) {
      console.error("Cannot obtain the list of products")
      if (typeof e === "string") {
        throw new Error(e as string)
      } else if (e instanceof Error) {
        throw new Error(e.message)
      } else {
        throw new Error(e as string)
      }
    }

  }
}
