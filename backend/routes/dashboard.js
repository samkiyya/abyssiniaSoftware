const express = require('express');
const router = express.Router();

// Import each model separately
const AboutCompanies = require('../models/about');
const Apartments = require('../models/apartment');
const Blogs = require('../models/blog');
const Bookings = require('../models/booking');
const Categories = require('../models/category');
const Contacts = require('../models/contact');
const FAQs = require('../models/faq');
const Galleries = require('../models/gallery');
const Orders = require('../models/order');
const Partners = require('../models/partner');
const Products = require('../models/product');
const Services = require('../models/service');
const Sliders = require('../models/slider');
const Testimonies = require('../models/testimony');
const Users = require('../models/user');

router.get('/', async (req, res) => {
    try {
        // Count rows for each table
        const results = await Promise.all([
            AboutCompanies.count(),
            Apartments.count(),
            Blogs.count(),
            Bookings.count(),
            Categories.count(),
            Contacts.count(),
            FAQs.count(),
            Galleries.count(),
            Orders.count(),
            Partners.count(),
            Products.count(),
            Services.count(),
            Sliders.count(),
            Testimonies.count(),
            Users.count(),
        ]);

        // Map results to their respective table names
        const counts = {
            AboutCompanies: results[0],
            Apartments: results[1],
            Blogs: results[2],
            Bookings: results[3],
            Categories: results[4],
            Contacts: results[5],
            FAQs: results[6],
            Galleries: results[7],
            Orders: results[8],
            Partners: results[9],
            Products: results[10],
            Services: results[11],
            Sliders: results[12],
            Testimonies: results[13],
            Users: results[14],
        };

        // Return the row counts as JSON
        res.json({ counts });
    } catch (error) {
        console.error('Error fetching row counts:', error.message, error.stack);
        res.status(500).json({ error: 'An error occurred while fetching row counts.' });
    }
});

module.exports = router;
