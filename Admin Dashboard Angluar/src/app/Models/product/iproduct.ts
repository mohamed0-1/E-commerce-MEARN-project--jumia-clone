export interface Iproduct {
    _id?: number;
  nameAr?: string;
  nameEn?: string;
  price?: number;
  descriptionAr?: string;
  descriptionEn?: string;
  image?: string;
  category?: string;
  categoryparent?:string
  company?:string;
  quantity?:number;
  size?:number;
  color?: string;
  featured?: boolean;
  freeShipping?: boolean;
  inventory?: number;
  averageRating?: number;
  numOfReviews?: number;
  user?: number;
}
