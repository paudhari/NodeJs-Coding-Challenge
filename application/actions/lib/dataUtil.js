const JSum = require('jsum');
const compressjs = require('compressjs');
const moment = require('moment');
const validate = require('validate.js');
const validationRules = require('./validation');

function requestFormat(data){
  data.map((item)=>{
    validateData(item)
  })
  const checksum = computeChecksum(data);
  const output =JSON.stringify({
    data ,
    checksum
  });
  return output;
}

function responseFormat(data){
  let output = JSON.parse(data)
  output = Object.keys(output)[0];
  output = JSON.parse(output);
  let outputData = output.data;
  const checksum = output.checksum;
  const computedChecksum = computeChecksum(outputData);
  if(checksum!==computedChecksum){
    throw new Error("Data has been hacked");
  }
  return outputData;
}


function computeChecksum(data){
  let checksum;
  if(typeof data!='undefined'){
    checksum = JSum.digest(data, 'SHA256', 'hex');
  }
  return checksum;
}

/**
 * Validate Request
 * @param data
 */
function validateData(data){
  const validate = require('validate.js');
// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      return moment.utc(value);
    }
  });
  if(data && data.type){
    const result = validate(data,validationRules[data.type]);
    if(result){
      throw new Error(`Validation failed for object with id - ${data.id} type = ${data.type} \n Details = ${JSON.stringify(result)}`);
    }
  } else {
    throw new Error(`Invalid type of data - ${data}`);
  }
}
module.exports = {
  requestFormat,
  responseFormat
}
