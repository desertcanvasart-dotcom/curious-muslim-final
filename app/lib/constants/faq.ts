export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "book" | "shipping" | "content" | "general" | "ask-noor";
}

export const faqs: FAQItem[] = [
  // Book Questions
  {
    id: "age-range",
    question: "What age group is this book for?",
    answer:
      "Stories of the Prophets is designed for children ages 8-12 who can read independently. However, it's also perfect for younger children (5-7) when read aloud by a parent. The conversational style and beautiful illustrations engage kids of all ages, and many parents enjoy reading it alongside their children.",
    category: "book",
  },
  {
    id: "book-format",
    question: "What formats is the book available in?",
    answer:
      "The book is available in both hardcover ($24.99) and paperback ($16.99). Both versions feature the same beautiful full-color illustrations and high-quality paper. The hardcover makes a wonderful gift and is more durable for frequent reading.",
    category: "book",
  },
  {
    id: "page-count",
    question: "How many pages is the book?",
    answer:
      "The book is 64 pages of full-color content, including 12 chapters covering the life of Prophet Muhammad from birth to his final message. Every page features stunning illustrations that bring the story to life.",
    category: "book",
  },
  {
    id: "other-languages",
    question: "Is the book available in other languages?",
    answer:
      "Currently, the book is only available in English with gentle Arabic phrases woven throughout. We're exploring translations into Arabic, French, and Urdu based on community interest. Sign up for our newsletter to be notified when new language editions become available.",
    category: "book",
  },

  // Shipping Questions
  {
    id: "shipping-time",
    question: "How long does shipping take?",
    answer:
      "Domestic US orders typically arrive within 5-7 business days. Canadian orders take 7-10 business days. UK and European orders arrive in 10-14 business days. For other international destinations, please allow 2-4 weeks. You'll receive tracking information once your order ships.",
    category: "shipping",
  },
  {
    id: "international-shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to most countries worldwide. International shipping costs vary by location and will be calculated at checkout. Please note that customers are responsible for any customs duties or import taxes that may apply in their country.",
    category: "shipping",
  },
  {
    id: "bulk-orders",
    question: "Do you offer bulk discounts for schools or masjids?",
    answer:
      "Absolutely! We offer special pricing for Islamic schools, masjids, and educational institutions ordering 10 or more copies. Please contact us at hello@curiousmuslim.com with your organization name and quantity needed, and we'll provide a custom quote.",
    category: "shipping",
  },

  // Content Questions
  {
    id: "islamic-accuracy",
    question: "Is the content Islamically accurate?",
    answer:
      "Yes, all content has been carefully researched using authentic Islamic sources and reviewed by qualified scholars. We prioritize accuracy while making the stories accessible and engaging for young readers. Our goal is to present the Seerah in a way that's both authentic and age-appropriate.",
    category: "content",
  },
  {
    id: "illustrations",
    question: "Do the illustrations show the Prophet's face?",
    answer:
      "No. Following Islamic tradition, the Prophet Muhammad is never depicted in our illustrations. Instead, we use creative artistic approaches to tell his story - showing scenes from his perspective, using symbolic imagery, and focusing on the people and world around him.",
    category: "content",
  },
  {
    id: "all-families",
    question: "Is this suitable for all Muslim families?",
    answer:
      "We've created this book to resonate with diverse Muslim families while staying true to core Islamic teachings. The focus is on universal values like honesty, kindness, patience, and faith. We've avoided controversial topics and focused on what unites us as Muslims.",
    category: "content",
  },

  // General Questions
  {
    id: "more-books",
    question: "Will there be more books in this series?",
    answer:
      "Yes! We're planning a series of Curious Muslim books covering other prophets and Islamic topics. The next book will focus on Prophet Ibrahim (Abraham) and is planned for release in late 2026. Join our newsletter to be the first to know about new releases.",
    category: "general",
  },
  {
    id: "author",
    question: "Who created this book?",
    answer:
      "Curious Muslim was created by a team of Muslim parents, educators, and artists who saw a need for high-quality Islamic content for children growing up in the West. Our team includes writers with backgrounds in Islamic studies, professional illustrators, and educators with experience in Islamic schools.",
    category: "general",
  },

  // Ask Noor Questions
  {
    id: "what-is-ask-noor",
    question: "What is Ask Noor?",
    answer:
      "Ask Noor is our friendly AI companion based on the storyteller character from our book. Children can ask Noor questions about Islam, the Prophet's life, and Islamic values, and receive age-appropriate, engaging responses. It's designed to be a safe, educational tool that encourages curiosity about Islam.",
    category: "ask-noor",
  },
  {
    id: "ask-noor-safe",
    question: "Is Ask Noor safe for children?",
    answer:
      "Yes! Ask Noor is specifically designed for children. All responses are filtered to be age-appropriate, and the AI is trained to redirect inappropriate questions. However, we recommend parental supervision, especially for younger children. Ask Noor is meant to supplement - not replace - learning from parents, teachers, and scholars.",
    category: "ask-noor",
  },
  {
    id: "ask-noor-accuracy",
    question: "Are Ask Noor's answers Islamically accurate?",
    answer:
      "Ask Noor's responses are based on authentic Islamic sources and designed to align with mainstream Islamic teachings. However, like any AI tool, it may occasionally make mistakes. We encourage parents to review answers with their children and consult qualified scholars for detailed religious questions.",
    category: "ask-noor",
  },
];

export function getFAQsByCategory(category: FAQItem["category"]): FAQItem[] {
  return faqs.filter((faq) => faq.category === category);
}

export function getFAQById(id: string): FAQItem | undefined {
  return faqs.find((faq) => faq.id === id);
}

export const faqCategories = [
  { id: "book", label: "About the Book", icon: "📖" },
  { id: "shipping", label: "Shipping & Orders", icon: "📦" },
  { id: "content", label: "Content & Accuracy", icon: "✨" },
  { id: "ask-noor", label: "Ask Noor AI", icon: "🤖" },
  { id: "general", label: "General", icon: "❓" },
] as const;
