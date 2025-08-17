# reproduction_agent

This project sets up a simple Cypress agent that runs a scripted list of steps defined in code and generates a test file.

## Setup

```bash
npm install
```

## Run the agent

```bash
npm run agent
```

The spec runs the steps listed in `SCRIPTED_STEPS` inside
`cypress/e2e/bug_repro_agent.cy.js`. You can modify this array to describe the
actions needed to reproduce your bug. The recorded commands are saved to
`cypress/e2e/generated_repro.cy.js`.
