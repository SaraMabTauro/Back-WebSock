import { Sequelize, QueryTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'D8aw99man@M2',
  database: 'proyecto5',
  logging: true,
});

class Database {
  async connect(): Promise<void> {
    try {
      // Verifica la conexión
      await sequelize.authenticate();
      console.log('Conexión a la base de datos MySQL establecida');
    } catch (error) {
      console.error('Error al conectar a la base de datos MySQL:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      // Cierra la conexión
      await sequelize.close();
      console.log('Conexión a la base de datos MySQL cerrada');
    } catch (error) {
      console.error('Error al cerrar la conexión a la base de datos MySQL:', error);
      throw error;
    }
  }

  async executeQuery(sql: string, values?: any[]): Promise<any> {
    try {
      // Ejecuta la consulta
      const [rows] = await sequelize.query(sql, { replacements: values, type: QueryTypes.SELECT });
      return rows;
    } catch (error) {
      console.error('Error al ejecutar la consulta en la base de datos MySQL:', error);
      throw error;
    }
  }
}

export { Database, sequelize };

