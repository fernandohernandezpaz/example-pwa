import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from '../Components/MainLayout';
import MediaServices from "../Services/MediaServices";

const DashboardPage = () => {
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