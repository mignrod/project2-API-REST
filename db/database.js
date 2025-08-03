const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = async () => {
  const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
  };

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined');
    }

    const connection = await mongoose.connect(
      process.env.MONGODB_URL,
      mongooseOptions
    );

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    console.log(`📊 Database Name: ${connection.connection.name}`);

    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`🔴 Error connecting: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 DB disconnected');
    });

    // Manejar cierre de conexión al terminar la aplicación
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔶 Conection to DB close');
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Error de connecting to DB:', err.message);

    // Reintentar conexión después de 5 segundos
    console.log('🔄 Reconnecting...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
