describe('Navigate Exchange List', () => {
  it('Opens Home, lists 10 exchanges and opens last item in list successfully', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('h1').contains('Top 10 Exchanges')
    cy.get('body').find('[data-testid="exchange"]').should('have.length', 10)
    cy.get('[data-testid="open-exchange-1"]').click()

    cy.url().should('contain', 'http://localhost:3000/exchange/')

    cy.get('[data-testid="exchange-title"]').should('not.be.empty')

    cy.get('[data-testid="back-to-list-btn"]').click()
  })
})