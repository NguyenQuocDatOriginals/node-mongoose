const mongoose = require('mongoose');

const Nations = require('./models/nations');

const url = 'mongodb://localhost:27017/football';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    Nations.create({
        name: 'Qatar',
        description: 'Home Team'
    })
    .then((nation) => {
        console.log(nation);
        
        return Nations.findByIdAndUpdate(nation._id, {
            $set: { description: 'WC 2022'}
        },{
            new: true
        })
        .exec();
    })
    .then((nation) => {
        console.log(nation);
        
        nation.comments.push({
            rating: 5,
            comment: 'Please give me beer!',
            author: 'Hacker'
        });
        
        return nation.save();
    })
    .then((nation) => {
        console.log(nation);
        
        return Nations.deleteOne({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });        
        
});