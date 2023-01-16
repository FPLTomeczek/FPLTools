import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "../css/News.css";

function News() {
  return (
    <div className="tweets-container">
      <div className="overall-news-list">
        <div className="tweets-heading">
          <h2>Overall News List</h2>
        </div>
        <TwitterTimelineEmbed
          sourceType="list"
          id="1609899274703101952"
          options={{ height: 600, width: 400, theme: "dark" }}
        />
      </div>
      <div className="player-status">
        <div className="tweets-heading">
          <h2>Players Status</h2>
        </div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="FPLStatus"
          options={{ height: 600, width: 400 }}
        />
      </div>
      <div className="teams-review">
        <div className="tweets-heading">
          <h2>Top Managers Review</h2>
        </div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="fplreview"
          options={{ height: 600, width: 400 }}
        />
      </div>
    </div>
  );
}

export default News;
