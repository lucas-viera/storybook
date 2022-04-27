const express = require('express');
const router = require('.');
const reouter = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require ('../models/Story');

// @desc Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
});

// @desc Process add form
// @route POST /stories/add
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    }
    catch {
        console.error(err);
        res.render('error/500');
    }
});

// @desc Show all stories
// @route GET /stories/
router.get('/', async (req, res) => {
    try{
        const stories = await Story.find({ status:'public' })   //get all stories with public status
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
        res.render('stories/index', { 
            stories
        });
    }
    catch (err){
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;
