class Bike {
    constructor(public price: number, public max_speed: number, public miles: number = 0) {}
    displayinfo = () => {
        console.log(this.price),
        console.log(this.max_speed),
        console.log(this.miles)
        return this
    }
    ride = () => {
        console.log("Riding...")
        this.miles += 10
        return this
    }
    reverse = () => {
        console.log("Reversing...")
        if (this.miles >= 5)
        this.miles -= 5
        return this
    }
}

const bike1 = new Bike(150, 20);
const bike2 = new Bike(300, 30);
const bike3 = new Bike(200, 25);

bike1.ride().ride().ride().reverse().displayinfo();
bike2.ride().ride().reverse().reverse().displayinfo();
bike3.reverse().reverse().reverse().displayinfo();