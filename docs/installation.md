# Installation

This guide covers installation and setup of SDD Skills AI for different environments and use cases.

---

## 🚀 Quick Install (Recommended)

The fastest way to get started is using npx:

```bash
npx sdd-skills-ai wizard
```

This downloads and runs the latest version without requiring permanent installation.

---

## 📦 System Installation

### Global Installation (Recommended for regular use)

```bash
# Install globally
npm install -g sdd-skills-ai

# Verify installation
sdd-skills-ai --version

# Run wizard
sdd-skills-ai wizard
```

### Local Installation (For project-specific setup)

```bash
# Install in project
npm install sdd-skills-ai --save-dev

# Run via npx
npx sdd-skills-ai wizard

# Or add to package.json scripts
npm run sdd-wizard
```

---

## 🔧 System Requirements

### Minimum Requirements
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **Disk space**: 50MB for installation
- **Memory**: 256MB RAM minimum

### Recommended Requirements
- **Node.js**: Version 20.0 or higher
- **npm**: Version 10.0 or higher
- **Disk space**: 100MB for full installation with all components
- **Memory**: 512MB RAM or more

### Supported Platforms
- **macOS**: 10.15 (Catalina) or higher
- **Linux**: Most modern distributions (Ubuntu 18.04+, CentOS 7+, etc.)
- **Windows**: Windows 10 or higher (WSL recommended)

---

## 🐍 Installation Methods

### Method 1: npm (Recommended)

```bash
# Global installation
npm install -g sdd-skills-ai

# Local installation
npm install sdd-skills-ai
```

**Advantages:**
- Official package manager
- Automatic dependency management
- Easy updates with `npm update`

### Method 2: yarn

```bash
# Global installation
yarn global add sdd-skills-ai

# Local installation
yarn add sdd-skills-ai
```

**Advantages:**
- Faster installation
- Better dependency resolution
- Lockfile for reproducible builds

### Method 3: pnpm

```bash
# Global installation
pnpm add -g sdd-skills-ai

# Local installation
pnpm add sdd-skills-ai
```

**Advantages:**
- Disk space efficient
- Fast installation
- Strict peer dependencies

---

## 🔍 Verification

After installation, verify everything is working:

```bash
# Check version
sdd-skills-ai --version

# Check help
sdd-skills-ai --help

# Test wizard (dry run)
sdd-skills-ai wizard --help
```

Expected output:
```
Usage: sdd-skills-ai [options] [command]

CLI to scaffold a Spec-Driven Organization boilerplate

Options:
  -V, --version  output the version number
  -h, --help     display help for command

Commands:
  wizard [dir]              Full interactive experience (RECOMMENDED)
  init [dir]                Setup spec-driven architecture base
  configure-tools [dir]    Configure AI coding assistant tools
  install-scrum [dir]       Install Scrum agents with SDD+TDD+DDD disciplines
  ...
```

---

## 🛠️ Development Installation

For contributors or advanced users who want to work with the source code:

### Clone Repository
```bash
git clone https://github.com/eltonjosesouza/sdd-skills-ai.git
cd sdd-skills-ai
```

### Install Dependencies
```bash
npm install
```

### Build from Source
```bash
npm run build
```

### Link for Development
```bash
npm link
```

### Test Installation
```bash
sdd-skills-ai --version
```

---

## 🐳 Docker Installation

### Using Docker (Experimental)

```bash
# Pull the image
docker pull ghcr.io/eltonjosesouza/sdd-skills-ai:latest

# Run the wizard
docker run --rm -v $(pwd):/workspace ghcr.io/eltonjosesouza/sdd-skills-ai:latest wizard
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  sdd-skills-ai:
    image: ghcr.io/eltonjosesouza/sdd-skills-ai:latest
    volumes:
      - ./:/workspace
    working_dir: /workspace
    command: wizard
```

Run:
```bash
docker-compose up
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Set configuration directory
export SDD_SKILLS_AI_CONFIG_DIR=~/.my-sdd-config

# Enable debug logging
export SDD_SKILLS_AI_DEBUG=1

# Set default agent
export SDD_SKILLS_AI_DEFAULT_AGENT=windsurf
```

### Configuration File

Create `~/.sdd-skills-ai/config.json`:
```json
{
  "defaultAgent": "windsurf",
  "defaultSpecs": ["speckit"],
  "defaultTools": ["claude", "cursor"],
  "autoUpdate": true,
  "debug": false
}
```

---

## 🚀 Post-Installation Setup

### 1. Run the Wizard
```bash
sdd-skills-ai wizard
```

### 2. Configure AI Tools
During the wizard, select your preferred AI coding assistants:
- **Claude Code** - CLI-based development
- **Cursor** - IDE-based development  
- **Windsurf** - Modern AI assistant
- **And 20 more options**

### 3. Install Scrum (Optional)
```bash
sdd-skills-ai install-scrum --agent windsurf
```

### 4. Verify Installation
```bash
# Check created files
ls -la .agent/skills/
ls -la docs/
cat Agents.md
```

---

## 🔍 Troubleshooting

### Common Issues

#### "Command not found: sdd-skills-ai"
```bash
# Check if installed globally
npm list -g sdd-skills-ai

# Reinstall if missing
npm install -g sdd-skills-ai

# Check PATH
echo $PATH | grep -o "[^:]*node[^:]*"
```

#### "Permission denied"
```bash
# Use sudo for global installation
sudo npm install -g sdd-skills-ai

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

#### "Node version too old"
```bash
# Check Node version
node --version

# Update Node.js (using nvm)
nvm install 20
nvm use 20
```

#### "Wizard hangs or crashes"
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm uninstall -g sdd-skills-ai
npm install -g sdd-skills-ai
```

### Debug Mode

Enable debug logging:
```bash
export SDD_SKILLS_AI_DEBUG=1
sdd-skills-ai wizard
```

### Log Files

Debug logs are written to:
- **macOS/Linux**: `~/.sdd-skills-ai/logs/debug.log`
- **Windows**: `%USERPROFILE%\.sdd-skills-ai\logs\debug.log`

---

## 🔄 Updates

### Check for Updates
```bash
npm outdated -g sdd-skills-ai
```

### Update to Latest
```bash
npm update -g sdd-skills-ai
```

### Update Specific Version
```bash
npm install -g sdd-skills-ai@1.0.16
```

### Uninstall
```bash
npm uninstall -g sdd-skills-ai
```

---

## 🎯 Next Steps

After successful installation:

1. **Read [Getting Started](getting-started.md)** - Learn the basics
2. **Try the [Quick Start](quick-start.md)** - Hands-on tutorial
3. **Explore [Scrum Overview](scrum/overview.md)** - Team methodology
4. **Configure [AI Tools](supported-tools.md)** - Your specific assistants
5. **Join the Community** - GitHub discussions and issues

---

## 💡 Installation Tips

### For Developers
- Use local installation for project-specific configuration
- Use global installation for personal workflow
- Consider using nvm for Node.js version management

### For Teams
- Standardize on the same version across the team
- Use package.json for project-specific setup
- Consider Docker for consistent environments

### For Organizations
- Use internal npm registry for enterprise
- Create custom installation scripts
- Integrate with existing CI/CD pipelines

---

*Need help with installation? Check the [Troubleshooting](troubleshooting.md) guide or open an issue on GitHub.*
