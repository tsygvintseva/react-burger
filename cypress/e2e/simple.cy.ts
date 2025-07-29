/// <reference types="cypress" />

describe('Constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/ingredients', { fixture: 'ingredients' }).as(
			'getIngredients'
		);
		cy.intercept('GET', '**/auth/user', { fixture: 'user' }).as('getUser');
		cy.intercept('POST', '**/orders', { fixture: 'order' }).as('postOrder');

		cy.window().then((win) => {
			win.localStorage.setItem(
				'refreshToken',
				JSON.stringify('test-refreshToken')
			);
			win.localStorage.setItem(
				'accessToken',
				JSON.stringify('test-accessToken')
			);
		});

		cy.visit('/');
		cy.wait('@getIngredients');
	});

	it('should drag an ingredient into the constructor', () => {
		cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]').trigger('drop');

		cy.get('[data-testid="constructor-item"]').should('exist');
	});

	it('should open the ingredient details modal on click', () => {
		cy.get('[data-testid="ingredient-card"]').first().click();

		cy.get('[data-testid="modal"]').should('be.visible');
		cy.get('[data-testid="modal-title"]').should(
			'contain',
			'Булка космическая'
		);
	});

	it('should close the ingredient details modal on click', () => {
		cy.get('[data-testid="ingredient-card"]').first().click();
		cy.get('[data-testid="modal-close"]').click();

		cy.get('[data-testid="modal"]').should('not.exist');
	});

	it('should submit the order successfully and open the order details modal', () => {
		cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]').trigger('drop');

		cy.get('[data-testid="submit-order"]').click();
		cy.wait(500);
		cy.wait('@postOrder');

		cy.get('[data-testid="modal"]').should('be.visible');
		cy.get('[data-testid="order-number"]').should('exist');
	});

	it('should submit the order successfully and close the order details modal on click', () => {
		cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]').trigger('drop');

		cy.get('[data-testid="submit-order"]').click();
		cy.wait(500);
		cy.wait('@postOrder');

		cy.get('[data-testid="modal-close"]').click();
		cy.get('[data-testid="modal"]').should('not.exist');
	});
});
