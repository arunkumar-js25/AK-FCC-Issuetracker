const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  //POST
  test('an issue with all fields',function(done){
    chai.request(server)
    .post('/api/issues/apitest')
    .send({"issue_title":"unix",
           "issue_text":"testing for projectname",
           "created_by":"user",
           "assigned_to":"Arun",
           "status_text":"Critical"})
    .end(function(err, res){
      assert.equal(res.body.issue_title,'unix');
      done();
    })
  });

  test('issue with only required fields',function(done){
    chai.request(server)
    .post('/api/issues/apitest')
    .send({"issue_title":"unix",
           "issue_text":"testing for projectname",
           "created_by":"user"})
    .end(function(err, res){
      assert.equal(res.body.issue_title,'unix');
      done();
    })
  });

  test('Create an issue with missing required fields',function(done){
    chai.request(server)
    .post('/api/issues/apitest')
    .send({"issue_title":"unix",
           "issue_text":"testing for projectname"})
    .end(function(err, res){
      assert.equal(res.body.error,'required field(s) missing');
      done();
    })
  });

  //GET
  test('View issues on a project',function(done){
    chai.request(server)
    .get('/api/issues/apitest')
    .end(function(err, res){
      assert.equal(res.status, 200);
      done();
    })
  });

  test('View issues on a project with one filter',function(done){
    chai.request(server)
    .get('/api/issues/apitest?issue_title=unix')
    .end(function(err, res){
      assert.equal(res.status, 200);
      done();
    })
  });
  
  test('View issues on a project with multiple filters',function(done){
    chai.request(server)
    .get('/api/issues/apitest?issue_title=unix&open=false')
    .end(function(err, res){
      assert.equal(res.status, 200);
      done();
    })
  });

  //PUT
  test('Update one field on an issue:',function(done){
    chai.request(server)
    .put('/api/issues/apitest')
    .send({ '_id': '6372ee44392c8d5251ec1caf', 'issue_title': 'put case 1' })
    .end(function(err, res){
       if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Update multiple fields on an issue',function(done){
    chai.request(server)
    .put('/api/issues/apitest')
    .send({ '_id': '6372ee6a92842414094ea3f6', 'issue_title': 'put case 2', 'issue_text':'put case 2' })
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Update an issue with missing _id',function(done){
    chai.request(server)
    .put('/api/issues/apitest')
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Update an issue with no fields to update',function(done){
    chai.request(server)
    .put('/api/issues/apitest')
    .send({ '_id': '6372ee6a92842414094ea3f6'})
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Update an issue with an invalid _id',function(done){
    chai.request(server)
    .put('/api/issues/apitest')
    .send({ '_id': 'asd'})
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });

  //DELETE
  test('Delete an issue',function(done){
    chai.request(server)
    .delete('/api/issues/apitest')
    .send({'_id':'6372eda4285651aff30dd58a'})
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Delete an issue with an invalid _id',function(done){
    chai.request(server)
    .delete('/api/issues/apitest')
    .send({'_id':'6372eda4285651afdd58a'})
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  test('Delete an issue with missing _id',function(done){
    chai.request(server)
    .delete('/api/issues/apitest')
    .end(function(err, res){
      if(err) 
       {
          console.error(err);
         done();
       }
      assert.equal(res.status, 200);
      done();
    })
  });
  
});
