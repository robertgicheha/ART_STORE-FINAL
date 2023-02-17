

export class Products{
    constructor(
        public id:string,
        public name: string,
        public description: string,
        public category: string,
        public imageUrl: string,
        public price: number
    ){}
}

export class Cart {
    constructor(
        public productId:string,
        public userId: string,
        public quantity: number
    ){}
}

export class Orders {
    constructor(
        public productId:string,
        public userId: string,
        public orderStatus: string
    ){}
}

// user

export class User{
    constructor(public Id:string, public Name:string , 
        public Email:string, public Password:string, public Role:string){}
}

export interface DecodedData{
  Id: string,
  Name:string,
  Email:string,
  Role: string,
  iat: number
  exp: number
}