---
name: scrum.04-development
description: Phase 4 Development focusing on TDD implementation
---

**Discipline**: TDD | **Sequence**: Fourth

## Goal

Implement the approved Spec using disciplined Test-Driven Development. Every line of code must be written to make a failing test pass, ensuring the implementation exactly matches the contract.

---

## Active Agents

| Agent | Role in this phase |
|---|---|
| Developer | Implements features using TDD |
| Tech Lead | Reviews code and architecture |
| Security Engineer | Performs secure code review |
| Scrum Master | Facilitates daily standups |

---

## Skills Used

- tdd-cycle — Core implementation discipline
- sdd-contract — Reference for requirements
- ddd-modeling — Domain-driven implementation
- telemetry-design — Event implementation

---

## Process

### 1. Task Preparation (Developer)
- Read task description and acceptance criteria
- Review relevant parts of the Spec
- Identify test scenarios (happy path, edge cases, errors)
- Setup test environment and fixtures

### 2. Red Phase - Write Failing Test (Developer)
- Write test that defines the desired behavior
- Ensure test fails with clear error message
- Only write enough test to demonstrate the requirement
- Run test to confirm failure

### 3. Green Phase - Minimal Implementation (Developer)
- Write the minimal code needed to make the test pass
- No extra functionality beyond what the test requires
- Focus on making the test pass as quickly as possible
- Run all tests to confirm they pass

### 4. Refactor Phase - Improve Code (Developer)
- Improve code quality without changing behavior
- Remove duplication, improve naming, add clarity
- Ensure all tests still pass after refactoring
- Repeat until code is clean and maintainable

### 5. Code Review (Tech Lead + Security Engineer)
- Review implementation against Spec requirements
- Check for security vulnerabilities
- Validate architectural consistency
- Ensure test coverage and quality

### 6. Integration & Testing (Developer)
- Run full test suite including integration tests
- Verify implementation works in staging environment
- Check performance against requirements
- Update documentation

---

## TDD Cycle Examples

### Unit Test Example
```typescript
// 1. RED - Write failing test
describe('User Service', () => {
  it('should create user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'ValidPass123!'
    };
    
    const user = await UserService.create(userData);
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.password).not.toBe(userData.password); // Should be hashed
  });
});

// 2. GREEN - Minimal implementation
export class UserService {
  async create(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = generateId();
    user.email = userData.email;
    user.name = userData.name;
    user.password = await hash(userData.password);
    return user;
  }
}

// 3. REFACTOR - Improve code
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}
  
  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }
}
```

### Integration Test Example
```typescript
describe('User API', () => {
  it('should create user via HTTP endpoint', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'ValidPass123!'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email: 'test@example.com',
      name: 'Test User'
    });
    expect(response.body.id).toBeDefined();
    expect(response.body.password).toBeUndefined();
  });
});
```

---

## Deliverables

### Implementation Code
```typescript
// Domain Entity
export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public password: string,
    public status: UserStatus = UserStatus.PENDING,
    public createdAt: Date = new Date()
  ) {}
  
  verifyEmail(): void {
    this.status = UserStatus.ACTIVE;
  }
}

// Application Service
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly eventBus: EventBus
  ) {}
  
  async execute(userData: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(userData.email);
    }
    
    // Create user
    const user = new User(
      generateId(),
      userData.email,
      userData.name,
      await hash(userData.password)
    );
    
    // Save user
    await this.userRepository.save(user);
    
    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, user.id);
    
    // Publish event
    await this.eventBus.publish(new UserCreatedEvent(user.id, user.email));
    
    return user;
  }
}
```

### Test Coverage Report
```markdown
---
feature: {feature-name}
phase: 04-development
artifact: test-coverage
author: developer
created: {timestamp}
version: 1.0.0
status: approved
---

## Test Coverage Summary
- **Lines**: 87.3% (245/281)
- **Functions**: 92.1% (47/51)
- **Branches**: 78.4% (89/113)
- **Statements**: 87.3% (245/281)

## Coverage by Module
- User Domain: 95.2% (excellent)
- User Service: 89.1% (good)
- User Controller: 82.3% (good)
- User Repository: 76.8% (needs improvement)

## Uncovered Code
- Error handling for database connection failures
- Edge case in password validation
- Timeout handling for email service

## Action Items
- Add tests for database error scenarios
- Cover password validation edge cases
- Test email service timeout behavior
```

---

## Exit Criteria

Phase 4 is complete when:
- [ ] All tasks are implemented following TDD discipline
- [ ] Unit test coverage ≥ 80% for all domain/service layers
- [ ] All integration tests pass
- [ ] Code review approved by Tech Lead
- [ ] Security review passed
- [ ] Implementation matches Spec exactly
- [ ] Documentation is updated

---

## Common Pitfalls

1. **Skipping Red phase** - Always write failing test first
2. **Writing too much code** - Implement only what test requires
3. **Forgetting refactoring** - Clean code is essential
4. **Ignoring integration** - Test components together
5. **Missing edge cases** - Consider all failure scenarios

---

## Next Phase

With complete implementation, the team moves to Phase 5 (Validation) where QA, UX, and Data teams will validate that the implementation meets all requirements.
