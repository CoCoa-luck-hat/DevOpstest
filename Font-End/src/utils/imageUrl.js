// Helper function to get image URL from Backend
export const getImageUrl = (filename) => {
    if (!filename) return '';
    return `http://localhost:8000/uploads/${filename}`;
};

export default getImageUrl;
