const stringSimilarity = require('string-similarity'),
    fs = require('fs');

//get primary data
const data = JSON.parse(fs.readFileSync('./data/TwitterTweetData10.js'));

//refine data
let nodes = data.map((tweet) => {
    let ref = {};
    ref.id = tweet.user.id;
    ref.label = tweet.user.screen_name;
    ref.text = tweet.text;
    if(tweet.retweeted_status && tweet.retweeted_status.quoted_status) ref.retweetedText = tweet.retweeted_status.quoted_status.text;
    ref.hashtags = tweet.entities.hashtags.map((hashtag => {delete hashtag.indices; return hashtag}));
    ref.x = Math.random(0, 100);
    ref.y = Math.random(0, 100);
    ref.size = 1;
    return ref;
});

let edges = [];
nodes.forEach(source => {
    nodes.forEach(target => {
        if(stringSimilarity.compareTwoStrings(source.text, target.text) > 0.8)
            edges.push({
                id: Math.random(0),
                source: source.id,
                target: target.id
            });
    });
});

//write refined data
fs.writeFileSync('./public/data/nodes.js', 'const nodes = '+JSON.stringify(nodes));
fs.writeFileSync('./public/data/edges.js', 'const edges = '+JSON.stringify(edges));
