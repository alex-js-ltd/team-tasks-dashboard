# Task Dashboard

A small task-management dashboard built as a Turborepo. Users can view tasks, filter them by status, and update the status of individual tasks.

## Features

- View tasks assigned to team members
- Filter tasks by status
- Update a task's status
- Responsive layout for desktop and tablet
- Local SQLite database with pre-populated development data

## Tech Stack

- Next.js
- React
- TypeScript
- Turborepo
- pnpm
- Prisma
- SQLite
- Playwright
- Tailwind CSS

## Project Structure

```text
.
├── apps/
│   └── web/                  # Next.js application
├── packages/
│   ├── config-eslint/        # Shared ESLint configuration
│   ├── config-typescript/    # Shared TypeScript configuration
│   └── database/             # Prisma schema, seed script, and SQLite database
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting Started

### 1. Install dependencies

From the root directory, run:

```bash
pnpm install
```

### 2. Start the application

Still in the root directory, run:

```bash
pnpm run dev
```

This starts the development server for the web application.

## Database

The database package is located at:

```text
packages/database
```

It contains the local SQLite database file:

```text
dev.db
```

The database has already been populated with sample users and tasks, so no additional database setup or seeding is required to run the project.

## Optional: Reseed the Database

The seed script uses the OpenAI API through:

```json
"@ai-sdk/openai": "^4.0.17"
```

To generate new seed data, make sure an OpenAI API key is available in your environment:

```env
OPENAI_API_KEY="your-api-key"
```

Then move into the database package and run:

```bash
cd packages/database
pnpm db:seed
```

Seeding is optional because the included SQLite database is already populated and ready to use.

## Useful Commands

Run these commands from the root directory:

```bash
pnpm install
pnpm run dev
```

Run the optional seed command from `packages/database`:

```bash
pnpm db:seed
```
