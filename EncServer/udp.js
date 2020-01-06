/** --------------------------------------------------
 *
 * 
 * 
 * 
 * Allow user to login our e2e Server using UDP Port 
 * Allow user to login our e2e Server using TCP Port
 *
 ** ----------------------------------------------------
 */
const enc = require('./enc')
const snd = require('./sendCommand')
const secure = require('./encrypt')
const log = require('./log')

/** --------------------------------------------------
 *
 * Function: 
 * 
 * 
 * Allow user to login our e2e Server using UDP Port 
 * Allow user to login our e2e Server using TCP Port
 *
 ** ----------------------------------------------------
 */
var SendWelcomeOnUDP = function() {

    var sendDataUDP = snd.SendCommandUDP("WEL", SenderUserName, "Server", SenderPubIP, SenderPvtIP, SenderPubPort, SenderPvtPort, null, null, null, null, null, null)
    log.Message(' - DSNT_UDP : ' + sendDataUDP)
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    return EncryptedDataUDP


}

module.exports = {
    WelcomeOnUDP: SendWelcomeOnUDP


}