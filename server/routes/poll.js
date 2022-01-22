var express = require('express');
var {poll} = require('../models/poll');
var router = express.Router();

router.get('/poll', function (req, res, next){
    poll.then((poll) => {
        var body = {
            pollName: poll.pollName,
            options: poll.options,
            result: poll.getJsonSafeResults(),
            publicKey: poll.getJsonSafePubKey()
        }
        return res.status(200).json(body);
    });
});

router.post('/vote', function (req, res, next){
    poll.then((poll) =>{
        var rawVote = req.body.vote;
        var result = poll.addVote(rawVote);
        console.log(result)
        if(typeof result !== 'undefined'){
            return res.status(200).json({msg: 'OK'});
        } else {
            return res.status(400).json({msg: 'bad'});
        }
    });
});

router.get('/results', function(req, res, next){
    poll.then((poll) => {
        var results = [];
        var rawResults = poll.getJsonSafeResults();
        poll.options.forEach((item, index) => {
            results.push({
                optionName: item.optionName,
                result: rawResults[index]
            });
        });
        
        var body = {
            results: results
        }
        return res.status(200).json(body);
    });
});

module.exports = router;