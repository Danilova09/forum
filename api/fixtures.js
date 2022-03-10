const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Post = require("./models/Post");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [Amanda, Violette, Chris] = await User.create({
        name: 'Amanda',
        email: 'amanda@gmail.com',
        password: '1',
        token: '1',
    }, {
        name: 'Violette',
        email: 'vi@gmail.com',
        password: '2',
        token: '2',
    }, {
        name: 'Chris',
        email: 'chris@gmail.com',
        password: '3',
        token: '3',
    });

    await Post.create({
        user: Amanda,
        title: 'post 1',
        description: 'description of post 1',
        datetime: 'Thu Mar 10 2022 19:01:31 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_1.PNG'
    }, {
        user: Violette,
        title: 'post 2',
        description: 'description of post 2',
        datetime: 'Thu Mar 10 2022 19:02:32 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_2.PNG'
    }, {
        user: Chris,
        title: 'post 3',
        description: 'description of post 3',
        datetime: 'Thu Mar 10 2022 19:03:33 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_3.PNG'
    }, {
        user: Violette,
        title: 'post 4',
        description: 'description of post 4',
        datetime: 'Thu Mar 10 2022 19:04:34 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_4.PNG'
    }, {
        user: Violette,
        title: 'post 5',
        description: 'description of post 5',
        datetime: 'Thu Mar 10 2022 19:05:35 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_5.PNG'
    }, {
        user: Violette,
        title: 'post 6',
        description: 'description of post 6',
        datetime: 'Thu Mar 10 2022 19:06:36 GMT+0600 (Kyrgyzstan Time)',
        image: 'IMG_6.PNG'
    }, {
        user: Violette,
        title: 'post 7',
        description: 'description of post 7',
        datetime: 'Thu Mar 10 2022 19:07:37 GMT+0600 (Kyrgyzstan Time)',
        image: '',
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));