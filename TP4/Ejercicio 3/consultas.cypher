// Listar los usuarios con más conexiones ( COUNT ).
MATCH (u:Usuario)-[:CONOCE]->()
RETURN u.nombre AS Usuario, COUNT(*) AS Conexiones
ORDER BY Conexiones DESC;

// Obtener los 2 usuarios con más publicaciones. 
MATCH (u:Usuario)-[:PUBLICO]->(:Post)
RETURN u.nombre AS Usuario, COUNT(*) AS Publicaciones
ORDER BY Publicaciones DESC
LIMIT 2;

// Mostrar las habilidades más endosadas en total.
MATCH (:Usuario)-[:ENDOSA]->(h:Habilidad)
RETURN h.nombre AS Habilidad, COUNT(*) AS Endosos
ORDER BY Endosos DESC;

//Para un usuario específico, listar las habilidades que aún no ha endosado a otros.
MATCH (h:Habilidad)
WHERE NOT EXISTS {
    MATCH (:Usuario {nombre: "Ana"})-[:ENDOSA]->(h)
}
RETURN h.nombre AS HabilidadNoEndosada;
