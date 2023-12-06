import * as productData from './../data/products.json';
import { ProductInterface } from '../interface/ProductInterface';

const items = productData as ProductInterface[];

export default class ProductRepository {

    public getProductPrice(sku: string): number | undefined {
        const product = items.find(item => item.sku === sku);
        return product ? product.price : undefined;
    }
}

