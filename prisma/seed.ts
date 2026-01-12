import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Blog posts data from the constants file
const blogPosts = [
  {
    slug: "why-seerah-matters-for-kids",
    title: "Why Learning Seerah Matters for Your Kids",
    excerpt:
      "The Prophet's life isn't just history—it's a roadmap for raising confident, compassionate Muslim children in today's world.",
    content: `<p>The Prophet Muhammad (peace be upon him) lived over 1,400 years ago, yet his life remains the most relevant guide for Muslims today. But why is it so important for our children to learn about him?</p>

<h2>Building Identity</h2>

<p>In a world where Muslim children often feel different from their peers, knowing the Prophet's story helps them understand who they are and where they come from. It gives them heroes to look up to—real heroes who faced real challenges.</p>

<h2>Practical Life Lessons</h2>

<p>The Seerah isn't abstract theology. It's full of practical lessons:</p>
<ul>
<li>How to be honest even when it's hard</li>
<li>How to treat others with kindness</li>
<li>How to stay patient during difficulties</li>
<li>How to forgive those who hurt you</li>
</ul>

<h2>Connection to Faith</h2>

<p>When children know the Prophet as a person—his smile, his jokes, his love for children—their faith becomes personal. It's no longer about rules; it's about following someone they know and love.</p>

<h2>Starting the Conversation</h2>

<p>The best time to introduce Seerah is now. Whether your child is 5 or 12, there's always an age-appropriate way to share these beautiful stories.</p>

<p>That's exactly why we created Curious Muslim—to make the Prophet's story accessible, engaging, and meaningful for the next generation.</p>`,
    publishedAt: "2025-01-15",
    tags: ["Parenting", "Seerah", "Islamic Education"],
  },
  {
    slug: "5-ways-to-make-islamic-learning-fun",
    title: "5 Ways to Make Islamic Learning Fun for Kids",
    excerpt:
      "Struggling to get your kids excited about Islamic education? Here are proven strategies that actually work.",
    content: `<p>Let's be honest: getting kids excited about learning—anything—can be challenging. Add religious education to the mix, and many parents feel stuck.</p>

<p>But it doesn't have to be this way. Here are five strategies that work:</p>

<h2>1. Tell Stories, Don't Lecture</h2>

<p>Children are wired for stories. Instead of explaining concepts, tell the stories behind them. Why do we fast? Tell them about the first Ramadan. Why do we pray? Share how the Prophet received this gift.</p>

<h2>2. Make It Interactive</h2>

<p>Ask questions. Let them ask questions. Use props, drawings, and activities. Learning should be a conversation, not a monologue.</p>

<h2>3. Connect to Their World</h2>

<p>Help children see how Islamic values apply to their daily lives. Honesty at school. Kindness to siblings. Patience when things don't go their way.</p>

<h2>4. Use Quality Resources</h2>

<p>Invest in books, apps, and content that are engaging and age-appropriate. Children today are used to high-quality media—Islamic content should meet that standard.</p>

<h2>5. Model What You Teach</h2>

<p>Children learn more from watching than listening. Let them see you pray, read Quran, and practice what you preach.</p>

<h2>The Bottom Line</h2>

<p>Islamic education should be a joy, not a chore. When children associate their faith with warmth, love, and belonging, they'll carry it with them for life.</p>`,
    publishedAt: "2025-01-10",
    tags: ["Parenting", "Tips", "Islamic Education"],
  },
  {
    slug: "introducing-noor-your-childs-new-favorite-storyteller",
    title: "Introducing Noor: Your Child's New Favorite Storyteller",
    excerpt:
      "Meet the warm, wise narrator who brings the Prophet's story to life in a way kids actually want to hear.",
    content: `<p>Every great story needs a great storyteller. For Curious Muslim, that storyteller is Noor.</p>

<h2>Who is Noor?</h2>

<p>Noor isn't a scholar giving a lecture. He's that trusted family friend who always knows how to explain things in a way that makes sense. He's warm, patient, and has a gift for making history feel alive.</p>

<h2>Why a Storyteller Character?</h2>

<p>We wanted to create a bridge between children and the Prophet's story. Noor serves as that bridge—someone relatable who guides children through events that happened long ago.</p>

<h2>How Noor Teaches</h2>

<p>When Noor sits down with Adam, Hana, and Mansour, it's not a lecture. It's a conversation:</p>
<ul>
<li>The kids interrupt with questions</li>
<li>They make jokes and react emotionally</li>
<li>They connect the stories to their own lives</li>
</ul>

<p>This mirrors how real children engage with stories—and makes the learning stick.</p>

<h2>The Magic of Noor's Approach</h2>

<p>Noor never talks down to children. He respects their curiosity and takes their questions seriously. Whether a child asks "Why did people not believe the Prophet?" or "Did the Prophet have a favorite color?", Noor responds with patience and wisdom.</p>

<h2>Meet Noor in the Book</h2>

<p>In "Stories of the Prophets," you'll experience Noor's storytelling firsthand. We can't wait for your children to meet him.</p>`,
    publishedAt: "2025-01-05",
    tags: ["Book Preview", "Characters"],
  },
  {
    slug: "ramadan-reading-list-for-muslim-kids",
    title: "The Ultimate Ramadan Reading List for Muslim Kids",
    excerpt:
      "Curated books to help your children connect with Ramadan's spiritual essence this year.",
    content: `<p>Ramadan is the perfect time to establish reading habits and deepen your child's understanding of Islam. Here's our curated list of books for different age groups.</p>

<h2>Ages 3-5: Picture Books</h2>

<p>At this age, focus on beautiful illustrations and simple concepts:</p>
<ul>
<li>Books about the moon and stars</li>
<li>Simple Ramadan routines</li>
<li>Sharing and kindness themes</li>
</ul>

<h2>Ages 6-8: Early Readers</h2>

<p>Children can start understanding more:</p>
<ul>
<li>The story of Ramadan's revelation</li>
<li>Why we fast</li>
<li>Eid celebrations around the world</li>
</ul>

<h2>Ages 9-12: Chapter Books</h2>

<p>This is where deeper learning happens:</p>
<ul>
<li>Seerah stories (like Curious Muslim!)</li>
<li>Stories of the Sahaba</li>
<li>Islamic history adventures</li>
</ul>

<h2>Tips for Ramadan Reading</h2>

<ol>
<li><strong>Set a daily reading time</strong> - Maybe after iftar or before bed</li>
<li><strong>Read together</strong> - Even older kids love being read to</li>
<li><strong>Discuss what you read</strong> - Ask questions, share thoughts</li>
<li><strong>Make it special</strong> - Create a cozy reading corner</li>
</ol>

<h2>Our Recommendation</h2>

<p>Of course, we'd love for "Stories of the Prophets" to be part of your Ramadan reading! It's designed to spark meaningful conversations about the Prophet's life.</p>

<p>Ramadan Mubarak to your family!</p>`,
    publishedAt: "2024-12-28",
    tags: ["Ramadan", "Book Recommendations", "Parenting"],
  },
  {
    slug: "how-to-answer-tough-questions-about-islam",
    title: "How to Answer Your Child's Tough Questions About Islam",
    excerpt:
      "When your child asks difficult questions about faith, here's how to respond with confidence and honesty.",
    content: `<p>"Why can't we celebrate Christmas?" "Why do some people not like Muslims?" "Is Allah real?"</p>

<p>If these questions make you nervous, you're not alone. Here's how to handle them.</p>

<h2>First: Celebrate the Questions</h2>

<p>A child who asks questions is a child who's thinking. That's exactly what we want! Don't shut down curiosity—nurture it.</p>

<h2>The "I Don't Know" Response</h2>

<p>It's okay to say "I don't know, but let's find out together." This models intellectual humility and shows that learning is lifelong.</p>

<h2>Age-Appropriate Honesty</h2>

<p>Tailor your answers to your child's age:</p>
<ul>
<li><strong>Young children</strong> need simple, reassuring answers</li>
<li><strong>Older children</strong> can handle more nuance and complexity</li>
</ul>

<h2>Some Common Questions</h2>

<p><strong>"Why do we pray five times a day?"</strong><br>
Because it's how we stay connected to Allah throughout our day. Like how you check in with family, we check in with our Creator.</p>

<p><strong>"Why can't I eat what my friends eat?"</strong><br>
We follow guidelines that help us stay healthy and mindful of Allah. It's one of the ways we show our faith.</p>

<p><strong>"Do other religions go to heaven?"</strong><br>
Allah is the Most Merciful and the Most Just. He knows everyone's heart. Our job is to be the best Muslims we can be.</p>

<h2>Resources Help</h2>

<p>This is exactly why we created the character-driven conversations in Curious Muslim. Watching Noor answer Adam, Hana, and Mansour's questions gives parents a model for their own conversations.</p>

<p>You've got this, parents!</p>`,
    publishedAt: "2024-12-20",
    tags: ["Parenting", "Faith", "Tips"],
  },
  {
    slug: "behind-the-scenes-creating-curious-muslim",
    title: "Behind the Scenes: Creating Curious Muslim",
    excerpt:
      "A look at the journey of bringing this book to life—from concept to illustration to your family's hands.",
    content: `<p>Creating Curious Muslim has been a labor of love. Here's a peek behind the curtain.</p>

<h2>The Spark</h2>

<p>It started with a simple frustration: Where are the high-quality Islamic books for our kids? The kind with beautiful illustrations, engaging stories, and content that speaks to Western Muslim children?</p>

<p>We couldn't find them. So we decided to create them.</p>

<h2>Assembling the Team</h2>

<p>We brought together:</p>
<ul>
<li>Writers with backgrounds in Islamic studies and children's literature</li>
<li>Illustrators who understand Islamic artistic guidelines</li>
<li>Educators who work with Muslim children daily</li>
<li>Parents who know what families need</li>
</ul>

<h2>The Writing Process</h2>

<p>Every chapter went through multiple rounds:</p>
<ol>
<li>Research authentic sources</li>
<li>Draft the narrative</li>
<li>Add the children's voices and questions</li>
<li>Review for accuracy</li>
<li>Test with real families</li>
<li>Revise based on feedback</li>
</ol>

<h2>The Art</h2>

<p>Our illustrations were the biggest investment—and the most rewarding. We wanted art that:</p>
<ul>
<li>Respects Islamic guidelines (no depiction of the Prophet)</li>
<li>Appeals to modern children</li>
<li>Brings the historical settings to life</li>
<li>Reflects diverse Muslim families</li>
</ul>

<h2>What's Next</h2>

<p>This is just the beginning. We have plans for:</p>
<ul>
<li>More books in the series</li>
<li>Activity companions</li>
<li>Digital experiences</li>
<li>And much more...</li>
</ul>

<p>Thank you for being part of this journey!</p>`,
    publishedAt: "2024-12-15",
    tags: ["Behind the Scenes", "Book Preview"],
  },
];

async function main() {
  console.log("Starting seed...");

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@curiousmuslim.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log(`Created admin user: ${admin.email}`);

  // Create tags first
  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];
  const tagMap: Record<string, string> = {};

  for (const tagName of allTags) {
    const slug = tagName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug },
    });

    tagMap[tagName] = tag.id;
    console.log(`Created tag: ${tagName}`);
  }

  // Create posts
  for (const post of blogPosts) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: post.slug },
    });

    if (existingPost) {
      console.log(`Post already exists: ${post.title}`);
      continue;
    }

    await prisma.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        authorId: admin.id,
        status: "published",
        publishedAt: new Date(post.publishedAt),
        tags: {
          create: post.tags.map((tagName) => ({
            tagId: tagMap[tagName],
          })),
        },
      },
    });

    console.log(`Created post: ${post.title}`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
