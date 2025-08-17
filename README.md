# reproduction_agent

This project sets up a simple Cypress agent that can either prompt for reproduction steps at runtime or execute a scripted list of steps defined in code and generate a test file.

## Setup

```bash
npm install
```

## Run the agent

```bash
npm run agent
```

By default the spec will run the steps listed in `SCRIPTED_STEPS` inside
`cypress/e2e/bug_repro_agent.cy.js`. You can modify this array to describe the
actions needed to reproduce your bug. The recorded commands are saved to
`cypress/e2e/generated_repro.cy.js`.

If `SCRIPTED_STEPS` is empty, the test falls back to prompting for commands.
