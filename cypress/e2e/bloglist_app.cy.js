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

  describe('Login', function () {
    it.only('login fails with wrong credentials', function () {
      cy.get('input[placeholder="username"]').type('sarah')
      cy.get('input[placeholder="password"]').type('wrongpassword')
      cy.contains('button', 'login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function () {
      cy.get('input[placeholder="username"]').type('sarah')
      cy.get('input[placeholder="password"]').type('mypassword')
      cy.contains('button', 'login').click()

      cy.contains('blogs')
      cy.contains('Sarah Jane logged in').contains('button', 'logout')
      cy.contains('button', 'create new blog')
    })


  })
})