import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import PhotoUpload from '../Pages/PhotoUpload';

function Rotas() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/imagem" element={<> <PhotoUpload/> </>}/>
                <Route exact path="/inicio" element={<> <Home/> </>}/>
            </Routes>
        </Router>
    )
}

export default Rotas;