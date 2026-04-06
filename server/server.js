const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());


const isValidHex = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


const isImageURL = (url) =>
  /\.(jpg|jpeg|png|webp|gif)$/i.test(url);


const isImageAccessible = async (url) => {
  try {
    const res = await axios.get(url, { timeout: 3000 });
    return res.status === 200;
  } catch {
    return false;
  }
};

app.post("/api/content", async (req, res) => {
  const { heading, paragraph, imageUrl, textColor } = req.body;

  let errors = {};


  if (!heading) errors.heading = "Heading is required";
  if (!paragraph || paragraph === "<p><br></p>")
    errors.paragraph = "Paragraph is required";
  if (!imageUrl) errors.imageUrl = "Image URL is required";
  if (!textColor) errors.textColor = "Text color is required";

  if (textColor && !isValidHex(textColor)) {
    errors.textColor = "Invalid HEX color";
  }

  
  if (imageUrl && !isValidURL(imageUrl)) {
    errors.imageUrl = "Invalid URL format";
  }

 
  if (imageUrl && isValidURL(imageUrl)) {
    if (!isImageURL(imageUrl)) {
      errors.imageUrl = "Must be a direct image URL (.jpg, .png, etc)";
    } else {
      const accessible = await isImageAccessible(imageUrl);
      if (!accessible) {
        errors.imageUrl = "Image not accessible or broken link";
      }
    }
  }

 
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }


  return res.status(200).json({
    success: true,
    message: "Content validated successfully",
    data: { heading, paragraph, imageUrl, textColor },
  });
});

app.listen(5000, () => console.log("Server running on port 5000 🚀"));