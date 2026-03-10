# Architecture Overview

## Clean Architecture Implementation

SDD Skills AI v2.0 implements Clean Architecture principles with SOLID design patterns to ensure maintainability, testability, and scalability.

## 🏗️ Directory Structure

```
src/
├── application/           # Application Layer (Use Cases)
│   ├── services/         # Application services
│   │   └── AgentService.ts
│   └── use-cases/        # Specific use case implementations
├── domain/               # Domain Layer (Business Logic)
│   ├── entities/         # Domain entities
│   │   └── index.ts
│   ├── repositories/    # Repository interfaces
│   │   └── AgentRepository.ts
│   └── services/         # Domain services
├── infrastructure/       # Infrastructure Layer
│   ├── filesystem/      # File system operations
│   │   └── FileService.ts
│   ├── process/         # Process execution
│   │   └── ProcessService.ts
│   └── ui/              # CLI interactions
│       └── PromptService.ts
├── presentation/         # Presentation Layer (CLI)
│   └── commands/        # CLI command handlers
│       ├── agent-init.command.ts
│       ├── init.command.ts
│       └── wizard.command.ts
└── shared/              # Shared utilities
    ├── types/           # Common types
    └── utils/           # Utility functions
```

## 🎯 SOLID Principles Implementation

### Single Responsibility Principle (SRP)
- **FileService**: Handles only file operations
- **ProcessService**: Handles only process execution
- **PromptService**: Handles only CLI interactions
- **AgentService**: Handles only agent-related business logic

### Open/Closed Principle (OCP)
- Services are open for extension through interfaces
- New commands can be added without modifying existing ones
- Skills can be added without changing core logic

### Liskov Substitution Principle (LSP)
- All repository implementations can be substituted with their interfaces
- Command classes follow the same contract

### Interface Segregation Principle (ISP)
- Separate interfaces for different concerns (FileService, ProcessService, etc.)
- Clients depend only on interfaces they use

### Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions (interfaces)
- Infrastructure implements domain interfaces
- Dependency injection in command classes

## 🔄 Data Flow

```
CLI Command → Application Service → Domain Logic → Infrastructure
     ↓                ↓                   ↓              ↓
WizardCommand → AgentService → AgentRepository → FileService
```

## 🧪 Testability

The architecture enables comprehensive testing:

- **Unit Tests**: Test individual services in isolation
- **Integration Tests**: Test service interactions
- **E2E Tests**: Test complete CLI workflows

### Mock Strategy
```typescript
// Example: Testing AgentService
const mockFileService: FileService = {
  writeFile: jest.fn(),
  readFile: jest.fn(),
  exists: jest.fn(),
  ensureDir: jest.fn(),
  copy: jest.fn(),
};

const agentService = new AgentServiceImpl(mockAgentRepository, mockFileService);
```

## 📦 Dependency Injection

Commands create their dependencies through factory methods:

```typescript
private static createDependencies() {
  const agentRepository = new AgentRepositoryImpl();
  const fileService = new FileSystemFileService();
  const agentService = new AgentServiceImpl(agentRepository, fileService);
  
  return { agentService };
}
```

## 🚀 Extensibility

### Adding New Commands
1. Create command class in `presentation/commands/`
2. Implement the command interface
3. Register in `src/index.ts`

### Adding New Services
1. Define interface in `domain/repositories/`
2. Implement in `infrastructure/`
3. Create application service in `application/services/`

### Adding New Skills
1. Skill follows the established pattern
2. Registers with the configuration system
3. Available through the skill injection system

## 🔒 Security Considerations

- Input validation at service boundaries
- File operations restricted to project directories
- Process execution in temporary directories
- No direct system calls from business logic

## 📊 Performance

- Lazy loading of services
- Minimal dependencies in core logic
- Efficient file operations through dedicated service
- Parallel execution where appropriate

## 🛠️ Migration Strategy

The architecture was migrated from a monolithic structure:

### Before (v1.x)
```
src/
├── actions/index.ts (439 lines, mixed responsibilities)
├── commands/ (2 files for 8 commands)
└── services/ (mixed concerns)
```

### After (v2.0)
```
src/
├── application/ (clean business logic)
├── domain/ (pure domain models)
├── infrastructure/ (external concerns)
├── presentation/ (CLI interface)
└── shared/ (utilities)
```

## 🎯 Benefits Achieved

1. **Maintainability**: Clear separation makes code easier to understand and modify
2. **Testability**: Each component can be tested in isolation
3. **Flexibility**: New features can be added without breaking existing code
4. **Scalability**: Architecture supports growth from small to large projects
5. **Quality**: SOLID principles ensure robust, reliable code

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)

---

This architecture ensures that SDD Skills AI remains maintainable, testable, and extensible as it grows and evolves.
