const cron = require('node-cron');
const Membership = require('../models/Membership');
const sendEmail = require('./emailService');
const generateInvoiceLink = require('../utils/generateInvoiceLink');

const cronJob = cron.schedule('0 0 * * *', async () => {
    const today = new Date();
    const upcomingMemberships = await Membership.find({
        $or: [
            { dueDate: { $gte: today, $lt: new Date(today).setDate(today.getDate() + 7) } },
            { monthlyDueDate: { $gte: today, $lt: new Date(today).setDate(today.getDate() + 7) } },
        ]
    });

    for (const membership of upcomingMemberships) {
        if (membership.isFirstMonth) {
            const reminderDate = new Date(membership.startDate);
            reminderDate.setDate(reminderDate.getDate() + 7);
            if (today >= reminderDate) {
                const invoiceLink = generateInvoiceLink(membership.membershipId);
                const subject = `Fitness+ Membership Reminder - ${membership.membershipType}`;
                const text = `Dear ${membership.firstName},\n\nYour first payment for your ${membership.membershipType} membership is due soon. The total amount due is ${membership.totalAmount}.\n\nInvoice link: ${invoiceLink}\n\nThank you,\nFitness+`;
                await sendEmail(membership.email, subject, text);
                membership.isFirstMonth = false;
                await membership.save();
            }
        } else {
            const invoiceLink = generateInvoiceLink(membership.membershipId);
            const subject = `Fitness+ Membership Reminder - ${membership.membershipType}`;
            const text = `Dear ${membership.firstName},\n\nYour monthly payment for your ${membership.membershipType} membership is due soon. The amount due is ${membership.monthlyAmount}.\n\nInvoice link: ${invoiceLink}\n\nThank you,\nFitness+`;
            await sendEmail(membership.email, subject, text);
        }
    }
});

module.exports = cronJob;
