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
  
});
