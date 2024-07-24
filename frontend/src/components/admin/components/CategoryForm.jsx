import { useEffect, useState } from 'react';
import { useTransportTypeStore } from '@store/useTransportTypeStore';
const CategoryForm = ({ editingCategory, setEditingCategory }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [photo, setPhoto] = useState('');

    const {
        createTransportType,
        updateTransportType,
        fetchTransportTypes,
        setIsLoading,
        isLoading,
        backendErrors,
        setErrors,
    } = useTransportTypeStore();

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setType(editingCategory.type);
            setPhoto(editingCategory.photo);
        } else {
            setName('');
            setType('');
            setPhoto('');
        }
    }, [editingCategory]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors([]);

        try {
            if (editingCategory) {
                await updateTransportType(editingCategory._id, { name, type, photo });
                setEditingCategory(null);
            } else {
                await createTransportType({ name, type, photo });
            }
            fetchTransportTypes();
        } catch (error) {
            setErrors(error.response.data.errors);
        } finally {
            setIsLoading(false);
        }

        setName('');
        setType('');
        setPhoto('');
    };

    return (
        <div>
            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            {backendErrors && backendErrors.length > 0 && (
                <div>
                    {backendErrors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={isLoading}
                    />
                </label>
                <label>
                    TypeId:
                    <input
                        type="text"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        disabled={isLoading}
                    />
                </label>
                <label>
                    Photo:
                    <input
                        type="text"
                        value={photo}
                        onChange={(event) => setPhoto(event.target.value)}
                        disabled={isLoading}
                    />
                </label>
                <button type="submit" disabled={isLoading}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
