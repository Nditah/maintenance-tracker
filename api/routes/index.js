// GET home page.

import express from 'express'
const router = express.Router();

const index_router = router.get('/', function(req, res) {
     res.send('Root!')
    // res.redirect('/userRoute');
  })

export default index_router;