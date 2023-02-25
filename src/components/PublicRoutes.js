import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {

    const userToken = localStorage.getItem('token');

    return userToken ? <Navigate to='/home' /> : children;

};

export default PublicRoutes;