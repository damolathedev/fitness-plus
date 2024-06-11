require('dotenv').config()
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const membershipRoutes = require('../src/routes/membershipRoutes');

const app = express();
app.use(express.json());
app.use('/api', membershipRoutes);

describe('Membership API', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(process.env.MONGOOSE_URI);
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
        } catch (error) {
            console.log(error);
        }
    });

    it('should create a new membership', async () => {
        let res;
        try {
            res = await request(app)
                .post('/api')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    membershipType: 'Annual Basic',
                    startDate: '2023-06-01',
                    dueDate: '2024-06-01',
                    totalAmount: 1200,
                    email: 'shade@example.com',
                    isFirstMonth: true
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
        } catch (error) {
            console.log(error);
        }
    });
});
