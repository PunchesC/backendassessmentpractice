const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};

data.recipes=require('../../data/data.json');

router.route('/')
  .get((req,res)=>{
    res.json(data.recipes);
  })
  .post((req,res)=>{
    res.json({
      "name": req.body.name,
      "ingredients": req.body.ingredients,
      "instructions": req.body.instructions
    });
  })
  .put((req,res)=>{
    res.json({
      "name": req.body.name,
      "ingredients": req.body.ingredients,
      "instructions": req.body.instructions
    });
  })
  // Delete not required in assessment
  // .delete(())

  //route by paramater in url
  router.route('/:id')
  .get((req,res)=>{
    res.json({"name":req.params.id})
  })
module.exports = router