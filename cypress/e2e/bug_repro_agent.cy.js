function executeSteps(steps = []) {
  return cy
    .prompt('Enter a Cypress command (e.g., "visit https://example.com") or leave blank to finish:')
    .then((input) => {
      if (!input) {
        return steps;
      }
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
      } else {
        steps.push(`// Unknown command: ${input}`);
      }
      return executeSteps(steps);
    });
}

describe('Bug reproduction agent', () => {
  it('prompts for steps and generates a test file', () => {
    executeSteps().then((steps) => {
      const testContent = `describe('Reproduced bug', () => {\n  it('runs recorded steps', () => {\n${steps
        .map((s) => '    ' + s)
        .join('\n')}\n  });\n});\n`;
      cy.writeFile('cypress/e2e/generated_repro.cy.js', testContent);
    });
  });
});
