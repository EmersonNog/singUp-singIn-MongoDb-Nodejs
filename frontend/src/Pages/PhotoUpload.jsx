import { useState, useEffect } from 'react';
import avatar from '../assets/avatar.png';
import styles from './PhotoUpload.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';

function Upload() {
    const [postImage, setPostImage] = useState( { photo : '' })
    const url = 'http://localhost:3000/users/image';
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        if (location.state) {
            setUserData(location.state);
        }
    }, []);

    const createImage = async (newImage) => {
        try{
            await axios.post(url, newImage)
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createImage({ ...postImage, email: userData.email });
        console.log('Uploaded');
        history("/inicio", {state: {name: userData.name, email: userData.email, phone: userData.phone, photo: postImage.photo}})
    }

    const handleFileUpload = async(e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, photo : base64 });
    }

    return(
        <div className={styles.main}>
            <section>
                <h2>Bem-vindo, adicione uma foto {userData.name}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file-upload">
                        <span><i>Opcional</i></span>
                        <img
                            src={postImage.photo || avatar}
                            alt="avatar"
                        />
                        <p className={styles.custom_file_upload}>Escolher arquivo</p>
                    </label>
                    <input
                        type='file'
                        lable ='Image'
                        name='photo'
                        id='file-upload'
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button type='submit'>Salvar imagem <FiUpload/></button>
                </form>
            </section>
        </div>
    )
}

export default Upload;

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}