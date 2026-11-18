# Kedaimart

A modern e-commerce management system built with Next.js 16, TypeScript, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL 15+
- npm or pnpm

### Installation

```bash
git clone <repository-url>
cd kedaimart
npm install
```

### Environment Setup

Copy the example environment file and update with your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/kedaimart"
```

### Database Setup

**Generate migrations from schema:**

```bash
npm run db:generate
```

**Apply migrations to database:**

```bash
npm run db:migrate
```

**Create admin user (interactive):**

```bash
npm run db:create-admin
```

You'll be prompted for:
- `userId`: Your admin username (e.g., `admin`, `superadmin`)
- `password`: Your admin password (min 6 characters recommended)
- `fullname`: Your full name

The script is idempotent — running it again with the same userId will skip creation if the user already exists.

### Development

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

## Project Structure

```
kedaimart/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── db/               # Database configuration and schemas
│   │   ├── index.ts      # Drizzle client setup
│   │   └── schema/       # Table definitions
│   ├── validations/      # Zod validation schemas
│   └── server-actions/   # Server action handlers
├── scripts/              # Utility scripts
│   └── create-admin.ts   # Admin user creation
├── drizzle/             # Migration files (auto-generated)
└── .env.example         # Environment variables template
```

## Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate SQL migration from schema changes |
| `npm run db:migrate` | Apply pending migrations to database |
| `npm run db:push` | Sync schema directly (development only) |
| `npm run db:pull` | Introspect existing database into schema |

## Adding New Tables

1. Define schema in `lib/db/schema/`
2. Export from `lib/db/schema/index.ts`
3. Run `npm run db:generate`
4. Review generated migration in `drizzle/`
5. Run `npm run db:migrate`

## Security Notes

- Passwords are hashed using bcryptjs with cost factor 12
- All external inputs are validated with Zod before processing
- Never commit `.env` files containing secrets
- Use environment variables for sensitive configuration

## License

Private project.