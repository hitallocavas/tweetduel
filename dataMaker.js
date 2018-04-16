const lcs = require('node-lcs'),
    levenshtein = require('fast-levenshtein'),
    //stringSimilarity = require('string-similarity'),
    //sentiment = require('sentiment'),
    fs = require('fs');

//get primary data
const data = JSON.parse(fs.readFileSync('./data/data.json'));

/*/refine data old
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
        //if(stringSimilarity.compareTwoStrings(source.text, target.text) > 0.8)
        console.log(sentiment(source.text).score);
        if(sentiment(source.text).score == sentiment(target.text).score)
            edges.push({
                id: Math.random(0),
                source: source.id,
                target: target.id
            });
    });
});*/

//refine data (full)
/*let nodes = data.map((tweet) => {
    let ref = {};
    ref.id = tweet.id;
    ref.label = tweet.screenName+' rt('+tweet.retweetCount+')';
    ref.text = tweet.text;
    ref.x = Math.random(0, 100);
    ref.y = Math.random(0, 100);
    ref.size = 1;
    return ref;
});

let edges = [];
nodes.forEach(source => {
    nodes.forEach(target => {
        if(lcs(source.text, target.text).offset/levenshtein.get(source.text, target.text)>0.9){
            console.log(edges.length);
            edges.push({
                id: Math.random(0),
                source: source.id,
                target: target.id
            });
        }
    });
});*/

//refine data
let nodes = data.map((tweet) => {
    let ref = {};
    ref.id = tweet.id;
    ref.screenName = tweet.screenName;
    ref.retweetCount = tweet.retweetCount;
    ref.label = tweet.screenName+' rt('+tweet.retweetCount+')';
    ref.text = tweet.text;
    ref.x = Math.random(0, 100);
    ref.y = Math.random(0, 100);
    ref.size = 1;
    return ref;
});

/*let edges = [];
for(let i=0; i< 1000; ++i){
    for(let j=i; j<1000; ++j){
        if(lcs(nodes[i].text, nodes[j].text).offset/levenshtein.get(nodes[i].text, nodes[j].text)>0.9){
            console.log(edges.length);
            edges.push({
                id: Math.random(0),
                source: nodes[i].id,
                target: nodes[j].id
            });
        }
    }
}*/

let gephi = 'Source,Target\n';
for(let i=0; i< 100; ++i){
    for(let j=i; j<100; ++j){
        if(lcs(nodes[i].text, nodes[j].text).offset/levenshtein.get(nodes[i].text, nodes[j].text)>0.9){
            gephi = gephi+nodes[i].label+','+nodes[j].label+'\n';
        }
    }
}


//write refined data
//fs.writeFileSync('./public/data/nodes.js', 'const nodes = '+JSON.stringify(nodes));
//fs.writeFileSync('./public/data/edges.js', 'const edges = '+JSON.stringify(edges));
fs.writeFileSync('./public/data/gephi100.csv', gephi);
