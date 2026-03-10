# Architecture Reorganization Plan

## 🚨 Current Problems Identified

### 1. **Single Responsibility Principle Violations**
- `src/actions/index.ts` (439 lines) contains multiple unrelated actions:
  - `applySkillsAction` - Skills injection logic
  - `agentInitAction` - AGENTS.md creation  
  - `specSkillsAddAction` - Spec skills configuration
  - `setupScrumAgentConfigsAction` - Scrum configuration
  - Helper functions mixed with business logic

### 2. **Poor Separation of Concerns**
- Commands contain business logic instead of just orchestration
- Actions directly manipulate files without abstraction layer
- Configuration management mixed with execution logic
- UI prompts scattered throughout different layers

### 3. **Insufficient Command Structure**
- Only 2 command files for 8 CLI commands
- Missing dedicated command classes for:
  - `agent-init` command
  - `apply-skills` command  
  - `install-scrum` command
  - `setup-scrum-configs` command
  - `spec-skills-add` command

### 4. **Clean Architecture Violations**
- No clear domain layer separation
- Infrastructure concerns mixed with application logic
- External dependencies (fs, execSync) used directly in business logic
- No dependency injection pattern

---

## 🎯 Proposed New Architecture

### **Directory Structure**
```
src/
├── application/           # Application Layer (Use Cases)
│   ├── services/         # Application services
│   └── use-cases/        # Specific use case implementations
├── domain/               # Domain Layer (Business Logic)
│   ├── entities/         # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── services/         # Domain services
├── infrastructure/       # Infrastructure Layer
│   ├── filesystem/      # File system operations
│   ├── process/         # Process execution
│   └── ui/              # CLI interactions
├── presentation/         # Presentation Layer (CLI)
│   ├── commands/        # CLI command handlers
│   └── prompts/         # UI prompt definitions
└── shared/              # Shared utilities
    ├── types/           # Common types
    └── utils/           # Utility functions
```

### **Command Structure**
```
src/presentation/commands/
├── init.command.ts           # ✅ Existing
├── wizard.command.ts         # ✅ Existing  
├── agent-init.command.ts     # 🆕 New
├── apply-skills.command.ts  # 🆕 New
├── install-scrum.command.ts # 🆕 New
├── setup-scrum-configs.command.ts # 🆕 New
└── spec-skills-add.command.ts # 🆕 New
```

---

## 📋 Migration Strategy

### **Phase 1: Extract Infrastructure Services**
1. Create `src/infrastructure/filesystem/` with:
   - `FileService.ts` - File operations
   - `DirectoryService.ts` - Directory operations
2. Create `src/infrastructure/process/` with:
   - `ProcessService.ts` - Command execution
3. Create `src/infrastructure/ui/` with:
   - `PromptService.ts` - CLI prompts

### **Phase 2: Extract Domain Logic**
1. Create `src/domain/entities/` with:
   - `Agent.ts` - Agent configuration entity
   - `Skill.ts` - Skill entity
   - `Project.ts` - Project configuration
2. Create `src/domain/repositories/` with:
   - `IProjectRepository.ts` - Project operations interface
   - `IAgentRepository.ts` - Agent operations interface

### **Phase 3: Create Application Services**
1. Create `src/application/services/` with:
   - `AgentService.ts` - Agent management
   - `SkillService.ts` - Skill management
   - `ScrumService.ts` - Scrum operations
2. Create `src/application/use-cases/` with:
   - `InitializeAgentUseCase.ts`
   - `ApplySkillsUseCase.ts`
   - `InstallScrumUseCase.ts`

### **Phase 4: Refactor Commands**
1. Create dedicated command classes
2. Commands should only orchestrate use cases
3. Remove business logic from command layer

---

## 🎯 Benefits of New Architecture

### **SOLID Compliance**
- **S**: Each class has single responsibility
- **O**: Open for extension, closed for modification
- **L**: Subtypes can replace base types
- **I**: Interfaces focused on specific needs
- **D**: Depend on abstractions, not concretions

### **Clean Architecture**
- Clear layer separation
- Dependency inversion
- Testable components
- Business logic isolated from external concerns

### **Maintainability**
- Easier to locate and modify specific functionality
- Better test coverage
- Clear separation of concerns
- Reduced coupling

---

## 🚀 Implementation Priority

### **High Priority (Phase 1)**
1. Extract infrastructure services
2. Create base command structure
3. Implement dependency injection container

### **Medium Priority (Phase 2)**
1. Extract domain entities
2. Create repository interfaces
3. Implement application services

### **Low Priority (Phase 3)**
1. Add comprehensive unit tests
2. Implement error handling middleware
3. Add logging infrastructure

---

## 📊 Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking changes | High | Incremental migration with backward compatibility |
| Development time | Medium | Start with most critical areas first |
| Testing gaps | Medium | Add tests as we migrate each component |

---

## ✅ Success Criteria

1. [ ] Each command has its dedicated file
2. [ ] Business logic separated from infrastructure
3. [ ] All components follow SOLID principles
4. [ ] Clear dependency injection pattern
5. [ ] Comprehensive test coverage
6. [ ] No breaking changes to CLI interface
