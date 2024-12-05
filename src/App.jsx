
import { useState } from 'react';
import './pagecss.css';
import PlantIdentification from './PlantIdentification.jsx';
import FreeIpadWallpaper from './images/10.avif'


function App() {
  return (
    <div className="app-container"
    >
      

      <h1 className='title' style={{ 
      backgroundImage: `url(${FreeIpadWallpaper})`,
      backgroundSize: 'auto',
        backgroundPosition: 'center',
      minHeight: '10vh' 
    }} >🌱 Plant Identifier</h1>
     <PlantIdentification/>
     

    </div>
  )
  
}

export default App


// const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   function handleFileChange(e) {
//     setFile(e.target.file);
//     setError(null);
//   }

//   async function handleSubmit() {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     setError(null);

//     if (!file) {
//       setError('Please upload an image file!');
//       setLoading(false);
//       return;
//     }
//     try {
//       const data = await identifyPlant(file);
//       setResult(data);
//     } catch (err) {
//       setError('Failed to identify the plant. Please try again.');
//     } finally {
//       setLoading(false);
//     }
    
//   }



//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <h1>Plant Identifier</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type='file'
//             accept='image/*'
//             onChange={handleFileChange}
//           />
//           <button type='submit' disabled={loading}>
//             {loading ? "Identifying..." : "Identify plant" }
            
//           </button>
//         </form>
//          {error && <p className="error">{error}</p>}
//         {result && (
//           <div className="result">
//             <h2>Plant Information</h2>
//             <p><strong>Name:</strong> {result.name} </p>
//             <p><strong>Description:</strong> {result.description}</p>
//           </div>
//         )}

//       </header>

//     </div>
//   )

// import React, { useState } from 'react';
// import './App.css'; // Optional: Add styles as needed.

// const PlantIdentifier = () => {
//   const [files, setFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };

//   const handleFileUpload = () => {
//     const promises = Array.from(files).map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           const res = event.target.result;
//           console.log(res);
//           resolve(res);
//         };
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(promises).then((base64files) => {
//       console.log(base64files);

//       const data = {
//         api_key: '1HiIIjlq4z9ebXNj6UmvE88Lab5isZtxLLKs2tHAD1pALbPVIp',
//         images: base64files,
//         modifiers: ['crops_fast', 'similar_images'],
//         plant_language: 'en',
//         plant_details: [
//           'common_names',
//           'url',
//           'name_authority',
//           'wiki_description',
//           'taxonomy',
//           'synonyms',
//         ],
//       };

//       fetch('https://plant.id/api/v3', {
//         method: 'POST',
//         // headers: {
//         //   'Content-Type': 'application/json',
//         // },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Success:', data);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     });
//   };

//   return (
//     <div className="App">
//       <form>
//         <input type="file" multiple onChange={handleFileChange} />
//         <button type="button" onClick={handleFileUpload}>
//           OK
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PlantIdentifier;
