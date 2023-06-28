describe('Constructor', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('Add and delete some ingredients to constructor', function() {
    cy.get('[class^=BurgerIngredients_ingredient__]').as('ingredient');
    cy.get('[class^=BurgerConstructor_constructorBody__]').first().as('constructor');

    const dataTransfer = new DataTransfer();

    cy.get('@ingredient').eq(0).trigger('dragstart', {
      dataTransfer
    });

    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });

    cy.get('[class^=BurgerConstructor_constructorIngredient__]').as('constructorIngredient');

    cy.get('@constructorIngredient').should('have.length', 2);

    cy.get('@ingredient').eq(3).trigger('dragstart', {
      dataTransfer
    });

    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });

    cy.get('@constructorIngredient').should('have.length', 3);

    cy.get('@ingredient').eq(4).trigger('dragstart', {
      dataTransfer
    });

    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });

    cy.get('@constructorIngredient').should('have.length', 4);

    cy.get('[class^=BurgerConstructor_constructorList__]').as('constructorList');
    cy.get('@constructorList').find('.constructor-element__action').first().as('buttonDelete');

    cy.get('@buttonDelete').click();

    cy.get('@constructorIngredient').should('have.length', 3);
  });
});