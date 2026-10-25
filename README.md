# MouseScholar

**A research companion for discovering scholarly papers, understanding their context, and planning what to read next — directly from the browser.**

> **Project status: Early development / prototype.** The WXT browser-extension foundation is set up. The research discovery, citation, recommendation, preview, and Zotero features below describe the intended roadmap and should not yet be assumed functional.

## Overview

MouseScholar aims to help researchers move from encountering an unfamiliar paper or concept on a webpage to taking a well-informed next step. Instead of only finding a matching PDF, the extension is designed to answer four questions:

1. **What paper is this?** Resolve highlighted text or a paper title to a trustworthy scholarly record.
2. **How should I cite it?** Display publication details, citation counts when available, and exportable BibTeX, APA, or MLA citations.
3. **What should I read next?** Suggest up to five relevant related papers.
4. **What should I read first?** Recommend foundational papers or prerequisite concepts, with an explanation of why they matter.

The long-term goal is a lightweight, explainable research assistant that fits into a researcher's existing reading workflow.

## Planned features

| Feature | Intended behavior | Status |
| --- | --- | --- |
| Research-mode activation | Toggle research mode by deliberately shaking the mouse; provide an accessible alternative trigger | Planned |
| Text-to-paper search | Select a title or passage to search for matching papers | Planned |
| Right-click preview | Open a compact paper-information preview from a text selection | Planned |
| Paper metadata | Show title, authors, venue, year, DOI, publication URL, and available open-access links | Planned |
| Citation information | Show citation counts with provider/source attribution and retrieval date | Planned |
| Citation export | Copy/export BibTeX, APA, and MLA references | Planned |
| Zotero integration | Save an identified paper to Zotero with user authorization | Planned |
| Related papers | Display up to five relevant papers with brief relevance explanations | Planned |
| Prerequisite reading | Recommend foundational reading or concepts, with reasoning and confidence cues | Planned |
| Browser support | Develop for Chromium browsers; test Firefox compatibility separately | In progress |

### Intended user interaction

1. Open a scholarly article, blog post, documentation page, or other supported webpage.
2. Activate research mode using the mouse-shake gesture (or a keyboard/menu alternative, when implemented).
3. Highlight a paper title or concept, then use the extension's context-menu action.
4. Review a preview containing verified metadata and available scholarly links.
5. Explore citations, related papers, and recommended prerequisite reading.
6. Copy a citation or save the paper to Zotero when those integrations are implemented.

**Design principles:** minimal interruption, explicit user control, credible source attribution, clear uncertainty, accessibility, and privacy-aware operation.

## Technology stack

- **TypeScript:** modular, typed application logic.
- **WXT:** cross-browser extension development and build tooling.
- **Vitest:** automated unit testing.
- **Git and GitHub:** version control and collaboration.
- **Chrome/Firefox DevTools:** browser runtime debugging.

No backend service is required for the current extension scaffold. Scholarly metadata sources, recommendation algorithms, and any future backend services will be documented once selected and implemented.

## Project structure

```text
MouseScholar/
├── public/                       # Static assets, when needed
├── src/
│   ├── app/
│   │   └── mScholar.ts           # Application coordinator
│   ├── entrypoints/
│   │   └── content.ts            # WXT content-script entrypoint
│   ├── features/
│   │   ├── mouse/
│   │   │   └── mouseTracker.ts   # Mouse-input feature
│   │   └── research/
│   │       └── researchMode.ts   # Research-mode feature (in progress)
│   └── index.ts                  # Local entry module, if still used
├── tests/                        # Tests as functionality is added
├── wxt.config.ts                 # WXT extension configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── package-lock.json
└── README.md
```

`node_modules/`, `.wxt/`, `.output/`, and test coverage reports are generated locally and should not be committed.

## Getting started: reproduce the development environment

### Prerequisites

- Git.
- Node.js and npm (use an actively supported Node.js LTS release compatible with the checked-in WXT/Vite versions).
- Google Chrome or another supported Chromium-based browser. Firefox is optional for cross-browser testing.
- VS Code or another editor (optional).

### 1. Clone the repository

Replace `<OWNER>` and `<REPOSITORY>` with the actual GitHub repository path:

```bash
git clone https://github.com/<OWNER>/<REPOSITORY>.git
cd <REPOSITORY>
```

### 2. Install dependencies

```bash
npm ci
```

`npm ci` uses `package-lock.json` for a reproducible dependency install. If dependencies change, maintainers should update and commit the lockfile.

### 3. Start the development server

```bash
npm run dev
```

WXT builds the development extension and watches changes to source files. Keep this terminal running.

If WXT instructs you to load the extension manually:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select **`.output/chrome-mv3-dev/`** from this repository (not `dist/`).
5. Open a regular webpage such as `https://example.com`.
6. Open the webpage's DevTools **Console** to inspect initialization logs or runtime errors.

When you edit a source file and save it, WXT rebuilds and attempts to reload the development content script. Some updates require refreshing the test webpage. When changing permissions or manifest-related configuration, reload the extension from `chrome://extensions` if needed.

**Current smoke test:** The prototype should initialize its application and mouse-tracking classes on a matching webpage. Console messages depend on the current implementation; the planned scholarly search experience is not yet available.

### 4. Type-check and test

```bash
npm run typecheck
npm test
```

`npm test` starts Vitest watch mode. To execute tests once:

```bash
npm run test:run
```

If no test files have been added yet, Vitest may report **no test files found**. That reflects the project's current stage rather than a broken extension.

### 5. Create a production build

```bash
npm run build
```

The WXT production extension is written to a generated directory under `.output/` (typically `.output/chrome-mv3/`). Build output is not committed to Git. Validate the build in a browser before publishing.

### 6. Firefox development (optional)

If the corresponding npm scripts are present:

```bash
npm run dev:firefox
npm run build:firefox
```

Chrome/Firefox feature parity must be verified; building for both does not guarantee identical behavior.

## Available npm commands

| Command | Action |
| --- | --- |
| `npm run dev` | Develop the Chrome/Chromium extension with WXT reload support |
| `npm run dev:firefox` | Develop a Firefox build (when script configured) |
| `npm run typecheck` | Run TypeScript static checks |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |
| `npm run check` | Run type checks and tests (requires tests to exist) |
| `npm run build` | Produce a production extension build |
| `npm run build:firefox` | Produce a Firefox build (when script configured) |

## Architecture and intended data flow

```text
Webpage text selection / user gesture
                |
                v
     WXT content-script entrypoint
                |
                v
         Application controller
                |
      +---------+----------+
      |                    |
 Mouse tracking       Research mode
      |                    |
 Shake detection      Context-menu / preview
                           |
                           v
                 Paper resolution service
                           |
              Verified scholarly metadata
                           |
        +------------------+-------------------+
        |                  |                   |
    Citations          Related work       Prerequisites
        |                                      |
   Zotero/export                     Reading suggestions
```

Only the entrypoint and early application modules are currently scaffolded. The data services and recommendations in this diagram are proposed components.

### Research quality and trustworthiness

As features are implemented, MouseScholar should:

- Verify paper identity using stable scholarly identifiers (for example, DOI) rather than relying on text similarity alone.
- Attribute citation counts to a specific provider and retrieval date; counts may differ across databases.
- Avoid presenting generated paper titles, citation counts, or open-access URLs as verified unless the provider supports them.
- Distinguish **related papers** (topical similarity) from **prerequisites** (conceptual or methodological dependencies).
- Explain why a suggested prerequisite is relevant, and allow researchers to inspect its sources.
- Request only necessary browser permissions and avoid uploading page text without an explicit user action and clear disclosure.
- Provide alternatives to the mouse-shake gesture for accessibility and avoid accidental activation.

## Roadmap

- [x] Establish TypeScript + WXT extension scaffold.
- [x] Configure development builds and browser loading.
- [ ] Implement reliable mouse-shake detection, tests, and keyboard activation.
- [ ] Implement text-selection capture and right-click context menu.
- [ ] Implement paper-identity resolution and verified metadata preview.
- [ ] Add citation exports (BibTeX, APA, MLA) and provenance.
- [ ] Add Zotero integration.
- [ ] Recommend up to five related papers.
- [ ] Design and evaluate prerequisite-reading recommendations.
- [ ] Add automated browser tests, accessibility checks, and Firefox validation.
- [ ] Prepare privacy documentation, release packages, and store submission.

## Reproducing results and reporting issues

There are **no published recommendation benchmarks or reproducible research results yet**. Once algorithms and evaluation datasets are added, this section will document data sources, versions, splits, metrics, seeds, evaluation commands, and expected outputs.

When reporting a problem, include the operating system, Node.js version (`node --version`), browser version, reproduction steps, expected behavior, actual behavior, and relevant console output without tokens or personal data.

## Contributing

1. Create a feature branch from an up-to-date `main`.
2. Keep features modular and add tests for behavioral logic.
3. Run `npm run typecheck` and relevant tests before opening a pull request.
4. Submit a pull request describing the change, validation, and any permissions or data-handling implications.

## License

**Not yet specified.** @ 2026

---

**MouseScholar — find the paper, understand the field, and know what to read next.**
