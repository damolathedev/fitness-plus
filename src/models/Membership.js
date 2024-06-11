const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MembershipSchema = new mongoose.Schema({
    membershipId: { type: String, unique: true, default: uuidv4 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    membershipType: { 
        type: String,
        required: true,
        enum: ['Annual Basic', 'Monthly Premium'],
    },
    startDate: { type: Date, required: true },
    dueDate: { type: Date },
    monthlyDueDate: { type: Date },
    totalAmount: { type: Number },
    monthlyAmount: { type: Number },
    email: { type: String, required: true },
    isFirstMonth: { type: Boolean, default: true },
}, { timestamps: true }); // Add timestamps option here

MembershipSchema.pre('save', function(next) {
    const now = new Date();

    // Calculate dueDate or monthlyDueDate based on membershipType
    if (this.membershipType === 'Annual Basic') {
        this.dueDate = new Date(now.setFullYear(now.getFullYear() + 1));
    } else if (this.membershipType === 'Monthly Premium') {
        this.monthlyDueDate = new Date(now.setMonth(now.getMonth() + 1));
    }

    // Calculate totalAmount and monthlyAmount based on isFirstMonth
    const annualMembershipFee = 100;  // Example annual membership fee
    const monthlyAddOnServiceFee = 20; // Example monthly add-on service fee

    if (this.isNew) {
        // For the first month, combine the annual fee and the first month's add-on service fee
        if (this.membershipType === 'Annual Basic') {
            this.totalAmount = annualMembershipFee + monthlyAddOnServiceFee;
        } else if (this.membershipType === 'Monthly Premium') {
            this.totalAmount = monthlyAddOnServiceFee;
        }
        this.monthlyAmount = monthlyAddOnServiceFee;
    } else {
        // For subsequent months, only the monthly add-on service fee is billed
        this.totalAmount = this.monthlyAmount = monthlyAddOnServiceFee;

        // Set isFirstMonth to false after the first month
        if (this.isFirstMonth) {
            this.isFirstMonth = false;
        }
    }

    next();
});

module.exports = mongoose.model('Membership', MembershipSchema);
