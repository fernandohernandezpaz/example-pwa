import React, {useState} from "react";
import MainLayout from '../Components/MainLayout';
// import MediaServices from "../Services/MediaServices";
// import db from "../Utils/DB";

const DashboardPage = () => {
    // const [documentosLeidos, setDocumentosLeidos] = useState([]);

    // MediaServices.guardarMedia();
    // MediaServices.obtenerURls()
    //     .then(response => {
    //         for(const url of response) {
    //             console.log(url);
    //         }
    //     });

    return (
        <MainLayout>
            <h1>Bienvenido</h1>
        </MainLayout>
    )
}

export default DashboardPage;