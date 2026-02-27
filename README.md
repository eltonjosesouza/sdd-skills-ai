# sdd-ai

A CLI tool to quickly scaffold a Node.js/TypeScript project organized around **Spec-Driven Development** principles.

## Concept

In Spec-Driven Development, the specification (test) acts as the living documentation and primary driver for the code. This boilerplate emphasizes this by co-locating the `.spec.ts` files exactly alongside their implementations within focused Use Case directories:

```text
src/
  modules/
    users/
      useCases/
        createUser/
          createUser.dto.ts
          createUser.spec.ts  <-- The Spec
          createUser.ts       <-- The Implementation
```

## Usage

You can run it directly using `npx`:

```bash
npx sdd-ai init my-new-project
```

Or omit the project name to enter interactive mode:

```bash
npx sdd-ai init
```

Alternatively, you can install it globally to run it without `npx`:

```bash
npm install -g sdd-ai
sdd-ai init my-new-project
```

### Applying AI Skills

You can also selectively inject AI agent skills to any project folder using:

```bash
sdd-ai apply-skills
```

This will allow you to pick from `antigravity-kit` and `antigravity-awesome-skills`.

## What's Included?

The generated project comes with:

- TypeScript configuration
- Jest configured for Spec tracking (`ts-jest`)
- An example `CreateUser` use case exhibiting the Spec-Driven folder organization
- NPM scripts to immediately start testing (`npm run test`)
- Pre-configured `spec.md` for AI agent context ([OpenSpec](https://openspec.dev/))
- Automatic initialization of [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills)
