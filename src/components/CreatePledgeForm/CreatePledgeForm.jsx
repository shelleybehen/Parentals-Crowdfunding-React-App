import React, { useState } from "react";
import { useParams } from "react-router";
import './CreatePledgeForm.css'
// test

const CreatePledgeForm = () => {
  const { id } = useParams()
  const [pledgeData, setPledgeData] = useState({
    amount: "0",
    comment: "",
    anonymous: "false",
    project_id: id,
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setPledgeData({
      ...pledgeData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pledgeData),
    }).then((response) => {
      setSubmitMessage("Thank you for supporting this campaign.");
      return response.json();
    });
  };

  return (
    <div className='project-page'>
      <div className='proj-form'>
        <h3 className="sign8" align='center'>I can help!</h3>
      <form className='form8' >
        <div>
          <input className='field8'
            name="amount"
            type="text"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div>
          <input className='field8'
            name="comment"
            type="text"
            placeholder="Comment"
            onChange={handleChange}
          />
        </div>
        <div className='editbox2'>
        <button
          className='submit6'
          type='submit'
          onClick={handlePledgeSubmit}
        >
          Submit
        </button>
        <div>{submitMessage}</div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreatePledgeForm;
