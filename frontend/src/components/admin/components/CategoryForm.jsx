import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from "@config/http.js";
const CategoryForm = ({fetchCategories, editingCategory, setEditingCategory}) => {

    const[name, setName] = useState('');
    const [type, setType] = useState('');
    const [photo, setPhoto] = useState('');
    

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
        }
        else {
            setName('');
        }
    }, [editingCategory]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editingCategory) {
            const response = await axios.put(`${API_URL}/admin/transport-types/${editingCategory._id}`, {name, type, photo});
            if (response.status === 200) {
                fetchCategories();
                setEditingCategory(null);
            }
        }
        else {
            const response = await axios.post(`${API_URL}/transport-types`, {name, type, photo});
            if (response.status === 201) {
                fetchCategories();
            }
        }
        setName('');
        setType('');
        setPhoto('');
    };
    return (
        <div>
            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label>
                    TypeId:
                    <input 
                        type="text"
                        value={type}
                        onChange={(event) => setType(event.target.value)} />
                </label>
                <label>
                    Photo:
                    <input
                        type="text"
                        value={photo}
                        onChange={(event) => setPhoto(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form> 
        </div>
    );
};

export default CategoryForm;