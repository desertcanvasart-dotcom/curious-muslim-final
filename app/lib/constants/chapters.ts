import { Chapter } from "@/app/types/chapter";

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Year of the Elephant",
    description:
      "The children learn about the miraculous year when Prophet Muhammad was born and how Allah protected the Kaaba.",
    lesson:
      "Allah's protection and the special status of Makkah. Even before his birth, signs pointed to Muhammad's importance.",
    characters: ["noor", "adam", "hana", "mansour"],
  },
  {
    id: 2,
    title: "A Child Without Parents",
    description:
      "Muhammad loses his mother at a young age. The children discuss loss, grief, and finding strength.",
    lesson:
      "Even the Prophet experienced hardship and loss. Allah was always with him, and He is always with us too.",
    characters: ["noor", "adam", "hana"],
  },
  {
    id: 3,
    title: "The Honest Trader",
    description:
      "Young Muhammad earns the nickname 'Al-Amin' (The Trustworthy). The children explore why honesty matters.",
    lesson:
      "Being truthful and trustworthy builds your character and earns respect - even before prophethood, Muhammad was known for his honesty.",
    characters: ["noor", "hana", "mansour"],
  },
  {
    id: 4,
    title: "The Cave of Hira",
    description:
      "Muhammad receives the first revelation. The children feel the weight of this incredible moment.",
    lesson:
      "The beginning of Islam. Allah chose Muhammad to receive His final message for all of humanity.",
    characters: ["noor", "adam", "hana", "mansour"],
  },
  {
    id: 5,
    title: "The First Believers",
    description:
      "Khadijah, Abu Bakr, and Ali embrace Islam. The children learn about courage and conviction.",
    lesson:
      "Standing up for what's right, even when others don't understand. The first Muslims showed incredible bravery.",
    characters: ["noor", "adam", "hana"],
  },
  {
    id: 6,
    title: "Facing Persecution",
    description:
      "The early Muslims face hardship in Makkah. The children discuss bullying and staying strong.",
    lesson:
      "Being Muslim isn't always easy, but patience and faith help us through difficult times.",
    characters: ["noor", "adam", "mansour"],
  },
  {
    id: 7,
    title: "The Night Journey",
    description:
      "The miraculous Isra and Mi'raj. The children are amazed by this incredible gift to the Prophet.",
    lesson:
      "The importance of prayer (Salah) and the special connection between Muhammad and Allah.",
    characters: ["noor", "adam", "hana", "mansour"],
  },
  {
    id: 8,
    title: "A New Home in Madinah",
    description:
      "The Hijrah to Madinah. The children learn about new beginnings and building community.",
    lesson:
      "Sometimes we have to leave what's familiar for something better. The Muslim community grew stronger in Madinah.",
    characters: ["noor", "hana", "mansour"],
  },
  {
    id: 9,
    title: "Brothers and Sisters",
    description:
      "The Prophet unites the Muhajirun and Ansar. The children discover the importance of brotherhood.",
    lesson:
      "In Islam, we are all one family. The Prophet taught us to care for each other like siblings.",
    characters: ["noor", "adam", "hana"],
  },
  {
    id: 10,
    title: "Kindness to All",
    description:
      "Stories of the Prophet's mercy - to animals, children, and even enemies.",
    lesson:
      "The Prophet showed kindness to everyone and everything. We should follow his beautiful example.",
    characters: ["noor", "adam", "hana", "mansour"],
  },
  {
    id: 11,
    title: "Return to Makkah",
    description:
      "The peaceful conquest of Makkah. The children learn about forgiveness and mercy.",
    lesson:
      "True strength is in forgiveness. The Prophet forgave those who had hurt him and his companions.",
    characters: ["noor", "adam", "mansour"],
  },
  {
    id: 12,
    title: "The Final Message",
    description:
      "The Farewell Sermon and the Prophet's passing. The children reflect on his lasting legacy.",
    lesson:
      "The Prophet's message lives on through us. Every Muslim carries his teachings in their heart.",
    characters: ["noor", "adam", "hana", "mansour"],
  },
];

export function getChapterById(id: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChaptersByCharacter(characterId: string): Chapter[] {
  return chapters.filter((chapter) => chapter.characters.includes(characterId));
}
