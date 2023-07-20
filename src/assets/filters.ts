import  { Product } from "../domain/products/Product";

export function getByTitle (list: Product[], keyword: string) {
    const search = keyword.trim().toLowerCase();
    if (!search.length) return list;
    return list.filter(item => item.title.toLowerCase().indexOf(search) > -1);
}