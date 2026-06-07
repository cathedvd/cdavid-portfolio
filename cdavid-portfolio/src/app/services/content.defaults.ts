import { PortfolioSiteContent } from '../models/content.interfaces';

export const DEFAULT_CONTENT: PortfolioSiteContent = {
  hero: {
    brandName: 'David',
    brandAccent: '',
    fullName: 'Cathereen David',
    typedItems: ['Cybersecurity Graduate', 'CTF Competitor', 'Aspiring Security Analyst', 'Machine Learning Enthusiast'],
    description: 'Cybersecurity Graduate blending hands-on enterprise networking experience with advanced threat detection research. Passionate about leveraging data and analytical defense strategies to mitigate modern security risks.',
    profileImage: 'assets/img/profile/gradPhoto.jpg',
    ctaPrimary: { text: 'View My Work', link: '#portfolio' },
    ctaSecondary: { text: 'Get In Touch', link: '#contact' },
    socialLinks: [
      { icon: 'bi bi-dribbble', url: '#' },
      { icon: 'bi bi-behance', url: '#' },
      { icon: 'bi bi-github', url: '#' },
      { icon: 'bi bi-linkedin', url: '#' }
    ]
  },

  about: {
    profileImage: 'assets/img/profile/gradPhoto.jpg',
    name: 'Cathereen David',
    profession: 'Cybersecurity Graduate',
    email: 'cathedvd.cyb@gmail.com',
    phone: '+63(999) 854-8904',
    location: 'Magalang, Pampanga',
    sectionBadge: 'Get to Know Me',
    sectionHeading: 'About Me',
    descriptionParagraphs: [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.'
    ],
    stats: [
      { number: '150+', label: 'Projects Completed' },
      { number: '5+', label: 'Years Experience' },
      { number: '98%', label: 'Client Satisfaction' }
    ],
    details: [
      { label: 'Specialization', value: 'UI/UX Design & Development' },
      { label: 'Experience Level', value: 'Senior Professional' },
      { label: 'Education', value: 'Computer Science, MIT' },
      { label: 'Languages', value: 'English, Spanish, French' }
    ]
  },

  stats: {
    items: [
      { icon: 'bi bi-emoji-smile', endValue: 232, label: 'Happy Clients' },
      { icon: 'bi bi-journal-richtext', endValue: 521, label: 'Projects' },
      { icon: 'bi bi-headset', endValue: 1463, label: 'Hours Of Support' },
      { icon: 'bi bi-people', endValue: 15, label: 'Hard Workers' }
    ]
  },

  skills: {
    sectionTitle: 'Skills',
    sectionDescription: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
    categories: [
      {
        title: 'Front-end Development',
        skills: [
          { name: 'HTML/CSS', percentage: 95, tooltip: 'Expert level knowledge of semantic HTML5 and modern CSS3 techniques' },
          { name: 'JavaScript', percentage: 85, tooltip: 'Strong proficiency in ES6+, DOM manipulation, and modern frameworks' },
          { name: 'React', percentage: 80, tooltip: 'Experience with React hooks, state management, and component architecture' }
        ]
      },
      {
        title: 'Back-end Development',
        skills: [
          { name: 'Node.js', percentage: 75, tooltip: 'Server-side JavaScript development with Express and REST APIs' },
          { name: 'Python', percentage: 70, tooltip: 'Python development with Django and data analysis tools' },
          { name: 'SQL', percentage: 65, tooltip: 'Database design, optimization, and complex queries' }
        ]
      }
    ]
  },

  portfolio: {
    sectionTitle: 'Portfolio',
    sectionDescription: 'A curated selection of my work — from design to development. Each project reflects my passion for quality, attention to detail, and delivering results that make an impact.',
    filters: [
      { label: 'All Projects', filterValue: '*' },
      { label: 'Photography', filterValue: '.filter-photography' },
      { label: 'Design', filterValue: '.filter-design' },
      { label: 'Automotive', filterValue: '.filter-automotive' },
      { label: 'Nature', filterValue: '.filter-nature' }
    ],
    items: [
      { image: 'assets/img/portfolio/portfolio-portrait-1.webp', category: 'Photography', filterClass: 'filter-photography', title: 'Capturing Moments' },
      { image: 'assets/img/portfolio/portfolio-2.webp', category: 'Web Design', filterClass: 'filter-design', title: 'Woodcraft Design' },
      { image: 'assets/img/portfolio/portfolio-portrait-2.webp', category: 'Automotive', filterClass: 'filter-automotive', title: 'Classic Beauty' },
      { image: 'assets/img/portfolio/portfolio-portrait-4.webp', category: 'Nature', filterClass: 'filter-nature', title: 'Natural Growth' },
      { image: 'assets/img/portfolio/portfolio-5.webp', category: 'Photography', filterClass: 'filter-photography', title: 'Urban Stories' },
      { image: 'assets/img/portfolio/portfolio-6.webp', category: 'Web Design', filterClass: 'filter-design', title: 'Digital Experience' }
    ]
  },

  services: {
    sectionTitle: 'References',
    sectionDescription: 'People who can speak about my work, character, and professional growth.',
    items: [
      { image: 'assets/img/person/person-f-7.webp', name: 'Rachel Bennett', position: 'Strategy Director' },
      { image: 'assets/img/person/person-m-7.webp', name: 'Daniel Morgan', position: 'Chief Innovation Officer' },
      { image: 'assets/img/person/person-f-8.webp', name: 'Emma Thompson', position: 'Digital Lead' }
    ]
  },

  testimonials: {
    sectionTitle: 'Testimonials',
    sectionDescription: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
    items: [
      { quote: 'Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.', clientImage: 'assets/img/person/person-f-7.webp', clientName: 'Rachel Bennett', clientPosition: 'Strategy Director', highlight: false },
      { quote: 'Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.', clientImage: 'assets/img/person/person-m-7.webp', clientName: 'Daniel Morgan', clientPosition: 'Chief Innovation Officer', highlight: true },
      { quote: 'Strategic partnership has enabled seamless digital transformation and operational excellence.', clientImage: 'assets/img/person/person-f-8.webp', clientName: 'Emma Thompson', clientPosition: 'Digital Lead', highlight: false },
      { quote: 'Professional expertise and dedication have significantly improved our project delivery timelines and quality metrics.', clientImage: 'assets/img/person/person-m-8.webp', clientName: 'Christopher Lee', clientPosition: 'Technical Director', highlight: false },
      { quote: 'Collaborative approach and industry expertise have revolutionized our product development cycle, resulting in faster time-to-market and increased customer engagement levels.', clientImage: 'assets/img/person/person-f-9.webp', clientName: 'Olivia Carter', clientPosition: 'Product Manager', highlight: true },
      { quote: 'Innovative approach to user experience design has significantly enhanced our platform\'s engagement metrics and customer retention rates.', clientImage: 'assets/img/person/person-m-13.webp', clientName: 'Nathan Brooks', clientPosition: 'UX Director', highlight: false }
    ]
  },

  contact: {
    sectionTitle: 'Contact',
    sectionDescription: 'Have a project in mind or want to work together? Feel free to reach out — I\'d love to hear from you.',
    infoTitle: 'Contact Info',
    infoDescription: 'Whether it\'s a freelance project, a collaboration, or just a question — don\'t hesitate to get in touch. I\'ll get back to you as soon as possible.',
    location: { line1: 'Your City', line2: 'Your Country' },
    phones: ['+1 234 567 8900'],
    emails: ['hello@youremail.com'],
    formTitle: 'Get In Touch',
    formDescription: 'Fill out the form below and I\'ll respond within 24 hours. Let\'s build something great together.'
  },

  header: {
    navItems: [
      { label: 'Home', href: '#hero', icon: 'bi bi-house navicon' },
      { label: 'About', href: '#about', icon: 'bi bi-person navicon' },
      { label: 'Portfolio', href: '#portfolio', icon: 'bi bi-images navicon' },
      { label: 'References', href: '#services', icon: 'bi bi-hdd-stack navicon' },
      { label: 'Contact', href: '#contact', icon: 'bi bi-envelope navicon' }
    ],
    socialLinks: [
      { icon: 'bi bi-twitter-x', url: '#' },
      { icon: 'bi bi-facebook', url: '#' },
      { icon: 'bi bi-instagram', url: '#' },
      { icon: 'bi bi-skype', url: '#' },
      { icon: 'bi bi-linkedin', url: '#' }
    ]
  },

  footer: {},

  sectionVisibility: {
    about: true,
    stats: true,
    skills: true,
    portfolio: true,
    services: true,
    testimonials: true,
    contact: true
  }
};
