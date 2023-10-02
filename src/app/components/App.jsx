import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDomain } from "./action";
import { motion } from "framer-motion";

function App() {
  const { data, error, status } = useSelector((state) => state.post);

  const [domainTitle, setDomainTitle] = useState();
  const [domainSnippet, setDomainSnippet] = useState();
  const [domainLink, setDomainLink] = useState();
  const [domainName, setDomainName] = useState();
  const [show, setShow] = useState(false);
  const [domainAge, setDomainAge] = useState({
    years: "",
    months: "",
    days: "",
  });

  const [justify, setJustify] = useState("center");

  const dispatch = useDispatch();
  const handleDomain = () => {
    dispatch(getDomain({ domainName }));
    setShow(true);
  };

  const handleDomainInfo = () => {
    // console.log(data?.items[0]);

    const { dataUrl, years, months, days } = data;

    const { title, snippet, link } = dataUrl?.items[0];

    setDomainTitle(title);
    setDomainSnippet(snippet);
    setDomainLink(link);
    handleDomainInfo("left");
    setDomainAge({
      years,
      months,
      days,
    });
  };

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (status === "error") {
    return <h1>Something Went Wrong</h1>;
  }
  return (
    <div className="inputWrapper">
      <div className="containerSection" style={{ justifyContent: justify }}>
        <motion.div
          className="inputSection"
          initial={{ opacity: 0, scale: 0, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Enter domain"
            onChange={(input) => setDomainName(input.target.value)}
          />
          <button onClick={handleDomain}>Get Domain Age</button>
          {domainAge.years && (
            <h1>
              {domainAge.years}Years {domainAge.months} Months {domainAge.days}{" "}
              Days
            </h1>
          )}

          {show && (
            <div className="infoButtonContainer">
              <button className="infoButton" onClick={handleDomainInfo}>
                Get Domain Info
              </button>
            </div>
          )}
        </motion.div>

        {domainTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="infoSection"
            style={{ backgroundColor: domainTitle ? "lightcyan" : "" }}
          >
            {domainTitle && (
              <motion.h1
                initial={{ opacity: 0, scale: 0, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="infoTitle"
              >
                {domainTitle}
              </motion.h1>
            )}
            {domainSnippet && (
              <motion.h4
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="infoDescription"
              >
                {domainSnippet}
              </motion.h4>
            )}
            {domainLink && (
              <motion.h5
                initial={{ opacity: 0, scale: 0, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="infoLink"
                href={domainLink}
              >
                {domainLink}
              </motion.h5>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
