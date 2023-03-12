const {models} = require('../models');

// Muestra la informacion de un paciente
exports.read = async function (patientId) {
    
    let patient =await models.Patient.findByPk(patientId)
    
    return patient;

}

// Crea un paciente en un hospital
exports.create = async function (hospitalId, name, surname, dni) {
    
    try {
    
        let patient= models.Patient.build({

            hospitalId:hospitalId,
            name,
            surname,
            dni
        });
        
        patient = await patient.save({fields: ["name", "surname", "dni", "hospitalId"]});
       
        return patient;
   
    } catch (error) {console.log(error);}

}

// Actualiza un paciente
exports.update = async function (patientId, name, surname, dni) {
    
    let patient= await models.Patient.findByPk(patientId);
    
    patient.dni= dni;
    patient.name= name;
    patient.surname= surname;
    
    
    try {
        
        await patient.save({fields: ["name","surname","dni"]});
    
    }catch(error) {console.log(error);}
}

// Borra un paciente
exports.delete = async function (patientId) {
    
    try{
        
        await models.Patient.destroy({
           where: {id: patientId}
        });

    }catch(error){console.log(error);}
        
}


// Buscar pacientes de un hospital ordenados por el nombre (de la A a la Z)
exports.indexByHospital = async function (hospitalId) {
    
   let patients= await models.Patient.findAll({
        
    order:["name"],
    where: { hospitalId: hospitalId }
        
    });

   return patients;
}
