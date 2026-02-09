// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a nav item
    const navItems = document.querySelectorAll('.mobile-menu .nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
    
    // Initialize particle background
    initParticles();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Modal functionality
    setupModalHandlers();
  });
  
  // Particle Background
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle configuration
    const particleCount = 100;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: i % 2 === 0 ? '#8B5CF6' : '#2DD4BF',
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    // Draw particles
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particles.forEach((particleB, j) => {
          if (i === j) return;
          
          const dx = particle.x - particleB.x;
          const dy = particle.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(drawParticles);
    }
    
    // Start animation
    drawParticles();
  }
  
  // Skill bars animation
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Set the width based on the style attribute
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          
          // Force a reflow
          entry.target.offsetWidth;
          
          // Apply the width
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
  
  // Modal Handlers
  function setupModalHandlers() {
    const modal = document.getElementById('modal-content');
    const modalContainer = document.getElementById('project-modal');
    const closeButton = document.querySelector('.modal-close');
    
    // Close modal when clicking the close button
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modalContainer) {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Open project modal with content based on project id
  function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    let projectData;
    
    // Project data
    switch(projectId) {
      case 1:
        projectData = {
          title: "Restaurant Branding",
          client: "Arepas Lucianita",
          category: "Graphic Design",
          date: "February 2022",
          image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
          description: "Developed a comprehensive brand identity for a local restaurant, including logo design, menu layout, packaging, and promotional materials. The project focused on creating a cohesive visual language that reflected the restaurant's authentic cuisine and welcoming atmosphere.",
          skills: ["Logo Design", "Typography", "Color Theory", "Package Design"]
        };
        break;
      case 2:
        projectData = {
          title: "Promotional Video",
          client: "La Ramada Valluna",
          category: "Video Production",
          date: "November 2022",
          image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
          description: "Produced a 60-second promotional video showcasing the restaurant's signature dishes, ambiance, and customer experience. The video was optimized for social media platforms and helped increase engagement by 40% compared to previous campaigns.",
          skills: ["Video Editing", "Color Grading", "Sound Design", "Motion Graphics"]
        };
        break;
      case 3:
        projectData = {
          title: "Corporate Motion Graphics",
          client: "MarkifyLab",
          category: "Animation",
          date: "March 2023",
          image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
          description: "Created animated explainer videos and motion graphics assets for corporate presentations and digital marketing campaigns. The animations effectively communicated complex concepts in an engaging and visually appealing format.",
          skills: ["After Effects", "Character Animation", "Storyboarding", "Visual Storytelling"]
        };
        break;
      case 4:
        projectData = {
          title: "E-commerce Website",
          client: "Norato Churros",
          category: "Web Design",
          date: "June 2022",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          description: "Designed and implemented a Shopify-based e-commerce platform for a specialty food business. The website featured custom product photography, integrated payment processing, and a user-friendly mobile experience that improved conversion rates.",
          skills: ["Shopify", "UI/UX Design", "Product Photography", "Responsive Design"]
        };
        break;
    }
    
    // Build modal HTML
    if (projectData) {
      let html = `
        <div class="project-modal-content">
          <div class="project-modal-header">
            <h2>${projectData.title}</h2>
            <p class="project-modal-category">${projectData.category}</p>
          </div>
          
          <div class="project-modal-image">
            <img src="${projectData.image}" alt="${projectData.title}" />
          </div>
          
          <div class="project-modal-details">
            <div class="project-modal-info">
              <div class="modal-info-item">
                <h4>Client</h4>
                <p>${projectData.client}</p>
              </div>
              <div class="modal-info-item">
                <h4>Date</h4>
                <p>${projectData.date}</p>
              </div>
              <div class="modal-info-item">
                <h4>Category</h4>
                <p>${projectData.category}</p>
              </div>
            </div>
            
            <div class="project-modal-description">
              <h3>Project Overview</h3>
              <p>${projectData.description}</p>
              
              <h3>Skills Applied</h3>
              <ul class="skills-list">
                ${projectData.skills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      
      modalContent.innerHTML = html;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Add styles for modal
      const style = document.createElement('style');
      style.textContent = `
        .project-modal-content {
          color: var(--color-white);
        }
        
        .project-modal-header {
          margin-bottom: 1.5rem;
        }
        
        .project-modal-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .project-modal-category {
          color: var(--color-cyber-turquoise);
          font-size: 1rem;
        }
        
        .project-modal-image {
          margin-bottom: 2rem;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .project-modal-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        
        .project-modal-details {
          display: flex;
          flex-direction: column;
        }
        
        .project-modal-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .modal-info-item {
          flex: 1;
          min-width: 120px;
        }
        
        .modal-info-item h4 {
          color: var(--color-gray-300);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .modal-info-item p {
          font-weight: 500;
        }
        
        .project-modal-description h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }
        
        .project-modal-description p {
          color: var(--color-gray-200);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          list-style: none;
          padding: 0;
        }
        
        .skills-list li {
          background-color: rgba(139, 92, 246, 0.15);
          color: var(--color-cyber-purple-light);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        @media (min-width: 768px) {
          .project-modal-details {
            flex-direction: row;
            gap: 2rem;
          }
          
          .project-modal-info {
            flex-direction: column;
            flex: 0 0 200px;
            border-bottom: none;
            border-right: 1px solid rgba(139, 92, 246, 0.2);
            padding-right: 1.5rem;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          .project-modal-description {
            flex: 1;
          }
          
          .project-modal-description h3:first-child {
            margin-top: 0;
          }
        }
      `;
      
      document.head.appendChild(style);
    }
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = 'es';
  
    const translations = {
      en: {
        "page.title": "Sebastián Ordoñez - Portfolio",
        "brandTitle": "Resume",
        "nav.home": "Home",
        "nav.journey": "Journey",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.education": "Education",
        "nav.about": "About Me",
        "nav.contact": "Contact",
  
        "hero.greeting": "Hey, I'm",
        "hero.name": "Sebastián Ordoñez",
        "hero.description": "Multimedia Engineer specializing in scalable visual content creation with Artificial Intelligence and Digital Marketing strategies.",
        "hero.quote": "Where technology meets creativity, that's where the magic happens.",
        "hero.viewWork": "View My Work",
        "hero.contact": "Get In Touch",
        "hero.scrollDown": "Scroll Down",
  
        "journey.title": "Professional Journey",
        "journey.role1": "Sales & Customer Service",
        "journey.company1": "Jewelry and More (Houston, USA)",
        "journey.period1": "International Experience",
        "journey.desc1": "Understanding product value, user experience, and effective communication, bringing a strategic and commercial vision.",
        "journey.role2": "Graphic Designer",
        "journey.company2": "Why Not Pizza",
        "journey.period2": "Gastronomy Sector",
        "journey.desc2": "Development of graphic pieces for social media, digital menu content, and display menu material.",
        "journey.role3": "Graphic Designer",
        "journey.company3": "Nova Ice Cream",
        "journey.period3": "Gastronomy Sector",
        "journey.desc3": "Creation of visual identity and attractive digital content for ice cream products.",
        "journey.role4": "Marketing Designer",
        "journey.company4": "Santi Burger",
        "journey.period4": "Gastronomy Sector",
        "journey.desc4": "Design of strategic graphic pieces for marketing campaigns and promotion.",
        "journey.role5": "Multimedia Designer & Ads Specialist",
        "journey.company5": "Freelance / Various Sectors",
        "journey.period5": "Present",
        "journey.desc5": "Meta Ads and TikTok Ads management. Creation of scalable visual content with AI for any sector.",
  
        "education.title": "Education & Certifications",
        "education.degree1": "High School Diploma",
        "education.institution1": "Colegio Campestre San Juan de la Loma",
        "education.year1": "2018",
        "education.degree2": "English B2 Certificate",
        "education.institution2": "Crossing Institute, Houston, TX",
        "education.year2": "2019",
        "education.degree_uac": "Multimedia Engineering",
        "education.institution_uac": "Universidad Autónoma de Cali",
        "education.year_uac": "2020 - 2022",
        "education.degree3": "Multimedia Engineering",
        "education.institution3": "Universidad San Buenaventura",
        "education.year3": "2022 - Present (2026)",
        "education.degree4": "Dropshipping & E-commerce",
        "education.institution4": "Online Course Certification",
        "education.year4": "2022",
  
        "about.title": "Professional Profile",
        "about.p1": "Throughout my training, I have developed a solid foundation in visual design, project management, and multimedia technologies. I have worked as a graphic designer, creating visual identities and graphic pieces for brands and businesses, adapting to different industries and communication goals.",
        "about.p2": "My focus is on optimizing time and resources without sacrificing quality, using Adobe Suite tools (Photoshop, After Effects) and AI-based solutions to produce graphic pieces, visual assets, and adaptable digital content.",
        "about.p3": "I am proactive, organized, and adaptable. My goal is to continue growing as a multimedia designer specialized in AI and digital marketing, providing modern and result-oriented visual solutions for any sector.",
        "about.spirituality": "Proactivity",
        "about.art": "Graphic Design",
        "about.numerology": "Artificial Intelligence",
        "about.gaming": "Digital Marketing",
        "about.creative": "Teamwork",
        "contact.title": "Let's Connect",
        "contact.subtitle": "Get In Touch",
        "contact.text": "Interested in working together? Feel free to reach out!",
        "contact.phone": "318 8474325",
        "contact.email": "sebastianor27@gmail.com",
        "contact.location": "Jamundí, Colombia",
        "contact.formTitle": "Let's create something amazing together",
        "contact.name": "Your Name",
        "contact.emailInput": "Your Email",
        "contact.subject": "Subject",
        "contact.message": "Your Message",
        "contact.send": "Send Message",
        "footer.name": "Thank you for your time",
    "footer.fullName": "Sebastián Ordoñez Vargas",
    "footer.rights": "All rights reserved."
      },
  
      es: {
        "page.title": "Sebastián Ordoñez - Portafolio",
        "brandTitle": "Hoja de vida",
        "nav.home": "Inicio",
        "nav.journey": "Trayectoria",
        "nav.skills": "Habilidades",
        "nav.projects": "Proyectos",
        "nav.education": "Educación",
        "nav.about": "Sobre mí",
        "nav.contact": "Contacto",
  
        "hero.greeting": "Hola, soy",
        "hero.name": "Sebastián Ordoñez",
        "hero.description": "Ingeniero Multimedia especializado en crear contenido visual escalable con Inteligencia Artificial y estrategias de Marketing Digital.",
        "hero.quote": "Donde la tecnología se encuentra con la creatividad, ahí es donde ocurre la magia.",
        "hero.viewWork": "Ver mi trabajo",
        "hero.contact": "Contáctame",
        "hero.scrollDown": "Desplázate hacia abajo",
  
        "journey.title": "Trayectoria Profesional",
        "journey.role1": "Ventas y Atención al Cliente",
        "journey.company1": "Jewelry and More (Houston, EE. UU.)",
        "journey.period1": "Experiencia Internacional",
        "journey.desc1": "Comprensión del valor del producto, experiencia de usuario y comunicación efectiva, aportando visión estratégica y comercial.",
        "journey.role2": "Diseñador Gráfico",
        "journey.company2": "Why Not Pizza",
        "journey.period2": "Sector Gastronómico",
        "journey.desc2": "Desarrollo de piezas gráficas para redes sociales, contenido para menús digitales y material para display menu.",
        "journey.role3": "Diseñador Gráfico",
        "journey.company3": "Nova Ice Cream",
        "journey.period3": "Sector Gastronómico",
        "journey.desc3": "Creación de identidad visual y contenido digital atractivo para productos de heladería.",
        "journey.role4": "Diseñador de Marketing",
        "journey.company4": "Santi Burger",
        "journey.period4": "Sector Gastronómico",
        "journey.desc4": "Diseño de piezas gráficas estratégicas para campañas de marketing y promoción.",
        "journey.role5": "Diseñador Multimedia & Ads Specialist",
        "journey.company5": "Freelance / Varios Sectores",
        "journey.period5": "Actualidad",
        "journey.desc5": "Gestión de Meta Ads y TikTok Ads. Creación de contenido visual escalable con IA para cualquier sector.",
  
        "education.title": "Educación y Certificaciones",
        "education.degree1": "Bachillerato",
        "education.institution1": "Colegio Campestre San Juan de la Loma",
        "education.year1": "2018",
        "education.degree2": "Certificado de Inglés B2",
        "education.institution2": "Crossing Institute, Houston, TX",
        "education.year2": "2019",
        "education.degree_uac": "Ingeniería Multimedia",
        "education.institution_uac": "Universidad Autónoma de Cali",
        "education.year_uac": "2020 - 2022",
        "education.degree3": "Ingeniería Multimedia",
        "education.institution3": "Universidad San Buenaventura",
        "education.year3": "2022 - Presente (2026)",
        "education.degree4": "Dropshipping y Comercio Electrónico",
        "education.institution4": "Certificación de Curso Online",
        "education.year4": "2022",
  
        "about.title": "Perfil Profesional",
        "about.p1": "A lo largo de mi formación he desarrollado una base sólida en diseño visual, gestión de proyectos y tecnologías multimedia. He trabajado como diseñador gráfico, creando identidades visuales y piezas gráficas para marcas y negocios, adaptándome a diferentes industrias y objetivos de comunicación.",
        "about.p2": "Mi enfoque se centra en optimizar tiempos y recursos sin sacrificar calidad, utilizando herramientas de la suite Adobe (Photoshop, After Effects) y soluciones basadas en inteligencia artificial para producir piezas gráficas, assets visuales y contenido digital adaptable.",
        "about.p3": "Me caracterizo por ser proactivo, organizado y adaptable. Mi objetivo es seguir creciendo como diseñador multimedia especializado en IA y marketing digital, aportando soluciones visuales modernas y orientadas a resultados para cualquier sector.",
        "about.spirituality": "Proactividad",
        "about.art": "Diseño Gráfico",
        "about.numerology": "Inteligencia Artificial",
        "about.gaming": "Marketing Digital",
        "about.creative": "Trabajo en Equipo",
        "contact.title": "Conectemos",
        
    "contact.subtitle": "Contáctame",
    "contact.text": "¿Interesado en trabajar juntos? ¡No dudes en escribirme!",
    "contact.phone": "318 8474325",
    "contact.email": "sebastianor27@gmail.com",
    "contact.location": "Jamundí, Colombia",
    "contact.formTitle": "Creamos algo increíble juntos",
    "contact.name": "Tu Nombre",
    "contact.emailInput": "Tu Correo",
    "contact.subject": "Asunto",
    "contact.message": "Tu Mensaje",
    "contact.send": "Enviar Mensaje",

    "footer.name": "Muchas gracias por su tiempo",
    "footer.fullName": "Sebastián Ordoñez Vargas",
    "footer.rights": "Todos los derechos reservados."
      }
    };
  
    function updateLanguage(lang) {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
      document.title = translations[lang]["page.title"];
    }
  
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      updateLanguage(currentLang);
      langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    });
  
    updateLanguage(currentLang);
  });
