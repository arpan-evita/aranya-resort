import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Maximize, Eye, Wifi, Coffee, Bath, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import villaImage from "@/assets/villa-interior.jpg";
import treehouseImage from "@/assets/treehouse-suite.jpg";
import poolImage from "@/assets/pool.jpg";

const rooms = [
  {
    id: "forest-villa",
    image: villaImage,
    name: "Forest Villa",
    tagline: "Where comfort meets wilderness",
    description:
      "Our signature Forest Villas offer an immersive experience with floor-to-ceiling windows that frame the lush jungle. Each villa features a private deck, outdoor shower, and handcrafted furnishings that celebrate local craftsmanship.",
    size: "1,200 sq ft",
    occupancy: "2 Adults + 1 Child",
    view: "Forest View",
    bedType: "King Size Canopy Bed",
    price: "₹18,000",
    priceNote: "per night, inclusive of breakfast",
    amenities: ["Private Deck", "Outdoor Shower", "Mini Bar", "24hr Room Service", "WiFi", "Butler Service"],
  },
  {
    id: "treehouse-suite",
    image: treehouseImage,
    name: "Treehouse Suite",
    tagline: "An elevated escape among the canopy",
    description:
      "Perched above the forest floor, our Treehouse Suites offer an unparalleled connection with nature. Wake up to bird songs, watch the sunrise through the treetops, and enjoy complete privacy in this romantic retreat.",
    size: "800 sq ft",
    occupancy: "2 Adults",
    view: "Canopy View",
    bedType: "King Size Four-Poster Bed",
    price: "₹25,000",
    priceNote: "per night, inclusive of breakfast",
    amenities: ["Private Balcony", "Stargazing Deck", "Mini Bar", "24hr Room Service", "WiFi", "Butler Service"],
  },
  {
    id: "pool-villa",
    image: poolImage,
    name: "Pool Villa",
    tagline: "Ultimate luxury with private infinity pool",
    description:
      "The epitome of luxury, our Pool Villas feature a private infinity pool overlooking the forest. Perfect for honeymoons or those seeking the ultimate indulgence, these villas offer complete seclusion and personalized service.",
    size: "1,800 sq ft",
    occupancy: "2 Adults + 2 Children",
    view: "Forest & Pool View",
    bedType: "King Size Bed with Premium Linens",
    price: "₹45,000",
    priceNote: "per night, inclusive of breakfast",
    amenities: ["Private Pool", "Outdoor Dining", "Full Bar", "24hr Room Service", "WiFi", "Personal Butler"],
  },
];

const Rooms = () => {
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
              <span className="luxury-label text-gold-light">Accommodations</span>
              <h1 className="luxury-heading text-ivory mt-4">
                Rooms & Villas
              </h1>
              <p className="text-ivory/70 mt-4 max-w-2xl mx-auto">
                Each accommodation is a sanctuary of luxury, thoughtfully designed to 
                immerse you in the beauty of the forest while providing every modern comfort.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="luxury-section">
          <div className="luxury-container">
            <div className="space-y-24">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-2xl image-zoom shadow-luxury">
                      <div className="aspect-[4/3]">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-6 right-6 bg-ivory/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                        <span className="block font-serif text-xl font-semibold text-forest-deep">
                          {room.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          per night
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-gold text-sm italic font-serif">
                      {room.tagline}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mt-2 mb-4">
                      {room.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Room Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Maximize className="w-5 h-5 text-gold" />
                        <span className="text-sm">{room.size}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gold" />
                        <span className="text-sm">{room.occupancy}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-gold" />
                        <span className="text-sm">{room.view}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bath className="w-5 h-5 text-gold" />
                        <span className="text-sm">{room.bedType}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-secondary rounded-full text-xs text-foreground"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="luxuryDark" size="lg" asChild>
                        <Link to="/booking">Book Now</Link>
                      </Button>
                      <Button variant="ghost" asChild className="text-gold hover:text-forest">
                        <Link to={`/rooms/${room.id}`} className="flex items-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
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

export default Rooms;
