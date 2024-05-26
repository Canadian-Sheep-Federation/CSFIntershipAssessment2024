const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    image: {			// image string from public coffee api
	required: true,
	type: String},
    method: {			// brewing method/type of coffee entered by user
        required: true,
        type: String
    },
    rating: {			// rating entered by user
        required: true,
        type: Number
    },				// yes or no whether recommended by user
    recommend: {
	required: true,
	type: Boolean}
})

module.exports = mongoose.model('Data', dataSchema)
