const authenticate = require('../client/services/authenticate');

test('authenticate.cookieParser' , ()=>{
    expect(authenticate.cookieParser('bobby= henry; sally=harry; christian= freddy;'))
    .toEqual({ bobby: ' henry', sally: 'harry', christian: ' freddy;' })
    expect(authenticate.cookieParser('richard= henry; j=lobs; pal= george;'))
    .toEqual({ richard: ' henry', j: 'lobs', pal: ' george;' })
})
