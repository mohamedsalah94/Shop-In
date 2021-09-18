export interface IProducts {
    id:number,
    price:number,
    // rate:number,
    imageUrl:string,
    name:string,
    describtion:string,
    category:string,
    date:string,
    newItem:boolean,
    onSale:boolean,
    outOfStock:boolean,
    Discount:Number,
    productRates:any;
}

export class ProductsRate {
    id:number
    Rate:number
    ProductId:number
}
