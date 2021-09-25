export interface ContentfulImages {
  fields: {
    file: {
      url: string;
    };
  };
}

export type PetFriendly = "Yes" | "No" | "Dogs & Cats Only"

export type PropertyTypes = "Apartment" | "Condominium" | "House" | "";

export type MarketStatus = "Rent" | "Sale" | "Sold"

export interface Property {
  id?: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  address: string;

  latitude: number;
  longitude: number;

  images: ContentfulImages[];
  image: ContentfulImages | null;

  price: string;

  bedrooms: number;
  bathrooms: number;

  sqft: number;
  carSpaces: number;

  type: PropertyTypes;
  status: MarketStatus

  datePosted: string;

  petFriendly: PetFriendly;
}
