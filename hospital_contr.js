const {models} = require('../models');

// Crear un  hospital
exports.create = async function (name, city) {
    try {
    
        let hospital= models.Hospital.build({
            name,
            city,
            
        });
        
        hospital = await hospital.save ({fields: ["name","city"]});

        return hospital;

    } catch (error) {console.log(error);}
};

// Devuelve todos los hospitales
exports.index = async function () {
    
    return await models.Hospital.findAll();
} 

// Filtra los hospitales por ciudad
exports.indexByCity = async function (city) {
    
    let hospitals= await models.Hospital.findAll({
          
        where: {
            
            city:city
        },
            
        });
        
        return hospitals;
}

