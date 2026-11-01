# ScoutDP

ScoutDP is a modern Near-Earth Object Dashboard built using Angular. It leverages NASA/JPL Scout APIs to visualize and assess the trajectory and risk profiles of newly discovered near-Earth objects.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation

Clone the repository and install the dependencies using `pnpm`.

```bash
pnpm install
```

### Development Server

Run the local development server. The application will be available at `http://localhost:4200/`.

```bash
ng serve
```

### Testing

Execute the unit tests via Karma/Jasmine using the Angular CLI.

```bash
ng test
```

---

## Assemptions & Trade offs

- The project is architected with the assumption that contact and scout are two strictly independent, decoupled libraries.
- The AG Grid table is implemented entirely on the client side. Search, filter, and sort functionalities are handled locally since server-side pagination and filtering APIs are not available for this endpoint.
- A proxy was implemented to bypass CORS restrictions, as the NASA API does not accept direct requests from our deployed browser origin.

---

## Project Architecture

The codebase is divided into self-contained libraries under the `src/libs/` directory

### Folder Structure Overview

```text
src/
├── app/                  # Root application routing and main layout wrapper
├── environments/         # Environment variables (dev, prod)
└── libs/                 # Feature-based architecture
    ├── contact/          # Contact Us feature domain
    ├── scout/            # Core Scout API/Dashboard feature domain
    └── shared/           # Reusable components, utilities, and global state
```

### Library Internal Structure

Every library inside the `libs/` folder (such as `scout`, `contact`, and `shared`) enforces a strict internal separation of concerns.

- **`ui/`**: Dumb, presentation-only Angular components (e.g., specific tables, cards, or custom error screens).
- **`services/`**: Angular HTTP services for data fetching and external API interactions.
- **`store/`**: NgRx SignalStore files for managing local or global reactive state.
- **`types/`**: TypeScript interfaces, types, and DTOs specific to that feature domain.
- **`utils/`**: Helper functions, data transformers (e.g., API to UI mapping), and pure logic.
- **`constants/`**: Static configuration values, regex patterns (like `regex.constants.ts`), and static dictionaries.

---

## Code Quality & Git Workflow

This project enforces strict code quality checks before allowing commits to the repository.

- **Husky & lint-staged** are configured to intercept your `git commit` commands.
- enabled **Github Workflow** to deploy to github pages, whenever a commit happens in main branch
