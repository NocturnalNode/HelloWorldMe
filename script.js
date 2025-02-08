document.addEventListener('DOMContentLoaded', () => {
  // Enhanced Matrix Background Animation
  function createMatrixBackground() {
    const matrixBackground = document.createElement('div');
    matrixBackground.className = 'matrix-background';
    document.body.appendChild(matrixBackground);

    const characters = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.=*+-<>¦｜╌';
    const columnCount = Math.floor(window.innerWidth / 15);

    function createColumn() {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      
      const x = Math.random() * 100;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 2;
      
      column.style.left = `${x}%`;
      column.style.animationDuration = `${duration}s`;
      column.style.animationDelay = `${delay}s`;
      column.style.fontSize = `${12 + Math.random() * 4}px`;
      column.style.opacity = `${0.7 + Math.random() * 0.3}`;

      let columnText = '';
      const length = 20 + Math.floor(Math.random() * 30);
      for (let j = 0; j < length; j++) {
        columnText += characters[Math.floor(Math.random() * characters.length)] + '<br>';
      }
      column.innerHTML = columnText;
      
      return column;
    }

    for (let i = 0; i < columnCount; i++) {
      matrixBackground.appendChild(createColumn());
    }

    setInterval(() => {
      const oldColumns = matrixBackground.querySelectorAll('.matrix-column');
      if (oldColumns.length > columnCount * 2) {
        oldColumns[0].remove();
      }
      matrixBackground.appendChild(createColumn());
    }, 500);
  }

  // Initialize matrix background
  createMatrixBackground();

  // Enhanced cursor glow effect
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 15 + 'px';
    cursor.style.top = e.clientY - 15 + 'px';
    
    const scale = e.target.closest('a, button, .card') ? 2 : 1;
    cursor.style.transform = `scale(${scale})`;
    cursor.style.opacity = scale === 2 ? '0.8' : '0.5';
  });

  // Enhanced Terminal Animation
  function initializeTerminal() {
    const commands = [
      '> Initializing neural interface...',
      '> Accessing mainframe...',
      '> Bypassing security protocols...',
      '> Decrypting personal data...',
      '> Loading profile: Carlos Bello',
      '> Status: Authorized',
      '> System: Online'
    ];

    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;

    let currentLine = 0;

    function typeWriter(text, element, speed = 50) {
      let i = 0;
      element.textContent = '';
      
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }

    function typeNextLine() {
      if (currentLine >= commands.length) {
        currentLine = 0;
        terminalContent.innerHTML = '';
      }
      
      const p = document.createElement('p');
      p.className = 'terminal-text';
      terminalContent.appendChild(p);
      
      typeWriter(commands[currentLine], p);
      currentLine++;
      
      setTimeout(typeNextLine, 3000);
    }

    typeNextLine();
  }

  // Initialize terminal
  initializeTerminal();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Update navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card, .timeline-item, .education-card').forEach(el => {
    observer.observe(el);
  });

  // PDF Generation and Download
  const generatePDF = async () => {
    try {
      const html2pdf = window.html2pdf;
      if (!html2pdf) {
        console.error('html2pdf library not loaded');
        return;
      }
      
      // Create a clone of the document body to modify for PDF
      const content = document.body.cloneNode(true);
      
      // Remove elements we don't want in the PDF
      const elementsToRemove = content.querySelectorAll('.cursor-glow, .particle, .hero-graphics, .download-btn');
      elementsToRemove.forEach(el => el.remove());
      
      // Configure PDF options
      const opt = {
        margin: 1,
        filename: 'Carlos_Bello_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Generate and download PDF
      await html2pdf().set(opt).from(content).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Add click handler for download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generatePDF();
    });
  }

  // Add hover effect for contact items
  document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
    });
  });

  // Particle background effect for hero section
  const createParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 5}px;
          height: ${Math.random() * 5}px;
          background: rgba(255, 255, 255, ${Math.random() * 0.3});
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          border-radius: 50%;
          animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        heroSection.appendChild(particle);
      }
    }
  };

  createParticles();
});