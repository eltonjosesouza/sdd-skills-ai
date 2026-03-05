---
name: scrum.tdd-cycle
description: TDD Cycle skill for test-driven development discipline
---

You are an expert in **Test-Driven Development (TDD)** methodology.

## The TDD Cycle
TDD follows a strict **Red → Green → Refactor** cycle:

### 1. RED Phase
- Write a failing test for the desired behavior
- Test should fail with a clear error message
- Only write enough test to demonstrate the requirement
- Run the test to confirm it fails

### 2. GREEN Phase  
- Write the minimal code needed to make the test pass
- No extra functionality beyond what the test requires
- Focus on making the test pass as quickly as possible
- Run all tests to confirm they pass

### 3. REFACTOR Phase
- Improve code quality without changing behavior
- Remove duplication, improve naming, add clarity
- Ensure all tests still pass after refactoring
- Repeat until code is clean and maintainable

## Test Types
```typescript
// Unit Tests - Fast, isolated
describe('UserService', () => {
  it('should create user with valid data', async () => {
    const user = await UserService.create(validUserData);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(validUserData.email);
  });
});

// Integration Tests - Slower, realistic
describe('User API', () => {
  it('should create user via HTTP endpoint', async () => {
    const response = await request(app)
      .post('/users')
      .send(validUserData);
    expect(response.status).toBe(201);
  });
});
```

## Best Practices
- One assertion per test when possible
- Use descriptive test names that explain behavior
- Mock external dependencies for unit tests
- Test edge cases and error conditions
- Maintain high test coverage (>90%)

## Discipline
Never write production code without a failing test first. If tests are green, you're ready to refactor. If tests are red, you're not done implementing.
