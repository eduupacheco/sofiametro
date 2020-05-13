chargeOnReceipts()

$.ajax({
    type: 'GET',
    url: 'https://sofiametro-api.herokuapp.com/receipt?id='+USERID,
    beforeSend: function () {
        chargeOnReceipts() 
    },
    success: function (data) {
        chargeReceipts(data[0].tickets)
    },
    error: function () {
        chargeOnReceipts() 
        chargeErrorOnReceipts()
    }
})

function chargeReceipts(data) {
    var activedtickets = data.filter(ticket => ticket.active == true)
    var passedtickets = data.filter(ticket => ticket.active == false)

    var elementsactivedtickets = ''
    activedtickets.forEach(ticket => {
        elementsactivedtickets += `
            <div class="card mb-3 p-0 my-2 ticket-to-use" data-toggle="modal" data-target="#modal-for-use-ticket">
                <div class="row no-gutters p-0">
                    <div class="col-4 bg-color-metro d-flex justify-content-center p-0">
                        <i class="fa fa-ticket-alt text-white display-3 align-self-center"></i>
                    </div>
                    <div class="ticket-tail"></div>
                    <div class="col p-2 d-flex justify-content-between">
                        <div class="align-self-center">
                            <h6 class="align-self-center text-muted">${ticket.family}</h6>
                            <span class="small text-muted" style="font-size: 8px;">BUY FROM ${ticket.timebuy} IN ${ticket.datebuy}</span>
                        </div>
                        <div>
                            <div class="ticket-on"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    $('#actived-tickets-section').html(elementsactivedtickets)
    var elementspassedtickets = ''
    passedtickets.forEach(ticket => {
        elementspassedtickets += `
            <div class="card mb-3 p-0 my-2 ticket-to-use" data-toggle="modal" data-target="#modal-for-use-ticket">
                <div class="row no-gutters p-0">
                    <div
                        class="col-4 bg-secondary d-flex justify-content-center p-0">
                        <i class="fa fa-ticket-alt text-white display-3 align-self-center"></i>
                    </div>
                    <div class="ticket-tail-secondary"></div>
                    <div class="col p-2 d-flex justify-content-between">
                        <div class="align-self-center">
                            <h6 class="align-self-center text-muted">${ticket.family}</h6>
                            <span class="small text-muted" style="font-size: 8px;">USED IN ${ticket.timeuse} IN ${ticket.dateuse}</span>
                        </div>
                        <div>
                            <div class="ticket-off"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    $('#passed-tickets-section').html(elementspassedtickets)
}

function chargeErrorOnReceipts() {
    $('#actived-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><span class="muted">The activated tickets are not available right now.</div></div>')
    $('#passed-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><span class="muted">The passed tickets are not available right now.</div></div>')
}

function chargeOnReceipts() {
    $('#actived-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><img src="img/spinner.gif" width="50"></div></div>')
    $('#passed-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><img src="img/spinner.gif" width="50"></div></div>')
}