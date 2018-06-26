const moment = require('moment')


module.exports = {
  merchant :{
    id : {
      presence : true,
      format: /^[a-zA-Z0-9]+$/i,
      length: {
        maximum: 250
      }
    },
    type : {
      presence: true,
      inclusion : ["merchant"]
    },
    name : {
      presence : true,
      format: /^[a-zA-Z0-9]+$/i,
      length: {
        maximum: 20
      }
    }
  },
  payment : {
    id : {
      presence : true,
      format: /^[a-zA-Z0-9]+$/i,
      length: {
        maximum: 250
      }
    },
    type : {
      presence: true,
      inclusion : ["payment"]
    },
    fromUserId : {
      presence : true,
      format: /^[a-zA-Z0-9_.]+$/i,
      length: {
        maximum: 256
      }
    },
    toMerchantId : {
      presence : function(val,obj){
        return !obj.toUserId
      },
      format: /^[a-zA-Z0-9_.]+$/i,
      length: {
        maximum: 256
      }
    },
    toUserId : {
      presence : function(val,obj){
        return !obj.toMerchantId
      },
      format: /^[a-zA-Z0-9_.]+$/i,
      length: {
        maximum: 256
      }
    },
    amount : {
      presence : true,
      numericality: {
        notLessThanOrEqualTo : 0
      }
    },
    createdAt : {
      presence : true,
      datetime : true
    }
  },
  user:{
    id : {
      presence : true,
      format: /^[a-zA-Z0-9]+$/i,
      length: {
        maximum: 250
      }
    },
    type : {
      presence: true,
      inclusion : ["user"]
    },
    userName : {
      presence : true,
      format: /^[a-zA-Z0-9_.]+$/i,
      length: {
        maximum: 20
      }
    },
    firstName : {
      length: {
        maximum: 100
      }
    },
    lastName : {
      length: {
        maximum: 100
      }
    },
    email : {
      email: true
    }
  }
}
