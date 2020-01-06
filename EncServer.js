/** ----------------------------------------
 * 
 *  SERVER TCP PORT
 * 
 ** ----------------------------------------
 */

const os = require('os')
const net = require('net')
const dgram = require("dgram")
const decrypt = require('./decrypt')
const func = require('./functions')
const enc = require('./enc')
const log = require('./log')

var message = null

e2e_config = {
    //e2e_server: "www.e2ephone1.net",
    e2e_server: "192.168.20.21",
    e2e_TCPPort: 11149,
    e2e_UDPPort: 11148,
}

/** ----------------------------------------
 * 
 *  SERVER TCP PORT
 * 
 ** ----------------------------------------
 */
const encServer = net.createServer()

encServer.on('connection', HandleConnection);
encServer.listen(e2e_config.e2e_TCPPort, function() {

    console.log(`TCP LISTENING =>       IP: ${e2e_config.e2e_server} PORT: ${e2e_config.e2e_TCPPort}\n`)
});

/** ----------------------------------------
 *
 *  TCP PORT Connection and Data Handling 
 * 
 ** ----------------------------------------
 */
function HandleConnection(socketTCP) {
    var remoteAddress = socketTCP.remoteAddress + ":" + socketTCP.remotePort
    log.Message(remoteAddress);

    socketTCP.on('data', onSocketData);
    socketTCP.once('close', onSocketClose);
    socketTCP.on('error', onSocketError);

    function onSocketData(data) {
        message = ' - DRCV_TCP : ' + decrypt.Decrypt_TCP(data)
        log.Message(message);

        var response = func.ReceiveCommand(decrypt.Decrypt_TCP(data), null, null, "TCP")
        socketTCP.write(response);

    }

    function onSocketClose() {
        console.log(' CLS_TCP from %s closed', remoteAddress);
    }

    function onSocketError(err) {
        console.log(' ERR_TCP %s error: %s', remoteAddress, err.message);
    }
}

/** ----------------------------------------
 * 
 *  SERVER UDP PORT
 * 
 ** ----------------------------------------
 */

const socketUDP = dgram.createSocket('udp4');

socketUDP.on('error', (err) => {
    console.log(` - SRV_ERR_UDP error:\n${err.stack}`);
    socketUDP.close();
});

socketUDP.on('message', (msg, rinfo) => {
    loginfo = ` - DRCV_UDP : ${decrypt.Decrypt_UDP(msg)} FROM ${rinfo.address}:${rinfo.port}`
    log.Message(loginfo)

    HandelData(msg, e2e_config.e2e_UDPPort)

});

socketUDP.on('listening', () => {
    var address = socketUDP.address();
    message = ` - UDP Socket  listening ${address.address}:${address.port}`
    log.Message(message);
});

//socketUDP.bind(e2e_config.e2e_UDPPort, e2e_config.e2e_server);

/** ----------------------------------------
 * 
 *  SERVER UDP PORT
 * 
 ** ----------------------------------------
 */
function HandelData(data, port) {
    var response = func.ReceiveCommand(decrypt.Decrypt_UDP(data), null, port, "UDP")
    socketUDP.send(response, 0, response.length, e2e_config.e2e_UDPPort, e2e_config.e2e_server, function(err, byte) {})

}
/** ----------------------------------------
 * 
 * 
 ** ----------------------------------------
 */
function fullDateTime() {
    var d = new Date();
    var n = d.toLocaleString([], { hour12: true });
    consloe.log(n)
}