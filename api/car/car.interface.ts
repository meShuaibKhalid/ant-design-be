export interface CarI {
  _id?: string;
  model: string;
  images: string[];
  description: string;
  year: number;
  mileage: number;
  price: number;
  sale: boolean;
  transmission: string;
  doors: number;
  fuelType: string;
  seats: number;
  engine: string;
  color: string;
  condition: string;
  features: string;
  safetyFeatures: string;
  entertainmentFeatures: string;
  exteriorFeatures: string;
  interiorFeatures: string;
  createdAt: string;
  updatedAt: string;
}
