# Terminal Portfolio

A unique, interactive terminal-style portfolio website built with React and Vite. Experience my professional journey through a classic green-on-black terminal interface.

## 🎯 Live Demo

Visit the live portfolio: [www.aneeshkalisapudi.com](https://www.aneeshkalisapudi.com)

## ✨ Features

- **Interactive Terminal Interface** - Navigate using real terminal commands
- **Authentic Terminal Experience** - Green-on-black theme with blinking cursor
- **File System Navigation** - Use `ls`, `cd`, `cat` commands to explore
- **Tab Auto-completion** - Press Tab to auto-complete commands
- **Mobile Responsive** - Works seamlessly on all devices
- **Rich Content** - Detailed information about projects, experience, and skills

## 🚀 Available Commands

### File System
- `ls [path]` - List directory contents
- `cd [path]` - Change directory
- `cat [file]` - Display file contents
- `pwd` - Show current directory

### System Info
- `whoami` - Show current user info
- `ps` - Show running processes
- `date` - Show current date and time

### Development
- `git [command]` - Git operations (log, status, branch)
- `curl [url]` - Make HTTP requests

### Utilities
- `clear` - Clear terminal (refresh page)
- `help` - Show all available commands
- `echo [text]` - Display text

## 🗂️ Portfolio Structure

```
/home/aneesh/
├── about.txt           # Professional summary
├── contact.txt         # Contact information
├── projects/           # Project details
│   ├── second-brain-ai.txt
│   ├── ai-mock-interview.txt
│   ├── chatbot-platform.txt
│   └── data-pipeline.txt
├── experience/         # Work experience
│   ├── keenfox-2024.txt
│   ├── thinksimple-2024.txt
│   ├── velocified-2023.txt
│   └── wipro-2021.txt
├── skills/            # Technical skills
│   ├── programming.txt
│   ├── frameworks.txt
│   ├── databases.txt
│   ├── cloud-platforms.txt
│   ├── ai-ml.txt
│   └── tools.txt
└── education/         # Educational background
    ├── arizona-state.txt
    ├── certifications.txt
    └── courses.txt
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **Deployment**: Vercel/Netlify ready
- **Development**: Node.js, npm

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/aneesh2411/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Adding New Commands
Edit `src/components/Terminal.jsx` and add your command in the `processCommand` function:

```javascript
case 'your-command':
  return ['Your command output here'];
```

### Adding New Files
Add new file content in the `getCatOutput` function:

```javascript
case 'your-file.txt':
  return [
    'Your file content',
    'Line by line',
    ''
  ];
```

### Styling
- Terminal colors: Edit `tailwind.config.js`
- Layout: Modify `src/components/Terminal.jsx`
- CSS: Update `src/index.css`

## 📱 Mobile Support

The terminal is fully responsive and includes:
- Touch-friendly input
- Optimized font sizes
- Scroll support for long outputs
- Auto-focus on terminal click

## 🔧 Development

### Project Structure
```
src/
├── components/
│   └── Terminal.jsx    # Main terminal component
├── App.jsx            # Root component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

### Key Features Implementation
- **Command Processing**: Pattern matching with switch statements
- **File System Simulation**: Virtual directory structure
- **State Management**: React hooks for terminal state
- **Auto-completion**: Tab key handler with command matching

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

- **Email**: a.kalisapudi@gmail.com
- **LinkedIn**: [linkedin.com/in/aneesh-kalisapudi](https://linkedin.com/in/aneesh-kalisapudi)
- **GitHub**: [github.com/aneesh2411](https://github.com/aneesh2411)
- **Website**: [www.aneeshkalisapudi.com](https://www.aneeshkalisapudi.com)

---

⭐ Star this repo if you found it helpful!
