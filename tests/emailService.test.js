const sendEmail = require('../src/services/emailService');

describe('Email Service', () => {
    it('should send an email', async () => {
        const result = await sendEmail('damolathedev@gmail.com', 'Test Subject', 'Test Body');
        expect(result).toHaveProperty('accepted');
    });
});
