import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import safariImage from "@/assets/safari.jpg";
import diningImage from "@/assets/dining.jpg";
import villaImage from "@/assets/villa-interior.jpg";
import treehouseImage from "@/assets/treehouse-suite.jpg";
import poolImage from "@/assets/pool.jpg";
import heroImage from "@/assets/hero-resort.jpg";

const packages = [
  {
    image: safariImage,
    name: "Safari Package",
    tagline: "The Ultimate Wildlife Experience",
    duration: "3 Days / 2 Nights",
    price: "₹55,000",
    priceNote: "per couple",
    inclusions: [
      "Luxury Villa Accommodation",
      "All Meals Included",
      "2 Jungle Safaris",
      "Nature Walk with Naturalist",
      "Bonfire Evening",
      "Airport Transfers",
    ],
    featured: true,
  },
  {
    image: diningImage,
    name: "Honeymoon Package",
    tagline: "Romance in the Wilderness",
    duration: "4 Days / 3 Nights",
    price: "₹85,000",
    priceNote: "per couple",
    inclusions: [
      "Treehouse Suite Stay",
      "All Meals + Wine",
      "Candlelight Dinner",
      "Couple Spa Session",
      "1 Jungle Safari",
      "Room Decoration",
    ],
    featured: true,
  },
  {
    image: villaImage,
    name: "Weekend Getaway",
    tagline: "Quick Forest Escape",
    duration: "2 Days / 1 Night",
    price: "₹28,000",
    priceNote: "per couple",
    inclusions: [
      "Forest Villa Stay",
      "Breakfast & Dinner",
      "Nature Walk",
      "Pool Access",
      "Hi-Tea",
    ],
    featured: false,
  },
  {
    image: poolImage,
    name: "Family Package",
    tagline: "Adventures for All Ages",
    duration: "3 Days / 2 Nights",
    price: "₹75,000",
    priceNote: "for 4 guests",
    inclusions: [
      "Pool Villa Stay",
      "All Meals Included",
      "1 Jungle Safari",
      "Kids Activities",
      "Village Tour",
      "Bonfire Evening",
    ],
    featured: false,
  },
  {
    image: treehouseImage,
    name: "Corporate Package",
    tagline: "Team Bonding in Nature",
    duration: "2 Days / 1 Night",
    price: "₹12,000",
    priceNote: "per person (min 10)",
    inclusions: [
      "Shared Accommodation",
      "All Meals + Tea Breaks",
      "Conference Room",
      "Team Activities",
      "Nature Walk",
      "Bonfire & Entertainment",
    ],
    featured: false,
  },
  {
    image: heroImage,
    name: "Wedding Package",
    tagline: "Your Fairytale Forest Wedding",
    duration: "Custom Duration",
    price: "Custom",
    priceNote: "contact for quote",
    inclusions: [
      "Exclusive Resort Booking",
      "Wedding Planning Support",
      "Catering & Bar",
      "Décor (Basic)",
      "Guest Accommodation",
      "Photography Locations",
    ],
    featured: false,
  },
];

const Packages = () => {
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
              <span className="luxury-label text-gold-light">Special Offers</span>
              <h1 className="luxury-heading text-ivory mt-4">
                Packages & Offers
              </h1>
              <p className="text-ivory/70 mt-4 max-w-2xl mx-auto">
                Curated packages designed for every occasion. From romantic getaways 
                to family adventures, find the perfect way to experience Aranya.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="luxury-section bg-cream">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="luxury-label">Most Popular</span>
              <h2 className="luxury-heading text-foreground mt-4">Featured Packages</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {packages
                .filter((pkg) => pkg.featured)
                .map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background rounded-2xl overflow-hidden shadow-luxury"
                  >
                    <div className="relative h-64">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-gold-light text-sm italic">{pkg.tagline}</span>
                        <h3 className="font-serif text-2xl text-ivory">{pkg.name}</h3>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-baseline justify-between mb-6">
                        <div>
                          <span className="font-serif text-3xl font-semibold text-forest-deep">
                            {pkg.price}
                          </span>
                          <span className="text-muted-foreground ml-2">{pkg.priceNote}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{pkg.duration}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {pkg.inclusions.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm">
                            <Check className="w-5 h-5 text-gold shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="luxuryDark" size="lg" className="w-full" asChild>
                        <Link to="/booking">Book This Package</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* All Packages */}
        <section className="luxury-section">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="luxury-label">More Options</span>
              <h2 className="luxury-heading text-foreground mt-4">All Packages</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages
                .filter((pkg) => !pkg.featured)
                .map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-luxury transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-gold text-sm italic">{pkg.tagline}</span>
                      <h3 className="font-serif text-xl text-foreground mt-1">{pkg.name}</h3>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="font-serif text-2xl font-semibold text-forest-deep">
                          {pkg.price}
                        </span>
                        <span className="text-sm text-muted-foreground">{pkg.priceNote}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{pkg.duration}</p>
                      <Button variant="ghost" className="mt-4 w-full text-gold" asChild>
                        <Link to="/contact" className="flex items-center justify-center gap-2">
                          Enquire Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
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

export default Packages;
