export type Activity = {
    id: number;
    name: string;
    age: number;
    type: "learning" | "motor" | "sensory" | "creative" | "fun";
    setup: "zero" | "low";
    time: 5 | 10 | 20;
    items: string[];
    skills: string[];
    description: string;
  };