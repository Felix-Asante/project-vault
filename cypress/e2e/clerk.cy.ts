import { setupClerkTestingToken } from '@clerk/testing/cypress'

beforeEach(() => {
    setupClerkTestingToken()
})

describe('Test signin page', () => {
    it('should display signin page with the necessary elements', () => {
        cy.visit('/sign-in')
        cy.get('h1.cl-headerTitle').should(
            'contain',
            'Sign in to Project Vault'
        )
        cy.get('.cl-socialButtonsBlockButton').should('have.length', 2)
        cy.get('.cl-button__github').should('exist')
        cy.get('.cl-button__google').last().should('exist')
        cy.get('input[name=identifier]').should('exist')
        cy.get('button[data-color=primary]').should('contain', 'Continue')
        cy.get('a').should('contain', 'Sign up')
    })

    it('should redirect to sign-in page if not authenticated', () => {
        cy.visit('/projects')
        cy.location('pathname').should('eq', '/sign-in')
        cy.visit('/projects/randomKey/overview')
        cy.location('pathname').should('eq', '/sign-in')
    })

    it('should sign in with GitHub', () => {
        cy.visit('/sign-in')
        cy.get('.cl-button__github').click()

        cy.origin('https://github.com', () => {
            cy.get('input[name="login"]').type('test-userxx')
            cy.get('input[name="password"]').type(
                Cypress.env('GITHUB_PASSWORD')
            )
            cy.get('input[type="submit"]').click()

            // check if user is not redirected to the app if they provide
            // wrong credentials
            cy.get('.flash-error').should('exist')
        })

        cy.origin('https://github.com', () => {
            // login with correct credentials
            cy.get('input[name="login"]')
                .clear()
                .type(Cypress.env('GITHUB_USER'))
            cy.get('input[name="password"]')
                .clear()
                .type(Cypress.env('GITHUB_PASSWORD'))
            cy.get('input[type="submit"]').click()
        })

        // Wait for redirect back to our app
        cy.url().should('include', '/projects')
    })
})
