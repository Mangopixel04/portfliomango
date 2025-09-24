import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MagneticElement from "@/components/ui/magnetic-element";
import { Mail, Phone, Linkedin, Github, Twitter, Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20" data-testid="contact-section">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16" data-testid="contact-title">
          Let's <span className="gradient-text">Connect</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold mb-8" data-testid="contact-subtitle">Ready to create something amazing?</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="contact-description-1">
              Whether you're looking to build a cutting-edge web application, integrate AI capabilities, or create immersive 3D experiences, I'm here to bring your vision to life.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="contact-description-2">
              Let's discuss your project and explore how we can create something extraordinary together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4" data-testid="contact-info-email">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">alex.chen@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4" data-testid="contact-info-phone">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4" data-testid="contact-info-location">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>

              <div className="flex items-center space-x-4" data-testid="contact-info-linkedin">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-muted-foreground">linkedin.com/in/alexchen</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8" data-testid="social-links">
              <MagneticElement>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                  data-testid="social-github"
                >
                  <Github className="h-6 w-6 text-primary" />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors"
                  data-testid="social-twitter"
                >
                  <Twitter className="h-6 w-6 text-accent" />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  data-testid="social-linkedin"
                >
                  <Linkedin className="h-6 w-6 text-purple-500" />
                </a>
              </MagneticElement>
            </div>
          </div>

          {/* Advanced Contact Form */}
          <Card className="glassmorphism" data-testid="contact-form">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium mb-2">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-2">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectType" className="block text-sm font-medium mb-2">Project Type</Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger data-testid="select-project-type">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="3d-experience">3D Interactive Experience</SelectItem>
                      <SelectItem value="ai-integration">AI Integration</SelectItem>
                      <SelectItem value="mobile-app">Mobile Application</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget" className="block text-sm font-medium mb-2">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger data-testid="select-budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                      <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                      <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                      <SelectItem value="50k+">$50k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <MagneticElement>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                    disabled={isSubmitting}
                    data-testid="button-send-message"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </MagneticElement>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
