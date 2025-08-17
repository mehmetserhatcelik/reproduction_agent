Cypress.Commands.add('prompt', (message = 'Enter value') => {
  return cy.window().then((win) => {
    const result = win.prompt(message);
    return cy.wrap(result);
  });
});
