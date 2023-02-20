function readFileAsDataURL(file) {
    if (!file) return '';
    return new Promise((resolve, reject) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = (e) => resolve(e.target.result);
            fileReader.readAsDataURL(file);
        } catch (error) {
            reject({ error });
        }
    });
}

export {
    readFileAsDataURL
};
