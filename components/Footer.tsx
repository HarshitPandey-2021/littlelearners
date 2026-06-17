import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle, Share2, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary-tint border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-display font-bold text-lg text-ink">
                LittleLearners
              </span>
            </div>
            <p className="text-sm text-ink-muted">
              Where curious minds begin their greatest adventure
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><a href="#programs" className="hover:text-primary transition-colors">Programs</a></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#outcomes" className="hover:text-primary transition-colors">Learning Outcomes</a></li>
              <li><Link href="/enroll" className="hover:text-primary transition-colors">Enroll Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:hello@littlelearners.com" className="hover:text-primary transition-colors">
                  hello@littlelearners.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>123 Learning Street, Education City, EC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ink-muted">
          <p>© 2024 LittleLearners Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}