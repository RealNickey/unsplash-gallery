import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
});

const morningQuotes = [
  "Every morning brings new potential",
  "Wake up with determination, go to bed with satisfaction",
  "Start each day with a grateful heart",
  "Today is a beautiful day to be happy",
  "Good morning! Make today amazing",
  "Rise and shine beautiful soul",
  "Each morning we are born again",
  "Smile and let the day begin",
  "Today is a gift, that's why it's called present",
  "Fill your day with positive thoughts",
];

const PhotoComp = ({ photo, overlayActive, quote }) => {
  const { user, urls } = photo;

  const shareOnWhatsApp = async () => {
    if (overlayActive) return; // Prevent sharing when overlay is active

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = urls.regular;

    image.onload = async () => {
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw the image
      ctx.drawImage(image, 0, 0);
      
      // Add semi-transparent black overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Configure text styling
      ctx.font = `${canvas.width / 10}px 'Caveat', cursive`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Add text shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Draw text in center
      ctx.fillText(quote, canvas.width / 2, canvas.height / 2, canvas.width * 0.8);

      canvas.toBlob(async (blob) => {
        const file = new File([blob], "image.png", { type: "image/png" });
        try {
          await navigator.share({
            files: [file],
            title: "Shared from the app",
            text: quote,
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      }, "image/png");
    };
  };

  return (
    <Fragment>
      <div className="image-container" onClick={shareOnWhatsApp}>
        <img className="img" src={urls.regular} alt={user.name} />
        <div className="quote-overlay" style={{ userSelect: "none" }}>
          <p>{quote}</p>
        </div>
      </div>
    </Fragment>
  );
};

const App = () => {
  const [data, setPhotosResponse] = useState(null);
  const [query, setQuery] = useState("clouds");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [quotes, setQuotes] = useState([]);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      setShowInput(true);
    } else if (event.key === "Escape") {
      setShowInput(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    if (event.key === "Enter") {
      setQuery(inputValue);
      setShowInput(false);
      setInputValue("");
    }
  };

  useEffect(() => {
    const fetchPhotos = () => {
      api.search
        .getPhotos({ query, per_page: 15, order_by: "page" })
        .then((result) => {
          setPhotosResponse(result);
          setQuotes(result.response.results.map(() => morningQuotes[Math.floor(Math.random() * morningQuotes.length)]));
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    };

    fetchPhotos();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query]);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        {data.response.results.map((photo, index) => (
          <PhotoComp key={photo.id} photo={photo} overlayActive={showInput} quote={quotes[index]} />
        ))}
        {showInput && (
          <div className="overlay">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputSubmit}
              className="search-input search-input-large"
              autoFocus
            />
          </div>
        )}
      </div>
    );
  }
};

export default App;
