const secure = require('./encrypt')
module.exports = {

    /** ----------- TCP DATA ------------------
     * Decryption process on TCP
     *  1- Remove Secret from Data Receive 
     *  2- Decode Base-64 
     *  3- Decrypt using ASE-256-cbc
     *  3- Decode Base-64
     *  4- Result: Plain text
     ** ----------- TCP DATA ------------------
     */
    Decrypt_TCP: function(Data) {
        var Data_rcv = secure.Decode_Base_64(Data)
        var Decrypt = secure.Decrypt_AES_256(Data_rcv)
        var Decrypted = secure.Decode_Base_64(Decrypt)

        return Decrypted;
    },


    /** ----------- UDP DATA ------------------
     * Decryption process on UDP
     *  1- Remove Secret from Data Receive 
     *  2- Decode Base-64 
     *  3- Decrypt using ASE-256-cbc
     *  3- Decode Base-64
     *  4- Result: Plain text
     ** ----------- UDP DATA ------------------
     */
    Decrypt_UDP: function(encData) {
        var Data_rcv = secure.Decode_Base_64(encData)
        var Decrypt = secure.Decrypt_AES_256(Data_rcv)
        var Decrypted = secure.Decode_Base_64(Decrypt)

        return Decrypted
    },

    /** ----------- TCP DATA ------------------ 
     * Decryption process on TCP
     *  1- Remove Secret from Data Receive 
     *  2- Decode Base-64 
     *  3- Decrypt using ASE-256-cbc
     *  3- Decode Base-64
     *  4- Result: Plain text
     ** ----------- TCP DATA ------------------
     */
    Decrypt_TCP_Server: function(Data) {
        var Data_rcv = secure.Decode_Base_64(Data)
        var Decrypt = secure.Decrypt_AES_256(Data_rcv)
        var Decrypted = secure.Decode_Base_64(Decrypt)


        return Decrypted;
    },
    /** ----------- UDP DATA ------------------ 
     * Decryption process on UDP
     *  1- Remove Secret from Data Receive 
     *  2- Decode Base-64 
     *  3- Decrypt using ASE-256-cbc
     *  3- Decode Base-64
     *  4- Result: Plain text
     ** ----------- UDP DATA ------------------ 
     */
    Decrypt_UDP_Server: function(encData) {
        var Data_rcv = secure.Decode_Base_64(encData)
        var Decrypt = secure.Decrypt_AES_256(Data_rcv)
        var Decrypted = secure.Decode_Base_64(Decrypt)

        return Decrypted
    }

}