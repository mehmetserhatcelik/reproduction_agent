# reproduction_agent

This project sets up a simple Cypress agent that uses `cy.prompt` to capture user-provided reproduction steps and generate a test file.

## Setup

```bash
npm install
```

## Run the agent

```bash
npm run agent
```

The test will prompt for Cypress commands (e.g., `visit https://example.com`, `click #selector`, `type #input some text`). Submit an empty response to finish and automatically generate `cypress/e2e/generated_repro.cy.js` with the recorded steps.
