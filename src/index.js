import callHistory from './callHistory.json';

let favouriteContacts = []
let htmlContacts = `<h1 class="contacts__title">My favorite contacts</h1>`

callHistory.forEach(call => {
    let callerName = call.firstName + call.lastName
    let isNewContact = true

    favouriteContacts.forEach(favContact => {
        let favContactName = favContact.firstName + favContact.lastName
        if (favContactName === callerName) {
            isNewContact = false
            let newCallTime = getCallTime(call.called)
            favContact.callTimes.push(newCallTime)
            favContact.callCount++
            if (favContact.lastCalledTime < newCallTime) {
                favContact.lastCalledTime = newCallTime
                favContact.calledDaysAgo = getDaysAgo(favContact.lastCalledTime)
            }
                
        }
    })

    if (isNewContact) {
        let newContact = {
            firstName: call.firstName,
            lastName: call.lastName,
            callCount: 1,
            callTimes: [],
            lastCalledTime: getCallTime(call.called),
            calledDaysAgo: null,
        }
        newContact.callTimes.push(newContact.lastCalledTime)
        newContact.daysAgo = getDaysAgo(newContact.lastCalledTime)
        newContact.calledDaysAgo = getDaysAgo(newContact.lastCalledTime)
        favouriteContacts.push(newContact)
    }
})

function getCallTime(callTime) {
    let unix_timestamp = callTime

    let date = new Date(unix_timestamp * 1000)

    return date
}

function getDaysAgo(lastCallTime) {
    let aDay = 24 * 60 * 60 * 1000
    let today = new Date()
    let daysBetween = Math.round(Math.abs((lastCallTime - today) / aDay))
    return daysBetween
}

favouriteContacts.sort((a, b) => b.callCount - a.callCount || a.calledDaysAgo - b.calledDaysAgo)


favouriteContacts.forEach(contact => {

    let htmlContact =
    `
    <div class="contact">
        <div class="contact__name"> 
            <span>` + contact.firstName + ` </span><span><strong>` + contact.lastName + `</strong></span>
        </div>
        <div class="contact__call-time">
            <span>` + contact.calledDaysAgo + ` days ago</span>
        </div>
    </div>
    `
    htmlContacts = htmlContacts + htmlContact
})

console.log('favouriteContacts', favouriteContacts)

document.getElementById('content').innerHTML = htmlContacts