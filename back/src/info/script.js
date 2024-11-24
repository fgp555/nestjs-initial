const filePath = "D:/01-web/nestjs/nestjs-initial/back/backups/backup-pg-241124-222916.sql";

// Extraer el nombre del archivo de la ruta
const fileName = filePath.split('/').pop(); // O también puedes usar split('\\') si es en Windows

console.log(fileName); // Mostrará: "backup-pg-241124-222916.sql"
