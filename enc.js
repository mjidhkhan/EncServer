/** ****************************************************** *
 *
 * Public Accessable variables
 * This file holds only public accesable variables
 * for our VePost app. These variables can be access
 * from any where in the project.
 * Purpose of this file is to seperate out all variables
 * and calling functions or modules from any where.
 *
 *
 ********************************************************* */
// GLOBAL REQUIRE

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
global.gEndOfPacket = "%£%%&!"
global.gSeparator = "£)0*&$"
global.EndOfData = "^&*$|/"
global.SecretCode = "Secret"
global.Password = "%^hc)("

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */

global.Rcv_CMD_TCP = null
global.RCV_CMD_UDP = null
global.clientPubIP = null
global.clientPubPort = null
global.clients = new Array()

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */

global.DataRcv_WEL = null
global.DataRcv_WEL_Split = null /** second level split of WEL */
global.Decrypted_UDP = null
global.Decrypted_TCP = null
global.DataRcv_UDP = null
global.TCPConnected = false
global.DataRcv = null;
global.options = []

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
global.SenderPubIP = null
global.SenderPubPort = null
global.SenderUserName = null
global.SenderPvtIP = null
global.SenderPvtPort = null

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
global.IsLoggedIn = false
global.DataRcv_OKCHAT = null
global.IsOutGoing = true
global.IsInConnectionWithPeer = false