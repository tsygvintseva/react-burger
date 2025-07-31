/// <reference types="cypress" />

import {
	constructorDropzone,
	ingredientCard,
	modal,
	modalClose,
	submitOrder,
} from './selectors';

export {};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			dragIngredient(): Chainable<void>;
			openIngredientDetailsModal(): Chainable<void>;
			openOrderDetailsModal(): Chainable<void>;
			closeModal(): Chainable<void>;
		}
	}
}

Cypress.Commands.add('dragIngredient', () => {
	cy.get(ingredientCard).first().trigger('dragstart');
	cy.get(constructorDropzone).trigger('drop');
});

Cypress.Commands.add('openIngredientDetailsModal', () => {
	cy.get(ingredientCard).first().click();
	cy.get(modal).should('be.visible');
});

Cypress.Commands.add('openOrderDetailsModal', () => {
	cy.get(submitOrder).click();
	cy.wait(500);
	cy.wait('@postOrder');
	cy.get(modal).should('be.visible');
});

Cypress.Commands.add('closeModal', () => {
	cy.get(modalClose).click();
	cy.get(modal).should('not.exist');
});
