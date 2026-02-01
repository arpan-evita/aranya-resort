import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import safariImage from "@/assets/safari.jpg";
import diningImage from "@/assets/dining.jpg";
import poolImage from "@/assets/pool.jpg";
import heroImage from "@/assets/hero-resort.jpg";

const experiences = [
  {
    image: safariImage,
    title: "Jungle Safari",
    subtitle: "Wildlife Adventure",
    description:
      "Venture into the heart of Dudhwa National Park on an exclusive safari experience. Our expert naturalists guide you through sal forests and grasslands, where Bengal tigers, one-horned rhinos, and elephants roam freely. Early morning and evening safaris offer the best wildlife encounters.",
    duration: "4-6 hours",
    bestTime: "October - June",
  },
  {
    image: heroImage,
    title: "Nature Walk",
    subtitle: "Mindful Exploration",
    description:
      "Begin your day with a guided nature walk through the resort's private forest trails. Discover medicinal plants, spot exotic birds, and learn about the rich biodiversity of the Terai region. Our naturalists share fascinating stories of the forest ecosystem.",
    duration: "1.5-2 hours",
    bestTime: "Early Morning",
  },
  {
    image: poolImage,
    title: "Bird Watching",
    subtitle: "Avian Paradise",
    description:
      "The Dudhwa region is home to over 450 species of birds. Join our ornithologist for dedicated bird watching sessions. From the majestic Sarus Crane to colorful kingfishers, each sighting is a treasured moment for nature enthusiasts.",
    duration: "2-3 hours",
    bestTime: "Dawn & Dusk",
  },
  {
    image: diningImage,
    title: "Candlelight Dinner",
    subtitle: "Romantic Escape",
    description:
      "Transform your evening into an unforgettable memory with our signature candlelight dinner experience. Set on a private deck overlooking the forest, our chefs prepare a bespoke multi-course meal as you dine under the stars.",
    duration: "2-3 hours",
    bestTime: "Evening",
  },
  {
    image: heroImage,
    title: "Bonfire Evening",
    subtitle: "Starlit Gathering",
    description:
      "As the sun sets and the forest comes alive with nocturnal sounds, gather around our community bonfire. Share stories, enjoy live folk music, and savor gourmet snacks while the stars emerge above the canopy.",
    duration: "2 hours",
    bestTime: "After Dinner",
  },
  {
    image: safariImage,
    title: "Village Tour",
    subtitle: "Cultural Immersion",
    description:
      "Experience the authentic rural life of the Terai region. Visit local villages, interact with farming communities, and witness traditional crafts. This enriching experience offers a glimpse into centuries-old traditions still practiced today.",
    duration: "3-4 hours",
    bestTime: "Morning",
  },
];

const Experiences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-forest-deep">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="luxury-label text-gold-light">Discover</span>
              <h1 className="luxury-heading text-ivory mt-4">
                Curated Experiences
              </h1>
              <p className="text-ivory/70 mt-4 max-w-2xl mx-auto">
                Every moment at Aranya is an opportunity for discovery. From thrilling 
                wildlife safaris to romantic dining under the stars, we've curated 
                experiences that create lasting memories.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="luxury-section">
          <div className="luxury-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl image-zoom mb-6">
                    <div className="aspect-[4/5]">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-gold-light text-xs uppercase tracking-widest">
                        {experience.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl text-ivory mt-1">
                        {experience.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {experience.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-gold">●</span>
                      {experience.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-gold">●</span>
                      {experience.bestTime}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Experiences;
