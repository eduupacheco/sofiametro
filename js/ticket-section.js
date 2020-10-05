chargerOnTickets()

$.ajax({
    type: 'GET',
    url: 'https://sofiametroapi.herokuapp.com/ticket/all',
    beforeSend: function(){
        chargerOnTickets()
    },
    success: function (data) {
        chargeTickets(data)
    },
    error: function () {
        chargerOnTickets()
        chargeErrorOnTickets()
    }
})

function chargeTickets(data) {
    var elements = ''
    data.forEach(e => {
        elements += `<div class="my-3 ticket" data-toggle="modal" data-target="#modal-for-buy-ticket">
            <div class="col border m-0 row p-2 ticket-body">
                <div class="d-flex justify-content-start align-items-center pl-2 py-1">
                    <span class="small text-muted">${e.display}</span>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center pl-2 bg-color-metro"><i
                    class="fas fa-ticket-alt mx-1"></i><span class="small">${e.price}Лв</span></div>
            <div class="col-1 ticket-tail m-0"></div>
        </div>`
    })
    $('#ticket-section').html(elements)
}

function chargeErrorOnTickets(){
    $('#ticket-section').html('<div class="d-flex justify-content-center my-4"><div><span class="muted">The store is not available right now.</div></div>')
}

function chargerOnTickets(){
    $('#ticket-section').html('<div class="d-flex justify-content-center my-4"><div><img src="img/spinner.gif" width="50"></div></div>')
}