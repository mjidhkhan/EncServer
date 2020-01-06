//const enc = require('./enc')


/**
 * The procedure below written according to VePhone Application
 * Command                                      => String
 * Sender                                       => String
 * Receiver                                     => String
 * Data1            (optional)                  => String
 * Data2            (optional)                  => String
 * Data3            (optional)                  => String
 * Data4            (optional)                  => String
 * Data5 PeerHost   (optional)                  => String
 * Data6 PeerPort   (optional)                  => String
 * Data7            (optional)                  => String
 * Data8            (optional)                  => String
 * Data9            (optional)                  => String
 * Data10           (optional)                  => String
 */
/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
var SendCommandTCP = function(Command, Sender, Receiver, Data1, Data2, Data3, Data4, Data5) {

        var s = ''

        s = SecretCode + Command + gSeparator + Sender + gSeparator + Receiver
            /**
             * Checking Data input
             * */

        if (Data1) { // has some data
            s = s + gSeparator + Data1

        } else {
            s = s + gSeparator + ":"
        }
        if (Data2) { // has some data
            s = s + gSeparator + Data2

        } else {
            s = s + gSeparator + ":"
        }
        if (Data3) { // has some data
            s = s + gSeparator + Data3

        } else {
            s = s + gSeparator + ":"
        }
        if (Data4) { // has some data
            s = s + gSeparator + Data4

        } else {
            s = s + gSeparator + ":"
        }
        if (Data5) { // has some data
            s = s + gSeparator + Data5

        } else {
            s = s + gSeparator + ":"
        }

        s = s + gEndOfPacket //+ EndOfData


        return s
    }
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */

var SendCommandUDP = function(Command, Sender, Receiver, Data1, Data2, Data3, Data4, Data5) {

    var s = ''

    s = SecretCode + Command + gSeparator + Sender + gSeparator + Receiver
        /**
         * Checking Data input
         * */

    if (Data1) { // has some data
        s = s + gSeparator + Data1

    } else {
        s = s + gSeparator + ":"
    }
    if (Data2) { // has some data
        s = s + gSeparator + Data2

    } else {
        s = s + gSeparator + ":"
    }
    if (Data3) { // has some data
        s = s + gSeparator + Data3

    } else {
        s = s + gSeparator + ":"
    }
    if (Data4) { // has some data
        s = s + gSeparator + Data4

    } else {
        s = s + gSeparator + ":"
    }
    if (Data5) { // has some data
        s = s + gSeparator + Data5

    } else {
        s = s + gSeparator + ":"
    }

    s = s + gEndOfPacket //+ EndOfData

    return s
}

module.exports = {
    SendCommandTCP: SendCommandTCP,
    SendCommandUDP: SendCommandUDP
}