const Joi = require('joi');

const ProductValidator = (product) => {
    const schema =Joi.object({
        id: Joi.string().required().label('Id'),
        destinationAddress: Joi.string().required().label('Destination Address'), 
        sourceAddress: Joi.string().required().label('Source Address'), 
        productType: Joi.string().required().label('Product Type')
    })
    const options = {
        errors: {
          wrap: {
            label: '',
          }
        }
    };
    return schema.validate(product, options)
}


module.exports = {
  ProductValidator
}