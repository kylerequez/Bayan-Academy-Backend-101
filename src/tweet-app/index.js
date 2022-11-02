const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const mongoPort = 27017;
const appName = "tweetApp";
mongoose.connect(`mongodb://localhost:${mongoPort}/${appName}`)
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log(`Error: ${err}`);
    });

const tweetSchema = new mongoose.Schema({
    username: String,
    tweet: String
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Display - DONE
app.get('/tweets', async(req, res) => {
    const tweets = await Tweet.find({});
    res.render('tweets/index', {
        tweets
    });
});

// Display Create Form - DONE
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new');
});

// Add Tweet - DONE
app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const newTweet = new Tweet({
        username: username,
        tweet: tweet
    });
    newTweet.save();
    res.redirect('/tweets');
});

// View Tweet - DONE
app.get('/tweets/:_id', async(req, res) => {
    const { _id } = req.params;
    const tweet = await Tweet.findOne({ _id: _id }).exec();
    console.log(tweet);
    res.render('tweets/show', {
        tweet
    });
});

// Update Tweet - DONE
app.get('/tweets/:_id/edit', async(req, res) => {
    const { _id } = req.params;
    const tweet = await Tweet.findOne({ _id: _id }).exec();
    res.render('tweets/edit', {
        tweet
    });
});

//  Update tweet - DONE
app.patch('/tweets/:_id', (req, res) => {
    const { _id } = req.params;
    const tweet = req.body.tweet;
    const updatedTweet = Tweet.findOneAndUpdate({ _id: _id }, { $set: { tweet: tweet } }).exec();
    res.redirect('/tweets');
});

// Delete - DONE
app.delete('/tweets/:_id', async(req, res) => {
    const { _id } = req.params;
    const deletedTweet = Tweet.findOneAndDelete({ _id: _id }).exec();
    res.redirect('/tweets');
});

const port = 1888;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);

});