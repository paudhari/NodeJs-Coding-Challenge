const {requestFormat} = require('./lib/dataUtil');
/**
 * Create storeAction with dependencies
 *
 * @param {fetch} p2pFetch
 * @param {fetch} hostedFetch
 * @return {storeAction}
 */
// eslint-disable-next-line no-unused-vars
module.exports = function storeActionFactory(p2pFetch, hostedFetch) {
  /**
   * Validate and store data
   *
   * @typedef storeAction
   * @param {object[]} inputData
   * @return void
   */
  // eslint-disable-next-line no-unused-vars
  async function storeAction(inputData) {

    // Your code should be here:
    // 1. Validate inputData
    // 2. Store inputData in external service(s)

    const endpoint = process.env.SERVICE_ENDPOINT;
    const data  = requestFormat(inputData);
    p2pFetch(endpoint,{
      method : 'POST',
      body:  data  ,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }

  return storeAction;
};
