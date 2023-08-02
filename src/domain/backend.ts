
export interface IBackend {

}

class Backend implements IBackend {    
  


    constructor() {
        this.init(['memory'])
    }

    init(features: string[]) {
        console.log("\u{23F0} Loading Backend with ", {f: features.map((s:string) => s)})
        // Obtain adapters
        // Build servicess

        return this
    }    
}

export const backend = new Backend()




