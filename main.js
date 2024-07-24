class Environment {
  constructor(solarIrradiance) {
    this.solarIrradiance = solarIrradiance; // per square meter
  }
}

class SolarPanel {
  constructor(area, efficiency, temperature = 20) {
    this.area = area;
    this.efficiency = efficiency;
    this.temperature = temperature;
  }

  absorbHeat(environment) {
    const energyAbsorbed =
      environment.solarIrradiance * this.area * this.efficiency;
    this.temperature += energyAbsorbed / 1000; // heat absorption
  }
}

class Pump {
  constructor(flowRate) {
    this.flowRate = flowRate; // liters per second
  }

  transferHeat(solarPanel, storageTank) {
    const heatTransferred = solarPanel.temperature * this.flowRate;
    storageTank.storeHeat(heatTransferred);
    solarPanel.temperature -= heatTransferred / 100; // heat transfer
  }
}

class StorageTank {
  constructor(volume, temperature = 20) {
    this.volume = volume; // liters
    this.temperature = temperature; // temperature in Celsius
  }

  storeHeat(heat) {
    this.temperature += heat / this.volume; // simplistic heat storage
  }
}

const environment = new Environment(1000); // solar irradiance in W/m^2
const solarPanel = new SolarPanel(2, 0.15, 20); // 2 m^2 area, 15% efficiency, 20 degree
const pump = new Pump(0.1); // 0.1 L/s flow rate
const storageTank = new StorageTank(100, 20); // 100 L volume, 20 degree

// loop for an hour
let time = 0;
const interval = 1000; // every second

const simulateInterval = setInterval(() => {
  if (time >= 3600) {
    clearInterval(simulateInterval);
    return;
  }

  solarPanel.absorbHeat(environment);
  pump.transferHeat(solarPanel, storageTank);
  console.log(
    `Time: ${time} s, Solar Panel Temp: ${solarPanel.temperature.toFixed(
      2
    )} °C, Storage Tank Temp: ${storageTank.temperature.toFixed(2)} °C`
  );

  time++;
}, interval);
