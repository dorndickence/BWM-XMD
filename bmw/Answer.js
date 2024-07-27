const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');




zokou({ nomCom: "bot", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  // Respond if no argument is provided
  if (!arg || !arg[0]) {
    return repondre("Yes, I'm listening to you.");
  }

  try {
    // Join the arguments to form the message
    const message = arg.join(' ');
    console.log(message);

    // Fetch the response from the new endpoint
    fetch(`https://worker-dry-cloud-dorn.dorndickence.workers.dev/?prompt=${encodeURIComponent(message)}`)
      .then(response => response.json())
      .then(data => {
        const botResponse = data.cnt;
        console.log(botResponse);
        repondre(botResponse);
      })
      .catch(error => {
        console.error('Error requesting new endpoint:', error);
        repondre('Error requesting new endpoint');
      });
  } catch (e) {
    repondre("Oops, an error occurred: " + e);
  }
});



  zokou({ nomCom: "bmw", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please enter the necessary information to generate the image.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const image = arg.join(' ');
      const response = await axios.get(`http://api.maher-zubair.tech/ai/photoleap?q=${image}`);
      
      const data = response.data;
      let caption = '*powered by BMW-MD*';
      
      if (data.status == 200) {
        // Utiliser les données retournées par le service
        const imageUrl = data.result;
        zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
      } else {
        repondre("Error during image generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request");
    }
  });
  
  zokou({ nomCom: "ai", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`http://api.maher-zubair.tech/ai/chatgpt4?q=${question}`);
      
      const data = response.data;
      if (data) {
        repondre(data.result);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });


zokou({ nomCom: "gpt", reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`https://gpt4.giftedtech.workers.dev/?prompt=${question}`);
      
      const data = response.data;
      if (data) {
        repondre(data.result);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });


  
