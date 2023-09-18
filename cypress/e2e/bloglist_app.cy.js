describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Sarah Jane',
      username: 'sarah',
      password: 'mypassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('input[placeholder="username"]').should('be.visible')
    cy.get('input[placeholder="password"]').should('be.visible')
    cy.contains('button', 'login')
  })
})