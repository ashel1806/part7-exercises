describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Ashel Vasquez',
      username: 'ashelDev1806',
      password: 'asheliwis2818'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

	describe('Login', function() {
		it('succeds with correct credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('ashelDev1806')
			cy.get('#password').type('asheliwis2818')
			cy.get('#login-button').click()

			cy.contains('Ashel Vasquez logged-in')
		})

		it('fails with wrong credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('ashelDev1806')
			cy.get('#password').type('wrongPassword')
			cy.get('#login-button').click()

			cy.get('.loggin-fail')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Ashel Vasquez logged-in')
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.contains('login').click()
			cy.get('input:first').type('ashelDev1806')
			cy.get('input:last').type('asheliwis2818')
			cy.get('#login-button').click()
		})

		it('a new blog can be created', function() {
			cy.contains('create new blog').click()
			cy.get('#title').type('blog by cypress')
			cy.get('#author').type('cypressTest')
			cy.get('#url').type('www.cypress.com')

			cy.get('#create-blog').click()
			cy.contains('blog by cypress')
			cy.contains('cypressTest')
			cy.contains('www.cypress.com')
		})

		it('user can like a blog', function() {
			cy.contains('create new blog').click()
			cy.get('#title').type('blog by cypress')
			cy.get('#author').type('cypressTest')
			cy.get('#url').type('www.cypress.com')
			cy.get('#create-blog').click()

			cy.contains('view').click()
			cy.contains('like').click()
		})

		it('user can remove his blogs', function() {
			cy.contains('create new blog').click()
			cy.get('#title').type('blog by cypress')
			cy.get('#author').type('cypressTest')
			cy.get('#url').type('www.cypress.com')
			cy.get('#create-blog').click()

			cy.contains('view').click()
			cy.contains('remove').click()

			cy.get('html').should('not.contain', 'blog by cypress')
		})
	})
})
