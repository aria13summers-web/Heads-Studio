import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Sparkles,
  X,
} from 'lucide-react'

const BUSINESS = {
  name: 'Heads Hair Studio',
  tagline: 'Where Every Cut Tells Your Story',
  phone: '083 833 0577',
  phoneInternational: '+27838330577',
  phoneLink: 'tel:+27838330577',
  email: 'christelle.heads@gmail.com',
  emailLink: 'mailto:christelle.heads@gmail.com',
  whatsappLink: 'https://wa.me/27838330577',
  address:
    '9 President Steyn Ave, Westdene, Bloemfontein, 9301, Free State, South Africa',
  addressLines: [
    '9 President Steyn Ave',
    'Westdene, Bloemfontein',
    '9301, Free State, South Africa',
  ],
  schemaAddress: {
    streetAddress: '9 President Steyn Ave',
    addressLocality: 'Bloemfontein',
    postalCode: '9301',
    addressRegion: 'Free State',
    addressCountry: 'ZA',
  },
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=9%20President%20Steyn%20Ave%2C%20Westdene%2C%20Bloemfontein%2C%209301%2C%20Free%20State%2C%20South%20Africa',
  mapEmbedLink:
    'https://maps.google.com/maps?q=9+President+Steyn+Ave%2C+Westdene%2C+Bloemfontein%2C+9301%2C+Free+State%2C+South+Africa&output=embed',
  hours: [
    { day: 'Monday', shortDay: 'Mon', time: '8am–5pm' },
    { day: 'Tuesday', shortDay: 'Tue', time: '8am–5pm' },
    { day: 'Wednesday', shortDay: 'Wed', time: '8am–5pm' },
    { day: 'Thursday', shortDay: 'Thu', time: '8am–5pm' },
    { day: 'Friday', shortDay: 'Fri', time: '8am–5pm' },
    { day: 'Saturday', shortDay: 'Sat', time: '8am–1pm' },
    { day: 'Sunday', shortDay: 'Sun', time: 'Closed' },
  ],
  socialLinks: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Our story', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Visit', href: '#visit' },
  ],
}

const IMAGES = {
  // Unsplash stock placeholders; replace with original studio photography.
  hero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1500&q=85',
  about:
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
  ],
}

const SERVICES = [
  {
    name: 'Cuts & Styling',
    description:
      'A considered cut and styling direction, shaped around the way you like to wear your hair.',
  },
  {
    name: 'Colour',
    description:
      'Explore a fresh tone, a subtle shift, or a colour direction that feels distinctly yours.',
  },
  {
    name: 'Treatments',
    description:
      'A moment of focused care, with treatment options to discuss at your appointment.',
  },
  {
    name: 'Bridal & Occasion',
    description:
      'Polished styling for celebrations, special plans, and the moments worth dressing for.',
  },
  {
    name: "Men's Grooming",
    description:
      'Thoughtful cuts and grooming, with a finish that feels easy to make your own.',
  },
]

const REVIEW_PLACEHOLDERS = [
  {
    label: 'REVIEW PLACEHOLDER 01',
    copy: 'Replace this space with a real, approved client review before publishing.',
  },
  {
    label: 'REVIEW PLACEHOLDER 02',
    copy: 'Add a verified client story here when one is available.',
  },
  {
    label: 'REVIEW PLACEHOLDER 03',
    copy: 'This is placeholder copy, not a client testimonial.',
  },
]

const TODAY = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(
  new Date(),
)

const BOOKING_LINK = `${BUSINESS.emailLink}?subject=${encodeURIComponent(
  `Booking enquiry — ${BUSINESS.name}`,
)}`

function businessSchema() {
  const dayNames = {
    Monday: 'https://schema.org/Monday',
    Tuesday: 'https://schema.org/Tuesday',
    Wednesday: 'https://schema.org/Wednesday',
    Thursday: 'https://schema.org/Thursday',
    Friday: 'https://schema.org/Friday',
    Saturday: 'https://schema.org/Saturday',
    Sunday: 'https://schema.org/Sunday',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: BUSINESS.name,
    description: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    telephone: BUSINESS.phoneInternational,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS.schemaAddress,
    },
    openingHoursSpecification: BUSINESS.hours
      .filter(({ time }) => time !== 'Closed')
      .map(({ day, time }) => {
        const [opens, closes] = time
          .replaceAll('am', ':00')
          .replaceAll('pm', ':00')
          .split('–')

        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: dayNames[day],
          opens: opens.replace('8:00', '08:00').replace('1:00', '13:00'),
          closes: closes.replace('5:00', '17:00').replace('1:00', '13:00'),
        }
      }),
  }
}

function Button({
  href,
  children,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  className = '',
  ...props
}) {
  const external = href.startsWith('http')

  return (
    <a
      className={`button button--${variant} ${className}`.trim()}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      <span>{children}</span>
      <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
    </a>
  )
}

function SectionHeading({ title, children, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Heads Hair Studio home">
        <span className="wordmark__name">HEADS</span>
        <span className="wordmark__sub">HAIR STUDIO</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {BUSINESS.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Button
        className="header-book"
        href={BOOKING_LINK}
        variant="outline"
      >
        Book Now
      </Button>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav
        className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {BUSINESS.navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        ))}
        <Button
          className="mobile-nav__book"
          href={BOOKING_LINK}
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </Button>
      </nav>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72])

  return (
    <section className="hero" id="home" ref={ref} aria-labelledby="hero-title">
      <div className="hero__image-wrap" aria-hidden="true">
        <motion.img
          className="hero__image"
          src={IMAGES.hero}
          alt=""
          fetchPriority="high"
          style={{ y: reduceMotion ? 0 : imageY }}
        />
      </div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__location">
          <MapPin aria-hidden="true" size={14} />
          WESTDENE · BLOEMFONTEIN
        </p>
        {/* REACTBITES: swap in animated text here */}
        <h1 className="hero__title" id="hero-title">
          Your story,
          <br />
          <span>in every strand.</span>
        </h1>
        <p className="hero__tagline">{BUSINESS.tagline}</p>
        <p className="hero__intro">
          A thoughtful cut. A new point of view. A little time that belongs to
          you.
        </p>
        <div className="hero__actions">
          <Button href={BOOKING_LINK}>Book Your Cut</Button>
          <Button href="#services" variant="outline">
            View Services
          </Button>
        </div>
      </div>

      <div className="hero__side-note" aria-hidden="true">
        <span>GOOD HAIR, GOOD FEELING</span>
        <span className="hero__side-line" />
      </div>
      <a className="hero__scroll" href="#services" aria-label="Scroll to services">
        <span>SCROLL TO DISCOVER</span>
        <ArrowDown aria-hidden="true" size={15} />
      </a>
      <div className="hero__image-caption">
        <span>AN EXPRESSION OF YOU</span>
        <span>01 — 07</span>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-label={BUSINESS.tagline}>
      {/* REACTBITES: swap in animated marquee here */}
      <div className="marquee__track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span className="marquee__group" key={index}>
            <span>YOUR HAIR, YOUR STORY</span>
            <Sparkles size={16} strokeWidth={1.5} />
            <span>MAKE ROOM FOR YOU</span>
            <Sparkles size={16} strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <Reveal className="services-intro">
          <SectionHeading title="A little something for your hair.">
            From a fresh shape to a special-occasion finish, find the service
            that feels right for you.
          </SectionHeading>
          <a className="text-link" href={BOOKING_LINK}>
            Ask about a service <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal
              className={`service-item${index === 0 ? ' service-item--feature' : ''}`}
              delay={index * 0.07}
              key={service.name}
            >
              {/* REACTBITES: swap in an animated service card here */}
              <span className="service-item__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="service-item__body">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Button
                  className="service-item__link"
                  href={`${BUSINESS.emailLink}?subject=${encodeURIComponent(
                    `Enquiry: ${service.name}`,
                  )}`}
                  variant="outline"
                  aria-label={`Book now: ${service.name}`}
                >
                  Book Now
                </Button>
              </div>
              <span className="service-item__rule" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-layout">
        <Reveal className="about-visual">
          {/* REACTBITES: swap in an image reveal or hover effect here */}
          <img
            src={IMAGES.about}
            alt="Placeholder salon interior photograph — replace with a Heads Hair Studio image."
            loading="lazy"
          />
          <span className="about-visual__frame" aria-hidden="true" />
          <span className="about-visual__caption">A PLACE TO FEEL LIKE YOU</span>
        </Reveal>

        <Reveal className="about-copy" delay={0.12}>
          <SectionHeading title="More than a moment in the mirror.">
            A good hair appointment is a chance to pause, talk it through, and
            leave feeling a little more like yourself.
          </SectionHeading>
          <p>
            At {BUSINESS.name}, we believe personal style is just that:
            personal. Tell us what you have in mind, bring a reference, or come
            in ready to figure it out together.
          </p>
          <p>
            From everyday cuts and colour to moments that call for something
            special, the conversation starts with you.
          </p>
          <a className="text-link" href="#visit">
            Find us in Westdene <ArrowDownRight aria-hidden="true" size={16} />
          </a>
          <span className="about-copy__signature" aria-hidden="true">
            Heads
          </span>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const galleryItems = [
    { image: IMAGES.gallery[0], label: 'THE SHAPE', className: 'gallery-tile--tall' },
    { image: IMAGES.gallery[1], label: 'THE DETAIL', className: 'gallery-tile--small' },
    { image: IMAGES.gallery[2], label: 'THE COLOUR', className: 'gallery-tile--wide' },
    { image: IMAGES.gallery[3], label: 'THE FINISH', className: 'gallery-tile--small' },
  ]

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <Reveal>
          <SectionHeading title="A few ways to wear it.">
            A visual starting point for the look you have in mind. These images
            are placeholders, ready for the studio's own work.
          </SectionHeading>
        </Reveal>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <Reveal
              className={`gallery-tile ${item.className}`}
              delay={index * 0.06}
              key={item.label}
            >
              {/* REACTBITES: swap in a reveal, hover, or lightbox effect here */}
              <img
                src={item.image}
                alt={`Placeholder editorial hair image for ${item.label.toLowerCase()} — replace with salon work.`}
                loading="lazy"
              />
              <div className="gallery-tile__overlay">
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" size={18} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="gallery-note">
          Placeholder imagery — replace with original Heads Hair Studio
          photography.
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  const [activeReview, setActiveReview] = useState(0)
  const review = REVIEW_PLACEHOLDERS[activeReview]

  function moveReview(direction) {
    setActiveReview((current) =>
      (current + direction + REVIEW_PLACEHOLDERS.length) %
      REVIEW_PLACEHOLDERS.length,
    )
  }

  return (
    <section
      className="section testimonials-section"
      id="testimonials"
      aria-labelledby="reviews-title"
    >
      <div className="container testimonials-layout">
        <Reveal className="testimonials-heading">
          <SectionHeading title="Kind words, soon." align="left">
            A space for the voices of the people who sit in our chairs.
          </SectionHeading>
        </Reveal>
        <Reveal className="review-carousel" delay={0.12}>
          {/* REACTBITES: swap in an accessible animated review carousel here */}
          <div className="review-carousel__top">
            <span id="reviews-title">{review.label}</span>
            <span>
              {String(activeReview + 1).padStart(2, '0')} /{' '}
              {String(REVIEW_PLACEHOLDERS.length).padStart(2, '0')}
            </span>
          </div>
          <blockquote key={review.label}>{review.copy}</blockquote>
          <p className="review-carousel__note">
            Placeholder review — no customer quote has been supplied.
          </p>
          <div className="review-carousel__controls">
            <button
              type="button"
              className="round-control"
              aria-label="Previous review placeholder"
              onClick={() => moveReview(-1)}
            >
              <ArrowLeft aria-hidden="true" size={17} />
            </button>
            <button
              type="button"
              className="round-control"
              aria-label="Next review placeholder"
              onClick={() => moveReview(1)}
            >
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [formMessage, setFormMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name')).trim()
    const email = String(formData.get('email')).trim()
    const service = String(formData.get('service')).trim()
    const message = String(formData.get('message')).trim()
    const subject = `Booking enquiry from ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      '',
      message,
    ].join('\n')

    setFormMessage(
      'Your email app should open with this message ready to send. If it does not, email us directly.',
    )
    window.location.href = `${BUSINESS.emailLink}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <Reveal className="contact-copy">
          <SectionHeading title="Let's make a little time for you.">
            Ready for a change, or just ready for a trim? Get in touch and
            let's find a time.
          </SectionHeading>
          <div className="contact-actions">
            <Button href={BOOKING_LINK}>Book Now</Button>
            <Button href={BUSINESS.phoneLink} variant="outline">
              Call Now
            </Button>
            <Button href={BUSINESS.whatsappLink} variant="outline">
              WhatsApp Us
            </Button>
          </div>
          <p className="contact-direct">
            Or reach us at{' '}
            <a href={BUSINESS.emailLink}>{BUSINESS.email}</a>
          </p>
        </Reveal>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <div className="contact-form-heading">
            <span>YOUR NEXT APPOINTMENT</span>
            <p>Tell us what you have in mind.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input
                autoComplete="name"
                name="name"
                placeholder="Name"
                required
              />
            </label>
            <label>
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>
            <label>
              <span>What are you interested in?</span>
              <select name="service" required defaultValue="">
                <option value="" disabled>
                  Choose a service
                </option>
                {SERVICES.map((service) => (
                  <option value={service.name} key={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>A note for us</span>
              <textarea
                name="message"
                placeholder="Share a little about what you are looking for..."
                rows="3"
                required
              />
            </label>
            <button className="button button--primary form-submit" type="submit">
              <span>Send Booking Enquiry</span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </button>
            <p className="form-message" aria-live="polite">
              {formMessage}
            </p>
            <p className="form-note">
              This form opens your email app; it does not submit to a booking
              system.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section className="section visit-section" id="visit">
      <div className="container">
        <Reveal className="visit-intro">
          <SectionHeading title="Come by.">
            Find us in Westdene, Bloemfontein. We would love to see you.
          </SectionHeading>
        </Reveal>
        <div className="visit-layout">
          <Reveal className="visit-details">
            <div className="visit-address">
              <MapPin aria-hidden="true" size={19} />
              <div>
                <h3>Find the studio</h3>
                <address>
                  {BUSINESS.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <Button href={BUSINESS.mapsLink} variant="outline">
                  Get Directions
                </Button>
              </div>
            </div>
            <div className="hours">
              <div className="hours__heading">
                <Clock3 aria-hidden="true" size={18} />
                <h3>Opening hours</h3>
              </div>
              <table>
                <caption className="sr-only">
                  Heads Hair Studio opening hours
                </caption>
                <tbody>
                  {BUSINESS.hours.map(({ day, time }) => (
                    <tr
                      className={day === TODAY ? 'hours__today' : ''}
                      aria-current={day === TODAY ? 'date' : undefined}
                      key={day}
                    >
                      <th scope="row">{day}</th>
                      <td>{time}</td>
                      <td className="hours__today-label">
                        {day === TODAY ? 'TODAY' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal className="map-frame" delay={0.1}>
            <iframe
              src={BUSINESS.mapEmbedLink}
              title={`Google Maps location for ${BUSINESS.name} in Westdene, Bloemfontein`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="map-frame__label"
              href={BUSINESS.mapsLink}
              target="_blank"
              rel="noreferrer"
            >
              <span>WESTDENE, BLOEMFONTEIN</span>
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark wordmark--footer" href="#home">
              <span className="wordmark__name">HEADS</span>
              <span className="wordmark__sub">HAIR STUDIO</span>
            </a>
            <p>{BUSINESS.tagline}</p>
            <a className="footer-email" href={BUSINESS.emailLink}>
              {BUSINESS.email}
            </a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            {BUSINESS.navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#contact">Book an appointment</a>
          </div>
          <div className="footer-column">
            <h2>Visit us</h2>
            {BUSINESS.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={BUSINESS.phoneLink}>{BUSINESS.phone}</a>
            <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer">
              Get Directions <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
          <div className="footer-column footer-hours">
            <h2>Hours</h2>
            {BUSINESS.hours.map(({ shortDay, time }) => (
              <span key={shortDay}>
                {shortDay} <span>{time}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Heads Hair Studio All rights reserved.</span>
          <div className="footer-socials" aria-label="Social media placeholders">
            {BUSINESS.socialLinks.map((item) => (
              <a
                href={item.href}
                key={item.label}
                aria-label={`${item.label} placeholder link`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a className="back-to-top" href="#home" aria-label="Back to top">
            BACK TO TOP <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}

function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick contact actions">
      <Button
        href={BUSINESS.phoneLink}
        className="mobile-action"
        icon={Phone}
        variant="outline"
      >
        Call Now
      </Button>
      <Button
        href={BUSINESS.whatsappLink}
        className="mobile-action"
        icon={MessageCircle}
        variant="outline"
      >
        WhatsApp Us
      </Button>
    </nav>
  )
}

export default function Jason() {
  const schema = businessSchema()

  useEffect(() => {
    document.title = `${BUSINESS.name} | ${BUSINESS.tagline}`
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
        <Visit />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
