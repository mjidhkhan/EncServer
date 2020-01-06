const os = require('os')
const net = require('net')
const enc = require('./enc')
const sr = require('./parsereceive')


const interfaces = os.networkInterfaces()
    /* ---------------------------------------------- */

/* ****************************************************** *
 *
 *
 *  Function:  SendRecv_Data_UDP(DataSnt)
 *  @var DataSnt
 *
 *  Module for nodejs which works only with VePost App
 *  Allows you to send and receive data on UDP. It  
 *  accepts one parameter DataSnt which is encrypted 
 *  using AES-256-cbc of nodejs crypto module
 *
 *
 * ****************************************************** */

var ReceiveCommand = function(data, address, port, type) {
    if (type == "TCP") {
        if (data.indexOf("Secret") >= 0) {
            DataRcv = data.slice(6, data.length)
        } else {
            DataRcv = data
        }

        var DataRcv_TCP = SplitData(DataRcv)

        SenderPubIP = address
        SenderPubPort = port
        SenderUserName = DataRcv_TCP[1]
        SenderPvtIP = DataRcv_TCP[3]
        SenderPvtPort = DataRcv_TCP[4]

        return sr.SendReceiveDataTCP(DataRcv_TCP)
    } else if (type == "UDP") {
        var res = sr.SendReceiveDataUDP(data)
        return res
    }
}

/* ****************************************************** *
 *
 * Function: PROCESS_ERR()
 * 
 * 
 * This method process ERR command sent from e2e. 
 * Sends Two MSGFROMP to it's peer, and after that
 * Inform e2e using LA command and follow with 8
 * MSGFROMP with in four seconds.
 *
 * ****************************************************** */
/*
function PROCESS_ERR() {
    for (var i = 0; i < 2; i++) {
        MSGFROMP()
        console.log("Message FROMP ONE - after ERR :" + i)
    }

    // Send LA on TCP
    LA()
    // MSGFROMP after LA
    var LACounter = 0;
    var LAInterval = setInterval(function () {

        if (LACounter >= 7) {
            clearInterval(LAInterval);
        }
        LACounter++;
        MSGFROMP()
        console.log('MSGFROMP - after LA :=> ' + LACounter);
    }, 500);
}
*/

/* ****************************************************** *
 *
 * Function: TCP_WEL(Decrypted)
 * 
 * This method process TCP WEL command sent from e2e. 
 * When a client will receive this command it will
 * GUI and making System ready stuff.
 *
 * ****************************************************** */

var SendWelcomeOnTCP = function(Decrypted) {
    DataRcv_WEL = Decrypted.split("£)0*&$")
    TCPConnected = true
    DataRcv_WEL_Split = DataRcv_WEL[7].toString().split("^")
        //var DataRcv_WEL_Split2 = DataRcv_WEL[3].toString().split("<")
    client.Client(DataRcv_WEL[2], DataRcv_WEL_Split[6], DataRcv_WEL_Split[7], MyPvtIP, MyPvtPort)

    //console.log(DataRcv_WEL_Split)
    /** ---------------------------------------
     * Make user Login and Opne Lock
     */
    document.getElementById('button-files').click()
    document.getElementById('login-status').innerHTML = '<i class ="fa fa-unlock color-red" aria-hidden="true"></i>'
        /**
         * Hide Login Page and Show more pages after login
         */
    $('#login-page').hide()
    $('#after-login').show()
        /** --------------------------------------- */
}

/* ****************************************************** *
 *
 * Function: TCP_ERR(Decrypted)
 * 
 * 
 * This method processTCP ERR command from e2e to get  
 * latestinformation about peer while continuing its 
 * process of Sending Two MSGFROMP to it's peer, and 
 * after that Inform e2e using LA command and follow 
 * with 8 MSGFROMP with in four seconds.
 *
 * ****************************************************** */
var SendErrorOnTCP = function(Decrypted) {
    var ERRresponse = splitData(Decrypted)
    var ERR_Split = removeSemiColon(ERRresponse[3])
    peerUserName = ERR_Split[0]
    peerPubIP = ERR_Split[2]
    peerPubPort = ERR_Split[3]

    for (var i = 0; i < 2; i++) {
        MSGFROMP()
        console.log("Message FROMP TWO -  after ERR :" + i)
    }

    // send LA
    LA()
        // send MSGFROMP after LA for 8 times
    var LAInterval = setInterval(function() {
        if (LACounter >= 7) {
            clearInterval(LAInterval);
        }
        LACounter++;
        MSGFROMP()
        console.log('MSGFROMP - after LA :=> ' + LACounter);

    }, 500);
}

/* ****************************************************** *
 *
 * Function: ERR_TO_SERVER()
 * 
 * 
 * This method sends ERR command to e2e.  
 * and after sends 8 MSGFROMP with in 
 * four seconds.
 *
 * ****************************************************** */
var ERR_TO_SERVER = function() {
    //IsOutGoing=true
    var encDataERR = ERR_SND()
    serverUDP.send(encDataERR, 0, encDataERR.length, e2e_config.e2e_UDPPort, e2e_config.e2e_server, function(err, byte) {
        console.log("ERR Sent\n")
    })

    var ERRcounter = 0;
    var ERRInterval = setInterval(function() {
        if (ERRcounter >= 7) {
            clearInterval(ERRInterval);
        }
        ERRcounter++;
        var msgFROMP = MSGFROMP()
        console.log("MAGFROMP sent - after ERR: " + ERRcounter)
    }, 500);
}

/* ****************************************************** *
 *
 * Function: UDP_WEL()
 * 
 * This method records Login using UDP  
 * and turns IsLoggedIn to true
 * 
 * ****************************************************** */
var UDP_WEL = function() {
    IsLoggedIn = true

    // serverUDP.bind(MyPvtPort)
    console.log("UDP - WEL")
        // Do WelCome Stuff
}

/* ****************************************************** *
 *
 * Function: OKCHAT(Decrypted)
 * 
 * This method process in response of OKCHAT record current  
 * information about peer sends two MSGFROMP and inform
 * e2e that going to start chat with peer.
 * 
 * ****************************************************** */
var OKCHAT = function(Decrypted) {
    console.log("OKCHAT  Received : \n")
    console.log("Rr\n")
    DataRcv_OKCHAT = splitData(Decrypted)
    peerPubIP = DataRcv_OKCHAT[4]
    peerPubPort = DataRcv_OKCHAT[5]
        /** ----------------------------------
         * SEND TWO MSGFROMP- AFTER [OKCHAT]
         */
    for (var i = 0; i < 2; i++) {
        MSGFROMP()
    }

    NOWCHAT_SND()

}


/* ****************************************************** *
 *
 * Function: NOCHAT_RCV()
 * 
 * This method process in NOCHAT command which shows that  
 * peer is not available to chat
 * 
 * ****************************************************** */
var NOCHAT_RCV = function() {
    console.log("NOCHAT  Received: ")
    $('#connect-response').empty()
    $('#connect-response').append("Other Party unavailable")
}

/* ****************************************************** *
 *
 * Function: MSGFROMP()
 * 
 * This method process and send MSGFROMP command to peer. 
 * 
 * ****************************************************** */
var MSGFROMP = function() {
        var sendDataUDP = cmd.SendCommandUDP("MSGFROMP", client.clientName, "Server", peerUserName, "MSG:", "", "", "", peerPubIP, peerPubPort)
        var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
        serverUDP.send(EncryptedDataUDP, 0, EncryptedDataUDP.length, peerPubPort, peerPubIP, function(err, byte) {
            console.log("MASFROMP-ONE -after OKCHAT: ")
        })

    }
    /* ****************************************************** *
     *
     * Function: NOWCHAT_SND()
     * 
     * This method process NOWCHAT Command and inform e2e  
     * it is starting a process to chat with peer following
     * 8 MSGFROMP commands to peer in 4 seconds. 
     * 
     * ****************************************************** */
var NOWCHAT_SND = function() {
        var sendDataUDP = cmd.SendCommandUDP("NOWCHAT", client.clientName, "Server", DataRcv_OKCHAT[3], MyPvtIP, MyPvtPort, "")
        var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)

        serverUDP.send(EncryptedDataUDP, 0, EncryptedDataUDP.length, e2e_config.e2e_UDPPort, e2e_config.e2e_server, function(err, byte) {
            console.log("NOWCHAT Sent ")
        })
        var NowChatCounter = 0;
        var NowChatInterval = setInterval(function() {
            if (NowChatCounter >= 7) {
                clearInterval(NowChatInterval);
            }
            MSGFROMP()
            console.log("NOWCHAT Sent :" + NowChatCounter)
            NowChatCounter++;

        }, 500);

        setTimeout(ERR_TO_SERVER, 8000);

    }
    /* ****************************************************** *
     *
     * Function: ERR_SND()
     * 
     * This method process ERR command when see that peer is   
     * not responding from its last known location.
     *
     * @return encrypted string  
     * ****************************************************** */
var ERR_SND = function() {
    var UserNameNumberAndPs = client.clientName + ";" + "03306009815" + ";" + client.clientPublicIP + ";" + client.clientPublicPort + ";" + MyPvtIP + ";" + MyPvtPort
    var sendDataUDP = cmd.SendCommandUDP("ERR", UserNameNumberAndPs, "Server", DataRcv_OKCHAT[3], "", "", "")
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    return EncryptedDataUDP

}

/* ****************************************************** *
 *
 * Function: WACHAT_SND()
 * 
 * This method process in WACHAT command receoved from e2e 
 * encrypt the command and returne encrypted string.
 *
 * @return encrypted string  
 * 
 * ****************************************************** */
var WACHAT_SND = function() {
    var sendDataUDP = cmd.SendCommandUDP("WACHAT", client.clientName, "Server", DataRcv_OKCHAT[3], MyPvtIP, MyPvtPort, "")
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    return EncryptedDataUDP
}


/* ****************************************************** *
 *
 * Function: WACHAT_RCV()
 * 
 * This method process in WACHAT command stores information  
 * and start sending MSGFROMP command to peer, it sends 8
 * MSGFROMP to it's peer in 4 seconds.
 * 
 * ****************************************************** */
var WACHAT_RCV = function(Decrypted) {
    var WAChat = splitData(Decrypted)
    peerPubIP = WAChat[4]
    peerPubPort = WAChat[5]
    var WAChatCounter = 0;
    var WAChatInterval = setInterval(function() {
        if (WAChatCounter >= 7) {
            clearInterval(WAChatInterval);
        }
        WAChatCounter++;
        MSGFROMP()
        console.log("MSGFROMP Sent - after WACHAT-Received from Server :=> " + WAChatCounter)
    }, 500);

}

/* ****************************************************** *
 *
 * Function: LA()
 * 
 * This method sends in LA command to e2e when unable to  
 * connect with peer.
 * 
 * ****************************************************** */
var LA = function() {
    var sendDataUDP = cmd.SendCommandUDP("LA", client.clientName, "Server", MyPvtIP, MyPvtPort, peerUserName, "")
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    serverUDP.send(EncryptedDataUDP, 0, EncryptedDataUDP.length, e2e_config.e2e_UDPPort, e2e_config.e2e_server, function(err, byte) {
        console.log("LA SENT TO SERVER UDP: ")
    })
}

/* ****************************************************** *
 *
 * Function: CLIENT_CONNECTED()
 * 
 * This method sends TEXT command to its peer as to  
 * acknologe the peer, when connection is established.
 * otherwise it sends  MSGFROMP to its peer.
 * 
 * ****************************************************** */
var CLIENT_CONNECTED = function() {
    if (IsInConnectionWithPeer) {
        for (var i = 0; i <= 1; i++) {
            TEXT()
        }
        EMPTY()
    } else {
        MSGFROMP()
        IsInConnectionWithPeer = true
    }
}

/* ****************************************************** *
 *
 * Function: TEXT()
 * 
 * This method built TEXT command and sends to it's peer.   
 * 
 * ****************************************************** */
var TEXT = function() {
    var sendDataUDP = cmd.SendCommandUDP("TEXT", client.clientName, peerUserName, "Hello from VEPOST £)0*&$", "", "", peerPubIP, peerPubPort)
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    serverUDP.send(EncryptedDataUDP, 0, EncryptedDataUDP.length, peerPubPort, peerPubIP, function(err, byte) {})
}


/* ****************************************************** *
 *
 * Function: CHAT_WITH_CLIENT(Decrypted)
 * 
 * This is demo method starts when connection with peer  
 * successfully established and starts chat process,which
 * is basically a simple text chat. IF connection is built
 * and peers are not talking we use EMPTY command to keep
 * peers connected.
 * 
 * ****************************************************** */
var CHAT_WITH_CLIENT = function(Decrypted) {
    if (InChat) {
        var s = Decrypted.slice(6, Decrypted.length)
        var d = splitData(s)
        var rcv = d[3]
        console.log(rcv)
        if (rcv != '') {
            $('#msgSender').append(messageReceiver(rcv))
        } else {
            // send empty packet to keep connection live
            EMPTY()
        }
    } else {
        InChat = false
            // send empty packet to keep connection live
        EMPTY()

    }

}


/* ****************************************************** *
 *
 * Function: EMPTY()
 * 
 * This method process in EMPTY commands to keep connection 
 * alive if it is idle while in text chat.
 * 
 * ****************************************************** */
var EMPTY = function() {
    var sendDataUDP = cmd.SendCommandUDP("EMPTY", client.clientName, peerUserName, " 0*&$", " ", " ", peerPubIP, peerPubPort)
    var EncryptedDataUDP = secure.Encrypt_AES_256(sendDataUDP)
    serverUDP.send(EncryptedDataUDP, 0, EncryptedDataUDP.length, peerPubPort, peerPubIP, function(err, byte) {})
}

/* ****************************************************** *
 * ****************************************************** */



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
var IPv4 = function(){
  // var IPv4 = (function(){
  var interfaces = require('os').networkInterfaces(), IP
  for (var iface in interfaces) {
      interfaces[iface].forEach(function(addr) {
          if (addr.family == 'IPv4') {
              IP = addr.address;
          }
     })
  }
  return IP;
}
* ******************************************************* */


/* ****************************************************** *
 * ****************************************************** */


/** --------------------------------------------------------------- --
 *
 *  Module Exports
 *   
 ** ----------------------------------------------------------------- */
module.exports = {
    ReceiveCommand: ReceiveCommand,
    RemoveSemiColon: RemoveSemiColon,
    RemoveSecret: RemoveSecret,
    SplitData: SplitData,
    LocalPort: GetLocalPort,
    LocalIP: GetLocalIP

}