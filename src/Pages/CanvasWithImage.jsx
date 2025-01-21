import React, { useState, useRef, useEffect } from "react";
import * as fabric from "fabric"; // Correct namespace import
import { saveAs } from "file-saver";

// Your Pexels API Key
const API_KEY = "4LNA6IrDAIJbvOI0ZaVasSgi2zyNKcsLVXcyCMtWDTHFh3gF6868NYn9";
// Fallback image URL you want to use
const FALLBACK_IMAGE_URL =
  "https://images.pexels.com/photos/29445974/pexels-photo-29445974.jpeg";

const AddCaption = () => {
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageId, setImageId] = useState(null); // Store image ID from the URL
  const [imageUrl, setImageUrl] = useState(""); // To store the image URL once fetched

  useEffect(() => {
    // If the canvas is already initialized, dispose of it to avoid memory leaks
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    const canvas = new fabric.Canvas("canvas", {
      width: 1000,
      height: 400,
      backgroundImage: imageUrl || FALLBACK_IMAGE_URL,
      // backgroundColor: "black", // Set the background color of the canvas to black
      // setBackgroundImage: FALLBACK_IMAGE_URL,
    });
    canvasRef.current = canvas;

    // Get image ID from URL path (Assuming you pass it via URL)
    const urlParts = window.location.pathname.split("/");
    const idFromUrl = urlParts[urlParts.length - 1];
    setImageId(idFromUrl); // Set image ID from URL path

    if (idFromUrl) {
      fetchImage(idFromUrl); // Fetch image if ID is found in the URL
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, []); // Empty dependency array ensures this runs once on component mount

  const fetchImage = (id) => {
    setIsLoading(true);
    fetch(`https://api.pexels.com/v1/photos/29445974`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.src && data.src.original) {
          setImageUrl(data.src.original); // Set image URL from Pexels API
        } else {
          setImageUrl(FALLBACK_IMAGE_URL); // Use fallback image if not found
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setImageUrl(FALLBACK_IMAGE_URL); // Use fallback image in case of error
        setIsLoading(false);
      });
  };

  const addText = () => {
    const canvas = canvasRef.current;
    const textObj = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "#000", // Change the text color to white for better visibility on a black background
    });
    canvas.add(textObj);
    setText("");
  };

  const addShape = (shapeType) => {
    const canvas = canvasRef.current;
    let shape;
    if (shapeType === "rect") {
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "blue",
        width: 100,
        height: 100,
      });
    } else if (shapeType === "circle") {
      shape = new fabric.Circle({
        left: 150,
        top: 150,
        fill: "red",
        radius: 50,
      });
    }
    if (shape) canvas.add(shape);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
    saveAs(dataURL, "modified-image.png");
  };

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;

      // Load the image onto the canvas background
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          // Ensure the image is scaled and centered on the canvas
          const scale = canvas.width / img.width;
          img.set({
            left: (canvas.width - img.width * scale) / 2, // Center the image horizontally
            top: 0, // Position the image at the top of the canvas
            scaleX: scale,
            scaleY: scale,
          });

          // Set the image as the background
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          canvas.renderAll(); // Ensure the canvas is re-rendered with the new background
        },
        (error) => {
          console.error("Error loading image:", error);
          setImageUrl(FALLBACK_IMAGE_URL); // Use fallback image if error loading the image
        }
      );
    }
  }, [imageUrl]); // Re-run this effect when imageUrl changes

  console.log(imageUrl);
  return (
    <div className="flex flex-col items-center px-4 mt-8">
      <div className="flex justify-between w-full">
        <div className="flex-1 border border-black mr-2 z-10 ">
          <canvas id="canvas"></canvas>
          {isLoading && <div>Loading...</div>} {/* Show loading indicator */}
        </div>

        <div className="flex-1/2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter caption here"
            className="w-full h-24 mb-2 p-2 border border-gray-300"></textarea>
          <button
            onClick={addText}
            className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Add Caption
          </button>
          <button
            onClick={() => addShape("rect")}
            className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Add Rectangle
          </button>
          <button
            onClick={() => addShape("circle")}
            className="mb-2 p-2 bg-red-500 text-white rounded hover:bg-red-700">
            Add Circle
          </button>
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="mt-5 p-2 bg-green-500 text-white rounded hover:bg-green-700">
        Download
      </button>
    </div>
  );
};

export default AddCaption;
