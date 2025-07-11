// crear departamentos y empleados
CREATE (dep1:Departamento {nombre: "Base de Datos"});
CREATE (dep2:Departamento {nombre: "Ingeniería"});
CREATE (emp1:Empleado {nombre: "Ana", id: 1});
CREATE (emp2:Empleado {nombre: "Ramiro", id: 2});
CREATE (emp3:Empleado {nombre: "Mateo", id: 3});

// relacionar empleados con departamentos
MATCH (e:Empleado {id: 1}), (d:Departamento {nombre: "Base de Datos"})
CREATE (e)-[:PERTENECE_A]->(d);

MATCH (e:Empleado {id: 2}), (d:Departamento {nombre: "Ingeniería"})
CREATE (e)-[:PERTENECE_A]->(d);

MATCH (e:Empleado {id: 3}), (d:Departamento {nombre: "Ingeniería"})
CREATE (e)-[:PERTENECE_A]->(d);

// crear proyectos
CREATE (proy1:Proyecto {nombre: "Proyecto 1"});
CREATE (proy2:Proyecto {nombre: "Proyecto 2"});

// asignar lideres a los proyectos
MATCH (e:Empleado {id: 2}), (p:Proyecto {nombre: "Proyecto 1"})
CREATE (e)-[:LIDERA]->(p);

MATCH (e:Empleado {id: 3}), (p:Proyecto {nombre: "Proyecto 2"})
CREATE (e)-[:LIDERA]->(p);

// asignar empleados a proyectos con horas semanales
MATCH (e:Empleado {id: 1}), (p:Proyecto {nombre: "Proyecto 2"})
CREATE (e)-[:TRABAJA_EN {horas: 10}]->(p);

MATCH (e:Empleado {id: 2}), (p:Proyecto {nombre: "Proyecto 1"})
CREATE (e)-[:TRABAJA_EN {horas: 20}]->(p);

MATCH (e:Empleado {id: 3}), (p:Proyecto {nombre: "Proyecto 1"})
CREATE (e)-[:TRABAJA_EN {horas: 15}]->(p);

MATCH (e:Empleado {id: 3}), (p:Proyecto {nombre: "Proyecto 2"})
CREATE (e)-[:TRABAJA_EN {horas: 10}]->(p);
