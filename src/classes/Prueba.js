const data = {
    'nombre' : 'diegp',
    'apellidos' : 'sepulveda',
}


class ClasePrueba {

    metodo1 () {
        data.nombre = 'diego';
        console.log(data)
    }
}


export default new ClasePrueba();