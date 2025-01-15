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
  "Good morning! Make today ridiculously amazing",
  "Every morning we are born again. What we do today matters most.",
  "The sun reminds us we can rise again from the darkness and shine our own light.",
  "Rise up, start fresh, see the bright opportunity in each day.",
  "Your journey will be lighter if you don’t carry your past with you.",
  "Every sunrise is an invitation to brighten someone’s day.",
  "It’s not the load that breaks you down, it’s the way you carry it.",
  "Don’t count the days, make the days count.",
  "This is another chance to make your dreams come true.",
  "Today is a new day. Even if you were wrong yesterday, you can get it right today.",
  "Greet the new dawn, feel the sunshine, and know you hold the power to make this day beautiful.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "With the new day comes new strength and new thoughts.",
  "Each morning we are born again. What we do today matters most.",
  "Opportunities are like sunrises. If you wait too long, you miss them.",
  "Morning comes whether you set the alarm or not.",
  "The morning was full of sunlight and hope.",
  "No matter how long you have traveled in the wrong direction, you can always turn around.",
  "The way you get out of bed will lay the foundation of the day that follows. Be as positive as possible.",
  "Every morning starts a new page in your story. Make it a great one today.",
  "There was never a night or a problem that could defeat sunrise or hope.",
];

const afternoonQuotes = [
  "Good afternoon! Keep up the good work",
  "Make this afternoon productive and enjoyable",
  "The afternoon is a time for reflection and planning",
  "Good afternoon! Stay positive and keep going",
  "Enjoy your afternoon and make the most of it",
  "Good afternoon! Take a moment to relax and recharge",
  "Good afternoon! Keep pushing forward",
  "Good afternoon! The day is still young",
  "Good afternoon! Make the most of this beautiful day",
  "Good afternoon! Stay focused and keep going",
  "Good afternoon! Keep your head up and stay positive",
  "Good afternoon! You’re doing great",
  "Good afternoon! Keep up the momentum",
  "Good afternoon! Stay motivated and keep going",
  "Good afternoon! Keep your eyes on the prize",
  "Good afternoon! Stay strong and keep going",
  "Good afternoon! Keep your spirits high",
  "Good afternoon! Stay positive and keep moving forward",
  "Good afternoon! Keep your energy up",
  "Good afternoon! Stay focused and keep pushing forward",
  "Good afternoon! Keep your goals in sight",
  "Good afternoon! Stay determined and keep going",
];

const nightQuotes = [
  "Good night! Sleep tight",
  "May your dreams be sweet and peaceful",
  "Good night! Rest well and recharge",
  "Sleep well and wake up refreshed",
  "Good night! Tomorrow is a new day",
  "Good night! May you have a restful sleep",
  "Good night! Sweet dreams",
  "Good night! Sleep well and dream big",
  "Good night! May you wake up refreshed and ready to take on the day",
  "Good night! Rest well and wake up ready to conquer the day",
  "Good night! May your dreams be filled with happiness",
  "Good night! Sleep tight and wake up bright",
  "Good night! May you have a peaceful sleep",
  "Good night! Rest well and wake up with a smile",
  "Good night! May your dreams be sweet and your sleep be restful",
  "Good night! Sleep well and wake up ready to take on the world",
  "Good night! May you have a restful and peaceful sleep",
  "Good night! Sleep tight and wake up refreshed",
  "Good night! May your dreams be filled with joy",
  "Good night! Rest well and wake up ready to seize the day",
  "Good night! May you have a peaceful and restful sleep",
  "Good night! Sleep well and wake up ready to achieve your goals",
];

const getQuotesForTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return morningQuotes;
  } else if (hour < 18) {
    return afternoonQuotes;
  } else {
    return nightQuotes;
  }
};

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
  const [quotes, setQuotes] = useState([]); // Add this line

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
          const quotesForTimeOfDay = getQuotesForTimeOfDay();
          setQuotes(result.response.results.map(() => quotesForTimeOfDay[Math.floor(Math.random() * quotesForTimeOfDay.length)]));
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
