import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: ""
});

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <img className="img" src={urls.regular} alt={user.name} />
    </Fragment>
  );
};

const App = () => {
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    api.search
.getPhotos({ query: "nature", per_page: 15, order_by: "page" })
.then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

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

          {data.response.results.map(photo => (
              <PhotoComp photo={photo} />
          ))}

      </div>
    );
  }
};

export default App;