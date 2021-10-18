import request from "../Utils/Request";
import db from "../Utils/DB";

class MediaServices {

    consumirMedia(url) {
        return request({
            url: url,
            method: 'GET',
            responseType: 'blob'
        });
    }

    guardarMedia() {
        this.obtenerURls()
            .then((response) => {
                // console.log(response.length);
                for (const url of response) {
                    // console.log(await );
                    this.consumirMedia(url).then(response => {
                        console.log(response);
                    })
                    // fetch(url)
                    //     .then(response => response.blob())
                    //     .then(blob => new Promise((resolve, reject) => {
                    //         const reader = new FileReader()
                    //         reader.onloadend = () => resolve(reader.result)
                    //         reader.onerror = reject
                    //         reader.readAsDataURL(blob)
                    //     }))
                    //     .then(dataUrl => {
                    //         console.log('RESULT:', dataUrl)
                    //     })
                }

            })
    }

    obtenerURls() {
        return new Promise(async (resolve) => {
            try {
                let mediaURLS = [];
                await db.cursos.each(async function (curso) {
                    if (curso.foto) {
                        mediaURLS.push({
                            'id': `curso${curso.id}`,
                            foto: `${process.env.REACT_APP_API_DOMAIN}${curso.foto}`
                        });
                    }

                    for (const tema of curso.curso_temas) {
                        for (const subTema of tema['tema_subtemas']) {
                            if (subTema.foto) {
                                mediaURLS.push({
                                    'id': `curso${curso.id}`,
                                    foto: `${process.env.REACT_APP_API_DOMAIN}${subTema.foto}`
                                });
                            }
                        }
                    }
                });
                await db.fincas.each(async function (finca) {
                    if (finca.foto) {
                        mediaURLS.push({'id': `finca${finca.id}`, foto: finca.foto});
                    }
                });

                resolve(['https://cacaocursos.guegue.info/media/cursos/cacao-chocolate-1-1000x500.jpg']);
            } catch (error) {
                resolve([]);
            }
        })
    }

}


export default new MediaServices();