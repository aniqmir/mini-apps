export interface Toy {
  id: number;
  name: string;
  ageRange: { min: number; max: number };    // example: "0-2", "3-5"
  type: string;      // example: "Educational", "Puzzle", "Outdoor"
  image: string;     // URL of toy image
  description: string;
}
