// Encrypt endpoint
const desDecrypt = async (req, res) => {
    try {
      // logic here
      res.status(200).json({});
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(400).json({ mssg: error.message });
    }
  };
  
  module.exports = desDecrypt;
  