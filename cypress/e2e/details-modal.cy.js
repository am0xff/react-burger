describe('Show ingredients detail', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open and close modal with details', () => {
    cy.get('[class^=BurgerIngredients_ingredient__]').first().as('ingredient');
    cy.get('@ingredient').click();

    cy.get('[class^=Modal_modal__]').as('modal');
    cy.get('@modal').should('exist');

    cy.get('[class^=Modal_modalButtonClose__]').first().as('buttonClose');
    cy.get('@buttonClose').click();

    cy.get('@modal').should('not.exist');
  });
});