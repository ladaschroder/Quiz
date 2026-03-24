import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Results({ element, dogImage }) {
    const { name } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="result-card">
            <h2>Your dog, {name}!</h2>
            <p>Your dog soulmate is: <strong>{element}</strong></p>
            
            {dogImage && (
                <div className="artwork">
                    <h3>Your random dog image💅</h3>
                    <img 
                        src={dogImage} 
                        alt="Random dog"
                        style={{ maxWidth: "400px", marginTop: "20px" }}
                    />
                </div>
            )}
            
            {!dogImage && <p>No dog image found.</p>}
            
            <button onClick={() => navigate("/")}>Take Quiz Again</button>
        </div>
    );
}