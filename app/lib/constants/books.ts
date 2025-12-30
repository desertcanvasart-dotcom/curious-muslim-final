// Book data for the Stories of the Prophets series

export interface BookChapter {
  id: number;
  title: string;
  description: string;
  lesson: string;
}

export interface BookSpecification {
  label: string;
  value: string;
}

export interface BookReview {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  prophet: string;
  arabicName: string;
  description: string;
  longDescription: string;
  coverEmoji: string;
  coverColor: string;
  accentColor: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  ageRange: string;
  pages: number;
  releaseStatus: "available" | "pre-order" | "coming-soon";
  releaseDate?: string;
  features: string[];
  chapters: BookChapter[];
  specifications: BookSpecification[];
  reviews: BookReview[];
  included: string[];
}

export const books: Book[] = [
  {
    id: "prophet-muhammad",
    slug: "prophet-muhammad",
    title: "Stories of the Prophets",
    subtitle: "Prophet Muhammad",
    prophet: "Prophet Muhammad",
    arabicName: "محمد ﷺ",
    description:
      "A beautifully illustrated journey through the life of Prophet Muhammad, told through the eyes of four curious Muslim children.",
    longDescription:
      "Join Noor, Adam, Hana, and Mansour as they discover the incredible story of Prophet Muhammad (peace be upon him). From his miraculous birth in the Year of the Elephant to his final sermon, every chapter brings history to life through warm storytelling and stunning illustrations. This is the Seerah like you've never experienced it before.",
    coverEmoji: "🌙",
    coverColor: "#3D5A6C",
    accentColor: "#F2C94C",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviewCount: 120,
    ageRange: "8-12 years",
    pages: 144,
    releaseStatus: "pre-order",
    releaseDate: "Ramadan 2026",
    features: [
      "12 beautifully illustrated chapters",
      "Authentic sources and scholarly reviewed",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Access to Ask Noor AI companion",
    ],
    chapters: [
      {
        id: 1,
        title: "The Year of the Elephant",
        description:
          "Learn about the miraculous year when Prophet Muhammad was born, and the amazing story of how Allah protected the Kaaba.",
        lesson: "Allah protects what is sacred and has a plan for everything.",
      },
      {
        id: 2,
        title: "A Star is Born",
        description:
          "Discover the story of the Prophet's birth, his family, and the signs that appeared when he came into this world.",
        lesson: "Every child is born with a special purpose.",
      },
      {
        id: 3,
        title: "Growing Up in the Desert",
        description:
          "Follow young Muhammad as he grows up with his wet nurse Halimah in the desert, learning valuable life lessons.",
        lesson: "Our early experiences shape who we become.",
      },
      {
        id: 4,
        title: "The Trustworthy One",
        description:
          "Learn why Muhammad was called 'Al-Amin' (The Trustworthy) even before he became a Prophet.",
        lesson: "Honesty and trustworthiness are the foundations of good character.",
      },
      {
        id: 5,
        title: "The Cave of Hira",
        description:
          "Experience the night when Angel Jibreel first appeared to Muhammad and revealed the first words of the Quran.",
        lesson: "Reflection and seeking knowledge lead to truth.",
      },
      {
        id: 6,
        title: "The First Believers",
        description:
          "Meet Khadijah, Abu Bakr, Ali, and the first people who believed in the Prophet's message.",
        lesson: "True friends support us in difficult times.",
      },
      {
        id: 7,
        title: "Challenges in Makkah",
        description:
          "Understand the struggles the early Muslims faced and how they stayed strong in their faith.",
        lesson: "Patience and perseverance are keys to success.",
      },
      {
        id: 8,
        title: "The Night Journey",
        description:
          "Travel with the Prophet on his miraculous journey from Makkah to Jerusalem and through the heavens.",
        lesson: "Allah rewards those who remain faithful with special blessings.",
      },
      {
        id: 9,
        title: "A New Home in Madinah",
        description:
          "Follow the Prophet's migration to Madinah and the building of the first Muslim community.",
        lesson: "Community and brotherhood are essential in Islam.",
      },
      {
        id: 10,
        title: "Building a Nation",
        description:
          "Learn how the Prophet established justice, peace, and cooperation in Madinah.",
        lesson: "Leadership means serving others with kindness and justice.",
      },
      {
        id: 11,
        title: "Victory and Forgiveness",
        description:
          "Witness the peaceful conquest of Makkah and the Prophet's incredible act of forgiveness.",
        lesson: "Forgiveness is more powerful than revenge.",
      },
      {
        id: 12,
        title: "The Farewell",
        description:
          "Hear the Prophet's final message to the Muslim Ummah and his lasting legacy for all of humanity.",
        lesson: "Leave behind a legacy of love, knowledge, and good deeds.",
      },
    ],
    specifications: [
      { label: "Pages", value: "144 pages" },
      { label: "Format", value: "Hardcover" },
      { label: "Dimensions", value: '8.5" x 11"' },
      { label: "Age Range", value: "8-12 years" },
      { label: "Language", value: "English" },
      { label: "ISBN", value: "978-1-234567-89-0" },
    ],
    reviews: [
      {
        name: "Amina K.",
        location: "London, UK",
        rating: 5,
        text: "My children absolutely love this book! They ask me to read it every night. The illustrations are breathtaking and the stories are told so beautifully.",
      },
      {
        name: "Yusuf M.",
        location: "Toronto, Canada",
        rating: 5,
        text: "Finally, a Seerah book that speaks to kids in their own language. My 9-year-old now asks questions about the Prophet that we love discussing together.",
      },
      {
        name: "Fatima S.",
        location: "New York, USA",
        rating: 5,
        text: "I bought this for my classroom and the students are captivated. The way complex topics are explained at their level is masterful.",
      },
    ],
    included: [
      "144-page hardcover book",
      "Full-color illustrations throughout",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Family reading guide",
      "Access to Ask Noor AI companion",
    ],
  },
  {
    id: "prophet-ibrahim",
    slug: "prophet-ibrahim",
    title: "Stories of the Prophets",
    subtitle: "Prophet Ibrahim",
    prophet: "Prophet Ibrahim",
    arabicName: "إبراهيم عليه السلام",
    description:
      "Discover the inspiring story of Prophet Ibrahim, the Friend of Allah and Father of the Prophets.",
    longDescription:
      "Journey with our four young friends as they learn about Prophet Ibrahim - from his brave stand against idol worship to his ultimate test of faith. Experience the building of the Kaaba, the miracle of the fire, and the beautiful lessons of submission to Allah.",
    coverEmoji: "⭐",
    coverColor: "#5C7A4B",
    accentColor: "#F2C94C",
    price: 29.99,
    originalPrice: 39.99,
    rating: 0,
    reviewCount: 0,
    ageRange: "8-12 years",
    pages: 128,
    releaseStatus: "coming-soon",
    releaseDate: "2027",
    features: [
      "10 beautifully illustrated chapters",
      "Stories of faith and courage",
      "The building of the Kaaba",
      "Family reading activities",
      "Access to Ask Noor AI companion",
    ],
    chapters: [
      {
        id: 1,
        title: "A Star in the Sky",
        description: "Young Ibrahim questions the worship of stars, moon, and sun.",
        lesson: "True guidance comes from seeking the One True God.",
      },
      {
        id: 2,
        title: "Standing Against Idols",
        description: "Ibrahim bravely challenges his people's worship of statues.",
        lesson: "Courage means standing up for truth, even when alone.",
      },
      {
        id: 3,
        title: "The Fire That Did Not Burn",
        description: "Allah protects Ibrahim in the miraculous fire.",
        lesson: "Allah protects those who trust in Him completely.",
      },
      {
        id: 4,
        title: "A New Beginning",
        description: "Ibrahim's journey to new lands with Sarah.",
        lesson: "Sometimes we must leave comfort for a greater purpose.",
      },
      {
        id: 5,
        title: "The Promise of a Son",
        description: "The long-awaited blessing of Ismail and Ishaq.",
        lesson: "Allah's timing is always perfect.",
      },
    ],
    specifications: [
      { label: "Pages", value: "128 pages" },
      { label: "Format", value: "Hardcover" },
      { label: "Dimensions", value: '8.5" x 11"' },
      { label: "Age Range", value: "8-12 years" },
      { label: "Language", value: "English" },
      { label: "ISBN", value: "978-1-234567-90-6" },
    ],
    reviews: [],
    included: [
      "128-page hardcover book",
      "Full-color illustrations throughout",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Family reading guide",
      "Access to Ask Noor AI companion",
    ],
  },
  {
    id: "prophet-musa",
    slug: "prophet-musa",
    title: "Stories of the Prophets",
    subtitle: "Prophet Musa",
    prophet: "Prophet Musa",
    arabicName: "موسى عليه السلام",
    description:
      "Follow the epic journey of Prophet Musa from the Nile to Mount Sinai.",
    longDescription:
      "Experience one of the most mentioned prophets in the Quran! From his miraculous rescue as a baby to leading the Children of Israel to freedom, Prophet Musa's story is filled with courage, miracles, and powerful lessons about faith and perseverance.",
    coverEmoji: "🌊",
    coverColor: "#2E86AB",
    accentColor: "#F2C94C",
    price: 29.99,
    originalPrice: 39.99,
    rating: 0,
    reviewCount: 0,
    ageRange: "8-12 years",
    pages: 136,
    releaseStatus: "coming-soon",
    releaseDate: "2027",
    features: [
      "11 beautifully illustrated chapters",
      "The parting of the sea",
      "The Ten Commandments",
      "Lessons in patience and leadership",
      "Access to Ask Noor AI companion",
    ],
    chapters: [
      {
        id: 1,
        title: "A Baby in a Basket",
        description: "Baby Musa is saved by Allah through his mother's faith.",
        lesson: "Trust in Allah even when the situation seems impossible.",
      },
      {
        id: 2,
        title: "Growing Up in the Palace",
        description: "Musa grows up in Pharaoh's palace while knowing his true identity.",
        lesson: "Our circumstances don't define who we truly are.",
      },
      {
        id: 3,
        title: "Flight to Madyan",
        description: "Musa's journey to a new land and meeting a righteous family.",
        lesson: "Hardships often lead us to unexpected blessings.",
      },
      {
        id: 4,
        title: "The Burning Bush",
        description: "Allah speaks to Musa and gives him his mission.",
        lesson: "Allah calls whom He wills for special purposes.",
      },
      {
        id: 5,
        title: "Facing Pharaoh",
        description: "Musa returns to Egypt to deliver Allah's message.",
        lesson: "Speaking truth to power requires courage and faith.",
      },
    ],
    specifications: [
      { label: "Pages", value: "136 pages" },
      { label: "Format", value: "Hardcover" },
      { label: "Dimensions", value: '8.5" x 11"' },
      { label: "Age Range", value: "8-12 years" },
      { label: "Language", value: "English" },
      { label: "ISBN", value: "978-1-234567-91-3" },
    ],
    reviews: [],
    included: [
      "136-page hardcover book",
      "Full-color illustrations throughout",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Family reading guide",
      "Access to Ask Noor AI companion",
    ],
  },
  {
    id: "prophet-yusuf",
    slug: "prophet-yusuf",
    title: "Stories of the Prophets",
    subtitle: "Prophet Yusuf",
    prophet: "Prophet Yusuf",
    arabicName: "يوسف عليه السلام",
    description:
      "The beautiful story of Prophet Yusuf - from betrayal to becoming a great leader.",
    longDescription:
      "Called 'the best of stories' in the Quran, Prophet Yusuf's journey teaches us about patience, forgiveness, and trusting Allah's plan. From the bottom of a well to the highest position in Egypt, his story shows how Allah rewards those who remain faithful.",
    coverEmoji: "👑",
    coverColor: "#9B59B6",
    accentColor: "#F2C94C",
    price: 29.99,
    originalPrice: 39.99,
    rating: 0,
    reviewCount: 0,
    ageRange: "8-12 years",
    pages: 132,
    releaseStatus: "coming-soon",
    releaseDate: "2028",
    features: [
      "10 beautifully illustrated chapters",
      "The best of stories from the Quran",
      "Lessons in forgiveness",
      "Dream interpretation themes",
      "Access to Ask Noor AI companion",
    ],
    chapters: [
      {
        id: 1,
        title: "A Special Dream",
        description: "Young Yusuf sees a remarkable dream that foretells his future.",
        lesson: "Dreams can carry important messages from Allah.",
      },
      {
        id: 2,
        title: "Jealousy Among Brothers",
        description: "Yusuf's brothers plot against him out of jealousy.",
        lesson: "Jealousy destroys relationships and leads to wrongdoing.",
      },
      {
        id: 3,
        title: "Into the Well",
        description: "Yusuf is thrown into a well but never loses hope.",
        lesson: "In our darkest moments, Allah is still with us.",
      },
      {
        id: 4,
        title: "A Test of Character",
        description: "Yusuf faces temptation but chooses righteousness.",
        lesson: "True strength is resisting what is wrong.",
      },
      {
        id: 5,
        title: "From Prison to Palace",
        description: "Allah elevates Yusuf to a position of power.",
        lesson: "Patience and faithfulness are always rewarded.",
      },
    ],
    specifications: [
      { label: "Pages", value: "132 pages" },
      { label: "Format", value: "Hardcover" },
      { label: "Dimensions", value: '8.5" x 11"' },
      { label: "Age Range", value: "8-12 years" },
      { label: "Language", value: "English" },
      { label: "ISBN", value: "978-1-234567-92-0" },
    ],
    reviews: [],
    included: [
      "132-page hardcover book",
      "Full-color illustrations throughout",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Family reading guide",
      "Access to Ask Noor AI companion",
    ],
  },
  {
    id: "prophet-nuh",
    slug: "prophet-nuh",
    title: "Stories of the Prophets",
    subtitle: "Prophet Nuh",
    prophet: "Prophet Nuh",
    arabicName: "نوح عليه السلام",
    description:
      "The remarkable story of Prophet Nuh, his patience, and the great flood.",
    longDescription:
      "For 950 years, Prophet Nuh called his people to Allah. His story teaches us about incredible patience, trust in Allah, and the importance of persevering in faith. Build the Ark with Nuh and witness Allah's power and mercy.",
    coverEmoji: "🚢",
    coverColor: "#1ABC9C",
    accentColor: "#F2C94C",
    price: 29.99,
    originalPrice: 39.99,
    rating: 0,
    reviewCount: 0,
    ageRange: "8-12 years",
    pages: 120,
    releaseStatus: "coming-soon",
    releaseDate: "2028",
    features: [
      "9 beautifully illustrated chapters",
      "The building of the Ark",
      "Lessons in patience",
      "Animal companions in the story",
      "Access to Ask Noor AI companion",
    ],
    chapters: [
      {
        id: 1,
        title: "The Call to Worship",
        description: "Prophet Nuh begins his mission to guide his people.",
        lesson: "Sharing truth is our duty, even when others don't listen.",
      },
      {
        id: 2,
        title: "950 Years of Patience",
        description: "Nuh never gives up despite rejection after rejection.",
        lesson: "True patience means never losing hope in Allah.",
      },
      {
        id: 3,
        title: "Building the Ark",
        description: "Allah commands Nuh to build a great ship far from water.",
        lesson: "Following Allah's commands may not always make sense to others.",
      },
      {
        id: 4,
        title: "Two of Every Kind",
        description: "The animals board the Ark before the great flood.",
        lesson: "Allah cares for all His creation.",
      },
      {
        id: 5,
        title: "A New Beginning",
        description: "The flood recedes and believers start fresh.",
        lesson: "After every hardship comes ease and new opportunities.",
      },
    ],
    specifications: [
      { label: "Pages", value: "120 pages" },
      { label: "Format", value: "Hardcover" },
      { label: "Dimensions", value: '8.5" x 11"' },
      { label: "Age Range", value: "8-12 years" },
      { label: "Language", value: "English" },
      { label: "ISBN", value: "978-1-234567-93-7" },
    ],
    reviews: [],
    included: [
      "120-page hardcover book",
      "Full-color illustrations throughout",
      "Discussion questions for each chapter",
      "Glossary of Arabic terms",
      "Family reading guide",
      "Access to Ask Noor AI companion",
    ],
  },
];

// Helper function to get book by slug
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

// Helper function to get books by status
export function getBooksByStatus(status: Book["releaseStatus"]): Book[] {
  return books.filter((book) => book.releaseStatus === status);
}
