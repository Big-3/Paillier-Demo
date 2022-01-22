const Option = require('./option');
const bc = require('bigint-conversion');
const { generatePaillierKeys } = require('@big3/ciber-modules');

class Poll{
    constructor(pollName, options, privateKey){
        this.pollName = pollName;
        this.options = options;
        this.privateKey = privateKey;
        this.result = this.privateKey.getPubKey().encrypt(0n);
    }

    static async init() {
        var option1 = new Option('opcio 1', 1n);
        var option2 = new Option('opcio 2', 10n);
        var option3 = new Option('opcio 3', 100n);
        var option4 = new Option('opcio 4', 1000n);

        var privKey = await generatePaillierKeys();

        var poll = new Poll('Votació de Prova',
        [option1, option2, option3, option4], privKey);
        return poll;
    }

    addVote(safeVote){
        var cvote = bc.hexToBigint(safeVote);
        this.result = this.privateKey.getPubKey().add([this.result, cvote]);
        console.log(`Added Vote.`);
        return this.result;
    }

    getJsonSafeResults(){
        var safeRawResults = this.privateKey.decrypt(this.result).toString();
        var safeResults = [];

        this.options.forEach((item, index) => {
            var vote = safeRawResults[(safeRawResults.length-1) - index];
            if(typeof vote !== 'undefined'){
                safeResults.push(parseInt(vote));
            } else {
                safeResults.push(0);
            }
        });

        return safeResults;
    }

    getJsonSafePubKey(){
        var rawPubKey = this.privateKey.getPubKey();
        var pubKey = {
            n: bc.bigintToHex(rawPubKey.getN()),
            n2: bc.bigintToHex(rawPubKey.getN2()),
            g: bc.bigintToHex(rawPubKey.getG())
        }
        return pubKey;
    }
}


var poll = Poll.init();

module.exports = {
    poll
};