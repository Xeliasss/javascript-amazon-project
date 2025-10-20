 class Car {
 #brand;
 #model;
 speed = 0;
 isTrunkOpen = false;


   constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
 }

 displayInfo() {
    console.log( `Car Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed} km/h`, `Trunk Open: ${this.isTrunkOpen}` );
 }

 go() {
    if(this.isTrunkOpen === false) {
            this.speed += 5;


     if (this.speed > 200) {
      this.speed = 200;

     }
    }

 }


 brake() {
    this.speed -= 5;


       if (this.speed < 0) {
      this.speed = 0;
    }
 }

openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
    
 }

closeTrunk() {
    this.isTrunkOpen = false;
 }



}





const   car1 = new Car({
     brand: "Toyota", model: "Corollad"
     });
const   car2 = new Car({ 
    brand: "Tesla", model: "Model 3", 
  });



  class RaceCar extends Car {
    acceleration;
  
   constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }



    go() {
        this.speed += this.acceleration;

        if(this.speed < 300) {
            this.speed = 300;
        }
    }



  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }


    }

const raceCar1 = new RaceCar({
    brand: "McLaren", model: "F1", acceleration: 20
});






console.log(car1);
console.log(car2); 
console.log(raceCar1);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.displayInfo();
car1.go();
car1.displayInfo();


raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();