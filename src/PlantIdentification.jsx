import { useState,useEffect } from 'react'
import ImageUpload from './ImageUpload';
import FileBase64 from 'react-file-base64'

const URL_PLANT="https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering&language=en"
function PlantIdentification() {
    // const [base64Image, setBase64Image] = useState(null);
    // const [result, setResult] = useState(null);
    // const [loading, setLoading] = useState(false);

    // function handleImageUpload(file) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setBase64Image(reader.result.split(',')[1])
            
    //     }
    //     reader.readAsDataURL(file);

        
    // }

    // async function identifyPlant() {
    //     var myHeaders = new Headers();
    //     myHeaders.append('Api-Key', "1HiIIjlq4z9ebXNj6UmvE88Lab5isZtxLLKs2tHAD1pALbPVIp");
    //     myHeaders.append('Content-Type', 'application/json');

    //     var raw = JSON.stringify({
    //         "images": [base64Image],
    //         "latitude": 49.207,
    //         "longitude": 16.608,
    //         "similar_images": true
            
    //     })

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow',
    //     };
    //     await fetch(URL_PLANT, requestOptions)
    //         .then(response => response.json())
    //         .then(result => { console.log(result) })
        //   .catch(error => console.log('error', error));
        // await fetch(URL_PLANT, requestOptions).then(res=>res.json(data)).then(resData=> {console.log("success", resData)})
    

        //     if (!base64Image) {
        //         alert('Please Upload an Image');
        //         return;
        //     }
        //     setLoading(true);
        //     setResult(null);

        //     try {
        //         const res = await fetch('https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering&language=en',
        //             requestOptions
        //         )
        //         if (!res.ok) {
        //             throw new Error(`Failed to Identify Plant, Try again! ${res.status}`)
        //         }
        //         const data = await res.json();
        //         setResult(data);
        //         console.log(data);

            
        //     } catch (error) {
        //   console.error('Error identifying the plant:', error);
        //     }
        //     finally {
        //   setLoading(false);
        // }
        

        
        // }


    //     useEffect(() => {
    //         if (base64Image) {
    //             identifyPlant();
    //         }
    //     }, [base64Image]);
    
    //     return (
    //         <div className="plant-identification">
    //             <ImageUpload onUpload={handleImageUpload} />
    //             {loading ? (
    //                 <p>Identifying...</p>
    //             ) :
    //                 (result && (
    //                     <div className="results" >
    //                         <h2>Results: </h2>
    //                         {result.map((item, index) => (
    //                             <div key={index} className='result-item'>
    //                                 <h3>{item.plant_name}</h3>
    //                                 <p>probability: {(item.probability * 100).toFixed(2)}%</p>

    //                             </div>
                            
    //                         ))}
    //                     </div>
    //                 )
                    
    //                 )}

    //         </div>
    //     )
    // }


    ///////////////////////////////(((((((())))))))



    const [plantFile, setPlantFile] = useState(null);
    const [result, setResult] = useState(null);
    
    function handleInput(files) {
        setPlantFile(files);
    }

    
    async function setPicIdData() {
        var myHeaders = new Headers();
        myHeaders.append('Api-Key', "1HiIIjlq4z9ebXNj6UmvE88Lab5isZtxLLKs2tHAD1pALbPVIp");
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            "images": [plantFile.base64.slice(23)],
            "latitude": 49.207,
            "longitude": 16.608,
            "similar_images": true
            
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:raw,
            redirect: 'follow',
        };
        const data = {
            modifiers: [`all`,
                 `species`
            ],
            plant_details: [
                "common_names",
                "url",
                "name_authority",
                "wiki_description",
                "taxonomy",
                "synonyms"
            ]
        };

        const res = await fetch(URL_PLANT, requestOptions);
        const response = res.json(data);
        setResult(response);
        console.log("sucess", response);

    
    
        
    }


    return (
        <div>
            PlantId
            <FileBase64 multiple={false} onDone={handleInput} />
            {/* {plantFile && plantFile.base64.slice(23)} */}
            <button onClick={setPicIdData}> Identify
                
            </button>
           
            
              
            
            
            
            </div>
            
    )
}

export default PlantIdentification
