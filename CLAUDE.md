# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

All instructions in this document are mandatory unless explicitly overridden by the user.

---

# 1. Project Overview

## Project Information

- **Project Name:** Kedaimart
- **Framework:** Next.js 16
- **Architecture:** App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Validation:** Zod
- **Form Management:** React Hook Form
- **Database ORM:** Drizzle ORM
- **Database Toolkit:** Drizzle Kit
- **Icons:** Lucide React
- **Package Manager:** npm

## Main Objective

Build a modern, scalable, secure, maintainable, and production-ready application.

All implementations must prioritize:

1. Type safety.
2. Security.
3. Maintainability.
4. Reusability.
5. Performance.
6. Accessibility.
7. Excellent UI/UX.
8. Consistent architecture.
9. Database integrity.
10. Developer experience.

Never sacrifice code quality or security for implementation speed.

---

# 2. Project Commands

Run all commands from the repository root.

## Application Commands

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server using Turbopack |
| `npm run build`    | Build production application             |
| `npm run start`    | Start production server                  |
| `npm run lint`     | Run ESLint                               |
| `npx tsc --noEmit` | Run TypeScript type checking             |

Development URL:

`http://localhost:3000`

## Database Commands

The project uses Drizzle Kit.

The following scripts must be available in `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:pull": "drizzle-kit pull"
  }
}
```

### Database Command Reference

| Command               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `npm run db:generate` | Generate SQL migration files from schema changes                |
| `npm run db:migrate`  | Apply generated migrations                                      |
| `npm run db:push`     | Synchronize schema directly with database                       |
| `npm run db:pull`     | Introspect an existing database and generate schema definitions |

### Database Command Rules

- Use `db:generate` and `db:migrate` for the normal migration workflow.
- Use `db:push` only when direct schema synchronization is appropriate.
- Use `db:pull` when an existing database is the source of truth.
- Review generated SQL before applying migrations.
- Never assume the database environment.
- Never run destructive database operations without explicit authorization.
- Never automatically run database commands against production.
- Never overwrite existing schema or migrations without reviewing the impact.

---

# 3. Existing Project Architecture

## Next.js App Router

- Application routes are located in `app/`.
- `app/layout.tsx` is the root layout.
- Prefer Server Components by default.
- Use Client Components only when client-side interactivity is required.
- Use Server Actions for appropriate server-side mutations.
- Use Route Handlers for HTTP APIs and integrations.
- Separate business logic from UI components.
- Follow Next.js 16 conventions.

## Styling

- Tailwind CSS 4.
- shadcn/ui.
- CSS variables and design tokens.
- Dark mode through `.dark` class on `<html>`.
- Font variables:
  - `--font-sans`
  - `--font-mono`
  - `--font-heading`

Main stylesheet:

`app/globals.css`

Rules:

- Follow existing theme configuration.
- Do not unnecessarily modify generated shadcn tokens.
- Use Tailwind CSS 4 syntax.
- Avoid introducing another CSS framework.
- Keep styles reusable and consistent.

## Project Aliases

| Alias          | Directory        |
| -------------- | ---------------- |
| `@/components` | `components/`    |
| `@/lib`        | `lib/`           |
| `@/ui`         | `components/ui/` |
| `@/hooks`      | `hooks/`         |
| `@/*`          | Project root     |

Prefer aliases over unnecessarily long relative imports.

## Utility Functions

`lib/utils.ts`

Use the existing `cn()` utility for conditional Tailwind classes.

```ts
import { cn } from "@/lib/utils";
```

Never duplicate class-merging utilities.

---

# 4. TypeScript Standards (MANDATORY)

TypeScript strict mode is mandatory.

## ZERO ANY POLICY

Using `any` is strictly prohibited.

The following are forbidden:

- `any`
- `as any`
- Implicit any.
- `@ts-ignore`
- `@ts-nocheck`
- Unsafe type assertions used to bypass compiler errors.

Never use unsafe types just to make code compile.

## Safe Type Handling

When the type is unknown:

- Use `unknown`.
- Apply type narrowing.
- Use type guards.
- Validate external data using Zod.
- Define explicit interfaces and types when appropriate.

Example:

```ts
function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }

  return "Invalid data";
}
```

## Type Inference

Prefer inferred types when possible.

Use:

- `z.infer<typeof schema>`
- `z.input<typeof schema>`
- `z.output<typeof schema>`

Avoid unnecessary duplicated type declarations.

## Type Safety Requirements

- Explicit function parameter types when inference is insufficient.
- Explicit return types for important business logic.
- Typed component props.
- Typed API responses.
- Typed database queries.
- Typed event handlers.
- Safe error handling.
- Strict null checking.

Keep `strict: true` enabled in `tsconfig.json`.

Never disable type checking to bypass errors.

---

# 5. Zod Validation (MANDATORY)

Zod is the standard runtime validation library.

All external and untrusted inputs must be validated.

## Mandatory Validation Areas

Use Zod for:

- API request bodies.
- Query parameters.
- Route parameters.
- Server Actions.
- Form submissions.
- Environment variables.
- External API responses.
- Database write inputs.
- User-generated content.
- Application configuration.

Never trust client-side validation alone.

Always validate sensitive operations on the server.

## Schema Organization

Store reusable validation schemas inside:

`lib/validations/`

Recommended structure:

```text
lib/
  validations/
    auth.schema.ts
    user.schema.ts
    product.schema.ts
    category.schema.ts
    transaction.schema.ts
    customer.schema.ts
    common.schema.ts
    env.schema.ts
```

Adapt the structure to actual project features.

## Schema Best Practices

- Use reusable schemas.
- Use `z.infer` for output types.
- Use `z.input` when input and output differ.
- Use `safeParse()` for controlled validation errors.
- Use `parse()` when invalid input should throw.
- Use `.refine()` for custom validation.
- Use `.superRefine()` for complex validation.
- Use `.transform()` for controlled transformations.
- Avoid duplicated validation rules.
- Return structured validation errors.

Example:

```ts
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
  stock: z.number().int().min(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
```

## Important Rules

- Do not duplicate schema definitions unnecessarily.
- Reuse schemas between forms and server validation.
- Do not expose internal validation details unnecessarily.
- Validate data before performing database operations.

---

# 6. shadcn/ui (MANDATORY)

shadcn/ui is the primary UI component library.

## Rules

- Always check existing shadcn components first.
- Reuse existing components whenever possible.
- Install missing components using `npx shadcn add`.
- Store components inside `components/ui/`.
- Use `cn()` for conditional styling.
- Use Lucide React for icons.
- Maintain consistent design tokens.
- Follow `components.json`.
- Do not introduce another UI library without explicit approval.

## Preferred Components

### Layout

- Card
- Separator
- ScrollArea
- Resizable
- Sidebar

### Forms

- Input
- Textarea
- Select
- Checkbox
- RadioGroup
- Switch
- Label
- Form

### Feedback

- Alert
- Sonner
- Toast
- Skeleton
- Progress

### Navigation

- Tabs
- Breadcrumb
- NavigationMenu
- Sidebar

### Overlays

- Dialog
- Sheet
- Drawer
- Popover
- Tooltip
- DropdownMenu
- AlertDialog

### Data Display

- Table
- Badge
- Avatar
- Calendar

### Actions

- Button
- Toggle
- ToggleGroup

Install components:

```bash
npx shadcn add <component>
```

Use the component names and installation syntax supported by the installed shadcn CLI.

Do not reinstall components that already exist.

---

# 7. Form Handling

Use React Hook Form with Zod for complex forms.

Required dependencies:

- `react-hook-form`
- `@hookform/resolvers`
- `zod`

## Rules

- Use Zod as the single source of truth for validation.
- Integrate Zod using `zodResolver`.
- Use shadcn Form components.
- Display field-level validation messages.
- Provide meaningful error messages.
- Disable submit buttons while submitting.
- Prevent duplicate submissions.
- Handle loading, success, and error states.
- Validate data again on the server.
- Never rely exclusively on HTML validation.

Example:

```tsx
const form = useForm<CreateProductInput>({
  resolver: zodResolver(createProductSchema),
  defaultValues: {
    name: "",
    price: 0,
    stock: 0,
  },
});
```

Use the appropriate resolver input/output generics when schemas transform their input.

---

# 8. Drizzle ORM (MANDATORY)

Drizzle ORM is the database ORM for Kedaimart.

## Installed Versions

- `drizzle-orm@1.0.0-rc.5`
- `drizzle-kit@1.0.0-rc.5`

Always verify compatibility with the installed versions.

Do not blindly follow examples from older Drizzle releases.

## Mandatory Drizzle Skill

Before touching any Drizzle-related code:

1. Read `.agents/skills/drizzle/`.
2. Read the skill's `SKILL.md`.
3. Read relevant supporting documentation.
4. Verify APIs against the installed version.
5. Follow the skill's instructions.

Never implement Drizzle functionality without consulting the installed skill.

## Database Architecture

- Use type-safe Drizzle queries.
- Define reusable schemas.
- Use appropriate primary keys.
- Define foreign keys.
- Add indexes where beneficial.
- Define relations when needed.
- Use transactions for atomic operations.
- Handle database errors explicitly.
- Avoid duplicated query logic.
- Keep schema and migrations synchronized.
- Use parameterized queries.
- Avoid raw SQL unless necessary.

## Current Database Status

At the time this document was created:

- `drizzle.config.ts` has not been configured.
- No database schema has been created.
- No migrations exist.
- No database connection has been configured.

When a database provider is selected:

1. Read the Drizzle skill.
2. Confirm the database provider.
3. Configure the database connection.
4. Create `drizzle.config.ts`.
5. Create schema files.
6. Configure migrations.
7. Verify connectivity.
8. Test queries and relations.

Do not assume a database provider before it is selected.

## Recommended Database Structure

```text
lib/
  db/
    index.ts
    schema/
      index.ts
      users.ts
      products.ts
      categories.ts
      transactions.ts
      customers.ts
```

This is a recommendation. Follow the actual Drizzle skill conventions if they differ.

## Database Command Workflow

### Generate Migration

```bash
npm run db:generate
```

Use when schema changes need migration files.

Rules:

- Review generated SQL.
- Check destructive changes.
- Keep migration files in version control.
- Never silently rewrite applied migrations.

### Apply Migration

```bash
npm run db:migrate
```

Use to apply generated migrations.

Rules:

- Confirm the database target.
- Review pending migrations.
- Never run against production without explicit authorization.
- Handle failures safely.

### Push Schema

```bash
npm run db:push
```

Use for direct schema synchronization.

Rules:

- Prefer migrations for normal development and production.
- Review destructive changes.
- Do not use against production without explicit authorization.
- Do not replace migration history with direct pushes.

### Pull Schema

```bash
npm run db:pull
```

Use to introspect an existing database.

Rules:

- Use when the database is the source of truth.
- Review generated schema files.
- Preserve existing database structures.
- Do not overwrite application changes without review.

## Recommended Migration Workflow

For normal development:

```bash
npm run db:generate
npm run db:migrate
```

Before applying:

1. Review generated migration files.
2. Confirm the database environment.
3. Check for data loss risks.
4. Obtain approval for destructive changes.
5. Apply migrations.
6. Verify database changes.
7. Test affected application functionality.

## Database Safety

- Never expose credentials.
- Never run destructive operations without approval.
- Never reset production data without explicit approval.
- Never assume the target database.
- Validate inputs using Zod before database writes.
- Never use `any` for database types.
- Protect database operations with authorization checks.
- Use server-only database modules.
- Handle transactions correctly.

---

# 9. UI/UX Pro Skill (MANDATORY)

UI/UX Pro is mandatory for interface-related development.

## Skill Discovery

Before creating or modifying interfaces:

1. Inspect available skills in `.agents/skills/`.
2. Locate the actual UI/UX Pro skill.
3. Read its `SKILL.md`.
4. Read relevant supporting references.
5. Follow its workflow and recommendations.

If the skill is unavailable:

- Report that it is unavailable.
- Do not pretend to have used it.
- Continue using the documented project UI/UX standards unless the user requires otherwise.

## Design Principles

All interfaces must prioritize:

- Professional appearance.
- Modern design.
- Excellent usability.
- Clear visual hierarchy.
- Consistency.
- Responsive layouts.
- Accessibility.
- Maintainability.

Avoid generic, outdated, or unnecessarily complicated interfaces.

## Visual Design

Pay attention to:

- Typography hierarchy.
- Font sizes and weights.
- Spacing consistency.
- Alignment.
- Contrast.
- Color systems.
- Border radius.
- Shadows.
- Icon consistency.
- Component proportions.
- Visual balance.

Avoid:

- Excessive gradients.
- Excessive animations.
- Unnecessary decorations.
- Inconsistent spacing.
- Too many colors.
- Overcrowded layouts.

## Responsive Design

Every page must work properly on:

- Mobile.
- Tablet.
- Desktop.
- Large desktop screens.

Use responsive Tailwind utilities.

Test:

- Navigation.
- Forms.
- Tables.
- Dialogs.
- Drawers.
- Interactive components.

## Accessibility

Follow WCAG accessibility principles.

- Use semantic HTML.
- Provide accessible labels.
- Support keyboard navigation.
- Maintain sufficient color contrast.
- Provide visible focus indicators.
- Use appropriate ARIA attributes.
- Do not rely only on color.
- Ensure interactive elements are accessible.

## UI States

Every interactive feature must handle:

- Loading state.
- Empty state.
- Error state.
- Success state.
- Disabled state.
- Validation state.

Never leave users without feedback after an interaction.

## Design Consistency

- Reuse components.
- Use shadcn/ui as the foundation.
- Follow the existing theme.
- Maintain consistent spacing.
- Use Lucide React icons.
- Avoid duplicate patterns.
- Keep design tokens centralized.

---

# 10. Next.js 16 Best Practices

## Server and Client Components

- Prefer Server Components.
- Use `"use client"` only when required.
- Avoid converting entire pages into Client Components unnecessarily.
- Keep client-side state localized.
- Avoid unnecessary hydration.

## Server Actions

- Validate inputs using Zod.
- Verify authentication.
- Verify authorization.
- Handle errors safely.
- Return structured results.
- Never expose internal server errors.

Remember that Server Actions are externally invocable entry points and must be secured independently.

## Route Handlers

- Validate request parameters.
- Validate request bodies.
- Use appropriate HTTP status codes.
- Return consistent response structures.
- Handle errors explicitly.
- Protect sensitive endpoints.

## Security

- Use `server-only` for server-only modules.
- Never expose private environment variables.
- Never trust client-provided authorization data.
- Verify permissions on the server.
- Avoid exposing internal stack traces.
- Protect sensitive mutations.

## Performance

- Use `next/image` for optimized images.
- Apply appropriate caching strategies.
- Avoid unnecessary client-side fetching.
- Minimize JavaScript sent to browsers.
- Use dynamic imports when appropriate.
- Avoid unnecessary re-renders.
- Use pagination for large datasets.
- Optimize database queries.

Always follow Next.js 16 documentation and installed version conventions.

---

# 11. Recommended Project Structure

Use this structure as a guideline:

```text
kedaimart/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── shared/
│   └── features/
│       ├── products/
│       ├── categories/
│       ├── transactions/
│       └── users/
│
├── hooks/
│
├── lib/
│   ├── db/
│   │   ├── index.ts
│   │   └── schema/
│   ├── validations/
│   ├── utils.ts
│   └── constants.ts
│
├── drizzle/
│   └── migrations/
│
├── types/
│
├── .agents/
│   └── skills/
│       └── drizzle/
│
├── components.json
├── drizzle.config.ts
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

Do not restructure existing files unnecessarily.

Use feature-based organization when it improves maintainability.

---

# 12. Code Quality Standards

## Clean Code

Follow:

- Single Responsibility Principle.
- DRY (Don't Repeat Yourself).
- KISS (Keep It Simple).
- Separation of Concerns.
- Reusable components.
- Explicit error handling.
- Meaningful naming.
- Small and maintainable functions.

## Component Design

- Keep components focused.
- Separate business logic from presentation.
- Reuse shared components.
- Avoid unnecessarily large components.
- Use explicit props types.
- Avoid unnecessary state.
- Avoid excessive `useEffect`.

## Error Handling

- Never silently swallow errors.
- Avoid empty catch blocks.
- Use appropriate error types.
- Provide meaningful user-facing messages.
- Log useful debugging information without exposing secrets.

## Dependencies

- Avoid unnecessary packages.
- Reuse installed dependencies.
- Check compatibility before installation.
- Do not introduce another UI library without approval.

---

# 13. Security Standards

Security must be considered in every feature.

Mandatory practices:

- Validate all external inputs.
- Verify authentication.
- Verify authorization.
- Protect sensitive endpoints.
- Never expose credentials.
- Use secure environment variables.
- Prevent SQL injection.
- Avoid leaking sensitive information.
- Sanitize user-generated content where necessary.
- Handle errors without exposing internal details.
- Follow least-privilege principles.

Never assume hiding a UI element is sufficient authorization.

All protected operations must enforce permissions server-side.

Never trust client-side role or permission values.

---

# 14. Performance Standards

- Prefer server rendering.
- Minimize client-side JavaScript.
- Avoid unnecessary dependencies.
- Optimize database queries.
- Use pagination for large lists.
- Avoid N+1 query patterns.
- Optimize images.
- Use appropriate caching.
- Avoid unnecessary component re-renders.
- Use loading boundaries when appropriate.
- Monitor bundle size when adding dependencies.

Performance improvements must not compromise type safety or maintainability.

---

# 15. Environment Variables

Use environment variables for:

- Database credentials.
- API keys.
- Authentication secrets.
- External service credentials.
- Application configuration.

Rules:

- Never hardcode secrets.
- Never commit `.env` files containing secrets.
- Provide `.env.example` with placeholder values when configuration is introduced.
- Validate environment variables using Zod.
- Never expose private environment variables through `NEXT_PUBLIC_`.
- Keep server-only configuration separate from client configuration.

Example:

```ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

Only include environment variables actually used by the project.

---

# 16. ESLint and TypeScript Enforcement

The project uses:

- `eslint.config.mjs`
- ESLint flat configuration.
- Next.js `nextVitals`.
- Next.js `nextTs`.

## Required Rules

Enforce:

- `@typescript-eslint/no-explicit-any`: error.
- `@typescript-eslint/no-unsafe-assignment`: error.
- `@typescript-eslint/no-unsafe-member-access`: error.
- `@typescript-eslint/no-unsafe-call`: error.
- `@typescript-eslint/no-unsafe-return`: error.

Ensure the necessary TypeScript ESLint plugin and type-aware configuration are installed before enabling these rules.

Do not break existing Next.js ESLint configuration.

Keep:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Do not disable compiler checks to bypass errors.

---

# 17. Mandatory Agent Skills Workflow

Before implementing any feature:

1. Understand the requested feature.
2. Inspect existing architecture.
3. Identify relevant skills.
4. Read the relevant `SKILL.md`.
5. Read supporting documentation when necessary.
6. Create an implementation plan.
7. Implement using project standards.
8. Validate inputs using Zod.
9. Use shadcn/ui for suitable interface components.
10. Use Drizzle ORM skill for database operations.
11. Use UI/UX Pro skill for interface design.
12. Run verification commands.
13. Report implementation results.

## Skill Priority Matrix

| Task                      | Required Standard or Skill |
| ------------------------- | -------------------------- |
| Database schema           | Drizzle ORM Skill          |
| Database queries          | Drizzle ORM Skill          |
| Database migrations       | Drizzle ORM Skill          |
| Database relations        | Drizzle ORM Skill          |
| Dashboard design          | UI/UX Pro Skill            |
| Page layouts              | UI/UX Pro Skill            |
| Forms and interactions    | UI/UX Pro Skill            |
| Component design          | UI/UX Pro Skill            |
| Full-stack features       | Both skills                |
| API validation            | Zod                        |
| TypeScript implementation | TypeScript standards       |
| UI components             | shadcn/ui                  |

Never pretend to have read a skill that is unavailable.

---

# 18. Git and Change Management

- Do not overwrite unrelated user changes.
- Do not delete existing functionality without approval.
- Avoid unnecessary file restructuring.
- Keep changes focused on the requested feature.
- Do not commit secrets.
- Do not automatically commit or push unless explicitly requested.
- Review modified files before finishing.
- Preserve existing project conventions.

---

# 19. Mandatory Verification

Before completing implementation, run:

## TypeScript

```bash
npx tsc --noEmit
```

## ESLint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

## Database Verification

When database-related changes are made:

1. Verify schema definitions.
2. Verify relations.
3. Review generated migrations.
4. Confirm the target database.
5. Apply migrations only when authorized.
6. Verify affected queries.
7. Check database integrity.

## Final Checklist

Verify:

- [ ] No `any` types introduced.
- [ ] TypeScript strict mode remains enabled.
- [ ] No TypeScript errors remain.
- [ ] No new ESLint errors remain.
- [ ] Zod validation is implemented where applicable.
- [ ] Server-side authorization is enforced where required.
- [ ] shadcn/ui is used appropriately.
- [ ] Responsive layouts work.
- [ ] Loading and error states are handled.
- [ ] Database operations follow Drizzle skill.
- [ ] UI/UX follows UI/UX Pro skill when available.
- [ ] No secrets are exposed.
- [ ] Production build succeeds.

If an existing issue prevents verification, distinguish pre-existing problems from issues introduced by the changes.

Never claim a check passed unless it was actually executed successfully.

---

# 20. Non-Negotiable Development Rules

1. ZERO `any` types.
2. TypeScript strict mode must remain enabled.
3. Zod is mandatory for runtime validation of untrusted data.
4. shadcn/ui is the primary UI component library.
5. React Hook Form + Zod for complex forms.
6. Drizzle ORM skill must be read before Drizzle-related implementation.
7. UI/UX Pro skill must be read before UI/UX implementation.
8. Next.js 16 conventions must be followed.
9. Server-side security must never be bypassed.
10. Database operations must preserve data integrity.
11. Production migrations require explicit authorization.
12. Never bypass TypeScript or ESLint to hide errors.
13. Code must be reusable and maintainable.
14. Verify changes before reporting completion.
15. Never claim to have used unavailable skills.

## Expected Development Quality

Every implementation must be:

- Type-safe.
- Validated.
- Secure.
- Maintainable.
- Responsive.
- Accessible.
- Performant.
- Consistent with existing architecture.
- Production-ready after successful verification.

**Always prioritize correctness, security, maintainability, database integrity, and user experience over implementation speed.**
