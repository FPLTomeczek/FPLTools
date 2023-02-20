import React, { useEffect, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "../css/News.css";
<script
  async
  src="https://platform.twitter.com/widgets.js"
  charset="utf-8"
></script>;

function News() {
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);
  const tweetlist = (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          class="twitter-timeline"
          data-width="400"
          data-height="600"
          data-theme="dark"
          href="https://twitter.com/tomasz_komenda/lists/1609899274703101952?ref_src=twsrc%5Etfw"
        ></a>
      </div>
    </section>
  );
  const fplstatus = (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          class="twitter-timeline"
          data-width="400"
          data-height="600"
          data-theme="dark"
          href="https://twitter.com/FPLStatus?ref_src=twsrc%5Etfw"
        ></a>
      </div>
    </section>
  );

  const fplreview = (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          class="twitter-timeline"
          data-width="400"
          data-height="600"
          data-theme="dark"
          href="https://twitter.com/fplreview?ref_src=twsrc%5Etfw"
        ></a>
      </div>
    </section>
  );
  return (
    isLoaded && (
      <div className="tweets-container">
        <div className="overall-news-list">
          <div className="tweets-heading">
            <h2>Overall News List</h2>
          </div>
          {tweetlist}
        </div>
        <div className="player-status">
          <div className="tweets-heading">
            <h2>Players Status</h2>
          </div>
          {fplstatus}
        </div>
        <div className="teams-review">
          <div className="tweets-heading">
            <h2>Top Managers Review</h2>
          </div>
          {fplreview}
        </div>
      </div>
    )
  );
}

export default News;
