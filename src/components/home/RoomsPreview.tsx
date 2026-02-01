import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Maximize, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import villaImage from "@/assets/villa-interior.jpg";
import treehouseImage from "@/assets/treehouse-suite.jpg";
import poolImage from "@/assets/pool.jpg";

const rooms = [
  {
    image: villaImage,
    name: "Forest Villa",
    tagline: "Where comfort meets wilderness",
    size: "1,200 sq ft",
    occupancy: "2 Adults + 1 Child",
    highlight: "Private Forest Deck",
    price: "18,000",
    originalPrice: "22,000",
  },
  {
    image: treehouseImage,
    name: "Treehouse Suite",
    tagline: "An elevated escape among canopy",
    size: "800 sq ft",
    occupancy: "2 Adults",
    highlight: "Stargazing Deck",
    price: "25,000",
    originalPrice: "30,000",
  },
  {
    image: poolImage,
    name: "Pool Villa",
    tagline: "Ultimate luxury with private pool",
    size: "1,800 sq ft",
    occupancy: "2 Adults + 2 Children",
    highlight: "Private Infinity Pool",
    price: "45,000",
    originalPrice: "52,000",
  },
];

export function RoomsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 lg:py-40 bg-forest-deep relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="luxury-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-5 py-2 border border-gold/30 rounded-full text-gold-light text-[11px] uppercase tracking-[0.25em] mb-6">
            Accommodations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-ivory tracking-tight leading-[1.1]">
            Our
            <span className="italic text-gold-light ml-3">Signature Retreats</span>
          </h2>
          <p className="text-ivory/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Each accommodation is thoughtfully designed to immerse you in nature 
            while providing the utmost comfort and luxury.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-forest/50 backdrop-blur-sm border border-ivory/5">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-5 right-5 bg-ivory/95 backdrop-blur-md rounded-xl px-4 py-3 text-center shadow-luxury">
                    <div className="flex items-baseline gap-1">
                      <span className="text-muted-foreground text-xs line-through">₹{room.originalPrice}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-2xl font-semibold text-forest-deep">₹{room.price}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">per night</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <span className="text-gold-light text-sm italic font-serif">
                    {room.tagline}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-ivory mt-2 group-hover:text-gold-light transition-colors">
                    {room.name}
                  </h3>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-ivory/60 text-sm">
                    <span className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-gold" />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold" />
                      {room.occupancy}
                    </span>
                  </div>

                  {/* Highlight Badge */}
                  <div className="flex items-center gap-2 mt-5 text-gold-light text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>{room.highlight}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-ivory/10">
                    <Button variant="luxury" size="sm" asChild className="flex-1">
                      <Link to="/booking">Book Now</Link>
                    </Button>
                    <Link 
                      to="/rooms" 
                      className="flex items-center gap-2 text-ivory/60 hover:text-gold text-sm transition-colors"
                    >
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button variant="luxuryOutline" size="lg" asChild>
            <Link to="/rooms" className="flex items-center gap-3">
              View All Accommodations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
