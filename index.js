const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || "sqlite:p5.sqlite";

const sequelize =  new Sequelize(url) ;  


// Import Models
const Patient = require("./patient.js")(sequelize, Sequelize.DataTypes);
const Doctor = require("./doctor.js")(sequelize, Sequelize.DataTypes);
const Hospital = require("./hospital.js")(sequelize, Sequelize.DataTypes);


// Relationships 1-N
Hospital.hasMany(Patient, {as:'patient', foreignKey:"patientId"});
Patient.belongsTo(Hospital, {as:'hospital', foreignKey:"hospitalId"});

// Relationships N-N
Doctor.belongsToMany(Patient, {through: "Doctor_Patients"});
Patient.belongsToMany(Doctor, {through: "Doctor_Patients"});


module.exports = sequelize;
