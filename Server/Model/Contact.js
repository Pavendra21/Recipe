const mongoose = require('mongoose')

const  contact = new mongoose.Schema ({
name: {type: 'String', required: true},
email: {type:'String', required: true, unique: true},
querry: {type:'String',  required: true, },
createdAt: { type: Date, default: Date.now }

},
{collection: "ContactInformation"})

const Contact = mongoose.model('userinfo', contact)


module.exports = Contact ;




