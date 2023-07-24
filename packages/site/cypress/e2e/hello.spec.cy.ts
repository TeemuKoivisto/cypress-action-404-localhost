describe('# Site', () => {
  it('Should render', () => {
    cy.visit('/')
    cy.get('h1').should('contain.text', 'Hello World')
    cy.get('html').matchImage({
      maxDiffThreshold: 0,
      diffConfig: {
        threshold: 0.0001,
        alpha: 0.2
      }
    })
  })
})
