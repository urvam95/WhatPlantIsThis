import { useState,useEffect } from 'react'
import FileBase64 from 'react-file-base64'


const URL_PLANT = "https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering&language=en"

function PlantIdentification() {
    const [plantFile, setPlantFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    function handleInput(files) {
        setPlantFile(files);
    }

    async function setPicIdData() {
        var myHeaders = new Headers();
        myHeaders.append('Api-Key', "bLcRPC3GP4wjkLr6nDgQltJe0b15Qw8XVS3qjWMxJDMVWGLvRu");
        myHeaders.append('Content-Type', 'application/json');
        const baseCode = [plantFile.base64.slice(23)];

        var raw = JSON.stringify({
            "images": baseCode,
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
    
        try {


            const res = await fetch(URL_PLANT, requestOptions);
            if (!res.ok) {
                throw new Error(`Try again ${res.status}`)
            }
            else {
                setLoading(true);
                const response = await res.json();
                setResult(response);

                console.log("sucess");
            }

        }
        catch (err) {
            console.log("Failed to identify plant", err);
        } finally {
            setLoading(false);
        }
    }
    
    console.log(result)
   

    
    return (
        <div className='container'>
            <FileBase64 multiple={false} onDone={handleInput} />
            <button onClick={setPicIdData}> Identify  
            </button>
            
            <div className='container'>

                {loading ? <p>identifying</p> 
                    :
                    
                    <h2>
                        {result && (result.result.is_plant.binary ? "Plant Identified" : "Please upload an image of a plant")}
                        </h2>
               }      
            </div>
            <div className='results'>
                
                {result && result.result.classification.suggestions.map((sugg, index) => (
                    <div key={sugg.id} className='suggestion' >
                        <h3>{index + 1}. {sugg.name}</h3>
                        {sugg.details && (
                            <div className='details'>
                                <p>
                                    <strong> Common Names: </strong> {" "}
                                    {sugg.details.common_names ? sugg.details.common_names.join(", ")
                                        : "No common names found"}
                                </p>
                                <p>
                                    <strong> Description </strong>
                                    
                                </p>
                                {sugg.details.url && (
                                    <p>
                                        
                                        <span>{sugg.details.description.value}</span>
                                        <a href={sugg.details.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <strong> More Info </strong>
                                        </a>
                                    </p>
                                )}
                                <h4>Similar Images</h4>
                                <ul className='similar_images'>
                                    {sugg.similar_images.map((img, imgIndex) => (
                                        <li key={img.id} style={{ listStyleType: 'none' }}>
                                            <img
                                                src={img.url_small || img.url}
                                                alt={`Similar Image ${imgIndex + 1}`}
                                                style={
                                                    {
                                                        maxWidth: "150px",
                                                        margin: "10px",
                                                        borderRadius: "5px",
                                                    }
                                                }
                                            />

                                        </li>
                                    ))}
                                </ul>

                            </div>
                        )}
                    </div>
                )
                    
                )}
            </div>
           </div>
            
    )
}

export default PlantIdentification

