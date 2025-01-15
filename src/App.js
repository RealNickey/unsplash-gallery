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

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;
  const randomQuote = morningQuotes[Math.floor(Math.random() * morningQuotes.length)];

  return (
    <Fragment>
      <div className="image-container">
        <img className="img" src={urls.regular} alt={user.name} />
        <div className="quote-overlay">
          <p>{randomQuote}</p>
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
        {data.response.results.map((photo) => (
          <PhotoComp key={photo.id} photo={photo} />
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
