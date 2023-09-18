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
    it('login fails with wrong credentials', function () {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sarah', password: 'mypassword' })
      cy.createBlog({ title: 'My Blog', author: 'Jungkook', url: 'https://www.google.com' })
      cy.visit('')
    })

    it('A blog can be created', function() {
      cy.contains('button', 'create new blog').click()
      cy.get('input[placeholder="title"]').type('New Blog from Cypress')
      cy.get('input[placeholder="author"]').type('Cypress')
      cy.get('input[placeholder="url"]').type('https://www.google.com')

      cy.get('#create-blog-button').click()
      cy.get('.notification').contains('a new blog New Blog from Cypress by Cypress added').should('be.visible')

      cy.get('.blogList').contains('New Blog from Cypress').contains('button', 'view')
    })

    it('Users can like a blog', function () {
      cy.get('.blogList').contains('My Blog').as('blog')
      cy.get('@blog').contains('button', 'view').click()
      cy.get('@blog').get('.likes').contains('0')

      cy.get('@blog').get('.likeButton').click()
      cy.get('@blog').get('.likes').contains('1')
    })
  })
})