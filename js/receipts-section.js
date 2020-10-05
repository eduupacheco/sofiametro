chargeOnReceipts()

$.ajax({
    type: 'GET',
    url: 'https://sofiametroapi.herokuapp.com/receipt?id=' + USERID,
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
    $.get("https://sofiametroapi.herokuapp.com/ticket/all", function (tickets) {
        chargeActivedReceipts(activedtickets, tickets)
        chargePassedReceipts(passedtickets, tickets)
    });
}

function chargeActivedReceipts(data, tickets) {
    var elements = ''
    data.forEach(d => {
        var ticketname = ''
        tickets.forEach(t => {
            if (t.family == d.family) {
                ticketname = t.display
            }
        })
        elements += `
            <div class="card mb-3 p-0 my-2 ticket-to-use" data-toggle="modal" data-target="#modal-for-use-ticket">
                <div class="row no-gutters p-0">
                    <div class="col-4 bg-color-metro d-flex justify-content-center p-0">
                        <i class="fa fa-ticket-alt text-white display-3 align-self-center"></i>
                    </div>
                    <div class="ticket-tail"></div>
                    <div class="col p-2 d-flex justify-content-between">
                        <div class="align-self-center">
                            <h6 class="align-self-center text-muted">${ticketname}</h6>
                            <span class="small text-muted" style="font-size: 8px;">BUY FROM ${d.timebuy} IN ${d.datebuy}</span>
                        </div>
                        <div>
                            <div class="ticket-on"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    $('#actived-tickets-section').html(elements)
}

function chargePassedReceipts(data, tickets) {
    var elements = ''
    data.forEach(d => {
        var ticketname = ''
        tickets.forEach(t => {
            if (t.family == d.family) {
                ticketname = t.display
            }
        })
        elements += `
            <div class="card mb-3 p-0 my-2 ticket-to-use" data-toggle="modal" data-target="#modal-for-use-ticket">
                <div class="row no-gutters p-0">
                    <div
                        class="col-4 bg-secondary d-flex justify-content-center p-0">
                        <i class="fa fa-ticket-alt text-white display-3 align-self-center"></i>
                    </div>
                    <div class="ticket-tail-secondary"></div>
                    <div class="col p-2 d-flex justify-content-between">
                        <div class="align-self-center">
                            <h6 class="align-self-center text-muted">${ticketname}</h6>
                            <span class="small text-muted" style="font-size: 8px;">USED IN ${d.timeuse} IN ${d.dateuse}</span>
                        </div>
                        <div>
                            <div class="ticket-off"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    $('#passed-tickets-section').html(elements)
}

function chargeErrorOnReceipts() {
    $('#actived-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><span class="muted">The activated tickets are not available right now.</div></div>')
    $('#passed-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><span class="muted">The passed tickets are not available right now.</div></div>')
}

function chargeOnReceipts() {
    $('#actived-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><img src="img/spinner.gif" width="50"></div></div>')
    $('#passed-tickets-section').html('<div class="d-flex justify-content-center my-4"><div><img src="img/spinner.gif" width="50"></div></div>')
}