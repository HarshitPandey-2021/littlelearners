import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1FuHf4ganM/',
    bg: 'bg-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/laenglishatelier?igsh=N3hmM2RtYmhsN2tx',
    bg: 'bg-gradient-to-br from-[#FEDA77] via-[#D62976] to-[#4F5BD5]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.1 4.1 0 0 1-1.51-.98 4.1 4.1 0 0 1-.98-1.51c-.16-.46-.35-1.26-.4-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.16 1.26-.35 2.43-.4C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.14 0-3.5.01-4.74.07-1.02.05-1.57.21-1.94.36-.49.19-.83.42-1.2.78a3.27 3.27 0 0 0-.78 1.2c-.15.37-.31.92-.36 1.94-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.02.21 1.57.36 1.94.19.49.42.83.78 1.2.37.37.71.6 1.2.78.37.15.92.31 1.94.36 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.02-.05 1.57-.21 1.94-.36.49-.19.83-.42 1.2-.78.37-.37.6-.71.78-1.2.15-.37.31-.92.36-1.94.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.02-.21-1.57-.36-1.94a3.27 3.27 0 0 0-.78-1.2 3.27 3.27 0 0 0-1.2-.78c-.37-.15-.92-.31-1.94-.36-1.24-.06-1.6-.07-4.74-.07Zm0 4.13a5.09 5.09 0 1 1 0 10.18 5.09 5.09 0 0 1 0-10.18Zm0 1.62a3.47 3.47 0 1 0 0 6.94 3.47 3.47 0 0 0 0-6.94Zm5.6-3.31a1.19 1.19 0 1 1-2.38 0 1.19 1.19 0 0 1 2.38 0Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rashida-zaidi-27184761?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    bg: 'bg-[#0A66C2]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.34 18.34H5.67V9.83h2.67v8.51ZM7 8.7a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.34 9.64h-2.67v-4.16c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.23H10v-8.51h2.56v1.16h.04c.36-.68 1.24-1.4 2.56-1.4 2.74 0 3.25 1.8 3.25 4.15v4.6Z" />
      </svg>
    ),
  },
]

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
                La English Atelier
              </span>
            </div>
            <p className="text-sm text-ink-muted">
              Making Learners Globally Ready
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="/#programs" className="hover:text-primary transition-colors">Programs</a></li>
              <li><a href="/#why-us" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="/#outcomes" className="hover:text-primary transition-colors">Learning Outcomes</a></li>
              <li><Link href="/enroll" className="hover:text-primary transition-colors">Enroll Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+91 9335044403" className="hover:text-primary transition-colors">
                  +91 9335044403
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:laenglishatelier@gmail.com" className="hover:text-primary transition-colors">
                  laenglishatelier@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold text-ink mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200 ${social.bg}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ink-muted">
          <p>© 2026 La English Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}