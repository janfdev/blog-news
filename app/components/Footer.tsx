import {
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Github,
  Dribbble
} from "lucide-react";
import Link from "next/link";
import { Rocket } from "lucide-react";

// Define sections as a constant
const sections = [
  {
    title: "Services",
    links: [
      { name: "1on1 Coaching", href: "#" },
      { name: "Company Review", href: "#" },
      { name: "Accounts Review", href: "#" },
      { name: "HR Consulting", href: "#" },
      { name: "SEO Optimisation", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Meet the Team", href: "#" },
      { name: "Accounts Review", href: "#" }
    ]
  },
  {
    title: "Helpful Links",
    links: [
      { name: "Contact", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Live Chat", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Accessibility", href: "#" },
      { name: "Returns Policy", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Hiring Statistics", href: "#" }
    ]
  }
];

// Define social links as a constant
const socialLinks = [
  { icon: Twitter, name: "Twitter", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" },
  { icon: Facebook, name: "Facebook", href: "#" },
  { icon: Github, name: "GitHub", href: "#" },
  { icon: Dribbble, name: "Dribbble", href: "#" }
];

export default function Footer() {
  return (
    <footer className="container mx-auto py-16">
      <div className="space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center gap-1 text-primary">
              <Rocket size={32} strokeWidth={2.7} />
              <span className="text-xl font-bold">StarterBlocks</span>
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            {/* Social Links */}
            <ul className="mt-8 flex gap-6">
              {socialLinks.map(({ icon: Icon, name, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {sections.map((section, idx) => (
              <div key={idx}>
                <p className="font-medium text-foreground">{section.title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; 2022. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
