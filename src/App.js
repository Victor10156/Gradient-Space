import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";

const cityBannerUrl =
  "https://images.hdqwalls.com/wallpapers/new-york-city-night-7p.jpg";

const Banner = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "320px",
      backgroundImage: `url(${cityBannerUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textShadow: "0 0 10px rgba(0,0,0,0.9)",
      userSelect: "none",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontWeight: "700",
      fontSize: "3rem",
      letterSpacing: "0.1em",
    }}
    aria-label="New York City night skyline banner"
  >
    Gradient Space
  </div>
);

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      style={{
        marginBottom: "3rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out",
      }}
    >
      {children}
    </section>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    package: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);

  const packages = [
    {
      name: "Starter AI Kit",
      price: "$49",
      description:
        "Essential AI tools designed to streamline daily tasks, increase productivity, and help small businesses save time and money.",
      benefits: [
        "Automate repetitive tasks",
        "Boost productivity with smart tools",
        "Affordable for small startups",
      ],
    },
    {
      name: "Pro AI Suite",
      price: "$149",
      description:
        "Advanced AI software offering deep customization, analytics, and support to scale your operations efficiently and intelligently.",
      benefits: [
        "Customizable AI workflows",
        "Detailed analytics & reporting",
        "Priority customer support",
      ],
    },
    {
      name: "AI Training Workshop",
      price: "$299",
      description:
        "Interactive, hands-on training sessions teaching you how to leverage AI technology for automating workflows and boosting business strategy.",
      benefits: [
        "Live instructor-led sessions",
        "Real-world use case demos",
        "Personalized follow-up resources",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Alex J.",
      text: "Gradient Space helped me automate tedious tasks and saved me hours every week, increasing my team’s focus on growth.",
      rating: 5,
    },
    {
      name: "Samantha L.",
      text: "The AI training workshop was a total game changer — I learned how to integrate AI tools that truly transformed my startup’s efficiency.",
      rating: 5,
    },
    {
      name: "Mark T.",
      text: "Their Pro AI Suite gave us powerful insights that led to smarter business decisions and increased revenue.",
      rating: 5,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", package: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Gradient Space</title>
        <meta
          name="description"
          content="AI tools and training to empower your business"
        />
      </Helmet>

      <nav style={styles.nav}>
        {["home", "services", "about", "contact"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tabButton,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab ? "page" : undefined}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <Banner />

      <main style={styles.main}>
        {activeTab === "home" && (
          <>
            <FadeInSection>
              <section style={styles.sectionContainer}>
                <h2 style={styles.sectionTitle}>Our AI Packages</h2>
                <p style={styles.introParagraph}>
                  Carefully designed AI solutions tailored to help businesses of all
                  sizes automate, analyze, and optimize their operations.
                </p>
                <div style={styles.cardGrid}>
                  {packages.map((pkg, i) => (
                    <div
                      key={pkg.name}
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        ...styles.card,
                        boxShadow:
                          hoveredCard === i
                            ? "0 8px 24px rgba(26, 62, 114, 0.6)"
                            : "0 4px 12px rgba(26, 62, 114, 0.3)",
                        transform:
                          hoveredCard === i ? "scale(1.05)" : "scale(1)",
                        transition: "all 0.3s ease",
                      }}
                      aria-label={`${pkg.name}: ${pkg.description}, priced at ${pkg.price}`}
                    >
                      <h3 style={styles.cardTitle}>{pkg.name}</h3>
                      <p style={styles.cardDesc}>{pkg.description}</p>
                      <ul style={styles.benefitsList}>
                        {pkg.benefits.map((benefit) => (
                          <li key={benefit} style={styles.benefitItem}>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <p style={styles.cardPrice}>{pkg.price}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>

            <FadeInSection>
              <section style={styles.trainingSection}>
                <h2 style={styles.sectionTitle}>Training & Workshops</h2>
                <p style={styles.paragraph}>
                  Learn to leverage AI tools effectively and transform your business
                  operations. Our workshops cover real-world automation, strategy,
                  and implementation, tailored to your industry.
                </p>
                <ul style={styles.benefitsList}>
                  <li style={styles.benefitItem}>
                    Live, hands-on training sessions with expert instructors
                  </li>
                  <li style={styles.benefitItem}>
                    Practical, actionable AI strategies you can implement immediately
                  </li>
                  <li style={styles.benefitItem}>
                    Access to exclusive training materials and ongoing support
                  </li>
                </ul>
              </section>
            </FadeInSection>

            <FadeInSection>
              <section style={styles.sectionContainer}>
                <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
                <div style={styles.cardGrid}>
                  {testimonials.map((test, i) => (
                    <div key={test.name} style={styles.testimonialCard}>
                      <p style={{ fontStyle: "italic", fontSize: "1rem" }}>
                        "{test.text}"
                      </p>
                      <p style={styles.testimonialAuthor}>
                        - {test.name}{" "}
                        <span style={styles.stars}>
                          {"\u2605".repeat(test.rating)}
                          <span style={styles.starsInactive}>
                            {"\u2605".repeat(5 - test.rating)}
                          </span>
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeInSection>
          </>
        )}

        {activeTab === "services" && (
          <FadeInSection>
            <section style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Our Services</h2>
              <p style={styles.paragraph}>
                At Gradient Space, we provide a wide array of services to help your
                business harness the full potential of AI technology:
              </p>
              <ul style={styles.servicesList}>
                <li>
                  <strong>Custom AI Solutions:</strong> Tailored software development
                  to integrate AI seamlessly with your existing workflows.
                </li>
                <li>
                  <strong>Automation Consulting:</strong> Expert advice to identify
                  automation opportunities that save time and reduce costs.
                </li>
                <li>
                  <strong>Data Analytics & Insights:</strong> Advanced analytics to
                  help you make data-driven decisions and uncover hidden trends.
                </li>
                <li>
                  <strong>Training Workshops:</strong> Comprehensive training to
                  empower your team with AI knowledge and skills.
                </li>
                <li>
                  <strong>Ongoing Support & Maintenance:</strong> Dedicated support
                  to ensure your AI systems perform optimally.
                </li>
              </ul>
              <p style={styles.paragraph}>
                We work closely with you to customize solutions that fit your unique
                needs and industry challenges, ensuring a tailored approach to help
                you thrive in the evolving AI landscape.
              </p>
              <p style={styles.paragraph}>
                Our team stays up-to-date with the latest AI advancements to provide
                innovative solutions that keep your business ahead of the competition.
              </p>
            </section>
          </FadeInSection>
        )}

        {activeTab === "about" && (
          <FadeInSection>
            <section style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>About Gradient Space</h2>
              <p style={styles.paragraph}>
                Gradient Space is a forward-thinking AI solutions provider committed
                to empowering businesses with innovative tools and expert training.
                We specialize in bridging the gap between complex AI technology and
                practical business applications.
              </p>
              <p style={styles.paragraph}>
                Founded by a team of AI enthusiasts and industry experts, our vision
                is to democratize AI and make it accessible for businesses of all
                sizes, from startups to enterprises.
              </p>
              <h3 style={styles.subHeading}>Our Mission</h3>
              <p style={styles.paragraph}>
                To deliver accessible, effective, and customizable AI software and
                education that drives measurable business success and fosters
                innovation.
              </p>
              <h3 style={styles.subHeading}>Our Team</h3>
              <p style={styles.paragraph}>
                Our diverse team blends deep AI expertise with practical business
                experience, dedicated to providing outstanding solutions and
                personalized support to our clients.
              </p>
              <h3 style={styles.subHeading}>Core Values</h3>
              <ul style={styles.servicesList}>
                <li>
                  <strong>Innovation:</strong> Constantly pushing boundaries in AI
                  technology and solutions.
                </li>
                <li>
                  <strong>Integrity:</strong> Transparent and ethical business
                  practices in every engagement.
                </li>
                <li>
                  <strong>Customer Focus:</strong> Prioritizing your success and
                  satisfaction with tailored solutions.
                </li>
                <li>
                  <strong>Collaboration:</strong> Working closely with clients as
                  partners to achieve shared goals.
                </li>
                <li>
                  <strong>Continuous Learning:</strong> Staying ahead through ongoing
                  education and AI advancements.
                </li>
              </ul>
              <p style={styles.paragraph}>
                At Gradient Space, we believe in the transformative power of AI to
                unlock new possibilities, accelerate growth, and redefine the way
                businesses operate.
              </p>
            </section>
          </FadeInSection>
        )}

        {activeTab === "contact" && (
          <FadeInSection>
            <section style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Contact Us</h2>
              <p style={styles.paragraph}>
                Have questions? Ready to get started? Reach out to our team, and we'll
                respond promptly to help you explore the best AI solutions for your
                business.
              </p>

              <div style={styles.contactContent}>
                <form onSubmit={handleSubmit} style={styles.contactForm}>
                  {submitted ? (
                    <p style={styles.successText}>
                      Thank you for contacting us! We’ll get back to you shortly.
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        autoComplete="name"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        autoComplete="email"
                      />
                      <select
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        aria-label="Select a package"
                      >
                        <option value="" disabled>
                          Select a Package
                        </option>
                        {packages.map((pkg) => (
                          <option key={pkg.name} value={pkg.name}>
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                      <textarea
                        name="message"
                        placeholder="Additional message (optional)"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        style={styles.input}
                      />
                      <button
                        type="submit"
                        style={{
                          ...styles.submitButton,
                          boxShadow: hoveredButton
                            ? "0 6px 20px rgba(212, 175, 55, 0.8)"
                            : "0 4px 15px rgba(212, 175, 55, 0.6)",
                          transform: hoveredButton ? "scale(1.05)" : "scale(1)",
                          transition: "all 0.25s ease",
                          backgroundColor: "#1a3e72",
                          color: "#fff",
                          fontWeight: "700",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "0.85rem",
                          fontSize: "1.15rem",
                          border: "none",
                        }}
                        onMouseEnter={() => setHoveredButton(true)}
                        onMouseLeave={() => setHoveredButton(false)}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </form>

                <div style={styles.contactInfo}>
                  <h3>Our Office</h3>
                  <p>
                    123 AI Innovation Drive
                    <br />
                    Tech City, TX 75001
                  </p>
                  <p>
                    <strong>Phone:</strong> (123) 456-7890
                    <br />
                    <strong>Email:</strong> info@gradientspace.com
                  </p>
                  <h3>Business Hours</h3>
                  <p>
                    Monday - Friday: 9am to 6pm
                    <br />
                    Saturday: 10am to 4pm
                  </p>
                  <h3>Find Us Here</h3>
                  <div style={styles.mapPlaceholder}>
                    {/* Replace this div with an embedded Google Map iframe if desired */}
                    Map placeholder
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>
        )}
      </main>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    padding: "0.8rem 0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
    userSelect: "none",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  tabButton: {
    background: "none",
    border: "none",
    padding: "0.75rem 2rem",
    margin: "0 0.5rem",
    color: "#bbb",
    fontSize: "1.1rem",
    cursor: "pointer",
    fontWeight: "600",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s ease",
  },
  activeTab: {
    color: "#d4af37", // golden highlight on active tab
    borderBottom: "3px solid #d4af37",
  },

  main: {
    backgroundColor: "#121212",
    color: "#ddd",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem 1rem 4rem",
  },
  sectionContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#1a3e72", // deep navy blue for section headings
    letterSpacing: "0.05em",
  },
  introParagraph: {
    maxWidth: "700px",
    margin: "0 auto 2rem",
    color: "#bbb",
    fontSize: "1.15rem",
  },
  paragraph: {
    color: "#bbb",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
    maxWidth: "750px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
    marginTop: "1.5rem",
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: "0.8rem",
    padding: "1.8rem 1.6rem",
    width: "280px",
    textAlign: "left",
    boxShadow: "0 4px 12px rgba(26, 62, 114, 0.3)",
    color: "#ddd",
    userSelect: "none",
  },
  cardTitle: {
    color: "#1a3e72",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  cardDesc: {
    fontSize: "1rem",
    lineHeight: "1.4",
    marginBottom: "1rem",
    color: "#ccc",
  },
  benefitsList: {
    listStyleType: "disc",
    paddingLeft: "1.2rem",
    marginBottom: "1rem",
    color: "#bbb",
    textAlign: "left",
    maxWidth: "700px",
    margin: "0 auto 1rem",
  },
  benefitItem: {
    marginBottom: "0.4rem",
  },
  cardPrice: {
    fontWeight: "700",
    fontSize: "1.3rem",
    color: "#1a3e72",
    marginTop: "1rem",
  },

  trainingSection: {
    maxWidth: "700px",
    margin: "0 auto 3rem",
    textAlign: "center",
  },

  testimonialCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: "0.8rem",
    padding: "1.5rem",
    marginBottom: "1rem",
    maxWidth: "300px",
    color: "#ccc",
    textAlign: "left",
  },
  testimonialAuthor: {
    marginTop: "1rem",
    fontWeight: "600",
    fontSize: "0.9rem",
    color: "#1a3e72",
  },
  stars: {
    color: "#d4af37",
    marginLeft: "0.3rem",
  },
  starsInactive: {
    color: "#555",
  },

  servicesList: {
    maxWidth: "700px",
    margin: "0 auto 1.5rem",
    textAlign: "left",
    color: "#bbb",
    fontSize: "1.1rem",
    lineHeight: "1.6",
  },

  contactContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
    justifyContent: "center",
    marginTop: "1rem",
  },
  contactForm: {
    flex: "1 1 320px",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.8rem 1rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "none",
    outline: "none",
    boxShadow: "0 0 6px rgba(26, 62, 114, 0.5)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    resize: "vertical",
    color: "#222",
  },
  submitButton: {
    backgroundColor: "#1a3e72",
    border: "none",
    color: "#fff",
    padding: "0.85rem",
    fontSize: "1.15rem",
    fontWeight: "700",
    borderRadius: "0.5rem",
    cursor: "pointer",
    userSelect: "none",
  },
  successText: {
    color: "#7cff7c",
    fontWeight: "700",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  contactInfo: {
    flex: "1 1 300px",
    maxWidth: "350px",
    backgroundColor: "#1f1f1f",
    borderRadius: "0.8rem",
    padding: "1.5rem",
    color: "#bbb",
    fontSize: "1rem",
    lineHeight: "1.5",
    textAlign: "left",
  },
  mapPlaceholder: {
    backgroundColor: "#333",
    height: "160px",
    borderRadius: "0.5rem",
    marginTop: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
    fontStyle: "italic",
    userSelect: "none",
  },

  subHeading: {
    color: "#d4af37",
    fontSize: "1.4rem",
    margin: "1.5rem 0 0.5rem",
    fontWeight: "600",
  },
};

export default App;
