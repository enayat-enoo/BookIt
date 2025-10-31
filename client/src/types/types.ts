export interface Slot {
  date: string;
  available: number;
}

export interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  slots: Slot[];
}
