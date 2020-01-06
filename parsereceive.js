/* ****************************************************** *
 *  Dated: 02-03-2107
 * 
 *  File:  e2e.js
 *  @author Majid H Khan <majid@g3t.uk.com>
 *  Company Group 3 Technology Ltd
 *
 *  Core file of VePost which is communicating with
 *  our e2e Server for initial setup and user login.  
 *  
 *  After user login it start communicating with it's 
 *  peers and do all processing or data communication
 *  with peers on UDP socket, which is dynamically 
 *  selected by VePost itself.
 *
 * ****************************************************** */

const enc = require('./enc')
const tcp = require('./tcp')
const udp = require('./udp')
var func = require('./functions')

/** *************  File Methods ************************ */

/* ****************************************************** *
 *
 *
 *  Function:  SendReceiveDataTCP(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on TCP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * ****************************************************** */
var SendReceiveDataTCP = function(DataRcv) {

    SenderUserName = DataRcv[1]
    SenderPubIP = DataRcv[3]
    SenderPubPort = DataRcv[4]
    var command = (DataRcv[0])
    return SwitchTCPCase(command)
}



/** **************************************************************** *
 *
 *
 *  Function:  SendReceiveDataUDP(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on UDP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * 
 *  E2E Communication
 *  when we receive data on UDP it is prefifed with 'Secret'
 *  and after that it all base64 encoded, we cann't straight away 
 *  decode it we need to remove 'Secret' from the data and then
 *  decode the data.   
 *  NOTE: It happens when we receive data from e2e server.
 *
 *  P2P Communication
 *  When p2p connection established then we dont get data prefixed
 *  with word 'Secret' it actually encrypted and encoded as base64
 *  that's why it is important to provide and else condition to pass
 *  data properly.
 *   
 ** **************************************************************** */


var SendReceiveDataUDP = function(Data) {

    var DataRcv = RemoveSecret(Data)
    DataRcv_UDP = SplitData(DataRcv)
    DataRcv = DataRcv_UDP[0]
    var command = DataRcv
    return SwitchUDPCase(command)

}


/* ****************************************************** *
 *
 *
 *  Function:  SwitchTCPCase(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on TCP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * ****************************************************** */
function SwitchTCPCase(command) {
    var response = null
    switch (command) {

        case "REJ":
            break;

        case "LOG":
            response = tcp.WEL_TCP()
            break;

        case "ERR":
            SEND_TCP_ERR(Decrypted)
            break;

        default:
            null

    }
    return response

}

/* ****************************************************** *
 *
 *
 *  Function:  SwitchUDPCase(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on TCP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * ****************************************************** */
function SwitchUDPCase(command) {
    var response = null
    switch (command) {

        case "LOG":
            response = udp.WEL_UDP()
            break;

        default:
            null;

    }
    return response

}


/* ****************************************************** *
 *
 * Function: getLoaclIP()
 * 
 * This method gets peer local IP from address family IPv4   
 * and returns back an IP address.
 * 
 * @return string IP Address
 * 
 * ****************************************************** */
var GetLocalIP = function() {
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    // console.log(addresses[0])
    MyPvtIP = addresses[0]
    return addresses[0]
}


/* ****************************************************** *
 *
 * Function: getLocalPort()
 * 
 * This method gets peer local Port and returns dynamically
 *  selected port.
 * 
 * @return string  Local Port
 * 
 * ****************************************************** */
var GetLocalPort = function() {
    var localClient = net.createServer()
    var myPort = localClient.listen(0, GetLocallIP)

    myPort = myPort.address().port
    MyPvtPort = myPort
    return myPort
}



/* ****************************************************** *
 *
 * Function: splitData(data)
 * @var data
 * 
 * This is a utility function which allows to split data 
 * using specific spliter, currently this is not dynamic
 * because we need this method at many places, so we just
 * passed data we need to split.
 *
 * @return returns an array of data. 
 *
 * ****************************************************** */
var SplitData = function(data) {
    var splited_data = ""
    splited_data = data.split(gSeparator)
    return splited_data

}

/* ****************************************************** *
 *
 * Function: removeSemiColon(data)
 * @var data
 * 
 * This is also autility function which allows to split  
 * data using  for specifically removing semicolon(;)
 *
 * @return returns an array of data. 
 *
 * ****************************************************** */
var RemoveSemiColon = function(data) {

    splited_data = data.split(";")
    return splited_data
}

/* ****************************************************** *
 *
 * Function: removeSemiColon(data)
 * @var data
 * 
 * This is also autility function which allows to split  
 * data using  for specifically removing semicolon(;)
 *
 * @return returns an array of data. 
 *
 * ****************************************************** */
var RemoveSecret = function(data) {
    var DataRcv = null
    if (data.indexOf("Secret") >= 0) {
        DataRcv = data.slice(6, data.length)
    } else {
        DataRcv = Data
    }

    return DataRcv
}

/* ****************************************************** *
 *
 *
 *  Function:  SendRecv_Data_TCP(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on TCP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * ****************************************************** */

module.exports = {
    SendReceiveDataTCP: SendReceiveDataTCP,
    SendReceiveDataUDP: SendReceiveDataUDP

}