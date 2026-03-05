# Troubleshooting

Common issues and solutions for SDD Skills AI.

---

## 🚀 Installation Issues

### "Command not found: sdd-skills-ai"

**Symptoms:**
```bash
sdd-skills-ai --version
zsh: command not found: sdd-skills-ai
```

**Solutions:**

1. **Check if installed:**
```bash
npm list -g sdd-skills-ai
```

2. **Reinstall if missing:**
```bash
npm install -g sdd-skills-ai
```

3. **Check PATH:**
```bash
echo $PATH | grep -o "[^:]*node[^:]*"
```

4. **Use npx (alternative):**
```bash
npx sdd-skills-ai --version
```

### "Permission denied" during installation

**Symptoms:**
```bash
npm install -g sdd-skills-ai
npm ERR! Error: EACCES: permission denied
```

**Solutions:**

1. **Use sudo (Linux/macOS):**
```bash
sudo npm install -g sdd-skills-ai
```

2. **Fix npm permissions:**
```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

3. **Use Node Version Manager:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node
nvm install 20
nvm use 20
npm install -g sdd-skills-ai
```

### "Node version too old"

**Symptoms:**
```bash
sdd-skills-ai --version
Error: SDD Skills AI requires Node.js 18.0 or higher
```

**Solutions:**

1. **Check current version:**
```bash
node --version
```

2. **Update Node.js (using nvm):**
```bash
nvm install 20
nvm use 20
nvm alias default 20
```

3. **Update Node.js (manual):**
```bash
# Download and install from https://nodejs.org
```

---

## 🧙‍♂️ Wizard Issues

### Wizard hangs or crashes

**Symptoms:**
- Wizard stops responding
- Process exits unexpectedly
- No output after prompts

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Reinstall SDD Skills AI:**
```bash
npm uninstall -g sdd-skills-ai
npm install -g sdd-skills-ai
```

3. **Run with debug:**
```bash
export SDD_SKILLS_AI_DEBUG=1
sdd-skills-ai wizard
```

4. **Check system resources:**
```bash
# Check available memory
free -h  # Linux
vm_stat | perl -ne '/page_size/ && $s = $' * 4096 / 1024 / 1024; /Pages free/ && printf "%.2f GB\n", $s * $' / 1024'  # macOS

# Check disk space
df -h .
```

### "Directory already exists" errors

**Symptoms:**
```bash
? Do you want to initialize Spec-Driven base configuration (specs)? (Y/n)
Error: Directory already exists
```

**Solutions:**

1. **Use existing directory:**
```bash
sdd-skills-ai wizard ./existing-project
```

2. **Remove and recreate:**
```bash
rm -rf my-project
sdd-skills-ai wizard my-project
```

3. **Use individual commands:**
```bash
cd existing-project
sdd-skills-ai configure-tools
sdd-skills-ai install-scrum
```

---

## 🔧 Tool Configuration Issues

### AI tools not responding

**Symptoms:**
- `@scrum.product-owner` doesn't work
- Skills not found
- Workflows unavailable

**Solutions:**

1. **Check if tools were configured:**
```bash
ls -la .claude/skills/  # or .cursor/, .windsurf/, etc.
```

2. **Reconfigure tools:**
```bash
sdd-skills-ai configure-tools
```

3. **Check Agents.md:**
```bash
cat Agents.md | grep -A 5 "Scrum Agents"
```

4. **Restart AI assistant:**
   - Close and reopen your AI tool
   - Reload the workspace
   - Clear cache if available

### Wrong directory structure

**Symptoms:**
- Skills in wrong locations
- Tools can't find files
- Path errors

**Solutions:**

1. **Check expected vs actual structure:**
```bash
# Expected for Claude
ls -la .claude/skills/
ls -la .claude/commands/

# Expected for Cursor  
ls -la .cursor/skills/
ls -la .cursor/commands/
```

2. **Recreate structure:**
```bash
sdd-skills-ai configure-tools --tools claude,cursor,windsurf
```

3. **Check tool-specific paths:**
```bash
# See supported-tools.md for correct paths
grep -A 20 "Tool Directory Reference" docs/supported-tools.md
```

---

## 🏈 Scrum Issues

### Scrum agents not working

**Symptoms:**
- `@scrum.product-owner` returns "Unknown agent"
- Scrum skills not found
- Workflows fail

**Solutions:**

1. **Check if Scrum is installed:**
```bash
ls -la .agent/skills/ | grep scrum
```

2. **Install Scrum:**
```bash
sdd-skills-ai install-scrum
```

3. **Setup Scrum configs:**
```bash
sdd-skills-ai setup-scrum-configs
```

4. **Check Agents.md content:**
```bash
cat Agents.md | grep -B 2 -A 10 "Scrum Agents"
```

### Phase transitions not working

**Symptoms:**
- Can't move from Phase 1 to Phase 2
- Workflows stop at certain phases
- Validation fails

**Solutions:**

1. **Check phase artifacts:**
```bash
ls -la docs/features/*/01-discovery/
ls -la docs/features/*/02-contract/
```

2. **Verify artifact content:**
```bash
cat docs/features/*/01-discovery/user-story.md
cat docs/features/*/02-contract/spec.md
```

3. **Run validation:**
```bash
@scrum.qa-engineer Validate the current phase artifacts
```

---

## 📁 File System Issues

### Permission denied creating files

**Symptoms:**
```bash
Error: EACCES: permission denied, mkdir '.agent/skills'
```

**Solutions:**

1. **Check directory permissions:**
```bash
ls -la .
```

2. **Change permissions:**
```bash
chmod 755 .
```

3. **Use different directory:**
```bash
cd ~/my-project
sdd-skills-ai wizard
```

### Disk space issues

**Symptoms:**
```bash
Error: ENOSPC: no space left on device
```

**Solutions:**

1. **Check available space:**
```bash
df -h .
```

2. **Clean up:**
```bash
# Remove node_modules if large
rm -rf node_modules

# Clear npm cache
npm cache clean --force
```

3. **Use different drive:**
```bash
cd /external-drive/my-project
sdd-skills-ai wizard
```

---

## 🔍 Debugging

### Enable debug logging

**For all commands:**
```bash
export SDD_SKILLS_AI_DEBUG=1
sdd-skills-ai wizard
```

**For specific command:**
```bash
SDD_SKILLS_AI_DEBUG=1 sdd-skills-ai install-scrum
```

### Check log files

**Log locations:**
- **macOS/Linux**: `~/.sdd-skills-ai/logs/debug.log`
- **Windows**: `%USERPROFILE%\.sdd-skills-ai\logs\debug.log`

**View logs:**
```bash
# macOS/Linux
tail -f ~/.sdd-skills-ai/logs/debug.log

# Windows
type %USERPROFILE%\.sdd-skills-ai\logs\debug.log
```

### Verify installation

**Check all components:**
```bash
# Version
sdd-skills-ai --version

# Help
sdd-skills-ai --help

# Configuration
ls -la ~/.sdd-skills-ai/

# Project structure
ls -la .agent/skills/
ls -la docs/
cat Agents.md
```

---

## 🌐 Network Issues

### npm installation fails

**Symptoms:**
```bash
npm install -g sdd-skills-ai
npm ERR! network timeout
```

**Solutions:**

1. **Check network:**
```bash
ping registry.npmjs.org
```

2. **Use different registry:**
```bash
npm config set registry https://registry.npmjs.org/
npm install -g sdd-skills-ai
```

3. **Use VPN or different network:**
   - Corporate networks may block npm
   - Try from different network

### GitHub repository access fails

**Symptoms:**
```bash
sdd-skills-ai add-skill https://github.com/user/repo
Error: Failed to fetch repository
```

**Solutions:**

1. **Check repository exists:**
```bash
curl -I https://github.com/user/repo
```

2. **Use SSH instead of HTTPS:**
```bash
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

3. **Check GitHub token:**
```bash
# Set GitHub token for private repos
export GITHUB_TOKEN=your_token
```

---

## 🔄 Recovery Procedures

### Reset project configuration

**Warning:** This removes all SDD Skills AI configuration

```bash
# Remove SDD Skills AI files
rm -rf .agent/
rm -rf docs/
rm -f Agents.md Claude.md

# Start fresh
sdd-skills-ai wizard
```

### Reset global configuration

```bash
# Remove global config
rm -rf ~/.sdd-skills-ai/

# Reinstall
npm uninstall -g sdd-skills-ai
npm install -g sdd-skills-ai
```

### Backup and restore

**Backup:**
```bash
# Backup project configuration
tar -czf sdd-skills-ai-backup.tar.gz .agent/ docs/ Agents.md Claude.md

# Backup global config
cp -r ~/.sdd-skills-ai ~/sdd-skills-ai-backup
```

**Restore:**
```bash
# Restore project configuration
tar -xzf sdd-skills-ai-backup.tar.gz

# Restore global config
rm -rf ~/.sdd-skills-ai/
cp -r ~/sdd-skills-ai-backup ~/.sdd-skills-ai/
```

---

## 🆘 Getting Help

### Report bugs

1. **Check existing issues:** https://github.com/eltonjosesouza/sdd-skills-ai/issues
2. **Create new issue** with:
   - Node.js version: `node --version`
   - SDD Skills AI version: `sdd-skills-ai --version`
   - Operating system: `uname -a`
   - Error messages
   - Steps to reproduce
   - Debug logs (if available)

### Community support

- **GitHub Discussions:** https://github.com/eltonjosesouza/sdd-skills-ai/discussions
- **Documentation:** Complete guides in `docs/`
- **FAQ:** Common questions and answers

### Professional support

For enterprise support or custom implementations:
- Create an issue with "enterprise" label
- Contact maintainers directly
- Consider sponsored support options

---

*Still having issues? Check the [FAQ](faq.md) or open an issue on GitHub.*
