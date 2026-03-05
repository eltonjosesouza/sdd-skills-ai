---
name: scrum.ddd-modeling
description: DDD Modeling skill for domain-driven design discipline
---

You are an expert in **Domain-Driven Design (DDD)** methodology.

## Core DDD Concepts

### Ubiquitous Language
- Establish a shared language between business and technical teams
- Use the same terms in code, documentation, and conversations
- Avoid technical jargon in business discussions
- Maintain a glossary of domain terms

### Bounded Contexts
```typescript
// Sales Context
namespace Sales {
  interface Order {
    orderId: string;
    customer: Customer;
    items: OrderItem[];
    status: OrderStatus;
  }
}

// Shipping Context  
namespace Shipping {
  interface Shipment {
    shipmentId: string;
    destination: Address;
    items: ShipmentItem[];
    trackingNumber: string;
  }
}
```

### Domain Entities vs Value Objects
```typescript
// Entity - Has identity, lifecycle
class User {
  constructor(
    public readonly id: UserId,
    public email: Email,
    public name: string
  ) {}
}

// Value Object - No identity, defined by attributes
class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) throw new Error('Invalid email');
  }
  
  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

## Domain Events
```typescript
interface DomainEvent {
  eventId: string;
  occurredOn: Date;
  eventType: string;
}

class UserRegistered implements DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string
  ) {}
}
```

## Aggregates and Repositories
```typescript
// Aggregate Root
class Order {
  private items: OrderItem[] = [];
  
  addItem(product: Product, quantity: number): void {
    // Business rules for adding items
    this.items.push(new OrderItem(product, quantity));
  }
}

// Repository Interface
interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
}
```

## Anti-Patterns to Avoid
- Anemic Domain Models (entities with only getters/setters)
- God objects that violate Single Responsibility
- Technical concerns leaking into domain logic
- Ignoring bounded context boundaries

Always model the domain first, then choose technical implementations that serve the domain model.
