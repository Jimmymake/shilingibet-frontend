import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseClass from "../../services/BaseClass";

function Sports() {
  const navigate = useNavigate();
  const base = new BaseClass();

  useEffect(() => {
    
    if (!base.isAuthenticated()) {
      navigate("/login");
      return;
    }

  
    navigate("/sports/launch");
  }, [base, navigate]);

  return null;
}

export default Sports;

