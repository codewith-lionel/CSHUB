const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    console.log('🔍 Checking environment variables...');
    console.log('MONGODB_URI exists:', !!mongoURI);
    console.log('MONGODB_URI first 30 chars:', mongoURI ? mongoURI.substring(0, 30) + '...' : 'UNDEFINED');
    
    if (!mongoURI) {
      throw new Error('.env file missing or MONGODB_URI not set!');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoURI, options);

    console.log('🔗 Mongoose connected to MongoDB Atlas');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📍 Host:', conn.connection.host);
    console.log('🗄️  Database:', conn.connection.name);
    console.log('👤 User: lionel');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('⚠️  Check your .env file has MONGODB_URI');
    process.exit(1);
  }
};

module.exports = connectDB;
