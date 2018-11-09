const chai = require("chai"),
	  chaiHttp = require("chai-http"),
	  app = require("../app"),
	  should = chai.should();
	  
	  chai.use(chaiHttp);

      describe("Test REST APIs", () =>{
	

        describe("GET all orders", (done) => {
            it("should retrieve all orders", (done)=> {
                chai.request(app)
                    .get("/api/v1/orders")
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("success").equal("true");
                        res.body.should.have.property("orders").that.has.property("orders").which.is.a("array");
                    done();
                    });
            });
        });
    
        // Succeed in getting a specific order
        describe("GET a specific order", (done) => {
            it("should retrieve a specific order", (done) => {
                chai.request(app)
                        .get("/api/v1/orders/1")
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                        done();
                        });
            })
    
        })
    
        // Fail to get a specific order
        describe("Fail to GET a specific order", (done) => {
            it("it should not retrieve a specific order", (done) => {
                chai.request(app)
                        .get("/api/v1/orders/:id")
                        .end((err, res) => {
                            res.should.have.status(404);
                        done()
                        });
            })
    
        })
    
    
        describe("POST an order", (done) => {
            it("should add a new order", (done) => {
                let order = {
                        id: 1,
                        name: "Beans",
                        price: 200,
                            quantity: 24
                        };
                
                chai.request(app)
                        .post("/api/v1/orders")
                        .send(order)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object").that.has.property("id");
                            res.body.should.be.a("object").that.has.property("name");
                            res.body.should.be.a("object").that.has.property("price");
                            res.body.should.be.a("object").that.has.property("quantity");
                            done();
                        })
            })
        })
    
        describe("PUT an order", (done) => {
            it("should update an order", (done) => {
                let newOrder = {
                    name: "Scotch Eggs",
                    price: 150,
                    quantity: 50
                }
                chai.request(app)
                    .put("/api/v1/orders/1")
                    .send(newOrder)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/api/v1/orders/1")
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a("object").that.has.property("name").equal("Scotch Eggs");
                                res.body.should.be.a("object").that.has.property("price").equal(150);
                                res.body.should.be.a("object").that.has.property("quantity").equal(50);
                            done();
    
                        })
                                
                            
                    })
            })
        })
    
        describe("Delete an order", (done) => {
            it("should delete an order", (done) => {
                chai.request(app)
                    .delete("/api/v1/orders/1")
                    .end((err, res) => {
                        chai.request(app)
                            .get("/api/v1/orders")
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property("success").equal("true");
                                res.body.should.have.property("orders").that.has.property("orders").which.is.a("array").that.does.not.include({id:1});
                            done();
                        })		
                    })
            })
        })
    
    
    });
