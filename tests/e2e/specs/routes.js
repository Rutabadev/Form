describe('Check routes', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App')
  })

  it('Visits \'game\'', () => {
    cy.visit('/game')
    cy.contains('h1', 'Game')
  })

  it('Visits \'highscores\'', () => {
    cy.visit('/highscores')
    cy.contains('h1', 'Highscores')
  })

  it('Visits \'about\'', () => {
    cy.visit('/about')
    cy.contains('h1', 'This is an about page')
  })
})
