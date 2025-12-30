import { Character } from "@/app/types/character";

export const characters: Character[] = [
  {
    id: "noor",
    name: "Noor",
    arabicName: "نور",
    description:
      "The warm and wise storyteller who guides the children through the life of Prophet Muhammad. Noor has a gift for making history feel alive and personal.",
    personality:
      "Patient, gentle, and deeply knowledgeable. He speaks to children as equals and respects their curiosity.",
    funFact: "Noor means 'light' in Arabic - and he brings light to every story he tells!",
    imagePath: "/images/characters/noor.png",
    color: "#3D5A6C",
  },
  {
    id: "adam",
    name: "Adam",
    arabicName: "آدم",
    description:
      "A thoughtful 10-year-old boy who loves asking deep questions. Adam often wonders how the Prophet's teachings apply to his life at school.",
    personality:
      "Curious, reflective, and sometimes struggles with being different from his non-Muslim friends.",
    funFact: "Adam's favorite subject is history - he loves connecting the past to the present!",
    imagePath: "/images/characters/adam.png",
    color: "#5C7A4B",
  },
  {
    id: "hana",
    name: "Hana",
    arabicName: "هناء",
    description:
      "A spirited 8-year-old girl who isn't afraid to speak her mind. Hana asks the questions other kids might be too shy to ask.",
    personality:
      "Bold, empathetic, and full of energy. She cares deeply about fairness and kindness.",
    funFact: "Hana wants to be a teacher when she grows up - just like Noor!",
    imagePath: "/images/characters/hana.png",
    color: "#F2C94C",
  },
  {
    id: "mansour",
    name: "Mansour",
    arabicName: "منصور",
    description:
      "A playful 9-year-old who brings humor to the group. Mansour's jokes and lighthearted comments make learning fun.",
    personality:
      "Funny, creative, and surprisingly insightful. He often understands things in his own unique way.",
    funFact: "Mansour loves making his friends laugh - even Noor can't help but smile at his jokes!",
    imagePath: "/images/characters/mansour.png",
    color: "#6A8E9E",
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((char) => char.id === id);
}

export function getCharactersByIds(ids: string[]): Character[] {
  return ids
    .map((id) => getCharacterById(id))
    .filter((char): char is Character => char !== undefined);
}
