 class Car {
 brand;
 model;
 speed = 0;
 isTrunkOpen = false;


   constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
 }

 displayInfo() {
    console.log( `Car Brand: ${this.brand}, Model: ${this.model}, Speed: ${this.speed} km/h`, `Trunk Open: ${this.isTrunkOpen}` );
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
    isTrunkOpen = "";

    go() {
        this.acceleration += 5;

        if(this.speed < 300) {
            this.speed = 300;
        }
    }
    }






console.log(car1);
console.log(car2); 

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.displayInfo();
car1.go();
car1.displayInfo();
console.log(car1);
