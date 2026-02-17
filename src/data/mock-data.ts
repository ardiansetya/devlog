import articleCover1 from "@/assets/article-cover-1.jpg";
import articleCover2 from "@/assets/article-cover-2.jpg";
import articleCover3 from "@/assets/article-cover-3.jpg";

export interface Article {
	slug: string;
	title: string;
	subtitle: string;
	excerpt: string;
	tag: string;
	author: {
		name: string;
		avatar: string;
	};
	date: string;
	readingTime: string;
	coverImage: string;
	content: string;
}

export const articles: Article[] = [
	{
		slug: "building-scalable-apis-with-edge-functions",
		title: "Building Scalable APIs with Edge Functions",
		subtitle:
			"How serverless edge computing is changing the way we build backends",
		excerpt:
			"Explore the architecture patterns behind modern edge-first API design and learn how to deploy globally distributed endpoints.",
		tag: "System Design",
		author: { name: "Alex Chen", avatar: "" },
		date: "Feb 5, 2026",
		readingTime: "8 min read",
		coverImage: articleCover1,
		content: `
## The Rise of Edge Computing

The traditional model of centralized servers is giving way to a distributed approach. Edge functions execute code closer to your users, reducing latency and improving the overall experience.

Modern platforms now allow developers to deploy functions that run in data centers worldwide, automatically routing requests to the nearest location.

## Why Edge Functions Matter

When building APIs, latency is often the bottleneck. A user in Tokyo shouldn't have to wait for a round trip to a server in Virginia. Edge functions solve this by bringing computation to the edge of the network.

> "The best architecture is one where the code runs where the users are." — Werner Vogels

### Key Benefits

- **Reduced latency**: Sub-50ms response times globally
- **Automatic scaling**: No capacity planning required
- **Cost efficiency**: Pay only for actual execution time
- **Simplified deployment**: Push code, it's live everywhere

## Architecture Patterns

Here's a common pattern for edge API design:

\`\`\`typescript
export default async function handler(request: Request) {
  const { pathname } = new URL(request.url);
  
  switch (pathname) {
    case '/api/users':
      return handleUsers(request);
    case '/api/posts':
      return handlePosts(request);
    default:
      return new Response('Not Found', { status: 404 });
  }
}
\`\`\`

## Data Considerations

One challenge with edge computing is data locality. Your code runs everywhere, but your database might not. Solutions include:

- **Read replicas**: Distribute read-only copies of your data
- **Edge caching**: Cache frequently accessed data at the edge
- **Global databases**: Use databases designed for multi-region deployment

## Getting Started

Start by identifying which of your API endpoints would benefit most from edge deployment. High-traffic, read-heavy endpoints are ideal candidates.

The key is to think about your data access patterns and choose the right combination of edge computing and traditional architecture.
    `,
	},
	{
		slug: "typescript-patterns-you-should-know",
		title: "TypeScript Patterns You Should Know in 2026",
		subtitle: "Advanced type-level programming for real-world applications",
		excerpt:
			"Deep dive into discriminated unions, branded types, and template literal types that will level up your TypeScript code.",
		tag: "TypeScript",
		author: { name: "Sarah Kim", avatar: "" },
		date: "Jan 28, 2026",
		readingTime: "12 min read",
		coverImage: articleCover2,
		content: `
## Beyond Basic Types

TypeScript has evolved far beyond simple type annotations. Modern TypeScript allows you to encode complex business rules directly in your type system, catching errors at compile time rather than runtime.

## Discriminated Unions

One of the most powerful patterns in TypeScript is the discriminated union. It lets you model states that are mutually exclusive:

\`\`\`typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
\`\`\`

This pattern ensures you can only access \`data\` when the status is \`success\`, and \`error\` when the status is \`error\`.

## Branded Types

Sometimes you need types that are structurally identical but semantically different:

\`\`\`typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function getUser(id: UserId): User { /* ... */ }
function getPost(id: PostId): Post { /* ... */ }
\`\`\`

> "Make impossible states impossible." — Richard Feldman

## Template Literal Types

Template literal types enable string manipulation at the type level:

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize<EventName>}\`;
// Result: 'onClick' | 'onFocus' | 'onBlur'
\`\`\`

### Practical Applications

- **API route typing**: Ensure route parameters match expected patterns
- **CSS-in-JS**: Type-safe style properties
- **Configuration**: Validate config keys at compile time

## The satisfies Operator

The \`satisfies\` operator lets you validate that an expression matches a type without widening it:

\`\`\`typescript
const config = {
  port: 3000,
  host: 'localhost',
  debug: true,
} satisfies Record<string, string | number | boolean>;
\`\`\`

## Conclusion

These patterns aren't just academic exercises. They represent real tools for building more reliable software. Start incorporating them gradually, and you'll find that your code becomes more self-documenting and resistant to bugs.
    `,
	},
	{
		slug: "designing-resilient-distributed-systems",
		title: "Designing Resilient Distributed Systems",
		subtitle: "Lessons from building systems that handle millions of requests",
		excerpt:
			"Learn the fundamental patterns for building fault-tolerant distributed systems that gracefully handle failure.",
		tag: "Architecture",
		author: { name: "Marcus Rivera", avatar: "" },
		date: "Jan 15, 2026",
		readingTime: "10 min read",
		coverImage: articleCover3,
		content: `
## Embracing Failure

In distributed systems, failure isn't an edge case — it's the norm. Networks partition, services crash, and disks fail. The question isn't whether failure will happen, but how your system responds when it does.

## Circuit Breaker Pattern

The circuit breaker pattern prevents cascading failures by stopping requests to a failing service:

\`\`\`typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > 30000) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit is open');
      }
    }
    // ... implementation
  }
}
\`\`\`

## Retry with Exponential Backoff

When a request fails, retrying immediately often makes things worse. Instead, use exponential backoff:

> "The best way to handle a thundering herd is to not create one in the first place."

### Implementation Guidelines

- Start with a small delay (100ms)
- Double the delay with each retry
- Add random jitter to prevent synchronized retries
- Set a maximum number of retries

## Bulkhead Pattern

Isolate different parts of your system so that a failure in one area doesn't bring down everything:

- **Thread pool isolation**: Separate thread pools for different services
- **Connection pool isolation**: Dedicated database connections per feature
- **Process isolation**: Run critical paths in separate processes

## Observability

You can't fix what you can't see. Invest in:

- **Structured logging**: JSON logs with correlation IDs
- **Distributed tracing**: Follow requests across service boundaries
- **Metrics**: Track latency percentiles, error rates, and throughput
- **Alerting**: Set thresholds that catch problems before users do

## Conclusion

Building resilient distributed systems is about accepting that failure is inevitable and designing for it. Start with the circuit breaker pattern, add proper retry logic, and invest heavily in observability.
    `,
	},
];
