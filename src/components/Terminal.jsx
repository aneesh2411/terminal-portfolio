import React, { useState } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'Welcome to Aneesh Kalisapudi\'s Portfolio Terminal',
    'Type \'help\' for available commands',
    ''
  ]);
  const [currentPath, setCurrentPath] = useState('/home/aneesh');
  
  const terminalStyle = {
    backgroundColor: '#000000',
    color: '#00ff00',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    height: '100vh',
    width: '100vw',
    padding: '16px',
    overflow: 'hidden'
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        // Add command to output
        const newOutput = [...output, `${getPrompt()} ${command}`];
        
        // Process command
        const result = processCommand(command);
        newOutput.push(...result);
        
        setOutput(newOutput);
      }
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutoComplete();
    }
  };

  const getPrompt = () => {
    const shortPath = currentPath.replace('/home/aneesh', '~');
    return `aneesh@portfolio:${shortPath}$`;
  };

  const handleAutoComplete = () => {
    const [cmd] = input.split(' ');
    const commands = ['help', 'ls', 'cd', 'cat', 'pwd', 'whoami', 'clear', 'history', 'git', 'ps', 'curl', 'date', 'echo'];
    const matches = commands.filter(c => c.startsWith(cmd));
    if (matches.length === 1) {
      setInput(matches[0] + ' ');
    } else if (matches.length > 1) {
      const newOutput = [...output, matches.join('  ')];
      setOutput(newOutput);
    }
  };

  const processCommand = (command) => {
    const [cmd, ...args] = command.split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        return [
          'Available commands:',
          '',
          'File System:',
          '  ls [path]      - List directory contents',
          '  cd [path]      - Change directory',
          '  cat [file]     - Display file contents',
          '  pwd            - Show current directory',
          '',
          'System Info:',
          '  whoami         - Show current user info',
          '  ps             - Show running processes',
          '  date           - Show current date and time',
          '',
          'Development:',
          '  git [command]  - Git operations',
          '  curl [url]     - Make HTTP requests',
          '',
          'Utilities:',
          '  clear          - Clear terminal',
          '  history        - Show command history',
          '  echo [text]    - Display text',
          '',
          'Navigation Tips:',
          '  Use Tab for auto-completion',
          '  Start exploring with: ls, cd projects, cat about.txt',
          ''
        ];
        
      case 'ls':
        return getLsOutput(args[0]);
        
      case 'cd':
        return getCdOutput(args[0]);
        
      case 'pwd':
        return [currentPath];
        
      case 'cat':
        return getCatOutput(args[0]);
        
      case 'whoami':
        return ['Aneesh Kalisapudi - AI Engineer & Full-Stack Developer'];
        
      case 'ps':
        return [
          'PID   USER     COMMAND',
          '1234  aneesh   ./ai-chatbot-service',
          '5678  aneesh   python data-pipeline.py',
          '9012  aneesh   npm start portfolio',
          '3456  aneesh   docker-compose up',
          ''
        ];
        
      case 'git':
        return getGitOutput(args);
        
      case 'curl':
        return getCurlOutput(args);
        
      case 'date':
        return [new Date().toString()];
        
      case 'clear':
        window.location.reload();
        return [];
        
      case 'history':
        return ['Command history feature coming soon...'];
        
      case 'echo':
        return [args.join(' ')];
        
      case 'coffee':
        return ['☕ Error: Coffee machine not connected to portfolio'];
        
      case 'hack_the_matrix':
        return ['Accessing mainframe... Just kidding! 🕶️'];
        
      default:
        return [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  };

  const getLsOutput = (path) => {
    const currentDir = path || currentPath;
    
    if (currentDir === '/home/aneesh' || currentDir === '/home/aneesh/' || currentDir === '~') {
      return [
        'about.txt           projects/           experience/',
        'skills/             education/          contact.txt',
        ''
      ];
    } else if (currentDir === 'projects' || currentDir === '/home/aneesh/projects') {
      return [
        'second-brain-ai/    ai-mock-interview/  chatbot-platform/',
        'data-pipeline/      portfolio-terminal/ web-scraper/',
        ''
      ];
    } else if (currentDir === 'experience' || currentDir === '/home/aneesh/experience') {
      return [
        'keenfox-2024/       thinksimple-2024/   velocified-2023/',
        'wipro-2021/         freelance-projects/',
        ''
      ];
    } else if (currentDir === 'skills' || currentDir === '/home/aneesh/skills') {
      return [
        'programming.txt     frameworks.txt      databases.txt',
        'cloud-platforms.txt ai-ml.txt           tools.txt',
        ''
      ];
    } else if (currentDir === 'education' || currentDir === '/home/aneesh/education') {
      return [
        'arizona-state.txt   certifications.txt  courses.txt',
        ''
      ];
    } else {
      return [`ls: cannot access '${currentDir}': No such file or directory`];
    }
  };

  const getCdOutput = (path) => {
    if (!path) {
      setCurrentPath('/home/aneesh');
      return [''];
    }
    
    const validPaths = [
      '/home/aneesh', '~', 'projects', 'experience', 'education', 'skills',
      '/home/aneesh/projects', '/home/aneesh/experience', '/home/aneesh/education', '/home/aneesh/skills'
    ];
    
    if (validPaths.includes(path) || path === '..') {
      if (path === '..') {
        setCurrentPath('/home/aneesh');
      } else {
      const newPath = path.startsWith('/') ? path : `/home/aneesh/${path}`;
      setCurrentPath(newPath);
      }
      return [''];
    } else {
      return [`cd: ${path}: No such file or directory`];
    }
  };

  const getCatOutput = (file) => {
    if (!file) {
      return ['cat: missing file operand'];
    }
    
    switch (file) {
      case 'about.txt':
        return [
          '=====================================',
          '    ANEESH KALISAPUDI - README.md',
          '=====================================',
          '',
          'Software Engineer delivering full-stack, cloud-native apps,',
          'end-to-end data pipelines, and AI-driven chatbots.',
          '',
          'Specialties:',
          '- AI/ML Systems & LLM Deployment',
          '- Full-Stack Development (React, FastAPI)',
          '- Data Engineering (ETL, AWS, Spark)',
          '- Cloud-Native Architecture',
          '',
          'Currently: Software Engineer (AI) @ KeenFox',
          'Location: Remote, USA',
          'Website: www.aneeshkalisapudi.com',
          'Email: a.kalisapudi@gmail.com',
          'LinkedIn: linkedin.com/in/aneesh-kalisapudi',
          'GitHub: github.com/aneesh2411',
          ''
        ];
        
      case 'contact.txt':
        return [
          'Contact Information:',
          '',
          'Email: a.kalisapudi@gmail.com',
          'LinkedIn: linkedin.com/in/aneesh-kalisapudi',
          'GitHub: github.com/aneesh2411',
          'Website: www.aneeshkalisapudi.com',
          'Phone: +1 (602) 772-8900',
          '',
          'Feel free to reach out for:',
          '- Job opportunities',
          '- Collaboration on AI/ML projects',
          '- Technical discussions',
          '- Consulting opportunities',
          '',
          'Response Time: Usually within 24 hours',
          'Best Contact Method: Email or LinkedIn',
          'Time Zone: PST/PDT (UTC-8/-7)',
          ''
        ];

      // Projects
      case 'second-brain-ai.txt':
        return [
          'Second Brain AI - Personal Knowledge Assistant',
          '============================================',
          '',
          'Tech Stack: Python, FastAPI, React, PostgreSQL, OpenAI API',
          'Duration: 6 months (2024)',
          '',
          'Description:',
          'Built an AI-powered personal knowledge management system that',
          'helps users organize, search, and retrieve information using',
          'natural language queries.',
          '',
          'Key Features:',
          '- RAG (Retrieval Augmented Generation) pipeline',
          '- Vector embeddings for semantic search',
          '- Real-time chat interface with document context',
          '- Multi-format document ingestion (PDF, MD, TXT)',
          '- Conversation memory and context awareness',
          '',
          'Technical Highlights:',
          '- Implemented custom chunking algorithms for optimal retrieval',
          '- Used Pinecone for vector database management',
          '- Built responsive React frontend with real-time updates',
          '- Deployed on AWS with auto-scaling capabilities',
          '',
          'Results:',
          '- 95% accuracy in document retrieval',
          '- Sub-2 second response times',
          '- Processed 10,000+ documents successfully',
          ''
        ];

      case 'ai-mock-interview.txt':
        return [
          'AI Mock Interview Platform',
          '==========================',
          '',
          'Tech Stack: Python, Django, React, OpenAI GPT-4, WebRTC',
          'Duration: 4 months (2023)',
          '',
          'Description:',
          'Developed an AI-powered mock interview platform that provides',
          'realistic interview experiences with real-time feedback and',
          'personalized improvement suggestions.',
          '',
          'Key Features:',
          '- Real-time voice conversation with AI interviewer',
          '- Industry-specific question banks (Tech, Finance, etc.)',
          '- Behavioral and technical interview modes',
          '- Performance analytics and scoring',
          '- Resume-based question generation',
          '',
          'Technical Implementation:',
          '- Integrated OpenAI GPT-4 for dynamic question generation',
          '- Built speech-to-text and text-to-speech pipeline',
          '- Real-time sentiment analysis during interviews',
          '- Custom scoring algorithms for answer evaluation',
          '',
          'Impact:',
          '- 500+ users in beta testing',
          '- 85% user satisfaction rate',
          '- Average 30% improvement in interview confidence',
          ''
        ];

      case 'chatbot-platform.txt':
        return [
          'Enterprise Chatbot Platform',
          '============================',
          '',
          'Tech Stack: Node.js, Express, React, MongoDB, Socket.io',
          'Duration: 8 months (2022-2023)',
          '',
          'Description:',
          'Built a comprehensive chatbot platform for enterprises to',
          'create, deploy, and manage AI-powered customer service bots',
          'across multiple channels.',
          '',
          'Key Features:',
          '- Drag-and-drop conversation flow builder',
          '- Multi-channel deployment (Web, WhatsApp, Slack)',
          '- Natural language understanding with intent recognition',
          '- Analytics dashboard with conversation insights',
          '- Integration with CRM systems (Salesforce, HubSpot)',
          '',
          'Technical Architecture:',
          '- Microservices architecture with Docker containers',
          '- Real-time message processing with WebSockets',
          '- Machine learning pipeline for intent classification',
          '- Auto-scaling infrastructure on AWS ECS',
          '',
          'Business Results:',
          '- Reduced customer service costs by 40%',
          '- Handled 10,000+ conversations daily',
          '- 92% customer satisfaction score',
          ''
        ];

      case 'data-pipeline.txt':
        return [
          'Real-time Data Pipeline System',
          '===============================',
          '',
          'Tech Stack: Apache Spark, Kafka, Python, AWS, Elasticsearch',
          'Duration: 5 months (2023)',
          '',
          'Description:',
          'Designed and implemented a scalable real-time data pipeline',
          'for processing millions of events per day from multiple',
          'data sources with sub-second latency.',
          '',
          'Key Components:',
          '- Apache Kafka for event streaming',
          '- Spark Streaming for real-time processing',
          '- Data validation and quality checks',
          '- Automated alerting and monitoring',
          '- Data lake storage with partitioning strategy',
          '',
          'Technical Challenges Solved:',
          '- Handled data schema evolution gracefully',
          '- Implemented exactly-once processing semantics',
          '- Built custom connectors for legacy systems',
          '- Optimized for 99.9% uptime requirements',
          '',
          'Performance Metrics:',
          '- Processes 5M+ events per day',
          '- Average latency: 200ms',
          '- 99.95% data accuracy',
          '- Zero data loss in production',
          ''
        ];

      // Experience
      case 'keenfox-2024.txt':
        return [
          'KeenFox - Software Engineer (AI)',
          '=================================',
          '',
          'Duration: March 2024 - Present',
          'Location: Remote, USA',
          '',
          'Role Overview:',
          'Leading AI/ML initiatives and developing intelligent systems',
          'for enterprise clients. Focus on LLM integration, RAG systems,',
          'and scalable AI infrastructure.',
          '',
          'Key Responsibilities:',
          '- Design and implement RAG pipelines for knowledge retrieval',
          '- Develop custom LLM fine-tuning workflows',
          '- Build AI-powered chatbots and virtual assistants',
          '- Optimize model performance and inference costs',
          '- Collaborate with product teams on AI feature development',
          '',
          'Technical Achievements:',
          '- Reduced LLM inference costs by 60% through optimization',
          '- Built RAG system serving 100K+ queries daily',
          '- Implemented A/B testing framework for AI models',
          '- Developed automated model evaluation pipelines',
          '',
          'Technologies Used:',
          'Python, FastAPI, OpenAI API, Pinecone, Docker, AWS, React',
          ''
        ];

      case 'thinksimple-2024.txt':
        return [
          'ThinkSimple - Full Stack Developer',
          '===================================',
          '',
          'Duration: January 2024 - March 2024',
          'Location: Remote',
          '',
          'Role Overview:',
          'Developed web applications and APIs for startup clients.',
          'Focused on rapid prototyping and MVP development with',
          'modern tech stack.',
          '',
          'Key Projects:',
          '- Built e-commerce platform with payment integration',
          '- Developed real-time collaboration tools',
          '- Created mobile-responsive web applications',
          '- Implemented CI/CD pipelines for client projects',
          '',
          'Technical Contributions:',
          '- Reduced page load times by 70% through optimization',
          '- Built reusable component library for faster development',
          '- Implemented automated testing with 90% code coverage',
          '- Set up monitoring and alerting systems',
          '',
          'Technologies Used:',
          'React, Node.js, PostgreSQL, AWS, Docker, Stripe API',
          ''
        ];

      case 'velocified-2023.txt':
        return [
          'Velocified - Data Engineer',
          '===========================',
          '',
          'Duration: June 2023 - December 2023',
          'Location: Remote',
          '',
          'Role Overview:',
          'Built and maintained data infrastructure for analytics',
          'and machine learning workloads. Focused on ETL pipelines',
          'and data warehouse optimization.',
          '',
          'Key Responsibilities:',
          '- Design ETL pipelines for multi-source data integration',
          '- Optimize data warehouse queries for performance',
          '- Build data quality monitoring and validation systems',
          '- Develop APIs for data access and analytics',
          '',
          'Technical Achievements:',
          '- Reduced data processing time by 80% through optimization',
          '- Built automated data quality checks catching 99% of issues',
          '- Implemented real-time data streaming for critical metrics',
          '- Created self-service analytics platform for business teams',
          '',
          'Technologies Used:',
          'Apache Spark, Airflow, Snowflake, Python, AWS, Tableau',
          ''
        ];

      case 'wipro-2021.txt':
        return [
          'Wipro Limited - Software Engineer',
          '==================================',
          '',
          'Duration: July 2021 - August 2022',
          'Location: Bangalore, India',
          '',
          'Role Overview:',
          'Worked on enterprise applications and digital transformation',
          'projects for Fortune 500 clients. Gained experience in',
          'large-scale system design and agile development.',
          '',
          'Key Projects:',
          '- Modernized legacy banking applications',
          '- Built microservices architecture for retail client',
          '- Developed automated testing frameworks',
          '- Contributed to cloud migration initiatives',
          '',
          'Professional Growth:',
          '- Led team of 3 junior developers',
          '- Completed AWS and Azure certifications',
          '- Mentored new hires and interns',
          '- Presented technical solutions to client stakeholders',
          '',
          'Technologies Used:',
          'Java, Spring Boot, React, MySQL, AWS, Jenkins, Docker',
          ''
        ];

      // Skills
      case 'programming.txt':
        return [
          'Programming Languages & Proficiency',
          '====================================',
          '',
          'Expert Level (5+ years):',
          '  Python     - Data science, ML, backend development',
          '  JavaScript - Frontend, backend, full-stack applications',
          '  TypeScript - Type-safe web development',
          '  SQL        - Database design, optimization, analytics',
          '',
          'Proficient (3-5 years):',
          '  Java       - Enterprise applications, Spring ecosystem',
          '  C++        - System programming, algorithms',
          '  Go         - Microservices, concurrent programming',
          '  Rust       - Systems programming, performance-critical apps',
          '  Shell/Bash - Automation, DevOps scripting',
          '',
          'Familiar (1-3 years):',
          '  R          - Statistical analysis, data visualization',
          '  Scala      - Big data processing with Spark',
          '  PHP        - Web development, WordPress customization',
          '  C#         - .NET applications, Windows development',
          '',
          'Learning/Exploring:',
          '  Kotlin     - Android development',
          '  Swift      - iOS development',
          '  WebAssembly- High-performance web applications',
          ''
        ];
        
      case 'frameworks.txt':
        return [
          'Frameworks & Libraries Expertise',
          '=================================',
          '',
          'Frontend Development:',
          '  React.js   - Component-based UIs, hooks, context',
          '  Next.js    - SSR, SSG, full-stack React applications',
          '  Svelte     - Lightweight, compile-time optimized apps',
          '',
          'CSS & Styling:',
          '  Tailwind   - Utility-first CSS framework',
          '  Material-UI- React component library',
          '  Bootstrap  - Responsive design framework',
          '  Styled-Comp- CSS-in-JS for React',
          '  SASS/SCSS  - Advanced CSS preprocessing',
          '',
          'Backend Development:',
          '  FastAPI    - High-performance Python APIs',
          '  Django     - Full-featured web framework',
          '  Flask      - Lightweight Python web apps',
          '',
          'AI/ML & Data Science:',
          '  TensorFlow - Deep learning, neural networks',
          '  PyTorch    - Research-oriented ML framework',
          '  Scikit-learn- Classical machine learning',
          '  Pandas     - Data manipulation and analysis',
          '  NumPy      - Numerical computing',
          '  Hugging Face- Pre-trained NLP models',
          '  LangChain  - LLM application development',
          '  OpenAI API - GPT integration and fine-tuning',
          '',
          'Data Processing:',
          '  Apache Spark- Big data processing and analytics',
          '  Apache Kafka- Event streaming and messaging',
          '  Apache Airflow- Workflow orchestration',
          ''
        ];

      case 'databases.txt':
        return [
          'Database Technologies & Data Storage',
          '=====================================',
          '',
          'Relational Databases:',
          '  PostgreSQL - Advanced SQL, JSON support, full-text search',
          '  MySQL      - Web applications, replication, optimization',
          '  SQLite     - Embedded applications, mobile development',
          '  SQL Server - Enterprise applications, SSIS, SSRS',
          '  Oracle     - Large-scale enterprise systems',
          '',
          'NoSQL Databases:',
          '  MongoDB    - Document storage, aggregation pipelines',
          '  Redis      - Caching, session storage, pub/sub',
          '  Elasticsearch- Search engine, log analysis, analytics',
          '  Cassandra  - Distributed, high-availability systems',
          '  DynamoDB   - AWS managed NoSQL, serverless applications',
          '',
          'Vector Databases:',
          '  Pinecone   - Managed vector database for AI applications',
          '  Weaviate   - Open-source vector database',
          '  Chroma     - AI-native embedding database',
          '',
          'Data Warehouses:',
          '  Snowflake  - Cloud data warehouse, analytics',
          '  BigQuery   - Google Cloud analytics platform',
          '  Redshift   - AWS data warehouse solution',
          '',
          'Database Skills:',
          '- Query optimization and performance tuning',
          '- Database design and normalization',
          '- Backup and recovery strategies',
          '- Replication and high availability setup',
          '- Data migration and ETL processes',
          ''
        ];

      case 'cloud-platforms.txt':
        return [
          'Cloud Platforms & DevOps',
          '=========================',
          '',
          'Amazon Web Services (AWS):',
          '  Compute    - EC2, Lambda, ECS, Fargate',
          '  Storage    - S3, EBS, EFS, Glacier',
          '  Database   - RDS, DynamoDB, ElastiCache',
          '  AI/ML      - SageMaker, Bedrock, Comprehend',
          '  Networking - VPC, CloudFront, Route 53',
          '  Security   - IAM, Secrets Manager, KMS',
          '',
          'Google Cloud Platform (GCP):',
          '  Compute    - Compute Engine, Cloud Functions',
          '  AI/ML      - Vertex AI, AutoML, BigQuery ML',
          '  Data       - BigQuery, Cloud Storage, Dataflow',
          '  Kubernetes - GKE (Google Kubernetes Engine)',
          '',
          'Microsoft Azure:',
          '  Compute    - Virtual Machines, Functions',
          '  AI         - Cognitive Services, ML Studio',
          '  Data       - Cosmos DB, SQL Database',
          '',
          'Containerization & Orchestration:',
          '  Docker     - Container creation, multi-stage builds',
          '  Kubernetes - Orchestration, scaling, service mesh',
          '  Docker Compose- Local development environments',
          '',
          'CI/CD & Automation:',
          '  GitHub Actions- Automated workflows, deployments',
          '  Jenkins    - Build automation, pipeline management',
          '  GitLab CI  - Integrated DevOps platform',
          '  Terraform  - Infrastructure as Code',
          '  Ansible    - Configuration management',
          '',
          'Monitoring & Observability:',
          '  Prometheus - Metrics collection and alerting',
          '  Grafana    - Data visualization and dashboards',
          '  ELK Stack  - Logging and log analysis',
          '  DataDog    - Application performance monitoring',
          ''
        ];

      case 'ai-ml.txt':
        return [
          'AI/ML Technologies & Techniques',
          '================================',
          '',
          'Large Language Models (LLMs):',
          '  OpenAI GPT - Integration, fine-tuning, prompt engineering',
          '  Anthropic  - Claude API integration',
          '  Hugging Face- Open-source model deployment',
          '  LangChain  - LLM application frameworks',
          '  LlamaIndex - Data indexing for LLM applications',
          '',
          'Machine Learning Frameworks:',
          '  TensorFlow - Deep learning, production deployment',
          '  PyTorch    - Research, prototyping, dynamic graphs',
          '  Scikit-learn- Classical ML algorithms',
          '  XGBoost    - Gradient boosting, tabular data',
          '  LightGBM   - Fast gradient boosting framework',
          '',
          'Computer Vision:',
          '  OpenCV     - Image processing, computer vision',
          '  YOLO       - Object detection and recognition',
          '  MediaPipe  - Real-time perception pipelines',
          '',
          'Natural Language Processing:',
          '  spaCy      - Industrial-strength NLP',
          '  NLTK       - Natural language toolkit',
          '  Transformers- Pre-trained language models',
          '  Sentence-T - Semantic text similarity',
          '',
          'MLOps & Model Management:',
          '  MLflow     - ML lifecycle management',
          '  Weights & Biases- Experiment tracking',
          '  Kubeflow   - ML workflows on Kubernetes',
          '  DVC        - Data version control',
          '',
          'Techniques & Specializations:',
          '- Retrieval Augmented Generation (RAG)',
          '- Fine-tuning and transfer learning',
          '- Prompt engineering and optimization',
          '- Model quantization and optimization',
          '- A/B testing for ML models',
          '- Feature engineering and selection',
          '- Hyperparameter optimization',
          ''
        ];

      case 'tools.txt':
        return [
          'Development Tools & Software',
          '=============================',
          '',
          'Code Editors & IDEs:',
          '  VS Code    - Primary editor, extensions, debugging',
          '  PyCharm    - Python development, data science',
          '  IntelliJ   - Java development, Spring applications',
          '  Jupyter    - Data analysis, ML experimentation',
          '  Vim/Neovim - Terminal-based editing, server work',
          '',
          'Version Control:',
          '  Git        - Distributed version control',
          '  GitHub     - Code hosting, collaboration, CI/CD',
          '  GitLab     - DevOps platform, self-hosted',
          '  Bitbucket  - Atlassian ecosystem integration',
          '',
          'Project Management:',
          '  Jira       - Agile project management',
          '  Trello     - Kanban boards, simple task management',
          '  Notion     - Documentation, knowledge management',
          '  Confluence - Team collaboration, documentation',
          '',
          'Design & Prototyping:',
          '  Figma      - UI/UX design, prototyping',
          '  Adobe XD   - User experience design',
          '  Sketch     - Interface design (macOS)',
          '',
          'API Development & Testing:',
          '  Postman    - API testing, documentation',
          '  Insomnia   - REST and GraphQL client',
          '  Swagger    - API documentation and testing',
          '',
          'Database Management:',
          '  pgAdmin    - PostgreSQL administration',
          '  MongoDB Compass- MongoDB GUI',
          '  DBeaver    - Universal database tool',
          '  Redis CLI  - Redis command-line interface',
          '',
          'Communication & Collaboration:',
          '  Slack      - Team communication, integrations',
          '  Discord    - Community building, voice chat',
          '  Zoom       - Video conferencing, screen sharing',
          '  Microsoft Teams- Enterprise communication',
          ''
        ];

      // Education
      case 'arizona-state.txt':
        return [
          'Arizona State University',
          '========================',
          '',
          'Degree: Master of Science in Computer Science',
          'Duration: August 2021 - May 2023',
          'GPA: 3.8/4.0',
          'Location: Tempe, Arizona',
          '',
          'Specialization: Artificial Intelligence & Machine Learning',
          '',
          'Relevant Coursework:',
          '- CSE 571: Artificial Intelligence',
          '- CSE 572: Data Mining',
          '- CSE 573: Semantic Web Mining',
          '- CSE 575: Statistical Machine Learning',
          '- CSE 576: Topics in AI (Deep Learning)',
          '- CSE 578: Data Visualization',
          '- CSE 579: Knowledge Representation',
          '- CSE 534: Advanced Operating Systems',
          '- CSE 536: Advanced Computer Networks',
          '- CSE 545: Software Security',
          '',
          'Notable Projects:',
          '- Thesis: "Optimizing RAG Systems for Domain-Specific Knowledge"',
          '- Built recommendation system for course selection',
          '- Developed sentiment analysis tool for social media',
          '- Created distributed system for real-time data processing',
          '',
          'Academic Achievements:',
          '- Dean\'s List: Fall 2022, Spring 2023',
          '- Graduate Research Assistant (AI Lab)',
          '- Published paper on efficient vector similarity search',
          '- Teaching Assistant for Data Structures course',
          '',
          'Extracurricular Activities:',
          '- President, AI/ML Student Society',
          '- Volunteer, Hour of Code events',
          '- Participant, ACM Programming Contest',
          ''
        ];

      case 'certifications.txt':
      return [
          'Professional Certifications',
          '============================',
          '',
          'Cloud Certifications:',
          '  AWS Certified Solutions Architect - Associate (2023)',
          '  AWS Certified Developer - Associate (2022)',
          '  Google Cloud Professional Data Engineer (2023)',
          '  Microsoft Azure Fundamentals (2022)',
          '',
          'AI/ML Certifications:',
          '  TensorFlow Developer Certificate (2023)',
          '  Deep Learning Specialization - Coursera (2022)',
          '  Machine Learning Engineering for Production (2022)',
          '  Natural Language Processing Specialization (2023)',
          '',
          'Technology-Specific:',
          '  MongoDB Certified Developer (2022)',
          '  Kubernetes Application Developer (CKAD) (2023)',
          '  Docker Certified Associate (2022)',
          '',
          'Professional Development:',
          '  Agile Certified Practitioner (PMI-ACP) (2022)',
          '  Scrum Master Certified (PSM I) (2021)',
          '  ITIL Foundation Certificate (2021)',
          '',
          'Continuing Education:',
          '- Actively pursuing AWS Machine Learning Specialty',
          '- Enrolled in Advanced Kubernetes Administration course',
          '- Regular participant in AI/ML conferences and workshops',
          '- Member of professional organizations (ACM, IEEE)',
          ''
        ];

      case 'courses.txt':
      return [
          'Online Courses & Continuous Learning',
          '=====================================',
          '',
          'Recent Completions (2023-2024):',
          '  "LangChain for LLM Application Development" - DeepLearning.AI',
          '  "Building Systems with ChatGPT API" - OpenAI',
          '  "MLOps Specialization" - Coursera',
          '  "Advanced React Patterns" - Epic React',
          '  "System Design Interview" - Educative',
          '',
          'AI/ML Focused Learning:',
          '  "Transformers and NLP" - Hugging Face',
          '  "Computer Vision with PyTorch" - Udacity',
          '  "Reinforcement Learning" - Stanford CS234',
          '  "GANs and Advanced Deep Learning" - Coursera',
          '',
          'Full-Stack Development:',
          '  "Complete React Developer" - Zero to Mastery',
          '  "Node.js Microservices" - Stephen Grider',
          '  "Advanced SQL and Database Design" - Udemy',
          '  "GraphQL with React" - The Net Ninja',
          '',
          'Cloud & DevOps:',
          '  "AWS Solutions Architect" - A Cloud Guru',
          '  "Kubernetes Mastery" - Docker and Kubernetes',
          '  "Terraform for AWS" - HashiCorp Learn',
          '  "CI/CD with Jenkins" - Jenkins Academy',
          '',
          'Currently Learning:',
          '- Advanced Prompt Engineering Techniques',
          '- Rust Programming for Systems Development',
          '- WebAssembly for High-Performance Web Apps',
          '- Distributed Systems Design Patterns',
          '',
          'Learning Philosophy:',
          'Committed to continuous learning and staying current with',
          'emerging technologies. Allocate 5-10 hours weekly for',
          'skill development and exploring new tools/frameworks.',
          ''
        ];
        
      default:
        return [`cat: ${file}: No such file or directory`];
    }
  };

  const getGitOutput = (args) => {
    if (args.length === 0) {
      return ['usage: git [--version] [--help] <command> [<args>]'];
    }
    
    const subcommand = args[0];
    if (subcommand === 'log') {
      return [
        'commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
        'Author: Aneesh Kalisapudi <a.kalisapudi@gmail.com>',
        'Date: ' + new Date().toDateString(),
        '',
        '    Implemented RAG pipeline optimization',
        '',
        'commit b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1',
        'Author: Aneesh Kalisapudi <a.kalisapudi@gmail.com>',
        'Date: ' + new Date(Date.now() - 86400000).toDateString(),
        '',
        '    Added chatbot response caching',
        ''
      ];
    } else if (subcommand === 'status') {
      return [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'nothing to commit, working tree clean',
        ''
      ];
    } else if (subcommand === 'branch') {
      return [
        '* main',
        '  feature/ai-improvements',
        '  feature/performance-optimization',
        ''
      ];
    }
    return [`git: '${subcommand}' is not a git command.`];
  };

  const getCurlOutput = (args) => {
    if (args.includes('api.aneeshkalisapudi.com/health')) {
      return [
        '{"status": "healthy", "projects": "running", "ai_models": "active"}',
        ''
      ];
    } else if (args.includes('github.com/aneesh2411')) {
      return [
        'HTTP/1.1 200 OK',
        'Content-Type: application/json',
        '',
        '{"public_repos": 25, "followers": 42, "following": 18}',
        ''
      ];
    }
    return ['curl: command not fully implemented in portfolio mode'];
  };

  return (
    <div style={terminalStyle}>
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        {/* Terminal Output */}
        <div style={{flex: 1, marginBottom: '16px', overflowY: 'auto'}}>
          {output.map((line, index) => (
            <div key={index} style={{marginBottom: '2px', color: line.includes('Command not found') ? '#ff4444' : '#00ff00'}}>
              {line}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{marginRight: '8px'}}>{getPrompt()}</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00ff00',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              flex: 1
            }}
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            backgroundColor: '#00ff00',
            marginLeft: '4px',
            animation: 'blink 1s infinite'
          }}></span>
        </div>
      </div>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Terminal;
