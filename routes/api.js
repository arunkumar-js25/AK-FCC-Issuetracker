'use strict';
require('dotenv').config();
const URI = process.env.MONGO_URI;
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let issueSchema = new mongoose.Schema({
    issue_title : { type: String },
    issue_text: { type: String },
    created_on: { type: Date },
    updated_on: { type: Date },
    created_by: { type: String },
    assigned_to: { type: String },
    open:{ type: Boolean },
    status_text: { type: String },
  });

//CREATE INSTANCE OF A MODEL
let Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      console.log(project);
      
      let issueData = req.body;

      if(issueData.issue_title == undefined || 
        issueData.issue_text == undefined ||
        issueData.created_by == undefined ){
        return res.json({ error: 'required field(s) missing' });
      }
      
      issueData.open=true;
      issueData.created_on=new Date();
      issueData.updated_on=new Date();
      
      let IssueDetail = new Issue(issueData);
  		IssueDetail.save(function(err, data) {
  			if (err) 
        {
          console.error(err); 
          return res.json({});
        }
        //console.log(issueData);
  			return res.json(issueData);
  		});
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
