const chai = require('chai');
    sinon = require('sinon'),
    should = chai.should(),
    chaiHttp = require('chai-http');
    mongoose = require('mongoose'),
    server = require('../server'),
    Location = require('../server/models/locationModel');


chai.use(chaiHttp);

describe('Locations', () => {
    beforeEach((done) => {
        Location.remove({}, (err) => { 
           done();           
        });        
    });
    
    /*
        * Test the /GET route
    */
    describe('/GET location route', () => {
        it('it should GET all the locations', (done) => {
            chai.request(server)
                .get('/locations')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    })
    

    /*
        * Test the /POST route
    */
    describe('/POST location route', () => {

        it('it should throw an error if request body is empty', (done) => {
            let req = {
                body:{} 
            }
            chai.request(server)
                .post('/locations')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.femalePopulation.should.have.property('kind').eql('required');
                done();
              });
        });
    
        it('it should not POST a location without name field', (done) => {
            let req = {
                body:{
                    femalePopulation: 500,
                    malePopulation: 209
                } 
            }
          chai.request(server)
              .post('/locations')
              .send(req)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.name.should.have.property('kind').eql('required');
                done();
              });
        });
    
        it('it should create a location', (done) => {
            let req = {
                body:{
                    name: 'New York',
                    femalePopulation: 500,
                    malePopulation: 209
                } 
            }
          chai.request(server)
              .post('/locations')
              .send(req.body)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').to.eql('New York');
                    res.body.should.have.property('femalePopulation').to.eql(req.body.femalePopulation);
                    res.body.should.have.property('malePopulation').to.eql(req.body.malePopulation);
                done();
              });
        });
    });

    /*
    * Test the /GET/:locationId route
    */
    describe('/GET/:locationId route', () => {

        it('it should GET a location by the given id', (done) => {
            let location = new Location({
                name: 'Port Harcourt',
                femalePopulation: 5000,
                malePopulation: 3000 
            }); 
            location.save((err, location) => {
                chai.request(server)
                .get('/locations/' + location.id)
                .send(location)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').to.eql('Port Harcourt');
                    res.body.should.have.property('femalePopulation')
                    res.body.should.have.property('malePopulation')
                    res.body.should.have.property('_id').eql(location.id);
                done();
                });
            });
        });
    });

    describe('/PUT/:locationId route', () =>{

        it('it should UPDATE a location with a given the id', (done) => {
            let location = new Location({
                name: 'Port Harcourt',
                femalePopulation: 5000,
                malePopulation: 3000 
            });
            location.save((err, location) => {
                chai.request(server)
                .put('/locations/' + location.id)
                .send({
                    name: "Lagos City",
                    femalePopulation: 4000,
                    malePopulation: 6000
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Lagos City');
                done();
                });
            });
        });
    });


    describe('/DELETE/:locationId', () => {
        it('it should DELETE a location with a given id', (done) => {
            let location = new Location({
                name: 'Port Harcourt',
                femalePopulation: 5000,
                malePopulation: 3000 
            });
            location.save((err, location) => {
                chai.request(server)
                .delete('/locations/' + location.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql(`Successfully deleted location with id ${location.id}`);
                done();
                });
            });
        });
    })
});
