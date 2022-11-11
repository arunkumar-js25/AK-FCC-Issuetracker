const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
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
});
