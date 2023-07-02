describe('create order', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should create order', function() {
    cy.get('[class^=BurgerIngredients_ingredient__]').first().as('ingredient');
    cy.get('[class^=BurgerConstructor_constructorBody__]').first().as('constructor');
    cy.contains('Оформить заказ').as('button');

    const dataTransfer = new DataTransfer();

    cy.get('@ingredient').trigger('dragstart', {
      dataTransfer
    });

    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });

    cy.get('@button').click();
  });
});