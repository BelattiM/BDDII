// crear usuarios
CREATE (ana:Usuario {nombre: "Ana"});
CREATE (ramiro:Usuario {nombre: "Ramiro"});
CREATE (mateo:Usuario {nombre: "Mateo"});
CREATE (facundo:Usuario {nombre: "Facundo"});

// crear conexiones
CREATE (ana)-[:CONOCE]->(ramiro), (ramiro)-[:CONOCE]->(ana);
CREATE (ana)-[:CONOCE]->(mateo), (mateo)-[:CONOCE]->(ana);
CREATE (ramiro)-[:CONOCE]->(facundo), (facundo)-[:CONOCE]->(ramiro);

// crear posts (tratamos de que sean graciosos, por favor reirse)
CREATE (p1:Post {contenido: "Me caí del monociclo::(", fecha: date("2025-07-01")});
CREATE (p2:Post {contenido: "Leon haciendo una vertical", fecha: date("2025-07-02")});
CREATE (p3:Post {contenido: "Intente hacer malabares con huevos", fecha: date("2025-07-03")});

// relacionar posts con usuarios
CREATE (ana)-[:PUBLICO]->(p1);
CREATE (ramiro)-[:PUBLICO]->(p2);
CREATE (ramiro)-[:PUBLICO]->(p3);

// crear habilidades circenses
CREATE (h1:Habilidad {nombre: "Malabares"});
CREATE (h2:Habilidad {nombre: "Acrobacias"});
CREATE (h3:Habilidad {nombre: "Monociclo"});
CREATE (h4:Habilidad {nombre: "Zancos"});
CREATE (h5:Habilidad {nombre: "Trapecio"});
CREATE (h6:Habilidad {nombre: "Payaso"});
CREATE (h7:Habilidad {nombre: "Domador de leones"});
CREATE (h8:Habilidad {nombre: "Contorsionista"});

// relacionar usuarios con habilidades
CREATE (ana)-[:TIENE]->(h1); 
CREATE (ana)-[:TIENE]->(h3); 

CREATE (ramiro)-[:TIENE]->(h2);
CREATE (ramiro)-[:TIENE]->(h7); 

CREATE (mateo)-[:TIENE]->(h4); 
CREATE (mateo)-[:TIENE]->(h6); 

CREATE (facundo)-[:TIENE]->(h5);
CREATE (facundo)-[:TIENE]->(h8); 

// endosos entre ellos
CREATE (ramiro)-[:ENDOSA]->(h1);
CREATE (mateo)-[:ENDOSA]->(h1);
CREATE (facundo)-[:ENDOSA]->(h1);

CREATE (ana)-[:ENDOSA]->(h2); 
CREATE (mateo)-[:ENDOSA]->(h2);

CREATE (ana)-[:ENDOSA]->(h6);
CREATE (ramiro)-[:ENDOSA]->(h6);
