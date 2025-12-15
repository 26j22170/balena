import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({children}){
    const {isAdmin} = useSelector(state => state.users);
    return isAdmin ? children : <Navigate to="/login" />;
}