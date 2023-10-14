const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/User');


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id : userOneId,
    username : 'dhruv',
    email : 'dhruv@gmail.com',
    password : 'dhruv1234'
}


beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

afterEach(() => {
    console.log('afterEach');
})

test('Should signup a new user', async () => {

    const response = await request(app).post('/api/auth/register').send({
        username : 'Himanshu',
        email : 'himanshu@gmail.com',
        password : 'himanshu1234'
    }).expect(201);

    // // Assert that the database was changed correctly
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();

    // // This below assertion is for checking that we are not storing plain text password in the database
    expect(user.password).not.toBe('himanshu1234');
})








