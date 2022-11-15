'use strict';
require('dotenv').config();
const URI = process.env.MONGO_URI;
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let issueSchema = new mongoose.Schema({
    projectname : { type: String },
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

      let filter = req.query;
      filter.projectname = project == undefined? '' : project;
      console.log(filter);
      Issue.find(filter).select({projectname:0,_v:0})
        .exec(function(err, data) {
		    if (err){
          console.error(err);
          return res.json({ error: 'Some Error' });
        }
    		return res.json(data);
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      console.log(project);
      
      let issueData = req.body;
      issueData.projectname = project;
      
      if(issueData.issue_title == undefined || 
        issueData.issue_text == undefined ||
        issueData.created_by == undefined ){
        return res.json({ error: 'required field(s) missing' });
      }

       if(issueData.assigned_to == undefined){
         issueData.assigned_to = "";
       }

      console.log(issueData.status_text );
      if(issueData.status_text == undefined){
         issueData.status_text = "";
       }
      
      issueData.open=true;
      issueData.created_on=new Date();
      issueData.updated_on=new Date();
      
      let IssueDetail = new Issue(issueData);
  		IssueDetail.save(function(err, data) {
  			if(err) 
        {
          console.error(err); 
          return res.json({ error: 'Some Error' });
        }
        //console.log(data);
  			return res.json(data);
  		});
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let issueData = req.body;
      issueData.projectname = project;
      
      let _id = issueData._id;
      console.log(issueData._id);
      if(_id == '' || _id == undefined){
        return res.json({ error: 'missing _id' });
      }
      else
      {
        let issueArr = Object.keys(issueData);
        issueArr = issueArr.filter(name =>  name != '_id' && name != 'projectname' && issueData[name] != '');
        console.log(issueData);
        console.log(issueArr.length);
        if(issueArr.length == 0){
          res.json({ error: 'no update field(s) sent', '_id': _id });
        }
        else
        {
          let updateData = {};
          for(let i=0; i<issueArr.length; i++){
            updateData[issueArr[i]] = issueData[issueArr[i]];
          }
          updateData.updated_on=new Date();
          console.log(updateData);
          Issue.findByIdAndUpdate(_id, updateData, { new: true }, function(err, data){
            console.log(err);
            if(err || !data) 
            {
              //console.error(err);
              return res.json({ error: 'could not update', '_id': _id });
            }
            else
            {
              return res.json({ result: 'successfully updated', '_id': _id });
            }
          });
        }
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let issueData = req.body;
      
      let _id = issueData._id;
      console.log(_id);
      if(_id == '' || _id == undefined ){
        return res.json({ error: 'missing _id'});
      }
      else
      {
        Issue.findByIdAndDelete(issueData._id,function(err, data){
          if(err || !data) 
          {
            //console.error(err);
            return res.json({ error: 'could not delete', '_id': _id });
          }
          else
          {
            return res.json({ result: 'successfully deleted', '_id': _id });
          }
        });
      }
    });
    
};
