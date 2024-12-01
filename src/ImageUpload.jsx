import { useState } from "react"

function ImageUpload({ onUpload }) {
    const [preview, setPreview] = useState(null);

    function handleFileChange(e) {
        const file = event.target.file[0];
        if (file) {
            setPreview(URL.createObjectURL(file))
            onUpload(file)
    }
        
    }
    return (
        <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>
    )
}

export default ImageUpload
