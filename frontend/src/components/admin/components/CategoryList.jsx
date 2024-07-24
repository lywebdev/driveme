import {useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm.jsx';
import {API_URL} from "@config/http.js";
import {resolveAlias} from "@helpers/imageHelper.js";


const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/transport-types`);
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }

    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`${API_URL}/admin/transport-types/${categoryId}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
    };

    return (
        <div>
            <CategoryForm
                fetchCategories={fetchCategories}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory} />
            <h2>Category List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category._id}</td>
                            <td>{category.name}</td>
                            <td><img src={resolveAlias(`@images/transport-types/${category.photo}`)} alt={category.name}/></td>
                            <td><button onClick={() => handleDelete(category._id)}>Delete</button></td>
                            <td><button onClick={() => handleEdit(category)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;