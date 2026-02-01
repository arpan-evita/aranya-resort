import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <span className="luxury-label text-gold-light">Get in Touch</span>
              <h1 className="luxury-heading text-ivory mt-4">Contact Us</h1>
              <p className="text-ivory/70 mt-4 max-w-2xl mx-auto">
                We'd love to hear from you. Whether you're planning a stay, 
                have questions, or need assistance, our team is here to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="luxury-section">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl font-medium text-foreground mb-8">
                  Let's Start a Conversation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Our dedicated concierge team is available around the clock to 
                  assist with reservations, special requests, and personalized 
                  itineraries. Reach out through any of the channels below.
                </p>

                <div className="space-y-6">
                  <a
                    href="tel:+919999999999"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center group-hover:bg-forest transition-colors">
                      <Phone className="w-6 h-6 text-gold group-hover:text-ivory transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+91 99999 99999</p>
                      <p className="text-sm text-muted-foreground">
                        Available 24/7 for reservations
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:reservations@aranyaresort.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center group-hover:bg-forest transition-colors">
                      <Mail className="w-6 h-6 text-gold group-hover:text-ivory transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">
                        reservations@aranyaresort.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Response within 24 hours
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center group-hover:bg-forest transition-colors">
                      <MessageCircle className="w-6 h-6 text-gold group-hover:text-ivory transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">WhatsApp</h3>
                      <p className="text-muted-foreground">+91 99999 99999</p>
                      <p className="text-sm text-muted-foreground">
                        Quick enquiries & bookings
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Address</h3>
                      <p className="text-muted-foreground">
                        Near Dudhwa National Park,
                        <br />
                        Lakhimpur Kheri, Uttar Pradesh,
                        <br />
                        India - 262902
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-card rounded-3xl p-8 md:p-10 shadow-luxury">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Your Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99999 99999"
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Reservation Enquiry"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Your Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="luxuryDark"
                      size="lg"
                      className="w-full"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[400px] bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3545.5792832752!2d80.88657631506025!3d28.331157882506875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0b0c8c4b8d8e7%3A0x3f1c0f8f8f8f8f8f!2sDudhwa%20National%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aranya Resort Location"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
