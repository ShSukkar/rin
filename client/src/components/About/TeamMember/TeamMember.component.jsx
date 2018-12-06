import React from "react";
import "./TeamMember.css";

export default props => {
  const info = props.teamMemberInfo;

  const readMoreClicked = info => {
    document.querySelector(".read-more-popup").style.display = "block";
    document.querySelector(".read-more-name").innerText = info.name;
    document.querySelector(".read-more-img").src = info.img;
    document.querySelector(".read-more-title").innerText = info.title;
    document.querySelector(".read-more-description").innerText =
      info.description;
  };

  return (
    <div className="team-member">
      <figure class="effect-chico">
        <img src={info.img} alt="img15" style={{ height: "150px" }} />
        {/* <div className="tt" style={{ backgroundImage: `url(${info.img})`, backgroundSize: "cover", height: "120px" }} /> */}
        <figcaption>
          <p>
            {info.title}
            <a
              className="read-more"
              onClick={() => {
                readMoreClicked(info);
              }}
            >
              read more..
            </a>
          </p>
        </figcaption>
      </figure>
      <h2>{info.name}</h2>
    </div>
  );
};
