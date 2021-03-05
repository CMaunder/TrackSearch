describe('Input form', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('focuses input on load', () => {
        cy.focused()
        .should('have.id', 'searchbox')
    })

    it('searchbox accpets input', () => {
        const typedField = '123'
        cy.get('#searchbox')
            .type(typedField)
            .should('have.value', typedField)
    })

    context('Form submission', ()=> {
        it('displays one track containing the text AA', () => {
            cy.get('#searchbox')
                .type('55')
                .type('{enter}')
            cy.get('.TracksDisplay-Results')
            .should('have.length', '1')
            cy.get('.TracksDisplay-TrackArtist')
            .should('contain', 'AA')
        })

        it('displays an error message when an invalid id is provided', () => {
            cy.get('#searchbox')
                .type('-1{enter}')
            cy.get('.TracksDisplay-Results')
                .should('not.exist')
            cy.get('.TracksDisplay-noTracks')
                .should('contain', 'Sorry, no tracks found')
        })
    })

    context('Radio button select, then form submit', () => {
        it('displays multiple tracks', () => {
            cy.get('[type="radio"]').eq(1).check()
            cy.get('#searchbox')
                .type('Ahee{enter}')
            cy.get('.TracksDisplay-Results')
                .children().should('have.length', '6')
                cy.get('.TracksDisplay-Results')
                    .children().
                    should('have.class', 'TracksDisplay-TrackArtist')
            cy.get('.TracksDisplay-TrackArtist')
                .should('contain', 'Sun')
        })
    })
})