# FAQ

Frequently asked questions about SDD Skills AI.

---

## 🚀 Installation & Setup

### Q: What are the system requirements?
**A:** 
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher  
- **Disk space**: 50MB minimum
- **Memory**: 256MB RAM minimum

### Q: Can I use SDD Skills AI without installing?
**A:** Yes! Use `npx sdd-skills-ai wizard` to run without installation.

### Q: How do I update SDD Skills AI?
**A:** 
```bash
npm update -g sdd-skills-ai
```

### Q: Does it work on Windows?
**A:** Yes, Windows 10+ is supported. WSL is recommended for best experience.

---

## 🧙‍♂️ Wizard & Configuration

### Q: Should I use the wizard or individual commands?
**A:** Use the wizard for first-time setup. Use individual commands for:
- CI/CD automation
- Scripted setups
- Incremental changes

### Q: What's the difference between Spec-Kit and OpenSpec?
**A:** 
- **Spec-Kit** (default): GitHub's official spec-driven implementation
- **OpenSpec** (optional): AI-friendly spec.md setup
- **Both**: Can be used together for maximum compatibility

### Q: Can I change my AI tools later?
**A:** Yes! Run `sdd-skills-ai configure-tools` anytime to reconfigure.

---

## 🏈 Scrum Methodology

### Q: Do I have to use Scrum?
**A:** No, Scrum is optional. You can use SDD Skills AI for:
- Spec-driven development only
- Tool configuration only
- Custom workflows

### Q: What are the 9 Scrum agents?
**A:** 
- **Core**: Product Owner, Scrum Master, Tech Lead, Developer
- **Specialists**: UX Designer, QA Engineer, Security Engineer, DevOps Engineer, Data Lead

### Q: Can I customize Scrum phases?
**A:** Currently, Scrum phases are fixed. Customization is planned for future releases.

---

## 🔧 AI Tools & Integration

### Q: Which AI assistants are supported?
**A:** 23 tools including:
- **Claude Code**, **Cursor**, **Windsurf**, **Gemini CLI**
- **Antigravity**, **Cline**, **Codex**, **Continue**
- **GitHub Copilot**, **Kiro**, **OpenCode**
- And 13 more specialized tools

### Q: Can I use multiple AI assistants?
**A:** Yes! Configure multiple tools in the same project. All share the same skills and workflows.

### Q: How do AI assistants access the skills?
**A:** Skills are installed in tool-specific directories:
- Claude: `.claude/skills/`
- Cursor: `.cursor/skills/`
- Windsurf: `.windsurf/skills/`

---

## 🛠️ Skills & Workflows

### Q: What skills are included by default?
**A:** 
- **Antigravity Kit**: Standard workflow skills
- **Awesome Skills**: 950+ community curated skills
- **Scrum Skills**: 13 Scrum-specific skills (if installed)

### Q: Can I create custom skills?
**A:** Yes! Use `sdd-skills-ai add-skill <repo-url>` to add GitHub repositories.

### Q: What's the difference between skills and workflows?
**A:** 
- **Skills**: Reusable templates for specific tasks
- **Workflows**: Orchestrated multi-step processes

---

## 📁 Files & Directories

### Q: What does `.agent/` contain?
**A:** 
- `skills/`: Reusable skill templates
- `workflows/`: End-to-end processes

### Q: What is `Agents.md` for?
**A:** Provides context and role definitions for AI assistants.

### Q: Can I edit the generated files?
**A:** Yes! All files are meant to be customized for your project.

---

## 🔄 Troubleshooting

### Q: The wizard hangs or crashes
**A:** 
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm uninstall -g sdd-skills-ai
npm install -g sdd-skills-ai
```

### Q: "Command not found: sdd-skills-ai"
**A:** 
```bash
# Check if installed
npm list -g sdd-skills-ai

# Reinstall if missing
npm install -g sdd-skills-ai

# Check PATH
echo $PATH | grep -o "[^:]*node[^:]*"
```

### Q: AI agents don't respond to @mentions
**A:** 
1. Restart your AI assistant
2. Check that `Agents.md` exists
3. Verify agent names match exactly

### Q: Files aren't being created
**A:** 
1. Check disk space
2. Verify write permissions
3. Run with debug: `SDD_SKILLS_AI_DEBUG=1 sdd-skills-ai wizard`

---

## 🎯 Best Practices

### Q: Should I use Scrum for personal projects?
**A:** Scrum works for any size project. For personal projects, focus on:
- Phase 1: Discovery
- Phase 2: Contract  
- Phase 4: Development
- Phase 6: Release

### Q: How do I integrate with existing teams?
**A:** 
1. Standardize on the same SDD Skills AI version
2. Use the same tool configurations
3. Share Scrum role assignments
4. Maintain documentation in shared repository

### Q: Can I use this with existing projects?
**A:** Yes! SDD Skills AI creates new files without modifying existing code.

---

## 🔧 Advanced Usage

### Q: How do I enable debug logging?
**A:** 
```bash
export SDD_SKILLS_AI_DEBUG=1
sdd-skills-ai wizard
```

### Q: Can I automate setup in CI/CD?
**A:** Yes! Use individual commands:
```bash
sdd-skills-ai init --no-interactive
sdd-skills-ai configure-tools --tools claude,cursor
sdd-skills-ai install-scrum
```

### Q: How do I backup my configuration?
**A:** Your configuration is stored in `~/.sdd-skills-ai/config.json`.

---

## 📈 Performance & Scale

### Q: Does SDD Skills AI slow down my project?
**A:** No, SDD Skills AI only creates files. It doesn't affect runtime performance.

### Q: How many projects can I use this in?
**A:** Unlimited! Each project gets its own configuration.

### Q: What's the impact on git repository size?
**A:** Minimal. Most files are small markdown templates.

---

## 🔒 Security & Privacy

### Q: Does SDD Skills AI send my code anywhere?
**A:** No, SDD Skills AI runs locally and doesn't transmit your code.

### Q: Are the AI tools secure?
**A:** SDD Skills AI only configures directories. Security depends on your chosen AI tools.

### Q: Can I use this in enterprise environments?
**A:** Yes! It's particularly useful for standardizing development practices.

---

## 🆘 Getting Help

### Q: Where can I get support?
**A:** 
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Community Q&A
- **Documentation**: Complete guides in `docs/`

### Q: How do I report a bug?
**A:** 
1. Check existing issues first
2. Include: Node.js version, OS, error messages
3. Provide steps to reproduce
4. Include debug logs if possible

### Q: How can I contribute?
**A:** 
1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Follow the contribution guidelines

---

## 🎯 Future Features

### Q: What's planned for future releases?
**A:** 
- Custom Scrum phase configuration
- More AI tool integrations
- Advanced customization options
- Team collaboration features
- Performance analytics

### Q: How can I request features?
**A:** Open an issue on GitHub with "Feature Request" label.

---

*Still have questions? Check the [Troubleshooting](troubleshooting.md) guide or open an issue on GitHub.*
