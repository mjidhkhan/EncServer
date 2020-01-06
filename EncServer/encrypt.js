/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
const crypto = require('crypto')


/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
const secure_config = {

    // new encryption
    salt_key: new Buffer.from('7pX&TD3Sw3qmCs*%N!@pmp$').toString('base64'),
    salt_iv: new Buffer.from('R%Wx9kZ£&f').toString('base64'),


};
/** --------------------------------------------------
 *
 *  
 * 
 *
 * 
 *
 ** ----------------------------------------------------
 */
module.exports = {
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    Encrypt_AES_256: function(plainData) {
        //console.log(secure_config.salt_key+ " IV: "+ secure_config.salt_iv)
        //console.log('SendCommand TCP:' + plainData);
        const cipher = crypto.createCipheriv('aes-256-cbc', secure_config.salt_key, secure_config.salt_iv);
        var encrypted = cipher.update(plainData, 'utf8')
        var encryptdata = Buffer.concat([encrypted, cipher.final()]).toString('base64')
        return encryptdata;
    },
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    Decrypt_AES_256: function(encData) {

        const decipher = crypto.createDecipheriv('aes-256-cbc', secure_config.salt_key, secure_config.salt_iv);
        var decrypted = decipher.update(encData, 'base64');
        decryptdata = Buffer.concat([decrypted, decipher.final()]);
        return decryptdata
    },
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    Encode_Base_64: function(plainData) {

        var buffer = new Buffer.from(plainData, 'utf8');
        var encoded = buffer.toString('base64');

        return encoded

    },
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    Decode_Base_64: function(encodedData) {
        var buffer = new Buffer.from(encodedData, 'base64');
        var decoded = buffer.toString('utf8');

        return decoded

    },
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    ALL_CIPHER: function() {
        const ciphers = crypto.getCiphers();
        return ciphers
    },
    /** --------------------------------------------------
     *
     *  
     * 
     *
     * 
     *
     ** ----------------------------------------------------
     */
    HASH_SHA1: function(data) {
        var generator = crypto.createHash('sha1');
        generator.update(data)
        return generator.digest('hex')
    }

}