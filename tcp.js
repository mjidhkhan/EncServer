/** --------------------------------------------------
 *
 *  
 * 
 *
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
     * 
     *  Function: 
     * 
     *
     * Allow user to login our e2e Server using TCP Port
     *
     ** ----------------------------------------------------
     */


/**
   *
          [0] => LOG
          [1] =>g3t15
          [2] =>Server
          [3] =>192.168.0.2
          [4] =>58019
          [5] =>g3t777
          [6] =>03306009815%£%%&!
   */
var SendWelcomeOnTCP = function() {
        var sendDataTCP = snd.SendCommandTCP("WEL", "Server", SenderPubIP, SenderPvtIP, SenderPubPort, SenderPvtPort, "", "", "", "", "", "");
        log.Message(' - DSNT_TCP : ' + sendDataTCP)
        var EncryptedDataTCP = secure.Encrypt_AES_256(sendDataTCP)
        return EncryptedDataTCP


    }
    /** --------------------------------------------------
     *
     * Function: 
     * 
     *
     * Allow user to login our e2e Server using TCP Port
     *
     ** ----------------------------------------------------
     */
var SendErrorOnTCP = function() {

}


module.exports = {
    WelcomeOnTCP: SendWelcomeOnTCP,
    ErrorOnTCP: SendErrorOnTCP


}