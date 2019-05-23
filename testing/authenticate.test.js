const authenticate = require('../client/services/authenticate');

describe('authenticate.cookieParser', () => {
    it('returns an object with key value pairs when given a string' , () => {
        expect(authenticate.cookieParser('bobby= henry; sally=harry; christian= freddy;'))
        .toEqual({ bobby: ' henry', sally: 'harry', christian: ' freddy;' })
        expect(authenticate.cookieParser('richard= henry; j=lobs; pal= george;'))
        .toEqual({ richard: ' henry', j: 'lobs', pal: ' george;' })
    })
})
