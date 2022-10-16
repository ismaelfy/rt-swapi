function FormatPeopleData(data) {
    return {
        nombre: data.name,
        altura: data.height,
        masa: data.mass,
        color_de_pelo: data.hair_color,
        color_de_piel: data.skin_color,
        color_de_ojos: data.eye_color,
        año_nacimiento: data.birth_year,
        genero: data.gender,
        mundo_natal: data.homeworld,
        peliculas: data.films,
        especies: data.species,
        vehiculos: data.vehicles,
        naves_estelares: data.edited,
        creado: data.created,
        editado: data.edited,
        enlace: data.url,
    }

}

module.exports = FormatPeopleData
