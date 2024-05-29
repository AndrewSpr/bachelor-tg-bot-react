import './Admin.css';

import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [newBanner, setNewBanner] = useState({ title: '', img_src: '' });
    const [newProduct, setNewProduct] = useState({ title: '', subtitle: '', price: '', category: '' });

    useEffect(() => {
        fetch('http://localhost:3001/banners')
            .then(response => response.json())
            .then(data => setBanners(data))
            .catch(error => console.error('Error fetching banners:', error));

        fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddBanner = () => {
        fetch('http://localhost:3001/banners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBanner)
        })
            .then(response => response.json())
            .then(data => setBanners([...banners, data]))
            .catch(error => console.error('Error adding banner:', error));
    };

    const handleDeleteBanner = (id) => {
        fetch(`http://localhost:3001/banners/${id}`, { method: 'DELETE' })
            .then(() => setBanners(banners.filter(banner => banner.id !== id)))
            .catch(error => console.error('Error deleting banner:', error));
    };

    const handleAddProduct = () => {
        fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(data => setProducts([...products, data]))
            .catch(error => console.error('Error adding product:', error));
    };

    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' })
            .then(() => setProducts(products.filter(product => product.id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <h2>Администрирование баннеров</h2>
            <div>
                {banners.map(banner => (
                    <div key={banner.id}>
                        <p>{banner.title}</p>
                        <img src={banner.img_src} alt={banner.title} />
                        <button onClick={() => handleDeleteBanner(banner.id)}>Удалить</button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Title"
                value={newBanner.title}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image Source"
                value={newBanner.img_src}
                onChange={(e) => setNewBanner({ ...newBanner, img_src: e.target.value })}
            />
            <button onClick={handleAddBanner}>Добавить баннер</button>

            <h2>Администрирование товаров</h2>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <p>{product.subtitle}</p>
                        <p>{product.price}</p>
                        <p>{product.category}</p>
                        <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Subtitle"
                value={newProduct.subtitle}
                onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
            />
            <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <button onClick={handleAddProduct}>Добавить товар</button>
        </div>
    );
};

export default Admin;
