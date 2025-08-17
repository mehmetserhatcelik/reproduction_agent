function runCommand(input, steps) {
  const [command, ...rest] = input.split(' ');
  if (command === 'visit') {
    const url = rest.join(' ');
    cy.visit(url);
    steps.push(`cy.visit('${url}');`);
  } else if (command === 'click') {
    const selector = rest.join(' ');
    cy.get(selector).click();
    steps.push(`cy.get('${selector}').click();`);
  } else if (command === 'type') {
    const selector = rest.shift();
    const text = rest.join(' ');
    cy.get(selector).type(text);
    steps.push(`cy.get('${selector}').type('${text}');`);
  } else if (command === 'contains') {
    const text = rest.join(' ');
    cy.contains(text);
    steps.push(`cy.contains('${text}');`);
  } else {
    steps.push(`// Unknown command: ${input}`);
  }
}

function executeSteps(predefined = [], steps = []) {
  if (predefined.length) {
    const input = predefined.shift();
    runCommand(input, steps);
    return executeSteps(predefined, steps);
  }

  return cy
    .prompt('Enter a Cypress command (e.g., "visit https://example.com") or leave blank to finish:')
    .then((input) => {
      if (!input) {
        return steps;
      }
      runCommand(input, steps);
      return executeSteps(predefined, steps);
    });
}

const SCRIPTED_STEPS = [
  'visit https://v0-new-chat-pearl-nine.vercel.app/',
  'click .cancel-button',
  'contains Unable to cancel appointment.',
];

describe('Bug reproduction agent', () => {
  it('runs scripted steps and generates a test file', () => {
    executeSteps([...SCRIPTED_STEPS]).then((steps) => {
      const testContent = `describe('Reproduced bug', () => {\n  it('runs recorded steps', () => {\n${steps
        .map((s) => '    ' + s)
        .join('\n')}\n  });\n});\n`;
      cy.writeFile('cypress/e2e/generated_repro.cy.js', testContent);
    });
  });
});
