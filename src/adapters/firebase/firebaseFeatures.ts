import { firestore } from './firebaseConfig'
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore'

class FeatureToggle {
    public name: string
    public value: boolean

    constructor(name: string, value: boolean) {
        this.name = name
        this.value = value
    }
}

// Firestore data converter
const featureConverter = {
    toFirestore: (feature: FeatureToggle) => {
        return {
            name: feature.name,
            value: feature.value
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new FeatureToggle(data.name, data.value)
    }
}

export async function hasFeature(featureName: string): Promise<boolean> {
    const ref = doc(firestore, "features", featureName).withConverter(featureConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        // Convert to City object
        const feature = docSnap.data();
        return Promise.resolve(feature.value)
    } else {
        return Promise.resolve(false);
    }
}

export async function setFeature(featureName: string, value: boolean) {
    const ref = doc(firestore, "features", featureName).withConverter(featureConverter);
    const f = new FeatureToggle(featureName, value)
    await setDoc(ref, f);
}