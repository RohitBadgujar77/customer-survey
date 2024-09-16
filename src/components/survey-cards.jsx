import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { GrCompliance } from "react-icons/gr";
import { IoIosSkipForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

//Array of questions:-
let queArr = [
  {
    type: "rate",
    que: "1. How satisfied are you with our products?",
    starCount: [1, 2, 3, 4, 5],
    ans: 0,
  },
  {
    type: "rate",
    que: "2. How fair are the prices compared to similar retailers?",
    starCount: [1, 2, 3, 4, 5],
    ans: 0,
  },
  {
    type: "rate",
    que: "3. How satisfied are you with the value for money of your purchase?",
    starCount: [1, 2, 3, 4, 5],
    ans: 0,
  },
  {
    type: "rate",
    que: "4. On a scale of 1-10 how would you recommend us to your friends and family?",
    starCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ans: 0,
  },
  { type: "text", que: "5. What could we do to improve our service?", ans: "" },
  {
    type: "submit",
    que: "Click on Submit button to complete the survey",
    asn: 0,
  },
];

//Survey component:-
const SurveyCards = () => {
  let [queNo, setQueNo] = useState(0); //State for current question no.
  let [queAns, setQueAns] = useState(queArr[queNo].ans); //State for ans of current question
  let [submit, setSubmit] = useState(false); //State for submit msg after submission of survey

  const handleRateClick = (idx) => {
    //Function to handle Rate change
    if (queArr[queNo].ans == idx) {
      queArr[queNo].ans = 0;
      setQueAns(0);
    } else {
      queArr[queNo].ans = idx;
      setQueAns(idx);
    }
  };

  const submitSurvey = () => {
    //Function to store data of survey in local-storage
    let user1 = "";
    let submitArr = [
      {
        id: "que1",
        que: "1. How satisfied are you with our products?",
        ans: queArr[0].ans,
      },
      {
        id: "que2",
        que: "2. How fair are the prices compared to similar retailers?",
        ans: queArr[1].ans,
      },
      {
        id: "que3",
        que: "3. How satisfied are you with the value for money of your purchase?",
        ans: queArr[2].ans,
      },
      {
        id: "que4",
        que: "4. On a scale of 1-10 how would you recommend us to your friends and family?",
        ans: queArr[3].ans,
      },
      {
        id: "que5",
        que: "5. What could we do to improve our service?",
        ans: queArr[4].ans,
      },
    ];
    localStorage.setItem(user1, JSON.stringify(submitArr)); //Storing data to local-storage
    setSubmit(true);
    setTimeout(() => {
      //to display submit msg & reloding page to welcome screen
      location.reload();
      setSubmit(false);
    }, 5000);
  };

  return (
    <div className="survey-cards">
      <div className="que-cont">
        <span className="que">{queArr[queNo].que}</span>
        {queArr[queNo].type == "rate" ? ( //using ternary operator to render star icons, text-iniput & submit button as per thier type
          <div className="rate-cont">
            {queArr[queNo].starCount.map((index) => {
              return (
                <FaStar
                  key={index}
                  className={`star ${
                    index > queArr[queNo].ans ? "" : "active" //using active class to display star rating
                  }`}
                  onClick={() => {
                    handleRateClick(index);
                  }}
                />
              );
            })}
          </div>
        ) : queArr[queNo].type == "submit" ? ( //Submit button to submit the Survey
          <button
            className="submit"
            onClick={() => {
              submitSurvey();
            }}
          >
            Submit <GrCompliance className="submit-icon" />
          </button>
        ) : (
          <textarea
            className="input-cont"
            value={
              typeof queAns == "number" ? queArr[queNo].ans : queAns.toString()
            }
            onChange={(e) => {
              queArr[queNo].ans = e.target.value;
              setQueAns(e.target.value);
            }}
            placeholder="Enter your suggestions"
          />
        )}
        {queArr[queNo].type == "rate" ? ( //Showing current rating for rating questions
          <span className="rate-count">
            Rating : {queArr[queNo].ans}/{queArr[queNo].starCount.length}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="btn-cont">
        <button //Previous button
          onClick={() => {
            setQueNo(queNo - 1);
          }}
          disabled={queNo == 0 ? true : false}
          className={`nav-btn ${queNo == 0 ? "disable" : ""}`}
        > 
          <IoMdArrowDropleftCircle /> Prev
        </button>
        <span>{queNo + 1}/6</span> {/*Showing current page of questions*/}
        <button //Next button
          onClick={() => {
            setQueNo(queNo + 1);
          }}
          className={`nav-btn ${
            //Changing classname to show disabled button
            queArr[queNo].ans == 0 || queArr[queNo].ans == "" || queNo == 5
              ? "disable"
              : ""
          }`}
          disabled={
            //Disabling next button due to empty answers from customer
            queArr[queNo].ans == 0 || queArr[queNo].ans == "" || queNo == 5
              ? true
              : false
          }
        >
          Next <IoMdArrowDroprightCircle />
        </button>
      </div>
      <button
        className={`nav-btn skip-btn ${queNo == 5 ? "remove-btn" : ""}`} //Skip button to skip the questions without answering them
        onClick={() => {
          setQueNo(queNo + 1);
        }}
      >
        Skip <IoIosSkipForward />
      </button>
      {submit ? ( //Final submit message page to display successfully survey submited & thanking custoner for thier time
        <div className="submit-page">
          <div className="submit-cont">
            <span className="submit-msg">Survey submited successfully</span>
            <div className="check-icon">
              <FaCheck />
            </div>
            <span className="greet">Thank you for your time...!</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SurveyCards;
