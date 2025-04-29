1. a. Crear una db llamada empresa y agregar 3 empleados

use empresa;

db.empleados.insertMany([
    { nombre: "Ana", edad: 21, puesto:"CEO"},
    { nombre: "Facundo", edad: 23, puesto: "Gerente"},
    { nombre: "Mateo", edad: 22, puesto: "Pasante"}
]);

b. Actualizar la edad de uno de los empleados

db.empleados.updateOne(
    { nombre: "Facundo"},
    { $set: { edad: 29}}
);

c. Eliminar al empleado con puesto "Pasante"

db.empleados.deleteOne(
    { puesto: "Pasante"}
);

2. Buscar empleados con edad entre 25 y 40

db.empleados.find(
    { edad: { $gte: 25, $lte: 40}}
);

3. Recuperar nombre y puesto de todos los empleados sin mostrar el id

db.empleados.find(
    {},
    {_id: 0, nombre: 1, puesto: 1}
);

4. Agregar un campo direccion que incluya calle, ciudad y codigo_postal.

db.empleados.updateMany(
    {},
    { 
        $set: { 
            direccion: {
                calle: "11 de abril 461",
                ciudad: "Bahia Blanca",
                codigo_postal: "8000" 
            }
        }
    }
)

5. Dada una colección ventas con campos producto, cantidad y precio_unitario, calcular el total de ventas por producto usando $group y $sum.

db.ventas.insertMany([
  { producto: "Mouse", cantidad: 10, precio_unitario: 100 },
  { producto: "Teclado", cantidad: 5, precio_unitario: 200 },
  { producto: "Mouse", cantidad: 4, precio_unitario: 100 }
]);

db.ventas.aggregate([
  {
    $group: {
      _id: "$producto",
      total_ventas: {
        $sum: { $multiply: ["$cantidad", "$precio_unitario"] }
      }
    }
  }
]);

6. Crea un índice compuesto sobre los campos apellido y nombre en una colección de clientes.

db.clientes.insertMany([
    {nombre: "Pablo", apellido: "Picasso", direccion: "Alem 234" },
    {nombre: "Mickey", apellido: "Mouse", direccion: "Orlando 986" },
    {nombre: "Walter", apellido: "Disney", direccion: "Orlando 999" },
    {nombre: "Ricardo", apellido: "Fort", direccion: "Nordelta 420" },
    {nombre: "Gregorio", apellido: "Casa", direccion: "Plainsboro 4053" },
]);

db.clientes.createIndex({
    apellido: 1, nombre: 1 
});

7.  Crea una colección cursos y una colección alumnos. Luego inserta documentos donde los alumnos tengan una lista de id_curso referenciando a los cursos.

db.cursos.insertMany([
    {_id: 1, nombre: "MongoDB Basico con Ramoscelli"},
    {_id: 2, nombre: "HTML, CSS y JS basico con Sergio"},
    {_id: 3, nombre: "HTML, CSS y JS avanzado con el Gian"}
])

db.alumnos.insertMany([
    {nombre: "Ramiro Pizzico", id_curso:[2, 3]},
    {nombre: "Ana Paula Schechtel", id_curso:[1, 2]},
    {nombre: "Facundo Tischler", id_curso:[1, 3]},
    {nombre: "Mateo Bellati", id_curso:[2, 3]},
])

8. Realiza una agregación donde se combinen los datos de alumnos y cursos usando $lookup.

db.alumnos.aggregate([
  {
    $lookup: {
      from: "cursos",
      localField: "id_curso",
      foreignField: "_id",
      as: "detalle_cursos"
    }
  }
]);

9. Describe con tus palabras las ventajas de usar un Replica Set y qué beneficios aporta el sharding en una base de datos de alto volumen.

Un Replica Set se trata de un sistema que tiene los datos guardados varios servidores o nodos, uno primario y los demas secundarios. el usuario ingresa datos en el nodo primario y los secundarios copian esos datos para que, en caso de que el nodo primario falle, un nodo secundario automaticamente tome su lugar. esto es beneficioso para bases de datos obviamente por la seguridad que tienen los datos al tenerlos copiados en varios backups.
Sharding es una practica que consiste en separar los datos en varios servidores o shards. el cliente interactua con un router que automaticamente lo redirige al shard correcto. esta practica es particularmente beneficiosa en bases de datos de alto volumen, ya que al tener los datos distribuidos en diferentes servidores mejora el rendimiento de los mismos, a diferencia del Replica Set que, aplicado en una base de datos voluminosa, podria comprometer su performance.

10. Mostrar los pasos para crear un usuario con permisos de lectura y escritura, y los comandos necesarios para hacer backup y restauración de una base de datos.

a. Crear usuario:

use admin;

db.createUser({
    user: "nombre_usuario",
    pwd: "contra123",
    roles[{role: "readWrite", db: "empresa"}]
})

b. Hacer el Backup:

mongodump --db empresa --out /ruta/backupsMongo

c. Restaurar el Backup:

mongorestore --db empresa /ruta/backupsMongo/empresa