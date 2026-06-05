function generateCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
      }
      const code=generateCode()
      
module.exports =  generateCode ;