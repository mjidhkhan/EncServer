"use strict"

/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */

var Client = function(clientName, clientPublicIP, clientPublicPort, clientPrivateIP, clientPrivatePort) {

    this.clientName = clientName
    this.clientPublicIP = clientPublicIP
    this.clientPublicPort = clientPublicPort
    this.clientPtrivateIP = clientPrivateIP
    this.clientPrivatePort = clientPrivatePort
}

module.exports = {
    Client: Client
}