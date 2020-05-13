$.ajax({
    type: "GET",
    url: "https://sofiametro-api.herokuapp.com/user?id=1",
    beforeSend: function () {
    },
    success: function (data) {
        chargeUser(data[0])
    },
    error: function () {
    }
})

function chargeUser(data) {
    chargeProfileSection(data.name, data.email, data.phonenumber)
    chargePaymentSection(data.payments)
    chargeNotificationsSection(data.notifications)
    chargeActivitySection(data.activities)
}

function chargeProfileSection(name, email, phonenumber) {
    $('#profile-section').html(`
    <div class="mt-2">
        <label class="pl-2 text-muted small">Name</label>
        <input type="text" class="form-control" placeholder="Name" aria-label="Name" value="${name}">
    </div>
    <div class="mt-3">
        <label class="pl-2 text-muted small">Email</label>
        <input type="text" class="form-control" placeholder="Email" aria-label="Email" value="${email}">
    </div>
    <div class="mt-3">
        <label class="pl-2 text-muted small">Phone Number</label>
        <input type="text" class="form-control" placeholder="Phone Number" aria-label="Phone Number" value="+${phonenumber.prefix} ${phonenumber.number}">
    </div>
    <div class="mt-4">
        <button class="btn btn-light">Save Changes</button>
    </div>
    `);
}

function chargePaymentSection(payments) {
    var NOT_LINKED = '<p class="text-danger small">Linked X</p>';
    var LINKED = '<p class="text-success small">Linked √</p>';
    $('#payment-section').html(`
        <div class="card mb-3 p-0 my-2"><div class="row no-gutters p-0">
        <div class="col-4 bg-color-metro d-flex justify-content-center p-0">
            <i class="fab fa-paypal text-white display-3 align-self-center"></i>
        </div>
        <div class="col-8 p-0"><div class="card-body p-2"><div class="pl-3" id="paypal-connection"></div>
        <div class="row pl-4 p-0">
            <button class="btn btn-sm btn-dark mr-2 mt-1">Unlink to</button>
            <button class="btn btn-sm btn-success mt-1">Link to</button>
        </div></div></div></div></div>
        <div class="card mb-3 p-0 my-2"><div class="row no-gutters p-0">
        <div class="col-4 bg-color-metro d-flex justify-content-center p-0">
            <i class="fab fa-cc-visa text-white display-3 align-self-center"></i>
        </div>
        <div class="col-8 p-0"> <div class="card-body p-2"><div class="pl-3" id="visa-connection"></div>
        <div class="row pl-4 p-0">
            <button class="btn btn-sm btn-dark mr-2 mt-1">Unlink to</button>
            <button class="btn btn-sm btn-success mt-1">Link to</button>
        </div></div></div></div></div>
        <div class="card mb-3 p-0 my-2"><div class="row no-gutters p-0">
        <div class="col-4 bg-color-metro d-flex justify-content-center p-0">
            <i class="fab fa-cc-mastercard text-white display-3 align-self-center"></i>
        </div>
        <div class="col-8 p-0"><div class="card-body p-2"><div class="pl-3" id="mastercard-connection"></div>
        <div class="row pl-4 p-0">
            <button class="btn btn-sm btn-dark mr-2 mt-1">Unlink to</button>
            <button class="btn btn-sm btn-success mt-1">Link to</button>
        </div></div></div></div></div>
    `);
    (payments.paypal)? $('#paypal-connection').html(LINKED) : $('#paypal-connection').html(NOT_LINKED);
    (payments.visa)? $('#visa-connection').html(LINKED) : $('#visa-connection').html(NOT_LINKED);
    (payments.mastercard)? $('#mastercard-connection').html(LINKED) : $('#mastercard-connection').html(NOT_LINKED);
}

function chargeNotificationsSection(notifications) {
    $('#notification-section').html(`<div class="mt-2">
    <input id="sms-notification-check" class="pl-2" type="checkbox" aria-label="Checkbox for following text input">
    <label class="text-muted">Yes, I would like to receive notifications of each payments via SMS</label></div>
    <div class="mt-2">
    <input id="email-notification-check" class="pl-2" type="checkbox" aria-label="Checkbox for following text input">
    <label class="text-muted">Yes, I would like to receive notifications of each payments via email</label></div>
    <div class="mt-3"><button class="btn btn-light">Save Changes</button></div>`);
    (notifications.sms)? $('#sms-notification-check').attr('checked', ''): console.log();
    (notifications.email)? $('#email-notification-check').attr('checked', ''): console.log();
}

function chargeActivitySection(activities){
    var elements = ''
    activities.reverse().forEach(e => {
        elements += `<div class="card p-0 activity my-2">
            <div class="card-body p-2">
                <div class="card-text text-muted small">${obtainActivityMessage(e.type, e.time, e.date, e.extra)}</div>
            </div>
        </div>`
    });
    $('#activity-section').html(elements);
}

function obtainActivityMessage(type, time, date, extra){
    var msg = ''
    switch(type){
        case "buy": msg = `<i class="fas fa-money-check-alt"></i> Has buy a ticket (${getTicketName(extra)})`; break;
        case "logout": msg = '<i class="fas fa-sign-out-alt"></i> Has logged out'; break;
        case "loggin": msg = '<i class="fas fa-sign-in-alt"></i> Has logged in'; break;
        case "checkin": msg = `<i class="fas fa-subway"></i> Has check in (${getTicketName(extra)})`; break;
        case "checkout": msg = `<i class="fas fa-subway"></i> Has check out (${getTicketName(extra)})`; break;
    }
    return msg + ' at ' + time + ' in ' + date
}

function getTicketName(id){
    console.log('ID:'+id)
    $.ajax({
        type: "GET",
        url: "https://sofiametro-api.herokuapp.com/ticket?family="+parseInt(id),
        success: successCallBackOnGetTicketName,
    });
    return successCallBackOnGetTicketName()
}

function successCallBackOnGetTicketName(data){
    return data.display
}