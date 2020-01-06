const net = require('net')

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
/** ************************************** **
 *  LOG DATE FORMAT for loggind purpose
 ** *************************************** */

var LogMessage = function(message) {
    var dt = new Date().toISOString().replace(/T/, ', ').replace(/\..+/, '')
    console.log(dt + message)
        //return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
}

module.exports = {
    Message: LogMessage

}