// obtener el nombre del proyecto, su lider y los empleados asignados. 
MATCH (lider:Empleado)-[:LIDERA]->(p:Proyecto)<-[:TRABAJA_EN]-(emp:Empleado)
RETURN p.nombre AS Proyecto, lider.nombre AS Lider, collect(emp.nombre) AS Empleados;

// calcular el total de horas semanales por proyecto. 
MATCH (e:Empleado)-[t:TRABAJA_EN]->(p:Proyecto)
RETURN p.nombre AS Proyecto, SUM(t.horas) AS TotalHoras;

// listar los empleados que trabajan en mas de un proyecto.
MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
WITH e, COUNT(DISTINCT p) AS cantidadProyectos
WHERE cantidadProyectos > 1
RETURN e.nombre AS Empleado, cantidadProyectos;